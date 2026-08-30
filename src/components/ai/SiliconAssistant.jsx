import { useEffect, useRef, useState } from 'react'
import { Mic, MicOff, RotateCcw, X } from 'lucide-react'
import {
  getSpeechRecognitionConstructor,
  getVoiceSearchErrorMessage,
  normalizeVoiceSearchText,
} from '../../features/voice/voiceSearch'
import '../../styles/silicon-assistant.css'

const readyMessage = '请说出要搜索的商品、服务、企业或订单。'
const unsupportedMessage = '当前浏览器不支持语音识别，请使用页面搜索栏。'
const positionStorageKey = 'silicon-assistant-position'
const edgeGap = 12
const dragThreshold = 5

const clamp = (value, minimum, maximum) => Math.min(Math.max(value, minimum), Math.max(minimum, maximum))

export default function SiliconAssistant({ onSearch }) {
  const [open, setOpen] = useState(false)
  const [phase, setPhase] = useState('ready')
  const [message, setMessage] = useState(readyMessage)
  const [position, setPosition] = useState({ side: 'right', x: null, y: null })
  const recognitionRef = useRef(null)
  const timeoutRef = useRef(null)
  const launcherRef = useRef(null)
  const dragRef = useRef(null)
  const nativeDragRef = useRef(null)
  const suppressClickUntilRef = useRef(0)
  const supported = typeof window !== 'undefined' && Boolean(getSpeechRecognitionConstructor(window))

  const clearRecognitionTimeout = () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    timeoutRef.current = null
  }

  const abortRecognition = () => {
    clearRecognitionTimeout()
    if (recognitionRef.current) recognitionRef.current.abort()
    recognitionRef.current = null
  }

  useEffect(() => () => abortRecognition(), [])

  useEffect(() => {
    const launcher = launcherRef.current
    if (!launcher) return undefined

    const fitPositionToViewport = (savedPosition) => {
      const launcherHeight = launcher.getBoundingClientRect().height
      const fallbackY = window.innerHeight - launcherHeight - edgeGap
      return {
        side: savedPosition?.side === 'left' ? 'left' : 'right',
        x: null,
        y: clamp(Number.isFinite(savedPosition?.y) ? savedPosition.y : fallbackY, edgeGap, fallbackY),
      }
    }

    let savedPosition = null
    try {
      savedPosition = JSON.parse(window.sessionStorage.getItem(positionStorageKey))
    } catch {
      savedPosition = null
    }
    setPosition(fitPositionToViewport(savedPosition))

    const handleResize = () => setPosition((current) => fitPositionToViewport(current))
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const moveAssistant = (event) => handlePointerMove(event)
    const finishAssistantDrag = (event) => finishPointerDrag(event)
    window.addEventListener('pointermove', moveAssistant)
    window.addEventListener('pointerup', finishAssistantDrag)
    window.addEventListener('pointercancel', finishAssistantDrag)
    return () => {
      window.removeEventListener('pointermove', moveAssistant)
      window.removeEventListener('pointerup', finishAssistantDrag)
      window.removeEventListener('pointercancel', finishAssistantDrag)
    }
  }, [])

  function closeAssistant() {
    abortRecognition()
    setOpen(false)
    setPhase('ready')
    setMessage(readyMessage)
  }

  function stopListening() {
    clearRecognitionTimeout()
    recognitionRef.current?.stop()
  }

  function startListening() {
    const SpeechRecognition = getSpeechRecognitionConstructor(window)
    if (!SpeechRecognition) {
      setPhase('error')
      setMessage(unsupportedMessage)
      return
    }

    abortRecognition()
    const recognition = new SpeechRecognition()
    let completed = false
    recognition.lang = 'zh-CN'
    recognition.continuous = false
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onresult = (event) => {
      const finalResult = Array.from(event.results).find((result) => result.isFinal)
      const keyword = normalizeVoiceSearchText(finalResult?.[0]?.transcript)
      if (!keyword) return

      completed = true
      clearRecognitionTimeout()
      recognitionRef.current = null
      setPhase('success')
      setMessage(`识别到“${keyword}”，正在搜索。`)
      recognition.stop()
      onSearch(keyword)
    }

    recognition.onerror = (event) => {
      completed = true
      clearRecognitionTimeout()
      recognitionRef.current = null
      setPhase('error')
      setMessage(getVoiceSearchErrorMessage(event))
    }

    recognition.onend = () => {
      clearRecognitionTimeout()
      recognitionRef.current = null
      if (completed) return
      setPhase('error')
      setMessage(getVoiceSearchErrorMessage('no-speech'))
    }

    try {
      recognitionRef.current = recognition
      setPhase('listening')
      setMessage('正在听，请开始说话。')
      recognition.start()
      timeoutRef.current = window.setTimeout(() => recognition.stop(), 10000)
    } catch {
      recognitionRef.current = null
      setPhase('error')
      setMessage('麦克风暂时无法启动，请稍后重试。')
    }
  }

  function toggleAssistant() {
    if (open) {
      closeAssistant()
      return
    }
    setOpen(true)
    setPhase(supported ? 'ready' : 'error')
    setMessage(supported ? readyMessage : unsupportedMessage)
  }

  function handlePointerDown(event) {
    if (event.button !== 0) return
    const bounds = launcherRef.current?.getBoundingClientRect()
    if (!bounds) return

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      offsetX: event.clientX - bounds.left,
      offsetY: event.clientY - bounds.top,
      moved: false,
    }
  }

  function handlePointerMove(event) {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    if (!drag.moved && Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY) < dragThreshold) return

    drag.moved = true
    const bounds = launcherRef.current?.getBoundingClientRect()
    if (!bounds) return
    const x = clamp(event.clientX - drag.offsetX, edgeGap, window.innerWidth - bounds.width - edgeGap)
    const y = clamp(event.clientY - drag.offsetY, edgeGap, window.innerHeight - bounds.height - edgeGap)
    const side = x + bounds.width / 2 < window.innerWidth / 2 ? 'left' : 'right'
    setPosition({ side, x, y })
  }

  function handleNativeDragStart(event) {
    const bounds = launcherRef.current?.getBoundingClientRect()
    if (!bounds) return
    nativeDragRef.current = {
      offsetX: event.clientX - bounds.left,
      offsetY: event.clientY - bounds.top,
    }
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setDragImage(launcherRef.current, event.clientX - bounds.left, event.clientY - bounds.top)
  }

  function handleNativeDrag(event) {
    const drag = nativeDragRef.current
    if (!drag || (event.clientX === 0 && event.clientY === 0)) return
    const bounds = launcherRef.current?.getBoundingClientRect()
    if (!bounds) return
    const x = clamp(event.clientX - drag.offsetX, edgeGap, window.innerWidth - bounds.width - edgeGap)
    const y = clamp(event.clientY - drag.offsetY, edgeGap, window.innerHeight - bounds.height - edgeGap)
    const side = x + bounds.width / 2 < window.innerWidth / 2 ? 'left' : 'right'
    setPosition({ side, x, y })
  }

  function handleNativeDragEnd(event) {
    const drag = nativeDragRef.current
    if (!drag) return
    const bounds = launcherRef.current?.getBoundingClientRect()
    const side = event.clientX < window.innerWidth / 2 ? 'left' : 'right'
    const y = clamp(event.clientY - drag.offsetY, edgeGap, window.innerHeight - (bounds?.height || 0) - edgeGap)
    suppressClickUntilRef.current = Date.now() + 250
    setPosition({ side, x: null, y })
    try {
      window.sessionStorage.setItem(positionStorageKey, JSON.stringify({ side, y }))
    } catch {
      // Search remains usable when browser storage is unavailable.
    }
    nativeDragRef.current = null
  }

  function finishPointerDrag(event) {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return

    if (drag.moved) {
      const bounds = launcherRef.current?.getBoundingClientRect()
      const side = event.clientX < window.innerWidth / 2 ? 'left' : 'right'
      const y = clamp(event.clientY - drag.offsetY, edgeGap, window.innerHeight - (bounds?.height || 0) - edgeGap)
      const snappedPosition = { side, x: null, y }
      suppressClickUntilRef.current = Date.now() + 250
      setPosition(snappedPosition)
      try {
        window.sessionStorage.setItem(positionStorageKey, JSON.stringify({ side, y }))
      } catch {
        // Search remains usable when browser storage is unavailable.
      }
    }

    dragRef.current = null
  }

  function handleLauncherClick(event) {
    if (Date.now() < suppressClickUntilRef.current) {
      suppressClickUntilRef.current = 0
      event.preventDefault()
      return
    }
    toggleAssistant()
  }

  const assistantStyle = position.y === null ? undefined : {
    top: `${position.y}px`,
    bottom: 'auto',
    left: position.x !== null ? `${position.x}px` : position.side === 'left' ? `${edgeGap}px` : 'auto',
    right: position.x === null && position.side === 'right' ? `${edgeGap}px` : 'auto',
  }

  return <aside
    className={`silicon-assistant ${open ? 'open' : ''}`}
    aria-label="鲑小智语音搜索"
    data-side={position.side}
    data-panel-placement={position.y !== null && position.y < 310 ? 'below' : 'above'}
    style={assistantStyle}
  >
    {open && <section className="silicon-assistant-panel" role="dialog" aria-labelledby="silicon-assistant-title">
      <header>
        <div><strong id="silicon-assistant-title">鲑小智</strong><span>语音搜索</span></div>
        <button type="button" onClick={closeAssistant} aria-label="关闭鲑小智"><X /></button>
      </header>
      <div className={`silicon-assistant-status ${phase}`} aria-live="polite">
        <span>{phase === 'listening' ? <MicOff /> : phase === 'error' ? <RotateCcw /> : <Mic />}</span>
        <p>{message}</p>
      </div>
      <button
        className="silicon-assistant-action"
        type="button"
        onClick={phase === 'listening' ? stopListening : startListening}
        disabled={!supported}
      >
        {phase === 'listening' ? <MicOff /> : <Mic />}
        {phase === 'listening' ? '结束语音' : phase === 'error' ? '重新尝试' : '开始语音搜索'}
      </button>
      <small>语音识别由浏览器提供，本平台不保存录音</small>
    </section>}
    <button
      className="silicon-assistant-launcher"
      type="button"
      ref={launcherRef}
      draggable="true"
      onClick={handleLauncherClick}
      onPointerDown={handlePointerDown}
      onDragStart={handleNativeDragStart}
      onDrag={handleNativeDrag}
      onDragEnd={handleNativeDragEnd}
      aria-expanded={open}
      title="鲑小智语音搜索"
    >
      <img src="/assets/assistant/guixiaozhi.png" alt="" />
      <span><strong>鲑小智</strong><small>语音搜索</small></span>
    </button>
  </aside>
}

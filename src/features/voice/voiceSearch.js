const voiceCommandPrefix = /^(?:请|麻烦)?\s*(?:帮我)?\s*(?:搜索一下|搜一下|搜索|搜|查找一下|查一下|查找|找一下|找)\s*[：:,，]?\s*/u
const trailingPunctuation = /[。！!？?，,；;：:"“”'‘’\s]+$/u

export function normalizeVoiceSearchText(value) {
  return String(value || '')
    .trim()
    .replace(trailingPunctuation, '')
    .replace(voiceCommandPrefix, '')
    .trim()
}

export function getSpeechRecognitionConstructor(scope = globalThis) {
  return scope?.SpeechRecognition || scope?.webkitSpeechRecognition || null
}

export function getVoiceSearchErrorMessage(error) {
  const code = typeof error === 'string' ? error : error?.error

  return {
    'not-allowed': '未获得麦克风权限，请在浏览器设置中允许后重试。',
    'service-not-allowed': '当前浏览器未允许语音识别服务，请改用手动搜索。',
    'no-speech': '没有听到内容，请靠近麦克风再试一次。',
    'audio-capture': '没有检测到可用麦克风，请检查系统输入设备。',
    network: '语音识别暂时无法连接，请检查网络或手动搜索。',
    aborted: '已停止语音输入。',
  }[code] || '没有识别成功，请重试或使用手动搜索。'
}

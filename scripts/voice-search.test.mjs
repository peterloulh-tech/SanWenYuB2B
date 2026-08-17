import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import test from 'node:test'
import {
  getSpeechRecognitionConstructor,
  getVoiceSearchErrorMessage,
  normalizeVoiceSearchText,
} from '../src/features/voice/voiceSearch.js'

test('语音搜索清理常见口语指令和结尾标点', () => {
  assert.equal(normalizeVoiceSearchText('请帮我搜索一下：鱼苗。'), '鱼苗')
  assert.equal(normalizeVoiceSearchText('帮我找 挪威！'), '挪威')
  assert.equal(normalizeVoiceSearchText('低温烟熏三文鱼'), '低温烟熏三文鱼')
  assert.equal(normalizeVoiceSearchText('  '), '')
})

test('语音识别同时兼容标准与 webkit 浏览器接口', () => {
  class StandardRecognition {}
  class WebkitRecognition {}
  assert.equal(getSpeechRecognitionConstructor({ SpeechRecognition: StandardRecognition }), StandardRecognition)
  assert.equal(getSpeechRecognitionConstructor({ webkitSpeechRecognition: WebkitRecognition }), WebkitRecognition)
  assert.equal(getSpeechRecognitionConstructor({}), null)
})

test('麦克风和识别错误提供可恢复提示', () => {
  assert.match(getVoiceSearchErrorMessage('not-allowed'), /麦克风权限/)
  assert.match(getVoiceSearchErrorMessage({ error: 'audio-capture' }), /麦克风/)
  assert.match(getVoiceSearchErrorMessage('network'), /网络|手动搜索/)
  assert.match(getVoiceSearchErrorMessage('unknown'), /重试|手动搜索/)
})

test('硅小智接入全部 PC 搜索页并支持拖拽贴边', async () => {
  const [assistant, assistantStyles, homePage, productsPage, suppliersPage, servicesPage, procurementPage, ordersPage, retailPage] = await Promise.all([
    readFile(new URL('../src/components/ai/SiliconAssistant.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/styles/silicon-assistant.css', import.meta.url), 'utf8'),
    readFile(new URL('../src/pages/HomePage.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/pages/IndustryProductsPage.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/pages/SuppliersPage.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/pages/IndustryServicesPage.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/pages/ProcurementPage.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/pages/OrdersPage.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/pages/RetailHomePage.jsx', import.meta.url), 'utf8'),
  ])

  await access(new URL('../public/assets/assistant/guixiaozhi.png', import.meta.url))
  assert.match(assistant, /\/assets\/assistant\/guixiaozhi\.png/)
  assert.match(assistant, /lang = 'zh-CN'/)
  assert.match(assistant, /interimResults = false/)
  assert.match(assistant, /onSearch\(keyword\)/)
  assert.match(assistant, /onPointerDown=\{handlePointerDown\}/)
  assert.match(assistant, /window\.addEventListener\('pointermove', moveAssistant\)/)
  assert.match(assistant, /window\.addEventListener\('pointerup', finishAssistantDrag\)/)
  assert.match(assistant, /onDragEnd=\{handleNativeDragEnd\}/)
  assert.match(assistant, /sessionStorage\.setItem\(positionStorageKey/)
  assert.match(assistant, /event\.clientX < window\.innerWidth \/ 2 \? 'left' : 'right'/)
  assert.match(assistantStyles, /grid-template-rows:96px 41px/)
  assert.doesNotMatch(assistantStyles, /silicon-assistant-launcher>span\{position:absolute/)
  assert.match(homePage, /<SiliconAssistant onSearch=\{handleVoiceSearch\}\/>/)
  assert.match(homePage, /params\.set\('keyword', keyword\)/)
  assert.match(homePage, /params\.set\('section', 'all'\)/)
  assert.match(productsPage, /const keyword = searchParams\.get\('keyword'\) \|\| ''/)
  assert.match(productsPage, /updateSearch\('all', normalizedKeyword\)/)
  assert.match(productsPage, /section === nextSection \? 'all' : nextSection/)
  assert.match(productsPage, /<SiliconAssistant onSearch=\{handleVoiceSearch\}\/>/)
  for (const page of [suppliersPage, servicesPage, procurementPage, ordersPage, retailPage]) {
    assert.match(page, /<SiliconAssistant onSearch=\{executeSearch\}\/>/)
  }
})

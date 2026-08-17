import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import test from 'node:test'

const iconAssets = [
  '../public/assets/home-icons/quick-sell-original.png',
  '../public/assets/home-icons/quick-aquaculture-original.png',
  '../public/assets/home-icons/stat-suppliers-2026-08-16-v2.png',
  '../public/assets/home-icons/stat-buyers-2026-08-16-v2.png',
  '../public/assets/home-icons/stat-volume-2026-08-16-v2.png',
  '../public/assets/home-icons/stat-cities-2026-08-16-v2.png',
]

test('首页使用已确认的六个彩色图片图标', async () => {
  const page = await readFile(new URL('../src/pages/HomePage.jsx', import.meta.url), 'utf8')

  for (const asset of iconAssets) {
    await access(new URL(asset, import.meta.url))
    assert.match(page, new RegExp(asset.replace('../public', '').replaceAll('/', '\\/').replace('.', '\\.')))
  }

  assert.match(page, /function HomeActionIcon/)
  assert.match(page, /className="home-stat-icon"/)
  assert.doesNotMatch(page, /\[UsersRound,Building2,TrendingUp,MapPin\]/)
})

test('首页八张快捷卡片文字增大且说明保留两像素上间距', async () => {
  const styles = await readFile(new URL('../src/styles/refinement-overrides.css', import.meta.url), 'utf8')

  assert.match(styles, /\.quick-actions \.action-card b \{ font-size: 18px; line-height: 22px; \}/)
  assert.match(styles, /\.quick-actions \.action-card small \{ margin-top: 2px; font-size: 14\.8px; line-height: 17px; \}/)
  assert.match(styles, /\.quick-actions \.action-icon\.original-image[\s\S]*flex: 0 0 50px;[\s\S]*object-fit: cover/)
})

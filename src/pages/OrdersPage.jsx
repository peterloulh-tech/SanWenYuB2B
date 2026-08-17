import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ClipboardCheck, PackageCheck, Search, Truck, WalletCards } from 'lucide-react'
import SiliconAssistant from '../components/ai/SiliconAssistant'
import PageHero from '../components/ui/PageHero'
import { orderRows } from '../data/mockData'
import { normalizeVoiceSearchText } from '../features/voice/voiceSearch'

const orderStatuses = ['全部订单', '待付款', '待发货', '运输中', '已完成', '售后']

export default function OrdersPage() {
  const [keywordInput, setKeywordInput] = useState('')
  const [keyword, setKeyword] = useState('')
  const [status, setStatus] = useState('全部订单')

  const filteredOrders = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase()
    return orderRows.filter((row) => {
      if (status !== '全部订单' && row[4] !== status) return false
      return !normalizedKeyword || row.join(' ').toLowerCase().includes(normalizedKeyword)
    })
  }, [keyword, status])

  function executeSearch(value = keywordInput) {
    const normalizedKeyword = normalizeVoiceSearchText(value)
    setKeywordInput(normalizedKeyword)
    setKeyword(normalizedKeyword)
    setStatus('全部订单')
  }

  return <>
    <PageHero title="订单履约中心" description="把订单状态、冷链过程和结算进度串联起来"/>
    <main className="page-container py-5">
      <section className="grid grid-cols-4 gap-4">{[['待付款', '12', WalletCards], ['待发货', '18', ClipboardCheck], ['运输中', '32', Truck], ['已完成', '1,286', PackageCheck]].map(([title, value, Icon]) => <div className="order-kpi" key={title}><Icon/><div><p>{title}</p><strong>{value}</strong> 笔</div></div>)}</section>
      <section className="section-card mt-4">
        <header><h2>我的订单</h2><form className="list-search compact platform-search" onSubmit={(event) => { event.preventDefault(); executeSearch() }}><Search/><input aria-label="搜索订单" value={keywordInput} onChange={(event) => setKeywordInput(event.target.value)} placeholder="订单编号、商品或采购企业"/><button type="submit">搜索</button></form></header>
        <div className="order-tabs">{orderStatuses.map((item) => <button type="button" key={item} className={status === item ? 'active' : ''} onClick={() => setStatus(item === status && item !== '全部订单' ? '全部订单' : item)}>{item}</button>)}</div>
        <table className="data-table"><thead><tr><th>订单编号</th><th>商品</th><th>采购企业</th><th>订单金额</th><th>状态</th><th>操作</th></tr></thead><tbody>
          {filteredOrders.map((row) => <tr key={row[0]}>{row.map((cell, index) => <td key={`${row[0]}-${index}`}>{index === 4 ? <span className="status-pill">{cell}</span> : cell}</td>)}<td><Link className="text-blue-600" to={`/services/orders/${row[0]}`}>查看详情</Link></td></tr>)}
          {filteredOrders.length === 0 && <tr><td className="order-empty" colSpan="6"><Search/><b>没有找到匹配订单</b><span>请更换关键词或订单状态。</span></td></tr>}
        </tbody></table>
      </section>
    </main>
    <SiliconAssistant onSearch={executeSearch}/>
  </>
}

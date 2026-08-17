import { useEffect, useRef } from 'react'
import { LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'
import { init, use, graphic } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'

use([LineChart, GridComponent, TooltipComponent, CanvasRenderer])

function tooltipContent(params) {
  const point = params[0]
  if (!point) return ''
  return `<b>${point.axisValue}</b><br/>成交均价：<strong>¥${Number(point.data).toFixed(1)}/kg</strong>`
}

export default function PriceTrendChart({ points, period }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return undefined

    const chart = init(containerRef.current, undefined, { renderer: 'canvas' })
    const prices = points.map((point) => point.price)
    chart.setOption({
      animationDuration: 420,
      animationEasing: 'cubicOut',
      grid: { left: 62, right: 22, top: 22, bottom: 40 },
      tooltip: {
        trigger: 'axis',
        confine: true,
        backgroundColor: '#10285e',
        borderWidth: 0,
        padding: [9, 12],
        textStyle: { color: '#fff', fontSize: 14 },
        axisPointer: { type: 'cross', lineStyle: { color: '#7da7e8', type: 'dashed' }, label: { backgroundColor: '#315a94' } },
        formatter: tooltipContent,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: points.map((point) => point.date),
        axisLine: { lineStyle: { color: '#b8c6da' } },
        axisTick: { show: false },
        axisLabel: { color: '#5f708a', fontSize: 13, hideOverlap: true, formatter: (value) => value.slice(5) },
      },
      yAxis: {
        type: 'value',
        scale: true,
        name: '元/kg',
        nameTextStyle: { color: '#5f708a', fontSize: 13, padding: [0, 0, 0, -28] },
        min: Math.floor((Math.min(...prices) - 3) / 5) * 5,
        max: Math.ceil((Math.max(...prices) + 3) / 5) * 5,
        splitNumber: 4,
        axisLabel: { color: '#5f708a', fontSize: 13 },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: '#e7edf5', type: 'dashed' } },
      },
      series: [{
        name: '成交均价',
        type: 'line',
        data: prices,
        smooth: 0.32,
        showSymbol: false,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: { color: '#075df5', width: 3, shadowColor: '#075df533', shadowBlur: 7, shadowOffsetY: 4 },
        itemStyle: { color: '#075df5', borderColor: '#fff', borderWidth: 2 },
        areaStyle: {
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#2580ff52' },
            { offset: 1, color: '#2580ff05' },
          ]),
        },
        emphasis: { focus: 'series', scale: true },
      }],
    })

    const observer = new ResizeObserver(() => chart.resize())
    observer.observe(containerRef.current)
    return () => {
      observer.disconnect()
      chart.dispose()
    }
  }, [points])

  return <div ref={containerRef} className="market-echart" role="img" aria-label={`近${period}日成交价格走势，支持悬浮查看每日价格`} />
}

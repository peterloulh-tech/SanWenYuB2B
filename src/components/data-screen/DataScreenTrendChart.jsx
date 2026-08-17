import { useEffect, useRef } from 'react'
import { BarChart, LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'
import { graphic, init, use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'

use([BarChart, LineChart, GridComponent, TooltipComponent, CanvasRenderer])

function tooltipFormatter(params, valueLabel, unit, decimals) {
  const point = params[0]
  if (!point) return ''
  return `<b>${point.axisValue}</b><br/>${valueLabel}：<strong>${Number(point.data).toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}${unit}</strong>`
}

export default function DataScreenTrendChart({ dates, values, type, valueLabel, unit, decimals = 0 }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return undefined

    const chart = init(containerRef.current, undefined, { renderer: 'canvas' })
    const isLine = type === 'line'
    const axisLabelIndexes = new Set([0, 7, 14, 21, dates.length - 1])
    const baseOption = {
      animationDuration: 480,
      animationEasing: 'cubicOut',
      grid: { left: isLine ? 46 : 50, right: 12, top: 12, bottom: 28 },
      tooltip: {
        trigger: 'axis',
        confine: true,
        backgroundColor: '#102c45',
        borderColor: '#4d7793',
        borderWidth: 1,
        padding: [8, 10],
        textStyle: { color: '#f4f8fb', fontSize: 14 },
        axisPointer: { type: 'line', lineStyle: { color: '#81aeca', type: 'dashed' } },
        formatter: (params) => tooltipFormatter(params, valueLabel, unit, decimals),
      },
      xAxis: {
        type: 'category',
        boundaryGap: !isLine,
        data: dates,
        axisLine: { lineStyle: { color: '#49687e' } },
        axisTick: { show: false },
        axisLabel: {
          color: '#afc1d1',
          fontSize: 13,
          fontWeight: 500,
          hideOverlap: false,
          interval: 0,
          formatter: (value, index) => axisLabelIndexes.has(index) ? value : '',
        },
      },
      yAxis: {
        type: 'value',
        scale: isLine,
        splitNumber: 3,
        axisLabel: { color: '#9eb3c4', fontSize: 12, formatter: (value) => Number(value).toLocaleString() },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: '#17364e', type: 'dashed' } },
      },
      series: [],
    }

    if (isLine) {
      baseOption.series = [{
        name: valueLabel,
        type: 'line',
        data: values,
        smooth: 0.28,
        showSymbol: false,
        symbol: 'circle',
        symbolSize: 7,
        lineStyle: { color: '#49c5d2', width: 2.5, shadowColor: '#49c5d255', shadowBlur: 8 },
        itemStyle: { color: '#73e1e8', borderColor: '#e9ffff', borderWidth: 1 },
        areaStyle: {
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#36bec54d' },
            { offset: 1, color: '#36bec505' },
          ]),
        },
        emphasis: { focus: 'series', scale: true },
      }]
    } else {
      baseOption.series = [{
        name: valueLabel,
        type: 'bar',
        data: values,
        barMaxWidth: 15,
        itemStyle: {
          borderRadius: [2, 2, 0, 0],
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#63b8eb' },
            { offset: 1, color: '#2f65b5' },
          ]),
        },
        emphasis: { itemStyle: { color: '#7ed2fa' } },
      }]
    }

    chart.setOption(baseOption)
    const observer = new ResizeObserver(() => chart.resize())
    observer.observe(containerRef.current)
    return () => {
      observer.disconnect()
      chart.dispose()
    }
  }, [dates, decimals, type, unit, valueLabel, values])

  return <div ref={containerRef} className="ds-trend-chart" role="img" aria-label={`近30日${valueLabel}趋势，支持悬浮查看每日数据`} />
}

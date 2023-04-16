'use client'

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import colors from '@/styles/colors';
import styled from 'styled-components';

interface CandleData {
  time : number,
  opening_price : number,
  trade_price : number,
  high_price : number,
  low_price : number,
  candle_acc_trade_volume : number,
  candle_date_time_kst : string,
}

type CandleChartProps = {
  data: CandleData[]
}

const ChartSVG = styled.svg`
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
  cursor: pointer;
`

const CandleChart = ({
  data
}: CandleChartProps) => {
  const chartRef = useRef<SVGSVGElement | null>(null);
  const margin = { top: 10, right: 2, bottom: 10, left: 2 };
  const totalWidth = 990;
  const width = 915;
  const candelHeight = 331 - margin.top - margin.bottom;
  const voulmeHeight = 121;

  useEffect(() => {
    const svg = d3.select(chartRef.current);

    const x = d3
      .scaleBand()
      .range([margin.left, width - margin.right])
      .domain(data.map((d) => d.candle_date_time_kst))
      .padding(0.2);

    const yChart = d3
    .scaleLinear()
    .range([candelHeight - margin.top, margin.bottom])
    .domain([d3.min(data, (d) => d.low_price)!, d3.max(data, (d) => d.high_price)!]);

    const yChartAxis = d3
    .scaleLinear()
    .range([candelHeight - 7, 0])
    .domain([d3.min(data, (d) => d.low_price)!, d3.max(data, (d) => d.high_price)!]);

    const yVoulme = d3
    .scaleLinear()
    .range([voulmeHeight - margin.top, margin.bottom])
    .domain([0, d3.max(data, (d) => d.candle_acc_trade_volume)!]);

    const yVoulmeAxis = d3
    .scaleLinear()
    .range([voulmeHeight, 0])
    .domain([0, d3.max(data, (d) => d.candle_acc_trade_volume)!]);

    const chartAxis = d3.axisRight(yChartAxis)
    .tickValues(d3.ticks(yChart.domain()[0], yChart.domain()[1], 3))
    .tickSizeOuter(0)

    const volumeAxis = d3.axisRight(yVoulmeAxis)
    .tickValues(d3.ticks(yVoulme.domain()[0], yVoulme.domain()[1], 5))
    .tickSizeOuter(0)
    
    
    const chartGroup = svg.append('g').attr('class', 'chart-group');
    const volumeGroup = svg.append('g').attr('class', 'volume-group').attr('transform', 'translate(0, 305)');

    const yVolumeAxisGroup = chartGroup.append("g")
    .attr("class", "volume-axis")
    .attr("transform", `translate(${width + margin.right}, 305)`)
    .call(volumeAxis);

    const yAxisGroup = chartGroup.append("g")
    .attr("class", "chart-axis")
    .attr("transform", `translate(${width + margin.right}, 0)`)
    .call(chartAxis);

    yVolumeAxisGroup.selectAll("path").attr("stroke", "#d4d6dc")
    yVolumeAxisGroup.selectAll("line").attr("stroke", "#d4d6dc")
    yAxisGroup.selectAll("path").attr("stroke", "#d4d6dc")
    yAxisGroup.selectAll("line").attr("stroke", "#d4d6dc")

    volumeGroup
    .selectAll('.volume')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'volume')
    .attr('x', (d) => x(d.candle_date_time_kst)!)
    .attr('y', (d) => yVoulme(d.candle_acc_trade_volume))
    .attr('width', x.bandwidth())
    .attr('height', (d) => voulmeHeight - yVoulme(d.candle_acc_trade_volume))
    .attr('fill', (d) => (d.opening_price > d.trade_price ? `${colors.up_color}` : `${colors.down_color}`));

    volumeGroup
    .append('rect')
    .attr('class', 'group-border')
    .attr('x', 0)
    .attr('y', -1)
    .attr('width', width)
    .attr('height', 0.2)
    .attr('stroke', '#d4d6dc')

    chartGroup
    .selectAll('.line')
    .data(data)
    .enter()
    .append('line')
    .attr('class', 'line')
    .attr('x1', (d) => x(d.candle_date_time_kst)! + x.bandwidth() / 2)
    .attr('x2', (d) => x(d.candle_date_time_kst)! + x.bandwidth() / 2)
    .attr('y1', (d) => yChart(d.high_price))
    .attr('y2', (d) => yChart(d.low_price))
    .attr('stroke', '#000');

    chartGroup
    .selectAll('.candle')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'candle')
    .attr('x', (d) => x(d.candle_date_time_kst)!)
    .attr('y', (d) => yChart(Math.max(d.opening_price, d.trade_price)))
    .attr('width', x.bandwidth())
    .attr('height', (d) => Math.abs(yChart(d.opening_price) - yChart(d.trade_price)))
    .attr('fill', (d) => (d.opening_price > d.trade_price ? `${colors.up_color}` : `${colors.down_color}`));

    volumeGroup
    .selectAll('.volume')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'volume')

    return () => {
      if (!svg.empty()) {
        let chart = svg.selectChild('.chart-group')
        let volume = svg.selectChild('.volume-group')
        chart.remove()
        volume.remove()
      }
    }
  }, [data]);

  return (
    <ChartSVG ref={chartRef} width={totalWidth + margin.left + margin.right} height={candelHeight + voulmeHeight}>
    </ChartSVG>
  );
};


export default CandleChart;

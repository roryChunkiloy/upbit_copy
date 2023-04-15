'use client'

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import colors from '@/styles/colors';
import styled, { StyledComponent } from 'styled-components';

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

const CandleChart = ({
  data
}: CandleChartProps) => {
  const chartRef = useRef<SVGSVGElement | null>(null);
  const margin = { top: 10, right: 2, bottom: 10, left: 2 };
  const width = 915;
  const candelHeight = 321 - margin.top - margin.bottom;
  const voulmeHeight = 111;

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

    const yVoulme = d3
    .scaleLinear()
    .range([voulmeHeight - margin.top, margin.bottom])
    .domain([0, d3.max(data, (d) => d.candle_acc_trade_volume)!]);

    if (!svg.empty()) {
      let chart = svg.selectChild(".chart-group")
      let volume = svg.selectChild(".volume-group")
      chart.remove()
      volume.remove()
    }
    const chartGroup = svg.append("g").attr("class", "chart-group");
    const volumeGroup = svg.append("g").attr("class", "volume-group").attr("transform", "translate(0, 310)");

    volumeGroup
    .selectAll(".volume")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "volume")
    .attr("x", (d) => x(d.candle_date_time_kst)!)
    .attr("y", (d) => yVoulme(d.candle_acc_trade_volume))
    .attr("width", x.bandwidth())
    .attr("height", (d) => voulmeHeight - yVoulme(d.candle_acc_trade_volume))
    .attr("fill", (d) => (d.opening_price > d.trade_price ? `${colors.up_color}` : `${colors.down_color}`));

    volumeGroup
    .append("rect")
    .attr("class", "group-border")
    .attr("x", 0)
    .attr("y", -1)
    .attr("width", width)
    .attr("height", 0.2)
    .attr("stroke", '#d4d6dc')

    chartGroup
    .selectAll(".line")
    .data(data)
    .enter()
    .append("line")
    .attr("class", "line")
    .attr("x1", (d) => x(d.candle_date_time_kst)! + x.bandwidth() / 2)
    .attr("x2", (d) => x(d.candle_date_time_kst)! + x.bandwidth() / 2)
    .attr("y1", (d) => yChart(d.high_price))
    .attr("y2", (d) => yChart(d.low_price))
    .attr("stroke", '#000');

    chartGroup
    .selectAll(".candle")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "candle")
    .attr("x", (d) => x(d.candle_date_time_kst)!)
    .attr("y", (d) => yChart(Math.max(d.opening_price, d.trade_price)))
    .attr("width", x.bandwidth())
    .attr("height", (d) => Math.abs(yChart(d.opening_price) - yChart(d.trade_price)))
    .attr("fill", (d) => (d.opening_price > d.trade_price ? `${colors.up_color}` : `${colors.down_color}`));

    volumeGroup
    .selectAll('.volume')
    .data(data)
    .enter()
    .append('rect')
    .attr("class", "volume")
  }, [data]);

  return (
    <svg key={`${data[0].trade_price} + ${data[0].candle_acc_trade_volume}`} ref={chartRef} width={width + margin.left + margin.right} height={candelHeight + voulmeHeight}>
    </svg>
  );
};


export default CandleChart;

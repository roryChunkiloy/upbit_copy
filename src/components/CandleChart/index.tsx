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

const ChartContainer = styled.div`
  width : 100%;
  height : 445px;
  display : flex;
  flex-wrap : wrap;
  position: relative;
`

const CandleContainer = styled.svg`
  width : 914px;
  height : 320px;
  border-bottom : 1px solid #d4d6dc;
  border-right : 1px solid #d4d6dc;
  display : flex;
`
const VolumeContainer = styled.svg`
  width : 914px;
  height : 110px;
  position : relative;
  border-bottom : 1px solid #d4d6dc;
  border-right : 1px solid #d4d6dc;
`
const CandlePrice = styled.div`
  width : 60px;
  height : 290px;
  font-size : 10px;
  padding-top : 10px;
  padding-bottom : 10px;
  padding-left : 10px;
  display : flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: left;
`
const VolumePrice = styled.div`
  width : 60px;
  height : 110px;
  font-size : 10px;
  position : relative;
  padding-top : 6px;
  padding-bottom : 6px;
  padding-left : 10px;
  
  display : flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: left;
`

const Candle : StyledComponent<'rect', {color : string, key : number, height : number, width : number, y: number, x : number }> = styled.rect`
  fill : ${props => props.color === 'up' ? '#c84a31' : '#1261c4'};
`

const Line : StyledComponent<'rect', {color : string, key : number, height : number, width : number, y: number, x : number }> = styled.rect`
  fill : black;
  stroke: black;
`
const Volume : StyledComponent<'rect', {color : string, key : number, height : number, width : number, y: number, x : number }> = styled.rect`
  fill : ${props => props.color === 'up' ? '#c84a31' : '#1261c4'};
`

const CandleChart = ({
  data
}: CandleChartProps) => {
  const [candles, setCandles] = useState<JSX.Element[]>()
  const [volumes, setVolumes] = useState<JSX.Element[]>()
  const [candleYAxis, setCandleYAxis] = useState<number[]>([])
  const [volumeYAxis, setVolumeYAxis] = useState<number[]>([])
  useEffect(() => {
    if (data.length < 10) return

    const max = d3.max(data.map(item => item.high_price)) || 0
    const min = d3.min(data.map(item => item.low_price))  || 0
    const vMax = d3.max(data.map(item => item.candle_acc_trade_volume)) || 0

    function candlePixelInverter (value : number, max: number, min: number) { // d3를 쓸거면 픽셀값을 변환해야함
      const pixel = 
      Math.abs(
        ((value - min) / (max - min)) * 300 - 300
      )
      // Math.abs(
      //   ((value - min) / (max - min)) * height
      // )
      return pixel
    }
    function volumePixelInverter (value : number, max: number, min: number) {
      const pixel = 
      Math.abs(
        ((value - min) / (max - min)) * 110
      )
      return pixel
    }

    const candles = data.map((item, idx) => {
      const width = 914 / data.length * 0.7;
      const up = item.trade_price > item.opening_price ? 'up' : 'down'
      const height = Math.abs(candlePixelInverter(item.trade_price, max, min) - candlePixelInverter(item.opening_price, max, min))
      const lineheight = Math.abs(candlePixelInverter(item.high_price, max, min) - candlePixelInverter(item.low_price, max, min))
      const time = item.time
      const y = item.trade_price > item.opening_price ? candlePixelInverter(item.trade_price, max, min) : candlePixelInverter(item.opening_price, max, min)
      const lineY = candlePixelInverter(item.high_price, max, min)
      const x = ((914 / (data.length + 1)) * (idx + 1))

      return (
        <>
          <Line key={item.high_price / (time + 1)} width={width < 10000 ? width/15 : 0} height={lineheight ? lineheight : 0} x={Math.abs(x) < 5000 ? x : 0} y={lineY < 1000 ? lineY + 10 : 0}/>
          <Candle key={time} width={width < 10000 ? width : 0} height={height ? height : 0} y={y < 1000 ? y + 10 : 0} x={Math.abs(width) < 5000 ? x - (width / 2) : 0} color={up}/>
        </>
      )
    })

    const volumes = data.map((item, idx) => {
      const width = 914 / data.length * 0.7;
      let up = 'up'
      if (idx > 0) {
        if (item.candle_acc_trade_volume > data[idx-1].candle_acc_trade_volume) up = 'up'
        else up = 'down'
      }
      const height = Math.abs(volumePixelInverter(item.candle_acc_trade_volume, vMax, 0))
      const x = ((914/ (data.length + 1)) * (idx + 1))
      const y = item.trade_price > item.opening_price ? candlePixelInverter(item.trade_price, max, min) : candlePixelInverter(item.opening_price, max, min)

      return (
        <Volume key={item.candle_acc_trade_volume / (item.time + 1)} width={Math.abs(width) < 5000 ? width : 0} height={height < 1000 ? height : 0 } y={height < 10000 ? 110 - height : 0} x={Math.abs(width) < 50000 ? x - (width / 2) : 0} color={up}/>
      )
    })

    setCandles(candles)
    setVolumes(volumes)
    setCandleYAxis([max, min + (max - min) * 0.75, min + (max - min) * 0.5, min + (max - min) * 0.25, min])
    setVolumeYAxis([vMax, vMax * 0.75, vMax * 0.5, vMax * 0.25, 0])
  }, [data])
  
  return (
    <ChartContainer>
      <CandleContainer>
        {candles}
      </CandleContainer>
      <CandlePrice>
        {candleYAxis.map((item, idx) => {
          return (
            <div key={idx}>{item.toLocaleString()}</div>
          )
        })}
      </CandlePrice>
      <VolumeContainer>
        {volumes}
      </VolumeContainer>
      <VolumePrice>
        {volumeYAxis.map((item, key) => {
          return(
            <div key={key}>{Math.floor(item)}</div>
          )
        })}
      </VolumePrice>
    </ChartContainer>
  );
};

export default CandleChart;

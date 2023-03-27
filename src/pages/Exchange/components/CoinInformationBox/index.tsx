import CandleChart from "@/components/CandleChart"
import getSnapCoinChartData, { CoinChartData } from "@/services/getSnapCoinChartData"
import colors from "@/styles/colors"
import replaceQueryString from "@/utils/replaceQueryString"
import { useEffect, useState } from "react"
import styled from "styled-components"

type coinInfomationType = {
    currentCoin: string,
    currentCoinInfo: {
        kr_name: string,
        en_name: string,
        code: string,
        trade_price: number,
        change: string,
        change_price: number,
        change_rate: number,
        acc_trade_price_24h: number,
        acc_trade_volume_24h: number,
        high_price: number,
        low_price: number,
    }
}

const Root = styled.section`
    width: 1000px;
    height: 500px;

    background-color: #fff;
`
const CoinNameBox = styled.div`
    height: 45px;
    border-bottom : 1px solid #d0d3db
`

const NameBox = styled.a`
  width : 200px;
  height : 40px;
  cursor : pointer;
  position : relative;
  top:50%;
  transform: translateY(-50%);
  display : inline-block;
`

const CoinImg = styled.img`
  width : 26px;
  height : 26px;
  position : relative;
  top:50%;
  transform: translateY(-50%);
  left: 10px;
`

const KoreanName = styled.span`
  font-weight: 700;
  font-size: 20px;
  position : relative;
  left : 17px;
  top : 1px;
  display : inline-block;
`

const Ticker = styled.span`
  font-size: 10px;
  position : relative;
  left : 20px;
  top : 2px;
`

/* const Arrow = styled.div`
  width :20px;
  height : 20px;
  background: url('https://cdn.upbit.com/upbit-web/images/ico_select_1.34dc566.png');
  background-repeat: no-repeat;
  position : relative;
  left : 180px;
  top : -13px;
` */

const CurrentCoinInfoBox = styled.div`
  width: 100%;
  height : 90px;
  display : flex;
`

const PriceBox = styled.div`
  width : 300px;
  height : 70px;
  position : relative;
  top : 50%;
  transform: translateY(-50%);
  left : 20px
`

const Price = styled.strong<{change: string}>`
  color : black;
  font-size: 32px;
  font-weight: 900;
  ${(props) => props.change === 'RISE' && {color : `${colors.up_color}`}}
  ${(props) => props.change === 'FALL' && {color : `${colors.down_color}`}}
`

const PriceKRW = styled.span<{change: string}>`
  color : black;
  font-size: 15px;
  font-weight: 400;
  ${(props) => props.change === 'RISE' && {color : `${colors.up_color}`}}
  ${(props) => props.change === 'FALL' && {color : `${colors.down_color}`}}
`

const ChangedInfoBox = styled.div`
    display: flex;
    font-size: 13px;
    align-items: center;
`

const ChnagedRate = styled.span<{change: string}>`
  color : black;
  font-size: 15px;
  font-weight: 400;
  ${(props) => props.change === 'RISE' && {color : `${colors.up_color}`}}
  ${(props) => props.change === 'FALL' && {color : `${colors.down_color}`}}
  margin-left : 10px;
  ::before  {
    content : '${props => props.change === 'FALL' ? '-' : '+'}'
  }
`

const ChangedPrice = styled.span<{change: string}>`
  color : black;
  font-size: 15px;
  font-weight: 400;
  ${(props) => props.change === 'RISE' && {color : `${colors.up_color}`}}
  ${(props) => props.change === 'FALL' && {color : `${colors.down_color}`}}
  margin-left : 5px;
::before  {
  content : '${props => props.change === 'FALL' ? '▼' : '▲'}'
}
`
// ExtraInfo 부분 선언적으로 개선할 여지 있음
const ExtraInfo = styled.div`
  width : 400px; 
  height : 80px;
  position : relative;
  top : 50%;
  transform: translateY(-45%);
  left : 280px;
  display : grid;
  grid-template-rows : 1fr 1fr;
  grid-template-columns : 1fr 1fr;
  place-items: center;
`

const ExtraItem = styled.div`
  width : 180px; 
  height : 35px;
  font-size : 12px;
  font-weight : 400;
  
  padding-top : 6px;
  
  display : flex;
  justify-content: space-between;
`
const ChartBox = styled.div`
    height: 500px;
    background-color: #fff;
`

const SortSelectBox = styled.div`
  width : 100%;
  height : 40px;
  background : #efefef;
  border-top : 1px solid #d4d6dc;
  border-bottom : 1px solid #d4d6dc;
`

const SortOptionContainer = styled.div`
  width : 300px;
  height: 100%;
  display : flex;
  align-items : center;
`

const Selector = styled.input`
  width : 15px;
  height : 15px;
  margin-left :20px;
  margin-right : 5px;
`

const ChartActionBox = styled.div`
  
`


const CoinInformationBox = ({
    currentCoin,
    currentCoinInfo
}: coinInfomationType) => {
    const imgUrl = `https://static.upbit.com/logos/${currentCoin}.png`
    const [chartSort, setChartSort] = useState('minutes/60')
    const [chartDataFrom, setChartDataFrom] = useState(0)
    const [charDataCount, setChartDataCount] = useState(200)
    const [candleData, setCandleData] = useState<CoinChartData[]>([])
    const [chartMouseDown, setChartMouseDown] = useState(false)
    const [chartDragStartPoint, setChartDragStartPoint] = useState(0)
    const [chartDragEndPoint, setChartDragEndPoint] = useState(0)
    const [chartDragTrot, setChartDragTrot] = useState(true)
    const [upbitGetApiTrot, setUpbitGetApiTrot] = useState(true)

    const chartSortSelect = (e: React.MouseEvent) => {
      setChartSort((e.currentTarget as HTMLInputElement).value)
    }

    const MouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      setChartMouseDown(true)
      setChartDragStartPoint(e.clientX)
    }

    const MouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
      setChartMouseDown(false)
    }

    const MouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!chartMouseDown) return
      if (chartDragTrot) {
        setChartDragEndPoint(e.clientX)
        setChartDragTrot(false)
        setTimeout(() => {
          setChartDragTrot(true)
        }, 50)
      }
    }

    useEffect(() => {
      const containerWidth = 914
      const start = chartDragStartPoint
      const moved = chartDragEndPoint
      const candleWidth = containerWidth / candleData.length

      const movingCount = (start - moved) > 0 ? (Math.ceil((start - moved) / candleWidth)) : (Math.floor((start - moved) / candleWidth))
      setChartDragStartPoint(moved)
      if (chartDataFrom - movingCount < 0) return
      setChartDataFrom(c => c - movingCount)
    }, [chartDragEndPoint])


    useEffect(() => {
      const data = getSnapCoinChartData({
        chartSort: chartSort,
        coin: currentCoin,
      })

      data.then(res => setCandleData(res))

      setChartDataFrom(0)

    }, [currentCoin, chartSort])

    useEffect(() => {
      if (!candleData.length) return
      const originalData = candleData
      const length = originalData.length
      const lastData = candleData[candleData.length-1].candle_date_time_kst

      if (charDataCount + chartDataFrom * 1.5 > length) {
        if (lastData === '') return
        if (!upbitGetApiTrot) return
        setUpbitGetApiTrot(false)
        let date = new Date(lastData)
        const LastDataTime = date.toISOString()
        const data = getSnapCoinChartData({
          chartSort: chartSort,
          coin: currentCoin,
          periodTo: LastDataTime
        })
        data.then(res => {
          let candleDataCopy = candleData.slice()
          candleDataCopy.push(...res)
          setCandleData(candleDataCopy)
          setUpbitGetApiTrot(true)
        })
      }
    }, [chartDataFrom, charDataCount])


    return (
        <Root>
            <CoinNameBox>
                <NameBox>
                    <CoinImg src={imgUrl}/>
                    <KoreanName>{currentCoinInfo.kr_name}</KoreanName>
                    <Ticker>{currentCoinInfo.code}</Ticker>
                </NameBox>
            </CoinNameBox>
            <CurrentCoinInfoBox>
                <PriceBox>
                    <Price change={currentCoinInfo.change}>{currentCoinInfo.trade_price.toLocaleString()}</Price>
                    <PriceKRW change={currentCoinInfo.change}>KRW</PriceKRW>
                    <ChangedInfoBox>
                        전일대비
                        <ChnagedRate change={currentCoinInfo.change}>{`${(currentCoinInfo.change_rate * 100).toFixed(2)}%`}</ChnagedRate>
                        <ChangedPrice change={currentCoinInfo.change}>{Math.floor(currentCoinInfo.change_price).toLocaleString()} </ChangedPrice>
                    </ChangedInfoBox>
                </PriceBox>
                <ExtraInfo>
                    <ExtraItem style={{ borderBottomWidth: 1, borderBottomStyle: 'solid', borderBottomColor: '#e9ecf1'}}>
                        <div>고가</div>
                        <div style={{color : `${colors.up_color}`, fontSize : 14, fontWeight:600}}>{currentCoinInfo.high_price.toLocaleString()}</div>
                    </ExtraItem>
                    <ExtraItem style={{ borderBottomWidth: 1, borderBottomStyle: 'solid', borderBottomColor: '#e9ecf1'}}>
                        <div>거래량(24H)</div>
                        <div style={{fontSize : 14, fontWeight:400}}>{currentCoinInfo.acc_trade_volume_24h.toLocaleString()}</div>
                    </ExtraItem>
                    <ExtraItem>
                        <div>저가</div>
                        <div style={{color : `${colors.down_color}`, fontSize : 14, fontWeight:600}}>{currentCoinInfo.low_price.toLocaleString()}</div>
                    </ExtraItem>
                    <ExtraItem>
                        <div>거래대금(24H)</div>
                        <div style={{fontSize : 12, fontWeight:400}}>{Math.floor(currentCoinInfo.acc_trade_price_24h).toLocaleString()}</div>
                    </ExtraItem>
                </ExtraInfo>
            </CurrentCoinInfoBox>
            <ChartBox>
              <SortSelectBox>
                <SortOptionContainer>
                  <Selector onClick={chartSortSelect} type={'radio'} name={'chart'} id={'hour'} value={'minutes/60'} defaultChecked></Selector>
                  <label htmlFor="hour">hour</label>
                  <Selector onClick={chartSortSelect} type={'radio'} name={'chart'} id={'day'} value={'days'}></Selector>
                  <label htmlFor="day">day</label>
                  <Selector onClick={chartSortSelect} type={'radio'} name={'chart'} id={'week'} value={'weeks'}></Selector>
                  <label htmlFor="week">week</label>
                </SortOptionContainer>
              </SortSelectBox>
              <div onMouseDown={MouseDown} onMouseLeave={MouseUp} onMouseUp={MouseUp} onMouseMove={MouseMove}>
                <CandleChart data={candleData.slice(chartDataFrom, chartDataFrom + charDataCount).reverse()}></CandleChart>
              </div>
            </ChartBox>
        </Root>
    )

}

export default CoinInformationBox
import axios from "axios"

interface UpbitChartData {
    candle_acc_trade_price : number,
    candle_acc_trade_volume : number,
    candle_date_time_kst : string,
    candle_date_time_utc : string,
    high_price : number,
    low_price : number,
    market : string,
    opening_price : number,
    timestamp : number,
    trade_price : number,
    unit? : number
}

type GetSnapCoinChartDataProps = {
  chartSort: string,
  coin: string,
  periodTo?: string
}

type CoinChartData = {
  time : number,
  opening_price : number,
  trade_price : number,
  high_price : number,
  low_price : number,
  candle_acc_trade_volume : number,
  candle_date_time_kst : string,
}

const getSnapCoinChartData = async ({
  chartSort,
  coin,
  periodTo,
}: GetSnapCoinChartDataProps) => {
  let URL = `https://api.upbit.com/v1/candles/${chartSort}?market=KRW-${coin}&count=200`
  if (periodTo) URL += `&to=${periodTo}`
  const snapCoinChartData : CoinChartData[] = []
  await axios.get(URL).then(res => {
    const data : UpbitChartData[] = res.data 
    data.map((item, idx) => {
      snapCoinChartData.push({
        time : idx,
        opening_price : item.opening_price,
        trade_price : item.trade_price,
        high_price : item.high_price,
        low_price : item.low_price,
        candle_acc_trade_volume : item.candle_acc_trade_volume,
        candle_date_time_kst : item.candle_date_time_kst,
      })
    })
  }).catch(err => {
    console.log('Error', `${err}더 이상은 크립토 데이터가 없습니다`)
  });

  return snapCoinChartData;
}

export default getSnapCoinChartData

export type {CoinChartData}
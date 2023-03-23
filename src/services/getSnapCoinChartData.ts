import axios from "axios"

interface upbitChartData {
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

type getSnapCoinChartDataProps = {
  chartSort: string,
  coin: string,
  periodTo?: number
}

type coinChartData = {
  time : number,
  open : number,
  trade : number,
  high : number,
  low : number,
  volume : number,
  candle_date_time_kst : string,
}

const getSnapCoinChartData = async ({
  chartSort,
  coin,
  periodTo,
}: getSnapCoinChartDataProps) => {
  let URL = `https://api.upbit.com/v1/candles/${chartSort}?market=KRW-${coin}&count=200`
  if (periodTo) URL += `&to=${periodTo}`
  const snapCoinChartData : coinChartData[] = []
  await axios.get(URL).then(res => {
    const data : upbitChartData[] = res.data 
    data.map((item, idx) => {
      snapCoinChartData.push({
        time : idx,
        open : item.opening_price,
        trade : item.trade_price,
        high : item.high_price,
        low : item.low_price,
        volume : item.candle_acc_trade_volume,
        candle_date_time_kst : item.candle_date_time_kst,
      })
    })
  }).catch(err => {
    console.log('Error', `${err}더 이상은 크립토 데이터가 없습니다`)
  });

  return snapCoinChartData;
}

export default getSnapCoinChartData
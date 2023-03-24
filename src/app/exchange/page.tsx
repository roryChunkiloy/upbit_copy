import ExchangePage from "@/pages/Exchange";
import getSnapCoinChartData from "@/services/getSnapCoinChartData";

export const metadata = {
  title: '업비트 룰루랄라',
  description: '디지털 자산, 비트코인, 이더리움, 리플, 에이다, 솔라나 등 알트코인 거래.',
}

export default function Exchange() {
    return (
      <ExchangePage/>
    )
}
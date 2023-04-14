'use client'
import { useEffect, useState } from "react";
import {Helmet} from "react-helmet";
import CoinListTable, { CoinInfo } from "./components/CoinListTable";
import replaceQueryString from "@/utils/replaceQueryString";
import CoinInformationBox from "./components/CoinInformationBox";
import styled from "styled-components";

const CoinList: {
    kr_name: string,
    en_name: string,
    ticker: string,
}[] = [
    {
        kr_name: '비트코인',
        en_name: 'Bitcoin',
        ticker: 'BTC',
    },
    {
        kr_name: '이더리움',
        en_name: 'Ethereum',
        ticker: 'ETH',
    },
    {
        kr_name: '솔라나',
        en_name: 'Solana',
        ticker: 'SOL',
    },
    {
        kr_name: '리플',
        en_name: 'Ripple',
        ticker: 'XRP',
    },
    {
        kr_name: '스택스',
        en_name: 'Stax',
        ticker: 'STX',
    },
    {
        kr_name: '네오',
        en_name: 'NEO',
        ticker: 'NEO',
    },
    {
        kr_name: '도지코인',
        en_name: 'DodgeCoin',
        ticker: 'DOGE',
    },
    {
        kr_name: '오미세고',
        en_name: 'Omisego',
        ticker: 'OMG',
    },
    {
        kr_name: '샌드박스',
        en_name: 'Sandbox',
        ticker: 'SAND',
    },
    {
        kr_name: '가스',
        en_name: 'Gas',
        ticker: 'GAS',
    },
    {
        kr_name: '트론',
        en_name: 'Tron',
        ticker: 'TRX',
    },
    {
        kr_name: '어거',
        en_name: 'Augur',
        ticker: 'Rep',
    },
    {
        kr_name: '코스모스',
        en_name: 'Cosmos',
        ticker: 'ATOM',
    },
    // 형식에 맞게 여기 추가하면 코인 리스트에 추가됩니다.
]

const Root = styled.div`
    
`

const ExchangePageSection = styled.section`
    width: 1430px;
    display: flex;
    justify-content: space-around;
    padding-top:10px;

`
const ExchangePage = () => {
    const [coinInfoList, setCoinInfoList] = useState<CoinInfo[]>(
        CoinList.map((item) => {
            const coinInfo = {
                kr_name: item.kr_name,
                en_name: item.en_name,
                code: `KRW-${item.ticker}`,
                trade_price: 0,
                change: '',
                change_rate: 0,
                change_price: 0,
                acc_trade_price_24h: 0,
                current: false,
                acc_trade_volume_24h: 0,
                high_price: 0,
                low_price: 0,
            }
            return coinInfo
        })
    )
    const totalCoins = CoinList.map((item) => `KRW-${item.ticker}`)
    const [currentCoin, setCurrentCoin] = useState(window?.location.search === '' ? 'BTC' : window?.location.search.substring(1))
    const [currentCoinInfo, setCurrentCoinInfo] = useState({
        kr_name: '',
        en_name: '',
        code: ``,
        trade_price: 0,
        change: '',
        change_price: 0,
        change_rate: 0,
        high_price: 0,
        low_price: 0,
        acc_trade_volume_24h: 0,
        acc_trade_price_24h: 0,
    })
    const [currentCoinPrice, setCurrentCoinPrice] = useState(0);
    
    useEffect(() => {
        const location = window.location
        if (location.search === '') {
            setTimeout(()=> {
                replaceQueryString('BTC')
            })
        }

        const webSocket = new WebSocket('wss://api.upbit.com/websocket/v1');
        webSocket.binaryType = 'arraybuffer';
        webSocket.onopen = () => {
          const str = [{"ticket":"test"},{"type":"ticker","codes":totalCoins}]
          webSocket.send(JSON.stringify(str))
        }
    
        webSocket.onmessage = (evt) => {
            let enc = new TextDecoder("utf-8");
            let arr = new Uint8Array(evt.data);
            let data: CoinInfo = JSON.parse(enc.decode(arr));
            const coinInfoListCopy = coinInfoList.slice()
            coinInfoListCopy.map((item) => {
                if (item.code === data.code) {
                    item.trade_price = data.trade_price;
                    item.change = data.change;
                    item.acc_trade_price_24h = data.acc_trade_price_24h;
                    item.change_price = data.change_price;
                    item.change_rate = data.change_rate;

                    if (item.code.split('-')[1] === currentCoin) {
                        item.current = true
                        setCurrentCoinInfo({
                            kr_name: item.kr_name,
                            en_name: item.en_name,
                            code: item.code,
                            change: item.change,
                            change_price: item.change_price,
                            change_rate: item.change_rate,
                            trade_price: item.trade_price,
                            acc_trade_price_24h: item.acc_trade_price_24h,
                            acc_trade_volume_24h: data.acc_trade_volume_24h,
                            high_price: data.high_price,
                            low_price: data.low_price,
                        })
                    } else item.current = false
                }
            })
            setCoinInfoList(coinInfoList.slice())
            // 소켓을 두개 사용하는 방법도 가능하고, 더 좋은 방법에 대한 고민 필요...
            if (data.code.split('-')[1] === currentCoin) {
                setCurrentCoinPrice(data.trade_price)

            }
        }
        return () => {
          webSocket.close()
        }
    }, [currentCoin])
    return (
        <Root>
            <Helmet>
                <title>{currentCoinPrice.toLocaleString()+' '+currentCoin}</title>
            </Helmet>

            <ExchangePageSection>
                <CoinInformationBox currentCoin={currentCoin} currentCoinInfo={currentCoinInfo}/>
                <CoinListTable coinInfoList={coinInfoList} setCoin={setCurrentCoin}/>
            </ExchangePageSection>
        </Root>
    )
}

export default ExchangePage
'use client'
import getSnapCoinChartData from "@/services/getSnapCoinChartData"
import { useEffect, useState } from "react";
import {Helmet} from "react-helmet";
import { useRouter } from "next/router"
import styled from "styled-components";
import getQueryString from "@/utils/getQueryString";
import CoinListTable, { CoinInfo } from "./components/CoinListTable";


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
    // 형식에 맞게 여기 추가하면 코인 리스트에 추가됩니다.
]

const ExchangePage = () => {
    const location = window.location
    const history = window.history
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
            }
            return coinInfo
        })
    )
    const [selected, setSelected] = useState(CoinList[0])
    const totalCoins = CoinList.map((item) => `KRW-${item.ticker}`)

    useEffect(() => {
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
                }
            })
            setCoinInfoList(coinInfoList.slice())
        }
        return () => {
          webSocket.close()
        }
    }, [])

    
    return (
        <>
            <Helmet>
                <title> 니냐니냐뇨 </title>
            </Helmet>

            <CoinListTable coinInfoList={coinInfoList}/>
        </>
    )
}

export default ExchangePage
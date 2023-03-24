import styled from "styled-components";

type CoinInfo = {
    kr_name: string;
    en_name: string;
    code: string;
    trade_price: number;
    change: string;
    change_rate: number;
    change_price: number;
    acc_trade_price: number;
}

type CoinListTableType = {
    coinInfoList: CoinInfo[]
}

const Root = styled.div`
    width: 400px;
    height: 1000px;
    border: 1px solid
`

const CoinListTable = ({
    coinInfoList
}: CoinListTableType) => {


    return (
        <Root>
        </Root>
    )
}

export default CoinListTable

export type { CoinInfo }
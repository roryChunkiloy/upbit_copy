'use client'

import styled from "styled-components";
import colors from "@/styles/colors";
import { it } from "node:test";
import replaceQueryString from "@/utils/replaceQueryString";
import React, { TableHTMLAttributes } from "react";

type CoinInfo = {
    kr_name: string;
    en_name: string;
    code: string;
    trade_price: number;
    change: string;
    change_rate: number;
    change_price: number;
    acc_trade_price_24h: number;
    current: boolean;
    acc_trade_volume_24h: number;
    high_price: number;
    low_price: number;
}

type CoinListTableType = {
    coinInfoList: CoinInfo[],
    setCoin: any
}

const Root = styled.div`
    width: 400px;
    background-color: #fff;
    position: relative;
`
const Table = styled.table`
    width: 100%;

    font-size: 11px;
    border-collapse: collapse;

`
const THead = styled.thead`
    font-size: 10px;
    color: ${colors.table_head_font_color};

    height: 30px;
    background-color: ${colors.table_head_bg_color};
`

const TH = styled.th<{width: number}>`

`
const TBody = styled.tbody`
    font-size: 11px;
    color: ${colors.table_body_font_color};
`

const TR = styled.tr<{current: boolean}>`
    height: 45px;

    cursor: pointer;
    padding : 0;

    border-top: 1px solid #d0d3db;
    background-color: ${(props) => props.current && colors.table_body_hover_color}; 

    &:hover{
        background-color: ${colors.table_body_hover_color};
    }
`
const TD = styled.td`
    position: relative;
`
const TDContainer = styled.div<{col: number, change?: string}>`
    display: inline-flex;
    flex-direction: column;

    position: absolute;
    top: 10px;
    ${(props) => props.col === 1 && {left: 30, alignItems: "baseline"}};
    ${(props) => props.col === 2 && {right: 30, color: props.change === 'RISE' ? colors.up_color : colors.down_color}};
    ${(props) => props.col === 3 && {right: 20, alignItems: "end", color: props.change === 'RISE' ? colors.up_color : colors.down_color}};
    ${(props) => props.col === 4 && {right: 20}};
`

const TableHeadData = [
    {
        content: '한글명',
        width: 146
    },
    {
        content: '현재가',
        width: 88
    },
    {
        content: '전일대비',
        width: 78
    },
    {
        content: '거래대금',
        width: 88
    },
]

const CoinListTable = ({
    coinInfoList,
    setCoin
}: CoinListTableType) => {
    const tableRowClick = (e: React.MouseEvent) => {
        const code = (e.currentTarget as HTMLElement).dataset.code;
        setCoin(code as string)
        replaceQueryString(code as string)
    }

    return (
        <Root>
            <Table> 
            {/* // 테이블 스타일링 enhance 필요... */}
                <THead>
                    {
                        TableHeadData.map((item, idx) => {
                            return (
                                <TH key={idx} width={item.width}>{item.content}</TH>
                            )
                        })
                    }      
                </THead>
                <TBody>
                        {
                            coinInfoList.map((item, idx) => {
                                return (
                                    <TR key={idx} data-code={item.code.split('-')[1]} onClick={tableRowClick} current={item.current}>
                                        <TD>
                                            <TDContainer col={1}>
                                                <div>
                                                    <strong>
                                                        {item.kr_name}
                                                    </strong>
                                                </div>
                                                <div>
                                                    <em>
                                                        {item.code.split('-').reverse().join('/')}
                                                    </em>
                                                </div>
                                            </TDContainer>
                                        </TD>
                                        <TD>
                                            <TDContainer col={2} change={item.change}>
                                                <strong>
                                                    {item.trade_price.toLocaleString()}
                                                </strong>
                                            </TDContainer>
                                        </TD>
                                        <TD>
                                            <TDContainer col={3} change={item.change}>
                                                <div>
                                                    <strong>
                                                        {(item.change === 'RISE' ? '+' : '-') +(item.change_rate*100).toFixed(2)+'%'}
                                                    </strong>
                                                </div>
                                                <div>
                                                    <em>
                                                        {item.change_price.toLocaleString()}
                                                    </em>
                                                </div>
                                            </TDContainer>
                                        </TD>
                                        <TD>
                                            <TDContainer col={4}>
                                                <strong>
                                                    {Math.ceil(item.acc_trade_price_24h/1000000).toLocaleString()+'백만'}
                                                </strong>
                                            </TDContainer>
                                        </TD>
                                    </TR>
                                )
                            })
                        }

                </TBody>
            </Table>
        </Root>
    )
}

export default CoinListTable

export type { CoinInfo }
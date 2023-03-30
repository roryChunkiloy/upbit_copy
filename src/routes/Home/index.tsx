'use client'

import colors from "@/styles/colors"
import styled from "styled-components"
import LinkButton from "@/components/LinkButton"
import BaseRisingNumberText from "@/components/RisingNumberText"
import { it } from "node:test"


const Root = styled.section`
    width: 100%;
    height: 580px;
    background: url(https://cdn.upbit.com/upbit-web/images/main_gal_map.55adf02.png);
    background-color: ${colors.home_bg_color};

    border-top: 1px solid #fff;
    display: flex;

    justify-content: center;
    align-items: center;
`

const TitleBox = styled.div`
    font-family: 'Roboto';
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;
    position: relative;
    top: -50px;
`

const Title =styled.h1`
    color: ${colors.home_title_font};
    font-size: 36px;
    font-weight: 400;
    margin-bottom: 10px;
`
const SubTitle =styled.span`
    color: ${colors.home_subtitle_font};
    font-size: 16px;
    font-weight: 400;
`

const MarketInformationBox = styled.div`
    width: 340px;
    height: 75px;
    margin-top: 50px;
    display: flex;
    justify-content: space-between;

`
const MarketInformationItem = styled.div`
    width: 170px;
    width: 100%;

`

const RisingNumberText = styled(BaseRisingNumberText)`
    font-size: 48px;
    color: ${colors.home_rising_number};
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;

`
const RisingNumberLable = styled.div`
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    color: ${colors.home_risign_text}
`

const Link = styled(LinkButton)`
    display: block;
    width: 200px;
    height: 50px;
    color: #fff;
    margin-top: 50px;
    background-color: ${colors.home_link_button};
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const marketInformations: MarketInformationsType[] = [
    {
        contents: 'Digital Assets',
        targetNumber: 191,
        duration: 1000,
    },
    {
        contents: 'Markets',
        targetNumber: 301,
        duration: 1000,
    },
]

type MarketInformationsType = {
    contents: string,
    targetNumber: number,
    duration: number
}

const HomePage = () => {
    return (
        <Root>
            <TitleBox>
                <Title>가장 신뢰받는 글로벌 표준 디지털 자산 거래소</Title>
                <SubTitle>안전하고 투명한 시스템으로 빠르고 편리한 거래 환경을 제공합니다.</SubTitle>
                <MarketInformationBox>
                    {marketInformations.map((item, idx) => {
                        return (
                            <MarketInformationItem key={idx}>
                                <RisingNumberText className={item.contents} targetNumber={item.targetNumber} duration={item.duration}/>
                                <RisingNumberLable>{item.contents}</RisingNumberLable>
                            </MarketInformationItem>
                        )
                    })}
                </MarketInformationBox>
                <Link className={'homeLinkedButton'} isNew={false} to={'/exchange'} content={'거래소 바로가기'}/>
            </TitleBox>
        </Root>
    )
}

export default HomePage
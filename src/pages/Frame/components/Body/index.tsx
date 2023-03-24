'use client'
import styled from "styled-components"
import LinkButton from "@/components/LinkButton"
import Logo from "@/pages/Frame/components/Logo"
import H1 from "@/components/H1"
import colors from "@/styles/colors"

type FrameProps = {
    pathName: string
}

const Root = styled.div<{isHome: boolean}>`
    width: 100%;
    height: 60px;
    background: ${(props) => props.isHome ? colors.home_bg_color : colors.default_bg_color};
    color: ${(props) => props.isHome? colors.home_font_color : colors.default_font_color};
    position: relative;
    display: flex;

    padding-left: 20px;
    align-items: center;
`

const FrameNavigation = styled.nav`
    width: 587px;
    height: 22px;

    margin-left : 60px;
    display :flex;
    align-items: center;
`
const NavigationList = styled.ul`
    font-size: 15px;
    font-weight: 400;

    width: 100%;
    height: 100%;
    display :flex;
    align-items: center;
    justify-content: space-between;
`
const NavigationItem = styled.li`
    height: 100%;
    font-weight: 400;
    display :flex;
    align-items: end;

    position: relative;

    &:hover {
        font-weight: 600;
    }
`

const FrameLinkButton = styled(LinkButton)`
`
const FrameNavigationItems = [
    {
        to: '/exchange',
        content: '거래소',
        isNew: false,
    },
    {
        to: '/',
        content: '입출금',
        isNew: false,
    },
    {
        to: '/',
        content: '투자내역',
        isNew: false,
    },
    {
        to: '/',
        content: '코인동향',
        isNew: false,
    },
    {
        to: '/',
        content: '스테이킹',
        isNew: true,
    },
    {
        to: '/',
        content: 'NFT',
        isNew: false,
    },
    {
        to: '/',
        content: '고객센터',
        isNew: false,
    },
];


const FrameBody = ({
    pathName
}: FrameProps) => {
    return (
        <Root isHome={pathName === '/'}>
            <H1>
                <Logo isHome={pathName === '/'}/>     
            </H1>
            <FrameNavigation>
                <NavigationList>
                    {FrameNavigationItems.map((item, idx) => {
                        return(
                            <NavigationItem key={idx}>
                                <FrameLinkButton to={item.to} content={item.content} isNew={item.isNew}/>
                            </NavigationItem>
                        )
                    })}
                </NavigationList>
            </FrameNavigation>
        </Root>
    )
}

export default FrameBody
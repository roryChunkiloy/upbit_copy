'use client'
import Link from "next/link"
import styled from "styled-components"
import logoUrl from "./logo_url"

const Root = styled(Link)<{isHome: boolean}>`
    width : 77px;
    height : 17px;
    background-image: ${(props) => props.isHome ? `url(${logoUrl.home})` : `url(${logoUrl.default})`};
    background-repeat: no-repeat;
    cursor: pointer;
    display : inline-block;
    position : relative;
`

type LogoProps = {
    isHome: boolean
}

const Logo = ({
    isHome
}: LogoProps) => {
    return (
        <Root href={'/'} isHome={isHome}></Root>
    )
}

export default Logo
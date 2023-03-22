import React, { ReactNode } from "react"
import styled from "styled-components"

const Root = styled.h1`
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`

type H1Props = {
    children: ReactNode,
}

const H1 = ({
    children
}: H1Props) => {
    return (
        <Root>{children}</Root>
    )
}

export default H1
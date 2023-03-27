'use client'
import Link from "next/link"
import styled from "styled-components"

type LinkButtonProps = {
    to: string,
    content: string,
    isNew: boolean
    className: string
}
const Root = styled(Link)`
`

const Badge = styled.i`
    display: block;
    width: 12px;
    height: 12px;
    background-image: url('https://cdn.upbit.com/upbit-web/images/icon_new_tag.e14c003.svg');
    background-repeat: no-repeat;
    margin-left: 4px;
`

const LinkButton = ({
    to,
    content,
    isNew,
    className,
}: LinkButtonProps) => {
    return (
        <Root href={to} className={className}>
            {content}
            {isNew && 
                <Badge/>
            }
        </Root>
    )
}

export default LinkButton
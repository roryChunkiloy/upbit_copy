'use client'
import { useEffect, useState } from "react"
import styled from "styled-components"

type RisingNumberBoxProps = {
    targetNumber: number
    duration: number
    className: string
}

const Root = styled.div`

`

const RisingNumberBox = ({
    targetNumber,
    duration,
    className
}: RisingNumberBoxProps) => {
    const [number, setNumber] = useState(0)

    useEffect(() => {
        const step = Math.ceil(targetNumber / (duration / 10))
        let startNumber = 0
        const interval = setInterval(() => {
            startNumber += step;
            setNumber(startNumber)
            if (startNumber >= targetNumber) {
                setNumber(targetNumber)
                clearInterval(interval)
            }
        }, 10)
    }, [])

    return (
        <Root className={className}>
            {number}
        </Root>
    )
}

export default RisingNumberBox
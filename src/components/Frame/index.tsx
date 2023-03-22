'use client'
import { usePathname } from "next/navigation"
import FrameBody from "./components/Body"

const Frame = () => {
    const pahtName = usePathname()
    console.log(pahtName)
    return (
        <FrameBody pathName={pahtName}/>
    )
}

export default Frame
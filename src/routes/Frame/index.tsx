'use client'
import { usePathname } from "next/navigation"
import FrameBody from "./components/Body"

const Frame = () => {
    const pahtName = usePathname()
    return (
        <FrameBody pathName={pahtName as string}/>
    )
}

export default Frame
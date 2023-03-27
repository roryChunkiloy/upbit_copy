import StyledComponentsRegistry from "@/lib/registry"
import Frame from "../pages/Frame"
import './globals.css'
import styled from "styled-components"
import colors from "@/styles/colors"
import Head from "next/head"

export const metadata = {
  title: '업비트 - 가장 신뢰받는 디지털 자산 거래소',
  description: '디지털 자산, 비트코인, 이더리움, 리플, 에이다, 솔라나 등 알트코인 거래.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        <StyledComponentsRegistry>
          <div className="background">
            <Frame/>
            {children}
          </div>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}

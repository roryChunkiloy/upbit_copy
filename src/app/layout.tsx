import Frame from "../pages/Frame"
import './globals.css'


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
          <Frame/>
          {children}
      </body>
    </html>
  )
}

import dynamic from "next/dynamic";

const ExchangePage = dynamic(
  () => import("@/pagesComponents/Exchange"),
  {ssr: false}
)

export default function Exchange() {
    return (
      <ExchangePage/>
    )
}
import dynamic from "next/dynamic";

const ExchangePage = dynamic(
  () => import("@/routes/Exchange"),
  {ssr: false}
)

export default function Exchange() {
    return (
      <ExchangePage/>
    )
}
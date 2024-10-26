"use client"

import React from "react";
import Image from "next/image";
import MastercardLogo from "../../public/images/mastercard-logo.webp";
import NetellerLogo from "../../public/images/neteller-logo.webp";
import PaypalLogo from "../../public/images/paypal-logo.webp";
import skrillLogo from "../../public/images/skrill-logo.webp";
import VisaLogo from "../../public/images/visa-logo.webp";
import WireLogo from "../../public/images/wiretransfer-logo.webp";
import bgChart from "../../public/images/chart.png";
import homebtc from "../../public/images/homebtc.png";
import CandleIcon from "../../public/images/CandleIcon.png";
import Currency from "../../public/images/currency.webp";
import Stocks from "../../public/images/stocks.webp";
import Commodities from "../../public/images/commodities.webp";

import FAQSection from "@/components/faq"
import CardLayout from "@/components/CardLayout"
import AccountUpgrade from "@/components/account-upgrade"
import Link from "next/link";
import Header from "@/components/Header-index";


const PaymentInfo = [
  MastercardLogo,
  NetellerLogo,
  PaypalLogo,
  VisaLogo,
  WireLogo,
  skrillLogo,
];

const GlobalMarketsInfo = [
  {
    img: Currency,
    h4: "Currency",
    p: "Trade in the world's largest market with access to all global currencies",
  },
  {
    img: Stocks,
    h4: "Stocks",
    p: "Trade stocks of the biggest names in the international stocks market",
  },
  {
    img: Commodities,
    h4: "Commodities",
    p: "Diversify your financial portfolio and trade oil, natural gas and metals",
  },
];

const MiniChartSection = () => {

  const MiniChartData = ["FX:EURUSD", "BITSTAMP:BTCUSD", "NASDAQ:MSFT"];

  return (
    <section className=" py-5 " id="chart" style={{
      // use the src property of the image object
      backgroundImage: `url(${bgChart.src})`,
      // other styles
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      width: "100%",
      // height: "100vh",

      // display: "flex",
      // alignItems: "center",
      // justifyContent: "center",
    }}>
      <div className=" px-4">
        <p className=" text-center text-xl font-bold text-gray-300">
          Forex Trading
        </p>
        <h2 className=" text-center text-5xl text-gray-200 font-bold my-4">
          Top <span className="text-green-500">Pricing</span> List in Market
        </h2>
      </div>
      <div className=" grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3 my-6">
        {MiniChartData.map((value, index) => {
          return <MiniChart data={value} key={index} />;
        })}
      </div>
    </section>
  );
};

const MiniChart = (props) => {
  const { widgetProps, widgetPropsAny, data } = props;

  const ref = React.createRef();

  React.useEffect(() => {
    let refValue;

    if (ref.current) {
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";

      script.async = true;
      script.type = "text/javascript";
      script.innerHTML = JSON.stringify({
        symbol: `${data}`,
        width: 350,
        height: 220,
        locale: "en",
        dateRange: "12M",
        colorTheme: "dark",
        isTransparent: false,
        autosize: false,
        largeChartUrl: "",
      });

      ref.current.appendChild(script);
      refValue = ref.current;
    }

    return () => {
      if (refValue) {
        while (refValue.firstChild) {
          refValue.removeChild(refValue.firstChild);
        }
      }
    };
  }, [ref, widgetProps, widgetPropsAny, data]);

  return <div ref={ref} className=" mt-4 " />;
};

const GlobalMarkets = () => {
  // const router = useRouter()
  return (
    <section className=" bg-[#f5f8f7] py-8">
      <p className=" text-center text-xl font-bold text-gray-400">
        {" "}
        Investment Options{" "}
      </p>
      <h2 className=" text-center text-5xl text-gray-800 font-bold my-4">
        Access and Trade <span className="text-green-500">Global Markets</span>
      </h2>
      <div className=" grid grid-cols-1 gap-5 place-items-center md:grid-cols-3">
        {GlobalMarketsInfo.map(({ img, h4, p }, index) => {
          return (
            <ul
              key={index}
              className=" text-center rounded-md py-3 w-11/12 m-auto mt-8 border-solid border border-gray-300 bg-white shadow-[ 0 0 10px 5px black]"
              style={{ boxShadow: "0 0 30px #ddddddaa " }}
            >
              <li className=" flex justify-center py-10">
                <Image
                  className=" h-auto"
                  src={img}
                  alt="My Image"
                  height={70}
                  // width={40}
                  unoptimized
                />
              </li>
              <li>
                <h4 className=" text-4xl font-bold pt-4 pb-2 text-gray-800">
                  {h4}
                </h4>
              </li>
              <li>
                {" "}
                <p className="text-gray-500 flex justify-between text-xl px-6 pb-5 font-bold">
                  {p}
                </p>
              </li>
              <Link href="/signup"> 
                <button
                  className=" py-3 px-10 my-2 block mx-auto bg-gray-600 text-gray-100 rounded-lg font-bold text-xl wor shadow-inner"
                >
                  Open
                </button>
              </Link>
            </ul>
          );
        })}
      </div>
    </section>
  );
};

export default function Index() {
  return (
      <main className="w-full">
        <Header />

        <CardLayout />
        <GlobalMarkets />

        <AccountUpgrade />
        <MiniChartSection />

        <FAQSection />

      </main>

  )
}
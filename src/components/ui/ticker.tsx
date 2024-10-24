"use client";
import React, { useEffect, useRef } from "react";

// Define the expected props type (if you're not sure about the shape of widgetProps, you can use any temporarily)
interface TickerProps {
  widgetProps?: Record<string, any>;
  widgetPropsAny?: Record<string, any>;
}

const Ticker: React.FC<TickerProps> = ({ widgetProps, widgetPropsAny }) => {
  const ref = useRef<HTMLDivElement>(null); // Typing the ref for a div element

  useEffect(() => {
    let refValue: HTMLDivElement | null = null;

    if (ref.current) {
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/" +
        "embed-widget-ticker-tape.js";

      script.async = true;
      script.type = "text/javascript";
      script.innerHTML = JSON.stringify({
        colorTheme: "dark",
        isTransparent: false,
        showSymbolLogo: true,
        locale: "en",
        symbols: [
          {
            proName: "FOREXCOM:SPXUSD",
            title: "S&P 500",
          },
          {
            proName: "FOREXCOM:NSXUSD",
            title: "Nasdaq 100",
          },
          {
            proName: "FX_IDC:EURUSD",
            title: "EUR/USD",
          },
          {
            proName: "BITSTAMP:BTCUSD",
            title: "BTC/USD",
          },
          {
            proName: "BITSTAMP:ETHUSD",
            title: "ETH/USD",
          },
        ],
        ...widgetProps,
        ...widgetPropsAny,
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
  }, [widgetProps, widgetPropsAny]);

  return <div ref={ref} />;
};

export default Ticker;

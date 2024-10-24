// import React, { useState } from "react";

// import BuyActionWindow from "./BuyActionWindow";

// const GeneralContext = React.createContext({
//   openBuyWindow: (uid) => {},
//   closeBuyWindow: () => {},
// });

// export const GeneralContextProvider = (props) => {
//   const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
//   const [selectedStockUID, setSelectedStockUID] = useState("");

//   const handleOpenBuyWindow = (uid) => {
//     setIsBuyWindowOpen(true);
//     setSelectedStockUID(uid);
//   };

//   const handleCloseBuyWindow = () => {
//     setIsBuyWindowOpen(false);
//     setSelectedStockUID("");
//   };

//   return (
//     <GeneralContext.Provider
//       value={{
//         openBuyWindow: handleOpenBuyWindow,
//         closeBuyWindow: handleCloseBuyWindow,
//       }}
//     >
//       {props.children}
//       {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} />}
//     </GeneralContext.Provider>
//   );
// };

// export default GeneralContext;


import React, { useState, useCallback } from "react";
import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";

const GeneralContext = React.createContext({
  openBuyWindow: (uid) => {},
  closeBuyWindow: () => {},
  openSellWindow: (uid) => {},
  closeSellWindow: () => {},
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");

  // Handle opening/closing Buy Window
  const handleOpenBuyWindow = useCallback((uid) => {
    setIsBuyWindowOpen(true);
    setSelectedStockUID(uid);
  }, []);

  const handleCloseBuyWindow = useCallback(() => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
  }, []);

  // Handle opening/closing Sell Window
  const handleOpenSellWindow = useCallback((uid) => {
    setIsSellWindowOpen(true);
    setSelectedStockUID(uid);
  }, []);

  const handleCloseSellWindow = useCallback(() => {
    setIsSellWindowOpen(false);
    setSelectedStockUID("");
  }, []);

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
        openSellWindow: handleOpenSellWindow,
        closeSellWindow: handleCloseSellWindow,
      }}
    >
      {props.children}
      {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} />}
      {isSellWindowOpen && <SellActionWindow uid={selectedStockUID} />}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;

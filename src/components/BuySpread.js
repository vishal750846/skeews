import React from "react";
import { useState } from "react";
import ExportApi from "../api/ExportApi";
import { useEffect } from "react";
const BuySpread = (props) => {
  const [bidList, setBidList] = useState();
  const[isLoading,setLoading] = useState(false)
  const handleuserbidlist = (product, user) => {
    setLoading(true)
    if (user) {
      ExportApi.GetAskBidList(product, user)
        .then((resp) => {
          let data = resp.data;
          setBidList(data.highest_bid);
          setLoading(false)
        })
        .catch((err) => console.log(err));
    } else {
      setLoading(false)
    }
  };
  

  useEffect(() => {
    handleuserbidlist(props.productId, props.userId);
  }, [props.productId, props.userId]);

  return <div>{Math.abs(bidList - props.buy)}</div>;
};

export default BuySpread;

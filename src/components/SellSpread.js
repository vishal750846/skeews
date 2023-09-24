import React from "react";
import { useState } from "react";
import ExportApi from "../api/ExportApi";
import { useEffect } from "react";
const SellSpread = (props) => {
  const [askList, setAskList] = useState();
  const handleuserAskbidlist = (product, user) => {
    if (user) {
      ExportApi.GetAskBidList(product, user)
        .then((resp) => {
          let data = resp.data;
          setAskList(data.lowest_ask);
        })
        .catch((err) => console.log(err));
    } else {
    }
  };

  useEffect(() => {
    handleuserAskbidlist(props.productId, props.userId);
  }, [props.productId, props.userId]);
  return <div>{Math.abs(askList - props.sell)}</div>;
};

export default SellSpread;

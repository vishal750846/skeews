import React from "react";
import { useState } from "react";
import ExportApi from "../api/ExportApi";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const UserAskBidList = (props) => {
  const navigate = useNavigate();
  const [askList, setAskList] = useState();
  const [bidList, setBidList] = useState();
  //for get the user bid and ask
  const handleuserAskbidlist = (product, user) => {
    if (user) {
      ExportApi.GetAskBidList(product, user)
        .then((resp) => {
          let data = resp?.data;
          setAskList(data?.lowest_ask);
          setBidList(data?.highest_bid);
        })
        .catch((err) => console.log(err));
    } else {
    }
  };

  useEffect(() => {
    handleuserAskbidlist(props.productId, props.userId);
  }, [props.productId, props.userId, props.askListStatus, props.bidListStatus]);

  return (
    <div>
      {props?.askListStatus ? (
        <Button
          className="border bg-success"
        >
          {"$" + askList}
        </Button>
      ) : props?.bidListStatus ? (
        <Button
          className="border bg-danger"
        >
          {"$" + bidList}
        </Button>
      ) : askList && bidList ? (
        <>
          <Button
            className="border bg-success"
          >
            {"$" + askList}
          </Button>
          <Button
            className="border bg-danger"
          >
            {"$" + bidList}
          </Button>
        </>
      ) : askList ? (
        <Button
          className="border bg-danger"
        >
          {"$" + askList}
        </Button>
      ) : bidList ? (
        <Button
          className="border bg-success"
        >
          {"$" + bidList}
        </Button>
      ) : (
        <Button
          className="border bg-none text-dark border-dark"
          onClick={() => {
            navigate("/bidask/" + props?.productId);
          }}
        >
          Place Bid/Ask
        </Button>
      )}
    </div>
  );
};

export default UserAskBidList;

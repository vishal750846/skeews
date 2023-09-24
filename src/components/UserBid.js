import React, { useState, useEffect } from "react";
import ExportApi from "../api/ExportApi";
import { Button } from "react-bootstrap";
const UserBid = (props) => {
  const [bid, setBid] = useState();
  const handleuserBid = (id) => {
    ExportApi.getBid(id)
      .then((resp) => {
        if (resp?.data?.data?.length > 0) {
          let data = resp.data.data[0].bidAmount;
          setBid(data);
        } else {
          setBid();
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleuserBid(props.id);
  }, [props.id]);
  return (
    <div>
      {bid ? (
        <Button className="border bg-danger">{"$" + bid}</Button>
      ) : (
        <Button className="border bg-danger">NA</Button>
      )}
    </div>
  );
};

export default UserBid;

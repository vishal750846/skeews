import React, { useState, useEffect } from "react";
import ExportApi from "../api/ExportApi";
import { Button } from "react-bootstrap";
const UserAsk = (props) => {
  const [ask, setAsk] = useState();

  const handleuserAsk = (id) => {
    ExportApi.getask(id)
      .then((resp) => {
        if (resp?.data?.data?.length > 0) {
          let data = resp.data.data[0].askAmount;
          setAsk(data);
        } else {
          setAsk();
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleuserAsk(props.id);
  }, [props.id]);
  return (
    <div>
      {ask ? (
        <Button className="border bg-success">{"$" + ask}</Button>
      ) : (
        <Button className="border bg-success">NA</Button>
      )}
    </div>
  );
};

export default UserAsk;

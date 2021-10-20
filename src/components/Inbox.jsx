import axios from "axios";
import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
import "./Inbox.css";

import SingleCall from "./SingleCall/SingleCall.jsx";

import { Modal } from "react-bootstrap";

const Inbox = () => {
  // const history = useHistory();
  const [allCalls, setallCalls] = useState([]);
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    axios
      .get("https://aircall-job.herokuapp.com/activities")
      .then(function (response) {
        console.log(response.data);
        setallCalls(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  // const callInfo = (id) => {
  //   history.pushState(`/call-info/${id}`)
  // }

  //if call is not archived, show inside inbox
  const IncomingCalls = allCalls.map((i, index) => {
    if (!i.is_archived) {
      return(
        <div onClick={}>
          <SingleCall
            to={i.to}
            from={i.from}
            callType={i.call_type}
            created={i.created_at}
            direction={i.direction}
            isArchived={i.is_archived}
          />
        </div>
      );
    }
  });

  return (
    <div className="inbox-container">
      <button>archive button</button>
      <div id="inboxCalls">
        {IncomingCalls}
      </div>
    </div>
  );
};

export default Inbox;

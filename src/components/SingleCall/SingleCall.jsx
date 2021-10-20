import React, { useState } from "react";
import axios from "axios";
import "./SingleCall.css";

function SingleCall({
  callId,
  created,
  direction,
  from,
  to,
  via,
  duration,
  callType,
  callSet
}) {

  const [showInfo, setShowInfo] = useState(false);

  const onClick = () => (showInfo ? setShowInfo(false) : setShowInfo(true));

  const setArchived = (id, callback) => {
    axios
      .post(`https://aircall-job.herokuapp.com/activities/${id}`, {
        is_archived: true,
      })
      .then(function (response) {
        console.log("RESPONSE-----", response.data);
        callback();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getNewCalls = () => {
    axios
    .get("https://aircall-job.herokuapp.com/activities")
    .then(function (response) {
      console.log("LOG NEW DATA----", response.data) 
      callSet(response.data)        
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <div className="single_call" onClick={onClick}>
      <div id="date">date:---{created}</div>
      <div className="callContainer">
        <div id="call_type">type:---{callType}</div>
        <div id="from">from:---{from}</div>
        <div id="to">to:---{to}</div>
        <div id="time">time:---{created}</div>
      </div>
      <div>
        {showInfo ? (
          <div className="moreDetails">
            <div id="direction">direction:---{direction}</div>
            <div id="via">via:---{via}</div>
            <div id="duration">to:---{duration}</div>
            <button
              onClick={() => {
                setArchived(callId, getNewCalls);
              }}
            >
              archive
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default SingleCall;

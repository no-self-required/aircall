import React from "react";
import "./SingleCall.css";

function SingleCall({ to, from, callType, created, direction }) {

    return (
      <div className="single_call">
        <div id="date">date:---{created}</div>
        <div className="callContainer">
          <div id="call_type">type:---{callType}</div>
          <div id="from">from:---{from}</div>
          <div id="to">to:---{to}</div>
          <div id="time">time:---{created}</div>
        </div>
      </div>
    );

}

export default SingleCall;

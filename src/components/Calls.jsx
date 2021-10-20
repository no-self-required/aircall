import axios from "axios";
import React, { useState, useEffect } from "react";

import "./Inbox.css";
import SingleCall from "./SingleCall/SingleCall.jsx";

const Calls = () => {
  const [allCalls, setallCalls] = useState([]);

  useEffect(() => {
    axios
      .get("https://aircall-job.herokuapp.com/activities")
      .then(function (response) {
        setallCalls(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  //show all calls
  const calls = allCalls.map((i, index) => {
    return (
      <div>
        <SingleCall
          callId={i.id}
          created={i.created_at}
          direction={i.direction}
          from={i.from}
          to={i.to}          
          via={i.via}
          duration={i.duration}
          callType={i.call_type}           
        />
      </div>
    );
  });

  return (
    <div className="inbox-container">
      <button>archive all</button>
      <div id="inboxCalls">{calls}</div>
    </div>
  );
};

export default Calls;

import axios from "axios";
import React, { useState, useEffect } from "react";

import "./Inbox.css";

import SingleCall from "./SingleCall/SingleCall.jsx";

const Inbox = () => {
  const [allCalls, setallCalls] = useState([]);

  useEffect(() => {
    axios
      .get("https://aircall-job.herokuapp.com/activities")
      .then(function (response) {
        setallCalls(response.data)
        
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  //if call is not archived, show inside inbox
  const IncomingCalls = allCalls.map((i) => {
    if (!i.is_archived) {
      return(
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
          callSet={setallCalls}
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

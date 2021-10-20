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
  const calls = allCalls.map((i) => {
    return (
      <div>
        <SingleCall
          key={i}
          callId={i.id}
          created={i.created_at}
          direction={i.direction}
          from={i.from}
          to={i.to}          
          via={i.via}
          duration={i.duration}
          callType={i.call_type}          
          isArchived={i.is_archived} 
        />
      </div>
    );
  });

  return (
    <div className="inbox-container">
      <div id="inboxCalls">{calls}</div>
    </div>
  );
};

export default Calls;

import axios from "axios";
import React, { useState, useEffect } from "react";
import "./Inbox.css";

import InboxCall from "./InboxCall/InboxCall.jsx";

const Inbox = () => {
  const [allCalls, setallCalls] = useState([]);

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

  //if call is not archived, show inside inbox
  const IncomingCalls = allCalls.map((i, index) => {
    if (!i.is_archived) {
      return(
        <div>
          <InboxCall
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

  console.log("allCalls", allCalls);
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

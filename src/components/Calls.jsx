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
        console.log(response.data);
        setallCalls(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const calls = allCalls.map((i, index) => {
    return(
      <div>
        <SingleCall
          to={i.to}
          from={i.from}
          callType={i.call_type}
          created={i.created_at}
          direction={i.direction}
        />
      </div>
    );
  });

  console.log("allCalls", allCalls);
  return (
    <div className="inbox-container">
      <button>archive button</button>
      <div id="inboxCalls">
        {calls}
      </div>
    </div>
  );
};

export default Calls;


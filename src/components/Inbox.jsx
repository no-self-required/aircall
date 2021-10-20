import axios from "axios";
import React, { useState, useEffect } from "react";

import "./Inbox.css";

import SingleCall from "./SingleCall/SingleCall.jsx";
import { CircularProgress } from "@mui/material";

const Inbox = () => {
  const [allCalls, setallCalls] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://aircall-job.herokuapp.com/activities")
      .then(function (response) {
        setallCalls(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  //if call is not archived, show inside inbox
  const IncomingCalls = allCalls.map((i) => {
    if (!i.is_archived) {
      return (
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
          isArchived={i.is_archived}
        />
      );
    }
  });

  return (
    <div className="inbox-container">
      {loading === true && (
        <div id="loading">
          <CircularProgress color="inherit" />
        </div>
      )}
      <div id="inboxCalls">{IncomingCalls}</div>
    </div>
  );
};

export default Inbox;

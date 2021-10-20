import axios from "axios";
import React, { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import SingleCall from "./SingleCall/SingleCall.jsx";

const Inbox = () => {
  //All activity state
  const [allCalls, setallCalls] = useState([]); 
  //Loading icon state
  const [loading, setLoading] = useState(false); 

  //Get all calls and set state
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

  //If call is not archived, show inside inbox route
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

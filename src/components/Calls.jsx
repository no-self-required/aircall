import axios from "axios";
import React, { useState, useEffect } from "react";
import SingleCall from "./SingleCall/SingleCall.jsx";
import { CircularProgress } from "@mui/material";
import "./Inbox.css";

const Calls = () => {
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

  //Show all calls in All calls route
  const IncomingCalls = allCalls.map((i) => {
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
      {loading === true && (
        <div id="loading">
          <CircularProgress color="inherit" />
        </div>
      )}
      <div id="inboxCalls">{IncomingCalls}</div>
    </div>
  );
};

export default Calls;

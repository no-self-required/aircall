import axios from "axios";
import React, { useState, useEffect } from "react";
import SingleCall from "./SingleCall/SingleCall.jsx";

const Archived = () => {
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

  //if call is archived show inside Archive 
  const IncomingCalls = allCalls.map((i) => {
    if (i.is_archived) {
      return(
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
          callSet={setallCalls}
          isArchived={i.is_archived}
          />
        </div>
      );
    }
  });

  return (
    <div className="inbox-container">
      <div id="inboxCalls">
        {IncomingCalls}
      </div>
    </div>
  );
};

export default Archived;

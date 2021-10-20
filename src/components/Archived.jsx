import axios from "axios";
import React, { useState, useEffect } from "react";
import SingleCall from "./SingleCall/SingleCall.jsx";

const Archived = () => {
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

  //if call is archived show inside Archive 
  const IncomingCalls = allCalls.map((i, index) => {
    if (i.is_archived) {
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

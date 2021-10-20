import React, { useState } from "react";
import axios from "axios";
import "./SingleCall.css";
import dayjs from "dayjs";

import { VscCallIncoming, VscCallOutgoing } from "react-icons/vsc";
import { BsVoicemail } from "react-icons/bs";

import Button from "@mui/material/Button";
function SingleCall({
  callId,
  created,
  direction,
  from,
  to,
  via,
  duration,
  callType,
  callSet,
  isArchived,
}) {
  const [showInfo, setShowInfo] = useState(false);

  const formatedTime = dayjs(created).format("HH:mm a");
  const formatedDate = dayjs(created).format("MMMM, DD YYYY");

  const onClick = () => (showInfo ? setShowInfo(false) : setShowInfo(true));

  const setArchived = (id, callback) => {
    axios
      .post(`https://aircall-job.herokuapp.com/activities/${id}`, {
        is_archived: true,
      })
      .then(function (response) {
        callback();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const setUnArchived = (id, callback) => {
    axios
      .post(`https://aircall-job.herokuapp.com/activities/${id}`, {
        is_archived: false,
      })
      .then(function (response) {
        callback();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getNewCalls = () => {
    axios
      .get("https://aircall-job.herokuapp.com/activities")
      .then(function (response) {
        callSet(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  if (!isArchived) {
    return (
      <div className="single_call" onClick={onClick}>
        <div className="callContainer">
          <div id="call_type">
            {direction === "outbound" && callType === "missed" && (
              <VscCallOutgoing size={25} />
            )}
            {direction === "inbound" && callType === "answered" && (
              <VscCallIncoming size={25} />
            )}
            {callType === "voicemail" && <BsVoicemail size={25} />}
          </div>
          <div id="toFromTime">
            <div id="toFrom">
              <div id="from">
                <b>{from}</b>
              </div>
              {to && (
                <div id="to">
                  tried to call on <b>{to}</b>
                </div>
              )}
              {!to && null}
            </div>
            <div id="time">{formatedTime}</div>
          </div>
        </div>
        <div id="moreinfo">
          {showInfo ? (
            <div className="moreDetails">
              <div id="primary">
                <div id="dateDirection">
                  <div id="date">{formatedDate}</div>
                  <div id="direction">
                    {direction === "inbound" && "Inbound"}
                    {direction === "outbound" && "Outbound"}
                  </div>
                </div>
                <div id="viaDuration">
                  <div id="via">Via: {via}</div>
                  <div id="duration">Duration: {duration} s</div>
                </div>
                <div id="archiveButton">
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      setArchived(callId, getNewCalls);
                    }}
                  >
                    Archive
                  </Button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  } else {
    return (
      <div className="single_call" onClick={onClick}>
        <div className="callContainer">
          <div id="call_type">
            {direction === "outbound" && callType === "missed" && (
              <VscCallOutgoing size={25} />
            )}
            {direction === "inbound" && callType === "answered" && (
              <VscCallIncoming size={25} />
            )}
            {callType === "voicemail" && <BsVoicemail size={25} />}
          </div>
          <div id="toFromTime">
            <div id="toFrom">
              <div id="from">{from}</div>
              <div id="to">
                tried to call on <b>{to}</b>
              </div>
            </div>
            <div id="time">{formatedTime}</div>
          </div>
        </div>
        <div id="moreinfo">
          {showInfo ? (
            <div className="moreDetails">
              <div id="primary">
                <div id="dateDirection">
                  <div id="date">{formatedDate}</div>
                  <div id="direction">
                    {direction === "inbound" && "Inbound"}
                    {direction === "outbound" && "Outbound"}
                  </div>
                </div>
                <div id="viaDuration">
                  <div id="via">Via: {via}</div>
                  <div id="duration">Duration: {duration} s</div>
                </div>
                <div id="archiveButton">
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => {
                    setUnArchived(callId, getNewCalls);
                  }}
                >
                  Unarchive
                </Button>
              </div>
              </div>

            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default SingleCall;

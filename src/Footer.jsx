import React from "react";

import "./css/footer.css";
import { IoCallSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FiSettings } from "react-icons/fi";
import { VscRecord } from "react-icons/vsc";

//Create icon and numberpad tabs
const Footer = () => {
  return (
    <footer>
      <div id="calltab">
        <IoCallSharp size={25} />
      </div>
      <div id="profiletab">
        <CgProfile size={25} />
      </div>
      <div id="numpadtab">
        <div class="align">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
      </div>
      <div id="settingstab">
        <FiSettings size={25} />
      </div>
      <div id="recordtab">
        <VscRecord size={25} />
      </div>
    </footer>
  );
};

export default Footer;

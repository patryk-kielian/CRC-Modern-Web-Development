import React from "react";
import "../styles/Popup.css";

function Popup({ message, onClose }) {
  return (
    <div className="popup-background">
      <div className="popup-body">
        <h3 className="popup-message">{message}</h3>
        <button className="popup-button" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
}

export default Popup;

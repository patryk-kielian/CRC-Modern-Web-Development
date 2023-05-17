import React from "react";

function Popup({ message, onClose }) {
  return (
    <div className="popup-background">
      <div className="popup-body">
        <h3 className="popup-message">{message}</h3>
        <button className="violet-button" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
}

export default Popup;

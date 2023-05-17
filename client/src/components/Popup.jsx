import React from "react";

function Popup(props) {
  const { message } = props;

  return (
    <div className="popup-background">
      <div className="popup-body">
        <h3 className="popup-message">{message}</h3>
        <button className="violet-button">OK</button>
      </div>
    </div>
  );
}

export default Popup;

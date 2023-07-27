import { useEffect, useRef } from "react";
import React from "react";
import "../styles/Popup.css";

function Popup({ message, showPopup, setShowPopup }) {
  const popupRef = useRef(null);

  useEffect(() => {
    if (showPopup) {
      popupRef.current.focus();
    }
  }, [showPopup]);

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && (
        <div
          ref={popupRef}
          tabIndex={0}
          className="popup-background"
          onKeyDown={(e) => {
            if (e.key === "Escape" || e.key === "Enter") {
              closePopup();
            }
          }}
          onClick={(e) => {
            if (e.target === popupRef.current) {
              closePopup();
            }
          }}
        >
          <div className="popup-body">
            <h3 className="popup-message">{message}</h3>
            <button className="popup-button" onClick={closePopup}>
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Popup;

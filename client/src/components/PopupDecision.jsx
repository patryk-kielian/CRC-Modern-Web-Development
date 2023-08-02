import { useEffect, useRef } from "react";
import React from "react";
import "../styles/Popup.css";

function PopupDecision({ message, showPopup, setShowPopup, onConfirm }) {
  const popupRef = useRef(null);

  useEffect(() => {
    if (showPopup) {
      popupRef.current.focus();
    }
  }, [showPopup]);

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleConfirm = () => {
    onConfirm();
    closePopup();
  };

  return (
    <>
      {showPopup && (
        <div
          className="popup-background"
          ref={popupRef}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              closePopup();
            }
            if (e.key === "Enter") {
              handleConfirm();
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
            <div className="popup-decision-buttons">
              <button
                className="ghost-black popup-decision-button"
                onClick={handleConfirm}
              >
                Yes
              </button>
              <button
                className="ghost-black popup-decision-button"
                onClick={closePopup}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PopupDecision;

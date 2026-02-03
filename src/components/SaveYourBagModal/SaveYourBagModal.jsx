import React, { useEffect } from "react";
import "./SaveYourBagModal.css";

const SaveYourBagModal = ({
  isOpen,
  onClose,
  onGuestContinue,
  onSignIn
}) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="bag-overlay" onClick={onClose}>
      <div
        className="bag-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="bag-title">Save Your Bag?</h2>

        <p className="bag-description">
          You can continue as a guest, or sign in to save your bag for later.
        </p>

        <div className="bag-actions">
          <button
            className="btn-primary"
            onClick={onGuestContinue}
          >
            Continue as Guest
          </button>

          <button
            className="btn-secondary"
            onClick={onSignIn}
          >
            Sign In / Create Account
          </button>
        </div>

        <div className="bag-footer">
          <p>
            No account needed to place an order. <br />
            Secure checkout guaranteed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SaveYourBagModal;

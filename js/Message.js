import React from "react";
import FlashMessage from "react-flash-message";

export const Message = () => (
  <FlashMessage duration={5000}>
    <div className="flash_message">Punkt dodany do mapy!</div>
  </FlashMessage>
);

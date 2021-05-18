import React from "react";

const Prestige = ({ prestige }) => {
  return (
    <div className="prestige">
      <button onClick={prestige}>Prestige</button>
      <small>(icreases clicking power by x2)</small>
    </div>
  );
};

export default Prestige;

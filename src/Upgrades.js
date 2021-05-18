import React from "react";

const Upgrades = ({ upgrades, upgradeBuilding, currency }) => {
  return (
    <>
      {upgrades.map((item) => {
        const { upgrade_name, id, cost, building_to_upgrade, value } = item;
        return (
          <div className="upgrade" key={id}>
            {currency >= cost && (
              <div
                className="upgrade_wrap"
                style={{ border: "2px solid white", marginBottom: "5px" }}
              >
                <p className="u_name">{upgrade_name}</p>
                <button
                  className="u_buy"
                  onClick={() =>
                    upgradeBuilding(building_to_upgrade, value, id, cost)
                  }
                >
                  Buy cost : {cost.toFixed(2)}
                </button>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};

export default Upgrades;

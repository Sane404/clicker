import React from "react";

const Buildings = ({ items, currency, buyBuilding }) => {
  return (
    <>
      {items.map((item) => {
        const { name, amount, cost, id } = item;
        return (
          <div className="building" key={id}>
            <p className="b_name">{name}</p>
            <span className="b_amount">{amount}</span>
            {currency >= cost ? (
              <button className="b_buy" onClick={() => buyBuilding(id, cost)}>
                Buy cost : {cost && cost.toFixed(2)}
              </button>
            ) : (
              <button className="b_buy" disabled>
                Buy cost : {cost && cost.toFixed(2)}
              </button>
            )}
          </div>
        );
      })}
    </>
  );
};

export default Buildings;

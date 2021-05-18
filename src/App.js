import { useEffect, useState } from "react";
import "./App.css";
import Buildings from "./Buildings";
import svg from "./ClickArea.svg";
import { buildings, upgrades } from "./data";
import Upgrades from "./Upgrades";
import Prestige from "./Prestige";
function App() {
  const [currency, setCurrency] = useState(0);
  const [per_second, setPerSecond] = useState(0);
  const [per_click, setPerClick] = useState(1);
  const [prestige_power, setPrestigePower] = useState(1);
  const [amount_to_prestige, setAmountToPrestige] = useState(50);
  const [about_to_prestige, setAboutToPrestige] = useState(false);
  const [building_array, setBuildingArray] = useState(buildings);
  const [upgrades_array, setUpgradesArray] = useState(upgrades);
  const getLocalStorage = () => {
    const data = JSON.parse(localStorage.getItem("Game Data"));
    if (data) {
      setCurrency(data.currency);
      setPerSecond(data.per_second);
      setBuildingArray(data.building_array);
      setUpgradesArray(data.upgrades_array);
      setPrestigePower(data.prestige_power);
      setPerClick(data.per_click);
      setAmountToPrestige(data.amount_to_prestige);
    }
  };
  useEffect(() => {
    getLocalStorage();
  }, []);
  const buyBuilding = (id, cost) => {
    setBuildingArray(
      building_array.map((building) => {
        const { amount, cost } = building;
        if (building.id === id) {
          const updatedAmount = amount + 1;
          const updatedCost = cost * 1.5;
          return {
            ...building,
            amount: updatedAmount,
            cost: updatedCost,
          };
        } else {
          return building;
        }
      })
    );
    setCurrency(currency - cost);
  };
  const upgradeBuilding = (name, value, id, cost) => {
    setBuildingArray(
      building_array.map((building) => {
        const { per_second } = building;
        if (building.name === name) {
          const updatedPerSecond = per_second * value;
          return {
            ...building,
            per_second: updatedPerSecond,
          };
        } else {
          return building;
        }
      })
    );
    const updatedUpgradesArray = upgrades_array.filter(
      (item) => item.id !== id
    );
    setCurrency(currency - cost);
    setUpgradesArray(updatedUpgradesArray);
  };
  const prestige = () => {
    setCurrency(0);
    setPrestigePower(prestige_power * 2);
    setAmountToPrestige(amount_to_prestige * 10);
    setAboutToPrestige(!about_to_prestige);
  };
  const updatePerSecond = () => {
    const per_s = building_array.reduce((acc, cur) => {
      return acc + cur.amount * cur.per_second;
    }, 0);
    setPerSecond(per_s);
  };
  useEffect(() => {
    updatePerSecond();
  }, [building_array]);
  const saveData = () => {
    const game_data = {
      currency,
      per_second,
      per_click,
      prestige_power,
      building_array,
      upgrades_array,
      amount_to_prestige,
    };
    localStorage.setItem("Game Data", JSON.stringify(game_data));
  };
  useEffect(() => {
    saveData();
  }, [per_second, about_to_prestige]);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrency((prev) => {
        return prev + per_second;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [per_second]);
  return (
    <div className="container">
      <div className="click_area_bg click_this">
        <img
          src={svg}
          alt="click_area"
          className="click_item"
          onClick={() => setCurrency(currency + per_click * prestige_power)}
        />
      </div>

      <div className="counter">
        <p className="currency">Currency: {currency.toFixed(2)}</p>
        <span className="currency_per_second">
          Per second: {per_second.toFixed(2)} /s
        </span>
      </div>
      <div className="buildings">
        <h2>Your Buildings</h2>
        <Buildings
          items={building_array}
          currency={currency}
          buyBuilding={buyBuilding}
        />
      </div>
      <div className="upgrades">
        <h2>Upgrades</h2>
        <Upgrades
          upgrades={upgrades_array}
          upgradeBuilding={upgradeBuilding}
          currency={currency}
        />
      </div>
      {currency >= amount_to_prestige && <Prestige prestige={prestige} />}
      <div className="tip">
        Game data saves to local storage each time you buy the building
      </div>
    </div>
  );
}

export default App;

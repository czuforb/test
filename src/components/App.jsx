import React, { useEffect, useState } from "react";
import "./App.scss";
import ListItem from "./ListItem";
import data from "../static/data";

const severity = (chargebacks, percentage) => {
  return chargebacks >= 100 && percentage >= 0.009 //0.9%
    ? 3
    : chargebacks >= 75 && percentage >= 0.0065 //0.65%
    ? 2
    : chargebacks >= 50 && percentage >= 0.005 // 0.5% - 1% -> 0.01
    ? 1
    : 0;
};

//generate the "none" "low" "med" "high" tags
const setInd = indicator => {
  return indicator === 1
    ? "low"
    : indicator === 2
    ? "mid"
    : indicator === 3
    ? "high"
    : "none";
};

//use browser local number format
const numberFormat = n => {
  return n.toLocaleString(
    undefined
    // { minimumFractionDigits: 0 }
  );
};

//format percent to percentage format 00.0%
const percent = p => {
  return (p * 100).toFixed(2) + "%";
};

function App() {
  const [state, setState] = useState(data);

  useEffect(() => {
    // calculate severity state and append to the data object
    data.forEach(element => {
      const chargebacks = element.transactions * element.percentage;
      setState((element.severity = severity(chargebacks, element.percentage)));
    });
  }, [state.severity]); // re-render on severity property change as dependency

  return (
    <div className="container">
      <h1>Merchant Chargeback Threshold Alert Top 10</h1>
      <table className="table">
        <thead className="head">
          <tr className="row">
            <td className="title rank">#</td>
            <td className="title status">Risk</td>
            <td className="title merchant">Merchant Name</td>
            <td className="title transactions">Transactions</td>
            <td className="title percentage">Percentage</td>
          </tr>
        </thead>
        <tbody>
          {data
            .sort(
              // sort by severity ( 0 - 1 - 2 -3 ) then by percentage
              (a, b) => b.severity - a.severity || b.percentage - a.percentage
            )
            .slice(0, 10)
            .map((element, index) => {
              return (
                <ListItem
                  name={element.name}
                  percentage={percent(element.percentage)}
                  severity={element.severity}
                  transactions={numberFormat(element.transactions)}
                  indicator={setInd(element.severity)}
                  id={index}
                />
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
export default App;

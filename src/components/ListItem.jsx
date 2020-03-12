import React from "react";
import PropTypes from "prop-types";

const ListItem = ({ name, transactions, percentage, id, indicator }) => {
  return (
    // Not the best practice to use index as an ID - and az a rank - because the order could change
    <>
      <tr className="row" key={id}>
        <td className="data rank">{id + 1}</td>
        <td className="data status">
          <span className={`indicator ${indicator}`}>{indicator}</span>
        </td>
        <td className="data merchant">{name}</td>
        <td className="data transactions">{transactions}</td>
        <td className="data percentage">{percentage}</td>
      </tr>
    </>
  );
};

export default ListItem;

ListItem.propTypes = {
  percentage: PropTypes.number,
  transactions: PropTypes.number,
  id: PropTypes.number,
  name: PropTypes.string,
  indicator: PropTypes.string
};

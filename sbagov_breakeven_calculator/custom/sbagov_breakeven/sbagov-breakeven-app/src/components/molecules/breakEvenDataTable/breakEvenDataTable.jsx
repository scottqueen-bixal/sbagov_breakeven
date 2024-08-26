import React, { useState } from "react";
import PropTypes from "prop-types";

import { Card, Table } from "semantic-ui-react";
import { formatNumber } from "../../../helpers";

import "./breakEvenDataTable.less";

const BreakEvenDataTable = (props) => {
  const [column, setColumn] = useState("");
  const [direction, setDirection] = useState("ascending");
  const { data } = props;

  const handleSort = (clickedColumn) => () => {
    if (column !== clickedColumn) {
      setColumn(clickedColumn);
      data.sort(function (a, b) {
        return a.clickedColumn - b.clickedColumn;
      });
      setDirection("ascending");
      return;
    }

    data.reverse();
    setDirection(direction === "ascending" ? "descending" : "ascending");
  };

  const formatProfitOrLoss = (profit) => {
    if (profit >= 0) return `$${formatNumber(profit)}`;
    return <span>&minus;{`$${formatNumber(Math.abs(profit))}`}</span>;
  };

  const uniqueKey = () => {
    if (isNaN(data.units)) {
      return `${data[1].units}-${data[1].profit}-${data[1].revenue}-${data[1].variableCosts}-${data[1].fixedCosts}`;
    }
    return `${Math.floor(Math.random() * 100)}`;
  };

  return (
    <Card fluid>
      <Card.Content className="bep-table-overflow">
        <h3>Break-Even Point Unit Sales</h3>
        <Table
          data-testid="bep-dataTable"
          id="bep-dataTable"
          textAlign="right"
          sortable
          unstackable
        >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={column === "units" ? direction : null}
                onClick={handleSort("units")}
              >
                Units Sold
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "profit" ? direction : null}
                onClick={handleSort("profit")}
              >
                Profit
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "revenue" ? direction : null}
                onClick={handleSort("revenue")}
              >
                Unit Sales
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "variableCosts" ? direction : null}
                onClick={handleSort("variableCosts")}
              >
                Variable Costs
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "fixedCosts" ? direction : null}
                onClick={handleSort("fixedCosts")}
              >
                Fixed Costs
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "totalCosts" ? direction : null}
                onClick={handleSort("totalCosts")}
              >
                Total Costs
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body key={uniqueKey()}>
            {data.map(
              ({
                units,
                profit,
                revenue,
                variableCosts,
                fixedCosts,
                totalCosts,
              }) => (
                <Table.Row
                  data-testid="data-table-row"
                  key={`${profit}-${revenue}-${variableCosts}`}
                >
                  <Table.Cell>{formatNumber(units)}</Table.Cell>
                  <Table.Cell className={profit < 0 ? "netLoss" : "netGain"}>
                    {formatProfitOrLoss(profit)}
                  </Table.Cell>
                  <Table.Cell>${formatNumber(revenue)}</Table.Cell>
                  <Table.Cell>${formatNumber(variableCosts)}</Table.Cell>
                  <Table.Cell>${formatNumber(fixedCosts)}</Table.Cell>
                  <Table.Cell>${formatNumber(totalCosts)}</Table.Cell>
                </Table.Row>
              )
            )}
          </Table.Body>
        </Table>
      </Card.Content>
    </Card>
  );
  // }
};

BreakEvenDataTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BreakEvenDataTable;

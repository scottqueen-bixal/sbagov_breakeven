import React, { useState } from "react";
import { Grid, Container } from "semantic-ui-react";
import Layout from "../components/layout";
import { EditableTotal } from "../components/atoms";
import { BecAccordion, Hero } from "../components/molecules";
import {
  FixedCosts,
  UnitSales,
  PricePerUnit,
  Results,
  VariableCosts,
} from "../components/organisms";
import { CALCULATOR_STEPS, FAQ_CONTENT } from "../constants";

import "../styles/typography.less";
import "./index.less";

const BreakEvenCalculator = () => {
  const [stepNum, setStepNum] = useState(0);
  const [variableCostPerUnit, setVariableCostPerUnit] = useState("");
  const [numUnits, setNumUnits] = useState("");
  const [pricePerUnit, setPerPriceUnit] = useState("");
  const [totalFixedCost, setTotalFixedCost] = useState("");
  const [shouldReset, setShouldReset] = useState(false);

  const goToStep = (stepNum) => setStepNum(stepNum);

  const updateVariableCost = (variableCost) =>
    setVariableCostPerUnit(variableCost);

  const updateNumUnits = (numUnits) => setNumUnits(numUnits);

  const updatePricePerUnit = (price) => setPerPriceUnit(price);

  const updateFixedCost = (fixedCost) => setTotalFixedCost(fixedCost);

  const restartAnalysis = () => {
    if (shouldReset === true) {
      setStepNum(0);
      setVariableCostPerUnit("");
      setNumUnits("");
      setPricePerUnit("");
      setTotalFixedCost("");
      setShouldReset(false);
      goToStep(CALCULATOR_STEPS.FIXED_COSTS);
    }
  };

  return stepNum === CALCULATOR_STEPS.RESULTS_PAGE ? (
    <Layout>
      <Results
        variableCostPerUnit={variableCostPerUnit || 0}
        numUnits={numUnits || 0}
        pricePerUnit={pricePerUnit || 0}
        totalFixedCost={totalFixedCost || 0}
        updateFixedCost={updateFixedCost}
        updateNumUnits={updateNumUnits}
        updatePricePerUnit={updatePricePerUnit}
        updateVariableCost={updateVariableCost}
      />
    </Layout>
  ) : (
    <Layout>
      <Grid columns={1}>
        <Grid.Column>
          <Hero>
            <>
              <FixedCosts
                visible={stepNum === CALCULATOR_STEPS.FIXED_COSTS}
                goToStep={goToStep}
                setFixedCost={updateFixedCost}
                totalFixedCosts={totalFixedCost}
                key={shouldReset} // change in key forces a re-mount
              />
              <UnitSales
                visible={stepNum === CALCULATOR_STEPS.UNIT_SALES}
                goToStep={goToStep}
                setNumUnits={updateNumUnits}
                value={numUnits}
                restart={restartAnalysis}
              />
              <PricePerUnit
                visible={stepNum === CALCULATOR_STEPS.PRICE_PER_UNIT}
                goToStep={goToStep}
                setUnitPrice={updatePricePerUnit}
                value={pricePerUnit}
                restart={restartAnalysis}
              />
              <VariableCosts
                visible={stepNum === CALCULATOR_STEPS.VARIABLE_COSTS}
                pricePerUnit={pricePerUnit}
                goToStep={goToStep}
                setVariableCost={updateVariableCost}
                restart={restartAnalysis}
                key={shouldReset + 1} // change in key forces a re-mount
              />
            </>
          </Hero>
        </Grid.Column>
      </Grid>
      <Container className="runningTotals-container">
        <Grid>
          {stepNum > CALCULATOR_STEPS.UNIT_SALES && (
            <EditableTotal
              key="number of units"
              title="Number of units"
              type="units"
              value={numUnits}
              onEdit={updateNumUnits}
            />
          )}
          {stepNum > CALCULATOR_STEPS.PRICE_PER_UNIT && (
            <EditableTotal
              key="price per unit"
              title="Selling price per unit"
              value={pricePerUnit}
              onEdit={updatePricePerUnit}
            />
          )}
          {stepNum > CALCULATOR_STEPS.FIXED_COSTS && (
            <EditableTotal
              key="total fixed cost"
              title="Total fixed cost"
              value={totalFixedCost}
              onEdit={updateFixedCost}
            />
          )}
        </Grid>
      </Container>
      <Container>
        <BecAccordion data={FAQ_CONTENT[stepNum] || []} />
      </Container>
      <feedback-form
        product="BEPC"
        productTitle="COVID Break Even Point Calculator Feedback"
      ></feedback-form>
    </Layout>
  );
};

export default BreakEvenCalculator;

import React, { useState, useReducer } from "react";
import PropTypes from "prop-types";
import { Button, Form, Radio, Grid } from "semantic-ui-react";
import { NumbersInputForm } from "../../molecules";
import { MoneyInput } from "../../atoms";
import { fixedCostFields, fixedCostInitState } from "./fixedCostsFieldsData";
import { CALCULATOR_STEPS } from "../../../constants";
import { sumValues } from "../../../utils/helpers";

import "./fixedCosts.less";

const FixedCosts = ({ visible, totalFixedCosts, setFixedCost, goToStep }) => {
  const [knowFixedCosts, setKnowFixedCosts] = useState(null);
  const [totalFixedCost, setTotalFixedCost] = useState(totalFixedCosts || "");
  const [formError, setFormError] = useState(false);
  const [fields, setFields] = useState({
    Amortization: "",
    Rent: "",
    Insurance: "",
    Salaries: "",
    Utilities: "",
    Depreciation: "",
    "Interest Expense": "",
    "Property Taxes": "",
    "Other Monthly Costs": "",
    "Other Fixed Costs": "",
  });

  const resetTotalFixedCosts = () => setTotalFixedCost("");

  const resetFields = () => {
    setFields({ ...fixedCostInitState }) && resetTotalFixedCosts();
  };

  const handleRadioButtonChange = (e, { value }) => {
    if (value === "yes") {
      resetFields();
    } else if (value === "no") {
      resetTotalFixedCosts();
    }
    setKnowFixedCosts(value);
  };

  const handleInputFieldChange = (name, value) => {
    const updatedFields = { ...fields, [name]: value };

    setFields(updatedFields);
    setTotalFixedCost(sumValues(updatedFields));
    setFormError(false);
  };

  const handleInputFixedFieldChange = (value) => {
    setTotalFixedCost(value);
    setFormError(false);
  };

  const handleSubmit = () => {
    if (!totalFixedCost && totalFixedCost !== 0) {
      setFormError(true);
    } else {
      setFixedCost(totalFixedCost);
      setFormError(false);
      goToStep(CALCULATOR_STEPS.FIXED_COSTS + 1);
    }
  };

  return (
    <div
      aria-hidden={!visible}
      className={`fixedCosts-container ${visible ? "" : "hidden"}`}
    >
      <h3>Calculate your total fixed costs</h3>
      <p>
        Fixed costs are costs that do not change with sales or volume because
        they are based on time. For this calculator the time period is
        calculated monthly. <br />
        <span className="subtext">* indicates required field</span>
      </p>
      <Form data-testid="fixedCosts-form" onSubmit={handleSubmit}>
        <div role="group" aria-labelledby="fixedCostQuestion">
          <h4 id="fixedCostQuestion">
            Do you know the total of your monthly fixed costs?*
          </h4>
          <Grid container columns={2} stackable>
            <Grid.Column>
              <Form.Field
                control={Radio}
                label="Yes"
                aria-label="yes, I know the total of my monthly fixed costs"
                name="yesBox"
                value="yes"
                checked={knowFixedCosts === "yes"}
                onChange={handleRadioButtonChange}
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Field
                control={Radio}
                label="No, input values individually"
                aria-label="no, input values individually"
                name="noBox"
                value="no"
                checked={knowFixedCosts === "no"}
                onChange={handleRadioButtonChange}
              />
            </Grid.Column>
            {knowFixedCosts === "no" && (
              <NumbersInputForm
                onChange={(e, { name, value }) => {
                  handleInputFieldChange(name, value);
                }}
                fields={fixedCostFields}
              />
            )}
            {knowFixedCosts === "yes" && (
              <Grid.Column>
                <label htmlFor="totalFixedCosts">
                  Total monthly fixed costs*
                </label>
                <div className="subtext">
                  Enter the sum of all known fixed costs:
                </div>
                <Form.Field>
                  <MoneyInput
                    value={totalFixedCost}
                    ariaLabel="total fixed cost"
                    name="totalFixedCosts"
                    autoFocus
                    errorMessage="Enter a valid fixed cost to continue"
                    formError={formError}
                    onChange={(e, { value }) => {
                      handleInputFixedFieldChange(value);
                    }}
                  />
                </Form.Field>
              </Grid.Column>
            )}
          </Grid>
        </div>
        <Grid columns={1}>
          {knowFixedCosts === "yes" && (
            <Grid.Column>
              <div className="fixedCost-suggestion">
                Help with your total fixed costs?{" "}
                <Button
                  basic
                  className="noBorder darkBlue"
                  type="button"
                  onClick={() => setKnowFixedCosts("no")}
                >
                  Add all fixed costs individually
                </Button>
              </div>
            </Grid.Column>
          )}
          {formError && knowFixedCosts === "no" && (
            <p role="alert" className="errorMsg">
              Enter a valid fixed cost to continue
            </p>
          )}
          {knowFixedCosts && (
            <Grid.Column>
              <Form.Button type="submit" primary content="CONTINUE" />
            </Grid.Column>
          )}
        </Grid>
      </Form>
    </div>
  );
};

FixedCosts.propTypes = {
  goToStep: PropTypes.func.isRequired,
  setFixedCost: PropTypes.func.isRequired,
  totalFixedCosts: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  visible: PropTypes.bool.isRequired,
};

export default FixedCosts;

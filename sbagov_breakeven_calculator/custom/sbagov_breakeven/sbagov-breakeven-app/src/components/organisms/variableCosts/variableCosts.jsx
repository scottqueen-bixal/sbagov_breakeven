import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Form, Radio, Grid } from "semantic-ui-react";
import { NumbersInputForm } from "../../molecules";
import { MoneyInput, Icons } from "../../atoms";
import {
  variableCostFields,
  variableCostInitState,
} from "./variableCostsFieldsData";
import { CALCULATOR_STEPS } from "../../../constants";
import { sumValues } from "../../../helpers";

import "./variableCosts.less";

const VariableCosts = ({
  visible,
  pricePerUnit,
  goToStep,
  setVariableCost,
  restart,
}) => {
  const [knowVariableCosts, setKnowVariableCosts] = useState(null);
  const [totalVariableCosts, setTotalVariableCosts] = useState("");
  const [formError, setFormError] = useState(false);
  const [fields, setFields] = useState({
    "Direct Materials": 0,
    "Piece Rate Labor": 0,
    "Production Supplies": 0,
    Commissions: 0,
    "Freight Out": 0,
    "Other Variable Costs": 0,
  });

  const resetTotalVariableCosts = () => setTotalVariableCosts("");

  const resetFields = () => {
    setFields({ ...variableCostInitState });
    resetTotalVariableCosts();
  };

  const handleRadioButtonChange = (e, { value }) => {
    if (value === "yes") {
      resetFields();
    } else if (value === "no") {
      resetTotalVariableCosts();
    }
    setKnowVariableCosts(value);
  };

  const handleInputFieldChange = (name, value) => {
    const updatedFields = { ...fields, [name]: value };

    setFields(updatedFields);
    setTotalVariableCosts(sumValues(updatedFields));
    setFormError(false);
  };

  const handleInputVariableFieldChange = (value) => {
    setTotalVariableCosts(value);
    setFormError(false);
  };

  const handleSubmit = () => {
    if (!totalVariableCosts && totalVariableCosts !== 0) {
      setFormError(true);
    } else {
      setVariableCost(totalVariableCosts);
      setFormError(false);
      goToStep(CALCULATOR_STEPS.VARIABLE_COSTS + 1);
    }
  };

  const TotalVariableCostPerUnit = () => {
    return (
      <Grid.Column>
        <label htmlFor="totalVariableCosts">
          Total monthly variable costs*
        </label>
        <p>Enter the sum of all known variable costs</p>
        <Form.Field>
          <MoneyInput
            value={totalVariableCosts}
            name="totalVariableCosts"
            autoFocus
            ariaLabel="total variable cost"
            errorMessage="Enter a valid variable cost per unit to continue"
            formError={formError}
            onChange={(e, { value }) => {
              handleInputVariableFieldChange(value);
            }}
          />
        </Form.Field>
      </Grid.Column>
    );
  };

  const showWarning = parseInt(totalVariableCosts) >= parseInt(pricePerUnit);

  return (
    <div
      aria-hidden={!visible}
      className={`variableCosts-container ${visible ? "" : "hidden"}`}
    >
      <h3>Calculate your total variable costs per unit</h3>
      <p>
        Variable costs are costs that change with sales or volume. They are
        based on the production of one unit.
        <br />
        <span className="subtext">* indicates required field</span>
      </p>
      <Form onSubmit={handleSubmit}>
        <div role="group" aria-labelledby="variableCostQuestion">
          <h4 id="variableCostQuestion">
            Do you know your variable cost per unit?*
          </h4>
          <Grid container columns={2} stackable>
            <Grid.Column>
              <Form.Field
                control={Radio}
                label="Yes"
                aria-label="yes, I know the total of my variable costs per unit"
                name="yesBox"
                value="yes"
                checked={knowVariableCosts === "yes"}
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
                checked={knowVariableCosts === "no"}
                onChange={handleRadioButtonChange}
              />
            </Grid.Column>
            {knowVariableCosts === "no" && (
              <NumbersInputForm
                onChange={(e, { name, value }) => {
                  handleInputFieldChange(name, value);
                }}
                fields={variableCostFields}
              />
            )}
            {knowVariableCosts === "yes" && <TotalVariableCostPerUnit />}
          </Grid>
        </div>
        <Grid columns={1}>
          {knowVariableCosts === "yes" && (
            <Grid.Column>
              <div className="variableCost-suggestion">
                Help with your total variable costs?
                <Button
                  basic
                  className="noBorder darkBlue"
                  type="button"
                  onClick={() => setKnowVariableCosts("no")}
                >
                  Add variable costs individually
                </Button>
              </div>
            </Grid.Column>
          )}
          {formError && knowVariableCosts === "no" && (
            <p role="alert" className="errorMsg">
              Enter a valid variable cost per unit to continue
            </p>
          )}
          {knowVariableCosts && (
            <Grid.Column>
              <Grid
                columns={2}
                reversed="mobile"
                verticalAlign="middle"
                stackable
              >
                <Grid.Column width={3}>
                  <Form.Button
                    type="submit"
                    className="continueButton"
                    primary
                    content="CONTINUE"
                  />
                </Grid.Column>
                {showWarning && (
                  <Grid.Column width={12}>
                    <Grid columns={2} verticalAlign="middle">
                      <Grid.Column className="warningMessage" width={1}>
                        <i aria-hidden="true" className="circular small icon">
                          <Icons.Minus />
                        </i>
                      </Grid.Column>
                      <Grid.Column
                        role="alert"
                        floated="left"
                        className="warningMessage"
                        width={12}
                      >
                        <p>
                          Your variable costs are higher than your unit price.
                          You will never break-even. Consider adjusting your
                          values.
                        </p>
                      </Grid.Column>
                    </Grid>
                  </Grid.Column>
                )}
              </Grid>
            </Grid.Column>
          )}
        </Grid>
      </Form>
      <Grid className="returnLinks" columns={2}>
        <Grid.Column id="backLink" mobile={8} computer={4}>
          <Button
            basic
            color="blue"
            type="button"
            aria-label="Back to unit sales"
            className="noBorder navLink"
            onClick={() => goToStep(CALCULATOR_STEPS.VARIABLE_COSTS - 1)}
          >{`< Back to unit sales`}</Button>
        </Grid.Column>
        <Grid.Column id="restartLink" mobile={8} computer={3}>
          <Button
            basic
            color="blue"
            type="button"
            className="noBorder navLink"
            onClick={restart}
          >
            Restart Analysis
          </Button>
        </Grid.Column>
      </Grid>
    </div>
  );
};

VariableCosts.propTypes = {
  goToStep: PropTypes.func.isRequired,
  restart: PropTypes.func.isRequired,
  setVariableCost: PropTypes.func.isRequired,
  value: PropTypes.number,
  pricePerUnit: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  visible: PropTypes.bool.isRequired,
};

export default VariableCosts;

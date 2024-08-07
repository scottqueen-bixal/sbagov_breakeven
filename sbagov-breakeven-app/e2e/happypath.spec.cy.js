/// <reference types=“cypress” />

beforeEach(() => cy.visit("/"));

describe("Happy path through BEP Calc", () => {
  it("Gets through first page", () => {
    cy.get(".fixedCosts-container").scrollIntoView().contains("Yes").click();
    cy.focused().should("have.id", "totalFixedCosts");
    cy.get("#totalFixedCosts").type(2500);
    cy.get('[type="submit"]:visible').click();
  });

  it("Gets through second page", () => {
    cy.get(".fixedCosts-container").scrollIntoView().contains("Yes").click();
    cy.get("#totalFixedCosts").type(2500);
    cy.get('[type="submit"]:visible').click();
    cy.get(".pricePerUnit-container");
    cy.focused().should("have.id", "unitPrice");
    cy.get("#unitPrice").type(20);
    cy.get('[type="submit"]:visible').click();
  });

  it("Gets through third page", () => {
    cy.get(".fixedCosts-container").scrollIntoView().contains("Yes").click();
    cy.get("#totalFixedCosts").type(2500);
    cy.get('[type="submit"]:visible').click();
    cy.get(".pricePerUnit-container");
    cy.focused().should("have.id", "unitPrice");
    cy.get("#unitPrice").type(20);
    cy.get('[type="submit"]:visible').click();
    cy.get(".unitSales-container");
    cy.focused().should("have.id", "units");
    cy.get("#units").type(1000);
    cy.get('[type="submit"]:visible').click();
  });

  it("Gets through fourth page", () => {
    cy.get(".fixedCosts-container").scrollIntoView().contains("Yes").click();
    cy.get("#totalFixedCosts").type(2500);
    cy.get('[type="submit"]:visible').click();
    cy.get(".pricePerUnit-container");
    cy.focused().should("have.id", "unitPrice");
    cy.get("#unitPrice").type(20);
    cy.get('[type="submit"]:visible').click();
    cy.get(".unitSales-container");
    cy.focused().should("have.id", "units");
    cy.get("#units").type(1000);
    cy.get('[type="submit"]:visible').click();
    cy.get(".variableCosts-container").contains("Yes").click().click();
    cy.get("#totalVariableCosts").type("5");
    cy.get('[type="submit"]:visible').click();
  });

  it("Shows correct results page", () => {
    cy.get(".fixedCosts-container").scrollIntoView().contains("Yes").click();
    cy.get("#totalFixedCosts").type(2500);
    cy.get('[type="submit"]:visible').click();
    cy.get(".pricePerUnit-container");
    cy.focused().should("have.id", "unitPrice");
    cy.get("#unitPrice").type(20);
    cy.get('[type="submit"]:visible').click();
    cy.get(".unitSales-container");
    cy.focused().should("have.id", "units");
    cy.get("#units").type(1000);
    cy.get('[type="submit"]:visible').click();
    cy.get(".variableCosts-container").contains("Yes").click().click();
    cy.get("#totalVariableCosts").type("5");
    cy.get('[type="submit"]:visible').click();
    cy.get(".breakEvenWelcome-container");
    const values = ["1,000", "$2,500", "$20", "$5"];
    values.forEach((val) => {
      cy.get(".breakEvenProfile-container").contains(val);
    });
    cy.get(".breakEvenProfile-container").find(".editButton").first().click();
    cy.get("#breakEvenGraph");
    cy.get("[data-testid=breakevenLabel]").contains("167");
    cy.get("#breakEvenCircle").click().click();
    cy.get(".graphCanvas").click("topRight");
    const graphLabels = ["Units:", "Unit Sales:", "Fixed Cost:", "Total Cost:"];
    graphLabels.forEach((val) => {
      cy.get("#tooltip").contains(val);
    });
    cy.get("[data-testid=breakevenLabel]").should("not.visible");

    const tableHeadings = [
      "Units Sold",
      "Profit",
      "Unit Sales",
      "Variable Costs",
      "Fixed Costs",
      "Total Costs",
    ];
    tableHeadings.forEach((heading) => {
      cy.get("#bep-dataTable")
        .contains(heading)
        .click()
        .then(($els) => {
          // get Window reference from element
          const win = $els[0].ownerDocument.defaultView;
          // use getComputedStyle to read the pseudo selector
          const after = win.getComputedStyle($els[0], "after");
          // read the value of the `content` CSS property
          const contentValue = after.getPropertyValue("display");
          expect(contentValue).to.eq("inline-block");
        });
    });
    // feedback form element there, but no shaddow form
    // cy.get("feedback-form")
    //   .shadow()
    //   .find("#feedback__button")
    //   .contains("Give us Feedback");
    cy.get("#printCTA").contains("Print Results");
    cy.get(".accordion")
      .contains("How to reduce your break-even point")
      .click();
    cy.contains(
      "There are a number of ways you can reduce your break-even point, including:"
    ).should("be.visible");
    cy.get(".accordion")
      .contains("Factors that increase the break-even point")
      .click();
    cy.contains(
      "Increases in fixed costs will increase your break-even point"
    ).should("be.visible");
    cy.get(".return-link");
  });
});

import React from "react";
import PropTypes from "prop-types";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItemState,
} from "react-accessible-accordion";
import { Icons } from "../../atoms";

import "./accordion.less";

const BecAccordion = (props) => {
  return (
    <div className="accordionContainer">
      <div className="accordionContent" data-testid="accordion">
        <Accordion allowZeroExpanded>
          {props.data.map((faq) => (
            <AccordionItem data-testid="accordion-item" key={faq.question}>
              <AccordionItemHeading className="accordionHeading">
                <AccordionItemButton className="accordionButton">
                  <h3>{faq.question}</h3>
                  <AccordionItemState>
                    {({ expanded }) => {
                      return expanded ? (
                        <i aria-hidden="true" className="chevron icon">
                          <Icons.ChevronUp />
                        </i>
                      ) : (
                        <i aria-hidden="true" className="chevron icon">
                          <Icons.ChevronDown />
                        </i>
                      );
                    }}
                  </AccordionItemState>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <div
                  className="accordionText"
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                />
              </AccordionItemPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

BecAccordion.propTypes = {
  data: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
};

export default BecAccordion;

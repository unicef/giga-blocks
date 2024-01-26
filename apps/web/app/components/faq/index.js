import { Accordion, AccordionItem, Column, Grid } from '@carbon/react';
import React from 'react';
import './faq.scss';

const faq = () => {
  return (
    <>
      <Grid className="faq" id="faq" fullWidth>
        <Column md={4} lg={4} sm={4}>
          <h1 className="heading7">Frequently asked questions</h1>
        </Column>
        <Column className="form" md={4} lg={12} sm={4}>
          <Accordion>
            <AccordionItem title="Title 1">
              <p>
                The accordion component delivers large amounts of content in a
                small space through progressive disclosure. The user gets key
                details about the underlying content and can choose to expand
                that content within the constraints of the accordion. Accordions
                work especially well on mobile interfaces or whenever vertical
                space is at a premium.
              </p>
            </AccordionItem>
            <AccordionItem title="Title 2">
              <p>
                The accordion component delivers large amounts of content in a
                small space through progressive disclosure. The user gets key
                details about the underlying content and can choose to expand
                that content within the constraints of the accordion. Accordions
                work especially well on mobile interfaces or whenever vertical
                space is at a premium.
              </p>
            </AccordionItem>
            <AccordionItem title="Title 3">
              <p>
                The accordion component delivers large amounts of content in a
                small space through progressive disclosure. The user gets key
                details about the underlying content and can choose to expand
                that content within the constraints of the accordion. Accordions
                work especially well on mobile interfaces or whenever vertical
                space is at a premium.
              </p>
            </AccordionItem>
            <AccordionItem title="Title 4">
              <p>
                The accordion component delivers large amounts of content in a
                small space through progressive disclosure. The user gets key
                details about the underlying content and can choose to expand
                that content within the constraints of the accordion. Accordions
                work especially well on mobile interfaces or whenever vertical
                space is at a premium.
              </p>
            </AccordionItem>
            <AccordionItem title="Title 5">
              <p>
                The accordion component delivers large amounts of content in a
                small space through progressive disclosure. The user gets key
                details about the underlying content and can choose to expand
                that content within the constraints of the accordion. Accordions
                work especially well on mobile interfaces or whenever vertical
                space is at a premium.
              </p>
            </AccordionItem>
          </Accordion>
        </Column>
      </Grid>
    </>
  );
};

export default faq;

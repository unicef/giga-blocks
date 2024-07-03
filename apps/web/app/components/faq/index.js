import React, { useState } from 'react';
import { Accordion, AccordionItem, Column, Grid } from '@carbon/react';
import './faq.scss';

const Faq = () => {
  const accordionItems = [
    {
      title: 'Title 1',
      content:
        'Content for accordion item 1. The accordion component delivers large amounts of content in a small space through progressive disclosure.',
    },
    {
      title: 'Title 2',
      content:
        'Content for accordion item 2. The accordion component delivers large amounts of content in a small space through progressive disclosure.',
    },
    {
      title: 'Title 3',
      content:
        'Content for accordion item 3. The accordion component delivers large amounts of content in a small space through progressive disclosure.',
    },
    {
      title: 'Title 4',
      content:
        'Content for accordion item 4. The accordion component delivers large amounts of content in a small space through progressive disclosure.',
    },
    {
      title: 'Title 5',
      content:
        'Content for accordion item 5. The accordion component delivers large amounts of content in a small space through progressive disclosure.',
    },
  ];

  const [openAccordion, setOpenAccordion] = useState(null);

  const handleAccordionToggle = (index) => {
    setOpenAccordion((prevOpenAccordion) =>
      prevOpenAccordion === index ? null : index
    );
  };

  return (
    <>
      <Grid className="faq" id="faq" fullWidth>
        <Column md={4} lg={4} sm={4}>
          <h1 className="heading7">Frequently asked questions</h1>
        </Column>
        <Column className="form" md={4} lg={12} sm={4}>
          <Accordion>
            {accordionItems.map((item, index) => (
              <AccordionItem
                key={index}
                title={item.title}
                open={openAccordion === index}
                onClick={() => handleAccordionToggle(index)}
              >
                <p>{item.content}</p>
              </AccordionItem>
            ))}
          </Accordion>
        </Column>
      </Grid>
    </>
  );
};

export default Faq;

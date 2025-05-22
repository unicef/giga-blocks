'use client';

import React, { useState } from 'react';
import { Accordion, AccordionItem, Button } from '@carbon/react';
import './faqs.scss';

export default function FAQs() {
  const [expandedId, setExpandedId] = useState(1);

  const faqData = [
    {
      id: 1,
      title: 'What does "activating a school" mean?',
      content:
        'Activating a school means placing its core data, such as location, name, and connectivity status on a permissionless blockchain, ensuring transparency and long-term availability. To be clear, it does not mean that this school will immediately be connected to the internet.',
    },
    {
      id: 2,
      title: 'How do I know the data is accurate?',
      content:
        'The data is provided to Giga through multiple sources, including government databases, school administrators and local partners. Each data point is cross-referenced before being added to the blockchain. And if data changes, down the line, the on-chain data will be updated.',
    },
    {
      id: 3,
      title: 'Why is on-chain data so important?',
      content:
        'On-chain data provides immutable, transparent records that cannot be altered or deleted. This ensures long-term data integrity and allows for public verification of school information.',
    },
    {
      id: 4,
      title: 'Do I need a crypto wallet to activate a school?',
      content:
        'Yes, for now you need a crypto wallet to activate a school. Down the line, we could look into adding more traditional forms of payment.',
    },
    {
      id: 5,
      title: 'How do the funds help schools?',
      content:
        'The funds collected through Giga Blocks will contribute to the Giga Pooled Fund. This fund will be used to pay for programmatic activities Giga carries out to accelerate connectivities for schools worldwide, including supporting governments to map, finance and connect schools in their countries. To be clear, the funds are not funding the activated school in particular, but rather Giga as a whole.',
    },
    {
      id: 6,
      title: 'What about the artwork?',
      content:
        'The artwork by Cole Sternberg is procedurally generated and will evolve as schools receive connectivity. The means that as the school data changes, the image will change along with it.',
    },
  ];

  const handleAccordionToggle = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="faqs-container">
      <div className="faqs-left-column">
        <h1 className="faqs-title">FAQs</h1>
        <p className="faqs-subtitle">
          Everything You've Wanted to Know (And Then Some!)
        </p>
        <Button kind="tertiary" className="contact-button">
          Contact us
        </Button>
      </div>
      <div className="faqs-right-column">
        <Accordion>
          {faqData.map((faq) => (
            <AccordionItem
              key={faq.id}
              title={`${faq.id}. ${faq.title}`}
              open={expandedId === faq.id}
              onClick={() => handleAccordionToggle(faq.id)}
              className="faq-item"
            >
              <p className="faq-content">{faq.content}</p>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

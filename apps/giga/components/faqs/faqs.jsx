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
        'Activating a school means placing its core data—such as location, enrollment, and connectivity status—on a permissionless blockchain, ensuring transparency and long-term availability.',
    },
    {
      id: 2,
      title: 'How do I know the data is accurate?',
      content:
        'The data is verified through multiple sources including government databases, school administrators, and local partners. Each data point is cross-referenced before being added to the blockchain.',
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
        "No, you don't need a crypto wallet. Our platform handles all blockchain interactions for you. You can activate a school using standard payment methods.",
    },
    {
      id: 5,
      title: 'How do the funds help schools?',
      content:
        'Funds are used to improve infrastructure, provide educational resources, enhance connectivity, and support teacher training programs at the activated schools.',
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

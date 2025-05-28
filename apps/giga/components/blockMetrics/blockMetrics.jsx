'use client';

import {
  Wikis,
  Education,
  ConnectionSignalOff,
  Location,
  UserMultiple,
  CheckmarkOutline,
} from '@carbon/icons-react';

import { Modal, Button } from '@carbon/react';

import './_blockMetrics.scss';

import MetricsCard from '../../components/metricsCard/MetricsCard';
import { useState } from 'react';

export default function BlockMetrics() {
  const blockMetrics = [
    {
      id: 3,
      icon: <CheckmarkOutline size={24} />,
      iconColor: '#8B17CF', // Purple
      iconBg: '#F7EDFD', // Light purple
      value: '50k+',
      label: '',
      subtitle: 'Schools Activated',
      description:
        'Once a school’s data is on-chain, it’s safeguarded for the future, making it impossible to ignore or lose track of.',
    },
    {
      id: 1,
      icon: <Location size={24} />,
      iconColor: '#CF17CF', // Pink
      iconBg: '#FDEDFD', // Light pink
      value: '19,500,00',
      label: '',
      subtitle: 'Known Schools Inactivated',
      description:
        'These are schools we know exist, but who’s data has not been put on-chain yet.',
    },
    {
      id: 2,
      icon: <UserMultiple size={24} />,
      iconColor: '#0F62FE', // Blue
      iconBg: '#EBF2FF', // Light blue
      value: '310',
      label: '',
      subtitle: 'Giga Contributors',
      description:
        'The number of unique holders of school NFTs, powering our global movement.',
    },
  ];

  return (
    <section className="about-metrics">
      <div className="about-metrics__container">
        <h2 className="about-metrics__title">Giga Blocks Metrics</h2>

        <div className="about-metrics__grid">
          {blockMetrics?.map((metric) => (
            <MetricsCard
              id={metric.id}
              iconBg={metric.iconBg}
              iconColor={metric.iconColor}
              icon={metric.icon}
              value={metric.value}
              label={metric.label}
              subtitle={metric.subtitle}
              description={metric.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

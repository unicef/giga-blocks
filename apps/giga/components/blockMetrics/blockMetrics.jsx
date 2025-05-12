'use client';

import {
  Wikis,
  Education,
  ConnectionSignalOff,
  Location,
  ConnectionSignal,
  CheckmarkOutline,
} from '@carbon/icons-react';
import './_blockMetrics.scss';

import MetricsCard from '../../components/metricsCard/MetricsCard';

export default function BlockMetrics() {
  const blockMetrics = [
    {
      id: 1,
      icon: <Location size={24} />,
      iconColor: '#CF17CF', // Pink
      iconBg: '#FDEDFD', // Light pink
      value: '2.3M+',
      label: '',
      subtitle: 'Schools Mapped',
      description:
        'Out of an estimated 6 million schools worldwide. No one knows the exact number, but our mapping efforts help governments locate and support them.',
    },
    {
      id: 2,
      icon: <ConnectionSignal size={24} />,
      iconColor: '#0F62FE', // Blue
      iconBg: '#EBF2FF', // Light blue
      value: '415k+',
      label: '',
      subtitle: 'School reporting connectivity status',
      description:
        'Understanding the scope of the problem is the first step to solving it. These schools share their current connectivity levels with Giga, driving data-informed action.',
    },
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
      id: 4,
      icon: <Wikis size={24} />,
      iconColor: '#FFB338', // Orange
      iconBg: '#FFF7EB', // Light orange
      value: '6,000,000+',
      label: 'Estimated',
      subtitle: 'Total Schools Worldwide',
      description:
        'A staggering figure, especially since many remain unmapped.',
    },
    {
      id: 5,
      icon: <Education size={24} />,
      iconColor: '#DC6734', // Red
      iconBg: '#FCF2EE', // Light red
      value: '2,000,000+',
      label: '(Mapped)',
      subtitle: 'Located & Documented',
      description:
        "We're proud of this milestone, but we still have a long way to go.",
    },
    {
      id: 6,
      icon: <ConnectionSignalOff size={24} />,
      iconColor: '#CF1754', // Pink
      iconBg: '#FDEDF2', // Light pink
      value: '~50%',
      label: '',
      subtitle: 'Offline Schools',
      description:
        'Half of the identified schools lack internet access, and thus vital digital resources.',
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

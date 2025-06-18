'use client';

import {
  Wikis,
  Education,
  IbmVpnForVpc,
  Link,
  UserMultiple,
  JobDaemon,
} from '@carbon/icons-react';
import { useMetrics } from '../../../app/hooks/useMetrics';
import './_metrics.scss';
import MetricsCard from '../../../components/metricsCard/MetricsCard';
import MetricsCardSkeleton from '../../../components/metricCardSkeleton/MetricCardSkeleton';

export default function Metrics() {
  const { data: metricsData, isLoading } = useMetrics();

  const metrics = [
    {
      id: 1,
      icon: <Wikis size={24} />,
      iconColor: '#F8BD5A', // Orange
      iconBg: '#FFF8E1', // Light orange
      value: '6,000,000+',
      label: 'Estimated',
      subtitle: 'Total Schools Worldwide',
      description:
        'A staggering figure, especially since many remain unmapped.',
    },
    {
      id: 2,
      icon: <Education size={24} />,
      iconColor: '#E8553E', // Red
      iconBg: '#FFF0ED', // Light red
      value: '2,000,000+',
      label: '(Mapped)',
      subtitle: 'Located & Documented',
      description:
        "We're proud of this milestone, but we still have a long way to go.",
    },
    {
      id: 3,
      icon: <IbmVpnForVpc size={24} />,
      iconColor: '#D12765', // Pink
      iconBg: '#FCF2F6', // Light pink
      value: metricsData?.offline || '~50%',
      label: '',
      subtitle: 'Offline Schools',
      description:
        'Half of the identified schools lack internet access, and thus vital digital resources.',
    },
    {
      id: 4,
      icon: <Link size={24} />,
      iconColor: '#D12765', // Pink
      iconBg: '#FCF2F6', // Light pink
      value: '1',
      label: 'Shared Ledger',
      subtitle: 'Permission less & Permanent',
      description:
        'Once a school is recorded, its data is secured for as long as the blockchain exists.',
    },
    {
      id: 5,
      icon: <UserMultiple size={24} />,
      iconColor: '#4589FF', // Blue
      iconBg: '#EDF5FF', // Light blue
      value: metricsData?.contributorCount || 0,
      label: '',
      subtitle: 'Giga Contributors',
      description:
        'The number of unique holders of school NFTs, powering our global movement.',
    },
    {
      id: 6,
      icon: <JobDaemon size={24} />,
      iconColor: '#8A3FFC', // Purple
      iconBg: '#F6F2FF', // Light purple
      value: 'Infinite',
      label: '',
      subtitle: 'Potential Collaborators',
      description:
        'Once schools are visible, organizations and individuals can unite to close the connectivity gap.',
    },
  ];

  return (
    <section className="about-metrics">
      <div className="about-metrics__container">
        <h2 className="about-metrics__title">Giga Blocks Metrics</h2>

        <div className="about-metrics__grid">
          {isLoading ? (
            <MetricsCardSkeleton count={6} />
          ) : (
            metrics.map((metric) => (
              <MetricsCard
                key={metric.id}
                id={metric.id}
                iconBg={metric.iconBg}
                iconColor={metric.iconColor}
                icon={metric.icon}
                value={metric.value}
                label={metric.label}
                subtitle={metric.subtitle}
                description={metric.description}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}

// components/schoolDetails/SchoolStats.js
import { CheckmarkFilled, MeterAlt, NotAvailable } from '@carbon/icons-react';
import { useState } from 'react';

export default function SchoolStats({
  fontColor,
  cardColor,
  weeklyData,
  connectivity,
}) {
  const [selectedTab, setSelectedTab] = useState('weekly');

  return (
    <div className="school-details__stats">
      <div className="school-details__stat-cards">
        <div
          className="school-details__stat-card"
          style={{ backgroundColor: cardColor, borderColor: fontColor }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <h4 className="school-details__stat-title">Connectivity Status</h4>
            <div className="school-details__stat-icon connectivity">
              {connectivity ? (
                <CheckmarkFilled color={fontColor} size={24} />
              ) : (
                <NotAvailable color={fontColor} size={24} />
              )}
            </div>
          </div>
        </div>

        <div
          className="school-details__stat-card"
          style={{ backgroundColor: cardColor, borderColor: fontColor }}
        >
          <div className="school-details__stat-header">
            <div className="school-details__stat-icon download">
              <MeterAlt size={16} />
            </div>
            <h4 className="school-details__stat-title">
              Average Download Speed
            </h4>
          </div>
          <div className="school-details__stat-value">
            <span
              className="school-details__stat-number"
              style={{ color: fontColor }}
            >
              {290} Mbps
            </span>
          </div>
          <div className="school-details__stat-detail">
            <p>Connection Type</p>
            <p>{'adsl'}</p>
          </div>
          <div className="school-details__stat-detail">
            <p>Global Benchmark</p>
            <p>{10} Mbps</p>
          </div>
        </div>
      </div>

      <div
        className="school-details__chart-card"
        style={{ backgroundColor: cardColor, borderColor: fontColor }}
      >
        <div className="school-details__chart-tabs">
          <button
            className={`school-details__chart-tab ${
              selectedTab === 'weekly' ? 'active' : ''
            }`}
            onClick={() => setSelectedTab('weekly')}
          >
            Weekly
          </button>
          <button
            className={`school-details__chart-tab ${
              selectedTab === 'monthly' ? 'active' : ''
            }`}
            onClick={() => setSelectedTab('monthly')}
          >
            Monthly
          </button>
        </div>

        <div className="school-details__chart-dates">
          <button className="school-details__chart-nav" disabled>
            «
          </button>
          <button className="school-details__chart-nav" disabled>
            ‹
          </button>
          <span className="school-details__chart-date">
            24 March, 2024 - 2 April 2024
          </span>
          <button className="school-details__chart-nav">›</button>
          <button className="school-details__chart-nav">»</button>
        </div>

        <div className="school-details__chart">
          {weeklyData.map((item, index) => (
            <div key={index} className="school-details__chart-bar-container">
              <div
                className="school-details__chart-bar"
                style={{ height: `${(item.value / 150) * 100}%` }}
              />
              <div className="school-details__chart-label">{item.day}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

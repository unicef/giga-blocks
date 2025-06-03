// components/schoolDetails/SchoolStats.js
import { CheckmarkFilled, MeterAlt, NotAvailable } from '@carbon/icons-react';
import { useState, useEffect } from 'react';
import { useQOSDailyGet, useQOSWeeklyGet } from '../../app/hooks/useQOS';

const getMondayOfCurrentWeek = () => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 for Sunday, 1 for Monday, etc.
  // Calculate difference to get to Monday. If today is Sunday (0), go back 6 days to Monday.
  // Otherwise, go back (dayOfWeek - 1) days.
  const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  const monday = new Date(today.setDate(diff));
  monday.setHours(0, 0, 0, 0); // Set to start of the day to avoid time issues
  return monday;
};

export default function SchoolStats({
  fontColor,
  cardColor,
  bgColor,
  connectionType,
  connectivity,
  giga_school_id,
}) {
  const [selectedTab, setSelectedTab] = useState('weekly');
  const [currentWeekStart, setCurrentWeekStart] = useState(
    getMondayOfCurrentWeek()
  );

  const { data: weeklyData } = useQOSWeeklyGet(
    giga_school_id,
    currentWeekStart?.toISOString().split('T')[0],
    new Date(currentWeekStart?.getTime() + 6 * 24 * 60 * 60 * 1000)
      ?.toISOString()
      ?.split('T')[0]
  );

  const { data: dailyData, isLoading: dailyDataLoading } =
    useQOSDailyGet(giga_school_id);

  const getWeekRange = (startDate) => {
    const start = new Date(startDate);
    const end = new Date(startDate);
    end.setDate(start.getDate() + 6); // Add 6 days to get to Sunday

    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formatter = new Intl.DateTimeFormat('en-US', options);

    return `${formatter?.format(start)} - ${formatter.format(end)}`;
  };

  const handlePreviousWeek = () => {
    setCurrentWeekStart((prevStart) => {
      const newStart = new Date(prevStart);
      newStart.setDate(prevStart.getDate() - 7);
      return newStart;
    });
  };

  const handleNextWeek = () => {
    setCurrentWeekStart((prevStart) => {
      const newStart = new Date(prevStart);
      newStart.setDate(prevStart.getDate() + 7);
      return newStart;
    });
  };

  const speeds = weeklyData?.map((item) => item.averageSpeedUpload || 0);
  const maxSpeed = speeds ? Math.max(...speeds, 1) : 1;

  // Helper to get day name from YYYY-MM-DD string
  const getDayName = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' }); // e.g., "Mon", "Tue"
  };

  return (
    <div className="school-details__stats">
      <div className="school-details__stat-cards">
        <div
          className="school-details__stat-card"
          style={{ backgroundColor: bgColor, borderColor: cardColor }}
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
          style={{ backgroundColor: bgColor, borderColor: cardColor }}
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
              {dailyData?.averageDownloadSpeed?.toFixed(3) || '...'} Mbps
            </span>
          </div>
          <div className="school-details__stat-detail">
            <p>Connection Type</p>
            <p>{connectionType || '...'}</p>
          </div>
          <div className="school-details__stat-detail">
            <p>Global Benchmark</p>
            <p>{20} Mbps</p>
          </div>
        </div>
      </div>

      <div
        className="school-details__chart-card"
        style={{ backgroundColor: bgColor, borderColor: cardColor }}
      >
        <div className="school-details__chart-tabs">
          <button
            className={`school-details__chart-tab ${
              selectedTab === 'weekly' ? 'active' : ''
            }`}
            // onClick={() => setSelectedTab('weekly')}
          >
            Weekly
          </button>
          {/* <button
            className={`school-details__chart-tab ${
              selectedTab === 'monthly' ? 'active' : ''
            }`}
            onClick={() => setSelectedTab('monthly')}
          >
            Monthly
          </button> */}
        </div>

        <div className="school-details__chart-dates">
          <button
            className="school-details__chart-nav"
            onClick={handlePreviousWeek}
          >
            ‹
          </button>
          <span className="school-details__chart-date">
            {getWeekRange(currentWeekStart)}
          </span>
          <button
            className="school-details__chart-nav"
            onClick={handleNextWeek}
          >
            ›
          </button>
        </div>

        <div className="school-details__chart">
          {weeklyData?.map((item, index) => (
            <div key={index} className="school-details__chart-bar-container">
              <div
                className="school-details__chart-bar"
                style={{
                  height: `${
                    ((item.averageSpeedUpload || 0) / maxSpeed) * 100
                  }px`,
                  backgroundColor: fontColor,
                  // borderColor: cardColor,
                }}
              />
              <div className="school-details__chart-label">
                {getDayName(item.day)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

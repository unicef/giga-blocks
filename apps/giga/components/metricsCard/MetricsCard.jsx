import './_metricsCard.scss';
const MetricsCard = ({
  id,
  iconBg,
  iconColor,
  icon,
  value,
  label,
  subtitle,
  description,
}) => {
  return (
    <div key={id} className="metric-card">
      <div
        className="metric-card__icon-container"
        style={{ backgroundColor: iconBg }}
      >
        <div className="metric-card__icon" style={{ color: iconColor }}>
          {icon}
        </div>
      </div>

      <div className="metric-card__value-container">
        <h3 className="metric-card__value">
          {value} <span className="metric-card__label">{label}</span>
        </h3>
        <p className="metric-card__subtitle">{subtitle}</p>
      </div>

      <p className="metric-card__description">{description}</p>
    </div>
  );
};
export default MetricsCard;

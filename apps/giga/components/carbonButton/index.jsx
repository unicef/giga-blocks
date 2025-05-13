import React from 'react';
import './index.scss';

export default function CarbonButton({
  children,
  icon: Icon,
  kind = 'primary',
  ...props
}) {
  return (
    <button className={`carbon-btn carbon-btn--${kind}`} {...props}>
      <span className="carbon-btn__label">{children}</span>
      {Icon && <Icon className="carbon-btn__icon" />}
    </button>
  );
}

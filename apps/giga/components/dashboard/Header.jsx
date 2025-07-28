// components/DashboardHeader/DashboardHeader.jsx
'use client';

import { Copy, TaskComplete } from '@carbon/icons-react';

export default function DashboardHeader({
  address,
  isConnected,
  isConnecting,
  copied,
  handleCopy,
}) {
  return (
    <div className="dashboard-header">
      <h3>My Dashboard</h3>
      <h1 className="profile-name profile-border">
        {isConnecting ? (
          <p> Connecting...</p>
        ) : !isConnected ? (
          <p>Wallet not connected</p>
        ) : (
          <>
            {address?.slice(0, 4) + '...' + address?.slice(35, 43)}
            {copied ? (
              <TaskComplete
                size={24}
                style={{
                  marginLeft: '4px',
                  cursor: 'pointer',
                  color: '#A8A8A8',
                }}
                title="Copied!"
              />
            ) : (
              <Copy
                size={20}
                style={{
                  marginLeft: '4px',
                  cursor: 'pointer',
                  color: '#A8A8A8',
                }}
                onClick={handleCopy}
                title="Copy Address"
              />
            )}
          </>
        )}
      </h1>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Typography, Link } from '@mui/material';

const CountdownTimer = ({ setSeconds, seconds }) => {
  const [expired, setExpired] = useState(false);

  // useEffect(() => {
  //   localStorage.setItem('countdownSeconds', seconds?.toString());
  // }, [seconds]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);
    return () => clearInterval(countdown);
  }, [seconds]);

  useEffect(() => {
    if (seconds <= 0) {
      setExpired(true);
    }
    else {
      setExpired(false)
    }
  }, [seconds]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${minutes.toString().padStart(2, '0')} min ${remainingSeconds
      .toString()
      .padStart(2, '0')} sec`;
  };

  return (
    <>
      {expired ? (
        <Typography variant="body2" sx={{ color: '#f7931e', my: 3 }}>
          Your OTP has expired, please resend OTP to login.
        </Typography>
      ) : (
        <Typography variant="body2" sx={{ my: 3, color: 'black' }}>
          Your OTP expires in {formatTime(seconds)}
        </Typography>
      )}
    </>
  );
};

export default CountdownTimer;

import React, { useState, useEffect } from 'react';
import { Typography, Link } from '@mui/material';

type PropsType = {
  minute: number;
  handleResendLink: () => void;
};

const CountdownTimer: React.FC<PropsType> = ({ minute, handleResendLink }: PropsType) => {
  const initialSeconds = localStorage.getItem('countdownSeconds') || minute * 60;
  const [seconds, setSeconds] = useState(Number(initialSeconds));
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    localStorage.setItem('countdownSeconds', seconds.toString());
  }, [seconds]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  useEffect(() => {
    if (seconds <= 0) {
      setExpired(true);
    }
  }, [seconds]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${minutes.toString().padStart(2, '0')} min ${remainingSeconds
      .toString()
      .padStart(2, '0')} sec`;
  };

  const handleResendClick = () => {
    setSeconds(minute * 60);
    setExpired(false);
    localStorage.setItem('countdownSeconds', (minute * 60).toString());
    handleResendLink();
  };

  return (
    <>
      {expired ? (
        <Typography variant="body2" sx={{ color: '#f7931e', mb: 5 }}>
          Your OTP has expired.{' '}
          <Link
            variant="subtitle2"
            color="white"
            sx={{ cursor: 'pointer', color: '#f7931e' }}
            onClick={handleResendClick}
          >
            Resend code?
          </Link>
        </Typography>
      ) : (
        <Typography variant="body2" sx={{ my: 3, color: 'white' }}>
          Your OTP expires in {formatTime(seconds)}
        </Typography>
      )}
    </>
  );
};

export default CountdownTimer;

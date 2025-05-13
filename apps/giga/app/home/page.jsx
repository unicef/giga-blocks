'use client';

import { useEffect, useState } from 'react';
import LandingBanner from '../../components/landingBanner/landingBanner';

export default function LandingPage() {
  const [themeData, setThemeData] = useState({});

  // useEffect(() => {
  //   fetch('http://localhost:8000/theme')
  //     .then((res) => res.json())
  //     .then((data) => setThemeData(data));
  // }, []);
  useEffect(() => {
    setThemeData({});
  }, []);

  return <LandingBanner />;
}

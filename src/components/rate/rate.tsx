import React, { useState, useEffect } from 'react';
import { Rate } from 'antd';

import MoviDbService from '../../services/moviDbService';

interface Props {
  idMovie: number;
  rating?: number;
}

const RateStars = ({ idMovie, rating = 0 }: Props) => {
  const [rateValue, setRateValue] = useState(rating);
  const moviesDb = new MoviDbService();

  useEffect(() => {
    setRateValue(rating);
  }, [rating]);

  const rateChange = (value: number) => {
    const sessionId = localStorage.getItem('sessionId');
    setRateValue(value);
    moviesDb.setRateMovie({ value }, idMovie, sessionId);
  };

  const isAbility = rateValue > 0;

  // eslint-disable-next-line react/jsx-filename-extension
  return <Rate value={rateValue} count={10} onChange={rateChange} style={{ fontSize: 16 }} disabled={isAbility} />;
};

export default RateStars;

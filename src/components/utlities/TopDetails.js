import React from 'react';
import { Paragraph } from './Typography';

const TopDetails = ({ img, author, addDate }) => {
  return (
    <div className="content__top__details">
      <img className="top__details__img" src={img} alt="" />
      <h4>{author}</h4>
      <Paragraph gray>{addDate}</Paragraph>
    </div>
  );
};

export default TopDetails;

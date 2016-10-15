import React, { PropTypes } from 'react';

import { petalClassMap } from '../petal';

import './index.css';

function PetalText({ contentValue, name }) {
  return (
    <foreignObject height='200' width='200'>
      <span className={ `text text--${petalClassMap[name]}` }>
        { contentValue }
      </span>
    </foreignObject>
  );
}

PetalText.propTypes = {
  contentValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  name: PropTypes.string.isRequired,
};

export default PetalText;

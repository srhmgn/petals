import React, { PropTypes } from 'react';

import { petalClassMap } from '../petal';

import './index.css';

function PetalText({ contentValue, name }) {
  return (
    <g>
      <foreignObject>
        <span className={ `text text--${petalClassMap[name]}` }>
          { contentValue }
        </span>
      </foreignObject>
    </g>
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

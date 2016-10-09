import React, { PropTypes } from 'react';
import cx from 'classnames';

import './index.css';

function Message({
  isBanner = false,
  title,
  won,
}) {
  const wrapperClasses = cx({
    'message': true,
    'message--visible': title || won,
    'message--banner': isBanner,
  });

  return (
    <div className={ wrapperClasses }>
      <h2 className='message__title'>{ title || 'You won!' }</h2>
    </div>
  );
}

Message.propTypes = {
  isBanner: PropTypes.bool,
  title: PropTypes.string,
  won: PropTypes.bool,
};

export default Message;

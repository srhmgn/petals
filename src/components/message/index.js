import React, { PropTypes } from 'react';
import cx from 'classnames';

import './index.css';

function Message({
  won,
}) {
  const wrapperClasses = cx({
    'message': true,
    'message--visible': won,
  });

  return (
    <div className={ wrapperClasses }>
      <h2 className='message__title'>You won!</h2>
    </div>
  );
}

Message.propTypes = {
  won: PropTypes.bool.isRequired,
};

export default Message;

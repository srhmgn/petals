import React, { PropTypes } from 'react';
import cx from 'classnames';

import './index.css';

function Message({
  title,
}) {
  const wrapperClasses = cx({
    'message': true,
    'message--visible': title,
  });

  return (
    <div className={ wrapperClasses }>
      <h2 className='message__title'>{ title }</h2>
    </div>
  );
}

Message.propTypes = {
  title: PropTypes.string,
};

export default Message;

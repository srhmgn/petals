import React, { PropTypes, PureComponent } from 'react';
import cx from 'classnames';

import './index.css';

class GameWrapper extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    preventScroll: PropTypes.bool.isRequired,
    setPos: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.component.focus();
  }

  render() {
    const { children, preventScroll } = this.props;

    const wrapperClasses = cx({
      'game-wrapper': true,
      'game-wrapper--prevent-scroll': preventScroll,
    });

    return (
      <div
        className={ wrapperClasses }
        onKeyDown={ () => { console.log('hi'); } }
        ref={ c => { this.component = c; } }
        tabIndex='-1'>
        { children }
      </div>
    );
  }

  scrollLeft = () => {
    window.setTimeout(() => {
      if (!this.component) return;

      const bodyWidth = document.querySelector('body').offsetWidth;
      const componentWidth = this.component.scrollWidth;

      if (bodyWidth < componentWidth) {
        this.component.scrollLeft = (componentWidth - bodyWidth) / 2;
      }
    }, 0);
  }
}

export default GameWrapper;

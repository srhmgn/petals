import React, { PropTypes, PureComponent } from 'react';

import './index.css';

class GameWrapper extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  componentDidMount() {
    this.scrollLeft();
  }

  render() {
    const { children } = this.props;

    return (
      <div className='game-wrapper' ref={ c => { this.component = c; } }>
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

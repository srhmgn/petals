import React, { PropTypes, PureComponent } from 'react';
import R from 'ramda';
import { OPERATIONS } from '../../constants';

import { petalClassMap } from '../petal';

import './index.css';

class GameWrapper extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    operations: PropTypes.object.isRequired,
    petalName: PropTypes.string.isRequired,
    pos: PropTypes.object,
    rows: PropTypes.array.isRequired,
    setOperation: PropTypes.func,
    setPetalName: PropTypes.func,
    setPos: PropTypes.func.isRequired,
    setRowCircle: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this._keyInterval = window.setInterval(this.checkKeyEvents, 150);
    this.component.focus();
  }

  componentWillUnmount() {
    window.clearInterval(this.keyInterval);
  }

  render() {
    const { children, isDisabled } = this.props;

    return (
      <div
        className='game-wrapper'
        onKeyDown={ !isDisabled && this.handleKeyDown }
        ref={ c => { this.component = c; } }
        tabIndex='-1'>
        { children }
      </div>
    );
  }

  handleKeyDown = e => {
    const { pos, setRowCircle } = this.props;

    if (e.key.match(/[1-9]/)) {
      setRowCircle({
        value: e.key,
        ...pos,
      });
      return;
    }
    this.keys.push(e.key);
    this.altKey = e.altKey;
    this.shiftKey = e.shiftKey;
  }

  checkKeyEvents = () => {
    if (!this.keys.length) return;
    const firstTwoKeys = this.keys.slice(0, 2);

    if (this.shiftKey) {
      this.openOperationSetterForPetal(firstTwoKeys);
    } else if (this.altKey) {
      this.setOperation(firstTwoKeys);
    } else {
      this.focusOnNeighboringField(firstTwoKeys);
    }

    this.keys = [];
    this.altKey = false;
    this.shiftKey = false;
  }

  openOperationSetterForPetal = (keys) => {
    const {
      pos: { circleIndex, rowIndex },
      setPetalName,
    } = this.props;

    function updatePetalName(petalName, parentRow, parentCircle) {
      const petal = document.querySelector(
        `#game #row${parentRow} #circle${parentCircle} .petal--${petalClassMap[petalName]}`
      );

      if (!petal) return;
      setPetalName(petalName);
    }

    if (R.contains('ArrowUp', keys) && R.contains('ArrowRight', keys)) {
      updatePetalName(
        'bottomLeft',
        rowIndex - 1,
        circleIndex + 1,
      );
    } else if (R.contains('ArrowDown', keys) && R.contains('ArrowLeft', keys)) {
      updatePetalName(
        'bottomLeft',
        rowIndex,
        circleIndex,
      );
    } else if (R.contains('ArrowUp', keys) && R.contains('ArrowLeft', keys)) {
      updatePetalName(
        'bottomRight',
        rowIndex - 1,
        circleIndex,
      );
    } else if (R.contains('ArrowDown', keys) && R.contains('ArrowRight', keys)) {
      updatePetalName(
        'bottomRight',
        rowIndex,
        circleIndex,
      );
    } else if (R.contains('ArrowRight', keys)) {
      updatePetalName(
        'right',
        rowIndex,
        circleIndex,
      ) || updatePetalName(
        'rightAlt',
        rowIndex,
        circleIndex,
      );
    } else if (R.contains('ArrowLeft', keys)) {
      updatePetalName(
        'right',
        rowIndex,
        circleIndex - 1,
      ) || updatePetalName(
        'rightAlt',
        rowIndex,
        circleIndex - 1,
      );
    }
  }

  setOperation = (keys) => {
    const { operations, petalName, setOperation } = this.props;
    const opValues = R.values(OPERATIONS);

    const currentIndex = opValues.indexOf(operations[petalName]);

    if (R.contains('ArrowRight', keys)) {
      setOperation({
        [petalName]: opValues[(currentIndex + 1) % opValues.length],
      });
    } else if (R.contains('ArrowLeft', keys)) {
      setOperation({
        [petalName]:
          opValues[(currentIndex - 1 + opValues.length) % opValues.length],
      });
    }
  }

  focusOnNeighboringField = (keys) => {
    const {
      pos: { circleIndex, rowIndex },
      rows,
      setPos,
    } = this.props;

    const coords = [];

    if (R.contains('ArrowDown', keys)) {
      if (R.contains('ArrowRight', keys)) {
        coords.push({
          circleIndex,
          rowIndex: rowIndex + 1,
        });
      } else if (R.contains('ArrowLeft', keys)) {
        coords.push({
          circleIndex: circleIndex - 1,
          rowIndex: rowIndex + 1,
        });
      } else {
        coords.push({
          circleIndex,
          rowIndex: rowIndex + 1,
        });
        coords.push({
          circleIndex: circleIndex - 1,
          rowIndex: rowIndex + 1,
        });
      }
    } else if (R.contains('ArrowUp', keys)) {
      if (R.contains('ArrowRight', keys)) {
        coords.push({
          circleIndex: circleIndex + 1,
          rowIndex: rowIndex - 1,
        });
      } else {
        coords.push({
          circleIndex,
          rowIndex: rowIndex - 1,
        });
      }
    } else if (R.contains('ArrowRight', keys)) {
      coords.push({
        circleIndex: circleIndex + 1,
        rowIndex,
      });
    } else if (R.contains('ArrowLeft', keys)) {
      coords.push({
        circleIndex: circleIndex - 1,
        rowIndex,
      });
    }

    coords.some(({ circleIndex: circleIdx, rowIndex: rowIdx }) => {
      if (rows[rowIdx] && rows[rowIdx][circleIdx]) {
        setPos({ circleIndex: circleIdx, rowIndex: rowIdx });
        return true;
      }

      return false;
    });
  }

  keys = [];
  altKey = false;
  shiftKey = false;
}

export default GameWrapper;

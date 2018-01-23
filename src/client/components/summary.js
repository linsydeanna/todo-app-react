import React from 'react';
import { Link } from 'react-router';

const noop = () => { };

/**
 * Prop Types
 * @private
 */
const propTypes = {
  todos: React.PropTypes.arrayOf(React.PropTypes.object),
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  todos: []
};

/**
 * Summary component
 * @returns {ReactElement}
 */
const Summary = ({ todos, onClickCompleteAll }) => {
  /**
 * Base CSS class
 */
  const baseCls = 'summary'
  return (
    <div className={baseCls}>
      {todos.filter(todo => todo.status === 'active').length} Tasks Remaining
      <p onClick={onClickCompleteAll}>Complete All</p>
    </div>
  );
}

Summary.propTypes = propTypes;
Summary.defaultProps = defaultProps;

export default Summary;
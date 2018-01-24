import React from 'react';
import Icon from 'react-fontawesome';

import Button from './button';
import TodoLink from './todo-link';

const noop = () => { };

/**
 * Prop Types
 * @private
 */
const propTypes = {
  filtered: React.PropTypes.bool,
  onClickDelete: React.PropTypes.func,
  onClickTodo: React.PropTypes.func,
  status: React.PropTypes.string,
  text: React.PropTypes.string,
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  filtered: false,
  onClickDelete: noop,
  onClickTodo: noop,
  status: '',
  text: '',
};

/**
 * Todo component
 * @returns {ReactElement}
 */
const Todo = ({ filtered, onClickDelete, onClickArchive, onClickTodo, status, archive, text }) => {
  /**
   * Base CSS class
   */
  const baseCls = 'todo';

  const todoTextCls = 'todo-text'
    + (status === 'complete' ? ' todo-text--status-complete' : '')

  const todoFilterCls = 'todo'
    + (filtered ? ' todo--filtered' : '');

  return (
    <li className={todoFilterCls}>
      <div className="checkbox-wrapper">
        <input
          checked={status === 'complete'}
          type="checkbox"
          onChange={onClickTodo}
        />
      </div>
      <div className="todo-text-and-button">
        <span className={todoTextCls}>
          {text}
        </span>
        {status === 'complete' &&
          !archive && <Button text="Archive" onClick={onClickArchive} />}
      </div>
      <div className="icon-wrapper">
        <Icon name="trash-o" onClick={onClickDelete} />
      </div>
    </li>
  );
}

Todo.propTypes = propTypes;
Todo.defaultProps = defaultProps;

export default Todo;

import React from 'react';

import { api } from '../helpers/api';
import Todo from './todo';

const noop = () => { };

/**
 * Prop Types
 * @private
 */
const propTypes = {
  filterBy: React.PropTypes.string,
  todos: React.PropTypes.arrayOf(React.PropTypes.object),
  updateTodos: React.PropTypes.func,
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  filterBy: '',
  todos: [],
  updateTodos: noop,
};

/**
 * Todos component
 * @returns {ReactElement}
 */
const Todos = ({ filterBy, todos, updateTodos }) => {
  /**
   * Base CSS class
   */
  const baseCls = 'todos';

  /**
   * Click handler for clicking on delete button
   * Deletes todo in database and adds callback for updating todos state with JSON from response
   *
   * @param {object} todo - Todo object
   */
  const onClickDelete = todo => {
    api('DELETE', todo, (json) => updateTodos(json));
  };

  /**
 * Click handler for clicking on archive button
 * Archives todo in database and adds callback for updating todos state with JSON from response
 *
 * @param {object} todo - Todo object
 */
  const onClickArchive = todo => {
    const archivedTodo = Object.assign(todo, { archive: true });
    api('PATCH', archivedTodo, (json) => updateTodos(json));
  };

  /**
   * Click handler for clicking on the todo
   * Toggles status state of Todo
   *
   * @param {object} todo - Todo object
   */
  const onClickTodo = todo => {
    const newTodo = Object.assign({}, todo);
    newTodo.status = todo.status === 'complete' ? 'active' : 'complete';
    newTodo.archive = false
    api('PATCH', newTodo, (json) => updateTodos(json));
  }

  /**
   * Renders All Todos
   *
   * @returns {Array} - Returns an array of Todo React Elements
   */
  const renderTodos = () => {
    return todos.map(todo => {
      let filtered;
      switch (filterBy) {
        case 'all':
          filtered = todo.archive
          break;
        case 'active':
          filtered = todo.status === 'complete';
          break;
        case 'completed':
          filtered = todo.status !== 'complete' || todo.archive;
          break;
        case 'archived':
          filtered = !todo.archive
          break;
        default:
          filtered = todo.archive
      }

      return (
        <Todo
          key={todo.id}
          filtered={filtered}
          onClickDelete={onClickDelete.bind(this, todo)}
          onClickArchive={onClickArchive.bind(this, todo)}
          onClickTodo={onClickTodo.bind(this, todo)}
          status={todo.status}
          archive={todo.archive}
          text={todo.text}
        />
      );
    })
  }

  return (
    <ul className={baseCls}>
      {renderTodos()}
    </ul>
  )
};

Todos.propTypes = propTypes;
Todos.defaultProps = defaultProps;

export default Todos;

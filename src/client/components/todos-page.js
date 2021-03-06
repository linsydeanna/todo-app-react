import React from 'react';
import { Link } from 'react-router';

import { api, getApiPromise } from '../helpers/api';
import Button from './button';
import Navbar from './navbar';
import TodoForm from './todo-form';
import TodoLink from './todo-link';
import Todos from './todos';
import Summary from './summary';

/**
 * TodosPage component
 * @class
 */
class TodosPage extends React.Component {
  /**
   * Base CSS class
   * @static
   */
  static baseCls = 'todos-page'

  /**
   * Prop types
   * @static
   */
  static propTypes = {
    params: React.PropTypes.object,
  };

  /**
   * Constructor
   * @constructor
   *
   * @param  {object} props - Props
   */
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      filterBy: props.params.filter,
    };

    this.addTodo = this.addTodo.bind(this);
    this.postTodo = this.postTodo.bind(this);
    this.setFilterBy = this.setFilterBy.bind(this);
    this.updateTodos = this.updateTodos.bind(this);
    this.onClickCompleteAll = this.onClickCompleteAll.bind(this);
    this.onClickArchiveAll = this.onClickArchiveAll.bind(this);
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    api('GET', null, this.updateTodos);
  }


  /**
   * Listen for prop changes from the URL filter params, and update state with changes
   */
  componentWillReceiveProps(nextProps) {
    const propsChanged = this.props.params.filter !== nextProps.params.filter
    if (!!nextProps.params.filter && propsChanged) this.setFilterBy(nextProps.params.filter)
    if (nextProps.location.pathname === "/") this.setFilterBy('all')
  }

  /**
   * Add todo
   *
   * @param  {string} text - Todo text
   */
  addTodo(text) {
    if (!text) {
      return;
    }

    api('POST', { text }, this.postTodo);
  }

  /**
   * Posts new todo to the todos collection
   *
   * @param  {object} json - Resulting JSON from fetch
   */
  postTodo(json) {
    this.setState({
      todos: [...json],
    });
  }

  /**
   * Set filterBy state
   *
   * @param {string} filterBy - filterBy state
   */
  setFilterBy(filterBy) {
    this.setState({ filterBy });
  }

  /**
   * Update todos array state
   *
   * @param  {Array} todos - Array of todo objects
   */
  updateTodos(todos) {
    this.setState({ todos });
  }

  /**
 * Create new arrays with all todos complete and update todos state
 */
  onClickCompleteAll() {
    const newTodos = this.state.todos.map(todo => {
      todo.status = 'complete'
      return todo
    })
    api('PUT', newTodos, this.updateTodos);
  }

  /**
 * Create new arrays with all completed todos archived and update todos state
 */
  onClickArchiveAll() {
    const newTodos = this.state.todos.map(todo => {
      if (todo.status === 'complete') {
        todo.archive = true
      }
      return todo
    })
    api('PUT', newTodos, this.updateTodos);
  }

  /**
   * Render
   * @returns {ReactElement}
   */
  render() {
    return (
      <div className="todos-page">
        <Navbar
          filterBy={this.state.filterBy}
          onClickArchiveAll={this.onClickArchiveAll}
        />

        <Summary
          todos={this.state.todos}
          onClickCompleteAll={this.onClickCompleteAll}
        />

        <TodoForm onSubmit={this.addTodo} />

        <Todos
          filterBy={this.state.filterBy}
          todos={this.state.todos}
          updateTodos={this.updateTodos}
        />
      </div>
    );
  }
}

export default TodosPage;

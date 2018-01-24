import React from 'react';
import { Link } from 'react-router';
import Button from './button';

/**
 * Prop Types
 * @private
 */
const propTypes = {
  filterBy: React.PropTypes.string,
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  filterBy: ''
};

/**
 * Navbar component
 * @returns {ReactElement}
 */
const Navbar = ({ filterBy, onClickArchiveAll }) => {
  /**
   * Base CSS class
   */
  const baseCls = 'navbar'

  /**
   * Todo item class
   */
  const itemCls = 'item'

  let activeLinkCls = itemCls;
  activeLinkCls += filterBy === 'active' ? ` ${itemCls}__item--active` : '';

  let completedLinkCls = itemCls;
  completedLinkCls += filterBy === 'completed' ? ` ${itemCls}__item--active` : '';

  let archivedLinkCls = itemCls;
  archivedLinkCls += filterBy === 'archived' ? ` ${itemCls}__item--active` : '';

  return (
    <div className={baseCls}>
      <div className='items-wrapper'>
        <Link
          to='/'
          activeClassName={`${itemCls}__item--active`}
          className={itemCls}
        >
          All
      </Link>
        <Link
          to='/active'
          className={activeLinkCls}
        >
          Active
      </Link>
        <Link
          to='/completed'
          className={completedLinkCls}
        >
          Completed
      </Link>
        <Link
          to='/archived'
          className={archivedLinkCls}
        >
          Archived
      </Link>
      </div>
      <div className='archive-all-button-wrapper'>
        <Button text="Archive all completed" onClick={onClickArchiveAll} />
      </div>
    </div>
  );
}

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

export default Navbar;

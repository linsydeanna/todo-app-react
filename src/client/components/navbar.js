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

  let activeLinkCls = `${baseCls}__item`;
  activeLinkCls += filterBy === 'active' ? ` ${baseCls}__item--active` : '';

  let completedLinkCls = `${baseCls}__item`;
  completedLinkCls += filterBy === 'completed' ? ` ${baseCls}__item--active` : '';

  let archivedLinkCls = `${baseCls}__item`;
  archivedLinkCls += filterBy === 'archived' ? ` ${baseCls}__item--active` : '';

  return (
    <div className={baseCls}>
      <div className={`${baseCls}__items-wrapper`}>
        <Link
          to="/"
          activeClassName={`${baseCls}__item--active`}
          className={`${baseCls}__item`}
        >
          All
      </Link>
        <Link
          to="/active"
          className={activeLinkCls}
        >
          Active
      </Link>
        <Link
          to="/completed"
          className={completedLinkCls}
        >
          Completed
      </Link>
        <Link
          to="/archived"
          className={archivedLinkCls}
        >
          Archived
      </Link>
      </div>
      <div className={`${baseCls}__button-wrapper`}>
        <Button text="Archive all completed" onClick={onClickArchiveAll} />
      </div>
    </div>
  );
}

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

export default Navbar;

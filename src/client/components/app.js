import React from 'react';

import Header from './header';

/**
 * Prop Types
 * @private
 */
const propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node
  ]),
};

/**
 * App component
 * @returns {ReactElement}
 */
const App = ({ children, params }) => {
  /**
   * Base CSS class
   */
  const baseCls = 'app';

  return (
    <div className={baseCls}>
      <Header />

      {React.Children.map(children, child =>
        React.cloneElement(child, { params }))}
    </div>
  );
};

App.propTypes = propTypes;

export default App;

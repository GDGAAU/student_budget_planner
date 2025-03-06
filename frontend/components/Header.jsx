import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ title }) => {
  return <h2 className="m-4 text-2xl">{title}</h2>;
};

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;

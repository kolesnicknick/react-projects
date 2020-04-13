import React from 'react';
import * as PropTypes from "prop-types";

const NavBar = ({title, icon}) => {
    return (
        <div>

        </div>
    );
};

NavBar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
};

NavBar.defaultProps = {
    title: 'Contact Keeper'
};

export default NavBar;
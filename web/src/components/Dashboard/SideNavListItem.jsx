import React from 'react'
import { Link, useLocation } from 'react-router-dom';

import { styled } from 'baseui';

const SideNavListItem = ({ title, children, to }) => {
    const location = useLocation();
    return (
        <Link to={to} style={{ textDecoration: "none" }}>
            <StyledMenuItem $active={location.pathname === to} title={title}>
                {children}
                {title}
            </StyledMenuItem>
        </Link>
    )
}

export default SideNavListItem

const StyledMenuItem = styled('div', props => ({
    padding: '1.25rem 2rem',
    background: props.$active ? '#2B6CB0' : 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    fontSize: '1rem',
    color: props.$active ? '#DDE2FF' : '#DDE2FF',
    cursor: 'pointer',
    borderLeft: props.$active ? '4px solid #DDE2FF' : 'none',

    ':hover': {
        background: '#2B6CB0',
        color: '#DDE2FF',
        borderLeft: '4px solid #DDE2FF',
    }
}))
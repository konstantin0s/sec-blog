import React from 'react';

const AuthorizeOnly = ({children, allowedRoles, user}) => (allowedRoles.includes(user.role) && (
    <React.Fragment>
        {children}
    </React.Fragment>
));

export default AuthorizeOnly;
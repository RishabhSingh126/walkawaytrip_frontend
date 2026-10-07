import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '@/context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { state } = useContext(AuthContext);

    // If there is no user in state, redirect to the sign-in page
    if (!state.user) {
        return <Navigate to="/auth/sign-in" replace />;
    }

    return children;
};

export default ProtectedRoute;

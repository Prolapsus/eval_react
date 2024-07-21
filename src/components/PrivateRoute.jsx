import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, adminRequired = false }) => {
    const { currentUser } = useAuth();
    const location = useLocation();

    if (!currentUser) {
        // Redirige vers la page de connexion si non connecté
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (adminRequired && !currentUser.isAdmin) {
        // Redirige vers le tableau de bord utilisateur si l'accès admin est requis mais l'utilisateur n'est pas admin
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default PrivateRoute;

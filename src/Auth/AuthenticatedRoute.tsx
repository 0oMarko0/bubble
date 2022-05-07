import { useAuth } from './AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const AuthenticatedRoute = ({ children }: { children: JSX.Element }) => {
    const auth = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.isSignin()) {
            return navigate('/signin', { state: { from: location }, replace: true });
        }
    });

    return children;
};

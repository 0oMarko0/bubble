import React from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, errorDescription } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

// got get the User from the firestore db with the user id (email)
interface UserContext {
    email: string;
    avatar: string;
}

interface AuthContextType {
    user: any;
    signin: (email: string, password: string) => void;
    signup: (email: string, password: string) => void;
    signout: () => void;
}

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthContext = React.createContext<AuthContextType>({
    user: null,
    signin: () => null,
    signup: () => null,
    signout: () => null,
});

export const useAuth = () => React.useContext(AuthContext);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = React.useState<any>(null);
    const navigate = useNavigate();
    const toast = useToast();

    const signin = (email: string, password: string) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential);
                navigate('/home');
            })
            .catch((e) => {
                setUser(null);
                toast({
                    title: 'Unable to sign in',
                    description: errorDescription(e),
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right',
                });
            });
    };

    const signup = (email: string, password: string) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user);
                navigate('/home');
            })
            .catch((e) => {
                setUser(null);
                toast({
                    title: 'Unable to sign up',
                    description: errorDescription(e),
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right',
                });
            });
    };

    const signout = () => {
        signOut(auth).then(() => {
            setUser(null);
            navigate('/signin');
        });
    };

    const value = { user, signin, signup, signout };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

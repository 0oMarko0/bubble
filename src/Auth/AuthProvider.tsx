import React from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db, errorDescription } from '../Common';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { User } from '../Models';
import { randomAvatar } from '../Common';

interface AuthContextType {
    user: User | null;
    isSignin: () => boolean;
    signin: (email: string, password: string) => void;
    signup: (email: string, password: string) => void;
    signout: () => void;
}

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthContext = React.createContext<AuthContextType>({
    user: null,
    isSignin: () => false,
    signin: () => null,
    signup: () => null,
    signout: () => null,
});

export const useAuth = () => React.useContext(AuthContext);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = React.useState<User | null>(null);
    const navigate = useNavigate();
    const toast = useToast();

    const isSignin = () => {
        return user != null;
    };

    const signin = (email: string, password: string) => {
        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const email: string = userCredential.user.email != null ? userCredential.user.email : '';
                const user = await getDoc(doc(db, 'Users', email));

                if (user.exists()) {
                    setUser({ email: user.data().email, avatar: user.data().avatar });
                    navigate('/home');
                } else {
                    throw `User ${email} does not exist`;
                }
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
            .then(async () => {
                const avatar = randomAvatar();
                await setDoc(doc(db, 'Users', email), {
                    email: email,
                    avatar: avatar,
                });
                setUser({ email, avatar });
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

    const value = { user, signin, signup, signout, isSignin };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

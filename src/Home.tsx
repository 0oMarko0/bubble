import {Button, Flex, useColorModeValue} from "@chakra-ui/react";
import {onAuthStateChanged, signOut} from "firebase/auth";
import {auth} from "./firebase";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export const Home = () => {
    const navigate = useNavigate()
    const monitorAuthState = async () => {
        onAuthStateChanged(auth, user => {
            if (user) {} else {
                navigate("/signin")
            }
        })
    }

    useEffect(() => {
        monitorAuthState().then()
    })

    return (
        <Flex minH={'100vh'}
              align={'center'}
              justify={'center'}
              bg={useColorModeValue('gray.50', 'gray.800')}>
            <Button onClick={() => onSignOut()}>Sign out</Button>
        </Flex>
    )
}

const onSignOut = async () => {
    await signOut(auth)
}

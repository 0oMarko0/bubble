import React from 'react';
import Nav from './Navigation/NavBar';
import { Button, Flex, HStack, useColorModeValue } from '@chakra-ui/react';
import { useAuth } from './Auth';

export const Home = () => {
    const auth = useAuth();
    return (
        <div>
            <Nav />
            <Flex minH={'100vh'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
                <HStack spacing={4}>
                    <Button onClick={() => auth.signout()}>Sign out</Button>
                </HStack>
            </Flex>
        </div>
    );
};

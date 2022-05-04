import { Button, Flex, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { useAuth } from './Auth';

export const Home = () => {
    const auth = useAuth();
    return (
        <Flex minH={'100vh'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
            <Button onClick={() => auth.signout()}>Sign out</Button>
        </Flex>
    );
};

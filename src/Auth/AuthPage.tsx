import { Box, Flex, Heading, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';
import React from 'react';

type AuthProps = {
    title: string;
    message: string;
    children: JSX.Element;
};

const AuthPage: React.FC<AuthProps> = ({ title, message, children }) => {
    return (
        <Flex minH={'100vh'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>{title}</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        {message}
                    </Text>
                </Stack>
                <Box rounded={'lg'} boxShadow={'lg'} p={8} bg={useColorModeValue('white', 'gray.700')}>
                    {children}
                </Box>
            </Stack>
        </Flex>
    );
};

export const SignInPage = () => (
    <AuthPage title={'Welcome to bubble'} message={'Sign in to access your account 🚀'}>
        <SignIn />
    </AuthPage>
);
export const SignUpPage = () => (
    <AuthPage title={'Welcome to bubble'} message={'Create your account 🚀'}>
        <SignUp />
    </AuthPage>
);

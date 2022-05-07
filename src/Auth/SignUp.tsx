import { Button, FormControl, FormErrorMessage, FormLabel, HStack, Input, Stack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useAuth } from './AuthProvider';

type SignUpForm = {
    email: string;
    password: string;
};

export const SignUp: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields },
    } = useForm<SignUpForm>();

    const auth = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (form: SignUpForm) => {
        auth.signup(form.email, form.password);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={5}>
                <FormControl id="email" isInvalid={errors.email != undefined && touchedFields.email == true}>
                    <FormLabel htmlFor="email">Email address</FormLabel>
                    <Input {...register('email', { required: 'You must enter a email' })} />
                    <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                </FormControl>
                <FormControl id="password" isInvalid={touchedFields.password == true && errors.password != undefined}>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                        id="password"
                        type="password"
                        {...register('password', { required: 'You must enter a password' })}
                    />
                    <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                </FormControl>
            </Stack>
            <Stack spacing={10}>
                <Stack direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'} />
                <HStack spacing={3}>
                    <Button bg="green.400" color="white" _hover={{ bg: 'blue.500' }} type="submit">
                        Create
                    </Button>
                    <Button
                        bg="gray.400"
                        color="white"
                        _hover={{ bg: 'gray.500' }}
                        variant={'outline'}
                        onClick={() => navigate('/signin')}>
                        Sign in
                    </Button>
                </HStack>
            </Stack>
        </form>
    );
};

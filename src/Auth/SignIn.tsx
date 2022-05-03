import {Button, FormControl, FormErrorMessage, FormLabel, HStack, Input, Link, Stack, useToast} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import React from "react";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase";

type SignInForm = {
    email: string
    password: string
}

export const SignIn: React.FC = () => {
    const {register, handleSubmit, formState: {errors, touchedFields}} = useForm<SignInForm>()
    const navigate = useNavigate()
    const toast = useToast()
    const onSubmit = (form: SignInForm) => {
        signInWithEmailAndPassword(auth, form.email, form.password).then((user) => {
            navigate("/home")
        }).catch(e => {
            toast({
                title: "Unable to sign in",
                description: `${e.code.split("/")[1]}`,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top-right"
            })
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={5}>
                <FormControl id="email" isInvalid={(errors.email != undefined && touchedFields.email == true)}>
                    <FormLabel htmlFor="email">Email address</FormLabel>
                    <Input{...register("email", {required: "You must enter a email"})}/>
                    <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                </FormControl>
                <FormControl id="password"
                             isInvalid={(touchedFields.password == true && errors.password != undefined)}>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input id="password"
                           type="password"
                           {...register("password", {required: "You must enter a password"})}/>
                    <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                </FormControl>
            </Stack>
            <Stack spacing={10}>
                <Stack
                    direction={{base: 'column', sm: 'row'}}
                    align={'start'}
                    justify={'space-between'}>
                    <Link color={'blue.400'}>Forgot password?</Link>
                </Stack>
                <HStack spacing={3}>
                    <Button
                        bg={'green.400'}
                        color={'white'}
                        _hover={{bg: 'green.500'}}
                        type="submit">
                        Sign in
                    </Button>
                    <Button
                        bg='gray.400'
                        color='white'
                        _hover={{bg: 'gray.500'}}
                        variant={'outline'}
                        onClick={() => navigate("/signup")}>
                        Create account
                    </Button>
                </HStack>
            </Stack>
        </form>
    )
}

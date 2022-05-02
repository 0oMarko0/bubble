import {
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link,
    Stack,
    Text,
    useColorModeValue, useFormControl
} from "@chakra-ui/react";
import {onAuthStateChanged, signOut} from "firebase/auth";
import {auth, SignInWithEmailAndPassword} from "./firebase";
import {useEffect} from "react";

export const App = () => {
    const {handleSubmit, register, formState: {errors, isSubmitting}, } = useFormControl()
    useEffect(() => {
        monitorAuthState().then()
    })

    return (
        <div className="App">
            <Flex minH={'100vh'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            to enjoy all of our cool features ✌️
                        </Text>
                    </Stack>
                    <Box rounded={'lg'} boxShadow={'lg'} p={8} bg={useColorModeValue('white', 'gray.700')}>
                        <FormControl>
                            <FormLabel htmlFor="email">Email address</FormLabel>
                            <Input id="email" type="email"/>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <Input id="password" type="password"/>
                        </FormControl>
                        <Stack spacing={10}>
                            <Stack
                                direction={{base: 'column', sm: 'row'}}
                                align={'start'}
                                justify={'space-between'}>
                                <Checkbox>Remember me</Checkbox>
                                <Link color={'blue.400'}>Forgot password?</Link>
                            </Stack>
                            <Stack spacing={5}>
                                <Button
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                    onClick={() => signIn()}>
                                    Sign in
                                </Button>
                                <Button
                                    bg={'red.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                    onClick={() => logout()}>
                                    Logout
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </div>
    )
}

const monitorAuthState = async () => {
    onAuthStateChanged(auth, user => {
        if (user) {
            console.log("LOGIN")
        } else {
            console.log("LOGOUT")
        }
    })
}

const signIn = async () => {
    const result = await SignInWithEmailAndPassword("test@test.test", "testa1234")
    console.log(result)
}

const logout = async () => {
    await signOut(auth)
}

export default App

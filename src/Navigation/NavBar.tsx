import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Center,
    Flex,
    Heading,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Stack,
    useColorMode,
    useColorModeValue,
} from '@chakra-ui/react';
import Avatar from 'boring-avatars';
import React from 'react';
import { useAuth } from '../Auth';

export default function Nav() {
    const { colorMode, toggleColorMode } = useColorMode();
    const { user, signout } = useAuth();

    const avatarColors = ['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90'];

    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <Box>
                        <Heading as="h4" size="md">
                            Bubble
                        </Heading>
                    </Box>

                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={7}>
                            <Button onClick={toggleColorMode}>
                                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                            </Button>

                            <Menu>
                                <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
                                    <Avatar size={40} name={user?.avatar} variant="beam" colors={avatarColors} />
                                </MenuButton>
                                <MenuList alignItems={'center'}>
                                    <br />
                                    <Center>
                                        <Avatar
                                            size={80}
                                            name={user?.avatar}
                                            variant="beam"
                                            square={true}
                                            colors={avatarColors}
                                        />
                                    </Center>
                                    <br />
                                    <Center>
                                        <p>{user?.email.split('@')[0]}</p>
                                    </Center>
                                    <br />
                                    <MenuDivider />
                                    <MenuItem onClick={() => signout()}>Sign out</MenuItem>
                                </MenuList>
                            </Menu>
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}

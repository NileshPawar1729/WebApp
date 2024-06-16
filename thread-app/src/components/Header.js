import { Flex, Image, Link, useColorMode, Button } from '@chakra-ui/react'
import React from 'react'
import {  useRecoilValue, useSetRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';
import { AiOutlineHome } from 'react-icons/ai';
import { Link as RouterLink } from 'react-router-dom';
import {  BsFillChatQuoteFill, BsPersonCircle } from 'react-icons/bs'
import {MdOutlineSettings} from 'react-icons/md'
import { FiLogOut } from 'react-icons/fi'
import useLogout from '../hooks/useLogout';
import authScreenAtom from '../atoms/authAtom';
const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const user = useRecoilValue(userAtom);
    const Logout = useLogout();
    const setAuthScreen = useSetRecoilState(authScreenAtom);

    return (
        <>
            <Flex justifyContent={"space-between"} mt={6} mb={12} >
                {user && (
                    <Link as={RouterLink} to="/">
                        <AiOutlineHome size={24} />
                    </Link>
                )}

                {!user && (
                    <Link as={RouterLink} to={'/auth'} onClick={()=>setAuthScreen('login')}>
                        Login
                    </Link>
                )}

                <Image
                    cursor={"pointer"}
                    alt='logo'
                    w={6}
                    src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
                    onClick={toggleColorMode}
                />

                {user && (
                    <Flex alignItems={'center'} gap={4}>
                        <Link as={RouterLink} to={`/${user.username}`}>
                            <BsPersonCircle size={24} />
                        </Link>
                        <Link as={RouterLink} to={`/chat`}>
                            <BsFillChatQuoteFill size={24} />
                        </Link>
                        <Link as={RouterLink} to={`/settings`}>
                            <MdOutlineSettings size={24} />
                        </Link>
                        <Button
                            onClick={Logout}
                            size={'xm'}
                        ><FiLogOut size={20} /></Button>
                    </Flex>
                )}

                {!user && (
                    <Link as={RouterLink} to={'/auth'} onClick={()=>setAuthScreen('signup')}>
                        Sign up
                    </Link>
                )}

            </Flex>
        </>
    )
}

export default Header

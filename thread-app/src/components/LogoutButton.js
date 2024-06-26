import { Button, useToast } from '@chakra-ui/react'
import React from 'react'
import { useSetRecoilState } from 'recoil'
import userAtom from '../atoms/userAtom'
//import useShowToast from '../hooks/useShowToast'

const LogoutButton = () => {
    const setUser = useSetRecoilState(userAtom);
    const toast = useToast();
    const handleLogout = async () => {
        try {

            const res = await fetch("/api/users/logout", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await res.json();
            console.log(data);
            if (data.error) {
                toast({
                    title:"Error",
                    description: data.error,
                    status: "error",
                    duration: 3000,
                    isClosable: true
                })
                return;
            }
            localStorage.removeItem("user-threads");
            setUser(null);
        } catch (error) {
            toast({
                title:"Error",
                description: error,
                status: "error",
                duration: 3000,
                isClosable: true
            })
        }
    }

    return (
        <>
            <Button
                position={"fixed"}
                top={'30px'}
                right={'30px'}
                size={'sm'}
                onClick={handleLogout}
            >Logout</Button>
        </>
    )
}

export default LogoutButton

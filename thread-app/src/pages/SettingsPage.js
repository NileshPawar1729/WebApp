import { Button, Text, useToast } from '@chakra-ui/react'
import React from 'react'
import useLogout from '../hooks/useLogout';

const SettingsPage = () => {

    const toast = useToast();
    const logout = useLogout();

    const freezeAccount = async () => {
        if (!window.confirm("Are you sure you want to freeze your account?")) return;

        try {

            const res = await fetch("/api/users/freeze", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
            })

            const data = await res.json();
            if (data.error) {
                toast({
                    title: "Error",
                    description: data.error,
                    status: "error",
                    duration: 3000,
                    isClosable: true
                })
                return
            }
            if (data.success) {
                await logout()
                toast({
                    title: "Success",
                    description: "Your account has been frozen",
                    status: "success",
                    duration: 3000,
                    isClosable: true
                })
                return
            }

        } catch (error) {
            toast({
                title: "Error",
                description: error,
                status: "error",
                duration: 3000,
                isClosable: true
            })
        }

    }
    return (
        <>
            <Text my={1} fontWeight={'bold'}>Freeze Your Account</Text>
            <Text my={1}>You can unfreeze your account anytime by logging in </Text>
            <Button
                size={'md'}
                colorScheme='red' onClick={freezeAccount}
            >Freeze</Button>
        </>
    )
}

export default SettingsPage


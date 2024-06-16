import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import { useToast } from "@chakra-ui/react";

const useLogout = () => {

    const setUser = useSetRecoilState(userAtom);
    const toast = useToast();

    const Logout = async () => {
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
return Logout;
}

export default useLogout

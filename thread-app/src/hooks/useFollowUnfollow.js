import { useToast } from "@chakra-ui/react";
import { useState } from "react"
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";

const useFollowUnfollow = (user) => {
    const currentUser = useRecoilValue(userAtom);
    const [following, setFollowing] = useState(user?.followers?.includes(currentUser?._id) || false);
    const [updating, setUpdating] = useState(false);
    const toast = useToast();
    

    const handleFollowUnfollow = async () => {

        if (!currentUser) {
            toast({
                title: 'Error',
                description: "Please login to follow",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return
        }
        if (updating) return;
        setUpdating(true);
        try {
            const res = await fetch(`/api/users/follow/${user._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json();
            if (data.error) {
                toast({
                    title: 'Error',
                    description: data.error,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })
                return;
            }

            if (following) {
                toast({
                    title: 'Success',
                    description: `Unfollowed ${user.name}`,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })
                user.followers.pop();
            }
            else {
                toast({
                    title: 'Success',
                    description: `Followed ${user.name}`,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })
                user.followers.push(currentUser?._id);
            }
            setFollowing(!following);

            console.log(data);

        } catch (error) {
            toast({
                title: 'Error',
                description: error,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        } finally {
            setUpdating(false);
        }
    }

    return {handleFollowUnfollow, updating, following};
}

export default useFollowUnfollow

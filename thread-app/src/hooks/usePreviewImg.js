import { useToast } from "@chakra-ui/react";
import { useState } from "react"


const usePreviewImg = () => {
    const [imgUrl, setImgUrl] = useState();
    const toast = useToast();
    const handelChangeImg = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setImgUrl(reader.result)
            }
            reader.readAsDataURL(file);
        }
        else {
            toast({
                title: "Invalid File Type",
                description: "Please select an image file",
                status: 'error',
                duration: 3000,
                isClosable: true
            });
            setImgUrl(null);
        }
    }

    return { handelChangeImg, imgUrl, setImgUrl }
}

export default usePreviewImg

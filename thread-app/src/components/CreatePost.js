import { AddIcon } from '@chakra-ui/icons'
import { Button, CloseButton, Flex, FormControl, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, useColorModeValue, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import usePreviewImg from '../hooks/usePreviewImg';
import { BsFillImageFill } from 'react-icons/bs';
import { useRecoilState, useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import postsAtom from '../atoms/postsAtom';
import { useParams } from 'react-router-dom';

const MAX_CHAR = 500;

const CreatePost = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [postText, setPostText] = useState('');
    const user = useRecoilValue(userAtom);
    const { handelChangeImg, imgUrl, setImgUrl } = usePreviewImg();
    const imageRef = useRef(null);
    const [remainingchar, setRemainingchar] = useState(MAX_CHAR);
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useRecoilState(postsAtom);
    const {username} = useParams(); 

    const handleTextChange = (e) => {
        const inputText = e.target.value;

        if (inputText.length > MAX_CHAR) {
            const truncatedText = inputText.slice(0, MAX_CHAR);
            setPostText(truncatedText);
            setRemainingchar(0);
        }
        else {
            setPostText(inputText);
            setRemainingchar(MAX_CHAR - inputText.length)
        }
    };
    const handleCreatePost = async () => {
            setLoading(true)
        try {
            const res = await fetch('/api/posts/create', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ postedBy: user._id, text: postText, img: imgUrl })
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
            toast({
                title: "Success",
                description: "Post created successfully",
                status: "success",
                duration: 3000,
                isClosable: true
            })
            if(username === user.username){
                setPosts([data, ...posts]);
            }
            
            onClose();
            setPostText("");
            setImgUrl("");
        } catch (error) {
            toast({
                title: "Error",
                description: error,
                status: "error",
                duration: 3000,
                isClosable: true
            })
        }finally{
            setLoading(false)
        }
    }

    return (
        <>
            <Button
                onClick={onOpen}
                position={'fixed'}
                bottom={10}
                right={5}
                size={{base:"sm", sm:"md", }}
                bg={useColorModeValue('gray.300', 'gray.dark')}
            ><AddIcon /></Button>

            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create Post</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>

                        <FormControl>

                            <Textarea
                                onChange={handleTextChange}
                                value={postText}
                                placeholder='Post content goes here'
                            />
                            <Text fontSize={'xs'} fontWeight={'bold'} textAlign={'right'} m={1} color={'gray.800'}>
                                {remainingchar}/{MAX_CHAR}
                            </Text>
                            <Input
                                type='file'
                                hidden
                                ref={imageRef}
                                onChange={handelChangeImg}
                            />
                            <BsFillImageFill
                                style={{ marginLeft: "5px", cursor: "pointer" }}
                                size={16}
                                onClick={() => imageRef.current.click()}
                            />
                        </FormControl>

                        {imgUrl && (
                            <Flex mt={5} w={'full'} position={'relative'}>
                                <Image src={imgUrl} alt='selected image' />
                                <CloseButton
                                    onClick={() => {
                                        setImgUrl("")
                                    }}
                                    bg={'gray.800'}
                                    position={'absolute'}
                                    top={2}
                                    right={2}
                                />
                            </Flex>
                        )}

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleCreatePost}
                         isLoading={loading}
                        >
                            Post
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </>
    )
}

export default CreatePost

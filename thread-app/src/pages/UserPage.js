import React, { useEffect, useState } from 'react'
import UserHeader from '../components/UserHeader'
import { Flex, Spinner, useToast } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import Post from '../components/Post';
import useGetUserProfile from '../hooks/useGetUserProfile';
import { useRecoilState } from 'recoil';
import postsAtom from '../atoms/postsAtom';



const UserPage = () => {
 
  const {loading, user} = useGetUserProfile();
  const { username } = useParams();
  const toast = useToast();
  const [posts, setPosts] = useRecoilState(postsAtom); 
  const [fetchingPosts, setFetchingPosts] = useState(true);

  useEffect(() => {
    
    const getPosts =  async ()=>{

      if(!user) return;
      setFetchingPosts(true);
       try {
          
         const res = await fetch(`/api/posts/user/${username}`);
         const data  = await res.json()
         console.log(data);
         setPosts(data)

       } catch (error) {
        toast({
          title: "Error",
          description: error,
          status: "error",
          duration: 3000,
          isClosable: true
      })
      setPosts([]);
       }finally{
        setFetchingPosts(false);
       }
    }

    getPosts();
  }, [username, toast, setPosts, user]);
   console.log("Post is here and it is in recoil state", posts)
  if(!user && loading){
    return(
     <Flex justifyContent={'center'}>
        <Spinner size={'xl'}/>
     </Flex>
    )
  }
  if(!user && !loading) return <h1>User not found</h1>


  return (
    <>
      <UserHeader user={user} />
       
       {!fetchingPosts && posts.length === 0 && <h1>User has no posts</h1>}
       {fetchingPosts && (
        <Flex justifyContent={'center'} my={12}>
             <Spinner size={'xl'}/>
        </Flex>
       )}

       {posts.map((post)=>(
        <Post key={post._id} post={post} postedBy={post.postedBy} />
       ))}
    </>
  )
}

export default UserPage

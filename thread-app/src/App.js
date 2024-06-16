
import { Box, Container } from '@chakra-ui/react';
import { Routes, Route, Navigate} from 'react-router-dom'
import './App.css';
import UserPage from './pages/UserPage';
import Header from './components/Header';
import PostPage from './pages/PostPage';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import UpdateProfilePage from './pages/UpdateProfilePage';
import { useRecoilValue } from 'recoil';
import userAtom from './atoms/userAtom';
import CreatePost from './components/CreatePost';
import ChatPage from './pages/ChatPage';
import SettingsPage from './pages/SettingsPage';

function App() {

  const user = useRecoilValue(userAtom);
  console.log(user)
  //const { pathName } = useLocation();
  return (
    <Box position={'relative'} w={'full'}>
      <Container maxW={"800px"}>
        <Header />
        <Routes>
          <Route path='/' element={user ? <HomePage /> : <Navigate to="/auth" />} />
          <Route path='/auth' element={!user ? <AuthPage /> : <Navigate to="/" />} />
          <Route path='/update' element={user ? <UpdateProfilePage /> : <Navigate to="/auth" />} />
          <Route path='/:username' element={user ?
            (
              <>
                <UserPage />
                <CreatePost />
              </>
            ) : (
              <UserPage />
            )
          } />
          <Route path='/:username/post/:pid' element={<PostPage />} />
          <Route path='/chat' element={user ? <ChatPage /> : <Navigate to={'/auth'} />} />
          <Route path='/settings' element={user ? <SettingsPage /> : <Navigate to={'/auth'} />} />
        </Routes>



      </Container>
    </Box>
  );
}

export default App;

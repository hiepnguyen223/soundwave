import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout';
import Player from './components/Player';
import HomePage from './pages/HomePage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Upload from './pages/Upload';
import { Store } from './stores';
import theme from './utils/theme';

function App() {
    return (
        <BrowserRouter>
            <ChakraProvider theme={theme}>
                <div className="App">
                    <Store>
                        <Layout>
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/signin" element={<SignIn />} />
                                <Route path="/signup" element={<SignUp />} />
                                <Route path="/upload" element={<Upload />} />
                            </Routes>
                            <Player />
                        </Layout>
                    </Store>
                    <ToastContainer />
                </div>
            </ChakraProvider>
        </BrowserRouter>
    );
}

export default App;

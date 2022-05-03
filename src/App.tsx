import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignInPage, SignUpPage } from './Auth';
import { Home } from './Home';

export const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SignInPage />} />
                    <Route path="/signin" element={<SignInPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/home" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;

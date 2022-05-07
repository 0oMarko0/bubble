import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignInPage, SignUpPage } from './Auth';
import { Home } from './Home';
import { AuthProvider } from './Auth';

export const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route path="/" element={<SignInPage />} />
                        <Route path="/signin" element={<SignInPage />} />
                        <Route path="/signup" element={<SignUpPage />} />
                        <Route
                            path="/home"
                            element={
                                // <AuthenticatedRoute>
                                <Home />
                                // </AuthenticatedRoute>
                            }
                        />
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </div>
    );
};

export default App;

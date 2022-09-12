import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Trainding from '../../pages/Trainding';
import NotFound from '../../pages/NotFound';
import Navbar from '../Navbar';

function index() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/profil' element={<Profil />} />
                <Route path='/trending' element={<Trainding />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default index
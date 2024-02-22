import axios from 'axios';
import React, { useState } from 'react';
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const LogOut = () => {

        localStorage.clear();
        return navigate("/");
    }
    const handleButtonClick = async () => {
        try {
            setLoading(true);
            const apiUrl = 'https://loginapplication-5.onrender.com/api/home';
            axios.get(apiUrl)
                .then(response => {

                    console.log('Sunucudan gelen veri:', response.data);
                })
                .catch(error => {

                    console.error('GET isteği hatası:', error);
                });


        }
        catch (error) {
            setError(error.message); setResponse(null);
        }
        finally {
            setLoading(false);
        }
    };




    return (
        <div className='grid col-1'>
            <div className='flex flex-col justify-center items-center h-screen '>
                <h1 className='font-extrabold text-4xl mb-6' >Ana Sayfaya Hoşgeldiniz</h1>
                <h2 className='font-bold text-2xl mb-6'>Başarıyla giriş yaptınız!!</h2>
                <button type="button" onClick={handleButtonClick} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">CALL API</button>
                <button type="button" onClick={LogOut} class="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                    <LuLogOut className='mr-2' />
                    Log Out
                </button>
            </div>
        </div>
    );
}

export default Home;

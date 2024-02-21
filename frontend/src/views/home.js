import React, { useEffect, useState } from 'react';
import axios from "axios";


const Home = () => {

    const [res,setRes] = useState(undefined);
    useEffect(() => {
        // GET isteği yapılacak URL
        const apiUrl = 'http://localhost:3000/api/home';

        // Axios ile GET isteği yapma
        axios.get(apiUrl)
            .then(response => {
                // İsteğin başarılı olması durumunda gelen veriyi işleme
                console.log('Sunucudan gelen veri:', response.data);
                setRes(response);
            })
            .catch(error => {
                // Hata durumunu işleme
                console.error('GET isteği hatası:', error);
                
            });
    }, []);

    const apiUrl = 'http://localhost:3000/api/home';

    // Axios ile GET isteği yapma
    axios.get(apiUrl)
        .then(response => {
            // İsteğin başarılı olması durumunda gelen veriyi işleme
            console.log('Sunucudan gelen veri:', response.data);
        })
        .catch(error => {
            // Hata durumunu işleme
            console.error('GET isteği hatası:', error);
        });

    return (
        <div>
            <h2>Hoş geldiniz!</h2>
            <p>Başarıyla giriş yaptınız!</p>
        </div>
    );
}

export default Home;

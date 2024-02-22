import axios from 'axios';
import React, { useState } from 'react';


//import axios from "axios";


const Home = () => {

    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    //const [res,setRes] = useState(undefined);
    // useEffect(() => {
    //     // GET isteği yapılacak URL
    //     const apiUrl = 'http://localhost:3000/api/home';

    //     // Axios ile GET isteği yapma
    //     axios.get(apiUrl)
    //         .then(response => {
    //             // İsteğin başarılı olması durumunda gelen veriyi işleme
    //             console.log('Sunucudan gelen veri:', response.data);
    //             setRes(response);
    //         })
    //         .catch(error => {
    //             // Hata durumunu işleme
    //             console.error('GET isteği hatası:', error);

    //         });
    // }, []);

    // const apiUrl = 'http://localhost:3000/api/home';

    // // Axios ile GET isteği yapma
    // axios.get(apiUrl)
    //     .then(response => {
    //         // İsteğin başarılı olması durumunda gelen veriyi işleme
    //         console.log('Sunucudan gelen veri:', response.data);
    //     })
    //     .catch(error => {
    //         // Hata durumunu işleme
    //         console.error('GET isteği hatası:', error);
    //     });

    const handleButtonClick = async () => {
        try {       // İstek başladığında loading durumunu true yap    
            setLoading(true);       // API endpoint'i     
            const apiUrl = 'http://localhost:3000/api/home';
            axios.get(apiUrl)
                .then(response => {
                    // İsteğin başarılı olması durumunda gelen veriyi işleme
                    console.log('Sunucudan gelen veri:', response.data);
                })
                .catch(error => {

                    console.error('GET isteği hatası:', error);
                });


        }
        catch (error) {       // Hata durumunda hatayı state'e kaydet      
            setError(error.message); setResponse(null);
        }
        finally {       // İstek tamamlandığında loading durumunu false yap     
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Hoş geldiniz!</h2>
            <p>Başarıyla giriş yaptınız!</p>
            <button onClick={handleButtonClick} disabled={loading}>
                {loading ? 'Loading...' : 'Call API'}
            </button>
            {response && <div>API Response: {JSON.stringify(response)}</div>}
            {error && <div>Error: {error}</div>}
        </div>

    );
}

export default Home;

import axios from 'axios';

export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
    }
    else
        delete axios.defaults.headers.common["authorization"];
}

// Axios interceptor tanımlama
axios.interceptors.response.use(
    response => response,
    error => {
      const originalRequest = error.config;
  
      // Eğer hata kodu 401 (Yetkilendirme Hatası) ise ve bir refresh token varsa
      if (error.response.status === 401 && localStorage.getItem('refreshToken')) {
        // Refresh token ile yeni bir erişim token'ı almak için bir istek yap
        return axios.post("http://localhost:3000/api/refreshAccessToken", {
          refreshToken: localStorage.getItem('refreshToken')
        }).then(response => {
          // Yeni erişim token'ını localStorage'a kaydet
          const newToken = response.data.token;
          localStorage.setItem('token', newToken);
          // Yeni token'ı tekrar isteği gerçekleştirmek için Authorization başlığında kullan
          setAuthToken(newToken);
          // Orijinal isteği tekrar gerçekleştir
          return axios(originalRequest);
        }).catch(error => {
          // Yenileme token'ı hatalı ise veya sunucudan hata döndüyse, kullanıcıyı oturumu kapatmaya yönlendir
          // veya başka bir işlem yap
          console.error("Token yenileme hatası:", error);
          // Örneğin, kullanıcıyı oturumu kapatmaya yönlendirme:
          // window.location.href = '/logout';
          return Promise.reject(error);
        });
      }
      return Promise.reject(error);
    }
  );
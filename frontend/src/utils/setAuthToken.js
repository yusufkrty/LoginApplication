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
    

    if (error.response.status === 401 && localStorage.getItem('refreshToken')) {

      return axios.post("http://localhost:3000/api/auth/refresh-token", {
        refreshToken: localStorage.getItem('refreshToken')
      }).then(response => {

        const newToken = response.data.accessToken;

        localStorage.setItem('token', newToken);


        setAuthToken(newToken);
        originalRequest.headers["authorization"]= `Bearer ${newToken}`;
        //axios.defaults.headers.common["authorization"] = `Bearer ${newToken}`;


        return axios(originalRequest);
      }).catch(error => {

        console.error("Token yenileme hatası:", error);

        return Promise.reject(error);
      });
    }
    return Promise.reject(error);
  }
);
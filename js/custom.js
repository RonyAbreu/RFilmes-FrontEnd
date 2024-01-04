const axiosCustomToken = axios.create({
    baseURL: 'http://localhost:8080',
    headers:{
        Accept: 'application/json',
        Authorization: localStorage.getItem('token')
    }
})
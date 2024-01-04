const axiosCustomToken = axios.create({
    baseURL: 'https://rfilmes-prod.up.railway.app',
    headers:{
        Accept: 'application/json',
        Authorization: localStorage.getItem('token')
    }
})
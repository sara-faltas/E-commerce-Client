import axios from "axios"

const service = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URL}/api`
})

//we add this here instead of each private page to not repeat and for security 
// so adding the token to every single request(if it exist)
service.interceptors.request.use((config)=>{

    const authToken = localStorage.getItem("auth.Token")

    if (authToken){
        config.headers.authorization = `Bearer ${authToken}`
    }

    return config

})
export default service
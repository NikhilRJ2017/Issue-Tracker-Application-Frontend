// creating an axios instance with withCredentials set to true, hence browser can save cookies etc
const axiosInstance = axios.create({
    withCredentials: true
});

export default axiosInstance;
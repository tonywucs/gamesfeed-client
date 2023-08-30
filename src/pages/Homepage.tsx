import axios from 'axios'

const SERVER_URL = import.meta.env.VITE_SERVER_URL
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibG9naW5UaW1lIjoxNjkzMzQ3MzMxODQ5LCJpYXQiOjE2OTMzNDczMzEsImV4cCI6MTY5MzM0ODUzMX0.df6E1BqdT9sbeHw3R9WSB2EtJkaEqM5XzCX18F7_YZs"
// axios.get(`${SERVER_URL}/user/prefs`, {
//     headers: {
//         Authorization: `Bearer ${token}`
//     }
// })
// .then(res => {
//     console.log(res.data)
// })


const Homepage = () => {

    return (
        <div>
            <h1>Homepage</h1>
        </div>
    );
};

export default Homepage;
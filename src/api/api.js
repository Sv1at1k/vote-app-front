import axios from "axios";

const server = "http://localhost:8082"

const API = {
    sign_in : (data) => {
        return axios.get(`${server}/sign_in/${data.username}/${data.password}`)
    },
    sign_up : (data) => {
        return axios.post(`${server}/sign_up`,data)
    },
    createVote : (data) => {
        return axios.post(`${server}/vote`,data)
    },
    getAllVotes : () => {
        return axios.get(`${server}/vote`)
    },
    getVoteParams : () => {
        return axios.get(`${server}/vote/params`)
    },
    getPriotityVoteParams : () => {
        return axios.get(`${server}/vote/priority_params`)
    },
    makeVote : (vote_id , data) => {
        return axios.put(`${server}/make_vote/${vote_id}` , data)
    }
}

export default API;
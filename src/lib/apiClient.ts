import axios from "axios";

// APIを設定
const apiClient =axios.create({
        baseURL: "https://pokeapi.co/api/v2/pokemon"
    })

export default apiClient;
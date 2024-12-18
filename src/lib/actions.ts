import apiClient from "./apiClient";


// ポケモンたちの情報を取得する関数
export const getPokemons = async (offset:number, limit:number) => {
    const res = await apiClient.get(`?offset=${offset}&limit${limit}`)
    return res.data.results;
};

// ポケモンの詳細を取得する関数
export const getPokemon = async (pokemonId:string) => {
    const res = await apiClient.get(`/${pokemonId}`)
    return res.data;
};
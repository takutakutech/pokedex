"use client"

import { getPokemon } from "@/lib/actions";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

// 取得する情報の方を指定
interface Pokemon {
  name: string
  height: number
  weight: number
  types: {type: {name: string} }[]
};


const PokemonDetail = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const pathname = usePathname()
  const pokemonId =pathname.split('/')[1]
    // http://localhost:3000/3 が http://localhost:3000 と 3 に分かれる
  
  // ポケモンの詳細を取得
  const fetchPokemon = async () => {
    try {
      const _pokemon = await getPokemon(pokemonId)
      setPokemon(_pokemon); // 得られたデータを_pokemon→pokemonに格納
    } catch (error) {
      console.error(error);
    }
  };

  // ページ更新時
  useEffect(() => {
    fetchPokemon();
  }, []);

  // pokemonを取得していなかったら（ロード時）（ここ少し色々できそう）
  if (!pokemon) {
    return <p>ロード中。。。</p>
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-200 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold capitalize text-center mb-4">
        {pokemon.name}
      </h1>
      <p className="text-center mb-4">No. {pokemonId}</p> {/*4桁に*/}
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
        alt="husigidane"
        className="w-40 h-40 mx-auto mb-4"
      />
      <div className="text-center">
        <p className="mb-2">Height: {pokemon.height /10} m</p>
        <p className="mb-2">Weight: {pokemon.weight /10} kg</p>
        <div className="mb-2">
          <span>Types:</span>
          <span className="font-semibold">
            {pokemon.types.map((type) => type.type.name).join(', ')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
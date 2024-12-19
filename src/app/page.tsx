"use client"

import { getPokemons } from "@/lib/actions";
import Link from "next/link";
import { useEffect, useState } from "react";

// 取得する情報の方を指定
interface Pokemon {
  name: string
  url: string
};

// memo
// ヘッダーつけたい。リファクタリングも。最初の20重複の修正

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [offset, setOffset] = useState(0)
  const limit = 20

  // ページが更新されたらポケモンを取得（offsetの中身が変わったら）
  useEffect(() => {
    fetchPokemons()
  }, [offset]);
  
  // ポケモンを取得　＊最初の20個が2回出てきてるから修正の必要あり
  const fetchPokemons = async () => {
    try {
      const _pokemons = await getPokemons(offset, limit)
      setPokemons((prev) => [...prev, ..._pokemons]); // 前のに加える（スプレッド構文）
    } catch (error) {
      console.error(error);
    }
  };
  
  // スクロールしたらさらに取得
  useEffect(() => {
    window.addEventListener(`scroll`, handleScroll)
    return() => {
      window.removeEventListener(`scroll`, handleScroll) // ？？
    }
  }, []);

  // スクロールでさらに取得（offsetをさらに+20）
  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight -500){
      setOffset((prevOffset) => prevOffset + limit);
    }
  }; 
  

  
  return (
    <div>
      <div>
        <h1 className="text-2xl m-3 p-3 rounded-md text-blue-300 bg-red-100">hello! this is the Pokedex!</h1>
      </div>
      <div className="grid gap-4 p-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {pokemons.map((pokemon, index) => {
          const pokemonId = pokemon.url.split('/').slice(-2,-1)[0]
          return (
            <Link href={pokemonId} key={index}> {/*Linkコンポーネントでページ遷移*/}
              <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                  alt={pokemon.name}
                  className="w-40 h-40"
                />
                <p className="mt-2 text-sm font-semibold capitalize">{pokemon.name}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  );
};
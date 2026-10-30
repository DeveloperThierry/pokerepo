import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export const PokemonContext = createContext<PokemonContextProps | null>(null)

export const PokemonProvider = ({children}:{children:ReactNode}) => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([])
    useEffect(() => {
        const fetchPokemons = async () => {
          try {
            const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=60", {
              method: "GET",
            });
            const data = await res.json();
            const dataList = await Promise.all(
              data.results.map(async (pokemon: { name: string; url: string }) => {
                const detailRes = await fetch(pokemon.url);
                const detailData = await detailRes.json();
                return {
                  id: detailData.id,
                  name: detailData.name,
                  image: detailData.sprites.other.home.front_shiny,
                  types: detailData.types,
                };
              })
            );
            setPokemons(dataList);
          } catch (e) {
            console.log(e);
          }
        };
        fetchPokemons();
      }, []);
    return(
        <PokemonContext.Provider value={{pokemons, setPokemons}}>
            {children}
        </PokemonContext.Provider>
    )
}

export const usePokemons = () => {
    const context = useContext(PokemonContext)
    if(!context) throw new Error("Pokemon Context not Provided")
    return context
}
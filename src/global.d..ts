interface Pokemon {
    id: number;
    name: string;
    image: string;
    types: PokemonType[];
  }
  
  interface PokemonType {
    type: {
      name: string;
    };
  }

  
interface User {
    name:string|null,
    updateName:(value:string) => void
    clearName:() => void
}

interface PokemonContextProps {
    pokemons:Pokemon[]
    setPokemons:(pokemons:Pokemon[] | []) => void
}
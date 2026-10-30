import Header from "@/components/Header";
import { usePokemons } from "@/context/PokemonContext";
import { useUser } from "@/context/UserContext";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";



const pokemonTypeColors: Record<string, string> = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  grass: "#78C850",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
  dark: "#705848",
};
export default function Index() {
  const router = useRouter();
  const { name } = useUser();
  const {pokemons, setPokemons} = usePokemons()
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState("");
  

  useEffect(() => {
    const filterPokemons = () => {
      if (search.trimStart().trimEnd()) {
        setFilteredPokemons(
          pokemons.filter((p) =>
            p.name.toLowerCase().includes(search.toLowerCase())
          )
        );
      } else {
        setFilteredPokemons(pokemons);
      }
    };
    filterPokemons();
  }, [search, pokemons]);

  // if(!name || name.trim() == "") return <Redirect href={"/welcome"}/>
  return (
    <View style={styles.container}>
      <Header />
      <TextInput
        style={styles.SearchField}
        value={search}
        onChangeText={setSearch}
        placeholder="Search pokemon by name..."
      />
      <Text style={styles.title}>PokeDex</Text>
      <FlatList
        contentContainerStyle={styles.PokemonContainer}
        ListEmptyComponent={<Text>No Pokemons Found</Text>}
        data={filteredPokemons}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }: { item: Pokemon }) => (
          <Link href={`/details/${item.id}`}>
            <View
              style={[
                styles.PokemonCard,
                { backgroundColor: pokemonTypeColors[item.types[0].type.name] },
              ]}
            >
              <Image source={{ uri: item.image }} height={24} width={24} />
              <Text style={styles.Name}>
                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
              </Text>
            </View>
          </Link>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 30,
    gap: 10,
  },
  title: {
    fontSize: 21,
    fontWeight: "bold",
  },
  PokemonContainer: {
    gap: 10,
  },
  PokemonCard: {
    flex: 1,
    flexDirection: "row",
    gap: 5,
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    width: "100%",
  },
  Name: {
    fontSize: 20,
    fontWeight: "semibold",
  },
  SearchField: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    padding: 4,
  },
});

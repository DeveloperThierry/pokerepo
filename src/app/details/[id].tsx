import { usePokemons } from "@/context/PokemonContext";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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

const DetailScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const {pokemons, setPokemons} = usePokemons()
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)
  const [loading, setLoading] = useState<boolean>(true);

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

  const pokemonTypeEmojis: Record<string, string> = {
    normal: "⚪",
    fire: "🔥",
    water: "💧",
    electric: "⚡",
    grass: "🌿",
    ice: "❄️",
    fighting: "🥊",
    poison: "☠️",
    ground: "🌍",
    flying: "🦅",
    psychic: "🔮",
    bug: "🐛",
    rock: "🪨",
    ghost: "👻",
    dragon: "🐉",
    steel: "⚙️",
    fairy: "✨",
    dark: "🌑",
  };
  const fetchPokemonById = () => {
    try {
      setLoading(true);
      const pokemonsList = pokemons.filter((p) => p.id == Number(id))
      if(pokemonsList.length == 0) {
        return router.back()
      }
      setPokemon(pokemonsList[0]);
    } catch (e) {
      console.log(e);
      router.back();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    const timeoutId = setTimeout(fetchPokemonById, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>
          <ActivityIndicator size={100} color="orange" />
        </Text>
      </View>
    );
  if (!pokemon) return null;

  return (
    <Stack.Screen options={{ headerShown: false }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.caption}>PokeCard</Text>
          <View style={styles.imageContainer}>
            <Image source={{ uri: pokemon.image }} style={styles.image} />
          </View>
          <View style={styles.textContainer}>
          <View style={styles.row}>
            <Text style={styles.label}>ID: </Text>
            <Text style={styles.label}>{pokemon.id}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Name: </Text>
            <Text style={styles.label}>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</Text>

          </View>
          <View style={styles.row}>
            <Text style={styles.label}>
              Power: 
            </Text>
            <Text style={styles.label}>
              {pokemonTypeEmojis[pokemon.types[0].type.name]}
            </Text>

          </View>
          </View>
        </View>
      </SafeAreaView>
    </Stack.Screen>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#e5e5e5",
    // flex:1,
    width: "100%",
    borderRadius: 10,
    paddingHorizontal: 20,
    height: "100%",
    borderWidth:6,
    borderColor:"#fff"

  },
  image: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
  },
  imageContainer: {
    flex: 2,
  },
  caption: {
    color: "gray",
  },
  textContainer: {
    flex: 2,
    flexDirection: "column",
    justifyContent: "center",
  },
  label: {
    fontSize: 30,
    fontWeight: "semibold",
    paddingLeft: 10,
    color: "#4a4e69",
  },
  row:{
    flexDirection:"row",
    justifyContent:"space-between"
  }
});

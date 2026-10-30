import { PokemonProvider } from "@/context/PokemonContext";
import { UserProvider } from "@/context/UserContext";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <UserProvider>
      <PokemonProvider>
        <SafeAreaProvider>
          <Stack>
            <Stack.Screen
              name="welcome"
              options={{ title: "Welcome", headerShown: false }}
            />
            <Stack.Screen
              name="index"
              options={{ title: "Home", headerShown: false }}
            />
            <Stack.Screen name="details" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </SafeAreaProvider>
      </PokemonProvider>
    </UserProvider>
  );
}

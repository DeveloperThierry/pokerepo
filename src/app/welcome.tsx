import { useUser } from "@/context/UserContext";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const WelcomeScreen = () => {
  const [text, setText] = useState("");
  const {name, updateName } = useUser();

  if(name != null) return <Redirect href="/"/>
  const handleSave = () => {
    try {
      if (!text || text.trim() == "") {
        alert("name required");
        return;
      }
      updateName(text);
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome, please enter your name</Text>
      <View style={styles.inputContainer}>
        <TextInput value={text} onChangeText={setText} style={styles.input} />
        <Pressable onPress={handleSave}>
          <Ionicons name="arrow-forward" size={24} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  title: {},
  input: {
    minWidth: 100,
    borderRadius: 50,
    padding: 10,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    minWidth: 100,
    borderRadius: 50,
    padding: 10,
  },
});

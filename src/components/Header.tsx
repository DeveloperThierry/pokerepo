import { useUser } from "@/context/UserContext";
import { Redirect } from "expo-router";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";

const Header = () => {
  const { name, clearName } = useUser();
  if (!name || name.trim() == "") return <Redirect href={"/welcome"} />;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>Hi, {name ?? "Guest"}</Text>
      <TouchableHighlight onPress={clearName} style={styles.button}>
        <Text style={{ color: "white" }}>logout</Text>
      </TouchableHighlight>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    minWidth: 100,
    backgroundColor: "red",
    color: "white",
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
});

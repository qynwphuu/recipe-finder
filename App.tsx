import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TextInput,
  FlatList,
  Image,
} from "react-native";

type Foods = {
  name: string;
  image: string;
};

const handleFetch = () => {
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
    .then((response) => {
      if (!response.ok) throw new Error("Error in fetch" + response.statusText);

      response.json();
    })
    .then((data) => setFoodNames(data.items))
    .catch((err) => console.error(err));
};

const [keyword, setKeyword] = useState("");
const [foodNames, setFoodNames] = useState<Foods[]>([]);

export default function App() {
  return (
    <SafeAreaView>
      <SafeAreaProvider style={styles.container}>
        <TextInput
          style={{ fontSize: 18, width: 200 }}
          placeholder="Enter a keyword"
          value={keyword}
          onChangeText={(text) => setKeyword(text)}
        />

        <Button title="Find" onPress={handleFetch} />

        <FlatList
          data={foodNames}
          renderItem={({ item }) => (
            <View>
              <Text style={{ fontSize: 18 }}>{item.name}</Text>

              <Image
                style={{ width: 50, height: 50 }}
                source={{
                  uri: `https://www.themealdb.com/images/media/meals/se5vhk1764114880.jpg`,
                }}
              />
            </View>
          )}
        />
      </SafeAreaProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

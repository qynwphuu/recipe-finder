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
  ActivityIndicator,
} from "react-native";

// Must be the same with API names
type Foods = {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
};

export default function App() {
  const [keyword, setKeyword] = useState("");
  const [foodNames, setFoodNames] = useState<Foods[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFetch = () => {
    setLoading(true);

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
      .then((response) => {
        if (!response.ok)
          throw new Error("Error in fetch" + response.statusText);
        return response.json();
      })
      // Get the meals from the API
      .then((data) => setFoodNames(data.meals || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <TextInput
          style={{ fontSize: 18, width: 200 }}
          placeholder="Enter a keyword"
          value={keyword}
          onChangeText={(text) => setKeyword(text)}
        />

        <Button title="Find" onPress={handleFetch} />

        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            style={{ margin: 20 }}
            data={foodNames}
            renderItem={({ item }) => (
              <View style={{ marginBottom: 5 }}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  {item.strMeal}
                </Text>
                <Image
                  style={{ width: 50, height: 50 }}
                  source={{ uri: "URL HERE" }}
                />
              </View>
            )}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
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

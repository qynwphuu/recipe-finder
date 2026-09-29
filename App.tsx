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
          style={{
            fontSize: 18,
            width: 200,
            alignItems: "center",
            marginTop: 0,
            marginBottom: 10,
            borderWidth: 1,
            borderColor: "#ccc",
          }}
          placeholder="Enter a keyword"
          value={keyword}
          onChangeText={(text) => setKeyword(text)}
        />

        <Button title="Find" onPress={handleFetch} />

        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            style={styles.imagesContainer}
            data={foodNames}
            keyExtractor={(item) => item.idMeal}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <Text>{item.strMeal}</Text>
                <Image
                  source={{ uri: item.strMealThumb }}
                  style={{ width: 60, height: 60, borderRadius: 8 }}
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
    paddingTop: 40,
  },

  imagesContainer: {
    flex: 1,
    marginTop: 20,
    width: "80%",
  },

  itemContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },

  recipeItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  recipeTitle: {
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
    marginRight: 10,
  },
});

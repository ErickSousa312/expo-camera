import { CreateClass } from "@/screens/manager/Class/createClass";
import { MenberHandler } from "@/screens/manager/Member/menberHandler";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Animated, { FadeInUp, FadeOut } from "react-native-reanimated";
import { Image } from "expo-image";

export default function Gallery() {
  const [images, setImages] = useState<string[]>();

  async function pickImage() {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permissão para acessar a biblioteca de mídia é necessária.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      // aspect: [9, 16],
      quality: 0.3,
      base64: true,
    });

    if (!result.canceled && result.assets?.length) {
      console.log(result?.assets[0].uri);
      setImages([...(images ?? []), result.assets[0].uri]);
    }
  }

  function deleteImage(uri: any) {
    setImages(images?.filter((img) => img !== uri));
  }

  return (
    <View style={styles.container}>
      <Button title="Pick Image" onPress={pickImage} />
      <FlatList
        data={images}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Animated.View entering={FadeInUp} exiting={FadeOut}>
            <Image source={{ uri: item }} style={styles.image} />
            <Button title="Delete" onPress={() => deleteImage(item)} />
          </Animated.View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    paddingBottom: 20,
  },
  button: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: "white",
    fontSize: 18,
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
  },
});

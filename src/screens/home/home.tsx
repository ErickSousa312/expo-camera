import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Animated, { FadeInUp, FadeOut } from "react-native-reanimated";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import SVGGallery from "@/components/svgs/iconGallery";

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) return <View />;
  if (!permission.granted)
    return (
      <View style={styles.container}>
        <Text>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  async function takePhoto() {
    // Implementação da captura da foto
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <Text style={styles.text}>Capture</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tab}>
          <View style={styles.tabItem}>
            <View style={styles.tabButton}>
              <View style={styles.tabButtonInner}>
                <SVGGallery></SVGGallery>
              </View>
              <Text style={styles.tabButtonText}>Galeria</Text>
            </View>
            <View style={styles.tabButton}>
              <View style={styles.tabButtonInner}>
                <FontAwesome
                  name="photo"
                  size={25}
                  color={"black"}
                ></FontAwesome>
              </View>
              <Text style={styles.tabButtonText}>Galeria</Text>
            </View>
            <View style={styles.tabButton}>
              <TouchableOpacity style={styles.tabButtonInner}>
                <FontAwesome
                  name="photo"
                  size={25}
                  color={"black"}
                ></FontAwesome>
              </TouchableOpacity>
              <Text style={styles.tabButtonText}>Capturas</Text>
            </View>
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tab: {
    width: "100%",
    height: 110,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  tabItem: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  tabButtonText: {
    textAlign: "center",
    marginTop: 2,
    fontSize: 15,
    color: "#E14848",
  },
  tabButton: {
    alignItems: "center",
  },
  tabButtonInner: {
    overflow: "hidden",
    width: 50,
    height: 50,
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
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

import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import { Camera } from "expo-camera";
import { useDispatch } from "react-redux";
import * as InputActions from "../../../store/actions/inputAction";
import firebase from "../../../config";

const CameraScreen = ({ navigation }) => {
  const disptach = useDispatch();
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [cameraImage, setCameraImage] = useState(null);
  const [cameraImageURL, setCameraImageURL] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleCameraType = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const CameraImage = async () => {
    setLoading(true);
    const img = cameraURL.uri;
    const imgName = img.split("/").pop();
    const response = await fetch(img);
    const blob = await response.blob();
    const res = await firebase
      .storage()
      .ref()
      .child(`images/recipe/submissions/camera/` + imgName);
    await res.put(blob);
    const url = await res.getDownloadURL();

    await setCameraImageURL(url);
    setLoading(false);
  };

  const takePicture = async () => {
    if (cameraImage) {
      let photo = await cameraImage.takePictureAsync({
        quality: 0.3,
        aspect: [4, 3]
      });
      setLoading(true);
      const img = photo.uri;
      const imgName = img.split("/").pop();
      const response = await fetch(img);
      const blob = await response.blob();
      const res = await firebase
        .storage()
        .ref()
        .child(`images/recipe/submissions/camera/` + imgName);
      await res.put(blob);
      const url = await res.getDownloadURL();

      await disptach(InputActions.setCameraURL(url));
      setLoading(false);
      navigation.navigate("AddRecipe");
    }
  };

  return (
    <View style={{ flex: 0.8 }}>
      <Spinner
        visible={loading}
        textContent={"Loading..."}
        textStyle={{ color: "white" }}
      />
      <Camera
        style={{ flex: 1 }}
        type={cameraType}
        ref={ref => {
          setCameraImage(ref);
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 20
          }}
        >
          <TouchableOpacity
            style={{
              alignSelf: "flex-end",
              alignItems: "center",
              backgroundColor: "transparent"
            }}
          >
            <Ionicons
              name="ios-photos"
              style={{ color: "#fff", fontSize: 40 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignSelf: "flex-end",
              alignItems: "center",
              backgroundColor: "transparent"
            }}
            onPress={() => takePicture()}
          >
            <FontAwesome
              name="camera"
              style={{ color: "#fff", fontSize: 40 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignSelf: "flex-end",
              alignItems: "center",
              backgroundColor: "transparent"
            }}
            onPress={() => handleCameraType()}
          >
            <MaterialCommunityIcons
              name="camera-switch"
              style={{ color: "#fff", fontSize: 40 }}
            />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

export default CameraScreen;

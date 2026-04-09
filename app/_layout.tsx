import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
  const [cargando, setCargando] = useState(true);
  const router = useRouter();

  useEffect(() => {
    comprobarSesion();
  }, []);

  const comprobarSesion = async () => {
    try {
      const usuario = await AsyncStorage.getItem("usuarioActivo");
      if (usuario) {
        router.replace("/(tabs)");
      } else {
        router.replace("/login");
      }
    } catch (e) {
      router.replace("/login");
    } finally {
      setCargando(false);
    }
  };

  if (cargando) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#0F172A",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator color="#6366F1" size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

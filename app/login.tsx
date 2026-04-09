import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function LoginScreen() {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const router = useRouter();

  const iniciarSesion = async () => {
    if (!usuario || !contrasena) {
      Alert.alert("Error", "Rellena todos los campos");
      return;
    }
    try {
      const datos = await AsyncStorage.getItem("usuario_" + usuario);
      if (!datos) {
        Alert.alert("Error", "El usuario no existe");
        return;
      }
      const { contrasena: contrasenaGuardada } = JSON.parse(datos);
      if (contrasena !== contrasenaGuardada) {
        Alert.alert("Error", "Contrasena incorrecta");
        return;
      }
      await AsyncStorage.setItem("usuarioActivo", usuario);
      router.replace("/(tabs)");
    } catch (e) {
      Alert.alert("Error", "Algo salio mal");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.titulo}>MascotaHabitos</Text>
        <Text style={styles.subtitulo}>Inicia sesion para continuar</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Usuario</Text>
          <TextInput
            style={styles.input}
            placeholder="Tu nombre de usuario"
            placeholderTextColor="#475569"
            value={usuario}
            onChangeText={setUsuario}
            autoCapitalize="none"
          />

          <Text style={styles.label}>Contrasena</Text>
          <TextInput
            style={styles.input}
            placeholder="Tu contrasena"
            placeholderTextColor="#475569"
            value={contrasena}
            onChangeText={setContrasena}
            secureTextEntry
          />

          <TouchableOpacity style={styles.boton} onPress={iniciarSesion}>
            <Text style={styles.botonTexto}>Iniciar sesion</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botonSecundario}
            onPress={() => router.push("/register")}
          >
            <Text style={styles.botonSecundarioTexto}>
              No tienes cuenta? Registrate
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F172A" },
  content: { flex: 1, padding: 24, justifyContent: "center" },
  titulo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#E2E8F0",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 15,
    color: "#94A3B8",
    textAlign: "center",
    marginBottom: 40,
  },
  form: { gap: 12 },
  label: { fontSize: 14, color: "#94A3B8", marginBottom: 4 },
  input: {
    backgroundColor: "#1E293B",
    borderRadius: 12,
    padding: 16,
    color: "#E2E8F0",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#334155",
  },
  boton: {
    backgroundColor: "#6366F1",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  botonTexto: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  botonSecundario: { padding: 16, alignItems: "center" },
  botonSecundarioTexto: { color: "#6366F1", fontSize: 14 },
});

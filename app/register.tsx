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

export default function RegisterScreen() {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const router = useRouter();

  const registrarse = async () => {
    if (!usuario || !contrasena || !confirmar) {
      Alert.alert("Error", "Rellena todos los campos");
      return;
    }
    if (contrasena !== confirmar) {
      Alert.alert("Error", "Las contrasenas no coinciden");
      return;
    }
    if (contrasena.length < 4) {
      Alert.alert("Error", "La contrasena debe tener al menos 4 caracteres");
      return;
    }
    try {
      const existe = await AsyncStorage.getItem("usuario_" + usuario);
      if (existe) {
        Alert.alert("Error", "Ese nombre de usuario ya esta en uso");
        return;
      }
      await AsyncStorage.setItem(
        "usuario_" + usuario,
        JSON.stringify({ contrasena }),
      );
      await AsyncStorage.setItem("usuarioActivo", usuario);
      Alert.alert("Bienvenido", "Cuenta creada correctamente", [
        { text: "Entrar", onPress: () => router.replace("/(tabs)") },
      ]);
    } catch (e) {
      Alert.alert("Error", "Algo salio mal");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.titulo}>Crear cuenta</Text>
        <Text style={styles.subtitulo}>Registrate para empezar</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Nombre de usuario</Text>
          <TextInput
            style={styles.input}
            placeholder="Elige un nombre de usuario"
            placeholderTextColor="#475569"
            value={usuario}
            onChangeText={setUsuario}
            autoCapitalize="none"
          />

          <Text style={styles.label}>Contrasena</Text>
          <TextInput
            style={styles.input}
            placeholder="Minimo 4 caracteres"
            placeholderTextColor="#475569"
            value={contrasena}
            onChangeText={setContrasena}
            secureTextEntry
          />

          <Text style={styles.label}>Confirmar contrasena</Text>
          <TextInput
            style={styles.input}
            placeholder="Repite la contrasena"
            placeholderTextColor="#475569"
            value={confirmar}
            onChangeText={setConfirmar}
            secureTextEntry
          />

          <TouchableOpacity style={styles.boton} onPress={registrarse}>
            <Text style={styles.botonTexto}>Crear cuenta</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botonSecundario}
            onPress={() => router.back()}
          >
            <Text style={styles.botonSecundarioTexto}>
              Ya tienes cuenta? Inicia sesion
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

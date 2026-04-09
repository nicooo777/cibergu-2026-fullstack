import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const HABITOS = [
  { id: "1", nombre: "💧 Beber agua", puntos: 10 },
  { id: "2", nombre: "🏃 Actividad física", puntos: 15 },
  { id: "3", nombre: "😴 Dormir correctamente", puntos: 10 },
  { id: "4", nombre: "🥦 Comer fruta o verdura", puntos: 10 },
];

const getMascota = (completados: number) => {
  if (completados === 0)
    return {
      emoji: "😢",
      estado: "Triste",
      color: "#FF6B6B",
      mensaje: "Completa algún hábito para animarme...",
    };
  if (completados <= 2)
    return {
      emoji: "😊",
      estado: "Contento",
      color: "#FFD93D",
      mensaje: "¡Vas bien! Sigue así.",
    };
  return {
    emoji: "🥳",
    estado: "¡Feliz!",
    color: "#6BCB77",
    mensaje: "¡Increíble! ¡Lo has conseguido!",
  };
};

export default function HomeScreen() {
  const [completados, setCompletados] = useState<string[]>([]);
  const [puntosTotales, setPuntosTotales] = useState(0);
  const [fecha, setFecha] = useState("");

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const hoy = new Date().toDateString();
      setFecha(hoy);
      const savedFecha = await AsyncStorage.getItem("fecha");
      const savedCompletados = await AsyncStorage.getItem("completados");
      const savedPuntosTotales = await AsyncStorage.getItem("puntosTotales");
      if (savedPuntosTotales) setPuntosTotales(parseInt(savedPuntosTotales));
      if (savedFecha === hoy && savedCompletados) {
        setCompletados(JSON.parse(savedCompletados));
      } else {
        await AsyncStorage.setItem("fecha", hoy);
        await AsyncStorage.setItem("completados", JSON.stringify([]));
        setCompletados([]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const toggleHabito = async (id: string, puntos: number) => {
    let nuevos;
    let nuevosTotales = puntosTotales;
    if (completados.includes(id)) {
      nuevos = completados.filter((h) => h !== id);
      nuevosTotales -= puntos;
    } else {
      nuevos = [...completados, id];
      nuevosTotales += puntos;
    }
    setCompletados(nuevos);
    setPuntosTotales(nuevosTotales);
    await AsyncStorage.setItem("completados", JSON.stringify(nuevos));
    await AsyncStorage.setItem("puntosTotales", nuevosTotales.toString());
    await AsyncStorage.setItem("fecha", new Date().toDateString());
  };

  const puntosDia = completados.reduce((total, id) => {
    const h = HABITOS.find((h) => h.id === id);
    return total + (h ? h.puntos : 0);
  }, 0);

  const mascota = getMascota(completados.length);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.titulo}>🌱 MascotaHábitos</Text>
        <Text style={styles.fecha}>{fecha}</Text>

        <View style={[styles.mascotaContainer, { borderColor: mascota.color }]}>
          <Text style={styles.mascotaEmoji}>{mascota.emoji}</Text>
          <Text style={[styles.mascotaEstado, { color: mascota.color }]}>
            {mascota.estado}
          </Text>
          <Text style={styles.mascotaMensaje}>{mascota.mensaje}</Text>
        </View>

        <View style={styles.puntosContainer}>
          <View style={styles.puntosBox}>
            <Text style={styles.puntosNumero}>{puntosDia}</Text>
            <Text style={styles.puntosLabel}>Puntos hoy</Text>
          </View>
          <View style={styles.separador} />
          <View style={styles.puntosBox}>
            <Text style={styles.puntosNumero}>{puntosTotales}</Text>
            <Text style={styles.puntosLabel}>Puntos totales</Text>
          </View>
        </View>

        <Text style={styles.seccionTitulo}>Hábitos de hoy</Text>
        {HABITOS.map((habito) => {
          const hecho = completados.includes(habito.id);
          return (
            <TouchableOpacity
              key={habito.id}
              style={[styles.habitoCard, hecho && styles.habitoHecho]}
              onPress={() => toggleHabito(habito.id, habito.puntos)}
            >
              <Text style={styles.check}>{hecho ? "✅" : "⬜"}</Text>
              <Text
                style={[styles.habitoNombre, hecho && styles.habitoNombreHecho]}
              >
                {habito.nombre}
              </Text>
              <Text style={styles.habitoPuntos}>+{habito.puntos} pts</Text>
            </TouchableOpacity>
          );
        })}

        <Text style={styles.progreso}>
          {completados.length}/{HABITOS.length} hábitos completados hoy
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F172A" },
  scroll: { padding: 20, paddingBottom: 40 },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#E2E8F0",
    textAlign: "center",
    marginBottom: 4,
  },
  fecha: {
    fontSize: 14,
    color: "#94A3B8",
    textAlign: "center",
    marginBottom: 24,
  },
  mascotaContainer: {
    backgroundColor: "#1E293B",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 2,
  },
  mascotaEmoji: { fontSize: 80, marginBottom: 8 },
  mascotaEstado: { fontSize: 22, fontWeight: "bold", marginBottom: 4 },
  mascotaMensaje: { fontSize: 14, color: "#94A3B8", textAlign: "center" },
  puntosContainer: {
    flexDirection: "row",
    backgroundColor: "#1E293B",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    alignItems: "center",
  },
  puntosBox: { flex: 1, alignItems: "center" },
  puntosNumero: { fontSize: 32, fontWeight: "bold", color: "#6366F1" },
  puntosLabel: { fontSize: 13, color: "#94A3B8", marginTop: 2 },
  separador: { width: 1, height: 40, backgroundColor: "#334155" },
  seccionTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E2E8F0",
    marginBottom: 12,
  },
  habitoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E293B",
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
  },
  habitoHecho: {
    backgroundColor: "#1a2e1a",
    borderColor: "#6BCB77",
    borderWidth: 1,
  },
  check: { fontSize: 22, marginRight: 12 },
  habitoNombre: { flex: 1, fontSize: 16, color: "#E2E8F0" },
  habitoNombreHecho: { color: "#6BCB77", textDecorationLine: "line-through" },
  habitoPuntos: { fontSize: 13, color: "#6366F1", fontWeight: "bold" },
  progreso: {
    textAlign: "center",
    color: "#94A3B8",
    marginTop: 16,
    fontSize: 14,
  },
});

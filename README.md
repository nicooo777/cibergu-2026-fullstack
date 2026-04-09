# Cibergu-2026-Fullstack

Proyecto: Mascota Saludable

## Integrantes
Lucia Romero Adalia

Nicolas Mitura 

David Monasterio 

Nicole Gonzalez

## Descripción

Una app móvil para ayudar a las personas a mantener hábitos saludables diarios. El usuario marca los hábitos que ha cumplido cada día y una mascota (un gato) cambia de estado según su constancia.


## Tecnologias usadas

React Native - framework para hacer apps móviles con JavaScript 

Expo - herramienta que simplifica el desarrollo con React Native, sin configuraciones complejas 

AsyncStorage - sistema de guardado de datos local en el móvil, los datos no se pierden al cerrar la app 

expo-notifications - librería para enviar notificaciones a horas concretas

## Uso

El usuario puede marcar 5 hábitos diarios: beber agua, actividad física, dormir bien, comer fruta o verdura, y tomar medicación. 

Puntos: Cada hábito suma puntos. Se muestra la puntuación del día y la puntuación total acumulada. Mascota gato: Tiene 6 estados distintos según cuántos hábitos se han completado, desde triste (0 hábitos) hasta perfecto (5 hábitos).Incluye una barra de progreso visual. 

Notificaciones: La app manda recordatorios automáticos a horas concretas del día para que el usuario no olvide sus hábitos ni su medicación. 

Persistencia de datos: Todo se guarda en el dispositivo. Si cierras la app y la vuelves a abrir, los datos siguen ahí. Cada día se resetean los hábitos pero los puntos totales se acumulan. Historial: Cada día que pasa queda guardado con sus hábitos completados y puntos obtenidos.

## License

[MIT](https://choosealicense.com/licenses/mit/)

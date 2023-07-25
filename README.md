# Lista de tareas con Node.js

![Lista de tareas](/images/task-list-node.png)

## Lista de tareas

Task List Node es una aplicación de línea de comandos que te permite gestionar una lista de tareas. Puedes agregar, completar y eliminar tareas, así como ver la lista actual de tareas pendientes y completadas.

## Funcionalidades

1. Agregar tarea

![Agregar tarea](/images/add-task.png)

Puedes agregar una nueva tarea a la lista ingresando su nombre e descripción. La tarea se asignará automáticamente un ID único y se marcará como pendiente.

2.  Completar tarea

![Completar tarea](/images/complete-task.png)

Puedes marcar una tarea como completada ingresando su número de identificación. Si la tarea ya está completada, recibirás una alerta indicando que la tarea ya se encuentra en estado "Completada".

3. Eliminar tarea

![Eliminar tarea](/images/delete-task.png)

Puedes eliminar una tarea de la lista ingresando su número de identificación. Si la tarea no existe en la lista, recibirás un mensaje de alerta informándote que la tarea no ha sido encontrada.

4. Ver lista de tareas

![Ver lista de tareas](/images/show-tasks.png)

Puedes ver la lista actual de tareas, junto con su estado (pendiente o completada), su identificación, nombre y descripción.



## Requisitos para usarla

- Node.js instalado en el sistema.
- Conexión a Internet para instalar las dependencias de la aplicación.

## Instalación

1. Clona este repositorio en tu máquina local:

https://github.com/tu-usuario/task-list-node.git


2. Accede al directorio del proyecto:

cd task-list-node


3. Instala las dependencias del proyecto utilizando npm:

npm install

## Uso de la app

Para ejecutar la aplicación, desde la línea de comandos, dentro del directorio del proyecto, utiliza el siguiente comando:

npm start

Sigue las instrucciones que aparecen en pantalla para interactuar con la aplicación y gestionar tu lista de tareas.

## Explicación del código

El código de esta aplicación está escrito en JavaScript utilizando Node.js. Se utiliza el módulo "readline" para interactuar con el usuario a través de la línea de comandos y "chalk" para dar formato y color al texto de la consola.

La lógica principal del programa se encuentra en las funciones `addTask()`, `completeTask()`, `deleteTask()`, `showTasks()`, y `showMenu()`, que se encargan de agregar, completar, eliminar y mostrar tareas, así como de mostrar el menú principal de la aplicación.

## Funciones de promesa

### ¿Qué sucedió al usar async y await?

Al utilizar `async` y `await`, se simplificó el manejo de tareas asíncronas en el código. El uso de `async` en una función permite utilizar el operador `await` para esperar la resolución de promesas antes de continuar con el siguiente bloque de código, lo que facilita la escritura de código asíncrono de manera más secuencial y legible.

### Diferencia al usar async/await y .then()

Mientras que `async/await` proporciona una forma más limpia y legible de manejar promesas, el uso de `.then()` para encadenar promesas puede conducir a una estructura de código más compleja y anidada, lo que se conoce como "callback hell". `async/await` ofrece un flujo de control más lineal y facilita la comprensión del código asíncrono.

## Contribución de la app

¡Tu contribución es bienvenida! Si deseas mejorar la aplicación, agregar nuevas funcionalidades, corregir errores o sugerir mejoras, por favor, sigue estos pasos:

1. Haz un fork de este repositorio.
2. Crea una nueva rama para tus cambios:
git checkout -b feature/nombre-de-la-funcionalidad

3. Realiza tus cambios y realiza commits descriptivos.
4. Envía tus cambios al repositorio remoto:
git push origin feature/nombre-de-la-funcionalidad
5. Crea un pull request en GitHub y describe tus cambios en detalle.

¡Gracias por contribuir a mejorar Task List Node! Juntos hacemos el código más útil y eficiente.

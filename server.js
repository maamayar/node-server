const http = require('http');
const readline = require("readline");
const chalk = require('chalk');

const port = 3000;
const host = "localhost";

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const tasks = [];
let taskId = 1;

function generateTaskId() {
    return taskId++;
}

function findTaskById(taskId) {
    return tasks.find(task => task.id === taskId);
}

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/tasks") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(tasks));
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Recurso no encontrado");
  }
});
server.listen(port, host, () => {
    console.log(`Servidor iniciado en http://${host}:${port}`);
});

const questionAsync = (question) => {
  return new Promise((resolve) => {
    readlineInterface.question(question, resolve);
  });
};

const addTask = () => {
  return new Promise(async (resolve) => {
    const indicator = await questionAsync('Ingrese el nombre de la tarea: ');
    const description = await questionAsync('Ingrese la descripción de la tarea: ');

    const task = {
      id: generateTaskId(),
      indicator,
      description,
      completed: false,
    };

    tasks.push(task);
    console.log(chalk.green('Tarea agregada correctamente ✅'));
    console.log(`${task.id}. Título: ${task.indicator} Descripción: ${task.description}`);
    resolve();
    showTasks();
  });
};

const deleteTask = async () => {
    if (tasks.length === 0) {
      console.log(chalk.yellow('💬 No hay tareas para eliminar 💬'));
      return;
    }

    showTasks();

    const index = await questionAsync('Ingrese el número de la tarea que desea eliminar: ');
    const taskId = parseInt(index);
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
      console.log(chalk.red('❗ Tarea no encontrada. ❗'));
      return;
    }

    tasks.splice(taskIndex, 1);
    console.log(chalk.green('🗑️ Tarea eliminada correctamente 🗑️'));
  };

const completeTask = async () => {
    if (tasks.length === 0) {
      console.log(chalk.yellow('💬 No hay tareas para marcar como completadas 💬'));
      resolve();
      return;
    }

    showTasks();

    const id = await questionAsync('Ingrese el número de la tarea que desea marcar como completada: ');
    const taskId = parseInt(id);
    const task = findTaskById(taskId);

    if (!task) {
      console.log(chalk.red('❗ Tarea no encontrada. ❗'));
      return;
    }

    if (task.completed) {
      console.log(chalk.yellow('📢 Esta tarea ya está completada 📢'));
    } else {
      task.completed = true;
      console.log(chalk.green('Tarea marcada como completada ✅ .'));
    }
  };

const showTasks = () => {
  if (tasks.length === 0) {
    console.log(chalk.yellow('💬 No hay tareas para mostrar 💬'));
  } else {
    console.log("Task List: ");
    tasks.forEach((task, index) => {
      console.log(
        `[${index}] Indicador: ${task.indicator} | Descripción: ${
          task.description
        } | Completada: ${task.completed ? "Sí" : "No"}`
      );
    });
  }
};

const showMenu = async () => {
  console.log("\n--- MENU ---");
  console.log("1. Agregar tarea");
  console.log("2. Eliminar tarea");
  console.log("3. Marcar tarea como completada");
  console.log("4. Mostrar lista de tareas");
  console.log("5. Salir");

  const option = await questionAsync("\nSeleccione una opción: ");
  switch (option) {
    case "1":
      await addTask();
      break;
    case "2":
      await deleteTask();
      break;
    case "3":
      await completeTask();
      break;
    case "4":
      showTasks();
      break;
    case "5":
      readlineInterface.close();
      process.exit();
      break;
    default:
      console.log(
         " 🚨 Opción inválida 🚨 Solo puede ingresar las opciones del menú: 1, 2, 3, 4, 5"
      );
      break;
  }

  showMenu();
  };

console.log("🪄✨ Bienvenid@ a tu lista de tareas 🪄✨");

showMenu();
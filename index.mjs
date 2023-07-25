import readline from "readline";
import chalk from "chalk";

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const tasks = [];
let taskId = 1;

function generateTaskId() {
  return taskId++;
}

function findTaskById(id) {
  return tasks.find(task => task.id === id);
}

function displayMenu() {
  return new Promise((resolve, reject) => {
    console.log(chalk.yellow('\n=== Menú 🔍 Lista de Tareas ==='));
    console.log('1. Agregar tarea 📌');
    console.log('2. Completar tarea ✅');
    console.log('3. Eliminar tarea 🚫');
    console.log('4. Ver lista de tareas 👀');
    console.log('5. Salir 👋');

    readlineInterface.question('Selecciona un número del menú 🕹️ ', (option) => {
      resolve(option);
    });
  });
}

async function addTask() {
  const indicator = await new Promise(resolve => {
    readlineInterface.question('Ingrese el nombre de la tarea: ', resolve);
  });

  const description = await new Promise(resolve => {
    readlineInterface.question('Ingrese la descripción de la tarea: ', resolve);
  });

  const task = {
    id: generateTaskId(),
    indicator,
    description,
    completed: false,
  };

  tasks.push(task);
  console.log(chalk.green('Tarea agregada correctamente ✅'));
  console.log(`${task.id}. Título: ${task.indicator} Descripción: ${task.description}`);
}

async function deleteTask() {
  if (tasks.length === 0) {
    console.log(chalk.yellow('💬 No hay tareas para eliminar 💬'));
    return;
  }

  showTasks();

  const index = await new Promise(resolve => {
    readlineInterface.question('Ingrese el número de la tarea que desea eliminar: ', resolve);
  });

  const taskId = parseInt(index);
  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex === -1) {
    console.log(chalk.red('❗ Tarea no encontrada. ❗'));
    await deleteTask();
    return;
  }

  tasks.splice(taskIndex, 1);
  console.log(chalk.green('🗑️ Tarea eliminada correctamente 🗑️'));
}

async function completeTask() {
  if (tasks.length === 0) {
    console.log(chalk.yellow('💬 No hay tareas para marcar como completadas 💬'));
    return;
  }

  showTasks();

  const id = await new Promise(resolve => {
    readlineInterface.question('Ingrese el número de la tarea que desea marcar como completada: ', resolve);
  });

  const taskId = parseInt(id);
  const task = findTaskById(taskId);

  if (!task) {
    console.log(chalk.red('❗ Tarea no encontrada. ❗'));
    await completeTask();
    return;
  }

  if (task.completed) {
    console.log(chalk.yellow('📢 Esta tarea ya está completada 📢'));
  } else {
    task.completed = true;
    console.log(chalk.green('Tarea marcada como completada ✅ .'));
  }
}

function showTasks() {
  console.log(chalk.blue('Lista de tareas:'));
  tasks.forEach((task) => {
    const status = task.completed ? chalk.green('✅ Completada') : chalk.red('⏳ Pendiente');
    console.log(`${task.id}. ${status} ${task.indicator} - ${task.description}`);
  });
}

async function runTaskManager() {
  console.log(chalk.bold.cyan('🪄✨ Bienvenid@ a tu lista de tareas 🪄✨'));
  let option;

  do {
    option = await displayMenu();

    switch (option) {
      case '1':
        await addTask();
        break;
      case '2':
        await completeTask();
        break;
      case '3':
        await deleteTask();
        break;
      case '4':
        showTasks();
        break;
      case '5':
        console.log(chalk.yellow('👋 ¡Hasta pronto! 👋'));
        break;
      default:
        console.log(chalk.red('🚨 Opción inválida 🚨 Solo puede ingresar las opciones del menú: 1, 2, 3, 4, 5'));
        break;
    }
  } while (option !== '5');

  readlineInterface.close();
}

runTaskManager();

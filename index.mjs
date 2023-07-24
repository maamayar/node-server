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

function addTask() {
  readlineInterface.question('Ingrese el nombre de la tarea: ', (indicator) => {
    readlineInterface.question('Ingrese la descripción de la tarea: ', (description) => {
      const task = {
        id: generateTaskId(),
        indicator,
        description,
        completed: false,
      };
      tasks.push(task);
      console.log(chalk.green('Tarea agregada correctamente'));
      console.log(`${task.id}. Título: ${task.indicator} Descripción: ${task.description}`);
      showMenu();
    });
  });
}

function deleteTask() {
  if (tasks.length === 0) {
    console.log(chalk.yellow('No hay tareas para eliminar.'));
    showMenu();
    return;
  }

  showTasks();

  readlineInterface.question('Ingrese el número de la tarea que desea eliminar: ', (index) => {
    const taskId = parseInt(index);
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
      console.log(chalk.red('❗ Tarea no encontrada. ❗'));
      deleteTask();
      return;
    }

    tasks.splice(taskIndex, 1);
    console.log(chalk.green('Tarea eliminada correctamente 🚩 '));
    showMenu();
  });
}

function completeTask() {
  if (tasks.length === 0) {
    console.log(chalk.yellow('No hay tareas para marcar como completadas.'));
    showMenu();
    return;
  }

  readlineInterface.question('Ingrese el número de la tarea que desea marcar como completada: ', (id) => {
    const taskId = parseInt(id);
    const task = tasks.find(task => task.id === taskId);

    if (!task) {
      console.log(chalk.red('❗ Tarea no encontrada. ❗'));
      completeTask();
      return;
    }

    task.completed = true;
    console.log(chalk.green('Tarea marcada como completada.'));
    showMenu();
  });
}

function showTasks() {
  console.log(chalk.blue('Lista de tareas:'));
  tasks.forEach((task) => {
    const status = task.completed ? chalk.green('✅ Completada') : chalk.red('⏳ Pendiente');
    console.log(`${task.id}. ${status} ${task.indicator} - ${task.description}`);
  });
}

function showMenu() {
  console.log(chalk.yellow('\n=== Menú 🔍 Lista de Tareas ==='));
  console.log('1. Agregar tarea 📌');
  console.log('2. Completar tarea ✅');
  console.log('3. Eliminar tarea 🚫');
  console.log('4. Ver lista de tareas 👀');
  console.log('5. Salir 👋');

  readlineInterface.question('Selecciona un número del menú 🕹️ ', (option) => {
    switch (option) {
      case '1':
        addTask();
        break;
      case '2':
        completeTask();
        break;
      case '3':
        deleteTask();
        break;
      case '4':
        showTasks();
        break;
      case '5':
        console.log(chalk.yellow('👋 ¡Hasta pronto! 👋'));
        readlineInterface.close();
        break;
      default:
        console.log(chalk.red('🚨 Opción inválida 🚨 Solo puede ingresar las opciones del menú: 1, 2, 3, 4, 5,'));
        showMenu();
        break;
    }
  });
}

console.log(chalk.bold.cyan('🪄✨ Bienvenid@ a tu lista de tareas 🪄✨'));
showMenu();

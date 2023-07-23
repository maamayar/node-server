import readline from "readline";
import chalk from "chalk";

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const tasks = [];
let taskId = 1;

function addTask() {
  readlineInterface.question('Ingrese el nombre de la tarea: ', (indicator) => {
    readlineInterface.question('Ingrese la descripción de la tarea: ', (description) => {
      readlineInterface.question('🧐  ¿La tarea está completada? 🧐 (si/no): ', (completed) => {
        const task = {
          id: taskId,
          indicator,
          description,
          completed: completed.toLowerCase() === 's' ? true : false,
        };
        tasks.push(task);
        console.log(chalk.green('Tarea agregada correctamente'));
        console.log (`${task.id}. ${task.indicator} - ${task.description}`); 
         showMenu();
      });
    });
  });
}

function editTask() {
    if (tasks.length === 0) {
        console.log(chalk.yellow('No existen tareas para editar.'));
        showMenu();
        return;
      }
    
      showTasks();
    
      readlineInterface.question('Ingrese el número de la tarea que desea modificar: ', (index) => {
        const taskIndex = parseInt(index) - 1;
        if (taskIndex < 0 || taskIndex >= tasks.length || isNaN(taskIndex)) {
          console.log(chalk.red('Número de tarea inválido. '));
          showMenu();
          return;
        }

        readlineInterface.question('Ingrese la nueva descripción de la tarea: ', (description) => {
          tasks[taskIndex].description = description;
          console.log(chalk.green('Tarea modificada correctamente. 👍'));
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
        const taskIndex = parseInt(index) - 1;
        if (taskIndex < 0 || taskIndex >= tasks.length || isNaN(taskIndex)) {
          console.log(chalk.red('Número de tarea inválido.'));
          deleteTask();
          return;
        }
    
        tasks.splice(taskIndex, 1);
        console.log(chalk.green('Tarea eliminada correctamente. '));
        showMenu();
      });
}

function completeTask() {
    if (tasks.length === 0) {
        console.log(chalk.yellow('No hay tareas para marcar como completadas.'));
        showMenu();
        return;
      }
    
      showTasks();
    
      readlineInterface.question('Ingrese el número de la tarea que desea marcar como completada: ', (index) => {
        const taskIndex = parseInt(index) - 1;
        if (taskIndex < 0 || taskIndex >= tasks.length || isNaN(taskIndex)) {
          console.log(chalk.red('❗ Número de tarea inválido. ❗'));
          completeTask();
          return;
        }
    
        tasks[taskIndex].completed = true;
        console.log(chalk.green('Tarea marcada como completada.'));
        showMenu();
      });
}

function showTasks() {
  console.log(chalk.blue('Lista de tareas:'));
  tasks.forEach((task) => {
    const status = task.completed ? chalk.green('✅ Completada') : chalk.red('❌ Pendiente');
  console.log(`${task.id}. ${status} ${task.indicator} - ${task.description}`);
  });
  showMenu();
}

function showMenu() {
  console.log(chalk.yellow('\n=== Menú 🔍 Lista de Tareas ==='));
  console.log('1. Agregar tarea 📌');
  console.log('2. Completar tarea ✅');
  console.log('3. Eliminar tarea 🚫');
  console.log('4. Ver lista de tareas 👀');
  console.log('5. Salir 👋');

  readlineInterface.question(' Selecciona un número del menú 🕹️ ', (option) => {
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
        console.log(chalk.red('🚨 Opción inválida 🚨'));
        showMenu();
    }
  });
}


console.log(chalk.cyan('🪄✨ Bienvenid@ tu lista de tareas  🪄✨'));
showMenu();

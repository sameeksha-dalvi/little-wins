import { createTodo } from "./todoManager";
import { toggleCompletedUI } from "./todoUI";

const projects = [];

let currentProjectId = null;
let defaultProjectId = null;

function createProject(id, name) {
  const todos = [];

  const getId = () => id;
  const getName = () => name;
  const getTodos = () => todos;

  const addTodo = (todo) => {
    todos.push(todo);
  };

  const findTodoById = (todoId) => {
    return todos.find(todo => todo.getTodoId() === todoId);
  };

  const deleteTodoById = (todoId) => {
    const index = todos.findIndex(todo => todo.getTodoId() === todoId);
    if (index === -1) return false;
    todos.splice(index, 1);
    return true;
  };



  const toggleTodoCompleted = (todoId) => {
    const todo = findTodoById(todoId);
    if (!todo) return;
    todo.toggleCompleted();
    return todo.isCompleted();
  };

  const updateTodo = (todoId, newTitle, newDesc, newDate, newPriority, newNotes) => {
    const todo = findTodoById(todoId);
    if (!todo) return;

    todo.setTitle(newTitle);
    todo.setDesc(newDesc);
    todo.setDueDate(newDate);
    todo.setPriority(newPriority);
    todo.setNotes(newNotes);
    return todo;
  };

  return {
    getId,
    getName,
    getTodos,
    addTodo,
    findTodoById,
    deleteTodoById,
    toggleTodoCompleted,
    updateTodo
  };
}


function addProject(project) {
  projects.push(project);
  saveToLocalStorage();
}

function initDefaultProject() {
  if (projects.length === 0) {
    const defaultProject = createProject(crypto.randomUUID(), "Default");
    addProject(defaultProject);
    currentProjectId = defaultProject.getId();
    defaultProjectId = defaultProject.getId();
    saveToLocalStorage();
  }
}

function getCurrentProject() {
  return projects.find(p => p.getId() === currentProjectId);
}

function setCurrentProject(projectId) {
  currentProjectId = projectId;
}


function addTodo(todo) {
  const project = getCurrentProject();
  if (!project) return;
  project.addTodo(todo);
  saveToLocalStorage();
}

function findTodoById(todoId) {
  const project = getCurrentProject();
  if (!project) return;
  return project.findTodoById(todoId);
}

function deleteTodoById(todoId) {
  const project = getCurrentProject();
  if (!project) return false;
  const result = project.deleteTodoById(todoId);
  saveToLocalStorage();
  return result;

}

function toggleTodoCompleted(todoId) {
  const project = getCurrentProject();
  if (!project) return;
  const result = project.toggleTodoCompleted(todoId)
  saveToLocalStorage();
  return result;

}

function updateTodo(todoId, newTitle, newDesc, newDate, newPriority, newNotes) {
  const project = getCurrentProject();
  if (!project) return;
  saveToLocalStorage();
  return project.updateTodo(todoId, newTitle, newDesc, newDate, newPriority, newNotes);

}

function getTodosOfCurrentProject() {
  const project = getCurrentProject();
  if (!project) return [];
  return project.getTodos();
}

function deleteProjectById(projectId) {
  const index = projects.findIndex(p => p.getId() === projectId);
  if (index === -1) return false;
  projects.splice(index, 1);
  saveToLocalStorage();
  return true;
};

function saveToLocalStorage() {
  const data = projects.map(project => ({
    id: project.getId(),
    name: project.getName(),
    todos: project.getTodos().map(todo => ({
      id: todo.getTodoId(),
      title: todo.getTitle(),
      desc: todo.getDesc(),
      dueDate: todo.getDueDate(),
      priority: todo.getPriority(),
      notes: todo.getNotes(),
      completed: todo.isCompleted()
    }))
  }));
  localStorage.setItem("projectsData", JSON.stringify(data));
}

function loadFromLocalStorage() {
  const data = localStorage.getItem("projectsData");
  console.log("data " + data);
  if (!data) return false;

  const parsed = JSON.parse(data);
  projects.length = 0; // clear existing

  parsed.forEach((projectData, index) => {
    const project = createProject(projectData.id, projectData.name);

    projectData.todos.forEach(todoData => {
      const todo = createTodo(
        todoData.id,
        todoData.title,
        todoData.desc,
        todoData.dueDate,
        todoData.priority,
        todoData.notes
      );
      if (todoData.completed) {
        todo.toggleCompleted();
        console.log(" loadFromLocalStorage line 181 : "+todo.getTodoId())
        toggleCompletedUI(todo.getTodoId(), "complete");
      }
      project.addTodo(todo);
    });

    projects.push(project);

    if (index === 0) {
      defaultProjectId = project.getId();
      currentProjectId = project.getId();
    }
  });

  return true;
}

function getAllProjects() {
  return projects;
}


export {
  createProject,
  addProject,
  initDefaultProject,
  setCurrentProject,
  getCurrentProject,
  getTodosOfCurrentProject,
  addTodo,
  findTodoById,
  deleteTodoById,
  toggleTodoCompleted,
  updateTodo,
  defaultProjectId,
  loadFromLocalStorage,
  getAllProjects,
  deleteProjectById
};
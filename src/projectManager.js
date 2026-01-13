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
}

function initDefaultProject() {
  if (projects.length === 0) {
    const defaultProject = createProject(crypto.randomUUID(), "Default");
    addProject(defaultProject);
    currentProjectId = defaultProject.getId();
    defaultProjectId = defaultProject.getId();
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
}

function findTodoById(todoId) {
  const project = getCurrentProject();
  if (!project) return;
  return project.findTodoById(todoId);
}

function deleteTodoById(todoId) {
  const project = getCurrentProject();
  if (!project) return false;
  return project.deleteTodoById(todoId);
}

function toggleTodoCompleted(todoId) {
  const project = getCurrentProject();
  if (!project) return;
  return project.toggleTodoCompleted(todoId);
}

function updateTodo(todoId, newTitle, newDesc, newDate, newPriority, newNotes) {
  const project = getCurrentProject();
  if (!project) return;
  return project.updateTodo(todoId, newTitle, newDesc, newDate, newPriority, newNotes);
}

function getTodosOfCurrentProject() {
  const project = getCurrentProject();
  if (!project) return [];
  return project.getTodos();
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
  defaultProjectId
};
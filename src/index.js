import "./styles.css";
import { createTodo } from "./todoManager";
import { showTodoCard, toggleCompletedUI, removeTodoCardUI, updateTodoDataUI } from "./todoUI";
import { initDefaultProject, createProject, addProject,getCurrentProject , setCurrentProject, addTodo, findTodoById, toggleTodoCompleted, deleteTodoById, updateTodo , getTodosOfCurrentProject} from "./projectManager";
import { addProjectToUI, switchProjectUI } from "./projectUI";

initDefaultProject();

const defaultProject = getCurrentProject();
addProjectToUI(defaultProject, (clickedProject) => {
  setCurrentProject(clickedProject.getId());
  switchProjectUI(clickedProject);
  loadTodosOfCurrentProject();
});
switchProjectUI(defaultProject);

const addTodoBtn = document.querySelector("#add-todo-btn");
const todoModal = document.querySelector("#add-todo-modal");
const closetodoModal = document.querySelector("#close-add-todo");
const todoTitle = document.querySelector("#todo-title");
const todoDesc = document.querySelector("#todo-desc");
const todoDueDate = document.querySelector("#todo-due-date");
const todoPriority = document.querySelector("#todo-priority");
const todoNotes = document.querySelector("#todo-notes");
const dialogTitle = document.querySelector("#dialog-title");
const saveTodoBtn = document.querySelector("#save-todo-btn");
const addProjectBtn = document.querySelector("#add-project-btn");
const projectModal = document.querySelector("#add-project-modal");
const closeProjectModal = document.querySelector("#close-add-project");

let currentEditTodoId = null;

let isTryingToSave = false;

addTodoBtn.addEventListener('click', function () {
    dialogTitle.textContent = "Add New Todo";
    saveTodoBtn.textContent = "Save Todo";
    todoModal.showModal();
});

closetodoModal.addEventListener('click', function () {
    resetFormData();
    todoModal.close();
});


saveTodoBtn.addEventListener("click", function (event) {

    console.log(saveTodoBtn.textContent.trim().toLowerCase());
    isTryingToSave = true;

    if (saveTodoBtn.textContent.trim().toLowerCase() === "save todo") {
        console.log("Save Todo!!!");


        if (todoTitle.value === "" || todoDueDate.value === "") {
            if (todoTitle.value === "") todoTitle.setCustomValidity("Please enter todo title!");
            if (todoDueDate.value === "") todoDueDate.setCustomValidity("Please enter due date!");
            todoTitle.reportValidity();
            todoDueDate.reportValidity();
            return;
        }

        const todoId = crypto.randomUUID();

        const todo = createTodo(
            todoId,
            todoTitle.value,
            todoDesc.value,
            todoDueDate.value,
            todoPriority.value,
            todoNotes.value
        );

        addTodo(todo);
        showTodoCard(todo);

    }

    if (saveTodoBtn.textContent.trim().toLowerCase() === "update todo") {

        const updatedTodo = updateTodo(
            currentEditTodoId,
            todoTitle.value,
            todoDesc.value,
            todoDueDate.value,
            todoPriority.value,
            todoNotes.value
        );

        updateTodoDataUI(currentEditTodoId, updatedTodo);

    }

    resetFormData();

    event.preventDefault();
    todoModal.close();

    isTryingToSave = false;


});

todoTitle.addEventListener("input", function () {
    if (!isTryingToSave) { return };
    todoTitle.setCustomValidity("");

    if (todoTitle.validity.valueMissing) {
        todoTitle.setCustomValidity("Please enter todo title!");
    }

    todoTitle.reportValidity();

});


todoDueDate.addEventListener("input", function () {
    if (!isTryingToSave) { return };
    todoDueDate.setCustomValidity("");

    if (todoDueDate.validity.valueMissing) {
        todoDueDate.setCustomValidity("Please enter todo due date!");
    }

    todoDueDate.reportValidity();

});

function resetFormData() {
    todoTitle.value = "";
    todoDesc.value = "";
    todoDueDate.value = "";
    todoPriority.value = "Low";
    todoNotes.value = "";
}

const todoCardClick = document.querySelector('.todo-card-container');

todoCardClick.addEventListener('click', function (event) {

    if (event.target.tagName === "BUTTON") {

        const todoCard = event.target.closest('.todo-card');
        const todoId = todoCard.dataset.id;
        const todoData = findTodoById(todoId);

        console.log("todoData :" + todoData);

        if (event.target.classList.contains("edit-todo-btn")) {
            dialogTitle.textContent = "Edit Todo";
            saveTodoBtn.textContent = "Update Todo";

            todoTitle.value = todoData.getTitle();
            todoDesc.value = todoData.getDesc();
            todoDueDate.value = todoData.getDueDate();
            todoPriority.value = todoData.getPriority();
            todoNotes.value = todoData.getNotes();
            currentEditTodoId = todoId;
            todoModal.showModal();
        }


        if (event.target.classList.contains("complete-todo-btn")) {
            const updatedState = toggleTodoCompleted(todoId);
            const action = updatedState ? "complete" : "undo";
            toggleCompletedUI(todoId, action);
        }


        if (event.target.classList.contains("delete-todo-btn")) {
            const deleted = deleteTodoById(todoId);
            if (deleted) {
                removeTodoCardUI(todoId);
            }
        }
    }
});


addProjectBtn.addEventListener('click', function () {
    projectModal.showModal();
});


closeProjectModal.addEventListener('click', function () {
    projectModal.close();
});



const projectNameInput = document.querySelector("#project-name");
const saveProjectBtn = document.querySelector("#save-project-btn");
const projectListDiv = document.querySelector("#project-list");
const currentProjectHeader = document.querySelector("#current-project");
const todoProjectName = document.querySelector("#todo-project-name");

saveProjectBtn.addEventListener("click", function (e) {
    e.preventDefault();

    if (projectNameInput.value.trim() === "") {
        projectNameInput.setCustomValidity("Please enter project name");
        projectNameInput.reportValidity();
        return;
    }

    const projectId = crypto.randomUUID();
    const project = createProject(projectId, projectNameInput.value);

    addProject(project);
    setCurrentProject(projectId);

    addProjectToUI(project, (clickedProject) => {
        setCurrentProject(clickedProject.getId());
        switchProjectUI(clickedProject);
        loadTodosOfCurrentProject();
    });
    switchProjectUI(project);

    projectNameInput.value = "";
    projectModal.close();
});




function clearAllTodosUI() {
    document.querySelector(".todo-card-container").innerHTML = "";
}

function loadTodosOfCurrentProject() {
    clearAllTodosUI();
    const todos = getTodosOfCurrentProject();
    todos.forEach(todo => showTodoCard(todo));
}
import "./styles.css";
import { createTodo, addTodo, findTodoById, toggleTodoCompleted, deleteTodoById } from "./todoManager";
import { showTodoCard, toggleCompletedUI, removeTodoCardUI } from "./todoUI";


const addTodoBtn = document.querySelector("#add-todo-btn");
const todoModal = document.querySelector("#add-todo-modal");
const closetodoModal = document.querySelector("#close-add-todo");
const todoTitle = document.querySelector("#todo-title");
const todoDesc = document.querySelector("#todo-desc");
const todoDueDate = document.querySelector("#todo-due-date");
const todoPriority = document.querySelector("#todo-priority");
const todoNotes = document.querySelector("#todo-notes");

addTodoBtn.addEventListener('click', function () {
    todoModal.showModal();
});

closetodoModal.addEventListener('click', function () {
    resetFormData();
    todoModal.close();
    console.log("close modal clicked")
});



let isTryingToSave = false;

const saveTodoBtn = document.querySelector("#save-todo-btn");

saveTodoBtn.addEventListener("click", function (event) {

    isTryingToSave = true;

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

    console.log("todo id" + todo.getTodoId());
    addTodo(todo);
    showTodoCard(todo);
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

        if (event.target.classList.contains("edit-todo-btn")) {
            console.log("Edit button clicked!!!")
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
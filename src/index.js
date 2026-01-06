import "./styles.css";
import { createTodo } from "./todoManager";
import { showTodoCard } from "./todoUI";


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

    const todo = createTodo(
        todoTitle.value,
        todoDesc.value,
        todoDueDate.value,
        todoPriority.value,
        todoNotes.value
    );

    console.log("todo object" + todo.getTitle());

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
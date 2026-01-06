import "./styles.css";
import { createTodo } from "./todoManager";


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



todoTitle.addEventListener("input", function () {

    todoTitle.setCustomValidity("");

    if (todoTitle.validity.valueMissing) {
        todoTitle.setCustomValidity("Please enter todo title!");
    }

    todoTitle.reportValidity();

});


todoDueDate.addEventListener("input", function () {

    todoDueDate.setCustomValidity("");

    if (todoDueDate.validity.valueMissing) {
        todoDueDate.setCustomValidity("Please enter todo due date!");
    }

    todoDueDate.reportValidity();

});

const saveTodoBtn = document.querySelector("#save-todo-btn");

saveTodoBtn.addEventListener("click", function (event) {

    if (todoTitle.value == "" || todoDueDate.value == "") {
        return;
    }

    const todo = createTodo(
        todoTitle.value,
        todoDesc.value,
        todoDueDate.value,
        todoPriority.value,
        todoNotes.value
    );

    console.log(todo.getTitle());
    resetFormData();
    event.preventDefault();
    todoModal.close();


});

function resetFormData() {
    todoTitle.value = "";
    todoDesc.value = "";
    todoDueDate.value = "";
    todoPriority.value = "";
    todoNotes.value = "";
}
import "./styles.css";


const addTodoBtn = document.querySelector("#add-todo-btn");
const todoModal = document.querySelector("#add-todo-modal");
const closetodoModal = document.querySelector("#close-add-todo");

addTodoBtn.addEventListener('click', function () {
    todoModal.showModal();
});

closetodoModal.addEventListener('click', function () {
    todoModal.close();
    console.log("close modal clicked")
});

const todoTitle = document.querySelector("#todo-title");
const todoDueDate = document.querySelector("#todo-due-date");

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
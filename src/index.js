import "./styles.css";


const addTodoBtn = document.querySelector("#add-todo-btn");
const todoModal = document.querySelector("#add-todo-modal");
const closetodoModal = document.querySelector("#close-add-todo");

addTodoBtn.addEventListener('click', function () {
    todoModal.showModal();
});

closetodoModal.addEventListener('click',function(){
    todoModal.close();
})
import { format } from "date-fns";

function showTodoCard(todo) {

    const todoCardContainer = document.querySelector('.todo-card-container');

    const todoCardDiv = document.createElement('div');
    todoCardDiv.className = "todo-card " + todo.getPriority().toLowerCase();
    todoCardDiv.setAttribute('data-id', todo.getTodoId());



    const todoDataDiv = document.createElement('div');
    todoDataDiv.className = "todo-data-section";

    const todoButtonDiv = document.createElement('div');
    todoButtonDiv.className = "todo-btn-section";

    const todoViewBtn = document.createElement('button');
    todoViewBtn.className = "todo-btn edit-todo-btn";
    todoViewBtn.textContent = "View/Edit";

    const todoCompleteBtn = document.createElement('button');
    todoCompleteBtn.className = "todo-btn complete-todo-btn";
    todoCompleteBtn.textContent = "Complete";

    const todoDeleteBtn = document.createElement('button');
    todoDeleteBtn.className = "todo-btn delete-todo-btn";
    todoDeleteBtn.textContent = "Delete";

    const todoTitle = document.createElement('h2');
    todoTitle.className = "todo-mainText";
    todoTitle.textContent = todo.getTitle();

    const todoSubDiv = document.createElement('div');
    todoSubDiv.className = "todo-sub";

    const todoDueDate = document.createElement('h2');
    todoDueDate.className = "todo-subText";
    todoDueDate.textContent = "Due Date : " + format(todo.getDueDate(), "dd MMM yyyy");

    const todoPriority = document.createElement('h2');

    todoPriority.className = "todo-subText";
    todoPriority.textContent = "Priority : " + todo.getPriority();

    if (todo.isCompleted()) {
        todoCardDiv.classList.add('todo-card-completed');
        todoTitle.classList.add('strike-todo');
        todoCompleteBtn.textContent = "Undo";
        todoViewBtn.disabled = true;
        todoViewBtn.classList.add('disabled-btn');
    }
    
    todoButtonDiv.appendChild(todoViewBtn);
    todoButtonDiv.appendChild(todoCompleteBtn);
    todoButtonDiv.appendChild(todoDeleteBtn);


    todoSubDiv.appendChild(todoDueDate);
    todoSubDiv.appendChild(todoPriority);

    todoDataDiv.appendChild(todoTitle);
    todoDataDiv.appendChild(todoSubDiv);

    todoCardDiv.appendChild(todoDataDiv);
    todoCardDiv.appendChild(todoButtonDiv);
    todoCardContainer.appendChild(todoCardDiv);

    console.log("showTodoCard : " + todo.getTitle())

}

function toggleCompletedUI(todoId, action) {

    const todoCard = document.querySelector(`.todo-card[data-id="${todoId}"]`);
    if (!todoCard) return;
    if (action === "complete") {
        todoCard.classList.add('todo-card-completed');
        todoCard.firstChild.firstChild.classList.add('strike-todo');
        todoCard.lastChild.children[1].textContent = "Undo";
        todoCard.lastChild.children[0].disabled = true;
        todoCard.lastChild.children[0].classList.add('disabled-btn');
    }

    if (action === "undo") {
        todoCard.lastChild.children[1].textContent = "Complete";
        todoCard.classList.remove('todo-card-completed');
        todoCard.firstChild.firstChild.classList.remove('strike-todo');
        todoCard.lastChild.children[0].disabled = false;
        todoCard.lastChild.children[0].classList.remove('disabled-btn');
    }


}


function removeTodoCardUI(todoId) {

    const todoCard = document.querySelector(`.todo-card[data-id="${todoId}"]`);
    todoCard.remove();

}

function updateTodoDataUI(todoId, todo) {
    const todoCard = document.querySelector(`.todo-card[data-id="${todoId}"]`);
    todoCard.firstChild.firstChild.textContent = todo.getTitle();
    todoCard.firstChild.lastChild.children[0].textContent = "Due Date : " + format(todo.getDueDate(), "dd MMM yyyy");
    todoCard.firstChild.lastChild.children[1].textContent = "Priority : " + todo.getPriority();
    todoCard.classList.remove('low', 'medium', 'high');
    todoCard.classList.add(todo.getPriority().toLowerCase());
}

export { showTodoCard, toggleCompletedUI, removeTodoCardUI, updateTodoDataUI };
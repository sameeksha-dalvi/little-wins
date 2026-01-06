
function showTodoCard(todo) {
    console.log("showTodoCard called ");
    const todoSection = document.querySelector('.todos-section');

    const todoCardDiv = document.createElement('div');
    todoCardDiv.className = "todo-card";

    const todoDataDiv = document.createElement('div');
    todoDataDiv.className = "todo-data-section";

    const todoButtonDiv = document.createElement('div');
    todoButtonDiv.className = "todo-btn-section";

    const todoViewBtn = document.createElement('button');
    todoViewBtn.className = "todo-btn";
    todoViewBtn.textContent = "View/Edit";

    const todoCompleteBtn = document.createElement('button');
    todoCompleteBtn.className = "todo-btn";
    todoCompleteBtn.textContent = "Complete";

    const todoDeleteBtn = document.createElement('button');
    todoDeleteBtn.className = "todo-btn";
    todoDeleteBtn.textContent = "Delete";

    todoButtonDiv.appendChild(todoViewBtn);
    todoButtonDiv.appendChild(todoCompleteBtn);
    todoButtonDiv.appendChild(todoDeleteBtn);

    const todoTitle = document.createElement('h2');
    todoTitle.className = "todo-mainText";
    todoTitle.textContent = todo.getTitle();

    const todoSubDiv = document.createElement('div');
    todoSubDiv.className = "todo-sub";

    const todoDueDate = document.createElement('h2');
    todoDueDate.className = "todo-subText";
    todoDueDate.textContent = "Due Date : " + todo.getDueDate();

    const todoPriority = document.createElement('h2');

    todoPriority.className = "todo-subText";
    todoPriority.textContent = "Priority : " + todo.getPriority();


    todoSubDiv.appendChild(todoDueDate);
    todoSubDiv.appendChild(todoPriority);

    todoDataDiv.appendChild(todoTitle);
    todoDataDiv.appendChild(todoSubDiv);

    todoCardDiv.appendChild(todoDataDiv);
    todoCardDiv.appendChild(todoButtonDiv);
    todoSection.appendChild(todoCardDiv);

    console.log("showTodoCard : " + todo.getTitle())

}

export { showTodoCard };
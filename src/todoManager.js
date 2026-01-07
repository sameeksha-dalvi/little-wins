const todos = [];


function createTodo(id, title, desc, dueDate , priority, notes) {
    const getTodoId = () => id;
    const getTitle = () => title;
    const getDesc = () => desc;
    const getDueDate = () => dueDate;
    const getPriority = () => priority;
    const getNotes = () => notes;
    return { getTodoId, getTitle, getDesc,  getDueDate , getPriority, getNotes};
}

function addTodo(todo){
    todos.push(todo);
}

function findTodoById(todoId){
    return  todos.find((todo) => todo.getTodoId() === todoId);
}

export { createTodo, addTodo, findTodoById };
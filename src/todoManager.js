const todos = [];


function createTodo(id, title, desc, dueDate, priority, notes) {
    let completed = false;
    const getTodoId = () => id;
    const getTitle = () => title;
    const getDesc = () => desc;
    const getDueDate = () => dueDate;
    const getPriority = () => priority;
    const getNotes = () => notes;
    const isCompleted = () => completed;

    const toggleCompleted = () => {
        completed = !completed;
    };

    return { getTodoId, getTitle, getDesc, getDueDate, getPriority, getNotes, isCompleted, toggleCompleted};
}

function addTodo(todo) {
    todos.push(todo);
}

function findTodoById(todoId) {
    return todos.find((todo) => todo.getTodoId() === todoId);
}


function toggleTodoCompleted(todoId) {
    const todo = findTodoById(todoId);
    if (!todo) return;
    todo.toggleCompleted();
    return todo.isCompleted();
}

export { createTodo, addTodo, findTodoById, toggleTodoCompleted };
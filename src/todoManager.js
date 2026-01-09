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

    const setTitle = (newTitle) => {
        title = newTitle;
    };

    const setDesc = (newDesc) => {
        desc = newDesc;
    };

    const setDueDate = (newDate) => {
        dueDate = newDate;
    };

    const setPriority = (newPriority) => {
        priority = newPriority;
    };

    const setNotes = (newNotes) => {
        notes = newNotes;
    };


    const toggleCompleted = () => {
        completed = !completed;
    };

    return {
        getTodoId,
        getTitle,
        getDesc,
        getDueDate,
        getPriority,
        getNotes,
        isCompleted,
        toggleCompleted,
        setTitle,
        setDesc,
        setDueDate,
        setPriority,
        setNotes
    };
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


function deleteTodoById(todoId) {
    const index = todos.findIndex(todo => todo.getTodoId() === todoId);
    if (index === -1) {
        return false;
    }
    todos.splice(index, 1);
    return true;
}

function updateTodo(todoId, newTitle, newDesc, newDate, newPriority, newNotes) {
    const todo = findTodoById(todoId);
    if (!todo) return;

    todo.setTitle(newTitle);
    todo.setDesc(newDesc);
    todo.setDueDate(newDate);
    todo.setPriority(newPriority);
    todo.setNotes(newNotes);
    return todo;
}

export { createTodo, addTodo, findTodoById, toggleTodoCompleted, deleteTodoById, updateTodo };
function createTodo(id, title, desc, dueDate , priority, notes) {
    const getTodoId = () => id;
    const getTitle = () => title;
    const getDesc = () => desc;
    const getDueDate = () => dueDate;
    const getPriority = () => priority;
    const getNotes = () => notes;
    return { getTodoId, getTitle, getDesc,  getDueDate , getPriority, getNotes};
}



export { createTodo };
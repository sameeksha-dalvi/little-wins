function createTodo(title, desc, dueDate , priority, notes) {
    const getTitle = () => title;
    const getDesc = () => desc;
    const getDueDate = () => dueDate;
    const getPriority = () => priority;
    const getNotes = () => notes;
    return { getTitle, getDesc,  getDueDate , getPriority, getNotes};
}



export { createTodo };
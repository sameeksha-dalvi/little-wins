
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



export { createTodo };
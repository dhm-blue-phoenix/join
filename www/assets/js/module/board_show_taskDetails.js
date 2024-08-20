const ID = [
    'TITLE',
    'DESCRIPTION_HEADLINE',
    'DESCRIPTION_CONTENT',
    'DATE',
    'BTN_PRIO',
    'PERSONS',
    'SUBTASKS'
];

export function initShowTaskDetails(TASK_DATA) {
    try {
        ID.forEach((ID, VALUE) => {
            document.getElementById(ID).textContent = TASK_DATA[VALUE];         
        });
    } catch (err) {
        console.error(err);
    }
};
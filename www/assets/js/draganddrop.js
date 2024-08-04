document.addEventListener('DOMContentLoaded', (event) => {
    const taskCard = document.getElementById('taskcardtoDrop');
    const containers = document.querySelectorAll('.taskList');
    const moveTaskButton = document.getElementById('moveTaskButton');
    const taskCategorySelect = document.getElementById('taskCategorySelect');

    function updateDragAndDrop() {
        const isMobileView = window.innerWidth <= 1100;

        if (isMobileView) {
            // Remove event listeners for drag and drop
            taskCard.removeAttribute('draggable');
            taskCard.removeEventListener('dragstart', dragStart);
            taskCard.removeEventListener('dragend', dragEnd);

            containers.forEach(container => {
                container.removeEventListener('dragover', dragOver);
                container.removeEventListener('dragenter', dragEnter);
                container.removeEventListener('dragleave', dragLeave);
                container.removeEventListener('drop', dragDrop);
            });
        } else {
            // Add event listeners for drag and drop
            taskCard.setAttribute('draggable', 'true');
            taskCard.addEventListener('dragstart', dragStart);
            taskCard.addEventListener('dragend', dragEnd);

            containers.forEach(container => {
                container.addEventListener('dragover', dragOver);
                container.addEventListener('dragenter', dragEnter);
                container.addEventListener('dragleave', dragLeave);
                container.addEventListener('drop', dragDrop);
            });
        }
    }

    // Initial check
    updateDragAndDrop();

    // Update on window resize
    window.addEventListener('resize', updateDragAndDrop);

    moveTaskButton.addEventListener('click', (e) => {
        e.stopPropagation();  // Prevent opening the popup
        const selectedCategory = taskCategorySelect.value;
        const targetContainer = document.getElementById(selectedCategory);
        if (targetContainer) {
            targetContainer.appendChild(taskCard);
            checkEmptyContainers();
        }
    });

    taskCategorySelect.addEventListener('click', (e) => {
        e.stopPropagation();  // Prevent opening the popup
    });

    function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.id);
        setTimeout(() => {
            e.target.classList.add('invisible');
        }, 0);
        e.target.style.boxShadow = '0px 0px 15px rgba(0, 0, 0, 0.3)';
        e.target.style.opacity = '0.6';
    }

    function dragEnd(e) {
        e.target.classList.remove('invisible');
        e.target.style.boxShadow = '';
        e.target.style.opacity = '';
        checkEmptyContainers();
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function dragEnter(e) {
        e.preventDefault();
        e.target.classList.add('drag-over');
    }

    function dragLeave(e) {
        e.target.classList.remove('drag-over');
    }

    function dragDrop(e) {
        e.target.classList.remove('drag-over');
        const id = e.dataTransfer.getData('text/plain');
        const draggable = document.getElementById(id);
        if (e.target.classList.contains('taskList')) {
            e.target.appendChild(draggable);
        } else if (e.target.parentElement.classList.contains('taskList')) {
            e.target.parentElement.appendChild(draggable);
        }
        checkEmptyContainers();
    }

    function checkEmptyContainers() {
        containers.forEach(container => {
            const notFoundMessage = container.querySelector('.tasktnotfound');
            const taskCards = container.querySelectorAll('.taskcard');
            if (taskCards.length > 0) {
                notFoundMessage.classList.add('d-nonepopup');
            } else {
                notFoundMessage.classList.remove('d-nonepopup');
            }
        });
    }

    checkEmptyContainers();
});

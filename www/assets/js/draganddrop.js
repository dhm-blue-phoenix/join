document.addEventListener('DOMContentLoaded', (event) => {
    const taskCard = document.getElementById('taskcardtoDrop');
    const containers = document.querySelectorAll('.taskList');

    taskCard.addEventListener('dragstart', dragStart);
    taskCard.addEventListener('dragend', dragEnd);

    containers.forEach(container => {
        container.addEventListener('dragover', dragOver);
        container.addEventListener('dragenter', dragEnter);
        container.addEventListener('dragleave', dragLeave);
        container.addEventListener('drop', dragDrop);
    });

    function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.id);
        setTimeout(() => {
            e.target.classList.add('invisible');
        }, 0);
        // Add shadow and opacity effect
        e.target.style.boxShadow = '0px 0px 15px rgba(0, 0, 0, 0.3)';
        e.target.style.opacity = '0.6';
    }

    function dragEnd(e) {
        e.target.classList.remove('invisible');
        e.target.style.boxShadow = ''; // Reset shadow
        e.target.style.opacity = ''; // Reset opacity
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
                notFoundMessage.classList.add('d-nonepopup'); // Hide the not found message
            } else {
                notFoundMessage.classList.remove('d-nonepopup'); // Show the not found message
            }
        });
    }

    checkEmptyContainers();
});

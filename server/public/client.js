$(onReady);

function onReady() {
    // We want to write all current tasks to the DOM upon page load/reload
    getList();
    // Set up click listeners
    $('#addButton').on('click', addTask);
    $('#mainbody').on('click', '.deleteButton', deleteTaskHandler);
    $('#mainbody').on('click', '.completeButton', completeTaskHandler);
    $('#mainbody').on('click', '.editButton', editTaskHandler);
}

//  BASE MODE OF RENDER, NOT PRETTY BUT HIGHLY FUNCTIONAL
//
// function renderList(response) {
//     // Empty the table
//     $('#allTasks').empty();
//     $('#completeTasks').empty();
//
//     // Initialize row to append
//     let newRow = '';
//
//     // Append all rows to the DOM
//     for (let i = 0; i < response.length; i++) {
//
//         // If the task is complete we append the task to the completed task table
//         if (response[i].complete) {
//             newRow = `
//         <tr>
//             <td>${response[i].task}</td>
//             <td>
//                 <button class="completeButton" data-id=${response[i].id}>Incomplete</button>
//                 <button class="editButton" data-id=${response[i].id}>Edit</button>
//                 <button class="deleteButton" data-id=${response[i].id}>Remove</button>
//             </td>
//         </tr>`;
//             $('#completeTasks').append(newRow);
//         } 
//         // If the task is incomplete we append the task to the incomplete tasks table
//         else if (!response[i].complete) {
//             newRow = `
//         <tr>
//             <td>${response[i].task}</td>
//             <td>
//                 <button class="completeButton" data-id=${response[i].id}>Complete</button>
//                 <button class="editButton" data-id=${response[i].id}>Edit</button>
//                 <button class="deleteButton" data-id=${response[i].id}>Remove</button>
//             </td>
//         </tr>`;
//             $('#allTasks').append(newRow);
//         }
//     }
// }

function renderList(response) {
    // Empty BOTH tables
    $('#incompleteTasks').empty();
    $('#completeTasks').empty();

    // Initialize row to append
    let newTask = ``;

    // Loop through all rows of the database
    for (let i = 0; i < response.length; i++) {

        // If the task is incomplete we append the task to the incomplete tasks table
        // Also, I badly wanted the edit remove and complete buttons to have simple icons 
        // instead of words to go with the minimal UI aesthetic. The long svg tags
        // Are the only way I could get them to work. BUT I ALSO WANTED THEM CENTERED 
        // *sigh*

        // Incomplete tasks first
        if (!response[i].complete) {
            newTask = `
        <div class="incomplete task" data-id="${response[i].id}">
            <h5 class="task-words">${response[i].task}</h5>
                <div class="btn-group mb-3">
                    <button class="controller completeButton btn btn-outline-secondary" data-id=${response[i].id}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                        </svg>
                    </button>
                    <button class="controller editButton btn btn-outline-secondary" data-id=${response[i].id}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                        </svg>
                    </button>
                    <button class="controller deleteButton btn btn btn-outline-secondary" data-id=${response[i].id}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                    </button>
                </div>
        </div>`
            // Append a new INCOMPLETE task to the DOM
            $('#incompleteTasks').append(newTask);
        }

        // If task is complete, we append those below incomplete tasks
        else if (response[i].complete) {
            newTask = `
        <div class="complete task" data-id="${response[i].id}">
        <h5 class="task-words">${response[i].task}</h5>
                <div class="btn-group mb-3">
                    <button class="controller editButton btn btn-outline-secondary" data-id=${response[i].id}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                        </svg>
                    </button>
                    <button class="controller deleteButton btn btn-outline-secondary" data-id=${response[i].id}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                    </button>
                </div>
        </div>`
            // Append a new COMPLETED task to the DOM
            $('#completeTasks').append(newTask);
        }
    }
}

// GET

function getList() {
    $.ajax({
        type: 'GET',
        url: '/list'
    }).then(function (response) {
        console.log('Getting response', response);
        // Anytime we GET, we RENDER
        renderList(response);
    })
}

// POST

function addTask() {
    // We don't want to add a task if there is no task to add
    if ($('#taskIn').val() === '') {
        alert("Please add text to your task")
    }

    // Otherwise we'll trust the user wants to add something...
    // no matter how regrettable
    else {
        // make a Task to send, all tasks when added should be false to start
        let newTask = {
            task: $('#taskIn').val(),
            complete: false
        }
        // Send data to Serverside
        $.ajax({
            type: 'POST',
            url: '/list',
            data: newTask
        }).then(function (response) {
            $('#taskIn').val('');
            getList();
        }).catch(function (error) {
            alert('Failed to add Task', newTask, err);
        })
    }

}

// DELETE

function deleteTaskHandler() {
    deleteTask($(this).data("id"));
}

// Fairly straightforward. When we delete we rewrite all tasks to the DOM
function deleteTask(taskId) {
    $.ajax({
        method: 'DELETE',
        url: `/list/${taskId}`,
    }).then(function (response) {
        getList();
    }).catch(function (error) {
        alert('Error on deleting task.', error);
    });
}

// PUT

function completeTaskHandler() {
    completeTask($(this).data("id"));
}

// Completing a task will switch false to 
// true of a particular task in the database
function completeTask(completeId) {
    $.ajax({
        method: 'PUT',
        url: `/list/${completeId}`,
    }).then(function (response) {
        getList();
    }).catch(function (error) {
        alert('error completing task', error);
    })
}

// EDIT / UPDATE

function editTaskHandler() {
    editTask($(this).data("id"));
}

// Combination of delete and get.
// Delete the task we are editting and take the 
// text of the deleted task and put it into the input field.
// Might be a little inelegent, but it works as intended.
function editTask(taskId) {

    $.ajax({
        type: 'GET',
        url: `/list/`
    }).then(function (response) {
        for (let thing of response) {
            if (thing.id === taskId) {
                $('#taskIn').val(`${thing.task}`);
            }
        }
        console.log('Getting response', response);
    })

    $.ajax({
        method: 'DELETE',
        url: `/list/${taskId}`,
    }).then(function (response) {
        getList();
    }).catch(function (error) {
        alert('Error on deleting task.', error);
    });
}
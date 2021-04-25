$(onReady);

function onReady() {
    // We want to write all current tasks to the DOM upon page load
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

//     // Initialize row to append
//     let newRow = '';

//     // Append all rows to the DOM
//     for (let i = 0; i < response.length; i++) {

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
    // Empty the table
    $('#incompleteTasks').empty();
    $('#completeTasks').empty();

    // Initialize row to append
    let newTask = ``;

    // Append all rows to the DOM
    for (let i = 0; i < response.length; i++) {

        // If the task is incomplete we append the task to the incomplete tasks table
        if (!response[i].complete) {
            newTask = `
        <div class="incomplete" data-id="${response[i].id}">
            <h3>${response[i].task}</h3>
            <p> 
                <button class="completeButton btn btn-success" data-id=${response[i].id}>Complete</button>
                <button class="editButton btn btn-info" data-id=${response[i].id}>Edit</button>
                <button class="deleteButton btn btn-danger" data-id=${response[i].id}>Remove</button>
            </p>
        </div>`
            // Append a new INCOMPLETE task to the DOM
            $('#incompleteTasks').append(newTask);
        }

        // If the task is complete we append the task to the completed task table
        else if (response[i].complete) {
            newTask = `
        <div class="complete" data-id="${response[i].id}">
            <h3>${response[i].task}</h3>
            <p> 
                <button class="editButton btn btn-info" data-id=${response[i].id}>Edit</button>
                <button class="deleteButton btn btn-danger" data-id=${response[i].id}>Remove</button>
            </p>
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
        renderList(response);
    })
}

// POST

function addTask() {
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

// DELETE

function deleteTaskHandler() {
    deleteTask($(this).data("id"));
}

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

// Completing a task
function completeTaskHandler() {
    completeTask($(this).data("id"));
}

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
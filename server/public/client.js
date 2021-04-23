$(onReady);

function onReady() {
    // We want to write all current tasks to the DOM upon page load
    getList();
    // Set up click listeners
    $('#addButton').on('click', addTask);
    $('#allTasks').on('click', '.deleteButton', deleteTaskHandler);
    $('#allTasks').on('click', '.completeButton', completeTaskHandler);
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

function renderList(response) {
    // Empty the table
    $('#allTasks').empty();

    // Initialize row to append
    let newRow = '';

    // Append all rows to the DOM
    for (let i = 0; i < response.length; i++) {
        newRow = `<tr>`;
        // If the task is completed, we reset the complete class to the table row
        if (response[i].complete) {
            newRow = `<tr class="complete">`;
        }
        // Then we concatenate the rest of the table row
        newRow += `<td>${response[i].id}</td>
          <td>${response[i].task}</td>
          <td>
            <button class="completeButton" data-id=${response[i].id}>Complete</button>
            <button class="deleteButton" data-id=${response[i].id}>Remove</button>
          </td>
        </tr>`;
        $('#allTasks').append(newRow);
    }
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

function completeTaskHandler() {
    completeTask($(this).data("id"));
}

function completeTask(completeId) {
    $.ajax({
        method: 'PUT',
        url: `/koalas/${completeId}`,
    }).then(function (response) {
        getList();
    }).catch(function (error) {
        alert('error completing task', error);
    })
}
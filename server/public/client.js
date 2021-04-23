$(onReady);

function onReady() {
    // We want to write all current tasks to the DOM upon page load
    getList();
    // Set up click listeners
    $('#addButton').on('click', addTask);
    $('#allTasks').on('click', '.deleteButton', deleteTask);
    $('#allTasks').on('click', '.editButton', editTask);
    $('#allTasks').on('click', '.completeButton', completeTask);
}

function getList() {
    $.ajax({
        type: 'GET',
        url: '/list'
    }).then(function (response) {
        console.log('Getting response', response);
        renderList(response);
    })
} // end getList

function renderList(response) {
    // Empty the table
    $('#allTasks').empty();
    // Initialize row to append
    let newRow = '';
    // Append all rows to the DOM
    for (let i = 0; i < response.length; i++) {
        newRow = `<tr>`;
        // If the task is completed, we add the complete class to the table row
        if (response[i].complete) {
            newRow = `<tr class="complete">`;
        }
        // Then we concatenate the rest of the table row
        newRow += `<td>${response[i].id}</td>
          <td>${response[i].task}</td>
          <td>
            <button class="completeButton" data-id=${response[i].id}>Complete</button>
            <button class="editButton" data-id=${response[i].id}>Edit</button>
            <button class="deleteButton" data-id=${response[i].id}>Remove</button>
          </td>
        </tr>`;
        $('#allTasks').append(newRow);
      

    }
}//end render

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

function deleteTask() {
    
}

function editTask() {
    
}

function completeTask() {
    
}
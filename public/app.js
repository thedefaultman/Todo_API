$(document).ready(function () {
    //To get the data from our API
    $.getJSON("/api/todos")
    .then(addTodos)
    .catch(function (err) {  
        console.log(err);
    })

    //To post data to the API
    $('#todoInput').keypress(function (e) { 
        if (e.which == 13) {
            createTodo()
        }
    });


    $('.list').on('click', 'li', function () {  
        updateTodo($(this))
    })

    //To Delete Data from API 
    $('.list').on('click', 'span', function (e) {
        e.stopPropagation()
        removeTodo($(this).parent())
    });


});

//this goes over addTodo for each todos
function addTodos(todos) {  
    //add todos to the page
    todos.forEach(todo => {
        addTodo(todo)
    });
}

//to add each todo to the dom
//we created this function to reuse this code for updating the dom as well
function addTodo(todo) {  
    let newTodo = $('<li class="task">' + todo.name + ' <span>X</span></li>')
    //this passes the unique id in each todo to the jquery memory and store it
    newTodo.data('id', todo._id)
    //to store the completed value
    newTodo.data('completed', todo.completed)
    if (todo.completed) {
        newTodo.addClass("done")
    }
    $('.list').append(newTodo);
}


function createTodo() {  
    //send request to create todo
    let userInput = $('#todoInput').val()
    $.post('/api/todos', {name: userInput})
    .then(function (newTodo) {  
        addTodo(newTodo)
        $('#todoInput').val("")
    })
    .catch(function (err) {  
        console.log(err);
    })
}


//updates todo (completed)
function updateTodo(todo) {  
    let updateUrl = '/api/todos/' + todo.data('id')
    let isDone = !todo.data('completed')
    let updateData = {completed: isDone}
    $.ajax({
        method: 'PUT',
        url: updateUrl,
        data: updateData
    })
    .then(function (updatedTodo) {  
        todo.toggleClass("done")
        todo.data('completed', isDone)
    })
}

//It removes Todos. DA
function removeTodo(todo) {  
    let clickedId = '/api/todos/' + todo.data('id')
    $.ajax({
        method: 'DELETE',
        url: clickedId
    })
    //when the todo gets deleted from API
    //then we delete the <li> from the dom
    .then(function (data) {  
        todo.remove()
    })
    .catch(function (err) {  
        console.log(err);
    })
}
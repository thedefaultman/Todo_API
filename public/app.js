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

    //To Delete Data from API 
    $('.list').on('click', 'span', function () {
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

//
function removeTodo(todo) {  
    let clickedId = todo.data('id')
    $.ajax({
        method: 'DELETE',
        url: '/api/todos/' + clickedId
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
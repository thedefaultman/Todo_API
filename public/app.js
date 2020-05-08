$(document).ready(function () {
    $.getJSON("/api/todos")
    .then(addTodos)
    .catch(function (err) {  
        console.log(err);
    })
});


function addTodos(todos) {  
    //add todos to the page
    todos.forEach(todo => {
        let newTodo = $('<li class="task">' + todo.name + '</li>')
        $('.list').append(newTodo);
    });
}
var Todo = require('./models/todo');

module.exports = function(app) {
    //api
    app.get('/api/todos', function(req, res) {
        //use mongoose to get all todos in the database
        Todo.find(function(err, todos) {
            //if there is an error retreiving, send the error
            if(err)
                res.send(err)

            res.json(todos);
        })
    })

    app.post('/api/todos', function(req, res) {
        //create a todo, information from from AJAX request from angular
        Todo.create({
            text: req.body.text,
            done: false
        }, function(err, todo) {
            if (err)
                res.send(err);

            //get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err);

                res.json(todos);
            });
        });
    });

    app.delete('/api/todos/:todo_id', function(req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function(err, todo) {
            if(err)
                res.send(err);

            //get and return all todos after you delete one
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err);

                res.json(todos);
            });
        });
    });

    app.get('*', function(req, res) {
        res.sendFile('public/index.html', { root: __dirname + '/../' }); //load the single view file
    });
};

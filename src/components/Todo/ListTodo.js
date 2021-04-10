import React, { Fragment, useEffect, useState } from 'react'
import EditTodo from './EditTodo'

function ListTodo() {
    const [todos, setTodos] = useState([])
    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:5000/todos")
            const jsonData = await response.json()
            setTodos(jsonData)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteTodo = async (id) => {
        // e.preventDefault();
        try {
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE"
            });
            window.location = './'
            setTodos(todos.filter(todo => todo.todo_id !== id))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTodos();
    }, [])


    return (
        <Fragment>
            <table className="table">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th style={{ width: "120px" }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <tr key={todo.todo_id}>
                            <td>{todo.description}</td>
                            <td>
                                <EditTodo todo={todo} />
                                {/* <button className="btn btn-warning btn-sm mx-1 text-white">
                                    <i className="fas fa-edit"></i>
                                </button> */}
                                <button className="btn btn-danger btn-sm mx-1" onClick={() => deleteTodo(todo.todo_id)}>
                                    <i className="fas fa-trash"></i>

                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    )
}

export default ListTodo

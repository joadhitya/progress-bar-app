import React, { Fragment, useState, useEffect } from 'react'
import Swal from 'sweetalert2'

function InputTodo() {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    const [description, setDescription] = useState("")
    const [count_todos, setCountTodos] = useState(0)

    const getCountTodos = async () => {
        try {
            const response = await fetch("http://localhost:5000/todos/count/all")
            const jsonData = await response.json()
            var count_todo = jsonData[0].count_todo
            setCountTodos(count_todo)
        } catch (error) {
            console.log(error)
        }
    }


    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
            const body = { description }
            if (!description) {


                Toast.fire({
                    icon: 'error',
                    title: 'Please fill the input form'
                })
                return
            }
            const response = await fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
            window.location = "/";
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getCountTodos();
    }, [])


    return (
        <Fragment>
            <h1 className="text-center mt-5">Todo ({count_todos})</h1>
            <form className="d-flex mt-2" onSubmit={onSubmitForm}>
                <input type="text" className="form-control" value={description} onChange={e => setDescription(e.target.value)} />
                <button className="btn btn-success">Add</button>
            </form>
        </Fragment>
    )
}

export default InputTodo

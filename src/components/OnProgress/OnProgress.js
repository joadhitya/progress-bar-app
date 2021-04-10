import React, { Fragment, useState, useEffect } from 'react'
import Swal from 'sweetalert2'

function OnProgress() {
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
    const [on_progress, setOnProgress] = useState([])
    const [count_on_progress, setCountOnProgress] = useState(0)
    const [description_on_progress, setDescriptionOnProgress] = useState("")
    const getOnProgress = async () => {
        try {
            const response = await fetch("http://localhost:5000/on_progress")
            const jsonData = await response.json()
            setDescriptionOnProgress("")
            setOnProgress(jsonData)
        } catch (error) {
            console.log(error)
        }
    }
    const getCountOnProgress = async () => {
        try {
            const response = await fetch("http://localhost:5000/on_progress/count/all")
            const jsonData = await response.json()
            var count_on_progress = jsonData[0].count_on_progress
            setCountOnProgress(count_on_progress)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteOnProgress = async (id) => {
        try {
            const deleteOnProgress = await fetch(`http://localhost:5000/on_progress/${id}`, {
                method: "DELETE"
            });
            console.log(deleteOnProgress)
            await getOnProgress();
            await getCountOnProgress();
        } catch (error) {
            console.log(error)
        }
    }



    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
            const body = { description_on_progress }
            if (!description_on_progress) {
                Toast.fire({
                    icon: 'error',
                    title: 'Please fill the input form On Progress'
                })
                return
            }
            const response = await fetch("http://localhost:5000/on_progress", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
            console.log(response)
            getOnProgress();
            getCountOnProgress();
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getOnProgress();
        getCountOnProgress();
    }, [])
    return (
        <Fragment>
            <h1 className="text-center mt-5">On Progress ({count_on_progress})</h1>
            <form className="d-flex mt-2" onSubmit={onSubmitForm}>
                <input type="text" className="form-control" value={description_on_progress} onChange={e => setDescriptionOnProgress(e.target.value)} />
                <button className="btn btn-success">Add</button>
            </form>
            <table className="table">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th style={{ width: "120px" }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {on_progress.map(data => (
                        <tr key={data.on_progress_id}>
                            <td>{data.description_on_progress}</td>
                            <td>
                                {/* <Editdata data={data} /> */}
                                <button className="btn btn-danger btn-sm mx-1" onClick={() => deleteOnProgress(data.on_progress_id)}>
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

export default OnProgress

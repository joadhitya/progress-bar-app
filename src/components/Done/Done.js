import React, { Fragment, useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import LoadingOverlay from 'react-loading-overlay';


function Done() {
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
    const [dones, setDones] = useState([])
    const [count_dones, setCountDones] = useState(0)
    const [description_done, setDescriptionDone] = useState("")
    const [description_done_update, setDescriptionDoneUpdate] = useState("")
    const [is_active, setIsActive] = useState(false)
    const getDones = async () => {
        try {
            const response = await fetch("http://localhost:5000/dones")
            const jsonData = await response.json()
            setDescriptionDone("")
            setIsActive(false)
            setDones(jsonData)
        } catch (error) {
            console.log(error)
        }
    }
    const getCountDones = async () => {
        try {
            const response = await fetch("http://localhost:5000/dones/count/all")
            const jsonData = await response.json()
            var count_done = jsonData[0].count_done
            setCountDones(count_done)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteDone = async (id) => {
        try {
            const deleteDone = await fetch(`http://localhost:5000/dones/${id}`, {
                method: "DELETE"
            });
            console.log(deleteDone)
            await getDones();
            await getCountDones();
        } catch (error) {
            console.log(error)
        }
    }



    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
            const body = { description_done }
            if (!description_done) {
                Toast.fire({
                    icon: 'error',
                    title: 'Please fill the input form Done'
                })
                return
            }
            const response = await fetch("http://localhost:5000/dones", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
            setIsActive(true)
            getDones();
            getCountDones();
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getDones();
        getCountDones();
    }, [])

    return (
        <Fragment>
            <h1 className="text-center mt-5">Done ({count_dones})</h1>
            <form className="d-flex mt-2" onSubmit={onSubmitForm}>
                <input type="text" className="form-control" value={description_done} onChange={e => setDescriptionDone(e.target.value)} />
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
                    {dones.map(done => (
                        <tr key={done.done_id}>
                            <td>{done.description_done}</td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-warning text-white btn-sm"
                                    data-toggle="modal"
                                    data-target={`#id_done${done.done_id}`}
                                >
                                    <i className="fas fa-edit"></i>
                                </button>
                                <div
                                    className="modal"
                                    id={`id_done${done.done_id}`}
                                    onClick={() => setDescriptionDoneUpdate(done.description_done)}
                                >
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h4 className="modal-title">Edit Todo</h4>
                                                <button
                                                    type="button"
                                                    className="close"
                                                    data-dismiss="modal"
                                                    onClick={() => setDescriptionDoneUpdate(done.description_done)}
                                                >
                                                    &times;
                                                </button>
                                            </div>

                                            <div className="modal-body">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={!description_done_update ? done.description_done_update : description_done_update}
                                                    onChange={e => setDescriptionDoneUpdate(e.target.value)}
                                                />
                                            </div>

                                            <div className="modal-footer">
                                                <button
                                                    type="button"
                                                    className="btn btn-warning"
                                                    data-dismiss="modal"
                                                // onClick={e => updateDescription(e)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger"
                                                    data-dismiss="modal"
                                                    onClick={() => setDescriptionDoneUpdate(done.description_done)}
                                                >
                                                    Close
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button className="btn btn-danger btn-sm mx-1" onClick={() => deleteDone(done.done_id)}>
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

export default Done

import {useState} from 'react'
import {FaList} from 'react-icons/fa'
import {useMutation, useQuery} from '@apollo/client'
import {ADD_PROJECT} from '../mutations/projectMutations'
import {GET_PROJECTS} from '../queries/projectQueries'
import {GET_CLIENTS} from "../queries/clientQueries";
import Spinner from "./Spinner";



const getFullStatus = (key) => {
    switch (key) {
        case "new":
            return "Non Started";
        case "progress":
            return "In Progress";
        case "completed":
            return "Completed"
    }
}

export default function AddProjectModal() {


    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('new')
    const [clientId, setClientId] = useState('')

    const [addProject] = useMutation(ADD_PROJECT, {
        variables: {
            name,
            description,
            status,
            clientId
        },
        update(cache, {data: {addProject}}) {
            const {projects} = cache.readQuery({query: GET_PROJECTS})

            cache.writeQuery({
                query: GET_PROJECTS,
                data: {projects: projects.concat([{...addProject, status: getFullStatus(status)}])}
            })
        }
    })

    const {loading, error, data} = useQuery(GET_CLIENTS)


    if (loading) return <Spinner/>
    if (error) return <p>Something is wrong!</p>



    return (
        <>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addNewProject">
                <div className="d-flex align-items-center">
                    <FaList className={'icon'}/>
                    <div>Add New Project</div>
                </div>
            </button>
            <div className="modal fade" id="addNewProject" aria-labelledby="addNewProjectLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addNewProjectLabel">Add New Project</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={e => {
                                e.preventDefault()


                                if (name === '' || description === ''|| clientId === '') {
                                    return alert('Please fill in all fields!')
                                }

                                console.log(`
                                    name >> ${name}
                                    description >> ${description}
                                    status >> ${status}
                                    clientId >> ${clientId}
                                `)

                                addProject()

                                setName('')
                                setDescription('')
                                setStatus('new')
                                setClientId('')

                            }}>
                                <div className={'mb-3'}>
                                    <label className={'form-label'}>Name</label>
                                    <input
                                        type="text"
                                        className={'form-control'}
                                        id={'name'}
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                    />
                                </div>
                                <div className={'mb-3'}>
                                    <label className={'form-label'}>Description</label>
                                    <input
                                        type="text"
                                        className={'form-control'}
                                        id={'description'}
                                        value={description}
                                        onChange={e => setDescription(e.target.value)}
                                    />
                                </div>
                                <div className={'mb-3'}>
                                    <label className={'form-label'}>Status</label>
                                    <select
                                        id="status"
                                        className={'form-select'}
                                        value={status}
                                        onChange={e => setStatus(e.target.value)}
                                    >
                                        <option value="new">Non Started</option>
                                        <option value="progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>
                                <div className={'mb-3'}>
                                    <label className={'form-label'}>Clients</label>
                                    <select
                                        id="clients"
                                        className={'form-select'}
                                        value={clientId}
                                        onChange={e => setClientId(e.target.value)}
                                    >
                                        <option value="">Select Client</option>
                                        {!loading && !error
                                            ? (
                                                <>
                                                    {data.clients.map(client => {
                                                        return <option key={client.id} value={client.id}>{client.name}</option>
                                                    })}
                                                </>
                                            )
                                            : null}
                                    </select>

                                </div>
                                <button type={"submit"} data-bs-dismiss={'modal'} className={'btn btn-primary'}>
                                    Submit
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
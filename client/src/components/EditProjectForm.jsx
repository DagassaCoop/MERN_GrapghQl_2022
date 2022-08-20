import {useState} from "react";
import {useMutation} from "@apollo/client";
import {GET_PROJECT} from "../queries/projectQueries";
import {UPDATE_PROJECT} from "../mutations/projectMutations";

function getStatusKey(status) {
    switch (status) {
        case 'Not Started':
            return 'new'
        case 'In Progress':
            return 'progress'
        case 'Completed':
            return 'completed'
    }
}

export default function EditProjectForm({project}) {

    const [name, setName] = useState(project.name)
    const [description, setDescription] = useState(project.description)
    const [status, setStatus] = useState(getStatusKey(project.status))


    const [updateProject] = useMutation(UPDATE_PROJECT, {
        variables: {
            id: project.id,
            name,
            description,
            status
        },
        refetchQueries: [{query: GET_PROJECT, variables: {id: project.id}}]
    })

    return (
        <div className={'mt-5'}>
            <h3>Update Project Details</h3>
            <form onSubmit={e => {
                e.preventDefault()

                updateProject()

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
                <button type={"submit"} className={'btn btn-primary'}>
                    Submit
                </button>
            </form>
        </div>
    )
}
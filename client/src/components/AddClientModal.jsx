import {useState} from 'react'
import {FaUser} from 'react-icons/fa'
import {useMutation} from '@apollo/client'
import {ADD_CLIENT} from '../mutations/clientMutations'
import {GET_CLIENTS} from '../queries/clientQueries'

export default function AddClientModal() {

    const [clientName, setClientName] = useState('')
    const [clientEmail, setClientEmail] = useState('')
    const [clientPhone, setClientPhone] = useState('')

    const [addClient] = useMutation(ADD_CLIENT, {
        variables: {
            name: clientName,
            email: clientEmail,
            phone: clientPhone
        },
        update(cache, {data: {addClient}}) {
            const {clients} = cache.readQuery({query: GET_CLIENTS})

            cache.writeQuery({
                query: GET_CLIENTS,
                data: {clients: clients.concat([addClient])}
            })
        }
    })

    return (
        <>
            <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#addNewClient">
                <div className="d-flex align-items-center">
                    <FaUser className={'icon'}/>
                    <div>Add New Client</div>
                </div>
            </button>
            <div className="modal fade" id="addNewClient" aria-labelledby="addNewClientLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addNewClientLabel">Add New Client</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={e => {
                                e.preventDefault()


                                if (clientName === '' || clientEmail === '' || clientPhone === '') {
                                    return alert('Please fill in all fields!')
                                }

                                addClient()

                                setClientName('')
                                setClientEmail('')
                                setClientPhone('')

                            }}>
                                <div className={'mb-3'}>
                                    <label className={'form-label'}>Name</label>
                                    <input
                                        type="text"
                                        className={'form-control'}
                                        id={'clientName'}
                                        value={clientName}
                                        onChange={e => setClientName(e.target.value)}
                                    />
                                </div>
                                <div className={'mb-3'}>
                                    <label className={'form-label'}>Email</label>
                                    <input
                                        type="text"
                                        className={'form-control'}
                                        id={'clientEmail'}
                                        value={clientEmail}
                                        onChange={e => setClientEmail(e.target.value)}
                                    />
                                </div>
                                <div className={'mb-3'}>
                                    <label className={'form-label'}>Phone</label>
                                    <input
                                        type="text"
                                        className={'form-control'}
                                        id={'clientPhone'}
                                        value={clientPhone}
                                        onChange={e => setClientPhone(e.target.value)}
                                    />
                                </div>
                                <button type={"submit"} data-bs-dismiss={'modal'} className={'btn btn-secondary'}>
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
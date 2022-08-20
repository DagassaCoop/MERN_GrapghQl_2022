import {FaTrash} from 'react-icons/fa'
import {useMutation, useQuery} from '@apollo/client'
import {DELETE_CLIENT} from '../mutations/clientMutations'
import {GET_CLIENTS, GET_CLIENT} from '../queries/clientQueries'
import {GET_PROJECTS} from "../queries/projectQueries";

export default function ClientRow({client}) {
    // console.log(client)
    const [deleteClient] = useMutation(DELETE_CLIENT, {
        variables: {
            id: client.id
        },
        refetchQueries: [{query: GET_CLIENTS}, {query: GET_PROJECTS}],
        // update(cache, {data: {deleteClient}}) {
        //     const {clients} = cache.readQuery({query: GET_CLIENTS});
        //     cache.writeQuery({
        //         query: GET_CLIENTS,
        //         data: {
        //             clients: clients.filter((client) => client.id !== deleteClient.id),
        //         },
        //     });
        // },
    })

    const {loading, error, data} = useQuery(GET_CLIENT, {
        variables: {
            id: client.id
        }
    })

    const getClientHandler = () => {
        console.log(data)
    }

    return (
        <tr>
            <td>{client.name}</td>
            <td>{client.email}</td>
            <td>{client.phone}</td>
            <td className={'d-flex'}>
                <button className="btn-danger btn-sm" onClick={deleteClient}>
                    <FaTrash/>
                </button>
                <button onClick={() => getClientHandler()}>
                    Show
                </button>
            </td>
        </tr>
    )
}
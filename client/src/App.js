import './App.css';
import Header from "./components/Header";
import Clients from "./components/Clients";
import AddClientModal from "./components/AddClientModal";

import {ApolloProvider, ApolloClient, InMemoryCache, concat} from '@apollo/client'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Projects from "./components/Projects";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Project from "./pages/Project";

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                clients: {
                    merge(existing, incoming) {
                        return incoming;
                    }
                },
                projects: {
                    merge(existing, incoming) {
                        return incoming;
                    }
                }
            }
        }
    }

})

const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    cache
})

function App() {


    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <Header/>
                <div className="container">
                    <Routes>
                        <Route path={'/'} element={<Home/>}/>
                        <Route path={'/project/:id'} element={<Project/>}/>
                        <Route path={'*'} element={<NotFound/>}/>
                    </Routes>
                </div>
            </BrowserRouter>
        </ApolloProvider>

    );
}


export default App;

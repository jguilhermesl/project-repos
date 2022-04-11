import React, { useState, useCallback, useEffect } from 'react';
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa'
import { Container, Form, SubmitButton, List, DeleteButton } from './styles'
import {Link} from 'react-router-dom'

import api from '../../services/api'

export default function Main() {

    const [newRepo, setNewRepo] = useState('')
    const [repositorios, setRepositorios] = useState([])
    const [loading, setLoading] = useState(false)

    //Buscar

    useEffect(() => {
        const repoStorage = localStorage.getItem('repos');
        if(repoStorage){
            setRepositorios(JSON.parse(repoStorage))
        }    },[])

    //DidUpdate
    useEffect(() => {
        localStorage.setItem('repos', JSON.stringify(repositorios));
    }, [repositorios])

    function handleInputChange(e) {
        setNewRepo(e.target.value)
    }

    const handleSubmit = useCallback((e) => {
        e.preventDefault()

        async function submit() {
            setLoading(true)
            try {

                if(newRepo === ''){
                    alert('Preencha o campo.')
                }
                const response = await api.get(`repos/${newRepo}`)

                const hasRepo = repositorios.find(repo => repo.name === newRepo)

                if(hasRepo){
                    alert('Repositório duplicado.')
                    return
                }

                const data = {
                    name: response.data.full_name,
                }
                setRepositorios([...repositorios, data])
                setNewRepo('')
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        }
        submit();
    }, [newRepo, repositorios])

    const handleDelete = useCallback( (repo) => {
        const find = repositorios.filter( r => r.name !== repo);
        setRepositorios(find)
    }, [repositorios])

    return (
        <Container>
            <h1><FaGithub /> Meus repositórios</h1>

            <Form onSubmit={handleSubmit}>
                <input type="text" placeholder="Adicionar repositorios" value={newRepo} onChange={handleInputChange} />

                <SubmitButton loading={loading ? 1 : 0}>
                    {loading ? (<FaSpinner />) : (<FaPlus />)}
                </SubmitButton>
            </Form>

            <List>
                {repositorios.map(repo => (
                    <>
                        <li key={repo.name}>
                            <span>
                                <DeleteButton onClick={() => handleDelete(repo.name)}>
                                    <FaTrash />
                                </DeleteButton>
                                {repo.name}
                            </span>
                            <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}> <FaBars /> </Link>
                        </li>
                    </>
                ))}
            </List>
        </Container>
    )
}
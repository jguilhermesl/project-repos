import React, { useEffect, useState } from 'react';
import api from '../../services/api'
import { FaArrowLeft } from 'react-icons/fa'

import { Container, Owner, Loading, BackButton, IssuesList, PagesAction } from './styles'

export default function Repositorio({ match }) {

    const [repositorio, setRepositorio] = useState({});
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [stateIssue, setStateIssue] = useState('open')

    // match é um método para resgatar o valor do params 
    // poderia ser utilizado o useParams, mas o matheus optou por esse
    // encode jguilhermesl/jguilhermesl --> jguilhermeslI%FGjguilhermesl (encodar)
    // decode jguilhermeslI%FGjguilherme --> jguilhermesl/jguilhermesl (decodar)

    useEffect(() => {
        async function loadApi() {
            const nomeRepo = decodeURIComponent(match.params.repositorio);

            const [repositorioData, issuesData] = await Promise.all([
                api.get(`/repos/${nomeRepo}`),
                api.get(`/repos/${nomeRepo}/issues`, {
                    params: {
                        state: stateIssue,
                        per_page: 5
                    }
                })
            ])
            setRepositorio(repositorioData.data)
            setIssues(issuesData.data)

            setLoading(false)
        }
        loadApi();
    }, []);

    useEffect(() => {

        async function loadIssue() {
            const nomeRepo = decodeURIComponent(match.params.repositorio);

            const response = await api.get(`/repos/${nomeRepo}/issues`, {
                params: {
                    state: stateIssue,
                    page: page,
                    per_page: 5
                },
            }
            )
            setIssues(response.data)
        }
        loadIssue();
    }, [match.params.repositorio, page, stateIssue]);

    function handlePage(action) {
        setPage(action === 'back' ? page - 1 : page + 1)
    }

    if (loading === true) {
        return (
            <Loading>
                Carregando...
            </Loading>
        )
    }
    return (
        <Container>
            <Owner>
                <BackButton to="/">
                    <FaArrowLeft />
                </BackButton>

                <img src={repositorio.owner.avatar_url} alt={repositorio.owner.login} onClick={() => console.log(stateIssue)} />
                <h1>{repositorio.name}</h1>
                <p>{repositorio.description}</p>
                <div className="buttonsFilter">
                    <button type="button" onClick={() => setStateIssue('all')}>ALL</button>
                    <button type="button" onClick={() => setStateIssue('open')}>OPEN</button>
                    <button type="button" onClick={() => setStateIssue('closed')}>CLOSED</button>
                </div>

                <IssuesList>
                    {issues.map((issue) => (
                        <li key={String(issue.id)}>
                            <img src={issue.user.avatar_url} alt={issue.user.login} />
                            <div>
                                <strong>
                                    <a href={issue.html_url}>{issue.title}</a>
                                    {issue.labels.map(label => (
                                        <span key={String(label.id)}>{label.name}</span>
                                    ))}
                                </strong>
                                <p>{issue.user.login}</p>
                            </div>
                        </li>
                    ))}
                </IssuesList>

                <PagesAction>
                    <button
                        type="button"
                        onClick={() => handlePage('back')}
                        disabled={page < 2}>
                        Voltar
                    </button>
                    {page}
                    <button 
                    type="button" 
                    onClick={() => handlePage('next')}
                    disabled={page === issues.length || issues.length === 0}
                    >Próxima
                    </button>
                </PagesAction>
            </Owner>
        </Container>
    )
}
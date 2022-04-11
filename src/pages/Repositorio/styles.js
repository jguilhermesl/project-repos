import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
`

export const Owner = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 700px;
    margin: 4rem auto;
    background: #fff;

    img {
        border-radius: 20%;
        max-width: 300px;
        max-height: 300px;
    }

    h1 {
        color: #00182A;
        text-transform: capitalize;
    }
    p {
        margin-top: 10px;
        font-size: 1.2rem;
    }

    .buttonsFilter {
        display: flex;
        height: 50px;
        align-items: center;
        gap: 1rem;

        button {
            padding: 5px 10px;
            background: #00182A;
            color: #fff;
            border-radius: 5px;
        }
    }
`

export const Loading = styled.div`
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`

export const BackButton = styled(Link)`
    position: absolute;
    font-size: 2rem;
    left: 1rem;
    top: 1rem;
    color: #000;
    
    &:hover {
        color: rgb( 0, 0, 0 , 0.75)
    }
`

export const IssuesList = styled.ul`
    display: flex;
    flex-direction: column;

    li {
        display: flex;
        align-items: center;
        margin: 5px auto;
        width: 95%;

        img {
            height: 50px;
            width: 50px;
            border-radius: 50%;
            margin-right: 10px;
        }

        div a {
            text-decoration: none;
            color: #00182A;
            margin-right: 10px;
        }

        span {
            background: #000;
            color: #fff;
            margin-right: 10px;
            padding: 1px 3px;
            border-radius: 5px;
        }
    }
`

export const PagesAction = styled.div`
    display: flex;
    width: 95%;
    justify-content: space-between;
    margin: 10px 0;

    button {
        font-size: 1rem;
        background: #00182A;
        color: #fff;
        padding: 3px 6px;
        border-radius: 3px;
        
        &:disabled {
            opacity: 0;
        }
    }
`
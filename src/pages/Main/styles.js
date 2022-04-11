import styled, { keyframes, css} from 'styled-components'


export const Container = styled.div`
    max-width: 80vw;
    margin: 5rem auto;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(0,0,0 0.2);
    padding: 30px;

    h1 {
        svg {
            margin-right: 10px;
        }
    }
`

export const Form = styled.form`
    margin-top: 30px;

    input {
        width: 95%;
        height: 30px;
        padding-left: 15px;
    }
`

// criando animacao button

const animate = keyframes`
    from{
        transform: rotate(0deg)
    }
    to{
        transform: rotate(360deg)
    }
`

export const List = styled.ul`
        list-style: none;
    
        li {
        border-bottom: 1px solid gray;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;

            svg {
                margin-right: 10px;
                color: #00182A;
            }
        }
    `

export const SubmitButton = styled.button.attrs(props => ({
    type: 'submit',
    disabled: props.loading
}))`
    width: 5%;
    height: 100%;
    height: 30px;
    background: #00182A;
    color: #fff;

    &[disabled]{
        cursor: not-allowed;
        opacity: 0.5;
    }

    ${props => props.loading &&
        css`
        svg{
            animation: ${animate} 2s linear infinite;
        }` 
    }
`

export const DeleteButton = styled.button.attrs({
    type: 'button'
})`

`
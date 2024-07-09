import styled from "styled-components";

export const FormContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: ${props => props.theme['gray-100']};
    font-size: 1.125rem;
    font-weight: bold;
    flex-wrap: wrap;
`;

export const TaskImput = styled.input`
    background: transparent;
    height: 2.5rem;
    flex: 1;
    border: 0;
    border-bottom: 2px solid ${(props) => props.theme['gray-500']};
    font-weight: bold;
    font-size: inherit;
    padding: 0 0.5rem;
    color: ${(props)=>props.theme['gray-100']};
    
    &::-webkit-calendar-picker-indicator {
        display: none !important;
    }

    &:focus {
        box-shadow: none;
        border-color: ${(props)=>props.theme['gray-500']};

    }
    &::placeholder {
        color: ${(props)=>props.theme['gray-500']};
    }


`;

export const MinutesAmouthImputs = styled.input`
    background: transparent;
    height: 2.5rem;
    width: 4rem;
    border: 0;

    border-bottom: 2px solid ${(props) => props.theme['gray-500']};
    font-weight: bold;
    font-size: inherit;
    padding: 0 0.5rem;
    color: ${(props)=>props.theme['gray-100']};

    &:focus {
        box-shadow: none;
        border-color: ${(props)=>props.theme['gray-500']};

    }
    &::placeholder {
        color: ${(props)=>props.theme['gray-500']};
    }
`;
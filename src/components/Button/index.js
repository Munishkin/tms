import styled from 'styled-components';

export default styled.button`
    color: #748194;
    font-size: 14px;
    margin: 15px;
    padding: 0.4em 1.5em;
    border-width: 4px;
    border-image: linear-gradient(to right, darkblue, darkorchid) 1;
    transition: all 0.3s ease-in;
    &:hover {
        color: black;
        cursor: pointer;
        background-color: white;
    }
`;
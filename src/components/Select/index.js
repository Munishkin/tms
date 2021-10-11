import styled from 'styled-components';

export default styled.select`
    font-weight: bold;
    width: 85%;
    margin: 15px;
    height: 3em;
    padding: 10px 15px;
    border-radius: 5px;
    background: #F6F7F9;
    color: #748194;
    font-size: 14px;
    border: 1px solid #F6F7F9;
    transition: all 0.3s ease;
    outline: none;
    &:focus {
        border: 1px solid darkorchid;
    }
    &:disabled {
        color: silver;
        background: white;
    }
`;

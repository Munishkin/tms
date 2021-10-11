import styled from 'styled-components';

export default styled.button`
    font-size: 15px;
    font-weight: 400;
    display: inline-block;
    margin: 15px 25px;
    width: 100px;
    border: none;
    padding: 5px 10px;
    background-color: IndianRed;
    color: white;
    transition: all 0.3s ease-in;
    &:hover {
        cursor: pointer;
        background-color: red;
    }
`;

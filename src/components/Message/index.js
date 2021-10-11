import styled from 'styled-components';

export default styled.div`
    position: fixed;
    right: 0px;
    top: 130px;
    width: 330px;
    line-height: 30px;
    padding: 0 10px;
    text-align: center;
    background: ${props => props.color || '#dc5757'};
    color: white;
    font-size: 12px;
    z-index: 1;
`;

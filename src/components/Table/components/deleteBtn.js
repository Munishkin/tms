import styled from 'styled-components';
import deleteBtn from './img/delete.png';

export default styled.img.attrs({
    src: `${deleteBtn}`
})`
    width: 23px;
    height: 24px;
    margin: 5px 20px 0;
    &:hover {
        cursor: pointer;
    }
`;

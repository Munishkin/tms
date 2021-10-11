import styled from 'styled-components';
import editBtn from './img/edit.png';

export default styled.img.attrs({
    src: `${editBtn}`
})`
    width: 25px;
    height: 24px;
    margin: 5px 20px 0;
    &:hover {
        cursor: pointer;
    }
`;

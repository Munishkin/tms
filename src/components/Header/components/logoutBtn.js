import styled from 'styled-components';
import logoutBtn from './img/logout-btn.png';

export default styled.img.attrs({
    src: `${logoutBtn}`
})`
    width: 24px;
    height: 24px;
    &:hover {
        cursor: pointer;
    }
`;

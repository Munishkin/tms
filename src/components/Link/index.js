import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default styled(Link)`
    color: inherit;
    text-decoration: none;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

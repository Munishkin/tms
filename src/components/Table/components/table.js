import styled from 'styled-components';

export default styled.table`
    margin-top: 10px;

    tr:nth-child(odd) {
        background: #F9F9F9;
    }
    tr:nth-child(even) {
        background: #FFF;
    }
    tr {
        line-height: 30px;
        transition: all 0.3s ease-in;
    }
    tr:hover, tr:focus {
        background-color: Lavender !important;
    }
    td {
        padding: 10px 20px;
        text-align: center;
        color: slategray;
    }
    th {
        padding: 10px 20px;
        background-color: Lavender;
        color: #3d3b3b;
    }
`;

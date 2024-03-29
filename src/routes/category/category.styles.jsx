import styled from 'styled-components';

export const CategoryContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;
    row-gap: 50px;
`;

export const CategoryTitle = styled.h2`
    font-size: 38px;
    margin: 0 auto 30px;
    text-align: center;
`;
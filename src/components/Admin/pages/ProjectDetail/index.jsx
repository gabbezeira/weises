import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const Container = styled.div`
    padding: 2rem;
    color: var(--color-text);
`;

const AdminProjectDetail = () => {
  const { id } = useParams();
  return (
    <Container>
      <h1>Project Detail: {id}</h1>
      <p>Project details will be displayed here.</p>
    </Container>
  );
};

export default AdminProjectDetail;

import React from 'react';
import styled from 'styled-components';
import { Entity } from '../types/entity';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }
`;

type Props = {
  data: Entity[];
  onViewDetails: (e: Entity) => void;
};

export const ResultsTable: React.FC<Props> = ({ data, onViewDetails }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Documento</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.cpf || item.cnpj}</td>
            <td><button onClick={() => onViewDetails(item)}>Ver detalhes</button></td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

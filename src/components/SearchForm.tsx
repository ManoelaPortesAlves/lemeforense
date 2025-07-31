import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

type Props = {
  onSearch: (term: string) => void;
};

export const SearchForm: React.FC<Props> = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Digite CPF, CNPJ, email..."
        required
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button type="submit">Pesquisar</button>
    </Form>
  );
};

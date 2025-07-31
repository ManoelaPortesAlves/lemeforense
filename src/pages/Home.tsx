import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { SearchForm } from '../components/SearchForm';
import { ResultsTable } from '../components/ResultsTable';
import { EntityModal } from '../components/EntityModal';
import { Entity } from '../types/entity';
import { getMockResults } from '../services/mockApi';

const Container = styled.div`
  max-width: 960px;
  margin: 2rem auto;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  margin-bottom: 2rem;
`;

const Home: React.FC = () => {
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [recentResults, setRecentResults] = useState<Entity[]>([]);
  const navigate = useNavigate();

  // Carrega histórico do localStorage ao montar
  useEffect(() => {
    const stored = localStorage.getItem('recentResults');
    if (stored) {
      setRecentResults(JSON.parse(stored));
    }
  }, []);

  // Atualiza histórico no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('recentResults', JSON.stringify(recentResults.slice(0, 10)));
  }, [recentResults]);

  const handleSearch = async (term: string) => {
    if (term.trim()) {
      // Busca resultado para mostrar no histórico
      const results = await getMockResults(term);
      if (results.length > 0) {
        // Adiciona o primeiro resultado ao histórico (ou todos, se quiser)
        setRecentResults(prev => [results[0], ...prev.filter(e => e.id !== results[0].id)].slice(0, 10));
      }
      navigate(`/resultados?q=${encodeURIComponent(term)}`);
    }
  };

  return (
    <Container>
      <Title>Consulta de Dados Básicos</Title>
      <Description>Encontre as informações essenciais de seus investigados</Description>
      <SearchForm onSearch={handleSearch} />
      <h2>Resultados recentes</h2>
      <ResultsTable data={recentResults} onViewDetails={setSelectedEntity} />
      {selectedEntity && (
        <EntityModal entity={selectedEntity} onClose={() => setSelectedEntity(null)} />
      )}
    </Container>
  );
};

export default Home;
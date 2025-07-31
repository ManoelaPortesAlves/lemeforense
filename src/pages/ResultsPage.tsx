import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { getMockResults } from '../services/mockApi';
import { Entity } from '../types/entity';

const Container = styled.div`
  max-width: 960px;
  margin: 2rem auto;
  padding: 1rem;
  background: white;
  border-radius: 8px;
`;

const ResultCard = styled.div`
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Tag = styled.span<{ tipo: string }>`
  background: ${({ tipo }) => (tipo === 'empresa' ? '#e0f7fa' : '#e8f5e9')};
  color: ${({ tipo }) => (tipo === 'empresa' ? '#00796b' : '#388e3c')};
  padding: 0.2em 0.7em;
  border-radius: 12px;
  font-size: 0.85em;
  margin-right: 1em;
`;

const Filtros = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  gap: 1rem;
`;

export const ResultsPage: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const term = searchParams.get('q') || '';

  const { data: results = [], isLoading, isError } = useQuery(
    ['results', term],
    () => getMockResults(term),
    {
      enabled: !!term, // Busca só se houver termo
      staleTime: 5 * 60 * 1000,
    }
  );

  // Filtros: ambos ativos por padrão
  const [showPessoas, setShowPessoas] = useState(true);
  const [showEmpresas, setShowEmpresas] = useState(true);

  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);

  // Filtro local
  const filteredResults = results.filter((entity: Entity) => {
    if (entity.tipo === 'empresa' && showEmpresas) return true;
    if (entity.tipo === 'pessoa' && showPessoas) return true;
    return false;
  });

  console.log('Termo pesquisado:', term);
  console.log('Resultados do mock:', results);

  if (isLoading) return <Container>Carregando resultados...</Container>;
  if (isError) return <Container>Erro ao carregar resultados.</Container>;

  return (
    <Container>
      <h1>Consulta de Dados Básicos</h1>
      <Filtros>
        <label>
          <input
            type="checkbox"
            checked={showPessoas}
            onChange={() => setShowPessoas((v) => !v)}
          />
          Pessoas
        </label>
        <label>
          <input
            type="checkbox"
            checked={showEmpresas}
            onChange={() => setShowEmpresas((v) => !v)}
          />
          Empresas
        </label>
      </Filtros>

      {filteredResults.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#888', marginTop: 40 }}>
          <span style={{ fontSize: 32 }}>🔍</span>
          <div>Nenhum resultado encontrado.</div>
        </div>
      ) : (
        filteredResults.map((entity) => (
          <ResultCard key={entity.id}>
            <div>
              <Tag tipo={entity.tipo}>
                {entity.tipo === 'empresa' ? 'Empresa' : 'Pessoa'}
              </Tag>
              <strong>{entity.name}</strong>
              <br />
              <small>
                {entity.cpf || entity.cnpj || 'Sem documento'}
              </small>
            </div>
            <button onClick={() => setSelectedEntity(entity)}>
              Ver detalhes
            </button>
          </ResultCard>
        ))
      )}

      {selectedEntity && (
        <div style={{
          border: '2px solid #1976d2',
          padding: 20,
          marginTop: 20,
          borderRadius: 8,
          background: '#f5faff',
          maxWidth: 600,
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          <h2>Detalhes da entidade</h2>
          {selectedEntity.tipo === 'pessoa' ? (
            <>
              <p><b>Nome:</b> {selectedEntity.name}</p>
              <p><b>CPF:</b> {selectedEntity.cpf}</p>
              <p><b>Sexo:</b> {selectedEntity.sexo}</p>
              <p><b>Data de Nascimento:</b> {selectedEntity.dataNascimento}</p>
              <p><b>Nome da Mãe:</b> {selectedEntity.nomeMae}</p>
              <p><b>Telefones:</b> {selectedEntity.telefones?.join(', ')}</p>
              <p><b>E-mails:</b> {selectedEntity.emails?.join(', ')}</p>
              <p><b>Endereços:</b> {selectedEntity.enderecos?.join('; ')}</p>
            </>
          ) : (
            <>
              <p><b>Nome:</b> {selectedEntity.name}</p>
              <p><b>CNPJ:</b> {selectedEntity.cnpj}</p>
              <p><b>Capital Social:</b> {selectedEntity.capitalSocial}</p>
              <p><b>Data de Início:</b> {selectedEntity.dataInicio}</p>
              <p><b>Situação Cadastral:</b> {selectedEntity.situacaoCadastral}</p>
              <p><b>CNAE principal:</b> {selectedEntity.cnaePrincipal}</p>
              <p><b>Telefones:</b> {selectedEntity.telefones?.join(', ')}</p>
              <p><b>E-mails:</b> {selectedEntity.emails?.join(', ')}</p>
              <p><b>Endereços:</b> {selectedEntity.enderecos?.join('; ')}</p>
              <p><b>Quadro Societário:</b> {selectedEntity.quadroSocietario?.join('; ')}</p>
            </>
          )}
          <button onClick={() => setSelectedEntity(null)} style={{ marginTop: 10 }}>
            Fechar
          </button>
        </div>
      )}
    </Container>
  );
};

export default ResultsPage;
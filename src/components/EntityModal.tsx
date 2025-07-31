// src/components/EntityModal.tsx
import React from 'react';
import styled from 'styled-components';
import { Entity } from '../types/entity';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalBox = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
`;

const Title = styled.h2`
  margin-top: 0;
`;

const CloseButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
`;

interface EntityModalProps {
  entity: Entity;
  onClose: () => void;
}

export const EntityModal: React.FC<EntityModalProps> = ({ entity, onClose }) => {
  if (!entity) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <Title>Detalhes da entidade</Title>
        
        <p><strong>Nome:</strong> {entity.name}</p>

        {entity.type === 'pessoa' ? (
          <>
            <p><strong>CPF:</strong> {entity.cpf}</p>
            <p><strong>Sexo:</strong> {entity.sexo}</p>
            <p><strong>Data de Nascimento:</strong> {entity.dataNascimento}</p>
            <p><strong>Nome da Mãe:</strong> {entity.nomeMae}</p>
            <p><strong>Telefones:</strong> {entity.telefones?.join(', ')}</p>
            <p><strong>E-mails:</strong> {entity.emails?.join(', ')}</p>
            <p><strong>Endereços:</strong> {entity.enderecos?.join('; ')}</p>
          </>
        ) : (
          <>
            <p><strong>CNPJ:</strong> {entity.cnpj}</p>
            <p><strong>Capital Social:</strong> {entity.capitalSocial}</p>
            <p><strong>Data Início Atividades:</strong> {entity.dataInicioAtividades}</p>
            <p><strong>Situação Cadastral:</strong> {entity.situacaoCadastral}</p>
            <p><strong>CNAE Principal:</strong> {entity.cnaePrincipal}</p>
            <p><strong>Telefones:</strong> {entity.telefones?.join(', ')}</p>
            <p><strong>E-mails:</strong> {entity.emails?.join(', ')}</p>
            <p><strong>Endereços:</strong> {entity.enderecos?.join('; ')}</p>
            <p><strong>Quadro Societário:</strong> {entity.quadroSocietario}</p>
          </>
        )}

        <CloseButton onClick={onClose}>Fechar</CloseButton>
      </ModalBox>
    </Overlay>
  );
};

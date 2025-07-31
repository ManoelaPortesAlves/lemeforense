import { Entity } from '../types/entity';

export const getMockResults = async (term: string): Promise<Entity[]> => {
  try {
    // Garante que term é string
    term = typeof term === 'string' ? term : '';
    const response = await fetch('/mock-data.json');
    if (!response.ok) {
      console.error('Erro ao carregar mock-data.json:', response.statusText);
      return [];
    }
    const mock = await response.json();

    const data: Entity[] = Array.isArray(mock.entities) ? mock.entities : [];

    // Se o termo estiver vazio, retorna lista vazia
    if (!term.trim()) return [];

    const lowerTerm = term.toLowerCase();
    const numericTerm = term.replace(/\D/g, '');

    // DEBUG
    console.log('Termo recebido:', term, 'numericTerm:', numericTerm);
    console.log('Dados carregados:', data);

    const result = data.filter((entity) =>
      (entity.name && entity.name.toLowerCase().includes(lowerTerm)) ||
      (entity.cpf && entity.cpf.replace(/\D/g, '').includes(numericTerm)) ||
      (entity.cnpj && entity.cnpj.replace(/\D/g, '').includes(numericTerm)) ||
      (entity.emails && entity.emails.some((e) => e.toLowerCase().includes(lowerTerm))) ||
      (entity.telefones && entity.telefones.some((t) => t.replace(/\D/g, '').includes(numericTerm))) ||
      (entity.enderecos && entity.enderecos.some((end) => end.toLowerCase().includes(lowerTerm)))
    );

    console.log('Resultado do filtro:', result);
    return result;
  } catch (error) {
    console.error('Erro ao buscar dados mock:', error);
    return [];
  }
};
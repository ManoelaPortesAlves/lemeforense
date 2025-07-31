export interface Entity {
  nome: string;
  documento: string;
  tipo: 'Pessoa Física' | 'Empresa';
  email: string;
  telefone: string;
  endereco: string;
}

# Consulta de Dados Básicos

Este projeto é uma aplicação web desenvolvida em **React** e **TypeScript** para consulta de informações essenciais de pessoas físicas e jurídicas, simulando um sistema de busca de dados cadastrais. O objetivo é proporcionar uma experiência intuitiva, rápida e segura para o usuário, com foco em usabilidade e boas práticas de desenvolvimento.

---

## 🚀 Tecnologias Utilizadas

- **React + Vite**  
  Utilizado para criar uma aplicação SPA moderna, com recarregamento rápido e ótima experiência de desenvolvimento. O Vite acelera o processo de build e hot reload.

- **TypeScript**  
  Garante tipagem estática, maior segurança e produtividade no desenvolvimento, reduzindo erros comuns em tempo de execução.

- **React Hook Form + Zod**  
  Para gerenciamento eficiente de formulários e validação robusta dos dados de entrada, garantindo que apenas informações válidas sejam processadas.

- **Styled Components**  
  Permite a criação de componentes de interface com estilos encapsulados, facilitando a manutenção e a escalabilidade do CSS.

- **PrimeReact**  
  Biblioteca de componentes UI rica e acessível, utilizada para modais, tabelas e outros elementos visuais, acelerando o desenvolvimento com padrões visuais profissionais.

- **React Query**  
  Gerencia o estado de dados assíncronos (busca, cache e atualização), tornando a experiência de busca mais fluida e eficiente.

---

## 💡 Funcionalidades

- **Busca Dinâmica**  
  Permite pesquisar entidades por CPF, CNPJ, e-mail, telefone, endereço ou nome, com máscaras e validações automáticas conforme o tipo selecionado.

- **Filtros Avançados**  
  O usuário pode filtrar os resultados por tipo de entidade (Pessoa ou Empresa), tornando a busca mais precisa.

- **Modal de Detalhes**  
  Ao clicar em "Ver detalhes", uma modal exibe todas as informações relevantes da entidade selecionada, diferenciando entre pessoa física e empresa.

- **Histórico de Pesquisas Recentes**  
  Exibe as últimas 10 pesquisas realizadas, facilitando o acesso rápido a consultas anteriores.

- **Mock de Dados**  
  Os resultados são simulados a partir de um arquivo `mock-data.json`, permitindo testes realistas sem necessidade de backend.

---

## 📦 Instalação e Execução

1. **Clone o repositório**
   ```bash
   git clone https://github.com/ManoelaPortesAlves/lemeforense.git
   cd consulta-dados-basicos
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

4. **Acesse no navegador**
   ```
   http://localhost:5173
   ```

---

## 🗂️ Estrutura do Projeto

```
src/
  components/        // Componentes reutilizáveis (Modal, SearchBar, etc)
  pages/             // Páginas principais (Busca, Resultados)
  services/          // Serviços de API mock
  types/             // Tipos TypeScript compartilhados
  App.tsx            // Componente raiz
  main.tsx           // Ponto de entrada da aplicação
public/
  mock-data.json     // Dados simulados para busca
```

---

## 🤝 Contribuição

Sinta-se à vontade para abrir issues ou pull requests! Sugestões de melhorias e correções são sempre bem-vindas.

---

## 📄 Licença

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

---

**Desenvolvido com dedicação para demonstrar boas práticas em React, TypeScript e Vite.**
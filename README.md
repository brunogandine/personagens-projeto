# Dashboard

Dashboard administrativo desenvolvido como projeto de estudo e portfólio, com foco no desenvolvimento Full Stack e na aplicação prática de conceitos de arquitetura, organização de código e desenvolvimento de APIs.

> 🚧 **Projeto em desenvolvimento**
>
> Algumas funcionalidades ainda estão sendo implementadas e a estrutura do projeto pode sofrer alterações conforme o desenvolvimento e o aprendizado de novos conceitos.

## Tecnologias

### Frontend

- React
- TypeScript
- Vite
- Ant Design
- CSS Modules

### Backend

- Node.js
- Express
- TypeScript
- Prisma ORM
- MySQL
- Zod

### Conceitos e práticas

- API REST
- Controllers e Services
- Validação de dados
- Autenticação e autorização
- Relacionamentos entre entidades
- Paginação e busca
- Separação de responsabilidades
- Organização de código
- Git e desenvolvimento baseado em branches

## Sobre o projeto

O projeto consiste em um Dashboard administrativo para gerenciamento de diferentes entidades da aplicação.

Entre as funcionalidades atualmente trabalhadas estão:

- Gerenciamento de animes
- Gerenciamento de personagens
- Criação e edição de personagens
- Upload e tratamento de imagens
- Preview de personagens
- Paginação
- Busca de registros
- Controle de acesso
- Validação de dados
- Comunicação entre frontend e backend

O projeto também serve como ambiente de estudo para aplicar e aprofundar conhecimentos de desenvolvimento Full Stack, arquitetura de software e organização de aplicações.

## Arquitetura

A aplicação possui uma separação entre frontend e backend.

No backend, as responsabilidades são distribuídas entre diferentes partes da aplicação, evitando concentrar regras de negócio e comunicação HTTP em um único lugar.

De forma simplificada:

```text
Request
   ↓
Route / Middleware
   ↓
Controller
   ↓
Service
   ↓
Prisma
   ↓
MySQL
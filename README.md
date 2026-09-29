# Dashboard

Dashboard administrativo desenvolvido como projeto de estudo e portfólio, com foco no desenvolvimento Full Stack e na aplicação prática de arquitetura, organização de código, APIs REST e desenvolvimento de interfaces administrativas.

> 🚧 **Projeto em desenvolvimento**
>
> O projeto continua em desenvolvimento e novas funcionalidades e melhorias serão adicionadas conforme a evolução da aplicação.

## Tecnologias

### Frontend

* React
* TypeScript
* Vite
* Ant Design
* CSS Modules
* React Easy Crop

### Backend

* Node.js
* Express
* TypeScript
* Prisma ORM
* MySQL
* Zod
* Multer

### Conceitos e práticas

* API REST
* Controllers e Services
* Validação de dados
* Autenticação e autorização
* Controle de acesso baseado em funções
* Relacionamentos entre entidades
* Paginação e busca
* Upload e processamento de imagens
* Soft delete e restauração
* Separação de responsabilidades
* Organização de código
* Git e desenvolvimento baseado em branches

## Funcionalidades

### Dashboard

* Página inicial administrativa
* Navegação entre áreas do sistema
* Controle de acesso às áreas administrativas

### Usuários

* Gerenciamento de usuários
* Visualização de informações dos usuários
* Controle de status e permissões
* Gerenciamento de avatar
* Upload, recorte e remoção de imagens

### Animes

* Listagem de animes
* Paginação
* Busca
* Criação de animes
* Edição de animes
* Upload e recorte do símbolo do anime
* Remoção de imagem
* Soft delete
* Restauração
* Controle de disponibilidade

### Personagens

* Listagem de personagens
* Paginação
* Busca
* Criação de personagens
* Edição de personagens
* Edição de atributos base
* Edição de descrição
* Alteração do anime relacionado
* Upload e recorte de artwork e thumbnail
* Remoção de imagens
* Soft delete
* Restauração
* Controle de disponibilidade
* Representação visual de personagens afetados pela remoção do anime relacionado

### Imagens

* Upload de imagens
* Validação de arquivos
* Recorte de imagens
* Preview antes do envio
* Remoção de imagens
* Controle de cache das imagens após alterações

## Arquitetura

A aplicação possui uma separação entre frontend e backend.

No backend, as responsabilidades são distribuídas entre diferentes camadas, evitando concentrar regras de negócio, acesso ao banco de dados e comunicação HTTP em um único lugar.

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
```

Os Controllers são responsáveis pelo fluxo HTTP da requisição e resposta, enquanto os Services concentram regras de negócio e operações relacionadas às entidades. O acesso ao banco de dados é realizado através do Prisma.

No frontend, a aplicação é organizada em páginas, componentes, contextos, serviços e módulos de estilo, mantendo a interface separada da comunicação com a API e das regras específicas de cada funcionalidade.

## Estrutura

O projeto é dividido em duas aplicações principais:

```text
/
├── frontend/
│   └── React + TypeScript + Vite
│
└── backend/
    └── Express + TypeScript + Prisma
```

## Known Issues

O projeto possui algumas limitações conhecidas que não impedem o funcionamento dos fluxos principais.

* **Formato das imagens de Anime:** as imagens processadas pelo backend são armazenadas como `.png`, enquanto o `ContentItem` atualmente espera uma imagem `.jpg`. Para testes, a imagem gerada pode ser renomeada de `.png` para `.jpg` após o upload.
* **Seleção de Anime na edição de Character:** o dropdown de Anime utiliza a mesma lista paginada da página de Animes e, atualmente, fica limitado aos Animes carregados na página atual.

Essas limitações estão registradas nas [Issues](../../issues) do repositório e serão corrigidas posteriormente.

## Estado atual

Atualmente, as principais áreas do Dashboard já possuem funcionalidades implementadas, incluindo o gerenciamento de usuários, animes e personagens.

O gerenciamento de conteúdo conta com criação, edição, exclusão lógica e restauração, além dos fluxos relacionados a imagens.

O projeto continua em desenvolvimento, e novas funcionalidades, melhorias de arquitetura e ajustes de interface serão adicionados posteriormente.

## Objetivo

O projeto tem como objetivo servir como ambiente de estudo e portfólio para consolidar conhecimentos de desenvolvimento Full Stack, incluindo:

* Desenvolvimento de aplicações React com TypeScript
* Desenvolvimento de APIs REST com Express
* Modelagem e relacionamento de dados com Prisma e MySQL
* Autenticação e autorização
* Validação de dados
* Upload e processamento de imagens
* Organização arquitetural
* Desenvolvimento e manutenção de aplicações utilizando Git

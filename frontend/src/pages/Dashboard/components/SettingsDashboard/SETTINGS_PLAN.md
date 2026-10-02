# Plano — Dashboard Settings

## Objetivo

A área de Settings será responsável por configurações administrativas e operacionais do sistema.

A página será organizada em **categorias**, e cada categoria possuirá vários **wrappers**, onde cada wrapper representa uma configuração ou conjunto pequeno de configurações relacionadas.

Estrutura conceitual:

```text
Categoria
├── Wrapper / configuração
│   ├── opção
│   └── opção
├── Wrapper / configuração
│   └── opção
└── Wrapper / configuração
    └── opção
```

A ideia é permitir que o administrador percorra a página verticalmente e encontre as configurações agrupadas por assunto.

---

# 1. Sistema

Configurações gerais do funcionamento do sistema.

## 1.1 Modo de Manutenção

### Objetivo

Impedir o acesso de usuários comuns ao sistema durante períodos de manutenção.

### Configurações

* **Modo de manutenção**

  * Ativado / Desativado

* **Mensagem de manutenção**

  * Texto exibido aos usuários durante a manutenção.
  * Possui contador de caracteres.
  * Limite atual: 300 caracteres.

### Possíveis configurações futuras

* **Permitir acesso de administradores**

  * Permite que administradores continuem acessando o sistema durante a manutenção.

* **Título da página de manutenção**

  * Texto exibido como título durante a manutenção.

> Não adicionar essas opções apenas para preencher espaço. Implementar quando houver necessidade real.

---

## 1.2 Avisos do Sistema

### Objetivo

Permitir a exibição de avisos gerais aos usuários sem caracterizar o sistema como estando em manutenção.

### Configurações planejadas

* **Exibir aviso**

  * Ativado / Desativado

* **Mensagem do aviso**

  * Texto exibido aos usuários.
  * Deve possuir contador de caracteres.

Possíveis usos:

* avisos informativos;
* mudanças no sistema;
* comunicados temporários;
* avisos sobre funcionalidades.

---

# 2. Sessões e Segurança

Configurações relacionadas à autenticação e ao ciclo de vida das sessões.

## 2.1 Sessão dos Usuários

### Objetivo

Melhorar o gerenciamento das sessões HTTP atualmente utilizadas pelo sistema.

### Situação atual

O sistema utiliza:

* sessão armazenada no backend;
* tabela `UserSession`;
* cookie `session_token`;
* cookie `HttpOnly`;
* validade atual de 15 minutos.

Atualmente, a sessão expira após o período definido, mesmo que o usuário continue utilizando o sistema.

### Implementação planejada

Migrar para **sliding session / idle timeout**.

A sessão continuará tendo 15 minutos de validade, mas esse período será renovado enquanto houver atividade do usuário.

Exemplo:

```text
Login
  ↓
15 minutos de validade
  ↓
usuário continua fazendo requisições
  ↓
sessão próxima da expiração
  ↓
renovação
  ↓
+15 minutos
```

Se o usuário ficar inativo por 15 minutos:

```text
última requisição
      ↓
15 minutos sem atividade
      ↓
sessão expira
```

### Threshold de renovação

Não renovar a sessão em toda requisição.

Quando uma requisição autenticada chegar ao backend, verificar quanto tempo resta para `expiresAt`.

Exemplo:

```text
Sessão: 15 minutos
Threshold: 5 minutos

> 5 minutos restantes
→ não renovar

≤ 5 minutos restantes
→ renovar por mais 15 minutos
```

O threshold é uma condição verificada pelo servidor durante requisições reais. Não será necessário criar um timer no frontend.

### Melhorias futuras de segurança

Avaliar também:

* duração máxima absoluta da sessão;
* rotação do identificador da sessão;
* revisão de `Secure`;
* `SameSite`;
* `Path`;
* demais atributos do cookie.

---

## 2.2 Acesso

### Configurações planejadas

* **Permitir múltiplas sessões**

  * Permitir que o mesmo usuário tenha sessões ativas em diferentes dispositivos.

* **Número máximo de sessões**

  * Limitar a quantidade de sessões simultâneas por usuário.

> Só implementar opções que realmente forem suportadas pelo backend.

---

# 3. Usuários

Configurações relacionadas ao comportamento geral dos usuários.

## 3.1 Registro de Usuários

Possíveis configurações:

* **Permitir novos registros**
* **Exigir confirmação de e-mail**

Essas opções só devem existir quando houver suporte real no sistema.

---

## 3.2 Perfil

Possíveis configurações:

* **Avatar padrão**
* **Permitir alteração de avatar**

Não transformar regras específicas do sistema em configurações apenas para aumentar a quantidade de opções.

---

# 4. Conteúdo

Configurações relacionadas aos conteúdos administrados pelo dashboard.

## 4.1 Animes

Possíveis configurações futuras:

* comportamento padrão de novos animes;
* disponibilidade inicial;
* outras regras administrativas que realmente precisem ser configuráveis.

## 4.2 Personagens

Não transformar os valores de atributos dos personagens em Settings neste momento.

### Não fazer

Não criar configurações como:

```text
HP padrão
ATK padrão
DEF padrão
HP mínimo
HP máximo
ATK mínimo
ATK máximo
DEF mínimo
DEF máximo
```

### Motivo

Esses valores atualmente são regras da aplicação.

Eles existem em diferentes pontos do sistema, incluindo:

* validações Zod;
* frontend;
* lógica de criação.

Transformá-los em configurações editáveis exigiria uma mudança arquitetural para que uma única fonte de verdade fosse consumida pelo backend e frontend.

Por enquanto, manter esses valores como regras de código.

---

# 5. Auditoria

Categoria planejada para registrar ações administrativas.

## 5.1 Registro de Ações

Possíveis configurações:

* **Registrar ações administrativas**
* **Registrar alterações de conteúdo**

## 5.2 Retenção

Possível configuração:

* **Tempo de retenção dos registros**

Implementar somente quando existir o sistema de auditoria correspondente.

---

# Ordem planejada

A implementação não precisa seguir toda a lista imediatamente.

### Já iniciado

* [x] Estrutura visual da página Settings
* [x] Categoria **Sistema**
* [x] Wrapper **Modo de Manutenção**
* [x] Ativação/desativação do modo de manutenção
* [x] Mensagem de manutenção
* [x] Contador visual da mensagem

### Próximo trabalho

* [ ] Finalizar visualmente a categoria Sistema
* [ ] Avaliar/implementar **Avisos do Sistema**
* [ ] Criar categoria **Sessões e Segurança**
* [ ] Implementar sliding session
* [ ] Testar idle timeout
* [ ] Avaliar absolute timeout
* [ ] Avaliar rotação de sessão
* [ ] Depois transformar as opções realmente necessárias em configurações persistentes

### Depois

* [ ] Usuários
* [ ] Conteúdo
* [ ] Auditoria

---

# Princípios da área de Settings

## 1. Configuração precisa representar comportamento real

Não adicionar uma opção somente porque ela parece interessante visualmente.

Se existe um controle no Settings, o sistema deve realmente consumi-lo.

## 2. Não transformar regras de código em configuração sem necessidade

Valores como atributos base de personagens continuam sendo regras da aplicação enquanto não houver necessidade de torná-los dinâmicos.

## 3. Uma configuração deve ter uma fonte de verdade

Evitar situações em que o mesmo valor exista independentemente em:

```text
Frontend
Zod
Service
Settings
Banco
```

Se uma configuração se tornar dinâmica, definir uma fonte central e fazer as outras partes consumirem essa configuração.

## 4. Settings deve controlar comportamento administrativo

A página deve concentrar configurações que fazem sentido para quem administra o sistema, e não simplesmente expor constantes internas.

## 5. Implementar primeiro, configurar depois

Uma funcionalidade deve existir e estar funcionando antes de ser transformada em uma configuração administrativa.

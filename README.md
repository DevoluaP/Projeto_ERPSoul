# ERP Soul
Este repositório contém o projeto `ERP Soul`, um sistema ERP completo com front-end e back-end, desenvolvido para facilitar a gestão de informações em um ambiente corporativo.


## Tecnologias Usadas
- HTML
- CSS
- JavaScript
- React
- Node.js
- Express.js
- Bcrypt
- MySQL para o banco de dados.


## Funcionalidades

### Gestão de Usuários
- Sistema completo de autenticação (cadastro, login e logout)
- Alteração de senha
- Personalização de perfil com nome e foto

### Gestão de Clientes
- Cadastro completo de clientes
- Listagem e visualização de clientes cadastrados
- Geração de relatórios de clientes

### Gestão Comercial
- **Vendas**: Registro e acompanhamento de vendas realizadas
- **Produtos**: Controle de estoque e catálogo de produtos
- **Serviços**: Cadastro e gerenciamento de serviços oferecidos

### Relatórios
- Relatórios detalhados de vendas
- Relatórios de produtos e estoque
- Relatórios de serviços prestados
- Relatórios de clientes

### Gestão Financeira
- Cadastro e controle de contas a pagar/receber
- Baixar relatório de contas a pagar/receber
- Emissão de notas fiscais


## Estrutura do Projeto
O projeto é dividido em duas pastas principais:

* `client`: Contém o front-end desenvolvido com React.
* `server`: Contém o back-end desenvolvido com Node.js.


## Configuração Inicial

### Pré-requisitos
Certifique-se de ter as seguintes ferramentas instaladas:

* [Node.js](https://nodejs.org) (para rodar o back-end)
* [Git](https://git-scm.com) (para clonar o repositório)
* [XAMPP](https://www.apachefriends.org/) ou [WAMP](https://www.wampserver.com/) (para rodar o servidor MySQL)


### Passos para Instalação

1. Clone o repositório do GitHub:

```
git clone https://github.com/DevoluaP/Projeto_ERPSoul.git
```

2. Instale as dependências:

```bash
cd Projeto_ERPSoul
```
```bash
npm run install
```

3. Configure o Banco de Dados:

**Inicie o XAMPP/WAMP** e ative os módulos **Apache** e **MySQL**.

No terminal, execute os comandos:
```bash
cd server
```
```bash
npm run setup
```


## Testando a Aplicação

1. **Verifique se o MySQL está rodando**:
   - Abra o XAMPP/WAMP Control Panel
   - Certifique-se que o módulo MySQL está com status "Running" (verde)

2. **Inicie o back-end**:
```bash
   cd server
```
```bash
   npm start (ou npm run dev)
```
   - Você deve ver:
   `Conectado ao pool de conexões MySQL!`
   `Servidor rodando na porta 5000`

3. **Inicie o front-end**:
```bash
   cd client
```
```bash
   npm start
```
   - Abra http://localhost:3000 para visualizar no navegador.

4. **Usuário para testar**:
   - Email: teste@erpsoul.com
   - Senha: 123456

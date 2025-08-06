# ERP Soul

Este repositório contém o projeto `ERP Soul`, um sistema ERP completo com front-end e back-end, desenvolvido para facilitar a gestão de informações em um ambiente corporativo.

## Estrutura do Projeto

O projeto é dividido em duas pastas principais:

* `client`: Contém o front-end desenvolvido com React.
* `server`: Contém o back-end desenvolvido com Node.js.

## Configuração Inicial

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

* [Node.js](https://nodejs.org) (para rodar o back-end)
* [Git](https://git-scm.com) (para clonar o repositório)

### Passos para Instalação

1. Clone o repositório do GitHub:

```
git clone https://github.com/DevoluaP/Projeto_ERPSoul.git
cd Projeto_ERPSoul
```

2. Instale as dependências para o back-end e front-end:

* **Back-end**:

```
cd server
npm install
```

* **Front-end**: Abra outro terminal na raiz do projeto e execute:

```
cd client
npm install
```

## Script Disponíveis

Após a instalação, você pode iniciar o front-end e o back-end com os seguintes comandos:

### Back-end (server)

Na pasta `server`, você pode rodar:

* `npm start`: Inicia o servidor em modo de desenvolvimento.

* `npm run dev`: Inicia o servidor usando o `nodemon` para recarregar automaticamente em caso de mudanças (necessita do `nodemon` instalado globalmente ou como dependência de desenvolvimento).

### Front-end (client)

Na pasta `client`, você pode rodar:

* `npm start`: Inicia o aplicativo React em modo de desenvolvimento.
Abra http://localhost:3000 para visualizar no navegador.

## Contribuindo

Para contribuir com o `ERP Soul`, siga as seguintes etapas:

1. Crie uma nova branch para suas alterações:

```
git checkout -b minha-nova-feature
```

2. Faça commit das suas alterações:

```
git commit -m "Descrição das alterações"
```

3. Envie para o repositório:

```
git push origin minha-nova-feature
```

4. Abra um Pull Request no GitHub.

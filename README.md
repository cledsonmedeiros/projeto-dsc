# ToDoApp
<p align="center">Aplicação simples ToDoList multiusuário</p>

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Node.js](https://nodejs.org/en/) e [PostgreSQL](https://www.postgresql.org/).

### 🎲 Clonando o repositório
```bash
# Clone este repositório
$ git clone https://github.com/cledsonmedeiros/projeto-dsc.git
```
Após instalar as ferramentas e clonar o repositório, crie um banco de dados com o nome `todo_api` e configure os campos `DB_USER` e `DB_PASS` de acordo com o seu banco de dados local no arquivo `.env` dentro da pasta `backend`

### 🎲 Rodando o Backend (servidor)
```bash

# Acesse a pasta do backend
$ cd projeto-dsc/backend/

# Utilize a versão do Node.JS v14.15.1 a qual foi desenvolvida esse projeto
# Instale manualmente ou se utilizar o nvm use o comando
$ nvm use

# Instale as dependências
$ yarn ou npm i

# Execute a aplicação em modo de desenvolvimento
$ yarn dev ou npm run dev

# O servidor iniciará na porta definida do arquivo .env ou 3000. Acesse http://localhost:3000
# Se tudo ocorrer bem, você terá o retorno {"msg":"TODO API"}
```

### 💁‍ Para o professor

#Crie um usuário no endpoint http://localhost:3000/user, passando os seguintes parâmetros: "name", "username", "password". Todos do tipo string. Exemplo:
{
	"name": "Gustavo Sizilio",
	"username": "gustavo",
	"password": "12345678"
}

Todas as rotas do sistema estão protegidas e precisam de um jwt token para ser acessadas, exceto a rota de cadastro.


### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [PostgreSQL](https://www.postgresql.org/)
- [Node.js](https://nodejs.org/en/)
- [TypeORM](https://typeorm.io/#/)
- [TypeScript](https://www.typescriptlang.org/)


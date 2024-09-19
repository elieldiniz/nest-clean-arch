# README.md

## Descrição

Este projeto foi iniciado utilizando o framework **NestJS**, que oferece uma arquitetura modular e escalável para construção de aplicações server-side eficientes. Abaixo estão os passos para configurar, instalar dependências e executar o projeto.

---

## Pré-requisitos

Antes de iniciar, certifique-se de ter os seguintes softwares instalados:

- [Node.js](https://nodejs.org/en/) (versão 16.x ou superior)
- [npm](https://www.npmjs.com/) (gerenciador de pacotes do Node.js)
- [Docker](https://www.docker.com/) (para rodar containers, opcional)

---

## Instalação

### 1. Instalar o CLI do NestJS
```bash
npm i -g @nestjs/cli
```

### 2. Criar o projeto
```bash
nest new project-name
```

### 3. Instalar o Fastify para performance otimizada
```bash
npm i --save @nestjs/platform-fastify
```

Para mais informações sobre como utilizar o Fastify com NestJS, consulte a [documentação oficial](https://docs.nestjs.com/techniques/performance).

### 4. Configurar variáveis de ambiente

Instalar o módulo de configuração:
```bash
npm install @nestjs/config
```

Criar o módulo para gerenciar as variáveis de ambiente:
```bash
nest g module shared/infrastructure/env-config
```

### 5. Instalar a biblioteca Faker para testes
```bash
npm install @faker-js/faker --save-dev
```

O Faker gera dados fictícios para testes de unidade, performance e simulação de cenários.

### 6. Instalar o Bcrypt para segurança
```bash
npm install bcrypt
npm install -D @types/bcryptjs
```

Bcrypt é utilizado para fazer hash seguro de senhas.

### 7. Configurar o Prisma ORM

Instalar as dependências do Prisma:
```bash
npm install prisma -D
npm install @prisma/client
```

Gerar o schema do banco de dados:
```bash
npx prisma generate --schema ./src/shared/infrastructure/database/prisma/schema.prisma
```

Executar migrações:
```bash
npx dotenv-cli -e .env.development -- npx prisma migrate --schema ./src/shared/infrastructure/database/prisma/schema.prisma
```

### 8. Configurar Docker para PostgreSQL

Rodar o container do PostgreSQL:
```bash
docker run -e POSTGRES_PASSWORD=password123 -e POSTGRES_USER=postgres -p 5432:5432 -d nest-clean-arch-db:latest
```

---

## Executando o Projeto

Para rodar a aplicação, utilize o seguinte comando:
```bash
npm run start
```

---

## Contribuições

Contribuições são bem-vindas! Siga os padrões de código e certifique-se de que seus commits e pull requests estejam de acordo com as diretrizes do projeto.

---

## Licença

Este projeto é licenciado sob a [MIT License](LICENSE).

---

**Documentação adicional:**
- [NestJS](https://docs.nestjs.com/)
- [Prisma ORM](https://www.prisma.io/docs)
- [Docker](https://www.docker.com/)

---

**Autor:** [Eliel Diniz]


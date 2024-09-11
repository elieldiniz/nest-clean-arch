aplicação iniciada com  npm i -g @nestjs/cli

criando projeto com:  nest new project-name

informaços sobre nest e instalação https://docs.nestjs.com/first-steps

---
rotas com com fastify npm i --save @nestjs/platform-fastify

https://docs.nestjs.com/techniques/performance

---

Módulo de configuração para Nest baseado no pacote dotenv (para carregar variáveis ​​de ambiente de processo)

npm install @nestjs/config configiurar variavel de anbiente

---
Crindo a past env-config para variaveis de anbiente
nest g module shaterd/infrastructure/env-config

---
utlizando a biblioteca fakers para test
Faker é uma biblioteca popular que gera dados falsos (mas razoáveis) que podem ser usados ​​para coisas como:Teste de unidade ,Teste de performance
Construindo demonstrações
Trabalhando sem um backend completo
npm install @faker-js/faker --save-dev

---
npm install bcrypt
npm install -D @types/bcryptjs

Bcrypt é um algoritmo de hash unidirecional popularmente utilizado para armazenar senhas de forma segura em sistemas computacionais. Ao invés de armazenar a senha em texto plano, que poderia ser facilmente comprometida em caso de vazamento de dados, o bcrypt gera uma representação criptografada (hash) da senha.

---

prisma ORM:
Prisma ORM é um ORM Node.js e TypeScript de última geração que desbloqueia um novo nível de experiência do desenvolvedor ao trabalhar com bancos de dados graças ao seu modelo de dados intuitivo, migrações automatizadas, segurança de tipos e preenchimento automático.

npm install prisma -D -desenvolvimento
npm install @prisma/client dependecia do projeto

criar schema user e typagen node module :  npx prisma generate --schema ./src/shared/infrastructure/database/prisma/schema.prisma

---



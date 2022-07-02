# Projeto BlogsAPI!

Um Projeto feito no Curso da [Trybe!](https://www.betrybe.com/?utm_source=google&utm_medium=cpc&utm_campaign=pmax2&utm_content=ad1&gclid=CjwKCAjwv-GUBhAzEiwASUMm4gMsCoYbJWRZ4clNLOZqEP2NE69bHKEUuKKfcouMLG1L4MSPbR71CRoCHiYQAvD_BwE)

## Descrição
BlogsAPI é uma aplicação BackEnd em NodeJS que permiti você interagir diretamente com o banco de dados. Possibilitando interagir com o banco de dados página de blog.
 
Essa Aplicação Permite:

-  Ter uma experiência de estar criado posts para seu blog, editala-los ou remove-los;
-  Adição e exclusão de qualquer produto ou post ou usuário;

## Tecnologias Usadas

> Desenvolvida utilizando: JavaScript, NodeJS, expres, express-async-errors, Docker, Sequelize.

# Como Utilizar

## Você pode escolher utilizar Docker ou Não.

<details>
  <summary><strong>🐳 Usando Docker</strong></summary><br />
 
  > Rode os serviços `node` e `db` com o comando `docker-compose up -d`.
  - Lembre-se de parar o `mysql` se estiver usando localmente na porta padrão (`3306`), ou adapte, caso queria fazer uso da aplicação em containers;
  - Esses serviços irão inicializar um container chamado `blogs_api` e outro chamado `blogs_api_db`;
  - A partir daqui você pode rodar o container `blogs_api` via CLI ou abri-lo no VS Code.

  > Use o comando `docker exec -it blogs_api bash`.
  - Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

  > Instale as dependências [**Caso existam**] com `npm install`
  <br />
</details>

<details>
  <summary><strong>😀 Sem Docker</strong></summary><br />
 
  > Instale as dependências [**Caso existam**] com `npm install`

  ⚠ Atenção ⚠ Não rode o comando npm audit fix! Ele atualiza várias dependências do projeto, e essa atualização gera conflitos com o avaliador.

  ✨ **Dica:** Para rodar o projeto desta forma, obrigatoriamente você deve ter o `node` instalado em seu computador.

  ✨ **Dica:** O avaliador espera que a versão do `node` utilizada seja a 16.
  <br />
</details>

# Como Conectar ao Banco

<details>
  <summary><strong>🎲 Conexão com o Banco</strong></summary><br />

## Crie o Banco

:warning: **IMPORTANTE!**
**A senha do Banco é Password**

```javascript
require('dotenv').config(); // não se esqueça de configurar suas variáveis de ambiente aqui na configuração

  const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE || 'StoreManager',
});
```

Para os testes rodarem corretamente, na raiz do projeto **renomeie o arquivo `.env.example` para `.env`** com as variáveis de ambiente. Por exemplo, caso o seu usuário SQL seja `nome` e a senha `1234` seu arquivo ficará desta forma:

```
MYSQL_HOST=localhost
MYSQL_USER=nome
MYSQL_PASSWORD=1234
MYSQL_DATABASE=blogs-api
PORT=3000
```

##### :warning: Atenção

- **Variáveis de ambiente além das especificadas acima não são suportadas, pois não são esperadas pelo avaliador do projeto.**

- A variável **PORT** do arquivo `.env` deve ser utilizada para a conexão com o servidor.

Com essas configurações, enquanto estiver na máquina local, o banco será executado normalmente via localhost (possibilitando os testes via `npm test`).
Como o arquivo `.env` não será enviado para o GitHub (não se preocupe com isso, pois já está configurado no `.gitignore`), use o arquivo  `.envDev`. Ela está pronta. Caso queira mudar algo, sinta-se avontade.
  <br />
</details>

## Como Testar Os Caminhos - Exemplos

> Alguns precisaram de informações adicionais no body da requisição.

<details>
  <summary><strong>Criar Posts</strong></summary><br />
  Você precisa da autorização.
  No produto, isso vem atrávez do token.
  A authorização é dada para todo user quando se cria o email ou requesita.
  Coloque na aba de *headers* com o nome: "Authorization";
  
  > Pegar todos os Posts **GET**
``
http://localhost:3000/post``

> Pegar Posts pelo ID **GET**. Precisa ser um ID que exista. Se não retornará um erro!
``http://localhost:3000/post/2``


> Criar novos Posts **POST**
`[http://localhost:3000/post``

```
  {
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key"
  } 
```

> Editar um Produto **PUT**. Você precisa passar um id existente!
``http://localhost:3000/products/4``

```
  {
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key"
  }
```

> Deletar um Post **Delete**. Você precisa passar um id existente!
``http://localhost:3000/products/4``
 
  <br />
</details>


<details>
  <summary><strong>Criar Categoria</strong></summary><br />
  Você precisa da autorização.
  No produto, isso vem atrávez do token.
  A authorização é dada para todo user quando se cria o email ou requesita.
  Coloque na aba de *headers* com o nome: "Authorization";
  
  > Criar uma nova categoria **POST**
``http://localhost:3000/categories``

```
 {
   "name": "Typescript"
 }
```

> Pegar todas as categorias **GET**
``http://localhost:3000/categories``

  <br />
</details>

<details>
  <summary><strong>Criar Usuários</strong></summary><br />
  
  > Criar um novo user **POST**
``http://localhost:3000/user``

```
  {
    "displayName": "mario fernando",
    "email": "testando@email.com",
    "password": "123446",
    "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
  } 
```

> Logar como usuário **POST**
``http://localhost:3000/login``

```
  {
    "email": "lewishamilton@gmail.com",
    "password": "123456"
  },
```

  <br />
</details>

## Iniciar a aplicação

> Você pode usar esse comando no terminal para iniciar a aplicação. O Console do terminal dirá em qual porta ele está usando. 

> Caso Possua algum erro e a aplicação não inicie: "A porta pode estar sendo utilizada. Teste o comando ``killall node``. 
> Mas cuidado, ele ira derrubar qualquer aplicação node".

> Veja também se o docker não foi fechado corretamente e esta usando a porta. Você pode simplismente reiniciar o container

``npm start``



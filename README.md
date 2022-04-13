
# <b style="color: #523"> Dev Hub</b>  ![Icone](screenshots/favicon.png) <div style="color: red; opacity: 0.56; font-size: 1rem"> Readme em construção </div>


## Descrição
Projeto de rede social para desenvolvedores

## Requisitos e Instalação
- Ter no ambiente uma versão do NODE instalado na versão 16.13 para cima.
- .env preenchido de acordo com o envexamples
- rodar o comando ```bash $ npm install ```

## Como rodar o aplicativo

```bash
# Em desenvolvimento 
$ npm run start

# Em modo assistido
$ npm run start:dev

# Modo de produção
$ npm run start:prod
```

## Testes 

```bash
# Testes unitários
$ npm run test

# Testes E2E
$ npm run test:e2e

# Teste com cobertura
$ npm run test:cov
```


## Prisma Commands
- prisma db push (generate tables by schema)
- prisma generate ( update prisma client api)

## Deploy
- Deploy automático pela Heroku, na branch master.
- Por enquanto sem pipeline de testes
- Envs setadas pelo Dashboard da Heroku
- Link https://devhub-api-oficinas3.herokuapp.com/
## Links
- https://github.com/JVBorges/devhub ( Repositório do aplicativo mobile)
- https://github.com/FelipeJhordan/skills-and-extras/blob/main/design-patterns/typescript_GoF_praticas/src/structural/composite/anottations.md ( Explicação Composite  )
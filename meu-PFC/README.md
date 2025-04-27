# MeuPFC

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.7.


Com o objetivo de auxiliar alunos da gradução, o trabalho busca implementar uma biblioteca de PFC's/TCCs (projetos finais e trabalhos de conclusão de curso) em forma de web app.
Features:
  - Autenticação
    - Log(in/out), sign up, reset password, change password
  - Perfil básico do usuário
    - Página com nome completo e TCC (caso publicado)
  - Os usuários devem ser capazes de postar e deletar o próprio trabalho
    - Limite de um trabalho por usuário
    - O post deve conter o título do trabalho, curso, ano de publicação, nome do orientador e autor
  - Os usuário devem ser capazes de pesquisar por trabalhos por meio do
      - Título
      - Curso
      - Ano
      - Professor orientador
      - Autor
  - Os usuário devem poder visualizar e baixar os trabalhos de interesse
  - Interface amigável com design a ser decidido (netflix, steam etc etc..)
   
Membros e funções: 
- Lucas Werlang - Full stack
- Lucas Kou Kinoshita - Full stack
- Pollyanny Junia Brandao - Full stack
- Filipe Ribeiro - Full stack

Stack:
- Front-end
  - Angular v19
- Back-end
  - Firebase 


## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.






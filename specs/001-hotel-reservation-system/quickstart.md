# Quickstart: Listagem e Cadastro de Reservas

## Pré-requisitos

- Node.js 20.19 ou superior e npm.
- Terminal aberto na raiz do repositório.

## Instalação

```cmd
cd sdd-jp
npm install
```

## Executar

Abra dois terminais, ambos na pasta `sdd-jp`.

Terminal 1, iniciar a API de demonstração:

```cmd
npm run api
```

Terminal 2, iniciar o front-end:

```cmd
npm run dev
```

Abra `http://localhost:5173`. A API fica em `http://localhost:3000`; os dados iniciais estão em `db.json` na raiz.

## Testes automatizados e verificações

Na pasta `sdd-jp`, execute:

```cmd
npm test
npm run lint
npm run build
```

Os testes automatizados não exigem JSON Server ativo; as respostas HTTP são controladas nos testes. O cenário manual abaixo verifica a integração real.

## Cenários de aceitação manuais

1. Com os dois processos ativos, confirme que a página exibe os quartos e solicitações de `db.json`.
2. Tente cadastrar com saída igual à entrada ou pessoas acima da capacidade; o formulário deve indicar o campo inválido e não enviar a solicitação.
3. Envie uma solicitação válida; ela deve receber `SOLICITADA` e aparecer uma única vez na lista.
4. Pare o JSON Server e recarregue a página; a falha deve ser informada e deve existir uma ação para tentar novamente. Reinicie o servidor e repita a tentativa.
5. Com a página já carregada, pare o JSON Server, preencha o formulário e envie; a falha deve ser informada sem limpar os campos. Reinicie a API e envie novamente.

Esses cenários registram uma solicitação demonstrativa. Não representam confirmação de disponibilidade ou de hospedagem.

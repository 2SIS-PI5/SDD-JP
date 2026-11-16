 # quickstart.md

Pré-requisitos
- Node.js (>=16), npm
- (Opcional) Backend Spring Boot rodando em http://localhost:8080

Frontend (sdd-jp)
1. Instalar dependências
   cd C:\Users\Patri\OneDrive - SPTech School\Documentos\4Bimestre\front_end\react\atividades\SDD-JP\sdd-jp
   npm install

2. Instalar bibliotecas recomendadas
   npm install react-router-dom axios
   npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init -p

3. Rodar em modo desenvolvimento
   npm run dev

4. Configurar base da API
   No arquivo src/services/api.js, configurar baseURL para http://localhost:8080/api
   Implementar fallback mock (em memória ou json-server) quando o back-end não estiver disponível.

Cenários de validação
- Cenário A (com back-end): Inicie o back-end local, inicie o frontend, registre um usuário, efetue login, pesquise quartos para datas disponíveis, crie uma reserva, simule pagamento, confirme a reserva, marque a estadia como concluída (no back-end) e envie uma avaliação.
- Cenário B (mock): Inicie o frontend em modo mock e execute os mesmos fluxos para validar a UI e comportamentos do cliente.

Resultados esperados
- Frontend servido em http://localhost:5173 (padrão Vite).
- Chamadas à API funcionam contra o back-end ou mock; o fluxo de reserva retorna código de confirmação; a simulação de pagamento atualiza estados; avaliações são aceitas apenas após estadias concluídas.

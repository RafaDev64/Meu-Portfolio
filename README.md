# Sistema de Vistorias Interno - Vistoria Cautelar SP

![Logo](https://via.placeholder.com/150?text=VC) <!-- logo -->

## Descrição do Projeto

Este repositório contém o sistema web interno para gerenciamento de vistorias cautelares da empresa **Vistoria Cautelar SP**. O sistema suporta três níveis de acesso (Admin, Gestor, Vistoriador), com interface responsiva, temas claro/escuro persistentes via localStorage, e funcionalidades de autenticação, gerenciamento de vistorias e usuários, relatórios, e configurações. O foco é em uma experiência intuitiva, com suporte a atualizações em tempo real (simuladas no frontend; backend sugerido para produção).

O projeto foi desenvolvido com base em HTML5, CSS3 e JavaScript puro para simplicidade, com sugestões para escalar com frameworks como React ou Vue.js. Para produção, integrar backend (Node.js + Express + Socket.IO ou Firebase) para autenticação segura, persistência de dados e comunicação em tempo real.

## Objetivo

Desenvolver um sistema para gerenciar vistorias, com autenticação, controle de perfis, e sincronização em tempo real de alterações (ex.: novas vistorias atribuídas aparecem imediatamente no painel do vistoriador).

## Funcionalidades Principais

### Autenticação de Usuários
- Tela de login com email e senha.
- Controle de sessão via localStorage (simulado; usar JWT ou cookies para produção).
- Redirecionamento para dashboard com base no perfil.

### Perfis de Usuário
- **Admin**:
  - Criar, editar e excluir usuários.
  - Gerenciar todas as vistorias.
  - Acesso a relatórios gerenciais, financeiros e de vistorias.
  - Configurações do sistema (parâmetros globais, backups).

- **Gestor**:
  - Criar, editar e atribuir vistorias.
  - Visualizar relatórios de vistorias e financeiros.
  - Atualizações em tempo real para vistoriadores.

- **Vistoriador**:
  - Visualizar apenas vistorias atribuídas.
  - Registrar resultados (observações, status).
  - Atualizações em tempo real de atribuições.

### Comunicação em Tempo Real
- Simulada no frontend via localStorage; para produção, usar WebSockets (Socket.IO) ou Firebase Realtime Database para sincronizar alterações (ex.: edição de vistoria pelo gestor atualiza o painel do vistoriador).

### Outras Funcionalidades
- Temas claro/escuro com persistência.
- Filtros e busca em listas (vistorias, usuários).
- Exportação de relatórios em CSV (extensível para PDF via jsPDF).
- Validações de formulários (campos obrigatórios, email válido).
- Notificações via alertas visuais.

## Estrutura de Páginas

- `login.html`: Tela de autenticação.
- `dashboard.html`: Painel principal, dinâmico por perfil.
- `gerenciar-vistorias.html`: Lista e gerenciamento de vistorias.
- `detalhesvistoria.html`: Detalhes e edição de uma vistoria específica.
- `gerenciar-usuarios.html`: Gerenciamento de contas de usuários (exclusivo para Admin).
- `relatorios-vistorias.html`: Relatórios de vistorias.
- `relatorios-gerenciais.html`: Relatórios gerenciais (exclusivo para Admin).
- `relatorios-financeiros.html`: Relatórios financeiros.
- `gestao-sistema.html`: Configurações globais e backups (exclusivo para Admin).
- `configuracoes.html`: Configurações de perfil do usuário.
- `atribuicao-vistorias.html`: Atribuição de vistorias (para Gestor).

## Tecnologias Sugeridas

### Frontend
- HTML5, CSS3 (com variáveis para temas), JavaScript puro.
- Bibliotecas opcionais: Chart.js (gráficos), jsPDF (exportação PDF).

### Backend (para produção)
- Node.js + Express para APIs RESTful.
- Socket.IO para comunicação em tempo real.
- Autenticação: JWT ou Firebase Authentication.
- Banco de Dados: MongoDB (flexível) ou PostgreSQL (estruturado); Firebase Realtime Database para sincronização em tempo real.

### Ferramentas Adicionais
- Responsividade: Media queries.
- Segurança: Validação de entrada, HTTPS.
- Acessibilidade: Atributos ARIA básicos.

## Instalação e Configuração

1. **Clonar o Repositório**:
   ```
   git clone https://github.com/seu-usuario/sistema-vistorias-interno.git
   cd sistema-vistorias-interno
   ```

2. **Executar Localmente**:
   - Abra os arquivos HTML diretamente no navegador para teste básico (mas use servidor local para navegação correta).
   - Servidor Local (recomendado):
     ```
     npm install -g http-server
     http-server .
     ```
     Acesse `http://localhost:8080/login.html`.

3. **Configurar Sessão para Teste**:
   - No console do navegador (F12 > Console):
     ```
     localStorage.setItem('userSession', JSON.stringify({ profile: 'admin', name: 'Admin User', email: 'admin@vistoria.com' }));
     ```
     Recarregue e acesse `dashboard.html`.

4. **Para Produção**:
   - Integre backend com Node.js/Express.
   - Configure Firebase ou Socket.IO para tempo real.
   - Hospede em uma plataforma como Vercel, Heroku ou AWS.

## Uso

1. **Login**:
   - Acesse `login.html` e use credenciais fictícias (ex.: username: admin, password: admin).
   - Redirecionado para `dashboard.html` com base no perfil.

2. **Navegação**:
   - No dashboard, clique nos cartões para acessar páginas como `gerenciar-usuarios.html` ou `detalhesvistoria.html`.

3. **Tema**:
   - Clique no ícone 🌙/☀️ para alternar temas.

4. **Teste de Tempo Real**:
   - Simulado no frontend; para real, configure backend.

## Contribuição

1. Fork o repositório.
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`.
3. Commit: `git commit -m 'Adiciona nova funcionalidade'`.
4. Push: `git push origin feature/nova-funcionalidade`.
5. Abra um Pull Request.

## Licença

MIT License. Veja [LICENSE](LICENSE) para detalhes.

## Contato

Para dúvidas, contate [seu-email@exemplo.com] ou abra uma issue no GitHub.

## Cronograma Sugerido (do Prompt do Projeto)

- Semana 1: Configuração do ambiente, login e autenticação.
- Semana 2: Desenvolvimento do dashboard por perfil.
- Semana 3: Vistorias e detalhes da vistoria.
- Semana 4: WebSockets/Firebase para tempo real.
- Semana 5: Gerenciamento de usuários e relatórios.
- Semana 6: Temas, testes e finalização.

Este projeto está em desenvolvimento. Contribuições são bem-vindas!

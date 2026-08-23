# 🧪 PolaLab Bot

Bot de atendimento e gerenciamento de pedidos desenvolvido para o **PolaLab**.

O projeto foi criado para centralizar o atendimento de clientes, apresentar os serviços disponíveis, auxiliar na criação de pedidos e organizar informações de pagamento.

> 🚧 Projeto em desenvolvimento — novas funcionalidades e melhorias podem ser adicionadas futuramente.

---

## ✨ Funcionalidades

- 📋 Catálogo de serviços
- 💰 Consulta de preços e pacotes
- 🎫 Sistema de tickets/atendimento
- 🛒 Criação e gerenciamento de pedidos
- 💳 Informações de pagamento
- 🗃️ Armazenamento de pedidos com SQLite
- ⚙️ Configurações separadas do código
- 🤖 Comandos Slash do Discord
- 📦 Estrutura modular para facilitar manutenção e expansão

---

## 🛠️ Tecnologias

- **JavaScript**
- **Node.js**
- **Discord.js**
- **SQLite**
- **better-sqlite3**
- **dotenv**

---

## 📁 Estrutura

```text
polalab-bot/
├── src/
│   ├── commands/       # Comandos Slash
│   ├── config/         # Configurações do bot
│   ├── events/         # Eventos do Discord
│   └── utils/          # Funções auxiliares
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md

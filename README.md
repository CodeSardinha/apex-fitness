# ▲ APEX FITNESS

> **"Performance é estilo de vida."**  
> Plataforma web de ferramentas fitness — IMC, TDEE, Cronômetro, Hidratação e Gerador de Treino.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Status](https://img.shields.io/badge/status-concluído-00e676?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)

---

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Demonstração Visual](#demonstração-visual)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Como Usar](#como-usar)
- [Detalhamento das Ferramentas](#detalhamento-das-ferramentas)
- [Design System](#design-system)
- [Responsividade](#responsividade)
- [Decisões Técnicas](#decisões-técnicas)
- [Melhorias Futuras](#melhorias-futuras)
- [Autor](#autor)
- [Licença](#licença)

---

## Sobre o Projeto

O **APEX FITNESS** é uma plataforma web completa e interativa voltada para praticantes de atividade física. O projeto foi desenvolvido com foco em **UI/UX de alta qualidade**, utilizando exclusivamente **HTML, CSS e JavaScript puro** — sem frameworks ou bibliotecas externas — o que o torna ideal como projeto de portfólio para demonstrar domínio sólido nas três tecnologias fundamentais do desenvolvimento front-end.

A proposta é oferecer um conjunto de **cinco ferramentas práticas** que auxiliem o usuário no controle do treino, monitoramento da saúde e manutenção de hábitos saudáveis, tudo em uma interface dark premium com tema industrial/neon.

### Objetivos do projeto

- Demonstrar proficiência em HTML semântico, CSS avançado e manipulação do DOM com JavaScript
- Entregar uma experiência de usuário fluida, responsiva e visualmente atraente
- Organizar o código de forma modular, limpa e bem comentada
- Servir como projeto de portfólio completo e funcional

---

## Demonstração Visual

### Seções do Site

| Seção | Descrição |
|---|---|
| **Hero** | Título impactante, estatísticas, visual com orbs animados e círculo IMC rotativo |
| **Ferramentas** | Grid de 5 cards interativos com cálculos em tempo real |
| **Educação** | 4 cards com informações sobre saúde, descanso, nutrição e consistência |
| **Footer** | Rodapé limpo com links de navegação |

### Paleta de Cores

| Cor | Hex | Uso |
|---|---|---|
| Verde Neon | `#00e676` | Cor de destaque principal, botões, resultados positivos |
| Laranja | `#ff6d1f` | Treino gerado, elementos de energia |
| Azul Elétrico | `#2979ff` | Contador de água |
| Preto Profundo | `#080b0f` | Background principal |
| Grafite | `#111820` | Background dos cards |

---

## Funcionalidades

### Ferramentas Interativas

- **Calculadora de IMC** — Cálculo instantâneo com classificação visual e barra indicadora animada
- **Calculadora de Calorias (TDEE)** — Baseada na fórmula de Mifflin-St Jeor, retorna 3 metas calóricas
- **Temporizador de Treino** — Cronômetro completo (HH:MM:SS) com abas para Cronômetro e Descanso
- **Timer de Descanso** — Countdown com anel SVG animado indicando progresso
- **Contador de Água** — Garrafa animada com barra de progresso e mensagens motivacionais dinâmicas
- **Gerador de Treino** — Banco de 60+ exercícios organizados por tipo (5) e nível (3)

### Interface & UX

- Navbar fixa com efeito de blur ao rolar
- Menu mobile responsivo (hamburger)
- Toast notifications para feedback do usuário
- Animações de scroll com Intersection Observer API
- Hover states e micro-interações em todos os elementos interativos
- Smooth scroll para âncoras internas
- Orbs animados com `keyframes` no hero
- Suporte a `Enter` nos inputs para acionar cálculos

---

## Tecnologias Utilizadas

| Tecnologia | Versão | Uso |
|---|---|---|
| HTML5 | — | Estrutura semântica (`section`, `nav`, `footer`, `article`) |
| CSS3 | — | Layout, animações, responsividade, custom properties |
| JavaScript ES6+ | — | Lógica de negócio, manipulação do DOM, timers, cálculos |
| Google Fonts | — | Bebas Neue (display) + DM Sans (corpo) |
| SVG | — | Anel de progresso no timer de descanso |

**Nenhum framework ou biblioteca JavaScript foi utilizado.** Todo o código é vanilla, demonstrando conhecimento profundo das APIs nativas do browser.

---

## Estrutura do Projeto

```
apex-fitness/
│
├── index.html        # Estrutura HTML completa e semântica
├── style.css         # Estilização completa (~720 linhas)
├── script.js         # Lógica JavaScript (~360 linhas)
└── README.md         # Documentação do projeto
```

### Arquitetura do CSS

O CSS está organizado em seções claramente delimitadas por comentários:

```
style.css
├── CSS Variables (Design Tokens)
├── Reset & Base
├── Navbar
├── Hero Section
│   ├── Background (grid, orbs)
│   ├── Content (badge, title, CTA)
│   └── Visual (círculo rotativo, floating cards)
├── Sections Shared (layout comum)
├── Tools Grid
│   ├── Card Base
│   ├── Inputs
│   ├── Buttons
│   ├── Result Box (IMC scale, TDEE mini cards)
│   ├── Timer (tabs, display, controls, ring SVG)
│   ├── Water Counter
│   └── Workout Generator
├── Education Section
├── Footer
├── Toast Notification
├── Animations (keyframes)
└── Responsive (breakpoints: 1024px, 768px, 480px)
```

### Arquitetura do JavaScript

```
script.js
├── IIFE: initNavbar()          — scroll + mobile toggle
├── IIFE: initScrollAnimations() — Intersection Observer
├── showToast()                  — sistema de feedback
│
├── Módulo IMC
│   └── calcIMC()
│
├── Módulo TDEE
│   └── calcTDEE()
│
├── Módulo Cronômetro
│   ├── cronoStart()
│   ├── cronoPause()
│   ├── cronoReset()
│   └── updateCronoDisplay()
│
├── Módulo Descanso
│   ├── restStart()
│   ├── restReset()
│   └── updateRestDisplay()
│
├── switchTimer()               — controla abas do timer
│
├── Módulo Água
│   ├── addWater()
│   ├── removeWater()
│   ├── updateWaterGoal()
│   └── renderWater()
│
├── Módulo Treino
│   ├── exerciseDB{}            — banco de 60+ exercícios
│   ├── workoutTips[]           — dicas aleatórias
│   └── generateWorkout()
│
└── DOMContentLoaded init       — inicializa estados padrão
```

---

## Como Usar

### Pré-requisitos

Nenhum. O projeto não possui dependências externas nem requer processo de build.

### Rodando localmente

**Opção 1 — Abrir diretamente no navegador:**

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/apex-fitness.git

# Navegue até a pasta
cd apex-fitness

# Abra o arquivo no navegador (duplo clique ou arraste o arquivo)
open index.html
```

**Opção 2 — Servidor local com VS Code:**

Instale a extensão **Live Server** e clique em `Go Live` na barra de status.

**Opção 3 — Servidor HTTP com Python:**

```bash
# Python 3
python -m http.server 8080

# Acesse no navegador
# http://localhost:8080
```

**Opção 4 — Servidor HTTP com Node.js:**

```bash
npx serve .
```

### Deploy

O projeto pode ser publicado em qualquer serviço de hospedagem estática:

- **GitHub Pages** — Configure o repositório em `Settings > Pages`
- **Netlify** — Arraste a pasta para [netlify.com/drop](https://app.netlify.com/drop)
- **Vercel** — `vercel --prod` na raiz do projeto

---

## Detalhamento das Ferramentas

### 1. Calculadora de IMC

Calcula o Índice de Massa Corporal a partir do peso (kg) e altura (cm).

**Fórmula:**
```
IMC = peso / (altura_em_metros)²
```

**Classificações:**

| IMC | Categoria | Cor |
|---|---|---|
| < 18.5 | Abaixo do Peso | Azul |
| 18.5 – 24.9 | Peso Normal | Verde |
| 25.0 – 29.9 | Sobrepeso | Amarelo |
| ≥ 30.0 | Obesidade | Vermelho |

A barra indicadora usa interpolação linear para posicionar o marcador com precisão e anima com transição CSS de 0.6s.

---

### 2. Calculadora de Calorias (TDEE)

Utiliza a **Fórmula de Mifflin-St Jeor** para calcular a Taxa Metabólica Basal (TMB) e multiplica pelo fator de atividade.

**Fórmulas TMB:**

```
Masculino:  TMB = (10 × peso) + (6.25 × altura) − (5 × idade) + 5
Feminino:   TMB = (10 × peso) + (6.25 × altura) − (5 × idade) − 161
```

**Fatores de Atividade (Harris-Benedict):**

| Nível | Fator |
|---|---|
| Sedentário | 1.20 |
| Levemente ativo (1-3x/sem) | 1.375 |
| Moderadamente ativo (3-5x/sem) | 1.55 |
| Muito ativo (6-7x/sem) | 1.725 |
| Extremamente ativo (2x/dia) | 1.90 |

Retorna 3 metas: **Manutenção** (TDEE), **Emagrecimento** (TDEE − 500 kcal) e **Ganho de Massa** (TDEE + 300 kcal).

---

### 3. Temporizador de Treino

Possui duas abas independentes:

**Cronômetro:**
- Contagem progressiva em formato `HH:MM:SS`
- Estado gerenciado via objeto `cronometro{}` com `setInterval`
- Botões: Iniciar, Pausar e Reset
- Status textual dinâmico

**Timer de Descanso:**
- Countdown configurável de 5 a 600 segundos
- Anel SVG animado com `stroke-dashoffset` calculado em tempo real
- Circunferência do anel: `2 × π × r = 314` unidades
- Progresso: `offset = circumference × (1 − remaining/total)`
- Toast automático ao finalizar o descanso

---

### 4. Contador de Água

- Meta diária configurável de 1 a 20 copos
- Garrafa com preenchimento animado via `height` em percentual
- Barra de progresso linear com gradiente azul
- 7 mensagens motivacionais que escalam com o progresso
- Botões de adicionar e remover com feedback via toast

---

### 5. Gerador de Treino

Banco de dados com **60+ exercícios** organizados em:

```
5 tipos × 3 níveis = 15 combinações distintas
```

| Tipo | Exercícios |
|---|---|
| Full Body | Compostos multiarticulares |
| Membros Superiores | Peito, costas, ombros, braços |
| Membros Inferiores | Pernas, glúteos, panturrilha |
| Core / Abdômen | Prancha, crunch, variações |
| Cardio | HIIT, sprints, exercícios metabólicos |

Cada exercício inclui: **nome**, **séries × repetições/tempo** e **tempo de descanso**.

O algoritmo embaralha o banco com `Array.sort(() => Math.random() - 0.5)` e seleciona 4 a 5 exercícios por geração. Uma dica aleatória é exibida ao final de cada treino gerado.

---

## Design System

### Tokens CSS (Custom Properties)

```css
:root {
  /* Backgrounds */
  --bg-900: #080b0f;   /* Principal */
  --bg-800: #0e1318;
  --bg-700: #151d26;   /* Inputs */
  --bg-600: #1c2733;   /* Hover states */
  --card-bg: #111820;  /* Cards */

  /* Cores de acento */
  --green:  #00e676;
  --orange: #ff6d1f;
  --blue:   #2979ff;

  /* Tipografia */
  --font-display: 'Bebas Neue', cursive;
  --font-body:    'DM Sans', sans-serif;

  /* Efeitos */
  --radius: 16px;
  --transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --shadow-card: 0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px var(--card-border);
}
```

### Tipografia

| Fonte | Uso | Estilo |
|---|---|---|
| **Bebas Neue** | Títulos, valores numéricos, labels | Display, tracking amplo |
| **DM Sans** | Corpo de texto, botões, inputs | 300 / 400 / 500 / 700 |

### Animações

| Animação | Duração | Uso |
|---|---|---|
| `fadeUp` | 0.6s ease | Elementos ao carregar |
| `orbFloat` | 10–16s ease-in-out infinite | Orbs do hero |
| `rotateSlow` | 20s linear infinite | Círculo do hero |
| `floatCard` | 6–8s ease-in-out infinite | Cards flutuantes do hero |
| `pulse` | 2s ease infinite | Badge dot |
| `scaleIn` | 0.4s ease | Resultados dos cálculos |
| Intersection Observer | 0.6s ease | Cards ao entrar no viewport |

---

## Responsividade

O layout é **mobile-first** com três breakpoints principais:

| Breakpoint | Mudanças |
|---|---|
| `≤ 1024px` | Grid de ferramentas muda para 1 coluna; educação muda para 1 coluna |
| `≤ 768px` | Hero muda para 1 coluna; visual do hero oculto; menu mobile ativado; inputs empilhados |
| `≤ 480px` | Ajustes finos de tipografia e padding |

### Menu Mobile

Implementado com CSS puro para a animação + JavaScript para o toggle da classe `.open`. O menu desliza com `transform: translateY` e opacidade, sem uso de `display: none` direto para permitir a transição suave.

---

## Decisões Técnicas

### Por que JavaScript Puro?

A ausência de frameworks foi uma escolha intencional para demonstrar domínio das APIs nativas do browser: `Intersection Observer`, `setInterval`/`clearInterval`, `querySelectorAll`, manipulação de estilos inline, eventos de formulário e animações via classes CSS.

### Intersection Observer para Animações de Scroll

Em vez de detectar scroll com `window.addEventListener('scroll')` (que dispara centenas de vezes por segundo), foi utilizado o `Intersection Observer API`, que é performático e nativo, disparando apenas quando o elemento entra no viewport.

```javascript
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target); // Para de observar após animar
      }
    });
  },
  { threshold: 0.1 }
);
```

### Gerenciamento de Estado dos Timers

Cada timer possui seu próprio objeto de estado isolado, evitando conflitos entre o cronômetro e o timer de descanso:

```javascript
const cronometro = { interval: null, seconds: 0, running: false };
const restTimer  = { interval: null, totalSeconds: 60, remaining: 60, running: false };
```

### SVG Ring Progress

O anel de progresso do timer de descanso é um `<circle>` SVG manipulado via `stroke-dashoffset`. A circunferência é `2 × π × 50 ≈ 314` unidades. O offset é calculado como:

```javascript
const offset = circumference * (1 - remaining / total);
ring.style.strokeDashoffset = offset;
```

A transição `transition: stroke-dashoffset 1s linear` no CSS garante a animação suave a cada segundo.

---

## Melhorias Futuras

- [ ] **LocalStorage** — Persistir progresso de água, histórico de treinos e metas do usuário
- [ ] **PWA (Progressive Web App)** — Service Worker + Manifest para funcionamento offline e instalação
- [ ] **Gráficos de progresso** — Visualização semanal de hidratação e treinos com Canvas API
- [ ] **Modo claro** — Alternância de tema dark/light com `prefers-color-scheme`
- [ ] **Notificações push** — Lembretes de hidratação e hora do treino via Web Notifications API
- [ ] **Calculadora de macros** — Distribuição de proteínas, carboidratos e gorduras
- [ ] **Temporizador de séries** — Sequência automática de exercício + descanso
- [ ] **Exportar treino** — Gerar PDF ou imagem do treino para compartilhamento
- [ ] **Internacionalização** — Suporte a inglês e espanhol além do português
- [ ] **Testes unitários** — Cobertura das funções de cálculo com Jest

---

## Autor

Desenvolvido com dedicação e código limpo.

Se este projeto foi útil para você, deixe uma ⭐ no repositório!

---

## Licença

Distribuído sob a licença **MIT**. Veja o arquivo `LICENSE` para mais informações.

```
MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

---

<p align="center">
  <strong>▲ APEX FITNESS</strong> — Performance é estilo de vida.<br/>
  Feito com HTML, CSS e JavaScript puro.
</p>

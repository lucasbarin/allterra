# 🌱 Allterra

![Status](https://img.shields.io/badge/Status-Produção-brightgreen?style=for-the-badge)
![Landing](https://img.shields.io/badge/Landing-Ativa-8c6b5c?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-1.0-blue?style=for-the-badge)

> **Inteligência Regenerativa**  
> Marca e plataforma institucional da Allterra, conectando agricultura, biociência e o potencial vivo do solo.

**🌐 Domínio de Produção:** [allterraagro.com.br](https://allterraagro.com.br)

---

## 📖 Sobre o Projeto

Este repositório contém o site institucional da **Allterra**, com uma página de abertura em [index.html](index.html) e a landing principal em [landing.html](landing.html).

O projeto foi estruturado em HTML, CSS e JavaScript, com foco em:

- apresentação da nova marca;
- narrativa institucional da Allterra;
- banner com vídeo responsivo;
- experiência refinada em mobile, incluindo ajustes específicos para Safari iOS.

### 🎯 Objetivos

- **Apresentar** a nova expressão de marca da Allterra
- **Comunicar** propósito, princípios e proposta institucional
- **Entregar** uma landing visualmente sólida em desktop e mobile
- **Garantir** consistência de navegação, loading e vídeo banner responsivo

---

## 🚀 Tecnologias Utilizadas

- **HTML5** - Estrutura semântica das páginas
- **CSS3** - Estilização customizada
- **Bootstrap 5.3** - Grid e componentes base
- **AOS** - Animações de entrada e scroll
- **JavaScript** - Navegação, vídeo, FAQ, loading e ajustes mobile
- **PHP legado** - Utilitários auxiliares em [app/](app/)

---

## 📁 Estrutura do Projeto

```text
allterra/
├── app/
│   ├── funcoes.php
│   ├── paginacao.php
│   ├── sessao.php
│   ├── teste-mail.php
│   ├── timthumb.php
│   └── PHPMailer_v5.1/
├── assets/
│   ├── css/
│   │   ├── custom.css
│   │   ├── responsive.css
│   │   └── loading-teste.css
│   ├── js/
│   │   ├── main.js
│   │   └── loading-teste.js
│   ├── images/
│   ├── videos/
│   └── lib/
├── index.html
├── landing.html
├── README.md
├── LICENSE
└── COPILOT.md
```

---

## 🎬 Páginas Principais

### 🏠 index.html
- página de abertura do projeto;
- apresenta a entrada para a nova marca;
- funciona como porta de entrada alternativa para o site.

### 🎥 landing.html
- landing institucional principal;
- hero com vídeo responsivo para desktop e mobile;
- fallback para imagem estática;
- FAQ com accordion;
- ajustes específicos para Safari iOS;
- loading inicial com transição controlada.

**Acesso local:**
- `http://localhost/allterra/`
- `http://localhost/allterra/landing.html`

---

## 💻 Como Executar Localmente

### Pré-requisitos

- navegador moderno;
- servidor local opcional, recomendado para ambiente completo:
  - WAMP
  - XAMPP
  - Live Server
  - `python -m http.server 8000`

### Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/allterra.git
```

2. Coloque o projeto no servidor local:

```text
C:\wamp64\www\allterra
```

3. Acesse no navegador:

```text
http://localhost/allterra/
http://localhost/allterra/landing.html
```

---

## 🎨 Sistema Visual

### Tipografia
- fontes customizadas definidas em [assets/fontes/](assets/fontes/);
- escalonamento com base em `rem`;
- responsividade refinada em [assets/css/responsive.css](assets/css/responsive.css).

### Paleta
- base terrosa e institucional;
- tons de marrom, bege e cinza ligados à identidade Allterra;
- aplicação centralizada em variáveis CSS no topo de [assets/css/custom.css](assets/css/custom.css).

### Responsividade
- abordagem desktop-first;
- refinamentos específicos até o breakpoint mobile;
- ajustes dedicados para hero, navbar e ritmo vertical no mobile.

---

## 🔧 Funcionalidades

- ✅ Hero com vídeo responsivo em [landing.html](landing.html)
- ✅ Fallback para imagem estática quando o vídeo não carrega
- ✅ Loading overlay com transição controlada
- ✅ Sequência de entrada da hero e animações AOS
- ✅ Navegação por âncoras com snap suave nas seções marcadas
- ✅ FAQ expansível
- ✅ Open Graph, Twitter Cards e favicons configurados
- ✅ Ajustes específicos para Safari iOS no mobile
- ✅ Compatibilidade entre desktop e mobile com vídeo horizontal/vertical

---

## 🔧 Otimizações Técnicas

### Banner em Vídeo
- troca automática do vídeo conforme viewport;
- desktop com vídeo horizontal;
- mobile com vídeo vertical;
- `poster` como fallback visual imediato.

### Safari iOS Fix
- `viewport-fit=cover`;
- cálculo dinâmico de viewport;
- micro-ajuste inicial para estabilidade visual do hero;
- controle da navbar no topo durante o primeiro bloco da landing.

### Loading e Entrada
- overlay inicial com fade-out controlado;
- disparo de animações somente após a ocultação do loading;
- comportamento refinado para evitar conflito visual no mobile.

---

## 📱 Compatibilidade

**Dispositivos**
- 📱 Mobile
- 📱 Tablet
- 💻 Desktop

**Navegadores**
- ✅ Chrome
- ✅ Safari
- ✅ Firefox
- ✅ Edge

---

## 🌐 SEO e Metadados

- meta description configurada;
- Open Graph configurado;
- Twitter Cards configurados;
- favicon e manifest incluídos;
- canonical específico para [index.html](index.html) e [landing.html](landing.html).

---

## 🚀 Produção

### Checklist de publicação

- [x] Landing institucional publicada
- [x] Meta tags e social cards configurados
- [x] Vídeo banner com fallback
- [x] Ajustes de Safari iOS aplicados
- [x] Responsividade validada em mobile e desktop
- [ ] Revisão final de links externos e conteúdos institucionais
- [ ] Rotina de deploy/documentação operacional do ambiente

### Arquivos prioritários em produção

- [landing.html](landing.html) - landing principal
- [index.html](index.html) - página de entrada
- [assets/css/custom.css](assets/css/custom.css) - estilos principais
- [assets/css/responsive.css](assets/css/responsive.css) - responsividade
- [assets/css/loading-teste.css](assets/css/loading-teste.css) - loading overlay
- [assets/js/main.js](assets/js/main.js) - interações gerais
- [assets/js/loading-teste.js](assets/js/loading-teste.js) - fluxo de loading e ajustes mobile

---

## 📝 Observações de Manutenção

- o comportamento principal da landing está concentrado em [assets/js/main.js](assets/js/main.js) e [assets/js/loading-teste.js](assets/js/loading-teste.js);
- o hero e os ajustes mobile críticos estão em [assets/css/custom.css](assets/css/custom.css);
- a página institucional principal do projeto é [landing.html](landing.html).

---

## 📄 Licença

Este projeto segue a licença definida em [LICENSE](LICENSE).

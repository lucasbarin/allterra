# Instruções para GitHub Copilot e IAs

> Este arquivo serve como referência para assistentes de IA (GitHub Copilot, ChatGPT, Claude, etc.) que trabalharão em projetos baseados neste template.

## 🎯 Sistema Utilizado

Este projeto usa um **sistema de tipografia responsiva baseado em REM** com proporcionalidade automática via `responsive.css`.

### Conceito Principal

```css
/* Base (desktop): */
html { font-size: 62.5%; }  /* 1rem = 10px em navegador padrão */

/* O responsive.css ajusta isso automaticamente a cada 20px: */
@media (max-width: 1280px) {
  html { font-size: 6.67px; }  /* Tudo fica proporcionalmente menor */
}

/* Reset em mobile: */
@media (max-width: 767px) {
  html { font-size: 10px; }  /* Recomeça a escala para mobile */
}
```

**Resultado**: Elementos mantêm proporções visuais idênticas em qualquer resolução.

---

## 📋 Regras de Código

### ✅ SEMPRE USE REM

```css
/* ✅ CORRETO */
.card {
  width: 32rem;
  padding: 2.4rem;
  margin-bottom: 1.6rem;
  font-size: 1.8rem;
}

.btn {
  padding: 1.2rem 2.4rem;
  font-size: 1.6rem;
  border-radius: 0.4rem;
}

/* ❌ ERRADO - Não quebrará a proporcionalidade, mas não escalará */
.card {
  width: 320px;
  padding: 24px;
  font-size: 18px;
}
```

### Exceções Permitidas para `px`:

- `border: 1px solid` - bordas finas
- `box-shadow` - sombras sutis
- `outline` - contornos de foco

---

## 🎨 Padrões de Implementação

### Criando Novos Componentes

```css
/* 1. Desktop first */
.meu-componente {
  padding: 4rem 2rem;
  font-size: 1.8rem;
  max-width: 120rem;
}

.meu-componente__titulo {
  font-size: 3.6rem;
  margin-bottom: 2.4rem;
  line-height: 1.2;
}

/* 2. Tablets se necessário */
@media (max-width: 991.98px) {
  .meu-componente {
    padding: 3rem 1.5rem;
  }
}

/* 3. Mobile */
@media (max-width: 767.98px) {
  .meu-componente {
    padding: 2.4rem 1.6rem;
  }
  
  .meu-componente__titulo {
    font-size: 2.4rem;
    margin-bottom: 1.6rem;
  }
}
```

### Usando Variáveis CSS

```css
/* Sempre use as variáveis definidas em :root */
.botao-primario {
  background-color: var(--cor-primaria);
  color: var(--cor-branco);
  font-family: var(--font-principal);
}

/* Se precisar de nova cor, adicione ao :root primeiro */
:root {
  --cor-nova: #FF5733;
}
```

---

## 📱 Considerações Mobile

### Áreas de Toque (Touch Targets)

Botões e links clicáveis devem ter **mínimo 44px (4.4rem)** de área clicável:

```css
.btn-mobile {
  padding: 1.4rem 2rem;  /* Pelo menos 4.4rem de altura total */
  font-size: 1.6rem;
}

.nav-link-mobile {
  padding: 1.2rem 0;  /* Área vertical adequada */
  display: block;
}
```

### Botões Mobile Full-Width

```css
@media (max-width: 767.98px) {
  .btn {
    width: 100%;
    text-align: center;
  }
  
  /* Grupos de botões - empilhar verticalmente */
  .btn-group .btn {
    margin-bottom: 1.2rem;
  }
}
```

---

## 🔧 Estrutura de Arquivos

```
assets/css/
├── custom.css        ← EDITE AQUI (seus estilos)
├── responsive.css    ← NÃO MODIFICAR (escala automática)
├── bootstrap.min.css ← Framework base
└── ...
```

**Nunca crie novos arquivos CSS** sem necessidade. Mantenha tudo organizado no `custom.css`.

---

## 🚫 O Que Evitar

### 1. Não Use Pixels Fixos
```css
/* ❌ ERRADO */
.hero {
  height: 600px;
  padding: 80px 40px;
}

/* ✅ CORRETO */
.hero {
  height: 60rem;
  padding: 8rem 4rem;
}
```

### 2. Não Crie Media Queries Arbitrários
```css
/* ❌ ERRADO - Valores aleatórios */
@media (max-width: 850px) { }
@media (max-width: 1050px) { }

/* ✅ CORRETO - Use os breakpoints Bootstrap */
@media (max-width: 991.98px) { }
@media (max-width: 767.98px) { }
```

### 3. Não Ignore o Sistema de Proporcionalidade
```css
/* ❌ ERRADO - Forçar tamanhos absolutos */
.titulo {
  font-size: 48px !important;
}

/* ✅ CORRETO - Deixar escalar naturalmente */
.titulo {
  font-size: 4.8rem;
}
```

### 4. Não Modifique responsive.css
O arquivo `responsive.css` contém a matemática da proporcionalidade. **Nunca edite** a menos que esteja ajustando o sistema inteiro.

---

## 💡 Prompts Úteis para IAs

### Ao Pedir CSS para um Componente
```
"Crie CSS para [componente] usando REM. 
Deve ser proporcional e ter versão mobile em @media (max-width: 767.98px).
Use as variáveis CSS do :root."
```

### Ao Pedir Ajustes
```
"Ajuste o espaçamento de [elemento] para ser proporcional.
Converta pixels para REM (1rem = 10px base desktop)."
```

### Ao Debugar
```
"Este componente não está escalando corretamente. 
Todas as unidades estão em REM?
O CSS está no custom.css?"
```

---

## 📐 Cálculo Rápido px → rem

**Fórmula**: `tamanho_px ÷ 10 = rem`

| Pixels | REM | Uso Comum |
|--------|-----|-----------|
| 8px | 0.8rem | Espaçamento mínimo |
| 12px | 1.2rem | Texto pequeno |
| 16px | 1.6rem | Texto base |
| 24px | 2.4rem | Títulos menores |
| 32px | 3.2rem | Padding grandes |
| 48px | 4.8rem | H1, espaçamentos |
| 64px | 6.4rem | Display texto |

---

## 🎯 Checklist de Implementação

Antes de finalizar qualquer componente, verifique:

- [ ] Todos os tamanhos estão em `rem` (exceto borders/shadows)
- [ ] Componente tem versão mobile `@media (max-width: 767.98px)`
- [ ] Botões/links têm área mínima de toque (4.4rem)
- [ ] Usa variáveis CSS do `:root` para cores/fontes
- [ ] CSS adicionado em `custom.css` (não criou novo arquivo)
- [ ] Testado redimensionando janela (proporcionalidade mantida)
- [ ] Breakpoints seguem padrão Bootstrap

---

## 🧠 Entendendo o Reset Mobile (767px)

```css
/* Desktop (1920px → 768px): ESCALA CONTÍNUA */
html { font-size: 10px → 4.06px }  /* Fica cada vez menor */

/* Mobile (767px): RESET */
html { font-size: 10px }  /* Volta para 10px! */

/* Mobile (767px → 327px): NOVA ESCALA */
html { font-size: 10px → 4.26px }  /* Escala novamente */
```

**Por quê?** 
- Desktop precisa de colunas, muito conteúdo lado a lado
- Mobile precisa de stacking, botões grandes, menu hamburger
- São dois "mundos" diferentes que precisam de proporções próprias

---

## 🤖 Para Copilot Inline

Ao escrever CSS e Copilot sugerir `px`, ignore e use `rem`:

```css
/* Você digita: */
.card {
  padding: 

/* Copilot pode sugerir: */
  padding: 20px;

/* Você escreve: */
  padding: 2rem;
```

Se o Copilot persistir em pixels, adicione comentário:
```css
/* Sistema REM - todas unidades em rem */
.elemento {
  width: 50rem;  /* rem */
  padding: 2rem; /* rem */
}
```

---

## 📚 Links Rápidos

- [README Completo](README.md)
- [Exemplo Visual](index.html)
- [Custom CSS](assets/css/custom.css)

---

**Lembre-se**: Este sistema foi projetado para proporcionalidade perfeita. Confie no `responsive.css` e mantenha tudo em REM! 🎯

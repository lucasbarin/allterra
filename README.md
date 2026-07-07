# HTML Reset Master 2025

Sistema profissional de reset CSS com tipografia responsiva baseada em **REM** e **proporcionalidade pixel-perfect**.

## 🎯 Conceito

Este projeto utiliza uma metodologia única de escalonamento proporcional onde:

1. **Base REM**: `html { font-size: 62.5%; }` → `1rem = 10px` (em navegador padrão 16px)
2. **Unidades REM**: Todos os tamanhos (fontes, espaçamentos, larguras) são definidos em `rem`
3. **Proporcionalidade Automática**: O arquivo `responsive.css` ajusta o `font-size` do `html` a cada 20px de largura de tela
4. **Reset Mobile**: Em `767px` o sistema "reseta" para `10px` e recomeça a escala proporcional específica para mobile

### Por que isso funciona?

```
Desktop 1920px:  html = 62.5% (10px)  →  h1: 4.8rem = 48px
Desktop 1280px:  html = 6.67px        →  h1: 4.8rem = 32px  (proporcional!)
Mobile 767px:    html = 10px (reset)  →  h1: 3.2rem = 32px  (novo layout)
Mobile 375px:    html = 4.89px        →  h1: 3.2rem = 15.6px (proporcional!)
```

Resultado: **O layout mantém exatamente as mesmas proporções visuais** independente do tamanho da tela!

---

## 📁 Estrutura do Projeto

```
HTML Reset Master 2025/
├── assets/
│   ├── css/
│   │   ├── custom.css       ← SEU CSS (edite aqui)
│   │   ├── responsive.css   ← Escala automática (não mexer)
│   │   ├── bootstrap.min.css
│   │   └── ...
│   ├── js/
│   └── images/
├── index.html               ← Página de exemplos
├── bstv5.html              ← Template base antigo
└── README.md               ← Este arquivo
```

---

## 🚀 Como Usar em Novos Projetos

### 1. Clone ou copie este diretório
```bash
git clone [seu-repo] nome-do-projeto
cd nome-do-projeto
```

### 2. Customize as Variáveis CSS

Edite `assets/css/custom.css`:

```css
:root {
  /* Personalize as cores do projeto */
  --cor-primaria: #007bff;
  --cor-secundaria: #6c757d;
  --cor-destaque: #ffc107;
  
  /* Personalize as fontes */
  --font-principal: 'Sua Fonte', sans-serif;
  --font-destaque: 'Fonte Destaque', serif;
}
```

### 3. Ajuste a Tipografia (se necessário)

Os tamanhos padrão são equilibrados para web:
- `body: 1.6rem` (16px)
- `h1: 4.8rem` (48px)
- `h2: 3.6rem` (36px)

**Mantenha sempre em REM!** A proporcionalidade é automática.

### 4. NÃO modifique `responsive.css`

Este arquivo contém 80 media queries que garantem a proporcionalidade. Só altere se souber exatamente o que está fazendo.

---

## 🤖 Guia para GitHub Copilot / IA

> **Importante**: Se você é uma IA assistente trabalhando neste projeto, siga estas diretrizes:

### ✅ SEMPRE FAÇA:

1. **Use unidades REM** para todos os tamanhos:
   ```css
   /* ✅ CORRETO */
   .elemento {
     font-size: 1.8rem;
     padding: 2.4rem;
     margin-bottom: 3.2rem;
     width: 50rem;
   }
   
   /* ❌ ERRADO */
   .elemento {
     font-size: 18px;
     padding: 24px;
     margin-bottom: 32px;
     width: 500px;
   }
   ```

2. **Mantenha a proporcionalidade**: Use múltiplos de 0.8rem ou 1.6rem
   - Pequeno: `0.8rem, 1.2rem, 1.6rem`
   - Médio: `2.4rem, 3.2rem, 4.0rem`
   - Grande: `4.8rem, 6.4rem, 8.0rem`

3. **Adicione estilos no `custom.css`**: Nunca crie novos arquivos CSS sem necessidade

4. **Respeite os breakpoints Bootstrap**:
   ```css
   /* Desktop first */
   .elemento { ... }
   
   /* Large devices (< 1200px) */
   @media (max-width: 1199.98px) { ... }
   
   /* Medium devices (< 992px) */
   @media (max-width: 991.98px) { ... }
   
   /* Mobile (< 768px) */
   @media (max-width: 767.98px) { ... }
   
   /* Extra small (< 576px) */
   @media (max-width: 575.98px) { ... }
   ```

5. **Ajuste mobile quando necessário**: Elementos podem ter tamanhos diferentes em mobile, mas sempre em REM

### ❌ NUNCA FAÇA:

1. **Não use `px`** (exceto para `border`, `box-shadow` ou casos muito específicos)
2. **Não modifique `responsive.css`**
3. **Não crie CSS inline** sem justificativa
4. **Não ignore media queries** - sempre teste proporcionalidade

### 💡 Exemplos de Implementação

**Criando um Card Proporcional:**
```css
.card {
  padding: 3.2rem;
  border-radius: 0.8rem;
  margin-bottom: 2.4rem;
}

.card-title {
  font-size: 2.4rem;
  margin-bottom: 1.6rem;
}

.card-text {
  font-size: 1.6rem;
  line-height: 1.6;
}

/* Mobile */
@media (max-width: 767.98px) {
  .card {
    padding: 2.4rem;
  }
  
  .card-title {
    font-size: 2.0rem;
  }
}
```

**Botão Customizado:**
```css
.btn-custom {
  padding: 1.6rem 3.2rem;
  font-size: 1.8rem;
  border-radius: 0.4rem;
}

@media (max-width: 767.98px) {
  .btn-custom {
    padding: 1.2rem 2.4rem;
    font-size: 1.6rem;
    width: 100%; /* Botões mobile full-width */
  }
}
```

---

## 📊 Referência Rápida

### Escala de Tamanhos (REM)
| Descrição | Desktop | Mobile |
|-----------|---------|--------|
| Texto tiny | 1.2rem | 1.2rem |
| Texto small | 1.4rem | 1.4rem |
| Texto base | 1.6rem | 1.6rem |
| Texto lead | 2.0rem | 1.8rem |
| H6 | 1.8rem | 1.6rem |
| H5 | 2.0rem | 1.8rem |
| H4 | 2.4rem | 2.0rem |
| H3 | 2.8rem | 2.2rem |
| H2 | 3.6rem | 2.6rem |
| H1 | 4.8rem | 3.2rem |
| Display | 6.4rem | 3.6rem |

### Espaçamentos Padrão
```css
.mb-1 { margin-bottom: 0.8rem; }
.mb-2 { margin-bottom: 1.6rem; }
.mb-3 { margin-bottom: 2.4rem; }
.mb-4 { margin-bottom: 3.2rem; }
.mb-5 { margin-bottom: 4.8rem; }
```

### Breakpoints
```css
1920px+ : Desktop Full (base)
767px   : Mobile (reset - recalcula proporcionalidade)
576px   : Mobile pequeno (ajustes finos)
```

---

## 🎨 Customização por Projeto

### Adicionando Fontes Customizadas

1. Adicione o import no início do `custom.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
```

2. Atualize as variáveis:
```css
:root {
  --font-principal: 'Poppins', sans-serif;
}
```

### Adicionando Cores do Projeto

```css
:root {
  --cor-primaria: #FF6B35;
  --cor-secundaria: #004E89;
  --cor-destaque: #F7C948;
}

/* Use classes utilitárias */
.text-primary { color: var(--cor-primaria); }
.bg-primary { background-color: var(--cor-primaria); }
```

---

## 🧪 Testando a Proporcionalidade

1. Abra `index.html` no navegador
2. Abra o DevTools (F12)
3. Redimensione a janela lentamente
4. **Observe**: Todos os elementos mantêm a mesma proporção visual
5. Em `767px` o layout "se ajusta" para mobile

---

## 📝 Boas Práticas

✅ **Faça**: Componentes reutilizáveis com classes semânticas  
✅ **Faça**: Mobile-first para novos componentes (depois ajustar desktop)  
✅ **Faça**: Comente seções longas do CSS  
✅ **Faça**: Use as variáveis CSS do `:root`  

❌ **Evite**: `!important` (quase sempre desnecessário)  
❌ **Evite**: CSS duplicado em múltiplos arquivos  
❌ **Evite**: Unidades `px` para dimensões principais  
❌ **Evite**: Media queries aleatórios (use os padronizados)  

---

## 🔧 Compatibilidade

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 📚 Recursos Adicionais

- Bootstrap 5 Docs: https://getbootstrap.com/docs/5.3/
- REM vs PX: https://www.w3schools.com/cssref/css_units.asp
- Responsive Design: https://web.dev/responsive-web-design-basics/

---

## 🤝 Contribuindo

Se você melhorou este sistema, considere:
1. Documentar a mudança neste README
2. Testar em múltiplos dispositivos
3. Manter a compatibilidade com projetos existentes

---

## 📄 Licença

Livre para uso em projetos pessoais e comerciais.

---

## 💡 Dúvidas Frequentes

**P: Posso usar `px` para borders?**  
R: Sim! `border: 1px solid` é aceitável pois não deve escalar.

**P: E se eu precisar de um tamanho exato em pixels?**  
R: Calcule: `tamanho_desejado_px / 10 = valor_rem`. Exemplo: 25px → 2.5rem

**P: Por que resetar em 767px?**  
R: Mobile precisa de layout diferente (stacking, botões maiores, etc). O reset permite criar proporções específicas para pequenas telas.

**P: Posso alterar o intervalo de 20px no responsive.css?**  
R: Sim, mas 20px é o equilíbrio ideal entre suavidade e performance.

---

**Desenvolvido com ❤️ para projetos web pixel-perfect**

# Instruções para GitHub Copilot e IAs

> Este arquivo orienta assistentes de IA que forem editar o projeto final da Allterra, não um template genérico.

## Projeto atual

- A página institucional principal é `landing.html`.
- `index.html` é apenas a página de abertura/entrada.
- O projeto usa HTML, CSS e JavaScript vanilla com Bootstrap 5.3 e AOS.
- Há ajustes específicos para mobile e Safari iOS no hero da landing.

## Arquivos principais

```text
assets/css/custom.css           # estilos principais do projeto
assets/css/responsive.css       # responsividade e escala global
assets/css/loading-teste.css    # estilos do loading overlay
assets/js/main.js               # navegação, snap, vídeo, FAQ e animações
assets/js/loading-teste.js      # loading, micro-scroll e ajustes Safari iOS
landing.html                    # página principal do projeto
index.html                      # página de abertura
```

## Regras de manutenção

### 1. Use REM como padrão

- Prefira `rem` para tipografia, espaçamentos, larguras e alturas.
- `px` só em casos pontuais como borda, outline e detalhes visuais finos.

### 2. Respeite o sistema existente

- `responsive.css` controla a escala global do projeto.
- Evite alterar `responsive.css` para ajustes pontuais; prefira `custom.css`.
- Só mexa em `responsive.css` quando a mudança for realmente estrutural.

### 3. Não edite a página errada

- Mudanças principais de conteúdo e experiência acontecem em `landing.html`.
- Não assumir que `index.html` é a página principal.
- Antes de editar, confirme se o pedido é para `landing.html`, `index.html` ou ambos.

### 4. Mobile e desktop devem ser tratados com escopo claro

- Ajustes mobile devem ficar isolados no bloco mobile correspondente.
- Ajustes desktop não devem contaminar mobile, e vice-versa.
- Quando o pedido for ambíguo, esclarecer o escopo antes de mexer.

### 5. Preserve a arquitetura do hero da landing

- O hero usa vídeo responsivo com fallback de imagem.
- O carregamento inicial depende de `loading-teste.js` e `loading-teste.css`.
- O comportamento de Safari iOS depende de classes como:
  - `safari-ios-fix`
  - `mobile-top-hack-active`
  - `navbar-hidden-on-scroll`
  - `pre-hero-hidden`

### 6. Snap e navegação

- O snap da landing está vinculado às seções marcadas com `data-snap-target`.
- Não reaplique lógica de snap genérica baseada em todas as sections.
- Se uma seção nova precisar entrar no snap, marcar explicitamente no HTML.

## Tokens e variáveis reais do projeto

As variáveis reais não seguem nomes genéricos como `--cor-primaria` ou `--font-principal`.
Use os tokens existentes no topo de `assets/css/custom.css`, principalmente:

```css
:root {
  --cor-marrom: #51302e;
  --cor-bege: #b9aa9b;
  --cor-marrom-claro: #68453e;
  --cor-super-claro: #a38b86;
  --cor-cinza: #a7a9a9;
  --cor-fundo: #51302e;

  --font-medium: "britti_sansmedium", sans-serif;
  --font-semibold: "britti_sanssemibold", sans-serif;
}
```

Se precisar de um novo token, adicionar no mesmo bloco `:root` de `assets/css/custom.css`.

## Onde colocar cada tipo de ajuste

### CSS

- Estilos gerais e componentes: `assets/css/custom.css`
- Responsividade global: `assets/css/responsive.css`
- Loading overlay: `assets/css/loading-teste.css`

### JavaScript

- Navegação, vídeo, FAQ, AOS, snap: `assets/js/main.js`
- Loading, micro-scroll, Safari iOS, viewport hacks: `assets/js/loading-teste.js`

## O que evitar

### Evite instruções genéricas de template

- Não assumir nomes de variáveis que não existem.
- Não assumir que tudo deve ir apenas em `custom.css`.
- Não assumir que `index.html` é a referência visual principal.

### Evite regressões no hero mobile

- Não alterar micro-scroll, loading ou snap sem validar o efeito conjunto.
- Não trocar a ordem de eventos entre loading, fade-out e animação inicial sem necessidade.
- Não modificar regras do hero mobile sem checar Safari iOS.

### Evite mudanças amplas sem necessidade

- Não reestruture HTML da landing se o pedido for apenas visual.
- Não mover assets ou renomear arquivos sem revisar referências.
- Não remover arquivos da raiz sem confirmar que são realmente obsoletos.

## Checklist antes de concluir uma mudança

- [ ] O ajuste foi aplicado no arquivo correto
- [ ] Mobile e desktop ficaram isolados conforme o pedido
- [ ] Nenhuma lógica do hero/loading foi quebrada
- [ ] As variáveis usadas existem no projeto real
- [ ] O snap continua funcionando nas seções marcadas
- [ ] Não houve impacto indevido em `index.html` quando o alvo era `landing.html`

## Links rápidos

- [README Completo](README.md)
- [Landing Principal](landing.html)
- [Página de Abertura](index.html)
- [Custom CSS](assets/css/custom.css)
- [Main JS](assets/js/main.js)
- [Loading JS](assets/js/loading-teste.js)

## Resumo operacional

Se a tarefa envolver experiência principal do site, assuma primeiro `landing.html` como alvo provável.
Se envolver loading, hero mobile, faixa superior, Safari iOS, vídeo banner ou snap, os arquivos mais críticos são `assets/js/loading-teste.js`, `assets/js/main.js` e `assets/css/custom.css`.

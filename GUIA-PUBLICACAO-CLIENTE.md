# Guia de Publicacao - allterraagro.com

Este documento e para o time tecnico do cliente publicar o site no dominio allterraagro.com.

## 1. Conteudo a publicar

Publicar exatamente estes itens na raiz do site:

- index.html
- assets/
- LICENSE

Se o servidor ja tiver arquivos antigos, remover antes os antigos da versao anterior para evitar conflito.

## 2. Estrutura esperada no servidor

A raiz do dominio deve ficar assim:

```text
/
|-- index.html
|-- assets/
|   |-- css/
|   |-- js/
|   |-- images/
|   |-- videos/
|   `-- ...
`-- LICENSE
```

## 3. Publicacao (FTP/SFTP ou painel)

1. Fazer backup da versao atual em producao.
2. Remover os arquivos antigos do site.
3. Enviar os novos arquivos (index.html e pasta assets completa).
4. Confirmar permissao de leitura dos arquivos no servidor.

## 4. Configuracao recomendada de servidor

- HTTPS ativo com certificado valido.
- Compressao gzip/brotli ativa para html, css, js, svg e json.
- Cache recomendado:
  - HTML: cache curto (5-10 minutos) ou no-cache.
  - CSS/JS/Imagens/Videos: cache longo (30 dias ou mais).

## 5. Checklist de validacao apos publicar

1. Abrir https://allterraagro.com e confirmar carregamento sem erro 404.
2. Testar menu e navegacao por secoes (introducao, sobre nos, proposito, rebranding, faq).
3. Testar video do hero e video da secao de player.
4. Testar FAQ expandindo e recolhendo perguntas.
5. Validar layout em mobile e desktop.
6. Confirmar metadados de compartilhamento (og:title, og:image, canonical).
7. Fazer hard refresh (Ctrl+F5) para validar sem cache local.

## 6. Rollback (se necessario)

Se houver problema em producao:

1. Restaurar backup da versao anterior.
2. Limpar cache CDN/servidor.
3. Revalidar o dominio.

## 7. Contato tecnico

Em caso de duvida na publicacao, retornar para o time que entregou este pacote com print do erro e horario da tentativa.

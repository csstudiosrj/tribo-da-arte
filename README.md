# Site Tribo da Arte

Site institucional estático (HTML + CSS + JS), sem build e sem dependências. Pronto para GitHub + Vercel.

## Estrutura de pastas e arquivos

```
tribo-da-arte/
├── index.html            Início
├── sobre.html            Sobre
├── servicos.html         Serviços
├── portfolio.html        Portfólio (filtro + janela de detalhes)
├── processo.html         Processo
├── contato.html          Contato + formulário de orçamento
├── privacidade.html      Política de privacidade (LGPD)
├── marca.html            Guia de rebranding (não aparece no Google)
├── 404.html              Página de erro
├── vercel.json           Configuração da Vercel (URLs limpas, segurança, cache)
├── robots.txt            Instruções para o Google
├── sitemap.xml           Mapa do site
├── site.webmanifest      Ícones do site no celular
├── .gitignore
└── assets/
    ├── css/style.css     Todo o visual do site (cores e fontes no topo)
    ├── js/main.js        Interações e formulário (configurações no topo)
    ├── js/projetos.js    LISTA DO PORTFÓLIO (é aqui que você troca fotos)
    └── img/
        ├── logo-mark.svg           Emblema novo (vetor)
        ├── logo-original.jpg       Logo atual (usada no guia de marca)
        ├── favicon-32.png, apple-touch-icon.png, icon-512.png
        └── projetos/               Coloque aqui as fotos dos trabalhos
```

## Parte 1 — Subir no GitHub (pelo navegador, sem instalar nada)

1. Crie uma conta em https://github.com (se ainda não tiver).
2. Clique em **+** (canto superior direito) → **New repository**.
3. Nome: `tribo-da-arte`. Marque **Private** (ou Public, como preferir). Clique em **Create repository**.
4. Na tela seguinte, clique em **uploading an existing file**.
5. No computador, **descompacte o ZIP** recebido. Abra a pasta `tribo-da-arte`, selecione **todo o conteúdo de dentro dela** (arquivos e a pasta `assets`) e arraste para a página do GitHub.
   - Importante: arraste o **conteúdo** da pasta, e não a pasta em si. O arquivo `index.html` precisa ficar na raiz do repositório.
   - Se o navegador não aceitar arrastar pastas, use o Chrome ou o Edge.
6. Espere o envio terminar, escreva "Primeira versão" no campo de mensagem e clique em **Commit changes**.
7. Confira: na página do repositório devem aparecer `index.html`, `vercel.json`, a pasta `assets` etc.

> A pasta vazia `assets/img/projetos` só aparece no GitHub porque contém um arquivo `.gitkeep`. Pode deixá-lo lá.

## Parte 2 — Publicar na Vercel

1. Acesse https://vercel.com → **Sign Up** → **Continue with GitHub**.
2. Clique em **Add New… → Project**.
3. Ache o repositório `tribo-da-arte` e clique em **Import**.
4. Não mude nada: **Framework Preset = Other**, deixe Build Command e Output Directory em branco.
5. Clique em **Deploy**. Em cerca de 1 minuto o site estará no ar em um endereço `tribo-da-arte.vercel.app`.
6. A partir daí, **toda alteração salva no GitHub é publicada automaticamente**.

### Domínio próprio (opcional)

Na Vercel: seu projeto → **Settings → Domains** → digite o domínio (ex.: `tribodaarte.com.br`) e siga as instruções de DNS mostradas na tela.

## Parte 3 — Ativar o formulário de contato (gratuito, 3 minutos)

Hoje, enquanto a chave não for configurada, o botão do formulário abre o WhatsApp com a mensagem pronta. Para receber os pedidos por **e-mail**:

1. Acesse https://web3forms.com, digite o e-mail que vai receber os pedidos e clique em **Create Access Key**.
2. Você recebe uma chave por e-mail (uma sequência longa de letras e números).
3. No GitHub, abra `assets/js/main.js` → ícone do lápis (**Edit this file**).
4. Nas primeiras linhas, troque `COLE_SUA_CHAVE_AQUI` pela sua chave, mantendo as aspas:
   `web3formsKey: "sua-chave-aqui",`
5. Clique em **Commit changes**. Em 1 minuto o formulário passa a enviar e-mails de verdade.
6. Teste enviando uma mensagem pelo próprio site.

## Como fazer as alterações mais comuns

Em todos os casos: abra o arquivo no GitHub → lápis → altere → **Commit changes**.

**Trocar as fotos do portfólio**
1. No GitHub, abra a pasta `assets/img/projetos` → **Add file → Upload files** e envie as fotos (JPG ou WebP, largura de 1600 px, até 400 KB cada).
2. Abra `assets/js/projetos.js`. Em cada projeto, preencha `image`, por exemplo: `image: "assets/img/projetos/escultura-01.jpg",`
3. Ajuste também `titulo`, `ano` e `descricao`. Para criar um projeto novo, copie um bloco inteiro `{ ... },` e cole logo abaixo.

**Trocar telefone, e-mail ou endereço**
Esses dados aparecem em `contato.html`, no rodapé de todas as páginas e em `assets/js/main.js` (campo `whatsapp`). Use a busca do seu editor ou peça para regenerar as páginas.

**Trocar cores e fontes**
Abra `assets/css/style.css`: as variáveis no começo do arquivo (`--urucum`, `--carvao`, etc.) controlam o site inteiro.

## Antes de divulgar (checklist)

- [ ] Trocar `SEU-DOMINIO.com.br` por seu endereço real em `robots.txt` e `sitemap.xml`.
- [ ] Ativar o formulário (Parte 3) e testar.
- [ ] Colocar as fotos reais no portfólio.
- [ ] Revisar os textos e a Política de Privacidade (é um modelo, vale validar com um profissional).
- [ ] Conferir o e-mail de contato (veja a observação abaixo).
- [ ] Depois de publicar, cadastrar o site no Google Search Console e enviar o `sitemap.xml`.

## Observações

- O e-mail usado no site, `gnomus.cenografia@gmail.com`, foi o que aparece no perfil do Facebook da empresa. Confirme se é o que o cliente quer divulgar.
- Os projetos do portfólio e os textos de serviços são provisórios, baseados na descrição pública do Instagram. Não há depoimentos, números ou clientes inventados.
- As fontes (Fraunces e Manrope) são carregadas do Google Fonts.

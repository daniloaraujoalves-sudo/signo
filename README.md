# ⚜ Descubra seu signo — Pergaminho dos Signos

Site estático com visual medieval (pergaminho, tinta e ouro). O usuário informa a data de nascimento, a roda dos signos gira até o signo correspondente e uma página mostra elemento, planeta regente, virtudes, provações e afinidades.

Não precisa de servidor: é HTML, CSS e JavaScript puros, então funciona direto no **GitHub Pages**.

## Publicar no GitHub Pages

1. Crie um repositório e envie estes arquivos (`index.html` na raiz).
2. No repositório, vá em **Settings → Pages**.
3. Em **Build and deployment**, escolha **Deploy from a branch**, selecione a branch `main` e a pasta `/ (root)`.
4. Salve. Em alguns minutos o site estará em `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

## Estrutura

```
├── index.html          # formulário e roda dos signos
├── signo.html          # resultado
├── css/style.css       # tema medieval
├── js/zodiaco.js       # busca do signo pela data
├── js/index.js         # validação, roda animada e redirecionamento
├── js/signo.js         # preenche a página de resultado
├── data/signos.js      # dados dos 12 signos (gerado a partir do banco)
└── database/
    ├── init_db.py      # cria o banco SQLite e gera data/signos.js
    └── signos.db
```

## Rodar localmente

Basta abrir o `index.html` no navegador, ou servir a pasta:

```bash
python -m http.server 8000
```

Abra http://localhost:8000

## Editar os textos dos signos

Os dados ficam em `database/init_db.py`. Depois de editar, rode:

```bash
python database/init_db.py
```

Isso recria `signos.db` e regenera `data/signos.js`, que é o arquivo que o site usa.

## Fontes

Carregadas do Google Fonts: UnifrakturCook, Cinzel e IM Fell English. Sem internet, o site usa fontes serifadas do sistema.

# 公開手順ガイド (GitHub & Vercel)

このガイドに従って、作成した「整形のしおり (Korea Surgery Prep)」アプリをインターネット上に公開しましょう。

## 前提条件
- **GitHubアカウント** を持っていること
- **Vercelアカウント** を持っていること（GitHubアカウントでログイン可能）
- `git` コマンドが使えること（今回は設定済みです）

---

## 手順 1: GitHubリポジトリの作成

1. [GitHub](https://github.com/) にログインし、右上の「+」アイコン → 「New repository」をクリック。
2. **Repository name** に `korea-surgery-prep` と入力。
3. **Public** (公開) または **Private** (非公開) を選択。
    - 誰でも見られるようにするなら Public
    - 自分だけ見たいなら Private
4. その他のチェックボックスは**オフのまま**、「Create repository」ボタンをクリック。

---

## 手順 2: GitHubへのアップロード (Push)

作成したリポジトリの画面に表示される URL (`https://github.com/ユーザー名/korea-surgery-prep.git`) をコピーして、以下のコマンドをターミナルで実行してください。

```bash
# 1. リモートリポジトリの登録 (URLは自分のものに置き換えてください)
git remote add origin https://github.com/YOUR_USERNAME/korea-surgery-prep.git

# 2. GitHubへアップロード
git branch -M main
git push -u origin main
```

※ 初回はGitHubのログインを求められる場合があります。画面の指示に従ってください。

---

## 手順 3: Vercelでの公開 (Deploy)

最も簡単で推奨される方法は、VercelとGitHubを連携させることです。これにより、今後コードを更新してGitHubにプッシュするだけで、自動的に新しいバージョンのサイトが公開されます。

1. [Vercel Dashboard](https://vercel.com/dashboard) にアクセスし、「Add New...」→「Project」をクリック。
2. 「Import Git Repository」のリストに、先ほど作成した `korea-surgery-prep` が表示されているはずです。
    - 表示されない場合は、「Adjust GitHub App Permissions」をクリックしてリポジトリへのアクセス権を許可してください。
3. `korea-surgery-prep` の横にある **[Import]** ボタンをクリック。
4. **Configure Project** 画面が表示されます。
    - **Framework Preset**: `Vite` が自動選択されているはずです（もし違えば `Vite` を選択）。
    - **Build Command**: `vite build` (または `npm run build`)
    - **Output Directory**: `dist`
    - その他の設定はデフォルトのままでOKです。
5. **[Deploy]** ボタンをクリック。

数分待つと、花吹雪のアニメーションと共に `https://korea-surgery-prep-xxxxx.vercel.app` のような公開URLが発行されます！🎉

---

## おまけ: Vercel CLIを使う場合 (コマンドラインから)

もしGitHub経由ではなく、手元のPCから直接公開したい場合は、以下のコマンドだけでOKです。

```bash
vercel
```

質問にはすべて Enter (または Y) で答えていけば公開されます。
ただし、継続的な更新の便利さを考えると、**手順3のGitHub連携がおすすめ**です。

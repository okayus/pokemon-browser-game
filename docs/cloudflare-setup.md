# Cloudflare設定ガイド

このドキュメントでは、ポケモンブラウザゲームプロジェクトのためのCloudflare設定手順を説明します。

## 前提条件

- Cloudflareアカウント
- GitHub リポジトリへの管理者アクセス

## 1. Cloudflare Pagesの設定

### 1.1. プロジェクトの作成

1. Cloudflareダッシュボードにログイン
2. 左側メニューから「Pages」を選択
3. 「Create a project」ボタンをクリック
4. 「Connect to Git」を選択
5. GitHubと連携し、リポジトリを選択
6. 以下の設定を行います：
   - プロジェクト名: `pokemon-browser-game`
   - 本番ブランチ: `main`
   - ビルドコマンド: `npm run build:frontend`
   - ビルド出力ディレクトリ: `packages/frontend/dist`
   - Node.jsバージョン: 20.x
7. 「Save and Deploy」をクリック

### 1.2. 環境変数の設定

1. 作成したPagesプロジェクトの「Settings」タブへ移動
2. 「Environment variables」を選択
3. 以下の環境変数を追加：
   - `API_URL`: バックエンドAPIのURL
4. 必要に応じて、プレビュー環境と本番環境で別々の値を設定

## 2. Cloudflare Workersの設定

### 2.1. Workerの作成

1. Cloudflareダッシュボードから「Workers & Pages」を選択
2. 「Create application」をクリック
3. 「Create Worker」を選択
4. 名前を `pokemon-game-api` に設定
5. 「Deploy」をクリック

### 2.2. D1データベースの設定

1. 「D1」セクションに移動
2. 「Create database」をクリック
3. データベース名を `pokelike` に設定
4. 「Create」をクリック
5. 作成されたデータベースIDをメモ

### 2.3. KVストアの設定（必要な場合）

1. 「Workers」>「KV」セクションに移動
2. 「Create namespace」をクリック
3. 名前を `GAME_STORE` に設定
4. 「Add」をクリック
5. 作成されたKV名前空間IDをメモ

## 3. Wrangler設定

### 3.1. wrangler.tomlの更新

`packages/backend/wrangler.toml`ファイルを以下のように更新します：

```toml
name = "pokemon-game-api"
main = "dist/index.js"
compatibility_date = "2024-04-29"

[build]
command = "npm run build"
watch_dir = "src"

# 環境変数
[vars]
API_VERSION = "v1"
# その他の環境変数

# KVストアを使用する場合
[[kv_namespaces]]
binding = "GAME_STORE"
id = "あなたのKV名前空間ID"

# D1データベース
[[d1_databases]]
binding = "DB"
database_name = "pokelike"
database_id = "あなたのD1データベースID"

[triggers]
crons = [ ]
```

## 4. GitHub Secretsの設定

1. GitHubリポジトリの「Settings」タブへ移動
2. 左側メニューから「Secrets and variables」>「Actions」を選択
3. 「New repository secret」ボタンをクリック
4. 以下のシークレットを追加：
   - `CLOUDFLARE_API_TOKEN`: CloudflareのAPIトークン
   - `CLOUDFLARE_ACCOUNT_ID`: CloudflareのアカウントID

### 4.1 APIトークンの取得方法

1. Cloudflareダッシュボード右上のプロファイルアイコンをクリック
2. 「My Profile」を選択
3. 左側メニューから「API Tokens」を選択
4. 「Create Token」をクリック
5. 「Create Custom Token」を選択
6. 以下の権限を付与：
   - Account > Workers Scripts > Edit
   - Account > Workers Routes > Edit
   - Account > D1 > Edit
   - Account > Pages > Edit
7. トークンを作成し、表示された値をコピー

### 4.2 アカウントIDの取得方法

1. Cloudflareダッシュボードにログイン
2. 右上のプロファイルアイコンをクリック
3. アカウントを選択
4. URLの末尾にあるIDがアカウントID（例：`cloudflare.com/accounts/1a2b3c4d5e6f7g8h9i0j`の`1a2b3c4d5e6f7g8h9i0j`部分）

## 5. 動作確認

1. プルリクエストをマージしてCICD実行
2. GitHub ActionsのWorkflowが成功することを確認
3. Cloudflare PagesとWorkersが正常にデプロイされることを確認
4. フロントエンドからバックエンドAPIにリクエストを送信してテスト

## トラブルシューティング

### デプロイ失敗時の対応

1. GitHub Actionsのログを確認
2. 以下の点を確認：
   - APIトークンが有効か
   - 必要な権限が付与されているか
   - プロジェクト名が正しいか

### 権限エラーの対応

APIトークンに必要な権限が不足している場合：

1. 新しいAPIトークンを作成
2. 必要なすべての権限を付与
3. GitHubシークレットを更新

### D1/KV接続エラーの対応

1. wrangler.tomlのIDが正しいか確認
2. バインディング名が正しいか確認
3. ローカルでwrangler devを実行してテスト

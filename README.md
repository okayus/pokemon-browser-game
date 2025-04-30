# ポケモンライクなブラウザゲーム

TypeScriptを使用したフルスタックWeb開発の学習プロジェクトです。ポケモンライクなブラウザゲームを開発し、モダンなWeb技術スタックとクラウドサービスを活用しています。

## 機能

- Firebase Authenticationによるユーザー認証
  - Googleアカウントなどでのソーシャルログイン
- グリッドベースのマップ移動
- ポケモンライクなキャラクターの捕獲と育成
- ターンベースのバトルシステム
- マップやキャラクターの管理機能

## 技術スタック

- **フロントエンド**: TypeScript, React, Tailwind CSS, Hono (Client), Firebase
- **バックエンド**: TypeScript, Hono, Drizzle ORM, Firebase Admin SDK
- **インフラ**: Cloudflare Pages, Cloudflare Workers, Cloudflare D1/KV, Firebase Authentication
- **テスト**: Vitest, Playwright
- **CI/CD**: GitHub Actions
- **その他**: Figma, Storybook

## プロジェクト構成

モノレポ構成でフロントエンドとバックエンドのコードを管理しています。

```
pokemon-browser-game/
├── packages/
│   ├── frontend/     # フロントエンドアプリケーション
│   ├── backend/      # バックエンドAPIサーバー
│   └── shared/       # 共有コード（型定義など）
├── docs/             # プロジェクトドキュメント
└── .github/          # GitHub関連（CI/CD設定など）
```

## 開発準備

```bash
# リポジトリをクローン
git clone https://github.com/okayus/pokemon-browser-game.git
cd pokemon-browser-game

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

## 依存関係管理

### 通常の依存関係更新

新しいパッケージを追加した後は、以下のコマンドでpackage-lock.jsonを更新してください：

```bash
# package-lock.jsonを更新（パッケージをインストールせず、lockファイルのみ更新）
npm run update-lockfile

# または依存関係を完全に再インストール
npm run install-fresh
```

### Firebase関連の依存関係

Firebaseや他の重要なパッケージを更新した後は、必ず以下のコマンドを実行して、package-lock.jsonを更新してください：

```bash
# package-lock.jsonに反映されているか確認
npm run update-package-lock
```

CI/CDパイプラインはpackage-lock.jsonがpackage.jsonの内容と同期していることを検証します。同期していない場合はビルドが失敗します。

### CI失敗時の対応方法

CIが「Missing dependencies in package-lock.json」などのエラーで失敗した場合：

1. `fix/dependencies` などのブランチを作成
2. `npm install` または `npm run update-package-lock` を実行
3. 更新された `package-lock.json` をコミット
4. PRを作成

## Firebaseの設定

このプロジェクトはFirebase Authenticationを使用しています。使用するには以下の設定が必要です：

1. [Firebase Console](https://console.firebase.google.com/)でプロジェクトを作成
2. Webアプリとして登録し、設定値を取得
3. フロントエンド用の環境変数（`.env`ファイル）を設定
4. Firebase Admin SDK用のサービスアカウントキーを取得し、バックエンド用の環境変数を設定

## ライセンス

MIT

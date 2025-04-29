# ポケモンライクなブラウザゲーム

TypeScriptを使用したフルスタックWeb開発の学習プロジェクトです。ポケモンライクなブラウザゲームを開発し、モダンなWeb技術スタックとクラウドサービスを活用しています。

## 機能

- Googleアカウントなどでのソーシャルログイン
- グリッドベースのマップ移動
- ポケモンライクなキャラクターの捕獲と育成
- ターンベースのバトルシステム
- マップやキャラクターの管理機能

## 技術スタック

- **フロントエンド**: TypeScript, React, Tailwind CSS, Hono (Client)
- **バックエンド**: TypeScript, Hono, Drizzle ORM
- **インフラ**: Cloudflare Pages, Cloudflare Workers, Cloudflare D1/KV
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

## ライセンス

MIT

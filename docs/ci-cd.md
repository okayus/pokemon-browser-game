# CI/CDパイプラインの設定と利用方法

このプロジェクトでは、GitHub Actionsを使用して継続的インテグレーション(CI)と継続的デリバリー(CD)のパイプラインを構築しています。このドキュメントでは、CI/CDパイプラインの設定方法と使い方について説明します。

## パイプラインの概要

CI/CDパイプラインは以下の4つの主要なステップで構成されています：

1. **Lint**: コードスタイルとフォーマットのチェック
2. **Test**: ユニットテストとインテグレーションテストの実行
3. **Build**: プロジェクトのビルドとアーティファクトの生成
4. **Deploy**: Cloudflare PagesとCloudflare Workersへのデプロイ

## 動作トリガー

パイプラインは以下のイベントでトリガーされます：

- **Pull Request**: `main`ブランチに対するPRが作成または更新されたとき（Lintステップのみ）
- **Push**: `main`ブランチへのコードのマージ時（全ステップ）

## セットアップ手順

### 1. リポジトリシークレットの設定

Cloudflareへのデプロイを行うには、以下のシークレットをGitHubリポジトリに設定する必要があります：

1. GitHub Repositoryの「Settings」タブへ移動
2. 左メニューから「Secrets and variables」>「Actions」を選択
3. 「New repository secret」ボタンをクリック
4. 以下のシークレットを追加：
   - `CLOUDFLARE_API_TOKEN`: CloudflareのAPIトークン
   - `CLOUDFLARE_ACCOUNT_ID`: CloudflareのアカウントID（必要に応じて）

### 2. ブランチ保護ルールの設定

コード品質を維持するために、以下のブランチ保護ルールを設定することをお勧めします：

1. GitHub Repositoryの「Settings」タブへ移動
2. 左メニューから「Branches」を選択
3. 「Add branch protection rule」をクリック
4. 「Branch name pattern」に `main` を入力
5. 以下の項目を有効にする：
   - ✅ Require pull request reviews before merging
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - ✅ Require linear history

## 開発ワークフロー

### 1. フィーチャーブランチの作成

新機能の開発時には、まず新しいブランチを作成します：

```bash
git checkout -b feature/your-feature-name
```

### 2. ローカルでの開発とテスト

開発中は、コミット前に自動的にlintとフォーマットが実行されます（Huskyとlint-stagedの設定による）。

手動でlintとフォーマットを実行するには：

```bash
# Lintの実行
npm run lint

# フォーマットの実行
npm run format
```

### 3. プルリクエストの作成

開発が完了したら、`main`ブランチに対するプルリクエストを作成します。このとき、自動的にGitHub ActionsのCI部分（lint, test, build）が実行されます。

### 4. レビューとマージ

PRのレビューが完了し、すべてのチェックがパスしたら、`main`ブランチにマージできます。マージ後、自動的にCloudflareへのデプロイが実行されます。

## トラブルシューティング

### CIのエラー解決

GitHub Actionsのエラーが発生した場合は、以下の手順で対応します：

1. GitHub上の「Actions」タブから失敗したワークフローを確認
2. エラーメッセージを確認し、問題を特定
3. ローカルで修正後、再度コミットとプッシュを行う

### デプロイの問題

デプロイに失敗した場合は、以下を確認してください：

1. CloudflareのAPIトークンが有効であること
2. ビルドアーティファクトが正しく生成されていること
3. Wranglerの設定ファイルが正しいこと

## 参考リンク

- [GitHub Actions公式ドキュメント](https://docs.github.com/en/actions)
- [Cloudflare Pages公式ドキュメント](https://developers.cloudflare.com/pages/)
- [Cloudflare Wrangler公式ドキュメント](https://developers.cloudflare.com/workers/wrangler/)

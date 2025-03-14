# バス時刻表アプリのデプロイガイド

このガイドでは、バス時刻表Webアプリをインターネットに公開する方法を説明します。

## 1. 無料の静的サイトホスティングサービス

### GitHub Pages（最も簡単）
1. [GitHub](https://github.com/)でアカウントを作成
2. 新しいリポジトリを作成（例：`bus-timetable-app`）
3. アプリのファイルをリポジトリにアップロード
4. リポジトリの設定から「GitHub Pages」を有効化
5. `https://あなたのユーザー名.github.io/bus-timetable-app` でアクセス可能になります

### Netlify
1. [Netlify](https://www.netlify.com/)でアカウントを作成
2. 「Sites」→「New site from Git」を選択
3. GitHubなどのリポジトリと連携するか、ファイルを直接ドラッグ＆ドロップでアップロード
4. 自動的にデプロイされ、URLが発行されます
5. カスタムドメインの設定も無料で可能

### Vercel
1. [Vercel](https://vercel.com/)でアカウントを作成
2. 「New Project」を選択
3. GitHubなどのリポジトリと連携するか、ファイルをアップロード
4. 自動的にデプロイされ、URLが発行されます

## 2. 従来のWebホスティングサービス

### レンタルサーバー（Xサーバー、さくらインターネット、ロリポップなど）
1. ホスティングプランに申し込む
2. FTPクライアント（FileZilla等）を使用してファイルをアップロード
3. 通常は `public_html` や `www` フォルダにファイルを配置
4. 独自ドメインを設定（多くの場合、ホスティングプランに含まれています）

## 3. クラウドストレージオプション

### Amazon S3 + CloudFront
1. AWSアカウントを作成
2. S3バケットを作成し、静的ウェブサイトホスティングを有効化
3. ファイルをアップロード
4. （オプション）CloudFrontを設定してCDN配信
5. （オプション）Route 53で独自ドメインを設定

### Google Cloud Storage
1. Googleクラウドアカウントを作成
2. バケットを作成し、公開アクセスを設定
3. ファイルをアップロード
4. （オプション）Cloud CDNを設定
5. （オプション）独自ドメインを設定

## 4. デプロイの基本手順

1. **ファイルの準備**：すべてのHTML、CSS、JavaScriptファイルが正しく相対パスで参照されていることを確認
2. **テスト**：ローカルで最終確認
3. **アップロード**：選択したホスティングサービスにファイルをアップロード
4. **設定**：必要に応じてホスティングサービスの設定を行う
5. **確認**：公開されたURLにアクセスして動作確認

## 5. ドメイン名の考慮事項

独自ドメインを使用する場合：
1. ドメインレジストラ（お名前.com、ムームードメイン等）でドメインを購入
2. DNSレコードを設定してホスティングサービスに向ける
3. ホスティングサービス側でもドメイン設定を行う
4. SSL証明書を設定（Let's Encryptなどの無料証明書が利用可能）

## データの更新方法

アプリをデプロイした後に時刻表データを更新する場合は、以下の手順に従ってください：

1. **CSV変換ツールを使用**：
   - `csv-converter.html` をローカルで開きます
   - CSVデータを入力して変換します
   - 生成されたJavaScriptコードをコピーします

2. **`data.js`ファイルを更新**：
   - ホスティングサービスのダッシュボードからファイルを編集するか
   - ローカルで編集してから再アップロードします

3. **再デプロイ**：
   - GitHub Pagesの場合：変更をコミットしてプッシュするだけ
   - Netlify/Vercelの場合：GitHubと連携していれば自動的に再デプロイされます
   - 従来のホスティングの場合：FTPなどで更新したファイルをアップロード

## その他の注意点

- **HTTPS**：ほとんどの無料ホスティングサービスはHTTPSをサポートしています（セキュリティのため推奨）
- **アクセス解析**：Google Analyticsなどを追加すると、利用状況を把握できます
- **キャッシュ**：ブラウザキャッシュにより、更新が即座に反映されない場合があります。その場合はキャッシュをクリアするか、URLに`?v=2`などのクエリパラメータを追加してください

## おすすめの選択肢

初心者の方には、**GitHub Pages**または**Netlify**が最も簡単でおすすめです。どちらも無料で、ドラッグ＆ドロップでのアップロードが可能で、基本的な設定だけで公開できます。

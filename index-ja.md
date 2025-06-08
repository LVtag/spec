---
layout: default
title: Language Variant Tag (LVTag) 仕様
lang: ja
description: "LVTagは、BCP 47をプライベート使用サブタグで拡張し、形式性、丁寧さ、ドメイン、正書法の次元にわたって言語変種を正確に識別するための体系的な言語分類アプローチです。"
---

<div align="center">
  <img src="/LVTAG_LOGO.png" alt="LVTag Logo" width="200">
</div>

# LVTag 仕様

**バージョン 1.0**  
**作成者：Danslav Slavenskoj**  
**日付：2025年5月**

**言語**：[中文简体](/index-zh.md)  [中文繁體](/index-zh-hant.md)  [Čeština](/index-cs.md)  [Deutsch](/index-de.md)  [English](/index.md)  [Español](/index-es.md)  [Français](/index-fr.md)  [Hrvatski](/index-hr.md)  日本語  [한국어](/index-ko.md)  [Polski](/index-pl.md)  [Português](/index-pt.md)  [Русский](/index-ru.md)  [Српски](/index-sr.md)

## クイックリンク

- [JSON スキーマ](/lvtag-schema.json) - LVTag フォーマットの完全な検証スキーマ
- [分類器定義](/lvtag-classifiers.json) - 機械可読な分類器仕様
- [仕様](#フォーマット仕様) - フォーマットの詳細へジャンプ
- [例](#実装例) - LVTag の実例を見る

## 概要

Language Variant Tag (LVTag) フォーマットは、プライベート使用サブタグを使用して BCP 47 標準を拡張する、言語分類への体系的なアプローチです。フォーマルさ、丁寧さ、ドメイン、正書法を含む複数の次元にわたって言語変種の正確な識別を可能にします。

### 主な利点

**分類の厳密性**：LVTag は、異なるタイプの変化に対して明確で分離された次元を提供することにより、言語タグ付けに体系的な組織をもたらします。同じレベルで異なるカテゴリを混在させる既存のサブタグやシステムとは異なり、LVTag はフォーマルさ、丁寧さ、ドメイン、その他の次元間の厳格な分離を維持します。

**標準との互換性**：LVTag は BCP 47 (RFC 5646) と完全に互換性があり、以下とシームレスに動作します：
- IANA 言語サブタグレジストリ
- ISO 639 言語コード
- Unicode CLDR
- W3C 言語タグ
- HTTP Accept-Language ヘッダー
- XML lang 属性
- HTML lang 属性

**技術統合**：LVTag タグは以下で直接使用できます：
- 自然言語処理 (NLP) パイプライン
- 機械翻訳システム
- コンテンツ管理システム (CMS)
- 言語検出ライブラリ
- 検索エンジンと情報検索システム
- Web アプリケーションと API
- ローカライゼーションワークフロー

**使用例**：
- **オーディエンスターゲティング**：レジスターとドメインに基づいて適切なオーディエンスにコンテンツを合わせる
- **翻訳品質**：機械翻訳で適切なフォーマルさと丁寧さのレベルを維持する
- **言語学習**：学習者に異なるコンテキストに適したレジスターを教える
- **コーパス言語学**：研究用に正確にタグ付けされたコーパスを構築する
- **ソーシャルメディア分析**：レジスターとドメインによってユーザー生成コンテンツを分類する
- **カスタマーサービス**：フォーマルさとドメインに基づいてメッセージを適切なエージェントにルーティングする

## 根拠

BCP 47 は言語、文字、地域の識別に優れたサポートを提供していますが、言語内の社会言語学的変化を捉えるための標準化されたメカニズムが欠けています。現在の標準は以下に対応していません：

- **レジスター変化**：同じ言語のフォーマルとインフォーマルな変種を区別する方法がない
- **丁寧さレベル**：日本語、韓国語、タイ語など、丁寧さが文法的にエンコードされている言語にとって重要
- **ドメイン固有言語**：技術的、医学的、法的言語変種をマークする標準がない
- **社会方言**：社会グループの変種（若者言葉、専門用語）を識別するメカニズムがない
- **歴史的段階**：古典形式と現代形式を区別するサポートが限定的
- **フォーマルさの勾配**：レジスターの計算処理のための数値スケールがない
- **祖語**：一貫性のないエンコーディング - 一部の祖語には ISO コードがある（例：PIE の `ine`）が、他にはなく、ISO 639-5 ファミリーコードは BCP 47 タグで有効ではなく、歴史言語学にとって混乱した状況を作り出している
- **正書法の変化**：BCP 47 は文字を扱うが、テキスト処理、検索、スペルチェックに根本的に影響する文字内の変化（綴り改革、ローマ字化システム、競合する標準）を効果的に捉えていない

LVTag は BCP 47 のプライベート使用拡張メカニズム（`-x-`）を使用してこれらのギャップを埋め、完全な後方互換性を維持しながら、言語変化のこれらの重要な次元をエンコードする体系的で機械可読な方法を提供します。

### 正確な言語分類

大規模言語モデルと洗練された NLP ツールの出現により、正確な言語変種分類は有用であるだけでなく、不可欠になりました。現代のシステムは以下を必要とします：

- 特定のコンテキストに適したテキストを生成する（フォーマル対インフォーマル、丁寧対カジュアル）
- 不適切にレジスターを混在させないよう、適切に分類されたコーパスでトレーニングする
- 文化的およびコンテキスト的に適切な応答を提供する
- コードスイッチングと混合言語コンテンツを正確に処理する
- テキストを翻訳または変換する際にスタイルの一貫性を保つ
- フォーマルさ、ドメイン、またはその他の特性に基づいてトレーニングデータをフィルタリングする
- ユーザーの好みや要件に合わせて出力を適応させる

LVTag は、どの言語が使用されているかだけでなく、どのように使用されているかを理解するために必要な詳細なメタデータを提供し、より微妙で適切な言語処理パイプラインを可能にします。

## フォーマット仕様

### 基本構造

```
language-x-[classifier]-[value]-[classifier2]-[value2]...
```

ここで：
- `language` は有効な BCP 47 主言語サブタグ（例：`en`、`ko`、`ja`）
- `x` はプライベート使用サブタグの開始を示す
- `classifier` はカテゴリ識別子（下記のマジックタグを参照）
- `value` はそのカテゴリ内の特定の分類

### マジックタグ

LVTag は柔軟性のために長形式と短形式の「マジック」分類器の両方をサポートします：

| 長形式 | 短形式 | 説明 |
|-----------|------------|-------------|
| `ortho` | `w` | 正書法の変種 |
| `form` | `f` | フォーマルさレベル（1-5 スケール） |
| `polite` | `p` | 丁寧さ/敬意レベル（1-5 スケール） |
| `domain` | `d` | 専門語彙または専門的コンテキスト |
| `geo` | `g` | 地理的または地域的変種 |
| `proto` | `a` | 祖語または再建された言語 |
| `hist` | `h` | 言語の歴史的期間または段階 |
| `genre` | `e` | テキストジャンルまたは文学的スタイル |
| `medium` | `m` | コミュニケーション媒体（話し言葉、書き言葉、デジタル） |
| `socio` | `s` | 社会方言または社会グループ変種 |
| `modality` | `o` | 言語産出モード |
| `register` | `r` | 言語レジスター |
| `pragma` | `u` | コミュニケーション機能 |
| `temporal` | `t` | 時間的マーキング |
| `evidence` | `v` | 情報源 |
| `affect` | `k` | 感情的トーン |
| `age` | `n` | 年齢/世代変種 |
| `gender` | `i` | ジェンダー変種 |
| `expert` | `b` | 専門知識レベル |
| `interact` | `2` | 相互作用構造 |
| `prosody` | `y` | 韻律的特徴 |
| `lexical` | `l` | 語彙密度（0-100） |
| `syntax` | `z` | 構文的複雑さ（0-100） |
| `start` | `0` | 開始日（句読点なしの ISO 8601） |
| `end` | `1` | 終了日（句読点なしの ISO 8601） |
| `taboo` | `j` | タブー/下品なコンテンツレベル（0-5 スケール） |
| `conf` | `c` | 前のタグの信頼度スコア（0-100） |
| — | `q`、`3`-`9` | 将来の使用のために予約 |

### 分類器

#### 1. 正書法分類器（`ortho` または `w`）
標準的な文字タグを超えた特定の正書法規則または書記体系の変種を識別します。

形式：
- 長形式：`language-x-ortho-[variant]`
- 短形式：`language-x-w-[variant]`

例（標準文字タグと組み合わせ）：
- `az-Latn-x-ortho-new` または `az-Latn-x-w-new` - アゼルバイジャン語ラテン文字、新正書法
- `de-Latn-x-ortho-1901` または `de-Latn-x-w-1901` - ドイツ語ラテン文字、1901 年正書法
- `zh-Hans-x-ortho-pinyin` または `zh-Hans-x-w-pinyin` - ピンイン付き簡体字中国語
- `yi-Hebr-x-ortho-yivo` または `yi-Hebr-x-w-yivo` - イディッシュ語ヘブライ文字、YIVO 正書法

#### 2. フォーマルさ分類器（`form` または `f`）
言語使用のフォーマルさレベルを識別します。

形式：
- 長形式：`language-x-form-[1-5]`
- 短形式：`language-x-f-[1-5]`

フォーマルさスケール：
- 1 = 最もフォーマル（文書、公式スピーチ）
- 2 = フォーマル（ビジネスミーティング、学術的な文章）
- 3 = ニュートラル/標準（ニュース、一般的な会話）
- 4 = インフォーマル（カジュアルな会話、友人への電子メール）
- 5 = 最もカジュアル（親密な会話、スラング）

例：
- `ko-x-form-1` または `ko-x-f-1` - 最もフォーマルな韓国語
- `en-x-form-3` または `en-x-f-3` - ニュートラルな英語
- `ja-x-form-5` または `ja-x-f-5` - 最もカジュアルな日本語

#### 3. 丁寧さ分類器（`polite` または `p`）
言語使用の丁寧さ/敬意レベルを識別します。

形式：
- 長形式：`language-x-polite-[1-5]`
- 短形式：`language-x-p-[1-5]`

丁寧さスケール：
- 1 = 最も敬意のある/恭しい（王室への呼びかけ、宗教的コンテキスト）
- 2 = 非常に丁寧（正式な敬語、敬意のあるスピーチ）
- 3 = 丁寧/ニュートラル（標準的な丁寧さ）
- 4 = 親しみやすい（同等の間、友人）
- 5 = 親密/平易（家族、非常に親しい友人）

例：
- `ko-x-polite-1` または `ko-x-p-1` - 最高敬語韓国語
- `ja-x-polite-2` または `ja-x-p-2` - 非常に丁寧な日本語
- `th-x-polite-3` または `th-x-p-3` - 標準的に丁寧なタイ語

#### 4. ドメイン分類器（`domain` または `d`）
専門語彙または専門的コンテキストを識別します。

形式：
- 長形式：`language-x-domain-[domain_type]`
- 短形式：`language-x-d-[domain_type]`

例：
- `en-x-domain-legal` または `en-x-d-legal` - 法律英語
- `ja-x-domain-med` または `ja-x-d-med` - 医学日本語
- `ko-x-domain-business` または `ko-x-d-business` - ビジネス韓国語
- `ja-x-domain-tech` または `ja-x-d-tech` - 技術日本語
- `en-x-domain-fin` または `en-x-d-fin` - 金融英語

#### 5. 地理的分類器（`geo` または `g`）
地域的または地理的言語変種を識別します。

形式：
- 長形式：`language-x-geo-[region]`
- 短形式：`language-x-g-[region]`

例：
- `ko-x-geo-gyeong` または `ko-x-g-gyeong` - 慶尚道韓国語（경상도）
- `ko-x-geo-jeolla` または `ko-x-g-jeolla` - 全羅道韓国語（전라도）
- `es-x-geo-riopla` または `es-x-g-riopla` - リオプラテンセスペイン語
- `pt-x-geo-nordeste` または `pt-x-g-nordeste` - ブラジル北東部ポルトガル語

#### 6. 祖語分類器（`proto` または `a`）
祖語または再建された歴史的言語を識別します。

形式：
- 長形式：`x-proto-[iso639-5_code if available]`
- 短形式：`x-a-[iso639-5_code if available]`

規則：
- 利用可能な場合は ISO 639-5 言語族コードを使用しなければならない
- ISO 639-5 コードが存在しない場合のみ記述的識別子を使用する

ISO 639-5 コードを使用した例：
- `x-proto-ine` または `x-a-ine` - 印欧祖語
- `x-proto-gem` または `x-a-gem` - ゲルマン祖語
- `x-proto-sla` または `x-a-sla` - スラヴ祖語
- `x-proto-sem` または `x-a-sem` - セム祖語
- `x-proto-cel` または `x-a-cel` - ケルト祖語
- `x-proto-ira` または `x-a-ira` - イラン祖語
- `x-proto-inc` または `x-a-inc` - インド・アーリア祖語
- `x-proto-bat` または `x-a-bat` - バルト祖語
- `x-proto-roa` または `x-a-roa` - ロマンス祖語
- `x-proto-trk` または `x-a-trk` - チュルク祖語

ISO 639-5 コードなしの例（記述的、3文字以上）：
- `x-proto-baltslav` または `x-a-baltslav` - バルト・スラヴ祖語（ISO 639-5 コードなし）

注記：
- 言語族コード（ISO 639-5）は標準的な主要 BCP 47 言語タグとして有効ではないため、x-proto を使用して実装した
- これらはプライベート使用拡張内（`x-` の後）で有効かつ推奨される
- したがって、すべての祖語タグは BCP 47 に準拠するために `x-` で始まる必要がある

#### 7. 歴史的分類器（`hist` または `h`）
言語の歴史的期間または段階を識別します。

形式：
- 長形式：`language-x-hist-[period]`
- 短形式：`language-x-h-[period]`

例：
- `en-x-hist-old` または `en-x-h-old` - 古英語期
- `en-x-hist-middle` または `en-x-h-middle` - 中英語期
- `ja-x-hist-kobun` または `ja-x-h-kobun` - 古文（古文）
- `ko-x-hist-hunmin` または `ko-x-h-hunmin` - 中期韓国語（훈민정음 期）
- `el-x-hist-koine` または `el-x-h-koine` - コイネーギリシャ語（Κοινή）
- `sa-x-hist-vedic` または `sa-x-h-vedic` - ヴェーダサンスクリット（वैदिक）

#### 8. ジャンル分類器（`genre` または `e`）
テキストジャンルまたは文学的スタイルを識別します。

形式：
- 長形式：`language-x-genre-[genre_type]`
- 短形式：`language-x-e-[genre_type]`

例：
- `en-x-genre-news` または `en-x-e-news` - ニュース英語
- `ja-x-genre-manga` または `ja-x-e-manga` - 漫画日本語（漫画）
- `ko-x-genre-webtoon` または `ko-x-e-webtoon` - 韓国ウェブトゥーン（웹툰）
- `zh-x-genre-shi` または `zh-x-e-shi` - 中国詩歌（詩）
- `fr-x-genre-bd` または `fr-x-e-bd` - フランスコミック（bande dessinée）
- `de-x-genre-marchen` または `de-x-e-marchen` - ドイツ童話（Märchen）

#### 9. 媒体分類器（`medium` または `m`）
コミュニケーション媒体を識別します。

形式：
- 長形式：`language-x-medium-[medium_type]`
- 短形式：`language-x-m-[medium_type]`

例：
- `en-x-medium-spoken` または `en-x-m-spoken` - 話し言葉英語
- `ko-x-medium-digital` または `ko-x-m-digital` - デジタル/オンライン韓国語
- `ja-x-medium-written` または `ja-x-m-written` - 書き言葉日本語
- `hi-x-medium-bcast` または `hi-x-m-bcast` - 放送ヒンディー語
- `zh-x-medium-sms` または `zh-x-m-sms` - SMS/テキストメッセージ中国語

#### 10. 社会方言分類器（`socio` または `s`）
社会方言または社会グループ変種を識別します。

形式：
- 長形式：`language-x-socio-[social_group]`
- 短形式：`language-x-s-[social_group]`

例：
- `en-x-socio-academic` または `en-x-s-academic` - 学術社会方言
- `en-x-socio-urban` または `en-x-s-urban` - 都市社会方言
- `es-x-socio-juvenil` または `es-x-s-juvenil` - スペイン語若者社会方言（jerga juvenil）
- `fr-x-socio-jeune` または `fr-x-s-jeune` - フランス語若者社会方言
- `de-x-socio-jugend` または `de-x-s-jugend` - ドイツ語若者社会方言（Jugendsprache）
- `ko-x-socio-online` または `ko-x-s-online` - 韓国語オンライン社会方言

#### 11. モダリティ分類器（`modality` または `o`）
言語産出の基本的なモードを識別します。

形式：
- 長形式：`language-x-modality-[mode]`
- 短形式：`language-x-o-[mode]`

例：
- `en-x-modality-spoken` または `en-x-o-spoken` - 話し言葉英語
- `en-x-modality-written` または `en-x-o-written` - 書き言葉英語
- `asl-x-modality-signed` または `asl-x-o-signed` - アメリカ手話
- `en-x-modality-multi` または `en-x-o-multi` - マルチモーダル英語（音声＋ジェスチャー）
- `fr-x-modality-tactile` または `fr-x-o-tactile` - 触覚フランス語（盲ろう者用）

#### 12. レジスター分類器（`register` または `r`）
言語使用の言語レジスターまたは機能的変種を識別します。

形式：
- 長形式：`language-x-register-[register_type]`
- 短形式：`language-x-r-[register_type]`

例：
- `en-x-register-frozen` または `en-x-r-frozen` - 凍結レジスター（祈り、誓い）
- `en-x-register-formal` または `en-x-r-formal` - フォーマルレジスター（学術論文）
- `en-x-register-consult` または `en-x-r-consult` - 相談レジスター（専門的）
- `en-x-register-casual` または `en-x-r-casual` - カジュアルレジスター（友人）
- `en-x-register-intimate` または `en-x-r-intimate` - 親密レジスター（家族）

#### 13. 語用論的機能分類器（`pragma` または `u`）
コミュニケーション機能または発話行為を識別します。

形式：
- 長形式：`language-x-pragma-[function]`
- 短形式：`language-x-u-[function]`

例：
- `en-x-pragma-request` または `en-x-u-request` - 要求機能
- `ja-x-pragma-apology` または `ja-x-u-apology` - 謝罪機能
- `es-x-pragma-complmnt` または `es-x-u-complmnt` - 褒め言葉機能
- `ar-x-pragma-greeting` または `ar-x-u-greeting` - 挨拶機能
- `zh-x-pragma-refusal` または `zh-x-u-refusal` - 拒否機能

#### 14. 時間的マーキング分類器（`temporal` または `t`）
時間的側面または時制使用パターンを識別します。

形式：
- 長形式：`language-x-temporal-[aspect]`
- 短形式：`language-x-t-[aspect]`

例：
- `en-x-temporal-past` または `en-x-t-past` - 過去志向の談話
- `ja-x-temporal-nonpast` または `ja-x-t-nonpast` - 非過去焦点
- `id-x-temporal-atemprl` または `id-x-t-atemprl` - 無時間的/非時間的
- `fr-x-temporal-future` または `fr-x-t-future` - 未来志向
- `zh-x-temporal-aspect` または `zh-x-t-aspect` - アスペクト焦点

#### 15. 証拠性分類器（`evidence` または `v`）
情報源マーキングを識別します。

形式：
- 長形式：`language-x-evidence-[source]`
- 短形式：`language-x-v-[source]`

例：
- `qu-x-evidence-direct` または `qu-x-v-direct` - 直接目撃
- `tr-x-evidence-hearsay` または `tr-x-v-hearsay` - 伝聞/報告
- `ja-x-evidence-infer` または `ja-x-v-infer` - 推論的
- `en-x-evidence-assume` または `en-x-v-assume` - 推定
- `de-x-evidence-quote` または `de-x-v-quote` - 引用的

#### 16. 感情/情動分類器（`affect` または `k`）
感情的トーンまたは情動を識別します。

形式：
- 長形式：`language-x-affect-[emotion]`
- 短形式：`language-x-k-[emotion]`

例：
- `en-x-affect-angry` または `en-x-k-angry` - 怒りのトーン
- `ja-x-affect-humble` または `ja-x-k-humble` - 謙虚な情動
- `es-x-affect-joyful` または `es-x-k-joyful` - 喜びの表現
- `ko-x-affect-sad` または `ko-x-k-sad` - 悲しい/憂鬱
- `fr-x-affect-neutral` または `fr-x-k-neutral` - 中立的情動

#### 17. 年齢/世代分類器（`age` または `n`）
年齢関連または世代的言語変種を識別します。

形式：
- 長形式：`language-x-age-[generation]`
- 短形式：`language-x-n-[generation]`

例：
- `en-x-age-child` または `en-x-n-child` - 子供の話し言葉
- `ja-x-age-teen` または `ja-x-n-teen` - ティーンエイジャー言語
- `ko-x-age-elder` または `ko-x-n-elder` - 年配者の話し言葉
- `es-x-age-genz` または `es-x-n-genz` - Z世代
- `zh-x-age-millenl` または `zh-x-n-millenl` - ミレニアル世代の話し言葉

#### 18. ジェンダー分類器（`gender` または `i`）
ジェンダー関連の言語変種を識別します。

形式：
- 長形式：`language-x-gender-[identity]`
- 短形式：`language-x-i-[identity]`

#### 19. 専門知識レベル分類器（`expert` または `b`）
0-10スケールでドメインの専門知識レベルを識別します。

形式：
- 長形式：`language-x-expert-[0-10]`
- 短形式：`language-x-b-[0-10]`

専門知識スケール：
- 0 = 知識なし
- 1-2 = 初心者
- 3-4 = 中級
- 5-6 = 上級
- 7-8 = エキスパート
- 9-10 = マスター/権威

例：
- `en-x-expert-0` または `en-x-b-0` - 専門知識なし
- `de-x-expert-3` または `de-x-b-3` - 中級レベル
- `ja-x-expert-7` または `ja-x-b-7` - エキスパートレベル
- `es-x-expert-9` または `es-x-b-9` - マスターレベル
- `zh-x-expert-5` または `zh-x-b-5` - 上級レベル

#### 20. 相互作用構造分類器（`interact` または `2`）
会話または相互作用パターンを識別します。

形式：
- 長形式：`language-x-interact-[structure]`
- 短形式：`language-x-2-[structure]`

例：
- `en-x-interact-turn` または `en-x-2-turn` - ターンテイキング
- `ja-x-interact-overlap` または `ja-x-2-overlap` - 重なり合う発話
- `es-x-interact-monolog` または `es-x-2-monolog` - モノローグ的
- `ar-x-interact-dialog` または `ar-x-2-dialog` - ダイアローグ的
- `zh-x-interact-multi` または `zh-x-2-multi` - マルチパーティ

#### 21. 韻律的特徴分類器（`prosody` または `y`）
韻律的または超分節的特徴を識別します。

形式：
- 長形式：`language-x-prosody-[feature]`
- 短形式：`language-x-y-[feature]`

例：
- `en-x-prosody-stress` または `en-x-y-stress` - ストレスタイミング
- `ja-x-prosody-pitch` または `ja-x-y-pitch` - ピッチアクセント
- `fr-x-prosody-syllable` または `fr-x-y-syllable` - シラブルタイミング
- `zh-x-prosody-tone` または `zh-x-y-tone` - 声調パターン
- `es-x-prosody-rhythm` または `es-x-y-rhythm` - リズムパターン

#### 22. 語彙密度分類器（`lexical` または `l`）
語彙密度を数値（0-100）として識別します。

形式：
- 長形式：`language-x-lexical-[0-100]`
- 短形式：`language-x-l-[0-100]`

例：
- `en-x-lexical-20` または `en-x-l-20` - 低密度（20%）
- `de-x-lexical-55` または `de-x-l-55` - 中密度（55%）
- `ja-x-lexical-75` または `ja-x-l-75` - 高密度（75%）
- `es-x-lexical-40` または `es-x-l-40` - 適度な密度（40%）
- `zh-x-lexical-85` または `zh-x-l-85` - 非常に高い密度（85%）

#### 23. 構文的複雑さ分類器（`syntax` または `z`）
構文的複雑さを数値（0-100）として識別します。

形式：
- 長形式：`language-x-syntax-[0-100]`
- 短形式：`language-x-z-[0-100]`

例：
- `en-x-syntax-15` または `en-x-z-15` - 単純な構文（15%）
- `de-x-syntax-70` または `de-x-z-70` - 複雑な構文（70%）
- `ja-x-syntax-45` または `ja-x-z-45` - 適度な複雑さ（45%）
- `es-x-syntax-30` または `es-x-z-30` - 低い複雑さ（30%）
- `zh-x-syntax-60` または `zh-x-z-60` - 高い複雑さ（60%）

#### 24. 開始日分類器（`start` または `0`）
言語使用の開始日を識別します（句読点なしの ISO 8601 形式）。

形式：
- 長形式：`language-x-start-[YYYYMMDD]`
- 短形式：`language-x-0-[YYYYMMDD]`

日付形式：
- 完全な日付：YYYYMMDD
- 年月：YYYYMM
- 年のみ：YYYY

例：
- `en-x-start-20240315` または `en-x-0-20240315` - 2024年3月15日開始の英語
- `ja-x-start-19890108` または `ja-x-0-19890108` - 1989年1月8日開始の日本語
- `es-x-start-202403` または `es-x-0-202403` - 2024年3月開始のスペイン語

#### 25. 終了日分類器（`end` または `1`）
言語使用の終了日を識別します（句読点なしの ISO 8601 形式）。

形式：
- 長形式：`language-x-end-[YYYYMMDD]`
- 短形式：`language-x-1-[YYYYMMDD]`

日付形式：
- 完全な日付：YYYYMMDD
- 年月：YYYYMM
- 年のみ：YYYY

例：
- `en-x-end-20240415` または `en-x-1-20240415` - 2024年4月15日終了の英語
- `ja-x-end-20190430` または `ja-x-1-20190430` - 2019年4月30日終了の日本語
- `es-x-end-202412` または `es-x-1-202412` - 2024年12月終了のスペイン語

#### 26. タブー分類器（`taboo` または `j`）
タブー、下品、または不快なコンテンツのレベルを識別します。

形式：
- 長形式：`language-x-taboo-[0-5]`
- 短形式：`language-x-j-[0-5]`

例：
- `en-x-taboo-0` または `en-x-j-0` - タブーコンテンツなし
- `en-x-taboo-3` または `en-x-j-3` - 中程度のタブーレベル
- `ja-x-form-5-taboo-4` または `ja-x-f-5-j-4` - 非常にカジュアルな日本語で高いタブーレベル

#### 27. 信頼度分類器（`conf` または `c`）
直前の分類器の信頼度スコアを示します。

形式：
- 長形式：`language-x-[classifier]-[value]-conf-[0-100]`
- 短形式：`language-x-[classifier]-[value]-c-[0-100]`

特別な動作：
- 信頼度スコアは直前の分類器に適用される
- 異なる分類器に対して複数の信頼度スコアを使用できる
- 前に分類器がない場合、信頼度は基本言語タグに適用される

例：
- `en-x-form-3-conf-95` または `en-x-f-3-c-95` - 95%の信頼度でニュートラルなフォーマルさ
- `ko-x-polite-2-conf-80-domain-med-conf-60` または `ko-x-p-2-c-80-d-med-c-60` - 非常に丁寧（80%の信頼度）医学韓国語（60%の信頼度）
- `ja-x-hist-kobun-conf-100` または `ja-x-h-kobun-c-100` - 100%の信頼度で古典日本語
- `x-proto-ine-conf-75` または `x-a-ine-c-75` - 75%の信頼度で印欧祖語

### 複数の分類

LVTag は、正確な言語識別を提供するために単一のタグで複数の分類器をサポートします。長形式と短形式の両方を混在させることができます：

```
ko-x-form-4-domain-business
ko-x-f-4-d-business
ko-x-form-4-polite-2-domain-business
ko-x-f-4-p-2-d-business
```

上記の例は、ビジネスコンテキストでインフォーマルなフォーマルさ（4）だが丁寧な話し言葉（2）の韓国語を示しています。

## 有効な値

**注記**：すべての値は BCP 47 サブタグ長の制限に準拠するために 8 文字以下でなければなりません。多くの分類器の特定の値は専門家の使用とコミュニティの合意によって確立されるべきですが、数値スケール、日付形式、および以下に示す基本値はこの標準で定義されています。

### フォーマルさスケール（ユニバーサル）

| レベル | 説明 | 例 |
|-------|-------------|----------|
| 1 | 最もフォーマル | 法的文書、公式式典、学術論文 |
| 2 | フォーマル | ビジネスレター、ニュース記事、プレゼンテーション |
| 3 | ニュートラル | 標準的な会話、電子メール、一般的な文章 |
| 4 | インフォーマル | カジュアルな会話、個人ブログ、テキストメッセージ |
| 5 | 最もカジュアル | スラング、親密な会話、ソーシャルメディア |

### 丁寧さスケール（ユニバーサル）

| レベル | 説明 | 例 |
|-------|-------------|----------|
| 1 | 最も敬意のある | 王室への呼びかけ、宗教指導者、年配者への敬意 |
| 2 | 非常に丁寧 | カスタマーサービス、フォーマルな会議、教師 |
| 3 | 丁寧/ニュートラル | 標準的なやり取り、同僚 |
| 4 | 親しみやすい | 友人、仲間、カジュアルな知人 |
| 5 | 親密/平易 | 親しい家族、親密なパートナー |

### 専門知識スケール（ユニバーサル）

| レベル | 説明 |
|-------|-------------|
| 0 | 知識なし |
| 1-2 | 初心者 |
| 3-4 | 中級 |
| 5-6 | 上級 |
| 7-8 | エキスパート |
| 9-10 | マスター/権威 |

### タブースケール（ユニバーサル）

| レベル | 説明 |
|-------|-------------|
| 0 | タブーコンテンツなし |
| 1 | 軽度のタブー |
| 2 | 軽いタブー |
| 3 | 中程度のタブー |
| 4 | 高いタブー |
| 5 | 極端なタブー |

### 語彙密度スケール（ユニバーサル）

| レベル | 説明 |
|-------|-------------|
| 0-20 | 非常に低い密度 |
| 21-40 | 低い密度 |
| 41-60 | 中程度の密度 |
| 61-80 | 高い密度 |
| 81-100 | 非常に高い密度 |

### 構文的複雑さスケール（ユニバーサル）

| レベル | 説明 |
|-------|-------------|
| 0-20 | 非常に単純 |
| 21-40 | 単純 |
| 41-60 | 中程度の複雑さ |
| 61-80 | 複雑 |
| 81-100 | 非常に複雑 |

### ドメイン値

| 値 | 説明 |
|-------|-------------|
| `legal` | 法律用語 |
| `med` | 医学用語 |
| `tech` | 技術/IT |
| `business` | ビジネス/企業 |
| `fin` | 金融/銀行 |
| `acad` | 学術/学問 |
| `sci` | 科学/研究 |

## 実装例

### 単一分類器（長形式）
```
# 最もフォーマルな韓国語
ko-x-form-1

# 非常に丁寧な日本語
ja-x-polite-2

# 法律英語
en-x-domain-legal

# 慶尚道韓国語
ko-x-geo-gyeong

# 印欧祖語
x-proto-ine
```

### 単一分類器（短形式）
```
# 最もフォーマルな韓国語
ko-x-f-1

# 非常に丁寧な日本語
ja-x-p-2

# 法律英語
en-x-d-legal

# 慶尚道韓国語
ko-x-g-gyeong

# 印欧祖語
x-a-ine
```

### 複数の分類器
```
# インフォーマルだが丁寧な韓国語ビジネス言語
ko-x-form-4-polite-2-domain-business
ko-x-f-4-p-2-d-business

# フォーマルで敬意のある日本語医学言語
ja-x-form-1-polite-1-domain-med
ja-x-f-1-p-1-d-med

# ニュートラルなフォーマルさ、丁寧な話し言葉、技術的ドメインの南ベトナム語
vi-x-geo-southern-form-3-polite-2-domain-tech
vi-x-g-southern-f-3-p-2-d-tech

# 複数の次元を持つ複雑な分類
en-x-h-middle-e-poetry-m-written-f-1
ja-x-f-2-p-1-d-med-h-kobun-m-written

# フォーマルさ/丁寧さの区別を示す言語変種
ko-x-f-5-p-2  # 非常にカジュアルだが丁寧（年上の友人に）
ko-x-f-1-p-4  # 非常にフォーマルだが親しみやすい（同僚への書面）
ja-x-f-4-p-1  # カジュアルなフォーマルさだが最高の敬意
en-x-f-5-j-4  # 非常にカジュアルな英語で高いタブーレベル
```

## 使用例

1. **言語学習アプリケーション**
   - 異なる社会的コンテキストに適したレジスターを教える
   - ドメイン固有の語彙トレーニングを提供する

2. **機械翻訳**
   - 翻訳でレジスターの一貫性を維持する
   - ドメイン固有の用語を適用する

3. **コンテンツ分類**
   - フォーマルさとドメインによってテキストを自動的に分類する
   - 適切なレビュアーまたはシステムにコンテンツをルーティングする

4. **コーパス言語学**
   - 言語研究のためのタグ付きコーパスを構築する
   - レジスターとドメインの変化を研究する

## 検証ルール

1. **サブタグの長さ**：`x-` の後の各サブタグは 8 文字以下でなければならない
2. **順序**：分類器は `x-` の後に任意の順序で表示できる
3. **一意性**：各分類器タイプはタグごとに 1 回のみ表示されるべきである（複数回表示できる `conf` を除く）
4. **大文字小文字**：タグは小文字であるべきである（BCP 47 に従って大文字小文字を区別しない）
5. **マジックタグ**：短形式タグは単一文字である；`q`、`3`-`9` は将来の使用のために予約されている
6. **混在**：長形式と短形式は同じタグ内で混在できる
7. **祖語タグ**：`x-` で始まる必要があり、利用可能な場合は ISO 639-5 コードを使用すべきである（例：`x-proto-sla` であり `x-proto-slavic` ではない）
8. **信頼度**：`conf`/`c` 分類器は直前の分類器に適用される
9. **数値**：定義された範囲内でなければならない（タブーは 0-5、専門知識は 0-10、パーセンテージ値は 0-100）
10. **日付形式**：日付は句読点なしの ISO 8601 を使用する（YYYY、YYYYMM、または YYYYMMDD）

## 互換性

LVTag フォーマットは以下と完全に互換性があります：
- BCP 47 (RFC 5646)
- ISO 639 言語コード
- IANA Language Subtag Registry
- Unicode CLDR

## 利点

1. **精度**：細かい言語変種識別を可能にする
2. **拡張性**：新しいレジスターとドメインを追加できる
3. **標準ベース**：確立された BCP 47 プライベート使用メカニズム上に構築
4. **機械可読**：体系的なフォーマットにより自動処理が可能
5. **人間可読**：明確で記述的なサブタグ
6. **柔軟性**：詳細な長形式と簡潔な短形式タグの両方をサポート
7. **簡潔さ**：短いマジックタグにより、明確さを維持しながらコンパクトな表現が可能

## 将来の拡張

LVTag は言語技術コミュニティのニーズとともに進化するように設計されています。新しい分類器の提案、既存の分類器の改善、実際の実装からのフィードバックを歓迎します。

拡張を提案したり、仕様に貢献したりするには：
- [github.com/lvtag/spec](https://github.com/lvtag/spec) で問題を開く
- 既存の提案に関する議論に参加する
- 実装経験を共有する
- ドキュメントの改善のためのプルリクエストを送信する

予約された単一文字コード（`q`、`3`-`9`）は、将来の標準化された拡張のために利用可能です。

## 参考文献

- [BCP 47: 言語を識別するためのタグ](https://www.rfc-editor.org/rfc/rfc5646.html)
- [IANA Language Subtag Registry](https://www.iana.org/assignments/language-subtag-registry/)

---

## ライセンスと特許許可

この仕様は **CC0 1.0 Universal (Public Domain Dedication)** の下でリリースされています。

**なぜ CC0**：最大限の採用と実装の自由を確保するため、LVTag はパブリックドメインに置かれています。これは以下を意味します：
- 使用、実装、または変更に許可は不要
- 帰属は不要（ただし感謝される）
- 商業的または政府の使用に法的障壁なし
- すべてのソフトウェアライセンスと互換性がある
- Unicode CLDR などの主要な標準で使用されている

**特許許可**：LVTag 仕様をカバーするすべての特許は、この仕様に準拠するすべての実装に対してロイヤリティフリーでライセンスされます。

**推奨なし**：LVTag の使用は、仕様作成者による推奨を意味するものではありません。

法律で許可される範囲で、**Danslav Slavenskoj** は Language Variant Tag (LVTag) Format Specification に対するすべての著作権および関連または隣接する権利を放棄しました。この作品は以下から公開されています：アメリカ合衆国。
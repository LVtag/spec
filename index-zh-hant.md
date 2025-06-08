---
layout: default
title: 語言變體標籤（LVTag）規範
lang: zh-Hant
description: "LVTag是一種系統化的語言分類方法，通過使用私有子標籤擴展BCP 47，以精確識別跨正式性、禮貌程度、領域和正字法維度的語言變體。"
---

<div align="center">
  <img src="/LVTAG_LOGO.png" alt="LVTag Logo" width="100">
</div>

# LVTag 規範

**版本 1.0**  
**創建者：Danslav Slavenskoj**  
**日期：2025年5月**

**語言**：[中文简体](/index-zh.md)  中文繁體  [Čeština](/index-cs.md)  [Deutsch](/index-de.md)  [English](/index.md)  [Español](/index-es.md)  [Français](/index-fr.md)  [Hrvatski](/index-hr.md)  [日本語](/index-ja.md)  [한국어](/index-ko.md)  [Polski](/index-pl.md)  [Português](/index-pt.md)  [Русский](/index-ru.md)  [Српски](/index-sr.md)

## 快速連結

- [JSON Schema](/lvtag-schema.json) - LVTag 格式的完整驗證模式
- [分類器定義](/lvtag-classifiers.json) - 機器可讀的分類器規範
- [規範](#格式規範) - 跳轉到格式詳情
- [示例](#實現示例) - 查看 LVTag 實際應用

## 概述

語言變體標記（LVTag）格式是一種系統化的語言分類方法，它使用私有用途子標籤擴展了 BCP 47 標準。它能夠跨多個維度精確識別語言變體，包括正式程度、禮貌程度、領域和正字法。

### 主要優勢

**分類嚴謹性**：LVTag 通過為不同類型的變體提供清晰、獨立的維度，為語言標記帶來了系統化的組織。與現有的在同一級別混合不同類別的子標籤和系統不同，LVTag 在正式程度、禮貌程度、領域和其他維度之間保持嚴格的分離。

**標準相容性**：LVTag 完全符合 BCP 47（RFC 5646）並與以下標準無縫協作：
- IANA 語言子標籤註冊表
- ISO 639 語言代碼
- Unicode CLDR
- W3C 語言標籤
- HTTP Accept-Language 頭
- XML lang 屬性
- HTML lang 屬性

**技術整合**：LVTag 標籤可直接用於：
- 自然語言處理（NLP）管道
- 機器翻譯系統
- 內容管理系統（CMS）
- 語言檢測庫
- 搜尋引擎和資訊檢索
- Web 應用程式和 API
- 本地化工作流程

**使用案例**：
- **受眾定位**：根據語域和領域將內容匹配到合適的受眾
- **翻譯品質**：在機器翻譯中保持適當的正式程度和禮貌程度
- **語言學習**：教導學習者在不同語境中使用適當的語域
- **語料庫語言學**：為研究構建精確標記的語料庫
- **社群媒體分析**：按語域和領域對使用者生成的內容進行分類
- **客戶服務**：根據正式程度和領域將訊息路由到合適的客服人員

## 理論依據

雖然 BCP 47 為識別語言、文字和地區提供了出色的支援，但它缺乏捕獲語言內部社會語言學變體的標準化機制。當前標準未能解決：

- **語域變體**：無法區分同一語言的正式和非正式變體
- **禮貌程度**：對於日語、韓語和泰語等文法編碼禮貌的語言至關重要
- **特定領域語言**：沒有標記技術、醫學或法律語言變體的標準
- **社會方言**：沒有識別社會群體變體（青年語言、專業行話）的機制
- **歷史階段**：對區分古典形式和現代形式的支援有限
- **正式程度梯度**：沒有用於計算處理語域的數字量表
- **原始語言**：編碼不一致 - 一些原始語言有 ISO 代碼（例如，PIE 的 `ine`），而其他的沒有，ISO 639-5 族代碼在 BCP 47 標籤中無效，為歷史語言學創造了一個混亂的景觀
- **正字法變體**：雖然 BCP 47 處理文字，但它不能有效地捕獲文字內的變體（拼寫改革、羅馬化系統、競爭標準），這些從根本上影響文字處理、搜尋和拼寫檢查

LVTag 使用 BCP 47 的私有用途擴展機制（`-x-`）填補了這些空白，提供了一種系統化、機器可讀的方式來編碼語言變體的這些關鍵維度，同時保持完全的向後相容性。

### 精確的語言分類

大型語言模型和複雜 NLP 工具的出現使得精確的語言變體分類不僅有用而且必不可少。現代系統需要：

- 生成適合特定語境的文字（正式與非正式、禮貌與隨意）
- 在正確分類的語料庫上進行訓練，以避免不當地混合語域
- 提供文化和語境上適當的回應
- 準確處理代碼切換和混合語言內容
- 在翻譯或轉換文字時保持風格一致性
- 根據正式程度、領域或其他特徵過濾訓練資料
- 調整輸出以匹配使用者偏好或要求

LVTag 提供了理解不僅使用什麼語言，而且如何使用語言所需的細粒度元資料，從而實現更細緻和適當的語言處理管道。

## 格式規範

### 基本結構

```
language-x-[classifier]-[value]-[classifier2]-[value2]...
```

其中：
- `language` 是有效的 BCP 47 主語言子標籤（例如，`en`、`ko`、`ja`）
- `x` 表示私有用途子標籤的開始
- `classifier` 是類別識別符（參見下面的魔術標籤）
- `value` 是該類別內的特定分類

### 魔術標籤

LVTag 支援長格式和短格式「魔術」分類器以提供靈活性：

| 長格式 | 短格式 | 描述 |
|-----------|------------|-------------|
| `ortho` | `w` | 正字法變體 |
| `form` | `f` | 正式程度（1-5 級） |
| `polite` | `p` | 禮貌/尊敬程度（1-5 級） |
| `domain` | `d` | 專業詞彙或專業語境 |
| `geo` | `g` | 地理或地區變體 |
| `proto` | `a` | 原始語言或重建語言 |
| `hist` | `h` | 語言的歷史時期或階段 |
| `genre` | `e` | 文字體裁或文學風格 |
| `medium` | `m` | 交流媒介（口語、書面語、數位） |
| `socio` | `s` | 社會方言或社會群體變體 |
| `modality` | `o` | 語言產生模式 |
| `register` | `r` | 語言語域 |
| `pragma` | `u` | 交際功能 |
| `temporal` | `t` | 時間標記 |
| `evidence` | `v` | 資訊來源 |
| `affect` | `k` | 情感語調 |
| `age` | `n` | 年齡/世代變體 |
| `gender` | `i` | 性別變體 |
| `expert` | `b` | 專業水平 |
| `interact` | `2` | 互動結構 |
| `prosody` | `y` | 韻律特徵 |
| `lexical` | `l` | 詞彙密度（0-100） |
| `syntax` | `z` | 句法複雜度（0-100） |
| `start` | `0` | 開始日期（無標點的 ISO 8601） |
| `end` | `1` | 結束日期（無標點的 ISO 8601） |
| `taboo` | `j` | 禁忌/粗俗內容級別（0-5 級） |
| `conf` | `c` | 前一個標籤的置信度分數（0-100） |
| — | `q`、`3`-`9` | 保留供將來使用 |

### 分類器

#### 1. 正字法分類器（`ortho` 或 `w`）
識別標準文字標籤之外的特定正字法約定或書寫系統變體。

格式：
- 長格式：`language-x-ortho-[variant]`
- 短格式：`language-x-w-[variant]`

示例（與標準文字標籤結合）：
- `az-Latn-x-ortho-new` 或 `az-Latn-x-w-new` - 亞塞拜然拉丁文字，新正字法
- `de-Latn-x-ortho-1901` 或 `de-Latn-x-w-1901` - 德語拉丁文字，1901 正字法
- `zh-Hans-x-ortho-pinyin` 或 `zh-Hans-x-w-pinyin` - 帶拼音的簡體中文
- `yi-Hebr-x-ortho-yivo` 或 `yi-Hebr-x-w-yivo` - 意第緒語希伯來文字，YIVO 正字法

#### 2. 正式程度分類器（`form` 或 `f`）
識別語言使用的正式程度。

格式：
- 長格式：`language-x-form-[1-5]`
- 短格式：`language-x-f-[1-5]`

正式程度量表：
- 1 = 最正式（書面文件、官方演講）
- 2 = 正式（商務會議、學術寫作）
- 3 = 中性/標準（新聞、一般對話）
- 4 = 非正式（隨意對話、給朋友的電子郵件）
- 5 = 最隨意（親密對話、俚語）

示例：
- `ko-x-form-1` 或 `ko-x-f-1` - 最正式的韓語
- `en-x-form-3` 或 `en-x-f-3` - 中性英語
- `ja-x-form-5` 或 `ja-x-f-5` - 最隨意的日語

#### 3. 禮貌分類器（`polite` 或 `p`）
識別語言使用的禮貌/尊敬程度。

格式：
- 長格式：`language-x-polite-[1-5]`
- 短格式：`language-x-p-[1-5]`

禮貌程度量表：
- 1 = 最尊敬/恭敬（皇室稱呼、宗教語境）
- 2 = 非常禮貌（正式敬語、尊敬的講話）
- 3 = 禮貌/中性（標準禮貌）
- 4 = 熟悉（平等之間、朋友）
- 5 = 親密/平實（家人、非常親密的朋友）

示例：
- `ko-x-polite-1` 或 `ko-x-p-1` - 最高敬語韓語
- `ja-x-polite-2` 或 `ja-x-p-2` - 非常禮貌的日語
- `th-x-polite-3` 或 `th-x-p-3` - 標準禮貌的泰語

#### 4. 領域分類器（`domain` 或 `d`）
識別專業詞彙或專業語境。

格式：
- 長格式：`language-x-domain-[domain_type]`
- 短格式：`language-x-d-[domain_type]`

示例：
- `en-x-domain-legal` 或 `en-x-d-legal` - 法律英語
- `ja-x-domain-med` 或 `ja-x-d-med` - 醫學日語
- `ko-x-domain-business` 或 `ko-x-d-business` - 商務韓語
- `ja-x-domain-tech` 或 `ja-x-d-tech` - 技術日語
- `en-x-domain-fin` 或 `en-x-d-fin` - 金融英語

#### 5. 地理分類器（`geo` 或 `g`）
識別地區或地理語言變體。

格式：
- 長格式：`language-x-geo-[region]`
- 短格式：`language-x-g-[region]`

示例：
- `ko-x-geo-gyeong` 或 `ko-x-g-gyeong` - 慶尚道韓語（경상도）
- `ko-x-geo-jeolla` 或 `ko-x-g-jeolla` - 全羅道韓語（전라도）
- `es-x-geo-riopla` 或 `es-x-g-riopla` - 拉普拉塔河西班牙語
- `pt-x-geo-nordeste` 或 `pt-x-g-nordeste` - 巴西東北部葡萄牙語

#### 6. 原始語言分類器（`proto` 或 `a`）
識別原始語言或重建的歷史語言。

格式：
- 長格式：`x-proto-[iso639-5_code if available]`
- 短格式：`x-a-[iso639-5_code if available]`

規則：
- 必須在可用時使用 ISO 639-5 語言族代碼
- 僅在沒有 ISO 639-5 代碼時使用描述性識別符

使用 ISO 639-5 代碼的示例：
- `x-proto-ine` 或 `x-a-ine` - 原始印歐語
- `x-proto-gem` 或 `x-a-gem` - 原始日耳曼語
- `x-proto-sla` 或 `x-a-sla` - 原始斯拉夫語
- `x-proto-sem` 或 `x-a-sem` - 原始閃米特語
- `x-proto-cel` 或 `x-a-cel` - 原始凱爾特語
- `x-proto-ira` 或 `x-a-ira` - 原始伊朗語
- `x-proto-inc` 或 `x-a-inc` - 原始印度-雅利安語
- `x-proto-bat` 或 `x-a-bat` - 原始波羅的語
- `x-proto-roa` 或 `x-a-roa` - 原始羅曼語
- `x-proto-trk` 或 `x-a-trk` - 原始突厥語

沒有 ISO 639-5 代碼的示例（描述性，超過三個字元）：
- `x-proto-baltslav` 或 `x-a-baltslav` - 原始波羅的-斯拉夫語（無 ISO 639-5 代碼）

注意：
- 語言族代碼（ISO 639-5）作為標準的主要 BCP 47 語言標籤無效，這就是我們使用 x-proto 實現它們的原因
- 它們在私有用途擴展中有效且首選（在 `x-` 之後）
- 因此，所有原始語言標籤必須以 `x-` 開頭以符合 BCP 47

#### 7. 歷史分類器（`hist` 或 `h`）
識別語言的歷史時期或階段。

格式：
- 長格式：`language-x-hist-[period]`
- 短格式：`language-x-h-[period]`

示例：
- `en-x-hist-old` 或 `en-x-h-old` - 古英語時期
- `en-x-hist-middle` 或 `en-x-h-middle` - 中古英語時期
- `ja-x-hist-kobun` 或 `ja-x-h-kobun` - 古典日語（古文）
- `ko-x-hist-hunmin` 或 `ko-x-h-hunmin` - 中古韓語（훈민정음 時期）
- `el-x-hist-koine` 或 `el-x-h-koine` - 通用希臘語（Κοινή）
- `sa-x-hist-vedic` 或 `sa-x-h-vedic` - 吠陀梵語（वैदिक）

#### 8. 體裁分類器（`genre` 或 `e`）
識別文字體裁或文學風格。

格式：
- 長格式：`language-x-genre-[genre_type]`
- 短格式：`language-x-e-[genre_type]`

示例：
- `en-x-genre-news` 或 `en-x-e-news` - 新聞英語
- `ja-x-genre-manga` 或 `ja-x-e-manga` - 漫畫日語（漫画）
- `ko-x-genre-webtoon` 或 `ko-x-e-webtoon` - 韓國網路漫畫（웹툰）
- `zh-x-genre-shi` 或 `zh-x-e-shi` - 中國詩歌（詩）
- `fr-x-genre-bd` 或 `fr-x-e-bd` - 法國漫畫（bande dessinée）
- `de-x-genre-marchen` 或 `de-x-e-marchen` - 德國童話（Märchen）

#### 9. 媒介分類器（`medium` 或 `m`）
識別交流媒介。

格式：
- 長格式：`language-x-medium-[medium_type]`
- 短格式：`language-x-m-[medium_type]`

示例：
- `en-x-medium-spoken` 或 `en-x-m-spoken` - 口語英語
- `ko-x-medium-digital` 或 `ko-x-m-digital` - 數位/線上韓語
- `ja-x-medium-written` 或 `ja-x-m-written` - 書面日語
- `hi-x-medium-bcast` 或 `hi-x-m-bcast` - 廣播印地語
- `zh-x-medium-sms` 或 `zh-x-m-sms` - 簡訊/文字訊息中文

#### 10. 社會方言分類器（`socio` 或 `s`）
識別社會方言或社會群體變體。

格式：
- 長格式：`language-x-socio-[social_group]`
- 短格式：`language-x-s-[social_group]`

示例：
- `en-x-socio-academic` 或 `en-x-s-academic` - 學術社會方言
- `en-x-socio-urban` 或 `en-x-s-urban` - 城市社會方言
- `es-x-socio-juvenil` 或 `es-x-s-juvenil` - 西班牙青年社會方言（jerga juvenil）
- `fr-x-socio-jeune` 或 `fr-x-s-jeune` - 法國青年社會方言
- `de-x-socio-jugend` 或 `de-x-s-jugend` - 德國青年社會方言（Jugendsprache）
- `ko-x-socio-online` 或 `ko-x-s-online` - 韓國網路社會方言

#### 11. 模態分類器（`modality` 或 `o`）
識別語言產生的基本模式。

格式：
- 長格式：`language-x-modality-[mode]`
- 短格式：`language-x-o-[mode]`

示例：
- `en-x-modality-spoken` 或 `en-x-o-spoken` - 口語英語
- `en-x-modality-written` 或 `en-x-o-written` - 書面英語
- `asl-x-modality-signed` 或 `asl-x-o-signed` - 美國手語
- `en-x-modality-multi` 或 `en-x-o-multi` - 多模態英語（語音 + 手勢）
- `fr-x-modality-tactile` 或 `fr-x-o-tactile` - 觸覺法語（用於聾盲人）

#### 12. 語域分類器（`register` 或 `r`）
識別語言使用的語言語域或功能變體。

格式：
- 長格式：`language-x-register-[register_type]`
- 短格式：`language-x-r-[register_type]`

示例：
- `en-x-register-frozen` 或 `en-x-r-frozen` - 凍結語域（祈禱、誓言）
- `en-x-register-formal` 或 `en-x-r-formal` - 正式語域（學術論文）
- `en-x-register-consult` 或 `en-x-r-consult` - 諮詢語域（專業）
- `en-x-register-casual` 或 `en-x-r-casual` - 隨意語域（朋友）
- `en-x-register-intimate` 或 `en-x-r-intimate` - 親密語域（家人）

#### 13. 語用功能分類器（`pragma` 或 `u`）
識別交際功能或言語行為。

格式：
- 長格式：`language-x-pragma-[function]`
- 短格式：`language-x-u-[function]`

示例：
- `en-x-pragma-request` 或 `en-x-u-request` - 請求功能
- `ja-x-pragma-apology` 或 `ja-x-u-apology` - 道歉功能
- `es-x-pragma-complmnt` 或 `es-x-u-complmnt` - 讚美功能
- `ar-x-pragma-greeting` 或 `ar-x-u-greeting` - 問候功能
- `zh-x-pragma-refusal` 或 `zh-x-u-refusal` - 拒絕功能

#### 14. 時間標記分類器（`temporal` 或 `t`）
識別時間方面或時態使用模式。

格式：
- 長格式：`language-x-temporal-[aspect]`
- 短格式：`language-x-t-[aspect]`

示例：
- `en-x-temporal-past` 或 `en-x-t-past` - 過去導向的話語
- `ja-x-temporal-nonpast` 或 `ja-x-t-nonpast` - 非過去焦點
- `id-x-temporal-atemprl` 或 `id-x-t-atemprl` - 無時間/非時間性
- `fr-x-temporal-future` 或 `fr-x-t-future` - 未來導向
- `zh-x-temporal-aspect` 或 `zh-x-t-aspect` - 體貌焦點

#### 15. 證據性分類器（`evidence` 或 `v`）
識別資訊來源標記。

格式：
- 長格式：`language-x-evidence-[source]`
- 短格式：`language-x-v-[source]`

示例：
- `qu-x-evidence-direct` 或 `qu-x-v-direct` - 直接目擊
- `tr-x-evidence-hearsay` 或 `tr-x-v-hearsay` - 道聽途說/報告
- `ja-x-evidence-infer` 或 `ja-x-v-infer` - 推理性
- `en-x-evidence-assume` 或 `en-x-v-assume` - 假定
- `de-x-evidence-quote` 或 `de-x-v-quote` - 引用性

#### 16. 情感/情緒分類器（`affect` 或 `k`）
識別情感語調或情感。

格式：
- 長格式：`language-x-affect-[emotion]`
- 短格式：`language-x-k-[emotion]`

示例：
- `en-x-affect-angry` 或 `en-x-k-angry` - 憤怒的語調
- `ja-x-affect-humble` 或 `ja-x-k-humble` - 謙遜的情感
- `es-x-affect-joyful` 或 `es-x-k-joyful` - 快樂的表達
- `ko-x-affect-sad` 或 `ko-x-k-sad` - 悲傷/憂鬱
- `fr-x-affect-neutral` 或 `fr-x-k-neutral` - 中性情感

#### 17. 年齡/世代分類器（`age` 或 `n`）
識別與年齡相關或世代語言變體。

格式：
- 長格式：`language-x-age-[generation]`
- 短格式：`language-x-n-[generation]`

示例：
- `en-x-age-child` 或 `en-x-n-child` - 兒童語言
- `ja-x-age-teen` 或 `ja-x-n-teen` - 青少年語言
- `ko-x-age-elder` 或 `ko-x-n-elder` - 老年人語言
- `es-x-age-genz` 或 `es-x-n-genz` - Z 世代
- `zh-x-age-millenl` 或 `zh-x-n-millenl` - 千禧一代語言

#### 18. 性別分類器（`gender` 或 `i`）
識別與性別相關的語言變體。

格式：
- 長格式：`language-x-gender-[identity]`
- 短格式：`language-x-i-[identity]`

#### 19. 專業水平分類器（`expert` 或 `b`）
識別 0-10 級的領域專業水平。

格式：
- 長格式：`language-x-expert-[0-10]`
- 短格式：`language-x-b-[0-10]`

專業水平量表：
- 0 = 無知識
- 1-2 = 初學者
- 3-4 = 中級
- 5-6 = 高級
- 7-8 = 專家
- 9-10 = 大師/權威

示例：
- `en-x-expert-0` 或 `en-x-b-0` - 無專業知識
- `de-x-expert-3` 或 `de-x-b-3` - 中級水平
- `ja-x-expert-7` 或 `ja-x-b-7` - 專家水平
- `es-x-expert-9` 或 `es-x-b-9` - 大師水平
- `zh-x-expert-5` 或 `zh-x-b-5` - 高級水平

#### 20. 互動結構分類器（`interact` 或 `2`）
識別對話或互動模式。

格式：
- 長格式：`language-x-interact-[structure]`
- 短格式：`language-x-2-[structure]`

示例：
- `en-x-interact-turn` 或 `en-x-2-turn` - 輪流發言
- `ja-x-interact-overlap` 或 `ja-x-2-overlap` - 重疊語言
- `es-x-interact-monolog` 或 `es-x-2-monolog` - 獨白式
- `ar-x-interact-dialog` 或 `ar-x-2-dialog` - 對話式
- `zh-x-interact-multi` 或 `zh-x-2-multi` - 多方

#### 21. 韻律特徵分類器（`prosody` 或 `y`）
識別韻律或超音段特徵。

格式：
- 長格式：`language-x-prosody-[feature]`
- 短格式：`language-x-y-[feature]`

示例：
- `en-x-prosody-stress` 或 `en-x-y-stress` - 重音計時
- `ja-x-prosody-pitch` 或 `ja-x-y-pitch` - 音高重音
- `fr-x-prosody-syllable` 或 `fr-x-y-syllable` - 音節計時
- `zh-x-prosody-tone` 或 `zh-x-y-tone` - 聲調模式
- `es-x-prosody-rhythm` 或 `es-x-y-rhythm` - 節奏模式

#### 22. 詞彙密度分類器（`lexical` 或 `l`）
將詞彙密度識別為數值（0-100）。

格式：
- 長格式：`language-x-lexical-[0-100]`
- 短格式：`language-x-l-[0-100]`

示例：
- `en-x-lexical-20` 或 `en-x-l-20` - 低密度（20%）
- `de-x-lexical-55` 或 `de-x-l-55` - 中等密度（55%）
- `ja-x-lexical-75` 或 `ja-x-l-75` - 高密度（75%）
- `es-x-lexical-40` 或 `es-x-l-40` - 適度密度（40%）
- `zh-x-lexical-85` 或 `zh-x-l-85` - 非常高密度（85%）

#### 23. 句法複雜度分類器（`syntax` 或 `z`）
將句法複雜度識別為數值（0-100）。

格式：
- 長格式：`language-x-syntax-[0-100]`
- 短格式：`language-x-z-[0-100]`

示例：
- `en-x-syntax-15` 或 `en-x-z-15` - 簡單句法（15%）
- `de-x-syntax-70` 或 `de-x-z-70` - 複雜句法（70%）
- `ja-x-syntax-45` 或 `ja-x-z-45` - 中等複雜度（45%）
- `es-x-syntax-30` 或 `es-x-z-30` - 低複雜度（30%）
- `zh-x-syntax-60` 或 `zh-x-z-60` - 高複雜度（60%）

#### 24. 開始日期分類器（`start` 或 `0`）
識別語言使用的開始日期（無標點的 ISO 8601 格式）。

格式：
- 長格式：`language-x-start-[YYYYMMDD]`
- 短格式：`language-x-0-[YYYYMMDD]`

日期格式：
- 完整日期：YYYYMMDD
- 年-月：YYYYMM
- 僅年份：YYYY

示例：
- `en-x-start-20240315` 或 `en-x-0-20240315` - 從 2024 年 3 月 15 日開始的英語
- `ja-x-start-19890108` 或 `ja-x-0-19890108` - 從 1989 年 1 月 8 日開始的日語
- `es-x-start-202403` 或 `es-x-0-202403` - 從 2024 年 3 月開始的西班牙語

#### 25. 結束日期分類器（`end` 或 `1`）
識別語言使用的結束日期（無標點的 ISO 8601 格式）。

格式：
- 長格式：`language-x-end-[YYYYMMDD]`
- 短格式：`language-x-1-[YYYYMMDD]`

日期格式：
- 完整日期：YYYYMMDD
- 年-月：YYYYMM
- 僅年份：YYYY

示例：
- `en-x-end-20240415` 或 `en-x-1-20240415` - 到 2024 年 4 月 15 日結束的英語
- `ja-x-end-20190430` 或 `ja-x-1-20190430` - 到 2019 年 4 月 30 日結束的日語
- `es-x-end-202412` 或 `es-x-1-202412` - 到 2024 年 12 月結束的西班牙語

#### 26. 禁忌分類器（`taboo` 或 `j`）
識別禁忌、粗俗或冒犯性內容的級別。

格式：
- 長格式：`language-x-taboo-[0-5]`
- 短格式：`language-x-j-[0-5]`

示例：
- `en-x-taboo-0` 或 `en-x-j-0` - 無禁忌內容
- `en-x-taboo-3` 或 `en-x-j-3` - 中等禁忌級別
- `ja-x-form-5-taboo-4` 或 `ja-x-f-5-j-4` - 非常隨意的日語，禁忌級別高

#### 27. 置信度分類器（`conf` 或 `c`）
表示緊鄰前面的分類器的置信度分數。

格式：
- 長格式：`language-x-[classifier]-[value]-conf-[0-100]`
- 短格式：`language-x-[classifier]-[value]-c-[0-100]`

特殊行為：
- 置信度分數適用於緊鄰其前的分類器
- 可以為不同的分類器使用多個置信度分數
- 如果前面沒有分類器，置信度適用於基本語言標籤

示例：
- `en-x-form-3-conf-95` 或 `en-x-f-3-c-95` - 中性正式程度，置信度 95%
- `ko-x-polite-2-conf-80-domain-med-conf-60` 或 `ko-x-p-2-c-80-d-med-c-60` - 非常禮貌（80% 置信度）醫學韓語（60% 置信度）
- `ja-x-hist-kobun-conf-100` 或 `ja-x-h-kobun-c-100` - 古典日語，置信度 100%
- `x-proto-ine-conf-75` 或 `x-a-ine-c-75` - 原始印歐語，置信度 75%

### 多重分類

LVTag 支援在單個標籤中使用多個分類器以提供精確的語言識別。長格式和短格式可以混合使用：

```
ko-x-form-4-domain-business
ko-x-f-4-d-business
ko-x-form-4-polite-2-domain-business
ko-x-f-4-p-2-d-business
```

上述示例顯示了在商務語境中具有非正式正式程度（4）但禮貌語言（2）的韓語。

## 有效值

**注意**：所有值必須為 8 個字元或更短，以符合 BCP 47 子標籤長度限制。雖然許多分類器的特定值將通過專家使用和社群共識來建立，但本標準中定義了數字量表、日期格式和下面列出的基本值。

### 正式程度量表（通用）

| 級別 | 描述 | 示例 |
|-------|-------------|----------|
| 1 | 最正式 | 法律文件、官方儀式、學術論文 |
| 2 | 正式 | 商務信函、新聞文章、演示文稿 |
| 3 | 中性 | 標準對話、電子郵件、一般寫作 |
| 4 | 非正式 | 隨意對話、個人部落格、簡訊 |
| 5 | 最隨意 | 俚語、親密對話、社群媒體 |

### 禮貌程度量表（通用）

| 級別 | 描述 | 示例 |
|-------|-------------|----------|
| 1 | 最尊敬 | 皇室稱呼、宗教領袖、老年人尊敬 |
| 2 | 非常禮貌 | 客戶服務、正式會議、教師 |
| 3 | 禮貌/中性 | 標準互動、同事 |
| 4 | 熟悉 | 朋友、同伴、隨意的熟人 |
| 5 | 親密/平實 | 親密的家人、親密的伴侶 |

### 專業水平量表（通用）

| 級別 | 描述 |
|-------|-------------|
| 0 | 無知識 |
| 1-2 | 初學者 |
| 3-4 | 中級 |
| 5-6 | 高級 |
| 7-8 | 專家 |
| 9-10 | 大師/權威 |

### 禁忌量表（通用）

| 級別 | 描述 |
|-------|-------------|
| 0 | 無禁忌內容 |
| 1 | 輕微禁忌 |
| 2 | 輕度禁忌 |
| 3 | 中等禁忌 |
| 4 | 高度禁忌 |
| 5 | 極端禁忌 |

### 詞彙密度量表（通用）

| 級別 | 描述 |
|-------|-------------|
| 0-20 | 非常低密度 |
| 21-40 | 低密度 |
| 41-60 | 中等密度 |
| 61-80 | 高密度 |
| 81-100 | 非常高密度 |

### 句法複雜度量表（通用）

| 級別 | 描述 |
|-------|-------------|
| 0-20 | 非常簡單 |
| 21-40 | 簡單 |
| 41-60 | 中等複雜度 |
| 61-80 | 複雜 |
| 81-100 | 非常複雜 |

### 領域值

| 值 | 描述 |
|-------|-------------|
| `legal` | 法律術語 |
| `med` | 醫學術語 |
| `tech` | 技術/IT |
| `business` | 商業/企業 |
| `fin` | 金融/銀行 |
| `acad` | 學術/學者 |
| `sci` | 科學/研究 |

## 實現示例

### 單一分類器（長格式）
```
# 最正式的韓語
ko-x-form-1

# 非常禮貌的日語
ja-x-polite-2

# 法律英語
en-x-domain-legal

# 慶尚道韓語
ko-x-geo-gyeong

# 原始印歐語
x-proto-ine
```

### 單一分類器（短格式）
```
# 最正式的韓語
ko-x-f-1

# 非常禮貌的日語
ja-x-p-2

# 法律英語
en-x-d-legal

# 慶尚道韓語
ko-x-g-gyeong

# 原始印歐語
x-a-ine
```

### 多重分類器
```
# 非正式但禮貌的韓語商務語言
ko-x-form-4-polite-2-domain-business
ko-x-f-4-p-2-d-business

# 正式且尊敬的日語醫學語言
ja-x-form-1-polite-1-domain-med
ja-x-f-1-p-1-d-med

# 南越南語，中性正式程度，禮貌語言，技術領域
vi-x-geo-southern-form-3-polite-2-domain-tech
vi-x-g-southern-f-3-p-2-d-tech

# 具有多個維度的複雜分類
en-x-h-middle-e-poetry-m-written-f-1
ja-x-f-2-p-1-d-med-h-kobun-m-written

# 顯示正式程度/禮貌區別的語言變體
ko-x-f-5-p-2  # 非常隨意但禮貌（對年長的朋友）
ko-x-f-1-p-4  # 非常正式但熟悉（寫給同伴）
ja-x-f-4-p-1  # 隨意正式程度但最高敬意
en-x-f-5-j-4  # 非常隨意的英語，禁忌級別高
```

## 使用案例

1. **語言學習應用程式**
   - 教授不同社交語境的適當語域
   - 提供特定領域的詞彙訓練

2. **機器翻譯**
   - 在翻譯中保持語域一致性
   - 應用特定領域的術語

3. **內容分類**
   - 按正式程度和領域自動分類文字
   - 將內容路由到適當的審查員或系統

4. **語料庫語言學**
   - 為語言研究構建標記的語料庫
   - 研究語域和領域變體

## 驗證規則

1. **子標籤長度**：`x-` 之後的每個子標籤必須為 8 個字元或更少
2. **順序**：分類器可以在 `x-` 之後以任何順序出現
3. **唯一性**：每個分類器類型在每個標籤中應該只出現一次（除了可以多次出現的 `conf`）
4. **大小寫**：標籤應該是小寫的（根據 BCP 47 不區分大小寫）
5. **魔術標籤**：短格式標籤是單個字元；`q`、`3`-`9` 保留供將來使用
6. **混合**：長格式和短格式可以在同一標籤內混合
7. **原始標籤**：必須以 `x-` 開頭，並且應該在可用時使用 ISO 639-5 代碼（例如，`x-proto-sla` 而不是 `x-proto-slavic`）
8. **置信度**：`conf`/`c` 分類器適用於緊鄰前面的分類器
9. **數值**：必須在定義的範圍內（禁忌為 0-5，專業知識為 0-10，百分比值為 0-100）
10. **日期格式**：日期使用無標點的 ISO 8601（YYYY、YYYYMM 或 YYYYMMDD）

## 相容性

LVTag 格式完全相容：
- BCP 47（RFC 5646）
- ISO 639 語言代碼
- IANA 語言子標籤註冊表
- Unicode CLDR

## 優勢

1. **精確性**：實現細粒度的語言變體識別
2. **可擴展性**：可以添加新的語域和領域
3. **基於標準**：建立在已建立的 BCP 47 私有用途機制上
4. **機器可讀**：系統化格式支援自動處理
5. **人類可讀**：清晰、描述性的子標籤
6. **靈活性**：支援詳細的長格式和簡潔的短格式標籤
7. **簡潔性**：短魔術標籤在保持清晰的同時實現緊湊表示

## 未來擴展

LVTag 旨在隨著語言技術社群的需求而發展。我們歡迎對新分類器的建議、對現有分類器的改進以及實際實施回饋。

要提議擴展或為規範做出貢獻：
- 在 [github.com/lvtag/spec](https://github.com/lvtag/spec) 開啟問題
- 加入現有提案的討論
- 分享您的實施經驗
- 提交文件改進的拉取請求

保留的單字元代碼（`q`、`3`-`9`）可用於未來的標準化擴展。

## 參考資料

- [BCP 47：識別語言的標籤](https://www.rfc-editor.org/rfc/rfc5646.html)
- [IANA 語言子標籤註冊表](https://www.iana.org/assignments/language-subtag-registry/)

---

## 授權和專利授權

本規範在 **CC0 1.0 通用（公共領域奉獻）** 下發布。

**為什麼選擇 CC0**：為確保最大程度的採用和實施自由，LVTag 被置於公共領域。這意味著：
- 無需許可即可使用、實施或修改
- 無需署名（儘管感謝）
- 商業或政府使用沒有法律障礙
- 與所有軟體授權相容
- 被 Unicode CLDR 等主要標準使用

**專利授權**：涵蓋 LVTag 規範的任何專利特此免版稅許可，適用於符合本規範的任何實施。

**無背書**：使用 LVTag 並不意味著規範作者的背書。

在法律允許的範圍內，**Danslav Slavenskoj** 已放棄語言變體標記（LVTag）格式規範的所有版權和相關或鄰接權。本作品發布自：美利堅合眾國。
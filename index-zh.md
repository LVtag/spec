---
layout: default
title: 语言变体标签（LVTag）规范
lang: zh
description: "LVTag是一种系统化的语言分类方法，通过使用私有子标签扩展BCP 47，以精确识别跨正式性、礼貌程度、领域和正字法维度的语言变体。"
---

# LVTag 规范

**版本 1.0**  
**创建者：Danslav Slavenskoj**  
**日期：2025年5月**

**语言**：中文简体  [中文繁體](/index-zh-hant.md)  [Čeština](/index-cs.md)  [Deutsch](/index-de.md)  [English](/index.md)  [Español](/index-es.md)  [Français](/index-fr.md)  [Hrvatski](/index-hr.md)  [日本語](/index-ja.md)  [한국어](/index-ko.md)  [Polski](/index-pl.md)  [Português](/index-pt.md)  [Русский](/index-ru.md)  [Српски](/index-sr.md)

## 快速链接

- [JSON Schema](/lvtag-schema.json) - LVTag 格式的完整验证模式
- [分类器定义](/lvtag-classifiers.json) - 机器可读的分类器规范
- [规范](#格式规范) - 跳转到格式详情
- [示例](#实现示例) - 查看 LVTag 实际应用

## 概述

语言变体标记（LVTag）格式是一种系统化的语言分类方法，它使用私有用途子标签扩展了 BCP 47 标准。它能够跨多个维度精确识别语言变体，包括正式程度、礼貌程度、领域和正字法。

### 主要优势

**分类严谨性**：LVTag 通过为不同类型的变体提供清晰、独立的维度，为语言标记带来了系统化的组织。与现有的在同一级别混合不同类别的子标签和系统不同，LVTag 在正式程度、礼貌程度、领域和其他维度之间保持严格的分离。

**标准兼容性**：LVTag 完全符合 BCP 47（RFC 5646）并与以下标准无缝协作：
- IANA 语言子标签注册表
- ISO 639 语言代码
- Unicode CLDR
- W3C 语言标签
- HTTP Accept-Language 头
- XML lang 属性
- HTML lang 属性

**技术集成**：LVTag 标签可直接用于：
- 自然语言处理（NLP）管道
- 机器翻译系统
- 内容管理系统（CMS）
- 语言检测库
- 搜索引擎和信息检索
- Web 应用程序和 API
- 本地化工作流程

**使用案例**：
- **受众定位**：根据语域和领域将内容匹配到合适的受众
- **翻译质量**：在机器翻译中保持适当的正式程度和礼貌程度
- **语言学习**：教导学习者在不同语境中使用适当的语域
- **语料库语言学**：为研究构建精确标记的语料库
- **社交媒体分析**：按语域和领域对用户生成的内容进行分类
- **客户服务**：根据正式程度和领域将消息路由到合适的客服人员

## 理论依据

虽然 BCP 47 为识别语言、文字和地区提供了出色的支持，但它缺乏捕获语言内部社会语言学变体的标准化机制。当前标准未能解决：

- **语域变体**：无法区分同一语言的正式和非正式变体
- **礼貌程度**：对于日语、韩语和泰语等语法编码礼貌的语言至关重要
- **特定领域语言**：没有标记技术、医学或法律语言变体的标准
- **社会方言**：没有识别社会群体变体（青年语言、专业行话）的机制
- **历史阶段**：对区分古典形式和现代形式的支持有限
- **正式程度梯度**：没有用于计算处理语域的数字量表
- **原始语言**：编码不一致 - 一些原始语言有 ISO 代码（例如，PIE 的 `ine`），而其他的没有，ISO 639-5 族代码在 BCP 47 标签中无效，为历史语言学创造了一个混乱的景观
- **正字法变体**：虽然 BCP 47 处理文字，但它不能有效地捕获文字内的变体（拼写改革、罗马化系统、竞争标准），这些从根本上影响文本处理、搜索和拼写检查

LVTag 使用 BCP 47 的私有用途扩展机制（`-x-`）填补了这些空白，提供了一种系统化、机器可读的方式来编码语言变体的这些关键维度，同时保持完全的向后兼容性。

### 精确的语言分类

大型语言模型和复杂 NLP 工具的出现使得精确的语言变体分类不仅有用而且必不可少。现代系统需要：

- 生成适合特定语境的文本（正式与非正式、礼貌与随意）
- 在正确分类的语料库上进行训练，以避免不当地混合语域
- 提供文化和语境上适当的响应
- 准确处理代码切换和混合语言内容
- 在翻译或转换文本时保持风格一致性
- 根据正式程度、领域或其他特征过滤训练数据
- 调整输出以匹配用户偏好或要求

LVTag 提供了理解不仅使用什么语言，而且如何使用语言所需的细粒度元数据，从而实现更细致和适当的语言处理管道。

## 格式规范

### 基本结构

```
language-x-[classifier]-[value]-[classifier2]-[value2]...
```

其中：
- `language` 是有效的 BCP 47 主语言子标签（例如，`en`、`ko`、`ja`）
- `x` 表示私有用途子标签的开始
- `classifier` 是类别标识符（参见下面的魔术标签）
- `value` 是该类别内的特定分类

### 魔术标签

LVTag 支持长格式和短格式"魔术"分类器以提供灵活性：

| 长格式 | 短格式 | 描述 |
|-----------|------------|-------------|
| `ortho` | `w` | 正字法变体 |
| `form` | `f` | 正式程度（1-5 级） |
| `polite` | `p` | 礼貌/尊敬程度（1-5 级） |
| `domain` | `d` | 专业词汇或专业语境 |
| `geo` | `g` | 地理或地区变体 |
| `proto` | `a` | 原始语言或重建语言 |
| `hist` | `h` | 语言的历史时期或阶段 |
| `genre` | `e` | 文本体裁或文学风格 |
| `medium` | `m` | 交流媒介（口语、书面语、数字） |
| `socio` | `s` | 社会方言或社会群体变体 |
| `modality` | `o` | 语言产生模式 |
| `register` | `r` | 语言语域 |
| `pragma` | `u` | 交际功能 |
| `temporal` | `t` | 时间标记 |
| `evidence` | `v` | 信息来源 |
| `affect` | `k` | 情感语调 |
| `age` | `n` | 年龄/世代变体 |
| `gender` | `i` | 性别变体 |
| `expert` | `b` | 专业水平 |
| `interact` | `2` | 互动结构 |
| `prosody` | `y` | 韵律特征 |
| `lexical` | `l` | 词汇密度（0-100） |
| `syntax` | `z` | 句法复杂度（0-100） |
| `start` | `0` | 开始日期（无标点的 ISO 8601） |
| `end` | `1` | 结束日期（无标点的 ISO 8601） |
| `taboo` | `j` | 禁忌/粗俗内容级别（0-5 级） |
| `conf` | `c` | 前一个标签的置信度分数（0-100） |
| — | `q`、`3`-`9` | 保留供将来使用 |

### 分类器

#### 1. 正字法分类器（`ortho` 或 `w`）
识别标准文字标签之外的特定正字法约定或书写系统变体。

格式：
- 长格式：`language-x-ortho-[variant]`
- 短格式：`language-x-w-[variant]`

示例（与标准文字标签结合）：
- `az-Latn-x-ortho-new` 或 `az-Latn-x-w-new` - 阿塞拜疆拉丁文字，新正字法
- `de-Latn-x-ortho-1901` 或 `de-Latn-x-w-1901` - 德语拉丁文字，1901 正字法
- `zh-Hans-x-ortho-pinyin` 或 `zh-Hans-x-w-pinyin` - 带拼音的简体中文
- `yi-Hebr-x-ortho-yivo` 或 `yi-Hebr-x-w-yivo` - 意第绪语希伯来文字，YIVO 正字法

#### 2. 正式程度分类器（`form` 或 `f`）
识别语言使用的正式程度。

格式：
- 长格式：`language-x-form-[1-5]`
- 短格式：`language-x-f-[1-5]`

正式程度量表：
- 1 = 最正式（书面文件、官方演讲）
- 2 = 正式（商务会议、学术写作）
- 3 = 中性/标准（新闻、一般对话）
- 4 = 非正式（随意对话、给朋友的电子邮件）
- 5 = 最随意（亲密对话、俚语）

示例：
- `ko-x-form-1` 或 `ko-x-f-1` - 最正式的韩语
- `en-x-form-3` 或 `en-x-f-3` - 中性英语
- `ja-x-form-5` 或 `ja-x-f-5` - 最随意的日语

#### 3. 礼貌分类器（`polite` 或 `p`）
识别语言使用的礼貌/尊敬程度。

格式：
- 长格式：`language-x-polite-[1-5]`
- 短格式：`language-x-p-[1-5]`

礼貌程度量表：
- 1 = 最尊敬/恭敬（皇室称呼、宗教语境）
- 2 = 非常礼貌（正式敬语、尊敬的讲话）
- 3 = 礼貌/中性（标准礼貌）
- 4 = 熟悉（平等之间、朋友）
- 5 = 亲密/平实（家人、非常亲密的朋友）

示例：
- `ko-x-polite-1` 或 `ko-x-p-1` - 最高敬语韩语
- `ja-x-polite-2` 或 `ja-x-p-2` - 非常礼貌的日语
- `th-x-polite-3` 或 `th-x-p-3` - 标准礼貌的泰语

#### 4. 领域分类器（`domain` 或 `d`）
识别专业词汇或专业语境。

格式：
- 长格式：`language-x-domain-[domain_type]`
- 短格式：`language-x-d-[domain_type]`

示例：
- `en-x-domain-legal` 或 `en-x-d-legal` - 法律英语
- `ja-x-domain-med` 或 `ja-x-d-med` - 医学日语
- `ko-x-domain-business` 或 `ko-x-d-business` - 商务韩语
- `ja-x-domain-tech` 或 `ja-x-d-tech` - 技术日语
- `en-x-domain-fin` 或 `en-x-d-fin` - 金融英语

#### 5. 地理分类器（`geo` 或 `g`）
识别地区或地理语言变体。

格式：
- 长格式：`language-x-geo-[region]`
- 短格式：`language-x-g-[region]`

示例：
- `ko-x-geo-gyeong` 或 `ko-x-g-gyeong` - 庆尚道韩语（경상도）
- `ko-x-geo-jeolla` 或 `ko-x-g-jeolla` - 全罗道韩语（전라도）
- `es-x-geo-riopla` 或 `es-x-g-riopla` - 拉普拉塔河西班牙语
- `pt-x-geo-nordeste` 或 `pt-x-g-nordeste` - 巴西东北部葡萄牙语

#### 6. 原始语言分类器（`proto` 或 `a`）
识别原始语言或重建的历史语言。

格式：
- 长格式：`x-proto-[iso639-5_code if available]`
- 短格式：`x-a-[iso639-5_code if available]`

规则：
- 必须在可用时使用 ISO 639-5 语言族代码
- 仅在没有 ISO 639-5 代码时使用描述性标识符

使用 ISO 639-5 代码的示例：
- `x-proto-ine` 或 `x-a-ine` - 原始印欧语
- `x-proto-gem` 或 `x-a-gem` - 原始日耳曼语
- `x-proto-sla` 或 `x-a-sla` - 原始斯拉夫语
- `x-proto-sem` 或 `x-a-sem` - 原始闪米特语
- `x-proto-cel` 或 `x-a-cel` - 原始凯尔特语
- `x-proto-ira` 或 `x-a-ira` - 原始伊朗语
- `x-proto-inc` 或 `x-a-inc` - 原始印度-雅利安语
- `x-proto-bat` 或 `x-a-bat` - 原始波罗的语
- `x-proto-roa` 或 `x-a-roa` - 原始罗曼语
- `x-proto-trk` 或 `x-a-trk` - 原始突厥语

没有 ISO 639-5 代码的示例（描述性，超过三个字符）：
- `x-proto-baltslav` 或 `x-a-baltslav` - 原始波罗的-斯拉夫语（无 ISO 639-5 代码）

注意：
- 语言族代码（ISO 639-5）作为标准的主要 BCP 47 语言标签无效，这就是我们使用 x-proto 实现它们的原因
- 它们在私有用途扩展中有效且首选（在 `x-` 之后）
- 因此，所有原始语言标签必须以 `x-` 开头以符合 BCP 47

#### 7. 历史分类器（`hist` 或 `h`）
识别语言的历史时期或阶段。

格式：
- 长格式：`language-x-hist-[period]`
- 短格式：`language-x-h-[period]`

示例：
- `en-x-hist-old` 或 `en-x-h-old` - 古英语时期
- `en-x-hist-middle` 或 `en-x-h-middle` - 中古英语时期
- `ja-x-hist-kobun` 或 `ja-x-h-kobun` - 古典日语（古文）
- `ko-x-hist-hunmin` 或 `ko-x-h-hunmin` - 中古韩语（훈민정음 时期）
- `el-x-hist-koine` 或 `el-x-h-koine` - 通用希腊语（Κοινή）
- `sa-x-hist-vedic` 或 `sa-x-h-vedic` - 吠陀梵语（वैदिक）

#### 8. 体裁分类器（`genre` 或 `e`）
识别文本体裁或文学风格。

格式：
- 长格式：`language-x-genre-[genre_type]`
- 短格式：`language-x-e-[genre_type]`

示例：
- `en-x-genre-news` 或 `en-x-e-news` - 新闻英语
- `ja-x-genre-manga` 或 `ja-x-e-manga` - 漫画日语（漫画）
- `ko-x-genre-webtoon` 或 `ko-x-e-webtoon` - 韩国网络漫画（웹툰）
- `zh-x-genre-shi` 或 `zh-x-e-shi` - 中国诗歌（詩）
- `fr-x-genre-bd` 或 `fr-x-e-bd` - 法国漫画（bande dessinée）
- `de-x-genre-marchen` 或 `de-x-e-marchen` - 德国童话（Märchen）

#### 9. 媒介分类器（`medium` 或 `m`）
识别交流媒介。

格式：
- 长格式：`language-x-medium-[medium_type]`
- 短格式：`language-x-m-[medium_type]`

示例：
- `en-x-medium-spoken` 或 `en-x-m-spoken` - 口语英语
- `ko-x-medium-digital` 或 `ko-x-m-digital` - 数字/在线韩语
- `ja-x-medium-written` 或 `ja-x-m-written` - 书面日语
- `hi-x-medium-bcast` 或 `hi-x-m-bcast` - 广播印地语
- `zh-x-medium-sms` 或 `zh-x-m-sms` - 短信/文本消息中文

#### 10. 社会方言分类器（`socio` 或 `s`）
识别社会方言或社会群体变体。

格式：
- 长格式：`language-x-socio-[social_group]`
- 短格式：`language-x-s-[social_group]`

示例：
- `en-x-socio-academic` 或 `en-x-s-academic` - 学术社会方言
- `en-x-socio-urban` 或 `en-x-s-urban` - 城市社会方言
- `es-x-socio-juvenil` 或 `es-x-s-juvenil` - 西班牙青年社会方言（jerga juvenil）
- `fr-x-socio-jeune` 或 `fr-x-s-jeune` - 法国青年社会方言
- `de-x-socio-jugend` 或 `de-x-s-jugend` - 德国青年社会方言（Jugendsprache）
- `ko-x-socio-online` 或 `ko-x-s-online` - 韩国网络社会方言

#### 11. 模态分类器（`modality` 或 `o`）
识别语言产生的基本模式。

格式：
- 长格式：`language-x-modality-[mode]`
- 短格式：`language-x-o-[mode]`

示例：
- `en-x-modality-spoken` 或 `en-x-o-spoken` - 口语英语
- `en-x-modality-written` 或 `en-x-o-written` - 书面英语
- `asl-x-modality-signed` 或 `asl-x-o-signed` - 美国手语
- `en-x-modality-multi` 或 `en-x-o-multi` - 多模态英语（语音 + 手势）
- `fr-x-modality-tactile` 或 `fr-x-o-tactile` - 触觉法语（用于聋盲人）

#### 12. 语域分类器（`register` 或 `r`）
识别语言使用的语言语域或功能变体。

格式：
- 长格式：`language-x-register-[register_type]`
- 短格式：`language-x-r-[register_type]`

示例：
- `en-x-register-frozen` 或 `en-x-r-frozen` - 冻结语域（祈祷、誓言）
- `en-x-register-formal` 或 `en-x-r-formal` - 正式语域（学术论文）
- `en-x-register-consult` 或 `en-x-r-consult` - 咨询语域（专业）
- `en-x-register-casual` 或 `en-x-r-casual` - 随意语域（朋友）
- `en-x-register-intimate` 或 `en-x-r-intimate` - 亲密语域（家人）

#### 13. 语用功能分类器（`pragma` 或 `u`）
识别交际功能或言语行为。

格式：
- 长格式：`language-x-pragma-[function]`
- 短格式：`language-x-u-[function]`

示例：
- `en-x-pragma-request` 或 `en-x-u-request` - 请求功能
- `ja-x-pragma-apology` 或 `ja-x-u-apology` - 道歉功能
- `es-x-pragma-complmnt` 或 `es-x-u-complmnt` - 赞美功能
- `ar-x-pragma-greeting` 或 `ar-x-u-greeting` - 问候功能
- `zh-x-pragma-refusal` 或 `zh-x-u-refusal` - 拒绝功能

#### 14. 时间标记分类器（`temporal` 或 `t`）
识别时间方面或时态使用模式。

格式：
- 长格式：`language-x-temporal-[aspect]`
- 短格式：`language-x-t-[aspect]`

示例：
- `en-x-temporal-past` 或 `en-x-t-past` - 过去导向的话语
- `ja-x-temporal-nonpast` 或 `ja-x-t-nonpast` - 非过去焦点
- `id-x-temporal-atemprl` 或 `id-x-t-atemprl` - 无时间/非时间性
- `fr-x-temporal-future` 或 `fr-x-t-future` - 未来导向
- `zh-x-temporal-aspect` 或 `zh-x-t-aspect` - 体貌焦点

#### 15. 证据性分类器（`evidence` 或 `v`）
识别信息来源标记。

格式：
- 长格式：`language-x-evidence-[source]`
- 短格式：`language-x-v-[source]`

示例：
- `qu-x-evidence-direct` 或 `qu-x-v-direct` - 直接目击
- `tr-x-evidence-hearsay` 或 `tr-x-v-hearsay` - 道听途说/报告
- `ja-x-evidence-infer` 或 `ja-x-v-infer` - 推理性
- `en-x-evidence-assume` 或 `en-x-v-assume` - 假定
- `de-x-evidence-quote` 或 `de-x-v-quote` - 引用性

#### 16. 情感/情绪分类器（`affect` 或 `k`）
识别情感语调或情感。

格式：
- 长格式：`language-x-affect-[emotion]`
- 短格式：`language-x-k-[emotion]`

示例：
- `en-x-affect-angry` 或 `en-x-k-angry` - 愤怒的语调
- `ja-x-affect-humble` 或 `ja-x-k-humble` - 谦逊的情感
- `es-x-affect-joyful` 或 `es-x-k-joyful` - 快乐的表达
- `ko-x-affect-sad` 或 `ko-x-k-sad` - 悲伤/忧郁
- `fr-x-affect-neutral` 或 `fr-x-k-neutral` - 中性情感

#### 17. 年龄/世代分类器（`age` 或 `n`）
识别与年龄相关或世代语言变体。

格式：
- 长格式：`language-x-age-[generation]`
- 短格式：`language-x-n-[generation]`

示例：
- `en-x-age-child` 或 `en-x-n-child` - 儿童语言
- `ja-x-age-teen` 或 `ja-x-n-teen` - 青少年语言
- `ko-x-age-elder` 或 `ko-x-n-elder` - 老年人语言
- `es-x-age-genz` 或 `es-x-n-genz` - Z 世代
- `zh-x-age-millenl` 或 `zh-x-n-millenl` - 千禧一代语言

#### 18. 性别分类器（`gender` 或 `i`）
识别与性别相关的语言变体。

格式：
- 长格式：`language-x-gender-[identity]`
- 短格式：`language-x-i-[identity]`

示例：
（示例已删除）

#### 19. 专业水平分类器（`expert` 或 `b`）
识别 0-10 级的领域专业水平。

格式：
- 长格式：`language-x-expert-[0-10]`
- 短格式：`language-x-b-[0-10]`

专业水平量表：
- 0 = 无知识
- 1-2 = 初学者
- 3-4 = 中级
- 5-6 = 高级
- 7-8 = 专家
- 9-10 = 大师/权威

示例：
- `en-x-expert-0` 或 `en-x-b-0` - 无专业知识
- `de-x-expert-3` 或 `de-x-b-3` - 中级水平
- `ja-x-expert-7` 或 `ja-x-b-7` - 专家水平
- `es-x-expert-9` 或 `es-x-b-9` - 大师水平
- `zh-x-expert-5` 或 `zh-x-b-5` - 高级水平

#### 20. 互动结构分类器（`interact` 或 `2`）
识别对话或互动模式。

格式：
- 长格式：`language-x-interact-[structure]`
- 短格式：`language-x-2-[structure]`

示例：
- `en-x-interact-turn` 或 `en-x-2-turn` - 轮流发言
- `ja-x-interact-overlap` 或 `ja-x-2-overlap` - 重叠语言
- `es-x-interact-monolog` 或 `es-x-2-monolog` - 独白式
- `ar-x-interact-dialog` 或 `ar-x-2-dialog` - 对话式
- `zh-x-interact-multi` 或 `zh-x-2-multi` - 多方

#### 21. 韵律特征分类器（`prosody` 或 `y`）
识别韵律或超音段特征。

格式：
- 长格式：`language-x-prosody-[feature]`
- 短格式：`language-x-y-[feature]`

示例：
- `en-x-prosody-stress` 或 `en-x-y-stress` - 重音计时
- `ja-x-prosody-pitch` 或 `ja-x-y-pitch` - 音高重音
- `fr-x-prosody-syllable` 或 `fr-x-y-syllable` - 音节计时
- `zh-x-prosody-tone` 或 `zh-x-y-tone` - 声调模式
- `es-x-prosody-rhythm` 或 `es-x-y-rhythm` - 节奏模式

#### 22. 词汇密度分类器（`lexical` 或 `l`）
将词汇密度识别为数值（0-100）。

格式：
- 长格式：`language-x-lexical-[0-100]`
- 短格式：`language-x-l-[0-100]`

示例：
- `en-x-lexical-20` 或 `en-x-l-20` - 低密度（20%）
- `de-x-lexical-55` 或 `de-x-l-55` - 中等密度（55%）
- `ja-x-lexical-75` 或 `ja-x-l-75` - 高密度（75%）
- `es-x-lexical-40` 或 `es-x-l-40` - 适度密度（40%）
- `zh-x-lexical-85` 或 `zh-x-l-85` - 非常高密度（85%）

#### 23. 句法复杂度分类器（`syntax` 或 `z`）
将句法复杂度识别为数值（0-100）。

格式：
- 长格式：`language-x-syntax-[0-100]`
- 短格式：`language-x-z-[0-100]`

示例：
- `en-x-syntax-15` 或 `en-x-z-15` - 简单句法（15%）
- `de-x-syntax-70` 或 `de-x-z-70` - 复杂句法（70%）
- `ja-x-syntax-45` 或 `ja-x-z-45` - 中等复杂度（45%）
- `es-x-syntax-30` 或 `es-x-z-30` - 低复杂度（30%）
- `zh-x-syntax-60` 或 `zh-x-z-60` - 高复杂度（60%）

#### 24. 开始日期分类器（`start` 或 `0`）
识别语言使用的开始日期（无标点的 ISO 8601 格式）。

格式：
- 长格式：`language-x-start-[YYYYMMDD]`
- 短格式：`language-x-0-[YYYYMMDD]`

日期格式：
- 完整日期：YYYYMMDD
- 年-月：YYYYMM
- 仅年份：YYYY

示例：
- `en-x-start-20240315` 或 `en-x-0-20240315` - 从 2024 年 3 月 15 日开始的英语
- `ja-x-start-19890108` 或 `ja-x-0-19890108` - 从 1989 年 1 月 8 日开始的日语
- `es-x-start-202403` 或 `es-x-0-202403` - 从 2024 年 3 月开始的西班牙语

#### 25. 结束日期分类器（`end` 或 `1`）
识别语言使用的结束日期（无标点的 ISO 8601 格式）。

格式：
- 长格式：`language-x-end-[YYYYMMDD]`
- 短格式：`language-x-1-[YYYYMMDD]`

日期格式：
- 完整日期：YYYYMMDD
- 年-月：YYYYMM
- 仅年份：YYYY

示例：
- `en-x-end-20240415` 或 `en-x-1-20240415` - 到 2024 年 4 月 15 日结束的英语
- `ja-x-end-20190430` 或 `ja-x-1-20190430` - 到 2019 年 4 月 30 日结束的日语
- `es-x-end-202412` 或 `es-x-1-202412` - 到 2024 年 12 月结束的西班牙语

#### 26. 禁忌分类器（`taboo` 或 `j`）
识别禁忌、粗俗或冒犯性内容的级别。

格式：
- 长格式：`language-x-taboo-[0-5]`
- 短格式：`language-x-j-[0-5]`

示例：
- `en-x-taboo-0` 或 `en-x-j-0` - 无禁忌内容
- `en-x-taboo-3` 或 `en-x-j-3` - 中等禁忌级别
- `ja-x-form-5-taboo-4` 或 `ja-x-f-5-j-4` - 非常随意的日语，禁忌级别高

#### 27. 置信度分类器（`conf` 或 `c`）
表示紧邻前面的分类器的置信度分数。

格式：
- 长格式：`language-x-[classifier]-[value]-conf-[0-100]`
- 短格式：`language-x-[classifier]-[value]-c-[0-100]`

特殊行为：
- 置信度分数适用于紧邻其前的分类器
- 可以为不同的分类器使用多个置信度分数
- 如果前面没有分类器，置信度适用于基本语言标签

示例：
- `en-x-form-3-conf-95` 或 `en-x-f-3-c-95` - 中性正式程度，置信度 95%
- `ko-x-polite-2-conf-80-domain-med-conf-60` 或 `ko-x-p-2-c-80-d-med-c-60` - 非常礼貌（80% 置信度）医学韩语（60% 置信度）
- `ja-x-hist-kobun-conf-100` 或 `ja-x-h-kobun-c-100` - 古典日语，置信度 100%
- `x-proto-ine-conf-75` 或 `x-a-ine-c-75` - 原始印欧语，置信度 75%

### 多重分类

LVTag 支持在单个标签中使用多个分类器以提供精确的语言识别。长格式和短格式可以混合使用：

```
ko-x-form-4-domain-business
ko-x-f-4-d-business
ko-x-form-4-polite-2-domain-business
ko-x-f-4-p-2-d-business
```

上述示例显示了在商务语境中具有非正式正式程度（4）但礼貌语言（2）的韩语。

## 有效值

**注意**：所有值必须为 8 个字符或更短，以符合 BCP 47 子标签长度限制。虽然许多分类器的特定值将通过专家使用和社区共识来建立，但本标准中定义了数字量表、日期格式和下面列出的基本值。

### 正式程度量表（通用）

| 级别 | 描述 | 示例 |
|-------|-------------|----------|
| 1 | 最正式 | 法律文件、官方仪式、学术论文 |
| 2 | 正式 | 商务信函、新闻文章、演示文稿 |
| 3 | 中性 | 标准对话、电子邮件、一般写作 |
| 4 | 非正式 | 随意对话、个人博客、短信 |
| 5 | 最随意 | 俚语、亲密对话、社交媒体 |

### 礼貌程度量表（通用）

| 级别 | 描述 | 示例 |
|-------|-------------|----------|
| 1 | 最尊敬 | 皇室称呼、宗教领袖、老年人尊敬 |
| 2 | 非常礼貌 | 客户服务、正式会议、教师 |
| 3 | 礼貌/中性 | 标准互动、同事 |
| 4 | 熟悉 | 朋友、同伴、随意的熟人 |
| 5 | 亲密/平实 | 亲密的家人、亲密的伴侣 |

### 专业水平量表（通用）

| 级别 | 描述 |
|-------|-------------|
| 0 | 无知识 |
| 1-2 | 初学者 |
| 3-4 | 中级 |
| 5-6 | 高级 |
| 7-8 | 专家 |
| 9-10 | 大师/权威 |

### 禁忌量表（通用）

| 级别 | 描述 |
|-------|-------------|
| 0 | 无禁忌内容 |
| 1 | 轻微禁忌 |
| 2 | 轻度禁忌 |
| 3 | 中等禁忌 |
| 4 | 高度禁忌 |
| 5 | 极端禁忌 |

### 词汇密度量表（通用）

| 级别 | 描述 |
|-------|-------------|
| 0-20 | 非常低密度 |
| 21-40 | 低密度 |
| 41-60 | 中等密度 |
| 61-80 | 高密度 |
| 81-100 | 非常高密度 |

### 句法复杂度量表（通用）

| 级别 | 描述 |
|-------|-------------|
| 0-20 | 非常简单 |
| 21-40 | 简单 |
| 41-60 | 中等复杂度 |
| 61-80 | 复杂 |
| 81-100 | 非常复杂 |

### 领域值

| 值 | 描述 |
|-------|-------------|
| `legal` | 法律术语 |
| `med` | 医学术语 |
| `tech` | 技术/IT |
| `business` | 商业/企业 |
| `fin` | 金融/银行 |
| `acad` | 学术/学者 |
| `sci` | 科学/研究 |

## 实现示例

### 单一分类器（长格式）
```
# 最正式的韩语
ko-x-form-1

# 非常礼貌的日语
ja-x-polite-2

# 法律英语
en-x-domain-legal

# 庆尚道韩语
ko-x-geo-gyeong

# 原始印欧语
x-proto-ine
```

### 单一分类器（短格式）
```
# 最正式的韩语
ko-x-f-1

# 非常礼貌的日语
ja-x-p-2

# 法律英语
en-x-d-legal

# 庆尚道韩语
ko-x-g-gyeong

# 原始印欧语
x-a-ine
```

### 多重分类器
```
# 非正式但礼貌的韩语商务语言
ko-x-form-4-polite-2-domain-business
ko-x-f-4-p-2-d-business

# 正式且尊敬的日语医学语言
ja-x-form-1-polite-1-domain-med
ja-x-f-1-p-1-d-med

# 南越南语，中性正式程度，礼貌语言，技术领域
vi-x-geo-southern-form-3-polite-2-domain-tech
vi-x-g-southern-f-3-p-2-d-tech

# 具有多个维度的复杂分类
en-x-h-middle-e-poetry-m-written-f-1
ja-x-f-2-p-1-d-med-h-kobun-m-written

# 显示正式程度/礼貌区别的语言变体
ko-x-f-5-p-2  # 非常随意但礼貌（对年长的朋友）
ko-x-f-1-p-4  # 非常正式但熟悉（写给同伴）
ja-x-f-4-p-1  # 随意正式程度但最高敬意
en-x-f-5-j-4  # 非常随意的英语，禁忌级别高
```

## 使用案例

1. **语言学习应用程序**
   - 教授不同社交语境的适当语域
   - 提供特定领域的词汇训练

2. **机器翻译**
   - 在翻译中保持语域一致性
   - 应用特定领域的术语

3. **内容分类**
   - 按正式程度和领域自动分类文本
   - 将内容路由到适当的审查员或系统

4. **语料库语言学**
   - 为语言研究构建标记的语料库
   - 研究语域和领域变体

## 验证规则

1. **子标签长度**：`x-` 之后的每个子标签必须为 8 个字符或更少
2. **顺序**：分类器可以在 `x-` 之后以任何顺序出现
3. **唯一性**：每个分类器类型在每个标签中应该只出现一次（除了可以多次出现的 `conf`）
4. **大小写**：标签应该是小写的（根据 BCP 47 不区分大小写）
5. **魔术标签**：短格式标签是单个字符；`q`、`3`-`9` 保留供将来使用
6. **混合**：长格式和短格式可以在同一标签内混合
7. **原始标签**：必须以 `x-` 开头，并且应该在可用时使用 ISO 639-5 代码（例如，`x-proto-sla` 而不是 `x-proto-slavic`）
8. **置信度**：`conf`/`c` 分类器适用于紧邻前面的分类器
9. **数值**：必须在定义的范围内（禁忌为 0-5，专业知识为 0-10，百分比值为 0-100）
10. **日期格式**：日期使用无标点的 ISO 8601（YYYY、YYYYMM 或 YYYYMMDD）

## 兼容性

LVTag 格式完全兼容：
- BCP 47（RFC 5646）
- ISO 639 语言代码
- IANA 语言子标签注册表
- Unicode CLDR

## 优势

1. **精确性**：实现细粒度的语言变体识别
2. **可扩展性**：可以添加新的语域和领域
3. **基于标准**：建立在已建立的 BCP 47 私有用途机制上
4. **机器可读**：系统化格式支持自动处理
5. **人类可读**：清晰、描述性的子标签
6. **灵活性**：支持详细的长格式和简洁的短格式标签
7. **简洁性**：短魔术标签在保持清晰的同时实现紧凑表示

## 未来扩展

LVTag 旨在随着语言技术社区的需求而发展。我们欢迎对新分类器的建议、对现有分类器的改进以及实际实施反馈。

要提议扩展或为规范做出贡献：
- 在 [github.com/lvtag/spec](https://github.com/lvtag/spec) 开启问题
- 加入现有提案的讨论
- 分享您的实施经验
- 提交文档改进的拉取请求

保留的单字符代码（`q`、`3`-`9`）可用于未来的标准化扩展。

## 参考资料

- [BCP 47：识别语言的标签](https://www.rfc-editor.org/rfc/rfc5646.html)
- [IANA 语言子标签注册表](https://www.iana.org/assignments/language-subtag-registry/)

---

## 许可和专利授权

本规范在 **CC0 1.0 通用（公共领域奉献）** 下发布。

**为什么选择 CC0**：为确保最大程度的采用和实施自由，LVTag 被置于公共领域。这意味着：
- 无需许可即可使用、实施或修改
- 无需署名（尽管感谢）
- 商业或政府使用没有法律障碍
- 与所有软件许可证兼容
- 被 Unicode CLDR 等主要标准使用

**专利授权**：涵盖 LVTag 规范的任何专利特此免版税许可，适用于符合本规范的任何实施。

**无背书**：使用 LVTag 并不意味着规范作者的背书。

在法律允许的范围内，**Danslav Slavenskoj** 已放弃语言变体标记（LVTag）格式规范的所有版权和相关或邻接权。本作品发布自：美利坚合众国。

---
layout: default
title: Language Variant Tag (LVTag) Specification
---

# LVTag Specification

**Version 1.0**  
**Created by Danslav Slavenskoj**  
**Date: May 2025**

**Languages**: [中文简体](/index-zh.md)  [中文繁體](/index-zh-hant.md)  [Čeština](/index-cs.md) [Deutsch](/index-de.md)  [Español](/index-es.md)  [Français](/index-fr.md)  [Hrvatski](/index-hr.md)  [日本語](/index-ja.md)  [한국어](/index-ko.md)  [Polski](/index-pl.md)  [Português](/index-pt.md)  [Русский](/index-ru.md)  [Српски](/index-sr.md)

## Quick Links

- [JSON Schema](/lvtag-schema.json) - Full validation schema for LVTag format
- [Classifier Definitions](/lvtag-classifiers.json) - Machine-readable classifier specifications
- [Specification](#format-specification) - Jump to format details
- [Examples](#implementation-examples) - See LVTag in action

## Overview

The Language Variant Tag (LVTag) format is a systematic approach to language classification that extends the BCP 47 standard using private-use subtags. It enables precise identification of language varieties across multiple dimensions including formality, politeness, domain, and orthography. 

### Key Benefits

**Classification Rigor**: LVTag brings systematic organization to language tagging by providing clear, separate dimensions for different types of variation. Unlike existing subtags and systems that mix different categories at the same level, LVTag maintains strict separation between formality, politeness, domain, and other dimensions.

**Standards Compatibility**: LVTag is fully compliant with BCP 47 (RFC 5646) and works seamlessly with:
- IANA Language Subtag Registry
- ISO 639 language codes
- Unicode CLDR
- W3C language tags
- HTTP Accept-Language headers
- XML lang attributes
- HTML lang attributes

**Technology Integration**: LVTag tags can be used directly in:
- Natural Language Processing (NLP) pipelines
- Machine Translation systems
- Content Management Systems (CMS)
- Language detection libraries
- Search engines and information retrieval
- Web applications and APIs
- Localization workflows

**Use Cases**:
- **Audience Targeting**: Match content to appropriate audiences based on register and domain
- **Translation Quality**: Maintain appropriate formality and politeness levels in machine translation
- **Language Learning**: Teach learners appropriate register for different contexts
- **Corpus Linguistics**: Build precisely tagged corpora for research
- **Social Media Analysis**: Classify user-generated content by register and domain
- **Customer Service**: Route messages based on formality and domain to appropriate agents

## Rationale

While BCP 47 provides excellent support for identifying languages, scripts, and regions, it lacks standardized mechanisms for capturing sociolinguistic variation within a language. Current standards don't address:

- **Register Variation**: No way to distinguish between formal and informal varieties of the same language
- **Politeness Levels**: Critical for languages like Japanese, Korean, and Thai where politeness is grammatically encoded
- **Domain-Specific Language**: No standard for marking technical, medical, or legal language varieties
- **Sociolects**: No mechanism for identifying social group varieties (youth language, professional jargon)
- **Historical Stages**: Limited support for distinguishing classical from modern forms
- **Formality Gradients**: No numeric scale for computational processing of register
- **Proto-Languages**: Inconsistent encoding - some proto-languages have ISO codes (e.g., `ine` for PIE) while others don't, and ISO 639-5 family codes aren't valid in BCP 47 tags, creating a confusing landscape for historical linguistics
- **Orthographic Variation**: While BCP 47 handles scripts, it doesn't effectively capture variations within scripts (spelling reforms, romanization systems, competing standards) that fundamentally affect text processing, search, and spell-checking

LVTag fills these gaps using BCP 47's private-use extension mechanism (`-x-`), providing a systematic, machine-readable way to encode these critical dimensions of language variation while maintaining full backward compatibility.

### Precise Language Classification

The advent of large language models and sophisticated NLP tools has made precise language variety classification not just useful but essential. Modern systems need to:

- Generate text appropriate to specific contexts (formal vs. informal, polite vs. casual)
- Train on properly classified corpora to avoid mixing registers inappropriately
- Provide culturally and contextually appropriate responses
- Handle code-switching and mixed-language content accurately
- Preserve stylistic consistency when translating or transforming text
- Filter training data based on formality, domain, or other characteristics
- Adapt output to match user preferences or requirements

LVTag provides the granular metadata need to understand not just what language is being used, but how it's being used, enabling more nuanced and appropriate language processing pipelines.

## Format Specification

### Basic Structure

```
language-x-[classifier]-[value]-[classifier2]-[value2]...
```

Where:
- `language` is a valid BCP 47 primary language subtag (e.g., `en`, `ko`, `ja`)
- `x` indicates the beginning of private-use subtags
- `classifier` is a category identifier (see Magic Tags below)
- `value` is the specific classification within that category

### Magic Tags

LVTag supports both long-form and short-form "magic" classifiers for flexibility:

| Long Form | Short Form | Description |
|-----------|------------|-------------|
| `ortho` | `w` | Orthographic variant |
| `form` | `f` | Formality level (1-5 scale) |
| `polite` | `p` | Politeness/respect level (1-5 scale) |
| `domain` | `d` | Specialized vocabulary or professional context |
| `geo` | `g` | Geographic or regional variety |
| `proto` | `a` | Proto-language or reconstructed language |
| `hist` | `h` | Historical period or stage of a language |
| `genre` | `e` | Text genre or literary style |
| `medium` | `m` | Communication medium (spoken, written, digital) |
| `socio` | `s` | Sociolect or social group variety |
| `modality` | `o` | Mode of language production |
| `register` | `r` | Linguistic register |
| `pragma` | `u` | Communicative function |
| `temporal` | `t` | Temporal marking |
| `evidence` | `v` | Information source |
| `affect` | `k` | Emotional tone |
| `age` | `n` | Age/generation variety |
| `gender` | `i` | Gender variety |
| `expert` | `b` | Expertise level |
| `interact` | `2` | Interactional structure |
| `prosody` | `y` | Prosodic features |
| `lexical` | `l` | Lexical density (0-100) |
| `syntax` | `z` | Syntactic complexity (0-100) |
| `start` | `0` | Start date (ISO 8601 without punctuation) |
| `end` | `1` | End date (ISO 8601 without punctuation) |
| `taboo` | `j` | Taboo/vulgar content level (0-5 scale) |
| `conf` | `c` | Confidence score (0-100) for previous tag |
| — | `q`, `3`-`9` | Reserved for future use |

### Classifiers

#### 1. Orthography Classifier (`ortho` or `w`)
Identifies specific orthographic conventions or writing system variants beyond standard script tags.

Format:
- Long: `language-x-ortho-[variant]`
- Short: `language-x-w-[variant]`

Examples (combined with standard script tags):
- `az-Latn-x-ortho-new` or `az-Latn-x-w-new` - Azerbaijani Latin script, new orthography
- `de-Latn-x-ortho-1901` or `de-Latn-x-w-1901` - German Latin script, 1901 orthography
- `zh-Hans-x-ortho-pinyin` or `zh-Hans-x-w-pinyin` - Simplified Chinese with Pinyin
- `yi-Hebr-x-ortho-yivo` or `yi-Hebr-x-w-yivo` - Yiddish Hebrew script, YIVO orthography

#### 2. Formality Classifier (`form` or `f`)
Identifies the formality level of language use.

Format: 
- Long: `language-x-form-[1-5]`
- Short: `language-x-f-[1-5]`

Formality scale:
- 1 = Most formal (written documents, official speeches)
- 2 = Formal (business meetings, academic writing)
- 3 = Neutral/standard (news, general conversation)
- 4 = Informal (casual conversation, emails to friends)
- 5 = Most casual (intimate conversation, slang)

Examples:
- `ko-x-form-1` or `ko-x-f-1` - Most formal Korean
- `en-x-form-3` or `en-x-f-3` - Neutral English
- `ja-x-form-5` or `ja-x-f-5` - Most casual Japanese

#### 3. Politeness Classifier (`polite` or `p`)
Identifies the politeness/respect level of language use.

Format:
- Long: `language-x-polite-[1-5]`
- Short: `language-x-p-[1-5]`

Politeness scale:
- 1 = Most respectful/deferential (royal address, religious contexts)
- 2 = Very polite (formal honorifics, respectful speech)
- 3 = Polite/neutral (standard politeness)
- 4 = Familiar (among equals, friends)
- 5 = Intimate/plain (family, very close friends)

Examples:
- `ko-x-polite-1` or `ko-x-p-1` - Highest respect Korean
- `ja-x-polite-2` or `ja-x-p-2` - Very polite Japanese
- `th-x-polite-3` or `th-x-p-3` - Standard polite Thai

#### 4. Domain Classifier (`domain` or `d`)
Identifies specialized vocabulary or professional context.

Format: 
- Long: `language-x-domain-[domain_type]`
- Short: `language-x-d-[domain_type]`

Examples:
- `en-x-domain-legal` or `en-x-d-legal` - Legal English
- `ja-x-domain-med` or `ja-x-d-med` - Medical Japanese
- `ko-x-domain-business` or `ko-x-d-business` - Business Korean
- `ja-x-domain-tech` or `ja-x-d-tech` - Technical Japanese
- `en-x-domain-fin` or `en-x-d-fin` - Financial English

#### 5. Geographic Classifier (`geo` or `g`)
Identifies regional or geographic language varieties.

Format:
- Long: `language-x-geo-[region]`
- Short: `language-x-g-[region]`

Examples:
- `ko-x-geo-gyeong` or `ko-x-g-gyeong` - Gyeongsang Korean (경상도)
- `ko-x-geo-jeolla` or `ko-x-g-jeolla` - Jeolla Korean (전라도)
- `es-x-geo-riopla` or `es-x-g-riopla` - Rioplatense Spanish
- `pt-x-geo-nordeste` or `pt-x-g-nordeste` - Northeastern Brazilian Portuguese

#### 6. Proto Classifier (`proto` or `a`)
Identifies proto-languages or reconstructed historical languages.

Format:
- Long: `x-proto-[iso639-5_code if available]`
- Short: `x-a-[iso639-5_code if available]`

Rules:
- MUST use ISO 639-5 language family codes when available
- Use descriptive identifiers only when no ISO 639-5 code exists

Examples using ISO 639-5 codes:
- `x-proto-ine` or `x-a-ine` - Proto-Indo-European
- `x-proto-gem` or `x-a-gem` - Proto-Germanic
- `x-proto-sla` or `x-a-sla` - Proto-Slavic
- `x-proto-sem` or `x-a-sem` - Proto-Semitic
- `x-proto-cel` or `x-a-cel` - Proto-Celtic
- `x-proto-ira` or `x-a-ira` - Proto-Iranian
- `x-proto-inc` or `x-a-inc` - Proto-Indo-Aryan
- `x-proto-bat` or `x-a-bat` - Proto-Baltic
- `x-proto-roa` or `x-a-roa` - Proto-Romance
- `x-proto-trk` or `x-a-trk` - Proto-Turkic

Examples without ISO 639-5 codes (descriptive, longer than three characters):
- `x-proto-baltslav` or `x-a-baltslav` - Proto-Balto-Slavic (no ISO 639-5 code)

Note: 
- Language family codes (ISO 639-5) are NOT valid as standard primary BCP 47 language tags which is why we have implemented them using x-proto
- They are valid and preferred within private-use extensions (after `x-`)
- Therefore all proto-language tags must start with `x-` to comply with BCP 47

#### 7. Historic Classifier (`hist` or `h`)
Identifies historical periods or stages of a language.

Format:
- Long: `language-x-hist-[period]`
- Short: `language-x-h-[period]`

Examples:
- `en-x-hist-old` or `en-x-h-old` - Old English period
- `en-x-hist-middle` or `en-x-h-middle` - Middle English period
- `ja-x-hist-kobun` or `ja-x-h-kobun` - Classical Japanese (古文)
- `ko-x-hist-hunmin` or `ko-x-h-hunmin` - Middle Korean (훈민정음 period)
- `el-x-hist-koine` or `el-x-h-koine` - Koine Greek (Κοινή)
- `sa-x-hist-vedic` or `sa-x-h-vedic` - Vedic Sanskrit (वैदिक)

#### 8. Genre Classifier (`genre` or `e`)
Identifies text genre or literary style.

Format:
- Long: `language-x-genre-[genre_type]`
- Short: `language-x-e-[genre_type]`

Examples:
- `en-x-genre-news` or `en-x-e-news` - News English
- `ja-x-genre-manga` or `ja-x-e-manga` - Manga Japanese (漫画)
- `ko-x-genre-webtoon` or `ko-x-e-webtoon` - Korean webtoon (웹툰)
- `zh-x-genre-shi` or `zh-x-e-shi` - Chinese poetry (詩)
- `fr-x-genre-bd` or `fr-x-e-bd` - French comics (bande dessinée)
- `de-x-genre-marchen` or `de-x-e-marchen` - German fairy tales (Märchen)

#### 9. Medium Classifier (`medium` or `m`)
Identifies the communication medium.

Format:
- Long: `language-x-medium-[medium_type]`
- Short: `language-x-m-[medium_type]`

Examples:
- `en-x-medium-spoken` or `en-x-m-spoken` - Spoken English
- `ko-x-medium-digital` or `ko-x-m-digital` - Digital/online Korean
- `ja-x-medium-written` or `ja-x-m-written` - Written Japanese
- `hi-x-medium-bcast` or `hi-x-m-bcast` - Broadcast Hindi
- `zh-x-medium-sms` or `zh-x-m-sms` - SMS/text message Chinese

#### 10. Socio Classifier (`socio` or `s`)
Identifies sociolect or social group varieties.

Format:
- Long: `language-x-socio-[social_group]`
- Short: `language-x-s-[social_group]`

Examples:
- `en-x-socio-academic` or `en-x-s-academic` - Academic sociolect
- `en-x-socio-urban` or `en-x-s-urban` - Urban sociolect  
- `es-x-socio-juvenil` or `es-x-s-juvenil` - Spanish youth sociolect (jerga juvenil)
- `fr-x-socio-jeune` or `fr-x-s-jeune` - French youth sociolect
- `de-x-socio-jugend` or `de-x-s-jugend` - German youth sociolect (Jugendsprache)
- `ko-x-socio-online` or `ko-x-s-online` - Korean online sociolect

#### 11. Modality Classifier (`modality` or `o`)
Identifies the fundamental mode of language production.

Format:
- Long: `language-x-modality-[mode]`
- Short: `language-x-o-[mode]`

Examples:
- `en-x-modality-spoken` or `en-x-o-spoken` - Spoken English
- `en-x-modality-written` or `en-x-o-written` - Written English
- `asl-x-modality-signed` or `asl-x-o-signed` - American Sign Language
- `en-x-modality-multi` or `en-x-o-multi` - Multimodal English (speech + gestures)
- `fr-x-modality-tactile` or `fr-x-o-tactile` - Tactile French (for deafblind)

#### 12. Register Classifier (`register` or `r`)
Identifies the linguistic register or functional variety of language use.

Format:
- Long: `language-x-register-[register_type]`
- Short: `language-x-r-[register_type]`

Examples:
- `en-x-register-frozen` or `en-x-r-frozen` - Frozen register (prayers, pledges)
- `en-x-register-formal` or `en-x-r-formal` - Formal register (academic papers)
- `en-x-register-consult` or `en-x-r-consult` - Consultative register (professional)
- `en-x-register-casual` or `en-x-r-casual` - Casual register (friends)
- `en-x-register-intimate` or `en-x-r-intimate` - Intimate register (family)

#### 13. Pragmatic Function Classifier (`pragma` or `u`)
Identifies the communicative function or speech act.

Format:
- Long: `language-x-pragma-[function]`
- Short: `language-x-u-[function]`

Examples:
- `en-x-pragma-request` or `en-x-u-request` - Request function
- `ja-x-pragma-apology` or `ja-x-u-apology` - Apology function
- `es-x-pragma-complmnt` or `es-x-u-complmnt` - Compliment function
- `ar-x-pragma-greeting` or `ar-x-u-greeting` - Greeting function
- `zh-x-pragma-refusal` or `zh-x-u-refusal` - Refusal function

#### 14. Temporal Marking Classifier (`temporal` or `t`)
Identifies temporal aspects or tense usage patterns.

Format:
- Long: `language-x-temporal-[aspect]`
- Short: `language-x-t-[aspect]`

Examples:
- `en-x-temporal-past` or `en-x-t-past` - Past-oriented discourse
- `ja-x-temporal-nonpast` or `ja-x-t-nonpast` - Non-past focus
- `id-x-temporal-atemprl` or `id-x-t-atemprl` - Timeless/atemporal
- `fr-x-temporal-future` or `fr-x-t-future` - Future-oriented
- `zh-x-temporal-aspect` or `zh-x-t-aspect` - Aspectual focus

#### 15. Evidentiality Classifier (`evidence` or `v`)
Identifies information source marking.

Format:
- Long: `language-x-evidence-[source]`
- Short: `language-x-v-[source]`

Examples:
- `qu-x-evidence-direct` or `qu-x-v-direct` - Direct witness
- `tr-x-evidence-hearsay` or `tr-x-v-hearsay` - Hearsay/reported
- `ja-x-evidence-infer` or `ja-x-v-infer` - Inferential
- `en-x-evidence-assume` or `en-x-v-assume` - Assumed
- `de-x-evidence-quote` or `de-x-v-quote` - Quotative

#### 16. Affect/Emotion Classifier (`affect` or `k`)
Identifies emotional tone or affect.

Format:
- Long: `language-x-affect-[emotion]`
- Short: `language-x-k-[emotion]`

Examples:
- `en-x-affect-angry` or `en-x-k-angry` - Angry tone
- `ja-x-affect-humble` or `ja-x-k-humble` - Humble affect
- `es-x-affect-joyful` or `es-x-k-joyful` - Joyful expression
- `ko-x-affect-sad` or `ko-x-k-sad` - Sad/melancholic
- `fr-x-affect-neutral` or `fr-x-k-neutral` - Neutral affect

#### 17. Age/Generation Classifier (`age` or `n`)
Identifies age-related or generational language varieties.

Format:
- Long: `language-x-age-[generation]`
- Short: `language-x-n-[generation]`

Examples:
- `en-x-age-child` or `en-x-n-child` - Child speech
- `ja-x-age-teen` or `ja-x-n-teen` - Teenager language
- `ko-x-age-elder` or `ko-x-n-elder` - Elder speech
- `es-x-age-genz` or `es-x-n-genz` - Generation Z
- `zh-x-age-millenl` or `zh-x-n-millenl` - Millennial speech

#### 18. Gender Classifier (`gender` or `i`)
Identifies gender related language varieties.

Format:
- Long: `language-x-gender-[identity]`
- Short: `language-x-i-[identity]`

Examples:
(Examples removed)

#### 19. Expertise Level Classifier (`expert` or `b`)
Identifies level of domain expertise on a 0-10 scale.

Format:
- Long: `language-x-expert-[0-10]`
- Short: `language-x-b-[0-10]`

Expertise scale:
- 0 = No knowledge
- 1-2 = Beginner
- 3-4 = Intermediate
- 5-6 = Advanced
- 7-8 = Expert
- 9-10 = Master/Authority

Examples:
- `en-x-expert-0` or `en-x-b-0` - No expertise
- `de-x-expert-3` or `de-x-b-3` - Intermediate level
- `ja-x-expert-7` or `ja-x-b-7` - Expert level
- `es-x-expert-9` or `es-x-b-9` - Master level
- `zh-x-expert-5` or `zh-x-b-5` - Advanced level

#### 20. Interactional Structure Classifier (`interact` or `2`)
Identifies conversational or interactional patterns.

Format:
- Long: `language-x-interact-[structure]`
- Short: `language-x-2-[structure]`

Examples:
- `en-x-interact-turn` or `en-x-2-turn` - Turn-taking
- `ja-x-interact-overlap` or `ja-x-2-overlap` - Overlapping speech
- `es-x-interact-monolog` or `es-x-2-monolog` - Monologic
- `ar-x-interact-dialog` or `ar-x-2-dialog` - Dialogic
- `zh-x-interact-multi` or `zh-x-2-multi` - Multi-party

#### 21. Prosodic Features Classifier (`prosody` or `y`)
Identifies prosodic or suprasegmental features.

Format:
- Long: `language-x-prosody-[feature]`
- Short: `language-x-y-[feature]`

Examples:
- `en-x-prosody-stress` or `en-x-y-stress` - Stress-timed
- `ja-x-prosody-pitch` or `ja-x-y-pitch` - Pitch-accent
- `fr-x-prosody-syllable` or `fr-x-y-syllable` - Syllable-timed
- `zh-x-prosody-tone` or `zh-x-y-tone` - Tonal patterns
- `es-x-prosody-rhythm` or `es-x-y-rhythm` - Rhythmic patterns

#### 22. Lexical Density Classifier (`lexical` or `l`)
Identifies lexical density as a numeric value (0-100).

Format:
- Long: `language-x-lexical-[0-100]`
- Short: `language-x-l-[0-100]`

Examples:
- `en-x-lexical-20` or `en-x-l-20` - Low density (20%)
- `de-x-lexical-55` or `de-x-l-55` - Medium density (55%)
- `ja-x-lexical-75` or `ja-x-l-75` - High density (75%)
- `es-x-lexical-40` or `es-x-l-40` - Moderate density (40%)
- `zh-x-lexical-85` or `zh-x-l-85` - Very high density (85%)

#### 23. Syntactic Complexity Classifier (`syntax` or `z`)
Identifies syntactic complexity as a numeric value (0-100).

Format:
- Long: `language-x-syntax-[0-100]`
- Short: `language-x-z-[0-100]`

Examples:
- `en-x-syntax-15` or `en-x-z-15` - Simple syntax (15%)
- `de-x-syntax-70` or `de-x-z-70` - Complex syntax (70%)
- `ja-x-syntax-45` or `ja-x-z-45` - Moderate complexity (45%)
- `es-x-syntax-30` or `es-x-z-30` - Low complexity (30%)
- `zh-x-syntax-60` or `zh-x-z-60` - High complexity (60%)

#### 24. Start Date Classifier (`start` or `0`)
Identifies the start date of language use (ISO 8601 format without punctuation).

Format:
- Long: `language-x-start-[YYYYMMDD]`
- Short: `language-x-0-[YYYYMMDD]`

Date formats:
- Full date: YYYYMMDD
- Year-month: YYYYMM
- Year only: YYYY

Examples:
- `en-x-start-20240315` or `en-x-0-20240315` - English starting March 15, 2024
- `ja-x-start-19890108` or `ja-x-0-19890108` - Japanese starting January 8, 1989
- `es-x-start-202403` or `es-x-0-202403` - Spanish starting March 2024

#### 25. End Date Classifier (`end` or `1`)
Identifies the end date of language use (ISO 8601 format without punctuation).

Format:
- Long: `language-x-end-[YYYYMMDD]`
- Short: `language-x-1-[YYYYMMDD]`

Date formats:
- Full date: YYYYMMDD
- Year-month: YYYYMM
- Year only: YYYY

Examples:
- `en-x-end-20240415` or `en-x-1-20240415` - English ending April 15, 2024
- `ja-x-end-20190430` or `ja-x-1-20190430` - Japanese ending April 30, 2019
- `es-x-end-202412` or `es-x-1-202412` - Spanish ending December 2024

#### 26. Taboo Classifier (`taboo` or `j`)
Identifies level of taboo, vulgar, or offensive content.

Format:
- Long: `language-x-taboo-[0-5]`
- Short: `language-x-j-[0-5]`

Examples:
- `en-x-taboo-0` or `en-x-j-0` - No taboo content
- `en-x-taboo-3` or `en-x-j-3` - Moderate taboo level
- `ja-x-form-5-taboo-4` or `ja-x-f-5-j-4` - Very casual Japanese with high taboo level

#### 27. Confidence Classifier (`conf` or `c`)
Indicates confidence score for the immediately preceding classifier.

Format:
- Long: `language-x-[classifier]-[value]-conf-[0-100]`
- Short: `language-x-[classifier]-[value]-c-[0-100]`

Special behavior:
- The confidence score applies to the classifier immediately before it
- Multiple confidence scores can be used for different classifiers
- If no classifier precedes it, the confidence applies to the base language tag

Examples:
- `en-x-form-3-conf-95` or `en-x-f-3-c-95` - Neutral formality with 95% confidence
- `ko-x-polite-2-conf-80-domain-med-conf-60` or `ko-x-p-2-c-80-d-med-c-60` - Very polite (80% confidence) medical Korean (60% confidence)
- `ja-x-hist-kobun-conf-100` or `ja-x-h-kobun-c-100` - Classical Japanese with 100% confidence
- `x-proto-ine-conf-75` or `x-a-ine-c-75` - Proto-Indo-European with 75% confidence

### Multiple Classifications

LVTag supports multiple classifiers in a single tag to provide precise language identification. Both long and short forms can be mixed:

```
ko-x-form-4-domain-business
ko-x-f-4-d-business
ko-x-form-4-polite-2-domain-business
ko-x-f-4-p-2-d-business
```

Examples above show Korean with informal formality (4) but polite speech (2) in business context.

## Valid Values

**Note**: All values must be 8 characters or shorter to comply with BCP 47 subtag length restrictions. While specific values for many classifiers are to be established through expert usage and community consensus, the numeric scales, date formats, and basic values listed below are defined in this standard.

### Formality Scale (Universal)

| Level | Description | Examples |
|-------|-------------|----------|
| 1 | Most formal | Legal documents, official ceremonies, academic papers |
| 2 | Formal | Business letters, news articles, presentations |
| 3 | Neutral | Standard conversation, email, general writing |
| 4 | Informal | Casual conversation, personal blogs, text messages |
| 5 | Most casual | Slang, intimate conversation, social media |

### Politeness Scale (Universal)

| Level | Description | Examples |
|-------|-------------|----------|
| 1 | Most respectful | Royal address, religious leaders, elderly respect |
| 2 | Very polite | Customer service, formal meetings, teachers |
| 3 | Polite/neutral | Standard interactions, colleagues |
| 4 | Familiar | Friends, peers, casual acquaintances |
| 5 | Intimate/plain | Close family, intimate partners |

### Expertise Scale (Universal)

| Level | Description |
|-------|-------------|
| 0 | No knowledge |
| 1-2 | Beginner |
| 3-4 | Intermediate |
| 5-6 | Advanced |
| 7-8 | Expert |
| 9-10 | Master/Authority |

### Taboo Scale (Universal)

| Level | Description |
|-------|-------------|
| 0 | No taboo content |
| 1 | Mild taboo |
| 2 | Light taboo |
| 3 | Moderate taboo |
| 4 | High taboo |
| 5 | Extreme taboo |

### Lexical Density Scale (Universal)

| Level | Description |
|-------|-------------|
| 0-20 | Very low density |
| 21-40 | Low density |
| 41-60 | Moderate density |
| 61-80 | High density |
| 81-100 | Very high density |

### Syntactic Complexity Scale (Universal)

| Level | Description |
|-------|-------------|
| 0-20 | Very simple |
| 21-40 | Simple |
| 41-60 | Moderate complexity |
| 61-80 | Complex |
| 81-100 | Very complex |

### Domain Values

| Value | Description |
|-------|-------------|
| `legal` | Legal terminology |
| `med` | Medical terminology |
| `tech` | Technical/IT |
| `business` | Business/corporate |
| `fin` | Finance/banking |
| `acad` | Academic/scholarly |
| `sci` | Scientific/research |

## Implementation Examples

### Single Classifier (Long Form)
```
# Most formal Korean
ko-x-form-1

# Very polite Japanese
ja-x-polite-2

# Legal English
en-x-domain-legal

# Gyeongsang Korean
ko-x-geo-gyeong

# Proto-Indo-European
x-proto-ine
```

### Single Classifier (Short Form)
```
# Most formal Korean
ko-x-f-1

# Very polite Japanese
ja-x-p-2

# Legal English
en-x-d-legal

# Gyeongsang Korean
ko-x-g-gyeong

# Proto-Indo-European
x-a-ine
```

### Multiple Classifiers
```
# Informal but polite Korean business language
ko-x-form-4-polite-2-domain-business
ko-x-f-4-p-2-d-business

# Formal and respectful Japanese medical language
ja-x-form-1-polite-1-domain-med
ja-x-f-1-p-1-d-med

# Southern Vietnamese with neutral formality, polite speech, technical domain
vi-x-geo-southern-form-3-polite-2-domain-tech
vi-x-g-southern-f-3-p-2-d-tech

# Complex classification with multiple dimensions
en-x-h-middle-e-poetry-m-written-f-1
ja-x-f-2-p-1-d-med-h-kobun-m-written

# Language varieties showing formality/politeness distinction
ko-x-f-5-p-2  # Very casual but polite (to older friend)
ko-x-f-1-p-4  # Very formal but familiar (written to peer)
ja-x-f-4-p-1  # Casual formality but highest respect
en-x-f-5-j-4  # Very casual English with high taboo level
```

## Use Cases

1. **Language Learning Applications**
   - Teach appropriate register for different social contexts
   - Provide domain-specific vocabulary training

2. **Machine Translation**
   - Maintain register consistency in translations
   - Apply domain-specific terminology

3. **Content Classification**
   - Automatically categorize text by formality and domain
   - Route content to appropriate reviewers or systems

4. **Corpus Linguistics**
   - Build tagged corpora for linguistic research
   - Study register and domain variation

## Validation Rules

1. **Subtag Length**: Each subtag after `x-` must be 8 characters or fewer
2. **Order**: Classifiers can appear in any order after `x-`
3. **Uniqueness**: Each classifier type should appear only once per tag (except `conf` which can appear multiple times)
4. **Case**: Tags should be lowercase (case-insensitive per BCP 47)
5. **Magic Tags**: Short form tags are single characters; `q`, `3`-`9` are reserved for future use
6. **Mixing**: Long and short forms can be mixed within the same tag
7. **Proto Tags**: Must start with `x-` and SHOULD use ISO 639-5 codes when available (e.g., `x-proto-sla` not `x-proto-slavic`)
8. **Confidence**: The `conf`/`c` classifier applies to the immediately preceding classifier
9. **Numeric Values**: Must be within defined ranges (0-5 for taboo, 0-10 for expertise, 0-100 for percentage values)
10. **Date Format**: Dates use ISO 8601 without punctuation (YYYY, YYYYMM, or YYYYMMDD)

## Compatibility

LVTag format is fully compatible with:
- BCP 47 (RFC 5646)
- ISO 639 language codes
- IANA Language Subtag Registry
- Unicode CLDR

## Benefits

1. **Precision**: Enables fine-grained language variety identification
2. **Extensibility**: New registers and domains can be added
3. **Standards-based**: Built on established BCP 47 private-use mechanism
4. **Machine-readable**: Systematic format enables automated processing
5. **Human-readable**: Clear, descriptive subtags
6. **Flexibility**: Support for both verbose long-form and concise short-form tags
7. **Brevity**: Short magic tags enable compact representation while maintaining clarity

## Future Extensions

LVTag is designed to evolve with the needs of the language technology community. We welcome suggestions for new classifiers, improvements to existing ones, and real-world implementation feedback.

To propose extensions or contribute to the specification:
- Open an issue at [github.com/lvtag/spec](https://github.com/lvtag/spec)
- Join the discussion on existing proposals
- Share your implementation experiences
- Submit pull requests for documentation improvements

Reserved single-character codes (`q`, `3`-`9`) are available for future standardized extensions.

## References

- [BCP 47: Tags for Identifying Languages](https://www.rfc-editor.org/rfc/rfc5646.html)
- [IANA Language Subtag Registry](https://www.iana.org/assignments/language-subtag-registry/)

---

## License and Patent Grant

This specification is released under the **CC0 1.0 Universal (Public Domain Dedication)**.

**Why CC0**: To ensure maximum adoption and implementation freedom, LVTag is placed in the public domain. This means:
- No permission needed to use, implement, or modify
- No attribution required (though appreciated)
- No legal barriers for commercial or governmental use
- Compatible with all software licenses
- Used by major standards like Unicode CLDR

**Patent Grant**: Any patents covering the LVTag specification are hereby licensed royalty-free for any implementation that complies with this specification.

**No Endorsement**: Use of LVTag does not imply endorsement by the specification authors.

To the extent possible under law, **Danslav Slavenskoj** has waived all copyright and related or neighboring rights to the Language Variant Tag (LVTag) Format Specification. This work is published from: United States of America.


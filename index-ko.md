---
layout: default
title: 언어 변형 태그(LVTag) 사양
lang: ko
description: "LVTag는 형식성, 공손함, 도메인 및 철자법 차원에서 언어 변종을 정확하게 식별하기 위해 사설 사용 하위 태그를 사용하여 BCP 47을 확장하는 체계적인 언어 분류 접근법입니다."
---

<div align="center">
  <img src="/LVTAG_LOGO.png" alt="LVTag Logo" width="400">
</div>

# LVTag 사양

**버전 1.0**  
**작성자: Danslav Slavenskoj**  
**날짜: 2025년 5월**

**언어**: [中文简体](/index-zh.md)  [中文繁體](/index-zh-hant.md)  [Čeština](/index-cs.md)  [Deutsch](/index-de.md)  [English](/index.md)  [Español](/index-es.md)  [Français](/index-fr.md)  [Hrvatski](/index-hr.md)  [日本語](/index-ja.md)  한국어  [Polski](/index-pl.md)  [Português](/index-pt.md)  [Русский](/index-ru.md)  [Српски](/index-sr.md)

## 빠른 링크

- [JSON 스키마](/lvtag-schema.json) - LVTag 형식의 전체 검증 스키마
- [분류자 정의](/lvtag-classifiers.json) - 기계 판독 가능한 분류자 사양
- [사양](#형식-사양) - 형식 세부사항으로 이동
- [예시](#구현-예시) - LVTag 실제 사용 예시

## 개요

언어 변형 태그(LVTag) 형식은 개인 사용 서브태그를 사용하여 BCP 47 표준을 확장하는 체계적인 언어 분류 접근법입니다. 격식성, 공손함, 도메인, 철자법을 포함한 여러 차원에 걸쳐 언어 변종의 정확한 식별을 가능하게 합니다.

### 주요 이점

**분류의 엄격성**: LVTag는 다양한 유형의 변형에 대해 명확하고 분리된 차원을 제공함으로써 언어 태깅에 체계적인 조직을 가져옵니다. 동일한 수준에서 다른 범주를 혼합하는 기존 서브태그 및 시스템과 달리, LVTag는 격식성, 공손함, 도메인 및 기타 차원 간의 엄격한 분리를 유지합니다.

**표준 호환성**: LVTag는 BCP 47 (RFC 5646)과 완전히 호환되며 다음과 원활하게 작동합니다:
- IANA 언어 서브태그 레지스트리
- ISO 639 언어 코드
- Unicode CLDR
- W3C 언어 태그
- HTTP Accept-Language 헤더
- XML lang 속성
- HTML lang 속성

**기술 통합**: LVTag 태그는 다음에서 직접 사용할 수 있습니다:
- 자연어 처리(NLP) 파이프라인
- 기계 번역 시스템
- 콘텐츠 관리 시스템(CMS)
- 언어 감지 라이브러리
- 검색 엔진 및 정보 검색 시스템
- 웹 애플리케이션 및 API
- 현지화 워크플로우

**사용 사례**:
- **대상 타겟팅**: 레지스터와 도메인을 기반으로 적절한 대상에게 콘텐츠 매칭
- **번역 품질**: 기계 번역에서 적절한 격식성과 공손함 수준 유지
- **언어 학습**: 학습자에게 다양한 맥락에 적합한 레지스터 교육
- **말뭉치 언어학**: 연구를 위한 정확하게 태그된 말뭉치 구축
- **소셜 미디어 분석**: 레지스터와 도메인별로 사용자 생성 콘텐츠 분류
- **고객 서비스**: 격식성과 도메인을 기반으로 적절한 상담원에게 메시지 라우팅

## 근거

BCP 47은 언어, 문자, 지역 식별에 대한 탁월한 지원을 제공하지만, 언어 내 사회언어학적 변형을 포착하기 위한 표준화된 메커니즘이 부족합니다. 현재 표준은 다음을 다루지 않습니다:

- **레지스터 변형**: 동일한 언어의 격식적 변종과 비격식적 변종을 구별할 방법 없음
- **공손함 수준**: 일본어, 한국어, 태국어와 같이 공손함이 문법적으로 인코딩된 언어에 중요
- **도메인별 언어**: 기술, 의학 또는 법률 언어 변종을 표시하는 표준 없음
- **사회방언**: 사회 집단 변종(청소년 언어, 전문 용어)을 식별하는 메커니즘 없음
- **역사적 단계**: 고전 형식과 현대 형식을 구별하는 제한된 지원
- **격식성 그라데이션**: 레지스터의 전산 처리를 위한 숫자 척도 없음
- **조어**: 일관성 없는 인코딩 - 일부 조어는 ISO 코드가 있지만(예: PIE의 `ine`) 다른 것은 없으며, ISO 639-5 어족 코드는 BCP 47 태그에서 유효하지 않아 역사 언어학에 혼란스러운 환경을 만듦
- **철자 변형**: BCP 47이 문자를 처리하지만, 텍스트 처리, 검색 및 맞춤법 검사에 근본적으로 영향을 미치는 문자 내 변형(철자 개혁, 로마자 표기 시스템, 경쟁 표준)을 효과적으로 포착하지 못함

LVTag는 BCP 47의 개인 사용 확장 메커니즘(`-x-`)을 사용하여 이러한 격차를 메우며, 완전한 역호환성을 유지하면서 언어 변형의 이러한 중요한 차원을 인코딩하는 체계적이고 기계 판독 가능한 방법을 제공합니다.

### 정밀한 언어 분류

대규모 언어 모델과 정교한 NLP 도구의 출현으로 정밀한 언어 변종 분류가 유용할 뿐만 아니라 필수적이 되었습니다. 현대 시스템은 다음이 필요합니다:

- 특정 맥락에 적합한 텍스트 생성 (격식적 대 비격식적, 공손함 대 캐주얼)
- 부적절하게 레지스터를 혼합하지 않도록 올바르게 분류된 말뭉치에서 훈련
- 문화적으로 맥락적으로 적절한 응답 제공
- 코드 전환과 혼합 언어 콘텐츠를 정확하게 처리
- 텍스트를 번역하거나 변환할 때 스타일 일관성 유지
- 격식성, 도메인 또는 기타 특성을 기반으로 훈련 데이터 필터링
- 사용자 선호도나 요구 사항에 맞게 출력 조정

LVTag는 어떤 언어가 사용되고 있는지뿐만 아니라 어떻게 사용되고 있는지 이해하는 데 필요한 세분화된 메타데이터를 제공하여 보다 미묘하고 적절한 언어 처리 파이프라인을 가능하게 합니다.

## 형식 사양

### 기본 구조

```
language-x-[classifier]-[value]-[classifier2]-[value2]...
```

여기서:
- `language`는 유효한 BCP 47 주 언어 서브태그입니다 (예: `en`, `ko`, `ja`)
- `x`는 개인 사용 서브태그의 시작을 나타냅니다
- `classifier`는 범주 식별자입니다 (아래 매직 태그 참조)
- `value`는 해당 범주 내의 특정 분류입니다

### 매직 태그

LVTag는 유연성을 위해 긴 형식과 짧은 형식의 "매직" 분류자를 모두 지원합니다:

| 긴 형식 | 짧은 형식 | 설명 |
|-----------|------------|-------------|
| `ortho` | `w` | 철자 변형 |
| `form` | `f` | 격식성 수준 (1-5 척도) |
| `polite` | `p` | 공손함/존경 수준 (1-5 척도) |
| `domain` | `d` | 전문 어휘 또는 전문 맥락 |
| `geo` | `g` | 지리적 또는 지역적 변종 |
| `proto` | `a` | 조어 또는 재구성된 언어 |
| `hist` | `h` | 언어의 역사적 시기 또는 단계 |
| `genre` | `e` | 텍스트 장르 또는 문학적 스타일 |
| `medium` | `m` | 커뮤니케이션 매체 (구어, 문어, 디지털) |
| `socio` | `s` | 사회방언 또는 사회 집단 변종 |
| `modality` | `o` | 언어 생산 모드 |
| `register` | `r` | 언어 레지스터 |
| `pragma` | `u` | 의사소통 기능 |
| `temporal` | `t` | 시간적 표시 |
| `evidence` | `v` | 정보 출처 |
| `affect` | `k` | 감정적 톤 |
| `age` | `n` | 연령/세대 변종 |
| `gender` | `i` | 성별 변종 |
| `expert` | `b` | 전문 지식 수준 |
| `interact` | `2` | 상호작용 구조 |
| `prosody` | `y` | 운율적 특징 |
| `lexical` | `l` | 어휘 밀도 (0-100) |
| `syntax` | `z` | 구문 복잡성 (0-100) |
| `start` | `0` | 시작 날짜 (구두점 없는 ISO 8601) |
| `end` | `1` | 종료 날짜 (구두점 없는 ISO 8601) |
| `taboo` | `j` | 금기/저속한 콘텐츠 수준 (0-5 척도) |
| `conf` | `c` | 이전 태그의 신뢰도 점수 (0-100) |
| — | `q`, `3`-`9` | 향후 사용을 위해 예약됨 |

### 분류자

#### 1. 철자 분류자 (`ortho` 또는 `w`)
표준 문자 태그를 넘어선 특정 철자 규칙이나 문자 체계 변형을 식별합니다.

형식:
- 긴 형식: `language-x-ortho-[variant]`
- 짧은 형식: `language-x-w-[variant]`

예시 (표준 문자 태그와 결합):
- `az-Latn-x-ortho-new` 또는 `az-Latn-x-w-new` - 아제르바이잔어 라틴 문자, 새 철자법
- `de-Latn-x-ortho-1901` 또는 `de-Latn-x-w-1901` - 독일어 라틴 문자, 1901년 철자법
- `zh-Hans-x-ortho-pinyin` 또는 `zh-Hans-x-w-pinyin` - 병음이 포함된 간체 중국어
- `yi-Hebr-x-ortho-yivo` 또는 `yi-Hebr-x-w-yivo` - 이디시어 히브리 문자, YIVO 철자법

#### 2. 격식성 분류자 (`form` 또는 `f`)
언어 사용의 격식성 수준을 식별합니다.

형식:
- 긴 형식: `language-x-form-[1-5]`
- 짧은 형식: `language-x-f-[1-5]`

격식성 척도:
- 1 = 가장 격식적 (문서, 공식 연설)
- 2 = 격식적 (비즈니스 회의, 학술 글쓰기)
- 3 = 중립/표준 (뉴스, 일반 대화)
- 4 = 비격식적 (캐주얼한 대화, 친구에게 보내는 이메일)
- 5 = 가장 캐주얼 (친밀한 대화, 속어)

예시:
- `ko-x-form-1` 또는 `ko-x-f-1` - 가장 격식적인 한국어
- `en-x-form-3` 또는 `en-x-f-3` - 중립적인 영어
- `ja-x-form-5` 또는 `ja-x-f-5` - 가장 캐주얼한 일본어

#### 3. 공손함 분류자 (`polite` 또는 `p`)
언어 사용의 공손함/존경 수준을 식별합니다.

형식:
- 긴 형식: `language-x-polite-[1-5]`
- 짧은 형식: `language-x-p-[1-5]`

공손함 척도:
- 1 = 가장 공손함/경어 (왕실 호칭, 종교적 맥락)
- 2 = 매우 공손함 (격식 있는 경어, 존경하는 말)
- 3 = 공손함/중립 (표준 공손함)
- 4 = 친근함 (동등한 사이, 친구)
- 5 = 친밀함/평어 (가족, 매우 가까운 친구)

예시:
- `ko-x-polite-1` 또는 `ko-x-p-1` - 최고 존대 한국어
- `ja-x-polite-2` 또는 `ja-x-p-2` - 매우 공손한 일본어
- `th-x-polite-3` 또는 `th-x-p-3` - 표준 공손한 태국어

#### 4. 도메인 분류자 (`domain` 또는 `d`)
전문 어휘 또는 전문 맥락을 식별합니다.

형식:
- 긴 형식: `language-x-domain-[domain_type]`
- 짧은 형식: `language-x-d-[domain_type]`

예시:
- `en-x-domain-legal` 또는 `en-x-d-legal` - 법률 영어
- `ja-x-domain-med` 또는 `ja-x-d-med` - 의학 일본어
- `ko-x-domain-business` 또는 `ko-x-d-business` - 비즈니스 한국어
- `ja-x-domain-tech` 또는 `ja-x-d-tech` - 기술 일본어
- `en-x-domain-fin` 또는 `en-x-d-fin` - 금융 영어

#### 5. 지리적 분류자 (`geo` 또는 `g`)
지역적 또는 지리적 언어 변종을 식별합니다.

형식:
- 긴 형식: `language-x-geo-[region]`
- 짧은 형식: `language-x-g-[region]`

예시:
- `ko-x-geo-gyeong` 또는 `ko-x-g-gyeong` - 경상도 한국어 (경상도)
- `ko-x-geo-jeolla` 또는 `ko-x-g-jeolla` - 전라도 한국어 (전라도)
- `es-x-geo-riopla` 또는 `es-x-g-riopla` - 리오플라텐세 스페인어
- `pt-x-geo-nordeste` 또는 `pt-x-g-nordeste` - 브라질 북동부 포르투갈어

#### 6. 조어 분류자 (`proto` 또는 `a`)
조어 또는 재구성된 역사적 언어를 식별합니다.

형식:
- 긴 형식: `x-proto-[iso639-5_code if available]`
- 짧은 형식: `x-a-[iso639-5_code if available]`

규칙:
- 사용 가능한 경우 ISO 639-5 언어 계통 코드를 사용해야 함
- ISO 639-5 코드가 없는 경우에만 설명적 식별자 사용

ISO 639-5 코드를 사용한 예시:
- `x-proto-ine` 또는 `x-a-ine` - 인도유럽조어
- `x-proto-gem` 또는 `x-a-gem` - 게르만조어
- `x-proto-sla` 또는 `x-a-sla` - 슬라브조어
- `x-proto-sem` 또는 `x-a-sem` - 셈조어
- `x-proto-cel` 또는 `x-a-cel` - 켈트조어
- `x-proto-ira` 또는 `x-a-ira` - 이란조어
- `x-proto-inc` 또는 `x-a-inc` - 인도아리아조어
- `x-proto-bat` 또는 `x-a-bat` - 발트조어
- `x-proto-roa` 또는 `x-a-roa` - 로망스조어
- `x-proto-trk` 또는 `x-a-trk` - 투르크조어

ISO 639-5 코드가 없는 예시 (설명적, 3자 이상):
- `x-proto-baltslav` 또는 `x-a-baltslav` - 발토슬라브조어 (ISO 639-5 코드 없음)

참고:
- 언어 계통 코드(ISO 639-5)는 표준 주 BCP 47 언어 태그로 유효하지 않으므로 x-proto를 사용하여 구현했습니다
- 개인 사용 확장(x- 이후) 내에서 유효하고 선호됩니다
- 따라서 모든 조어 태그는 BCP 47을 준수하기 위해 x-로 시작해야 합니다

#### 7. 역사적 분류자 (`hist` 또는 `h`)
언어의 역사적 시기 또는 단계를 식별합니다.

형식:
- 긴 형식: `language-x-hist-[period]`
- 짧은 형식: `language-x-h-[period]`

예시:
- `en-x-hist-old` 또는 `en-x-h-old` - 고대 영어 시기
- `en-x-hist-middle` 또는 `en-x-h-middle` - 중세 영어 시기
- `ja-x-hist-kobun` 또는 `ja-x-h-kobun` - 고전 일본어 (古文)
- `ko-x-hist-hunmin` 또는 `ko-x-h-hunmin` - 중세 한국어 (훈민정음 시기)
- `el-x-hist-koine` 또는 `el-x-h-koine` - 코이네 그리스어 (Κοινή)
- `sa-x-hist-vedic` 또는 `sa-x-h-vedic` - 베다 산스크리트어 (वैदिक)

#### 8. 장르 분류자 (`genre` 또는 `e`)
텍스트 장르 또는 문학적 스타일을 식별합니다.

형식:
- 긴 형식: `language-x-genre-[genre_type]`
- 짧은 형식: `language-x-e-[genre_type]`

예시:
- `en-x-genre-news` 또는 `en-x-e-news` - 뉴스 영어
- `ja-x-genre-manga` 또는 `ja-x-e-manga` - 만화 일본어 (漫画)
- `ko-x-genre-webtoon` 또는 `ko-x-e-webtoon` - 한국 웹툰 (웹툰)
- `zh-x-genre-shi` 또는 `zh-x-e-shi` - 중국 시가 (詩)
- `fr-x-genre-bd` 또는 `fr-x-e-bd` - 프랑스 만화 (bande dessinée)
- `de-x-genre-marchen` 또는 `de-x-e-marchen` - 독일 동화 (Märchen)

#### 9. 매체 분류자 (`medium` 또는 `m`)
커뮤니케이션 매체를 식별합니다.

형식:
- 긴 형식: `language-x-medium-[medium_type]`
- 짧은 형식: `language-x-m-[medium_type]`

예시:
- `en-x-medium-spoken` 또는 `en-x-m-spoken` - 구어 영어
- `ko-x-medium-digital` 또는 `ko-x-m-digital` - 디지털/온라인 한국어
- `ja-x-medium-written` 또는 `ja-x-m-written` - 문어 일본어
- `hi-x-medium-bcast` 또는 `hi-x-m-bcast` - 방송 힌디어
- `zh-x-medium-sms` 또는 `zh-x-m-sms` - SMS/문자 메시지 중국어

#### 10. 사회방언 분류자 (`socio` 또는 `s`)
사회방언 또는 사회 집단 변종을 식별합니다.

형식:
- 긴 형식: `language-x-socio-[social_group]`
- 짧은 형식: `language-x-s-[social_group]`

예시:
- `en-x-socio-academic` 또는 `en-x-s-academic` - 학술 사회방언
- `en-x-socio-urban` 또는 `en-x-s-urban` - 도시 사회방언
- `es-x-socio-juvenil` 또는 `es-x-s-juvenil` - 스페인어 청소년 사회방언 (jerga juvenil)
- `fr-x-socio-jeune` 또는 `fr-x-s-jeune` - 프랑스어 청소년 사회방언
- `de-x-socio-jugend` 또는 `de-x-s-jugend` - 독일어 청소년 사회방언 (Jugendsprache)
- `ko-x-socio-online` 또는 `ko-x-s-online` - 한국어 온라인 사회방언

#### 11. 양식 분류자 (`modality` 또는 `o`)
언어 생산의 기본 모드를 식별합니다.

형식:
- 긴 형식: `language-x-modality-[mode]`
- 짧은 형식: `language-x-o-[mode]`

예시:
- `en-x-modality-spoken` 또는 `en-x-o-spoken` - 구어 영어
- `en-x-modality-written` 또는 `en-x-o-written` - 문어 영어
- `asl-x-modality-signed` 또는 `asl-x-o-signed` - 미국 수화
- `en-x-modality-multi` 또는 `en-x-o-multi` - 다중 양식 영어 (음성 + 제스처)
- `fr-x-modality-tactile` 또는 `fr-x-o-tactile` - 촉각 프랑스어 (시청각 장애인용)

#### 12. 레지스터 분류자 (`register` 또는 `r`)
언어 사용의 언어 레지스터 또는 기능적 변종을 식별합니다.

형식:
- 긴 형식: `language-x-register-[register_type]`
- 짧은 형식: `language-x-r-[register_type]`

예시:
- `en-x-register-frozen` 또는 `en-x-r-frozen` - 고정 레지스터 (기도문, 서약)
- `en-x-register-formal` 또는 `en-x-r-formal` - 격식 레지스터 (학술 논문)
- `en-x-register-consult` 또는 `en-x-r-consult` - 상담 레지스터 (전문적)
- `en-x-register-casual` 또는 `en-x-r-casual` - 캐주얼 레지스터 (친구)
- `en-x-register-intimate` 또는 `en-x-r-intimate` - 친밀한 레지스터 (가족)

#### 13. 화용 기능 분류자 (`pragma` 또는 `u`)
의사소통 기능 또는 화행을 식별합니다.

형식:
- 긴 형식: `language-x-pragma-[function]`
- 짧은 형식: `language-x-u-[function]`

예시:
- `en-x-pragma-request` 또는 `en-x-u-request` - 요청 기능
- `ja-x-pragma-apology` 또는 `ja-x-u-apology` - 사과 기능
- `es-x-pragma-complmnt` 또는 `es-x-u-complmnt` - 칭찬 기능
- `ar-x-pragma-greeting` 또는 `ar-x-u-greeting` - 인사 기능
- `zh-x-pragma-refusal` 또는 `zh-x-u-refusal` - 거절 기능

#### 14. 시간적 표시 분류자 (`temporal` 또는 `t`)
시간적 측면 또는 시제 사용 패턴을 식별합니다.

형식:
- 긴 형식: `language-x-temporal-[aspect]`
- 짧은 형식: `language-x-t-[aspect]`

예시:
- `en-x-temporal-past` 또는 `en-x-t-past` - 과거 지향적 담화
- `ja-x-temporal-nonpast` 또는 `ja-x-t-nonpast` - 비과거 초점
- `id-x-temporal-atemprl` 또는 `id-x-t-atemprl` - 무시간적/비시간적
- `fr-x-temporal-future` 또는 `fr-x-t-future` - 미래 지향적
- `zh-x-temporal-aspect` 또는 `zh-x-t-aspect` - 상적 초점

#### 15. 증거성 분류자 (`evidence` 또는 `v`)
정보 출처 표시를 식별합니다.

형식:
- 긴 형식: `language-x-evidence-[source]`
- 짧은 형식: `language-x-v-[source]`

예시:
- `qu-x-evidence-direct` 또는 `qu-x-v-direct` - 직접 목격
- `tr-x-evidence-hearsay` 또는 `tr-x-v-hearsay` - 전문/보고
- `ja-x-evidence-infer` 또는 `ja-x-v-infer` - 추론적
- `en-x-evidence-assume` 또는 `en-x-v-assume` - 가정
- `de-x-evidence-quote` 또는 `de-x-v-quote` - 인용적

#### 16. 정서/감정 분류자 (`affect` 또는 `k`)
감정적 톤 또는 정서를 식별합니다.

형식:
- 긴 형식: `language-x-affect-[emotion]`
- 짧은 형식: `language-x-k-[emotion]`

예시:
- `en-x-affect-angry` 또는 `en-x-k-angry` - 화난 톤
- `ja-x-affect-humble` 또는 `ja-x-k-humble` - 겸손한 정서
- `es-x-affect-joyful` 또는 `es-x-k-joyful` - 기쁜 표현
- `ko-x-affect-sad` 또는 `ko-x-k-sad` - 슬픈/우울한
- `fr-x-affect-neutral` 또는 `fr-x-k-neutral` - 중립적 정서

#### 17. 연령/세대 분류자 (`age` 또는 `n`)
연령 관련 또는 세대적 언어 변종을 식별합니다.

형식:
- 긴 형식: `language-x-age-[generation]`
- 짧은 형식: `language-x-n-[generation]`

예시:
- `en-x-age-child` 또는 `en-x-n-child` - 아동 말투
- `ja-x-age-teen` 또는 `ja-x-n-teen` - 청소년 언어
- `ko-x-age-elder` 또는 `ko-x-n-elder` - 노인 말투
- `es-x-age-genz` 또는 `es-x-n-genz` - Z세대
- `zh-x-age-millenl` 또는 `zh-x-n-millenl` - 밀레니얼 말투

#### 18. 성별 분류자 (`gender` 또는 `i`)
성별 관련 언어 변종을 식별합니다.

형식:
- 긴 형식: `language-x-gender-[identity]`
- 짧은 형식: `language-x-i-[identity]`

#### 19. 전문 지식 수준 분류자 (`expert` 또는 `b`)
0-10 척도로 도메인 전문 지식 수준을 식별합니다.

형식:
- 긴 형식: `language-x-expert-[0-10]`
- 짧은 형식: `language-x-b-[0-10]`

전문 지식 척도:
- 0 = 지식 없음
- 1-2 = 초보자
- 3-4 = 중급
- 5-6 = 고급
- 7-8 = 전문가
- 9-10 = 마스터/권위자

예시:
- `en-x-expert-0` 또는 `en-x-b-0` - 전문 지식 없음
- `de-x-expert-3` 또는 `de-x-b-3` - 중급 수준
- `ja-x-expert-7` 또는 `ja-x-b-7` - 전문가 수준
- `es-x-expert-9` 또는 `es-x-b-9` - 마스터 수준
- `zh-x-expert-5` 또는 `zh-x-b-5` - 고급 수준

#### 20. 상호작용 구조 분류자 (`interact` 또는 `2`)
대화 또는 상호작용 패턴을 식별합니다.

형식:
- 긴 형식: `language-x-interact-[structure]`
- 짧은 형식: `language-x-2-[structure]`

예시:
- `en-x-interact-turn` 또는 `en-x-2-turn` - 순서 교대
- `ja-x-interact-overlap` 또는 `ja-x-2-overlap` - 겹치는 발화
- `es-x-interact-monolog` 또는 `es-x-2-monolog` - 독백적
- `ar-x-interact-dialog` 또는 `ar-x-2-dialog` - 대화적
- `zh-x-interact-multi` 또는 `zh-x-2-multi` - 다자간

#### 21. 운율적 특징 분류자 (`prosody` 또는 `y`)
운율적 또는 초분절적 특징을 식별합니다.

형식:
- 긴 형식: `language-x-prosody-[feature]`
- 짧은 형식: `language-x-y-[feature]`

예시:
- `en-x-prosody-stress` 또는 `en-x-y-stress` - 강세 박자
- `ja-x-prosody-pitch` 또는 `ja-x-y-pitch` - 음조 악센트
- `fr-x-prosody-syllable` 또는 `fr-x-y-syllable` - 음절 박자
- `zh-x-prosody-tone` 또는 `zh-x-y-tone` - 성조 패턴
- `es-x-prosody-rhythm` 또는 `es-x-y-rhythm` - 리듬 패턴

#### 22. 어휘 밀도 분류자 (`lexical` 또는 `l`)
어휘 밀도를 숫자 값(0-100)으로 식별합니다.

형식:
- 긴 형식: `language-x-lexical-[0-100]`
- 짧은 형식: `language-x-l-[0-100]`

예시:
- `en-x-lexical-20` 또는 `en-x-l-20` - 낮은 밀도 (20%)
- `de-x-lexical-55` 또는 `de-x-l-55` - 중간 밀도 (55%)
- `ja-x-lexical-75` 또는 `ja-x-l-75` - 높은 밀도 (75%)
- `es-x-lexical-40` 또는 `es-x-l-40` - 보통 밀도 (40%)
- `zh-x-lexical-85` 또는 `zh-x-l-85` - 매우 높은 밀도 (85%)

#### 23. 구문 복잡성 분류자 (`syntax` 또는 `z`)
구문 복잡성을 숫자 값(0-100)으로 식별합니다.

형식:
- 긴 형식: `language-x-syntax-[0-100]`
- 짧은 형식: `language-x-z-[0-100]`

예시:
- `en-x-syntax-15` 또는 `en-x-z-15` - 단순한 구문 (15%)
- `de-x-syntax-70` 또는 `de-x-z-70` - 복잡한 구문 (70%)
- `ja-x-syntax-45` 또는 `ja-x-z-45` - 보통 복잡성 (45%)
- `es-x-syntax-30` 또는 `es-x-z-30` - 낮은 복잡성 (30%)
- `zh-x-syntax-60` 또는 `zh-x-z-60` - 높은 복잡성 (60%)

#### 24. 시작 날짜 분류자 (`start` 또는 `0`)
언어 사용 시작 날짜를 식별합니다 (구두점 없는 ISO 8601 형식).

형식:
- 긴 형식: `language-x-start-[YYYYMMDD]`
- 짧은 형식: `language-x-0-[YYYYMMDD]`

날짜 형식:
- 전체 날짜: YYYYMMDD
- 년-월: YYYYMM
- 연도만: YYYY

예시:
- `en-x-start-20240315` 또는 `en-x-0-20240315` - 2024년 3월 15일부터 시작하는 영어
- `ja-x-start-19890108` 또는 `ja-x-0-19890108` - 1989년 1월 8일부터 시작하는 일본어
- `es-x-start-202403` 또는 `es-x-0-202403` - 2024년 3월부터 시작하는 스페인어

#### 25. 종료 날짜 분류자 (`end` 또는 `1`)
언어 사용 종료 날짜를 식별합니다 (구두점 없는 ISO 8601 형식).

형식:
- 긴 형식: `language-x-end-[YYYYMMDD]`
- 짧은 형식: `language-x-1-[YYYYMMDD]`

날짜 형식:
- 전체 날짜: YYYYMMDD
- 년-월: YYYYMM
- 연도만: YYYY

예시:
- `en-x-end-20240415` 또는 `en-x-1-20240415` - 2024년 4월 15일에 끝나는 영어
- `ja-x-end-20190430` 또는 `ja-x-1-20190430` - 2019년 4월 30일에 끝나는 일본어
- `es-x-end-202412` 또는 `es-x-1-202412` - 2024년 12월에 끝나는 스페인어

#### 26. 금기 분류자 (`taboo` 또는 `j`)
금기, 저속하거나 불쾌한 콘텐츠의 수준을 식별합니다.

형식:
- 긴 형식: `language-x-taboo-[0-5]`
- 짧은 형식: `language-x-j-[0-5]`

예시:
- `en-x-taboo-0` 또는 `en-x-j-0` - 금기 콘텐츠 없음
- `en-x-taboo-3` 또는 `en-x-j-3` - 보통 금기 수준
- `ja-x-form-5-taboo-4` 또는 `ja-x-f-5-j-4` - 매우 캐주얼한 일본어에 높은 금기 수준

#### 27. 신뢰도 분류자 (`conf` 또는 `c`)
바로 앞의 분류자에 대한 신뢰도 점수를 나타냅니다.

형식:
- 긴 형식: `language-x-[classifier]-[value]-conf-[0-100]`
- 짧은 형식: `language-x-[classifier]-[value]-c-[0-100]`

특별한 동작:
- 신뢰도 점수는 바로 앞의 분류자에 적용됩니다
- 여러 신뢰도 점수를 다른 분류자에 사용할 수 있습니다
- 앞에 분류자가 없으면 신뢰도는 기본 언어 태그에 적용됩니다

예시:
- `en-x-form-3-conf-95` 또는 `en-x-f-3-c-95` - 95% 신뢰도의 중립적 격식성
- `ko-x-polite-2-conf-80-domain-med-conf-60` 또는 `ko-x-p-2-c-80-d-med-c-60` - 매우 공손함 (80% 신뢰도) 의학 한국어 (60% 신뢰도)
- `ja-x-hist-kobun-conf-100` 또는 `ja-x-h-kobun-c-100` - 100% 신뢰도의 고전 일본어
- `x-proto-ine-conf-75` 또는 `x-a-ine-c-75` - 75% 신뢰도의 인도유럽조어

### 다중 분류

LVTag는 정확한 언어 식별을 제공하기 위해 단일 태그에서 여러 분류자를 지원합니다. 긴 형식과 짧은 형식을 모두 혼합할 수 있습니다:

```
ko-x-form-4-domain-business
ko-x-f-4-d-business
ko-x-form-4-polite-2-domain-business
ko-x-f-4-p-2-d-business
```

위의 예시는 비즈니스 맥락에서 비격식적 격식성(4)이지만 공손한 말투(2)를 가진 한국어를 보여줍니다.

## 유효한 값

**참고**: 모든 값은 BCP 47 서브태그 길이 제한을 준수하기 위해 8자 이하여야 합니다. 많은 분류자의 특정 값은 전문가 사용과 커뮤니티 합의를 통해 설정되어야 하지만, 숫자 척도, 날짜 형식 및 아래 나열된 기본 값은 이 표준에서 정의됩니다.

### 격식성 척도 (범용)

| 수준 | 설명 | 예시 |
|-------|-------------|----------|
| 1 | 가장 격식적 | 법률 문서, 공식 행사, 학술 논문 |
| 2 | 격식적 | 비즈니스 서신, 뉴스 기사, 프레젠테이션 |
| 3 | 중립적 | 표준 대화, 이메일, 일반 글쓰기 |
| 4 | 비격식적 | 캐주얼한 대화, 개인 블로그, 문자 메시지 |
| 5 | 가장 캐주얼 | 속어, 친밀한 대화, 소셜 미디어 |

### 공손함 척도 (범용)

| 수준 | 설명 | 예시 |
|-------|-------------|----------|
| 1 | 가장 공손함 | 왕실 호칭, 종교 지도자, 노인 공경 |
| 2 | 매우 공손함 | 고객 서비스, 공식 회의, 교사 |
| 3 | 공손함/중립 | 표준 상호작용, 동료 |
| 4 | 친근함 | 친구, 동료, 캐주얼한 지인 |
| 5 | 친밀함/평어 | 가까운 가족, 친밀한 파트너 |

### 전문 지식 척도 (범용)

| 수준 | 설명 |
|-------|-------------|
| 0 | 지식 없음 |
| 1-2 | 초보자 |
| 3-4 | 중급 |
| 5-6 | 고급 |
| 7-8 | 전문가 |
| 9-10 | 마스터/권위자 |

### 금기 척도 (범용)

| 수준 | 설명 |
|-------|-------------|
| 0 | 금기 콘텐츠 없음 |
| 1 | 약한 금기 |
| 2 | 가벼운 금기 |
| 3 | 보통 금기 |
| 4 | 높은 금기 |
| 5 | 극도의 금기 |

### 어휘 밀도 척도 (범용)

| 수준 | 설명 |
|-------|-------------|
| 0-20 | 매우 낮은 밀도 |
| 21-40 | 낮은 밀도 |
| 41-60 | 보통 밀도 |
| 61-80 | 높은 밀도 |
| 81-100 | 매우 높은 밀도 |

### 구문 복잡성 척도 (범용)

| 수준 | 설명 |
|-------|-------------|
| 0-20 | 매우 단순함 |
| 21-40 | 단순함 |
| 41-60 | 보통 복잡성 |
| 61-80 | 복잡함 |
| 81-100 | 매우 복잡함 |

### 도메인 값

| 값 | 설명 |
|-------|-------------|
| `legal` | 법률 용어 |
| `med` | 의학 용어 |
| `tech` | 기술/IT |
| `business` | 비즈니스/기업 |
| `fin` | 금융/은행 |
| `acad` | 학술/학문 |
| `sci` | 과학/연구 |

## 구현 예시

### 단일 분류자 (긴 형식)
```
# 가장 격식적인 한국어
ko-x-form-1

# 매우 공손한 일본어
ja-x-polite-2

# 법률 영어
en-x-domain-legal

# 경상도 한국어
ko-x-geo-gyeong

# 인도유럽조어
x-proto-ine
```

### 단일 분류자 (짧은 형식)
```
# 가장 격식적인 한국어
ko-x-f-1

# 매우 공손한 일본어
ja-x-p-2

# 법률 영어
en-x-d-legal

# 경상도 한국어
ko-x-g-gyeong

# 인도유럽조어
x-a-ine
```

### 다중 분류자
```
# 비격식적이지만 공손한 한국어 비즈니스 언어
ko-x-form-4-polite-2-domain-business
ko-x-f-4-p-2-d-business

# 격식적이고 존경하는 일본어 의학 언어
ja-x-form-1-polite-1-domain-med
ja-x-f-1-p-1-d-med

# 중립적 격식성, 공손한 말투, 기술 도메인의 남부 베트남어
vi-x-geo-southern-form-3-polite-2-domain-tech
vi-x-g-southern-f-3-p-2-d-tech

# 여러 차원을 가진 복잡한 분류
en-x-h-middle-e-poetry-m-written-f-1
ja-x-f-2-p-1-d-med-h-kobun-m-written

# 격식성/공손함 구분을 보여주는 언어 변종
ko-x-f-5-p-2  # 매우 캐주얼하지만 공손함 (나이 든 친구에게)
ko-x-f-1-p-4  # 매우 격식적이지만 친근함 (동료에게 쓴 글)
ja-x-f-4-p-1  # 캐주얼한 격식성이지만 최고의 존경
en-x-f-5-j-4  # 매우 캐주얼한 영어에 높은 금기 수준
```

## 사용 사례

1. **언어 학습 애플리케이션**
   - 다양한 사회적 맥락에 적합한 레지스터 교육
   - 도메인별 어휘 훈련 제공

2. **기계 번역**
   - 번역에서 레지스터 일관성 유지
   - 도메인별 용어 적용

3. **콘텐츠 분류**
   - 격식성과 도메인별로 텍스트 자동 분류
   - 적절한 검토자나 시스템으로 콘텐츠 라우팅

4. **말뭉치 언어학**
   - 언어 연구를 위한 태그된 말뭉치 구축
   - 레지스터와 도메인 변화 연구

## 검증 규칙

1. **서브태그 길이**: `x-` 이후의 각 서브태그는 8자 이하여야 함
2. **순서**: 분류자는 `x-` 이후 어떤 순서로든 나타날 수 있음
3. **고유성**: 각 분류자 유형은 태그당 한 번만 나타나야 함 (여러 번 나타날 수 있는 `conf` 제외)
4. **대소문자**: 태그는 소문자여야 함 (BCP 47에 따라 대소문자 구분 없음)
5. **매직 태그**: 짧은 형식 태그는 단일 문자; `q`, `3`-`9`는 향후 사용을 위해 예약됨
6. **혼합**: 긴 형식과 짧은 형식은 같은 태그 내에서 혼합 가능
7. **조어 태그**: `x-`로 시작해야 하며 가능한 경우 ISO 639-5 코드를 사용해야 함 (예: `x-proto-sla`이지 `x-proto-slavic`이 아님)
8. **신뢰도**: `conf`/`c` 분류자는 바로 앞의 분류자에 적용됨
9. **숫자 값**: 정의된 범위 내에 있어야 함 (금기는 0-5, 전문 지식은 0-10, 백분율 값은 0-100)
10. **날짜 형식**: 날짜는 구두점 없는 ISO 8601 사용 (YYYY, YYYYMM 또는 YYYYMMDD)

## 호환성

LVTag 형식은 다음과 완전히 호환됩니다:
- BCP 47 (RFC 5646)
- ISO 639 언어 코드
- IANA 언어 서브태그 레지스트리
- Unicode CLDR

## 이점

1. **정밀성**: 세밀한 언어 변종 식별 가능
2. **확장성**: 새로운 레지스터와 도메인 추가 가능
3. **표준 기반**: 확립된 BCP 47 개인 사용 메커니즘 위에 구축
4. **기계 판독 가능**: 체계적인 형식으로 자동화된 처리 가능
5. **사람이 읽을 수 있음**: 명확하고 설명적인 서브태그
6. **유연성**: 상세한 긴 형식과 간결한 짧은 형식 태그 모두 지원
7. **간결성**: 짧은 매직 태그로 명확성을 유지하면서 간결한 표현 가능

## 향후 확장

LVTag는 언어 기술 커뮤니티의 요구에 따라 발전하도록 설계되었습니다. 새로운 분류자 제안, 기존 분류자 개선, 실제 구현 피드백을 환영합니다.

확장을 제안하거나 사양에 기여하려면:
- [github.com/lvtag/spec](https://github.com/lvtag/spec)에서 이슈 열기
- 기존 제안에 대한 토론 참여
- 구현 경험 공유
- 문서 개선을 위한 풀 리퀘스트 제출

예약된 단일 문자 코드 (`q`, `3`-`9`)는 향후 표준화된 확장을 위해 사용 가능합니다.

## 참고 문헌

- [BCP 47: 언어 식별을 위한 태그](https://www.rfc-editor.org/rfc/rfc5646.html)
- [IANA 언어 서브태그 레지스트리](https://www.iana.org/assignments/language-subtag-registry/)

---

## 라이선스 및 특허 부여

이 사양은 **CC0 1.0 Universal (Public Domain Dedication)** 하에 발표됩니다.

**왜 CC0인가**: 최대한의 채택과 구현의 자유를 보장하기 위해 LVTag는 공공 도메인에 배치됩니다. 이는 다음을 의미합니다:
- 사용, 구현 또는 수정에 권한 불필요
- 저작권 표시 불필요 (감사는 하지만)
- 상업적 또는 정부 사용에 법적 장벽 없음
- 모든 소프트웨어 라이선스와 호환
- Unicode CLDR과 같은 주요 표준에서 사용

**특허 부여**: LVTag 사양을 다루는 모든 특허는 이 사양을 준수하는 모든 구현에 대해 무료로 라이선스됩니다.

**보증 없음**: LVTag 사용은 사양 작성자의 보증을 의미하지 않습니다.

법이 허용하는 범위 내에서 **Danslav Slavenskoj**는 Language Variant Tag (LVTag) 형식 사양에 대한 모든 저작권 및 관련 또는 인접 권리를 포기했습니다. 이 작품은 다음에서 발행됩니다: 미합중국.
EOF < /dev/null
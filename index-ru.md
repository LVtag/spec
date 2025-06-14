---
layout: default
title: Спецификация Language Variant Tag (LVTag)
lang: ru
description: "LVTag — это систематический подход к языковой классификации, который расширяет BCP 47 с использованием частных подтегов для точной идентификации языковых вариантов по измерениям формальности, вежливости, предметной области и орфографии."
---

<div align="center">
  <img src="/LVTAG_LOGO.png" alt="LVTag Logo" width="100">
</div>

# Спецификация LVTag

**Версия 1.0**  
**Создал Danslav Slavenskoj**  
**Дата: Май 2025**

**Языки**: [中文简体](/index-zh.md)  [中文繁體](/index-zh-hant.md)  [Čeština](/index-cs.md)  [Deutsch](/index-de.md)  [English](/index.md)  [Español](/index-es.md)  [Français](/index-fr.md)  [Hrvatski](/index-hr.md)  [日本語](/index-ja.md)  [한국어](/index-ko.md)  [Polski](/index-pl.md)  [Português](/index-pt.md)  Русский  [Српски](/index-sr.md)

## Быстрые ссылки

- [JSON схема](/lvtag-schema.json) - Полная схема валидации для формата LVTag
- [Определения классификаторов](/lvtag-classifiers.json) - Машиночитаемые спецификации классификаторов
- [Спецификация](#спецификация-формата) - Перейти к деталям формата
- [Примеры](#примеры-реализации) - Посмотреть LVTag в действии

## Обзор

Формат Language Variant Tag (LVTag) - это систематический подход к классификации языков, который расширяет стандарт BCP 47 с использованием подтегов частного использования. Он позволяет точно идентифицировать языковые варианты по нескольким измерениям, включая формальность, вежливость, область и орфографию.

### Ключевые преимущества

**Строгость классификации**: LVTag привносит систематическую организацию в языковую маркировку, предоставляя четкие, отдельные измерения для различных типов вариаций. В отличие от существующих подтегов и систем, которые смешивают разные категории на одном уровне, LVTag поддерживает строгое разделение между формальностью, вежливостью, областью и другими измерениями.

**Совместимость со стандартами**: LVTag полностью совместим с BCP 47 (RFC 5646) и бесшовно работает с:
- Реестром языковых подтегов IANA
- Языковыми кодами ISO 639
- Unicode CLDR
- Языковыми тегами W3C
- Заголовками HTTP Accept-Language
- Атрибутами lang XML
- Атрибутами lang HTML

**Технологическая интеграция**: Теги LVTag могут использоваться напрямую в:
- Конвейерах обработки естественного языка (NLP)
- Системах машинного перевода
- Системах управления контентом (CMS)
- Библиотеках определения языка
- Поисковых системах и системах поиска информации
- Веб-приложениях и API
- Рабочих процессах локализации

**Случаи использования**:
- **Целевая аудитория**: Адаптация контента для соответствующей аудитории на основе регистра и области
- **Качество перевода**: Поддержание соответствующих уровней формальности и вежливости в машинном переводе
- **Изучение языков**: Обучение учащихся соответствующему регистру для различных контекстов
- **Корпусная лингвистика**: Создание точно размеченных корпусов для исследований
- **Анализ социальных сетей**: Классификация пользовательского контента по регистру и области
- **Обслуживание клиентов**: Направление сообщений на основе формальности и области соответствующим агентам

## Обоснование

Хотя BCP 47 обеспечивает отличную поддержку для идентификации языков, письменностей и регионов, ему не хватает стандартизированных механизмов для фиксации социолингвистических вариаций внутри языка. Текущие стандарты не охватывают:

- **Вариации регистра**: Нет способа различать формальные и неформальные разновидности одного языка
- **Уровни вежливости**: Критично для языков, таких как японский, корейский и тайский, где вежливость грамматически закодирована
- **Специализированный язык**: Нет стандарта для маркировки технических, медицинских или юридических языковых разновидностей
- **Социолекты**: Нет механизма для идентификации разновидностей социальных групп (молодежный язык, профессиональный жаргон)
- **Исторические этапы**: Ограниченная поддержка различения классических форм от современных
- **Градиенты формальности**: Нет числовой шкалы для вычислительной обработки регистра
- **Праязыки**: Непоследовательное кодирование - некоторые праязыки имеют коды ISO (например, `ine` для PIE), в то время как другие нет, а коды семейств ISO 639-5 недействительны в тегах BCP 47, создавая запутанную ситуацию для исторической лингвистики
- **Орфографические вариации**: Хотя BCP 47 обрабатывает письменности, он не эффективно фиксирует вариации внутри письменностей (орфографические реформы, системы романизации, конкурирующие стандарты), которые фундаментально влияют на обработку текста, поиск и проверку орфографии

LVTag заполняет эти пробелы, используя механизм расширения частного использования BCP 47 (`-x-`), предоставляя систематический, машиночитаемый способ кодирования этих критических измерений языковой вариации при сохранении полной обратной совместимости.

### Точная языковая классификация

Появление больших языковых моделей и сложных инструментов NLP сделало точную классификацию языковых разновидностей не просто полезной, но необходимой. Современные системы должны:

- Генерировать текст, подходящий для конкретных контекстов (формальный vs. неформальный, вежливый vs. повседневный)
- Обучаться на правильно классифицированных корпусах, чтобы избежать неуместного смешения регистров
- Предоставлять культурно и контекстуально подходящие ответы
- Точно обрабатывать переключение кода и смешанный языковой контент
- Сохранять стилистическую последовательность при переводе или преобразовании текста
- Фильтровать обучающие данные на основе формальности, области или других характеристик
- Адаптировать вывод в соответствии с предпочтениями или требованиями пользователя

LVTag предоставляет детализированные метаданные, необходимые для понимания не только того, какой язык используется, но и как он используется, позволяя создавать более тонкие и подходящие конвейеры обработки языка.

## Спецификация формата

### Базовая структура

```
language-x-[classifier]-[value]-[classifier2]-[value2]...
```

Где:
- `language` - это действительный подтег основного языка BCP 47 (например, `en`, `ko`, `ja`)
- `x` указывает на начало подтегов частного использования
- `classifier` - это идентификатор категории (см. Магические теги ниже)
- `value` - это конкретная классификация в рамках этой категории

### Магические теги

LVTag поддерживает как длинные, так и короткие формы "магических" классификаторов для гибкости:

| Длинная форма | Короткая форма | Описание |
|-----------|------------|-------------|
| `ortho` | `w` | Орфографический вариант |
| `form` | `f` | Уровень формальности (шкала 1-5) |
| `polite` | `p` | Уровень вежливости/уважения (шкала 1-5) |
| `domain` | `d` | Специализированная лексика или профессиональный контекст |
| `geo` | `g` | Географическая или региональная разновидность |
| `proto` | `a` | Праязык или реконструированный язык |
| `hist` | `h` | Исторический период или этап языка |
| `genre` | `e` | Текстовый жанр или литературный стиль |
| `medium` | `m` | Средство коммуникации (устное, письменное, цифровое) |
| `socio` | `s` | Социолект или разновидность социальной группы |
| `modality` | `o` | Способ языкового производства |
| `register` | `r` | Языковой регистр |
| `pragma` | `u` | Коммуникативная функция |
| `temporal` | `t` | Временная маркировка |
| `evidence` | `v` | Источник информации |
| `affect` | `k` | Эмоциональный тон |
| `age` | `n` | Возрастная/поколенческая разновидность |
| `gender` | `i` | Гендерная разновидность |
| `expert` | `b` | Уровень экспертизы |
| `interact` | `2` | Интеракциональная структура |
| `prosody` | `y` | Просодические особенности |
| `lexical` | `l` | Лексическая плотность (0-100) |
| `syntax` | `z` | Синтаксическая сложность (0-100) |
| `start` | `0` | Дата начала (ISO 8601 без пунктуации) |
| `end` | `1` | Дата окончания (ISO 8601 без пунктуации) |
| `taboo` | `j` | Уровень табуированного/вульгарного контента (шкала 0-5) |
| `conf` | `c` | Оценка уверенности (0-100) для предыдущего тега |
| — | `q`, `3`-`9` | Зарезервировано для будущего использования |

### Классификаторы

#### 1. Орфографический классификатор (`ortho` или `w`)
Идентифицирует конкретные орфографические конвенции или варианты системы письма за пределами стандартных тегов письменности.

Формат:
- Длинный: `language-x-ortho-[variant]`
- Короткий: `language-x-w-[variant]`

Примеры (в сочетании со стандартными тегами письменности):
- `az-Latn-x-ortho-new` или `az-Latn-x-w-new` - Азербайджанский латиница, новая орфография
- `de-Latn-x-ortho-1901` или `de-Latn-x-w-1901` - Немецкий латиница, орфография 1901 года
- `zh-Hans-x-ortho-pinyin` или `zh-Hans-x-w-pinyin` - Упрощенный китайский с пиньинь
- `yi-Hebr-x-ortho-yivo` или `yi-Hebr-x-w-yivo` - Идиш еврейское письмо, орфография YIVO

#### 2. Классификатор формальности (`form` или `f`)
Идентифицирует уровень формальности языкового использования.

Формат:
- Длинный: `language-x-form-[1-5]`
- Короткий: `language-x-f-[1-5]`

Шкала формальности:
- 1 = Наиболее формальный (письменные документы, официальные речи)
- 2 = Формальный (деловые встречи, академическое письмо)
- 3 = Нейтральный/стандартный (новости, общий разговор)
- 4 = Неформальный (непринужденный разговор, электронные письма друзьям)
- 5 = Наиболее повседневный (интимный разговор, сленг)

Примеры:
- `ko-x-form-1` или `ko-x-f-1` - Наиболее формальный корейский
- `en-x-form-3` или `en-x-f-3` - Нейтральный английский
- `ja-x-form-5` или `ja-x-f-5` - Наиболее повседневный японский

#### 3. Классификатор вежливости (`polite` или `p`)
Идентифицирует уровень вежливости/уважения языкового использования.

Формат:
- Длинный: `language-x-polite-[1-5]`
- Короткий: `language-x-p-[1-5]`

Шкала вежливости:
- 1 = Наиболее уважительный/почтительный (королевское обращение, религиозные контексты)
- 2 = Очень вежливый (формальные почетные формы, уважительная речь)
- 3 = Вежливый/нейтральный (стандартная вежливость)
- 4 = Дружеский (между равными, друзьями)
- 5 = Интимный/простой (семья, очень близкие друзья)

Примеры:
- `ko-x-polite-1` или `ko-x-p-1` - Корейский с высшим уважением
- `ja-x-polite-2` или `ja-x-p-2` - Очень вежливый японский
- `th-x-polite-3` или `th-x-p-3` - Стандартно вежливый тайский

#### 4. Классификатор области (`domain` или `d`)
Идентифицирует специализированную лексику или профессиональный контекст.

Формат:
- Длинный: `language-x-domain-[domain_type]`
- Короткий: `language-x-d-[domain_type]`

Примеры:
- `en-x-domain-legal` или `en-x-d-legal` - Юридический английский
- `ja-x-domain-med` или `ja-x-d-med` - Медицинский японский
- `ko-x-domain-business` или `ko-x-d-business` - Деловой корейский
- `ja-x-domain-tech` или `ja-x-d-tech` - Технический японский
- `en-x-domain-fin` или `en-x-d-fin` - Финансовый английский

#### 5. Географический классификатор (`geo` или `g`)
Идентифицирует региональные или географические языковые разновидности.

Формат:
- Длинный: `language-x-geo-[region]`
- Короткий: `language-x-g-[region]`

Примеры:
- `ko-x-geo-gyeong` или `ko-x-g-gyeong` - Корейский из Кёнсан (경상도)
- `ko-x-geo-jeolla` или `ko-x-g-jeolla` - Корейский из Чолла (전라도)
- `es-x-geo-riopla` или `es-x-g-riopla` - Риоплатский испанский
- `pt-x-geo-nordeste` или `pt-x-g-nordeste` - Португальский северо-востока Бразилии

#### 6. Классификатор прото (`proto` или `a`)
Идентифицирует праязыки или реконструированные исторические языки.

Формат:
- Длинный: `x-proto-[iso639-5_code if available]`
- Короткий: `x-a-[iso639-5_code if available]`

Правила:
- ДОЛЖЕН использовать коды языковых семейств ISO 639-5, когда они доступны
- Использовать описательные идентификаторы только когда код ISO 639-5 не существует

Примеры с использованием кодов ISO 639-5:
- `x-proto-ine` или `x-a-ine` - Праиндоевропейский
- `x-proto-gem` или `x-a-gem` - Прагерманский
- `x-proto-sla` или `x-a-sla` - Праславянский
- `x-proto-sem` или `x-a-sem` - Прасемитский
- `x-proto-cel` или `x-a-cel` - Пракельтский
- `x-proto-ira` или `x-a-ira` - Праиранский
- `x-proto-inc` или `x-a-inc` - Праиндоарийский
- `x-proto-bat` или `x-a-bat` - Прабалтийский
- `x-proto-roa` или `x-a-roa` - Праромансский
- `x-proto-trk` или `x-a-trk` - Пратюркский

Примеры без кодов ISO 639-5 (описательные, более трех символов):
- `x-proto-baltslav` или `x-a-baltslav` - Прабалтославянский (нет кода ISO 639-5)

Примечание:
- Коды языковых семейств (ISO 639-5) НЕ являются действительными как стандартные основные языковые теги BCP 47, поэтому мы реализовали их с использованием x-proto
- Они действительны и предпочтительны в расширениях частного использования (после `x-`)
- Поэтому все теги праязыков должны начинаться с `x-` для соответствия BCP 47

#### 7. Исторический классификатор (`hist` или `h`)
Идентифицирует исторические периоды или этапы языка.

Формат:
- Длинный: `language-x-hist-[period]`
- Короткий: `language-x-h-[period]`

Примеры:
- `en-x-hist-old` или `en-x-h-old` - Древнеанглийский период
- `en-x-hist-middle` или `en-x-h-middle` - Среднеанглийский период
- `ja-x-hist-kobun` или `ja-x-h-kobun` - Классический японский (古文)
- `ko-x-hist-hunmin` или `ko-x-h-hunmin` - Среднекорейский (훈민정음 период)
- `el-x-hist-koine` или `el-x-h-koine` - Койне греческий (Κοινή)
- `sa-x-hist-vedic` или `sa-x-h-vedic` - Ведийский санскрит (वैदिक)

#### 8. Жанровый классификатор (`genre` или `e`)
Идентифицирует текстовый жанр или литературный стиль.

Формат:
- Длинный: `language-x-genre-[genre_type]`
- Короткий: `language-x-e-[genre_type]`

Примеры:
- `en-x-genre-news` или `en-x-e-news` - Новостной английский
- `ja-x-genre-manga` или `ja-x-e-manga` - Японский манга (漫画)
- `ko-x-genre-webtoon` или `ko-x-e-webtoon` - Корейский вебтун (웹툰)
- `zh-x-genre-shi` или `zh-x-e-shi` - Китайская поэзия (詩)
- `fr-x-genre-bd` или `fr-x-e-bd` - Французские комиксы (bande dessinée)
- `de-x-genre-marchen` или `de-x-e-marchen` - Немецкие сказки (Märchen)

#### 9. Классификатор средства (`medium` или `m`)
Идентифицирует средство коммуникации.

Формат:
- Длинный: `language-x-medium-[medium_type]`
- Короткий: `language-x-m-[medium_type]`

Примеры:
- `en-x-medium-spoken` или `en-x-m-spoken` - Устный английский
- `ko-x-medium-digital` или `ko-x-m-digital` - Цифровой/онлайн корейский
- `ja-x-medium-written` или `ja-x-m-written` - Письменный японский
- `hi-x-medium-bcast` или `hi-x-m-bcast` - Вещательный хинди
- `zh-x-medium-sms` или `zh-x-m-sms` - Китайский SMS/текстовые сообщения

#### 10. Социо классификатор (`socio` или `s`)
Идентифицирует социолект или разновидности социальных групп.

Формат:
- Длинный: `language-x-socio-[social_group]`
- Короткий: `language-x-s-[social_group]`

Примеры:
- `en-x-socio-academic` или `en-x-s-academic` - Академический социолект
- `en-x-socio-urban` или `en-x-s-urban` - Городской социолект
- `es-x-socio-juvenil` или `es-x-s-juvenil` - Испанский молодежный социолект (jerga juvenil)
- `fr-x-socio-jeune` или `fr-x-s-jeune` - Французский молодежный социолект
- `de-x-socio-jugend` или `de-x-s-jugend` - Немецкий молодежный социолект (Jugendsprache)
- `ko-x-socio-online` или `ko-x-s-online` - Корейский онлайн социолект

#### 11. Классификатор модальности (`modality` или `o`)
Идентифицирует фундаментальный способ языкового производства.

Формат:
- Длинный: `language-x-modality-[mode]`
- Короткий: `language-x-o-[mode]`

Примеры:
- `en-x-modality-spoken` или `en-x-o-spoken` - Устный английский
- `en-x-modality-written` или `en-x-o-written` - Письменный английский
- `asl-x-modality-signed` или `asl-x-o-signed` - Американский жестовый язык
- `en-x-modality-multi` или `en-x-o-multi` - Мультимодальный английский (речь + жесты)
- `fr-x-modality-tactile` или `fr-x-o-tactile` - Тактильный французский (для слепоглухих)

#### 12. Классификатор регистра (`register` или `r`)
Идентифицирует языковой регистр или функциональную разновидность языкового использования.

Формат:
- Длинный: `language-x-register-[register_type]`
- Короткий: `language-x-r-[register_type]`

Примеры:
- `en-x-register-frozen` или `en-x-r-frozen` - Замороженный регистр (молитвы, клятвы)
- `en-x-register-formal` или `en-x-r-formal` - Формальный регистр (академические статьи)
- `en-x-register-consult` или `en-x-r-consult` - Консультативный регистр (профессиональный)
- `en-x-register-casual` или `en-x-r-casual` - Повседневный регистр (друзья)
- `en-x-register-intimate` или `en-x-r-intimate` - Интимный регистр (семья)

#### 13. Классификатор прагматической функции (`pragma` или `u`)
Идентифицирует коммуникативную функцию или речевой акт.

Формат:
- Длинный: `language-x-pragma-[function]`
- Короткий: `language-x-u-[function]`

Примеры:
- `en-x-pragma-request` или `en-x-u-request` - Функция просьбы
- `ja-x-pragma-apology` или `ja-x-u-apology` - Функция извинения
- `es-x-pragma-complmnt` или `es-x-u-complmnt` - Функция комплимента
- `ar-x-pragma-greeting` или `ar-x-u-greeting` - Функция приветствия
- `zh-x-pragma-refusal` или `zh-x-u-refusal` - Функция отказа

#### 14. Классификатор временной маркировки (`temporal` или `t`)
Идентифицирует временные аспекты или паттерны использования времени.

Формат:
- Длинный: `language-x-temporal-[aspect]`
- Короткий: `language-x-t-[aspect]`

Примеры:
- `en-x-temporal-past` или `en-x-t-past` - Ориентированный на прошлое дискурс
- `ja-x-temporal-nonpast` или `ja-x-t-nonpast` - Фокус на непрошлое
- `id-x-temporal-atemprl` или `id-x-t-atemprl` - Вневременной/атемпоральный
- `fr-x-temporal-future` или `fr-x-t-future` - Ориентированный на будущее
- `zh-x-temporal-aspect` или `zh-x-t-aspect` - Аспектуальный фокус

#### 15. Эвиденциальный классификатор (`evidence` или `v`)
Идентифицирует маркировку источника информации.

Формат:
- Длинный: `language-x-evidence-[source]`
- Короткий: `language-x-v-[source]`

Примеры:
- `qu-x-evidence-direct` или `qu-x-v-direct` - Прямой свидетель
- `tr-x-evidence-hearsay` или `tr-x-v-hearsay` - По слухам/сообщено
- `ja-x-evidence-infer` или `ja-x-v-infer` - Инференциальный
- `en-x-evidence-assume` или `en-x-v-assume` - Предполагаемый
- `de-x-evidence-quote` или `de-x-v-quote` - Цитативный

#### 16. Классификатор аффекта/эмоции (`affect` или `k`)
Идентифицирует эмоциональный тон или аффект.

Формат:
- Длинный: `language-x-affect-[emotion]`
- Короткий: `language-x-k-[emotion]`

Примеры:
- `en-x-affect-angry` или `en-x-k-angry` - Сердитый тон
- `ja-x-affect-humble` или `ja-x-k-humble` - Смиренный аффект
- `es-x-affect-joyful` или `es-x-k-joyful` - Радостное выражение
- `ko-x-affect-sad` или `ko-x-k-sad` - Грустный/меланхоличный
- `fr-x-affect-neutral` или `fr-x-k-neutral` - Нейтральный аффект

#### 17. Классификатор возраста/поколения (`age` или `n`)
Идентифицирует возрастные или поколенческие языковые разновидности.

Формат:
- Длинный: `language-x-age-[generation]`
- Короткий: `language-x-n-[generation]`

Примеры:
- `en-x-age-child` или `en-x-n-child` - Детская речь
- `ja-x-age-teen` или `ja-x-n-teen` - Подростковый язык
- `ko-x-age-elder` или `ko-x-n-elder` - Речь пожилых
- `es-x-age-genz` или `es-x-n-genz` - Поколение Z
- `zh-x-age-millenl` или `zh-x-n-millenl` - Речь миллениалов

#### 18. Гендерный классификатор (`gender` или `i`)
Идентифицирует гендерные языковые разновидности.

Формат:
- Длинный: `language-x-gender-[identity]`
- Короткий: `language-x-i-[identity]`

#### 19. Классификатор уровня экспертизы (`expert` или `b`)
Идентифицирует уровень предметной экспертизы по шкале 0-10.

Формат:
- Длинный: `language-x-expert-[0-10]`
- Короткий: `language-x-b-[0-10]`

Шкала экспертизы:
- 0 = Нет знаний
- 1-2 = Начинающий
- 3-4 = Средний уровень
- 5-6 = Продвинутый
- 7-8 = Эксперт
- 9-10 = Мастер/Авторитет

Примеры:
- `en-x-expert-0` или `en-x-b-0` - Нет экспертизы
- `de-x-expert-3` или `de-x-b-3` - Средний уровень
- `ja-x-expert-7` или `ja-x-b-7` - Уровень эксперта
- `es-x-expert-9` или `es-x-b-9` - Уровень мастера
- `zh-x-expert-5` или `zh-x-b-5` - Продвинутый уровень

#### 20. Классификатор интеракциональной структуры (`interact` или `2`)
Идентифицирует разговорные или интеракциональные паттерны.

Формат:
- Длинный: `language-x-interact-[structure]`
- Короткий: `language-x-2-[structure]`

Примеры:
- `en-x-interact-turn` или `en-x-2-turn` - Смена очереди
- `ja-x-interact-overlap` или `ja-x-2-overlap` - Перекрывающаяся речь
- `es-x-interact-monolog` или `es-x-2-monolog` - Монологический
- `ar-x-interact-dialog` или `ar-x-2-dialog` - Диалогический
- `zh-x-interact-multi` или `zh-x-2-multi` - Многосторонний

#### 21. Классификатор просодических особенностей (`prosody` или `y`)
Идентифицирует просодические или суперсегментные особенности.

Формат:
- Длинный: `language-x-prosody-[feature]`
- Короткий: `language-x-y-[feature]`

Примеры:
- `en-x-prosody-stress` или `en-x-y-stress` - Ударный ритм
- `ja-x-prosody-pitch` или `ja-x-y-pitch` - Тональное ударение
- `fr-x-prosody-syllable` или `fr-x-y-syllable` - Слоговой ритм
- `zh-x-prosody-tone` или `zh-x-y-tone` - Тональные паттерны
- `es-x-prosody-rhythm` или `es-x-y-rhythm` - Ритмические паттерны

#### 22. Классификатор лексической плотности (`lexical` или `l`)
Идентифицирует лексическую плотность как числовое значение (0-100).

Формат:
- Длинный: `language-x-lexical-[0-100]`
- Короткий: `language-x-l-[0-100]`

Примеры:
- `en-x-lexical-20` или `en-x-l-20` - Низкая плотность (20%)
- `de-x-lexical-55` или `de-x-l-55` - Средняя плотность (55%)
- `ja-x-lexical-75` или `ja-x-l-75` - Высокая плотность (75%)
- `es-x-lexical-40` или `es-x-l-40` - Умеренная плотность (40%)
- `zh-x-lexical-85` или `zh-x-l-85` - Очень высокая плотность (85%)

#### 23. Классификатор синтаксической сложности (`syntax` или `z`)
Идентифицирует синтаксическую сложность как числовое значение (0-100).

Формат:
- Длинный: `language-x-syntax-[0-100]`
- Короткий: `language-x-z-[0-100]`

Примеры:
- `en-x-syntax-15` или `en-x-z-15` - Простой синтаксис (15%)
- `de-x-syntax-70` или `de-x-z-70` - Сложный синтаксис (70%)
- `ja-x-syntax-45` или `ja-x-z-45` - Умеренная сложность (45%)
- `es-x-syntax-30` или `es-x-z-30` - Низкая сложность (30%)
- `zh-x-syntax-60` или `zh-x-z-60` - Высокая сложность (60%)

#### 24. Классификатор даты начала (`start` или `0`)
Идентифицирует дату начала языкового использования (формат ISO 8601 без пунктуации).

Формат:
- Длинный: `language-x-start-[YYYYMMDD]`
- Короткий: `language-x-0-[YYYYMMDD]`

Форматы дат:
- Полная дата: YYYYMMDD
- Год-месяц: YYYYMM
- Только год: YYYY

Примеры:
- `en-x-start-20240315` или `en-x-0-20240315` - Английский начиная с 15 марта 2024
- `ja-x-start-19890108` или `ja-x-0-19890108` - Японский начиная с 8 января 1989
- `es-x-start-202403` или `es-x-0-202403` - Испанский начиная с марта 2024

#### 25. Классификатор даты окончания (`end` или `1`)
Идентифицирует дату окончания языкового использования (формат ISO 8601 без пунктуации).

Формат:
- Длинный: `language-x-end-[YYYYMMDD]`
- Короткий: `language-x-1-[YYYYMMDD]`

Форматы дат:
- Полная дата: YYYYMMDD
- Год-месяц: YYYYMM
- Только год: YYYY

Примеры:
- `en-x-end-20240415` или `en-x-1-20240415` - Английский заканчивающийся 15 апреля 2024
- `ja-x-end-20190430` или `ja-x-1-20190430` - Японский заканчивающийся 30 апреля 2019
- `es-x-end-202412` или `es-x-1-202412` - Испанский заканчивающийся в декабре 2024

#### 26. Классификатор табу (`taboo` или `j`)
Идентифицирует уровень табуированного, вульгарного или оскорбительного контента.

Формат:
- Длинный: `language-x-taboo-[0-5]`
- Короткий: `language-x-j-[0-5]`

Примеры:
- `en-x-taboo-0` или `en-x-j-0` - Нет табуированного контента
- `en-x-taboo-3` или `en-x-j-3` - Умеренный уровень табу
- `ja-x-form-5-taboo-4` или `ja-x-f-5-j-4` - Очень повседневный японский с высоким уровнем табу

#### 27. Классификатор уверенности (`conf` или `c`)
Указывает оценку уверенности для непосредственно предшествующего классификатора.

Формат:
- Длинный: `language-x-[classifier]-[value]-conf-[0-100]`
- Короткий: `language-x-[classifier]-[value]-c-[0-100]`

Особое поведение:
- Оценка уверенности применяется к непосредственно предшествующему классификатору
- Несколько оценок уверенности могут использоваться для разных классификаторов
- Если нет предшествующего классификатора, уверенность применяется к базовому языковому тегу

Примеры:
- `en-x-form-3-conf-95` или `en-x-f-3-c-95` - Нейтральная формальность с 95% уверенностью
- `ko-x-polite-2-conf-80-domain-med-conf-60` или `ko-x-p-2-c-80-d-med-c-60` - Очень вежливый (80% уверенности) медицинский корейский (60% уверенности)
- `ja-x-hist-kobun-conf-100` или `ja-x-h-kobun-c-100` - Классический японский со 100% уверенностью
- `x-proto-ine-conf-75` или `x-a-ine-c-75` - Праиндоевропейский с 75% уверенностью

### Множественные классификации

LVTag поддерживает несколько классификаторов в одном теге для обеспечения точной языковой идентификации. Длинные и короткие формы могут смешиваться:

```
ko-x-form-4-domain-business
ko-x-f-4-d-business
ko-x-form-4-polite-2-domain-business
ko-x-f-4-p-2-d-business
```

Приведенные выше примеры показывают корейский с неформальной формальностью (4), но вежливой речью (2) в деловом контексте.

## Допустимые значения

**Примечание**: Все значения должны быть 8 символов или меньше для соответствия ограничениям длины подтегов BCP 47. Хотя конкретные значения для многих классификаторов должны устанавливаться через экспертное использование и консенсус сообщества, числовые шкалы, форматы дат и базовые значения, перечисленные ниже, определены в этом стандарте.

### Шкала формальности (Универсальная)

| Уровень | Описание | Примеры |
|-------|-------------|----------|
| 1 | Наиболее формальный | Юридические документы, официальные церемонии, академические статьи |
| 2 | Формальный | Деловые письма, новостные статьи, презентации |
| 3 | Нейтральный | Стандартный разговор, электронная почта, общее письмо |
| 4 | Неформальный | Повседневный разговор, личные блоги, текстовые сообщения |
| 5 | Наиболее повседневный | Сленг, интимный разговор, социальные сети |

### Шкала вежливости (Универсальная)

| Уровень | Описание | Примеры |
|-------|-------------|----------|
| 1 | Наиболее уважительный | Королевское обращение, религиозные лидеры, уважение к старшим |
| 2 | Очень вежливый | Обслуживание клиентов, формальные встречи, учителя |
| 3 | Вежливый/нейтральный | Стандартные взаимодействия, коллеги |
| 4 | Дружеский | Друзья, ровесники, случайные знакомые |
| 5 | Интимный/простой | Близкая семья, интимные партнеры |

### Шкала экспертизы (Универсальная)

| Уровень | Описание |
|-------|-------------|
| 0 | Нет знаний |
| 1-2 | Начинающий |
| 3-4 | Средний уровень |
| 5-6 | Продвинутый |
| 7-8 | Эксперт |
| 9-10 | Мастер/Авторитет |

### Шкала табу (Универсальная)

| Уровень | Описание |
|-------|-------------|
| 0 | Нет табуированного контента |
| 1 | Мягкое табу |
| 2 | Легкое табу |
| 3 | Умеренное табу |
| 4 | Высокое табу |
| 5 | Экстремальное табу |

### Шкала лексической плотности (Универсальная)

| Уровень | Описание |
|-------|-------------|
| 0-20 | Очень низкая плотность |
| 21-40 | Низкая плотность |
| 41-60 | Умеренная плотность |
| 61-80 | Высокая плотность |
| 81-100 | Очень высокая плотность |

### Шкала синтаксической сложности (Универсальная)

| Уровень | Описание |
|-------|-------------|
| 0-20 | Очень простая |
| 21-40 | Простая |
| 41-60 | Умеренная сложность |
| 61-80 | Сложная |
| 81-100 | Очень сложная |

### Значения области

| Значение | Описание |
|-------|-------------|
| `legal` | Юридическая терминология |
| `med` | Медицинская терминология |
| `tech` | Техническая/ИТ |
| `business` | Бизнес/корпоративная |
| `fin` | Финансы/банковское дело |
| `acad` | Академическая/научная |
| `sci` | Научная/исследовательская |

## Примеры реализации

### Одиночный классификатор (Длинная форма)
```
# Наиболее формальный корейский
ko-x-form-1

# Очень вежливый японский
ja-x-polite-2

# Юридический английский
en-x-domain-legal

# Корейский из Кёнсан
ko-x-geo-gyeong

# Праиндоевропейский
x-proto-ine
```

### Одиночный классификатор (Короткая форма)
```
# Наиболее формальный корейский
ko-x-f-1

# Очень вежливый японский
ja-x-p-2

# Юридический английский
en-x-d-legal

# Корейский из Кёнсан
ko-x-g-gyeong

# Праиндоевропейский
x-a-ine
```

### Множественные классификаторы
```
# Неформальный но вежливый корейский деловой язык
ko-x-form-4-polite-2-domain-business
ko-x-f-4-p-2-d-business

# Формальный и уважительный японский медицинский язык
ja-x-form-1-polite-1-domain-med
ja-x-f-1-p-1-d-med

# Южный вьетнамский с нейтральной формальностью, вежливой речью, технической областью
vi-x-geo-southern-form-3-polite-2-domain-tech
vi-x-g-southern-f-3-p-2-d-tech

# Сложная классификация с несколькими измерениями
en-x-h-middle-e-poetry-m-written-f-1
ja-x-f-2-p-1-d-med-h-kobun-m-written

# Языковые разновидности, показывающие различие формальность/вежливость
ko-x-f-5-p-2  # Очень повседневный но вежливый (к старшему другу)
ko-x-f-1-p-4  # Очень формальный но дружеский (письменно к ровеснику)
ja-x-f-4-p-1  # Повседневная формальность но высшее уважение
en-x-f-5-j-4  # Очень повседневный английский с высоким уровнем табу
```

## Случаи использования

1. **Приложения для изучения языков**
   - Обучение соответствующему регистру для различных социальных контекстов
   - Предоставление тренировки словаря для конкретной области

2. **Машинный перевод**
   - Поддержание последовательности регистра в переводах
   - Применение терминологии для конкретной области

3. **Классификация контента**
   - Автоматическая категоризация текста по формальности и области
   - Направление контента соответствующим рецензентам или системам

4. **Корпусная лингвистика**
   - Создание размеченных корпусов для лингвистических исследований
   - Изучение вариаций регистра и области

## Правила валидации

1. **Длина подтега**: Каждый подтег после `x-` должен быть 8 символов или меньше
2. **Порядок**: Классификаторы могут появляться в любом порядке после `x-`
3. **Уникальность**: Каждый тип классификатора должен появляться только один раз на тег (кроме `conf`, который может появляться несколько раз)
4. **Регистр**: Теги должны быть в нижнем регистре (нечувствительны к регистру согласно BCP 47)
5. **Магические теги**: Теги короткой формы - это одиночные символы; `q`, `3`-`9` зарезервированы для будущего использования
6. **Смешивание**: Длинные и короткие формы могут смешиваться в одном теге
7. **Теги прото**: Должны начинаться с `x-` и ДОЛЖНЫ использовать коды ISO 639-5, когда доступны (например, `x-proto-sla` не `x-proto-slavic`)
8. **Уверенность**: Классификатор `conf`/`c` применяется к непосредственно предшествующему классификатору
9. **Числовые значения**: Должны быть в пределах определенных диапазонов (0-5 для табу, 0-10 для экспертизы, 0-100 для процентных значений)
10. **Формат даты**: Даты используют ISO 8601 без пунктуации (YYYY, YYYYMM или YYYYMMDD)

## Совместимость

Формат LVTag полностью совместим с:
- BCP 47 (RFC 5646)
- Языковыми кодами ISO 639
- Реестром языковых подтегов IANA
- Unicode CLDR

## Преимущества

1. **Точность**: Позволяет детальную идентификацию языковых разновидностей
2. **Расширяемость**: Могут быть добавлены новые регистры и области
3. **Основан на стандартах**: Построен на установленном механизме частного использования BCP 47
4. **Машиночитаемый**: Систематический формат позволяет автоматизированную обработку
5. **Читаемый человеком**: Ясные, описательные подтеги
6. **Гибкость**: Поддержка как подробных длинных, так и кратких коротких тегов
7. **Краткость**: Короткие магические теги позволяют компактное представление при сохранении ясности

## Будущие расширения

LVTag разработан для развития вместе с потребностями сообщества языковых технологий. Мы приветствуем предложения для новых классификаторов, улучшений существующих и отзывы от реальных реализаций.

Чтобы предложить расширения или внести вклад в спецификацию:
- Откройте issue на [github.com/lvtag/spec](https://github.com/lvtag/spec)
- Присоединитесь к обсуждению существующих предложений
- Поделитесь своим опытом реализации
- Отправьте pull requests для улучшений документации

Зарезервированные однобуквенные коды (`q`, `3`-`9`) доступны для будущих стандартизированных расширений.

## Ссылки

- [BCP 47: Теги для идентификации языков](https://www.rfc-editor.org/rfc/rfc5646.html)
- [Реестр языковых подтегов IANA](https://www.iana.org/assignments/language-subtag-registry/)

---

## Лицензия и предоставление патентов

Эта спецификация выпущена под **CC0 1.0 Universal (Public Domain Dedication)**.

**Почему CC0**: Чтобы обеспечить максимальное принятие и свободу реализации, LVTag помещен в общественное достояние. Это означает:
- Не требуется разрешение для использования, реализации или модификации
- Не требуется указание авторства (хотя это приветствуется)
- Нет правовых барьеров для коммерческого или государственного использования
- Совместим со всеми лицензиями программного обеспечения
- Используется основными стандартами, такими как Unicode CLDR

**Предоставление патентов**: Любые патенты, охватывающие спецификацию LVTag, настоящим лицензируются без лицензионных отчислений для любой реализации, соответствующей этой спецификации.

**Без одобрения**: Использование LVTag не подразумевает одобрения авторами спецификации.

В пределах, разрешенных законом, **Danslav Slavenskoj** отказался от всех авторских и смежных или соседних прав на Спецификацию формата Language Variant Tag (LVTag). Эта работа опубликована из: Соединенных Штатов Америки.
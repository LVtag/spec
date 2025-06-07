---
layout: home
title: Specyfikacja Language Variant Tag (LVTag)
---

# Specyfikacja LVTag

**Wersja 1.0**  
**Stworzony przez Danslava Slavenskoja**  
**Data: Maj 2025**

**Języki**: [中文简体](/index-zh.md) | [中文繁體](/index-zh-hant.md) | [Čeština](/index-cs.md) | [Deutsch](/index-de.md) | [English](/index.md) | [Español](/index-es.md) | [Français](/index-fr.md) | [Hrvatski](/index-hr.md) | [日本語](/index-ja.md) | [한국어](/index-ko.md) | Polski | [Português](/index-pt.md) | [Русский](/index-ru.md) | [Српски](/index-sr.md)

## Szybkie linki

- [Schemat JSON](/lvtag-schema.json) - Pełny schemat walidacji dla formatu LVTag
- [Definicje klasyfikatorów](/lvtag-classifiers.json) - Specyfikacje klasyfikatorów czytelne maszynowo
- [Specyfikacja](#specyfikacja-formatu) - Przejdź do szczegółów formatu
- [Przykłady](#przykłady-implementacji) - Zobacz LVTag w akcji

## Przegląd

Format Language Variant Tag (LVTag) to systematyczne podejście do klasyfikacji języków, które rozszerza standard BCP 47 przy użyciu podetykiet prywatnego użytku. Umożliwia precyzyjną identyfikację odmian językowych w wielu wymiarach, w tym formalności, grzeczności, domeny i ortografii.

### Kluczowe korzyści

**Rygor klasyfikacji**: LVTag wprowadza systematyczną organizację do tagowania języków, zapewniając jasne, oddzielone wymiary dla różnych typów wariacji. W przeciwieństwie do istniejących podetykiet i systemów, które mieszają różne kategorie na tym samym poziomie, LVTag utrzymuje ścisłe rozdzielenie między formalnością, grzecznością, domeną i innymi wymiarami.

**Zgodność ze standardami**: LVTag jest w pełni kompatybilny z BCP 47 (RFC 5646) i bezproblemowo współpracuje z:
- Rejestrem podetykiet języków IANA
- Kodami języków ISO 639
- Unicode CLDR
- Tagami językowymi W3C
- Nagłówkami HTTP Accept-Language
- Atrybutami lang XML
- Atrybutami lang HTML

**Integracja technologiczna**: Tagi LVTag mogą być używane bezpośrednio w:
- Potokach przetwarzania języka naturalnego (NLP)
- Systemach tłumaczenia maszynowego
- Systemach zarządzania treścią (CMS)
- Bibliotekach wykrywania języka
- Wyszukiwarkach i systemach wyszukiwania informacji
- Aplikacjach webowych i API
- Przepływach pracy lokalizacji

**Przypadki użycia**:
- **Targetowanie odbiorców**: Dopasowanie treści do odpowiednich odbiorców na podstawie rejestru i domeny
- **Jakość tłumaczenia**: Utrzymanie odpowiednich poziomów formalności i grzeczności w tłumaczeniu maszynowym
- **Nauka języków**: Nauczanie uczniów odpowiedniego rejestru dla różnych kontekstów
- **Lingwistyka korpusowa**: Budowanie precyzyjnie oznaczonych korpusów do badań
- **Analiza mediów społecznościowych**: Klasyfikowanie treści generowanych przez użytkowników według rejestru i domeny
- **Obsługa klienta**: Kierowanie wiadomości na podstawie formalności i domeny do odpowiednich agentów

## Uzasadnienie

Podczas gdy BCP 47 zapewnia doskonałe wsparcie dla identyfikacji języków, skryptów i regionów, brakuje mu znormalizowanych mechanizmów do uchwycenia wariacji socjolingwistycznej w obrębie języka. Obecne standardy nie uwzględniają:

- **Wariacji rejestru**: Brak sposobu na rozróżnienie między formalnymi i nieformalnymi odmianami tego samego języka
- **Poziomów grzeczności**: Krytyczne dla języków takich jak japoński, koreański i tajski, gdzie grzeczność jest zakodowana gramatycznie
- **Języka specyficznego dla domeny**: Brak standardu oznaczania technicznej, medycznej lub prawnej odmiany języka
- **Socjolektów**: Brak mechanizmu identyfikowania odmian grup społecznych (język młodzieżowy, żargon zawodowy)
- **Etapów historycznych**: Ograniczone wsparcie dla rozróżnienia form klasycznych od współczesnych
- **Gradientów formalności**: Brak skali numerycznej do komputerowego przetwarzania rejestru
- **Prajęzyków**: Niespójne kodowanie - niektóre prajęzyki mają kody ISO (np. `ine` dla PIE), podczas gdy inne nie, a kody rodzin ISO 639-5 nie są ważne w tagach BCP 47, tworząc mylący krajobraz dla lingwistyki historycznej
- **Wariacji ortograficznej**: Chociaż BCP 47 obsługuje skrypty, nie wychwytuje skutecznie wariacji w obrębie skryptów (reformy ortograficzne, systemy romanizacji, konkurujące standardy), które fundamentalnie wpływają na przetwarzanie tekstu, wyszukiwanie i sprawdzanie pisowni

LVTag wypełnia te luki, wykorzystując mechanizm rozszerzenia prywatnego użytku BCP 47 (`-x-`), zapewniając systematyczny, czytelny maszynowo sposób kodowania tych krytycznych wymiarów wariacji językowej przy zachowaniu pełnej kompatybilności wstecznej.

### Precyzyjna klasyfikacja językowa

Pojawienie się dużych modeli językowych i wyrafinowanych narzędzi NLP sprawiło, że precyzyjna klasyfikacja odmian językowych stała się nie tylko użyteczna, ale niezbędna. Nowoczesne systemy muszą:

- Generować tekst odpowiedni do konkretnych kontekstów (formalny vs. nieformalny, grzeczny vs. swobodny)
- Trenować na prawidłowo sklasyfikowanych korpusach, aby uniknąć niewłaściwego mieszania rejestrów
- Zapewniać kulturowo i kontekstowo odpowiednie odpowiedzi
- Dokładnie obsługiwać przełączanie kodów i mieszaną treść językową
- Zachowywać spójność stylistyczną podczas tłumaczenia lub transformacji tekstu
- Filtrować dane treningowe na podstawie formalności, domeny lub innych cech
- Dostosowywać wyjście do preferencji lub wymagań użytkownika

LVTag zapewnia szczegółowe metadane potrzebne do zrozumienia nie tylko jakiego języka się używa, ale jak się go używa, umożliwiając bardziej zniuansowane i odpowiednie potoki przetwarzania języka.

## Specyfikacja formatu

### Podstawowa struktura

```
language-x-[classifier]-[value]-[classifier2]-[value2]...
```

Gdzie:
- `language` to ważna podetykieta głównego języka BCP 47 (np. `en`, `ko`, `ja`)
- `x` wskazuje początek podetykiet prywatnego użytku
- `classifier` to identyfikator kategorii (zobacz Magiczne tagi poniżej)
- `value` to konkretna klasyfikacja w ramach tej kategorii

### Magiczne tagi

LVTag obsługuje zarówno długie, jak i krótkie "magiczne" klasyfikatory dla elastyczności:

| Forma długa | Forma krótka | Opis |
|-----------|------------|-------------|
| `ortho` | `w` | Wariant ortograficzny |
| `form` | `f` | Poziom formalności (skala 1-5) |
| `polite` | `p` | Poziom grzeczności/szacunku (skala 1-5) |
| `domain` | `d` | Specjalistyczne słownictwo lub kontekst zawodowy |
| `geo` | `g` | Odmiana geograficzna lub regionalna |
| `proto` | `a` | Prajęzyk lub język zrekonstruowany |
| `hist` | `h` | Okres historyczny lub etap języka |
| `genre` | `e` | Gatunek tekstowy lub styl literacki |
| `medium` | `m` | Medium komunikacyjne (mówione, pisane, cyfrowe) |
| `socio` | `s` | Socjolekt lub odmiana grupy społecznej |
| `modality` | `o` | Tryb produkcji językowej |
| `register` | `r` | Rejestr językowy |
| `pragma` | `u` | Funkcja komunikacyjna |
| `temporal` | `t` | Oznaczenie czasowe |
| `evidence` | `v` | Źródło informacji |
| `affect` | `k` | Ton emocjonalny |
| `age` | `n` | Odmiana wiekowa/pokoleniowa |
| `gender` | `i` | Odmiana płciowa |
| `expert` | `b` | Poziom ekspertyzy |
| `interact` | `2` | Struktura interakcyjna |
| `prosody` | `y` | Cechy prozodyczne |
| `lexical` | `l` | Gęstość leksykalna (0-100) |
| `syntax` | `z` | Złożoność składniowa (0-100) |
| `start` | `0` | Data rozpoczęcia (ISO 8601 bez interpunkcji) |
| `end` | `1` | Data zakończenia (ISO 8601 bez interpunkcji) |
| `taboo` | `j` | Poziom treści tabu/wulgarnych (skala 0-5) |
| `conf` | `c` | Wynik pewności (0-100) dla poprzedniego tagu |
| — | `q`, `3`-`9` | Zarezerwowane do przyszłego użytku |

### Klasyfikatory

#### 1. Klasyfikator ortograficzny (`ortho` lub `w`)
Identyfikuje konkretne konwencje ortograficzne lub warianty systemu pisma wykraczające poza standardowe tagi skryptów.

Format:
- Długi: `language-x-ortho-[variant]`
- Krótki: `language-x-w-[variant]`

Przykłady (w połączeniu ze standardowymi tagami skryptów):
- `az-Latn-x-ortho-new` lub `az-Latn-x-w-new` - Azerski pismo łacińskie, nowa ortografia
- `de-Latn-x-ortho-1901` lub `de-Latn-x-w-1901` - Niemiecki pismo łacińskie, ortografia z 1901 roku
- `zh-Hans-x-ortho-pinyin` lub `zh-Hans-x-w-pinyin` - Uproszczony chiński z pinyin
- `yi-Hebr-x-ortho-yivo` lub `yi-Hebr-x-w-yivo` - Jidysz pismo hebrajskie, ortografia YIVO

#### 2. Klasyfikator formalności (`form` lub `f`)
Identyfikuje poziom formalności użycia języka.

Format:
- Długi: `language-x-form-[1-5]`
- Krótki: `language-x-f-[1-5]`

Skala formalności:
- 1 = Najbardziej formalny (dokumenty pisemne, oficjalne przemówienia)
- 2 = Formalny (spotkania biznesowe, pisanie akademickie)
- 3 = Neutralny/standardowy (wiadomości, ogólna rozmowa)
- 4 = Nieformalny (swobodna rozmowa, e-maile do przyjaciół)
- 5 = Najbardziej swobodny (intymna rozmowa, slang)

Przykłady:
- `ko-x-form-1` lub `ko-x-f-1` - Najbardziej formalny koreański
- `en-x-form-3` lub `en-x-f-3` - Neutralny angielski
- `ja-x-form-5` lub `ja-x-f-5` - Najbardziej swobodny japoński

#### 3. Klasyfikator grzeczności (`polite` lub `p`)
Identyfikuje poziom grzeczności/szacunku użycia języka.

Format:
- Długi: `language-x-polite-[1-5]`
- Krótki: `language-x-p-[1-5]`

Skala grzeczności:
- 1 = Najbardziej szanujący/uniżony (zwrot królewski, konteksty religijne)
- 2 = Bardzo grzeczny (formalne honoryfikatywy, pełna szacunku mowa)
- 3 = Grzeczny/neutralny (standardowa grzeczność)
- 4 = Familiarny (między równymi, przyjaciółmi)
- 5 = Intymny/prosty (rodzina, bardzo bliscy przyjaciele)

Przykłady:
- `ko-x-polite-1` lub `ko-x-p-1` - Koreański z najwyższym szacunkiem
- `ja-x-polite-2` lub `ja-x-p-2` - Bardzo grzeczny japoński
- `th-x-polite-3` lub `th-x-p-3` - Standardowo grzeczny tajski

#### 4. Klasyfikator domeny (`domain` lub `d`)
Identyfikuje specjalistyczne słownictwo lub kontekst zawodowy.

Format:
- Długi: `language-x-domain-[domain_type]`
- Krótki: `language-x-d-[domain_type]`

Przykłady:
- `en-x-domain-legal` lub `en-x-d-legal` - Prawniczy angielski
- `ja-x-domain-med` lub `ja-x-d-med` - Medyczny japoński
- `ko-x-domain-business` lub `ko-x-d-business` - Biznesowy koreański
- `ja-x-domain-tech` lub `ja-x-d-tech` - Techniczny japoński
- `en-x-domain-fin` lub `en-x-d-fin` - Finansowy angielski

#### 5. Klasyfikator geograficzny (`geo` lub `g`)
Identyfikuje regionalne lub geograficzne odmiany językowe.

Format:
- Długi: `language-x-geo-[region]`
- Krótki: `language-x-g-[region]`

Przykłady:
- `ko-x-geo-gyeong` lub `ko-x-g-gyeong` - Koreański z Gyeongsang (경상도)
- `ko-x-geo-jeolla` lub `ko-x-g-jeolla` - Koreański z Jeolla (전라도)
- `es-x-geo-riopla` lub `es-x-g-riopla` - Hiszpański rioplatense
- `pt-x-geo-nordeste` lub `pt-x-g-nordeste` - Portugalski z północno-wschodniej Brazylii

#### 6. Klasyfikator proto (`proto` lub `a`)
Identyfikuje prajęzyki lub zrekonstruowane języki historyczne.

Format:
- Długi: `x-proto-[iso639-5_code if available]`
- Krótki: `x-a-[iso639-5_code if available]`

Zasady:
- MUSI używać kodów rodzin językowych ISO 639-5, gdy są dostępne
- Używać identyfikatorów opisowych tylko wtedy, gdy nie istnieje kod ISO 639-5

Przykłady z kodami ISO 639-5:
- `x-proto-ine` lub `x-a-ine` - Praindoeuropejski
- `x-proto-gem` lub `x-a-gem` - Pragermański
- `x-proto-sla` lub `x-a-sla` - Prasłowiański
- `x-proto-sem` lub `x-a-sem` - Prasemicki
- `x-proto-cel` lub `x-a-cel` - Praceltycki
- `x-proto-ira` lub `x-a-ira` - Prairański
- `x-proto-inc` lub `x-a-inc` - Praindoaryjski
- `x-proto-bat` lub `x-a-bat` - Prabałtycki
- `x-proto-roa` lub `x-a-roa` - Praromański
- `x-proto-trk` lub `x-a-trk` - Praturecki

Przykłady bez kodów ISO 639-5 (opisowe, więcej niż trzy znaki):
- `x-proto-baltslav` lub `x-a-baltslav` - Prabałtosłowiański (brak kodu ISO 639-5)

Uwaga:
- Kody rodzin językowych (ISO 639-5) NIE są ważne jako standardowe główne tagi językowe BCP 47, dlatego zaimplementowaliśmy je używając x-proto
- Są one ważne i preferowane w ramach rozszerzeń prywatnego użytku (po `x-`)
- Dlatego wszystkie tagi prajęzykowe muszą zaczynać się od `x-`, aby były zgodne z BCP 47

#### 7. Klasyfikator historyczny (`hist` lub `h`)
Identyfikuje okresy historyczne lub etapy języka.

Format:
- Długi: `language-x-hist-[period]`
- Krótki: `language-x-h-[period]`

Przykłady:
- `en-x-hist-old` lub `en-x-h-old` - Okres staroangielski
- `en-x-hist-middle` lub `en-x-h-middle` - Okres średnioangielski
- `ja-x-hist-kobun` lub `ja-x-h-kobun` - Klasyczny japoński (古文)
- `ko-x-hist-hunmin` lub `ko-x-h-hunmin` - Średniokoreański (훈민정음 okres)
- `el-x-hist-koine` lub `el-x-h-koine` - Greka koine (Κοινή)
- `sa-x-hist-vedic` lub `sa-x-h-vedic` - Sanskryt wedyjski (वैदिक)

#### 8. Klasyfikator gatunku (`genre` lub `e`)
Identyfikuje gatunek tekstowy lub styl literacki.

Format:
- Długi: `language-x-genre-[genre_type]`
- Krótki: `language-x-e-[genre_type]`

Przykłady:
- `en-x-genre-news` lub `en-x-e-news` - Angielski dziennikarski
- `ja-x-genre-manga` lub `ja-x-e-manga` - Japoński z mangi (漫画)
- `ko-x-genre-webtoon` lub `ko-x-e-webtoon` - Koreański webtoon (웹툰)
- `zh-x-genre-shi` lub `zh-x-e-shi` - Chińska poezja (詩)
- `fr-x-genre-bd` lub `fr-x-e-bd` - Francuski komiks (bande dessinée)
- `de-x-genre-marchen` lub `de-x-e-marchen` - Niemieckie bajki (Märchen)

#### 9. Klasyfikator medium (`medium` lub `m`)
Identyfikuje medium komunikacyjne.

Format:
- Długi: `language-x-medium-[medium_type]`
- Krótki: `language-x-m-[medium_type]`

Przykłady:
- `en-x-medium-spoken` lub `en-x-m-spoken` - Angielski mówiony
- `ko-x-medium-digital` lub `ko-x-m-digital` - Koreański cyfrowy/online
- `ja-x-medium-written` lub `ja-x-m-written` - Japoński pisany
- `hi-x-medium-bcast` lub `hi-x-m-bcast` - Hindi nadawany
- `zh-x-medium-sms` lub `zh-x-m-sms` - Chiński SMS/wiadomości tekstowe

#### 10. Klasyfikator socjo (`socio` lub `s`)
Identyfikuje socjolekt lub odmiany grup społecznych.

Format:
- Długi: `language-x-socio-[social_group]`
- Krótki: `language-x-s-[social_group]`

Przykłady:
- `en-x-socio-academic` lub `en-x-s-academic` - Socjolekt akademicki
- `en-x-socio-urban` lub `en-x-s-urban` - Socjolekt miejski
- `es-x-socio-juvenil` lub `es-x-s-juvenil` - Hiszpański socjolekt młodzieżowy (jerga juvenil)
- `fr-x-socio-jeune` lub `fr-x-s-jeune` - Francuski socjolekt młodzieżowy
- `de-x-socio-jugend` lub `de-x-s-jugend` - Niemiecki socjolekt młodzieżowy (Jugendsprache)
- `ko-x-socio-online` lub `ko-x-s-online` - Koreański socjolekt internetowy

#### 11. Klasyfikator modalności (`modality` lub `o`)
Identyfikuje podstawowy tryb produkcji językowej.

Format:
- Długi: `language-x-modality-[mode]`
- Krótki: `language-x-o-[mode]`

Przykłady:
- `en-x-modality-spoken` lub `en-x-o-spoken` - Angielski mówiony
- `en-x-modality-written` lub `en-x-o-written` - Angielski pisany
- `asl-x-modality-signed` lub `asl-x-o-signed` - Amerykański język migowy
- `en-x-modality-multi` lub `en-x-o-multi` - Angielski multimodalny (mowa + gesty)
- `fr-x-modality-tactile` lub `fr-x-o-tactile` - Francuski dotykowy (dla głuchoniewidomych)

#### 12. Klasyfikator rejestru (`register` lub `r`)
Identyfikuje rejestr językowy lub funkcjonalną odmianę użycia języka.

Format:
- Długi: `language-x-register-[register_type]`
- Krótki: `language-x-r-[register_type]`

Przykłady:
- `en-x-register-frozen` lub `en-x-r-frozen` - Rejestr zamrożony (modlitwy, przysięgi)
- `en-x-register-formal` lub `en-x-r-formal` - Rejestr formalny (prace akademickie)
- `en-x-register-consult` lub `en-x-r-consult` - Rejestr konsultacyjny (zawodowy)
- `en-x-register-casual` lub `en-x-r-casual` - Rejestr swobodny (przyjaciele)
- `en-x-register-intimate` lub `en-x-r-intimate` - Rejestr intymny (rodzina)

#### 13. Klasyfikator funkcji pragmatycznej (`pragma` lub `u`)
Identyfikuje funkcję komunikacyjną lub akt mowy.

Format:
- Długi: `language-x-pragma-[function]`
- Krótki: `language-x-u-[function]`

Przykłady:
- `en-x-pragma-request` lub `en-x-u-request` - Funkcja prośby
- `ja-x-pragma-apology` lub `ja-x-u-apology` - Funkcja przeprosin
- `es-x-pragma-complmnt` lub `es-x-u-complmnt` - Funkcja komplementu
- `ar-x-pragma-greeting` lub `ar-x-u-greeting` - Funkcja powitania
- `zh-x-pragma-refusal` lub `zh-x-u-refusal` - Funkcja odmowy

#### 14. Klasyfikator oznaczenia czasowego (`temporal` lub `t`)
Identyfikuje aspekty czasowe lub wzorce użycia czasu.

Format:
- Długi: `language-x-temporal-[aspect]`
- Krótki: `language-x-t-[aspect]`

Przykłady:
- `en-x-temporal-past` lub `en-x-t-past` - Dyskurs zorientowany na przeszłość
- `ja-x-temporal-nonpast` lub `ja-x-t-nonpast` - Fokus na nie-przeszłość
- `id-x-temporal-atemprl` lub `id-x-t-atemprl` - Ponadczasowy/atemporalny
- `fr-x-temporal-future` lub `fr-x-t-future` - Zorientowany na przyszłość
- `zh-x-temporal-aspect` lub `zh-x-t-aspect` - Fokus aspektowy

#### 15. Klasyfikator ewidencjalności (`evidence` lub `v`)
Identyfikuje oznaczenie źródła informacji.

Format:
- Długi: `language-x-evidence-[source]`
- Krótki: `language-x-v-[source]`

Przykłady:
- `qu-x-evidence-direct` lub `qu-x-v-direct` - Bezpośredni świadek
- `tr-x-evidence-hearsay` lub `tr-x-v-hearsay` - Z drugiej ręki/zgłoszone
- `ja-x-evidence-infer` lub `ja-x-v-infer` - Inferencyjny
- `en-x-evidence-assume` lub `en-x-v-assume` - Założony
- `de-x-evidence-quote` lub `de-x-v-quote` - Cytatywny

#### 16. Klasyfikator afektu/emocji (`affect` lub `k`)
Identyfikuje ton emocjonalny lub afekt.

Format:
- Długi: `language-x-affect-[emotion]`
- Krótki: `language-x-k-[emotion]`

Przykłady:
- `en-x-affect-angry` lub `en-x-k-angry` - Gniewny ton
- `ja-x-affect-humble` lub `ja-x-k-humble` - Pokorny afekt
- `es-x-affect-joyful` lub `es-x-k-joyful` - Radosny wyraz
- `ko-x-affect-sad` lub `ko-x-k-sad` - Smutny/melancholijny
- `fr-x-affect-neutral` lub `fr-x-k-neutral` - Neutralny afekt

#### 17. Klasyfikator wieku/pokolenia (`age` lub `n`)
Identyfikuje odmiany językowe związane z wiekiem lub pokoleniem.

Format:
- Długi: `language-x-age-[generation]`
- Krótki: `language-x-n-[generation]`

Przykłady:
- `en-x-age-child` lub `en-x-n-child` - Mowa dziecięca
- `ja-x-age-teen` lub `ja-x-n-teen` - Język nastolatków
- `ko-x-age-elder` lub `ko-x-n-elder` - Mowa starszych
- `es-x-age-genz` lub `es-x-n-genz` - Pokolenie Z
- `zh-x-age-millenl` lub `zh-x-n-millenl` - Mowa milenialsów

#### 18. Klasyfikator płci (`gender` lub `i`)
Identyfikuje odmiany językowe związane z płcią.

Format:
- Długi: `language-x-gender-[identity]`
- Krótki: `language-x-i-[identity]`

Przykłady:
(Przykłady usunięte)

#### 19. Klasyfikator poziomu ekspertyzy (`expert` lub `b`)
Identyfikuje poziom ekspertyzy domenowej w skali 0-10.

Format:
- Długi: `language-x-expert-[0-10]`
- Krótki: `language-x-b-[0-10]`

Skala ekspertyzy:
- 0 = Brak wiedzy
- 1-2 = Początkujący
- 3-4 = Średniozaawansowany
- 5-6 = Zaawansowany
- 7-8 = Ekspert
- 9-10 = Mistrz/Autorytet

Przykłady:
- `en-x-expert-0` lub `en-x-b-0` - Brak ekspertyzy
- `de-x-expert-3` lub `de-x-b-3` - Poziom średniozaawansowany
- `ja-x-expert-7` lub `ja-x-b-7` - Poziom eksperta
- `es-x-expert-9` lub `es-x-b-9` - Poziom mistrza
- `zh-x-expert-5` lub `zh-x-b-5` - Poziom zaawansowany

#### 20. Klasyfikator struktury interakcyjnej (`interact` lub `2`)
Identyfikuje wzorce konwersacyjne lub interakcyjne.

Format:
- Długi: `language-x-interact-[structure]`
- Krótki: `language-x-2-[structure]`

Przykłady:
- `en-x-interact-turn` lub `en-x-2-turn` - Naprzemienne wypowiedzi
- `ja-x-interact-overlap` lub `ja-x-2-overlap` - Nakładające się wypowiedzi
- `es-x-interact-monolog` lub `es-x-2-monolog` - Monologiczny
- `ar-x-interact-dialog` lub `ar-x-2-dialog` - Dialogiczny
- `zh-x-interact-multi` lub `zh-x-2-multi` - Wielostronny

#### 21. Klasyfikator cech prozodycznych (`prosody` lub `y`)
Identyfikuje cechy prozodyczne lub suprasegmentalne.

Format:
- Długi: `language-x-prosody-[feature]`
- Krótki: `language-x-y-[feature]`

Przykłady:
- `en-x-prosody-stress` lub `en-x-y-stress` - Akcent wyrazowy
- `ja-x-prosody-pitch` lub `ja-x-y-pitch` - Akcent toniczny
- `fr-x-prosody-syllable` lub `fr-x-y-syllable` - Rytm sylabiczny
- `zh-x-prosody-tone` lub `zh-x-y-tone` - Wzorce tonalne
- `es-x-prosody-rhythm` lub `es-x-y-rhythm` - Wzorce rytmiczne

#### 22. Klasyfikator gęstości leksykalnej (`lexical` lub `l`)
Identyfikuje gęstość leksykalną jako wartość numeryczną (0-100).

Format:
- Długi: `language-x-lexical-[0-100]`
- Krótki: `language-x-l-[0-100]`

Przykłady:
- `en-x-lexical-20` lub `en-x-l-20` - Niska gęstość (20%)
- `de-x-lexical-55` lub `de-x-l-55` - Średnia gęstość (55%)
- `ja-x-lexical-75` lub `ja-x-l-75` - Wysoka gęstość (75%)
- `es-x-lexical-40` lub `es-x-l-40` - Umiarkowana gęstość (40%)
- `zh-x-lexical-85` lub `zh-x-l-85` - Bardzo wysoka gęstość (85%)

#### 23. Klasyfikator złożoności składniowej (`syntax` lub `z`)
Identyfikuje złożoność składniową jako wartość numeryczną (0-100).

Format:
- Długi: `language-x-syntax-[0-100]`
- Krótki: `language-x-z-[0-100]`

Przykłady:
- `en-x-syntax-15` lub `en-x-z-15` - Prosta składnia (15%)
- `de-x-syntax-70` lub `de-x-z-70` - Złożona składnia (70%)
- `ja-x-syntax-45` lub `ja-x-z-45` - Umiarkowana złożoność (45%)
- `es-x-syntax-30` lub `es-x-z-30` - Niska złożoność (30%)
- `zh-x-syntax-60` lub `zh-x-z-60` - Wysoka złożoność (60%)

#### 24. Klasyfikator daty rozpoczęcia (`start` lub `0`)
Identyfikuje datę rozpoczęcia użycia języka (format ISO 8601 bez interpunkcji).

Format:
- Długi: `language-x-start-[YYYYMMDD]`
- Krótki: `language-x-0-[YYYYMMDD]`

Formaty dat:
- Pełna data: YYYYMMDD
- Rok-miesiąc: YYYYMM
- Tylko rok: YYYY

Przykłady:
- `en-x-start-20240315` lub `en-x-0-20240315` - Angielski zaczynający się 15 marca 2024
- `ja-x-start-19890108` lub `ja-x-0-19890108` - Japoński zaczynający się 8 stycznia 1989
- `es-x-start-202403` lub `es-x-0-202403` - Hiszpański zaczynający się w marcu 2024

#### 25. Klasyfikator daty zakończenia (`end` lub `1`)
Identyfikuje datę zakończenia użycia języka (format ISO 8601 bez interpunkcji).

Format:
- Długi: `language-x-end-[YYYYMMDD]`
- Krótki: `language-x-1-[YYYYMMDD]`

Formaty dat:
- Pełna data: YYYYMMDD
- Rok-miesiąc: YYYYMM
- Tylko rok: YYYY

Przykłady:
- `en-x-end-20240415` lub `en-x-1-20240415` - Angielski kończący się 15 kwietnia 2024
- `ja-x-end-20190430` lub `ja-x-1-20190430` - Japoński kończący się 30 kwietnia 2019
- `es-x-end-202412` lub `es-x-1-202412` - Hiszpański kończący się w grudniu 2024

#### 26. Klasyfikator tabu (`taboo` lub `j`)
Identyfikuje poziom treści tabu, wulgarnych lub obraźliwych.

Format:
- Długi: `language-x-taboo-[0-5]`
- Krótki: `language-x-j-[0-5]`

Przykłady:
- `en-x-taboo-0` lub `en-x-j-0` - Brak treści tabu
- `en-x-taboo-3` lub `en-x-j-3` - Umiarkowany poziom tabu
- `ja-x-form-5-taboo-4` lub `ja-x-f-5-j-4` - Bardzo swobodny japoński z wysokim poziomem tabu

#### 27. Klasyfikator pewności (`conf` lub `c`)
Wskazuje wynik pewności dla bezpośrednio poprzedzającego klasyfikatora.

Format:
- Długi: `language-x-[classifier]-[value]-conf-[0-100]`
- Krótki: `language-x-[classifier]-[value]-c-[0-100]`

Specjalne zachowanie:
- Wynik pewności dotyczy klasyfikatora bezpośrednio go poprzedzającego
- Wiele wyników pewności może być użytych dla różnych klasyfikatorów
- Jeśli nie ma poprzedzającego klasyfikatora, pewność dotyczy podstawowego tagu językowego

Przykłady:
- `en-x-form-3-conf-95` lub `en-x-f-3-c-95` - Neutralna formalność z 95% pewnością
- `ko-x-polite-2-conf-80-domain-med-conf-60` lub `ko-x-p-2-c-80-d-med-c-60` - Bardzo grzeczny (80% pewności) medyczny koreański (60% pewności)
- `ja-x-hist-kobun-conf-100` lub `ja-x-h-kobun-c-100` - Klasyczny japoński ze 100% pewnością
- `x-proto-ine-conf-75` lub `x-a-ine-c-75` - Praindoeuropejski z 75% pewnością

### Wielokrotne klasyfikacje

LVTag obsługuje wiele klasyfikatorów w jednym tagu, aby zapewnić precyzyjną identyfikację języka. Formy długie i krótkie mogą być mieszane:

```
ko-x-form-4-domain-business
ko-x-f-4-d-business
ko-x-form-4-polite-2-domain-business
ko-x-f-4-p-2-d-business
```

Powyższe przykłady pokazują koreański z nieformalną formalnością (4), ale grzeczną mową (2) w kontekście biznesowym.

## Prawidłowe wartości

**Uwaga**: Wszystkie wartości muszą mieć 8 znaków lub mniej, aby spełnić ograniczenia długości podetykiet BCP 47. Podczas gdy konkretne wartości dla wielu klasyfikatorów powinny być ustalone przez eksperckie użycie i konsensus społeczności, skale numeryczne, formaty dat i podstawowe wartości wymienione poniżej są zdefiniowane w tym standardzie.

### Skala formalności (Uniwersalna)

| Poziom | Opis | Przykłady |
|-------|-------------|----------|
| 1 | Najbardziej formalny | Dokumenty prawne, oficjalne ceremonie, prace akademickie |
| 2 | Formalny | Listy biznesowe, artykuły prasowe, prezentacje |
| 3 | Neutralny | Standardowa rozmowa, e-mail, ogólne pisanie |
| 4 | Nieformalny | Swobodna rozmowa, osobiste blogi, wiadomości tekstowe |
| 5 | Najbardziej swobodny | Slang, intymna rozmowa, media społecznościowe |

### Skala grzeczności (Uniwersalna)

| Poziom | Opis | Przykłady |
|-------|-------------|----------|
| 1 | Najbardziej szanujący | Zwrot królewski, przywódcy religijni, szacunek dla starszych |
| 2 | Bardzo grzeczny | Obsługa klienta, formalne spotkania, nauczyciele |
| 3 | Grzeczny/neutralny | Standardowe interakcje, koledzy |
| 4 | Familiarny | Przyjaciele, rówieśnicy, swobodni znajomi |
| 5 | Intymny/prosty | Bliska rodzina, intymni partnerzy |

### Skala ekspertyzy (Uniwersalna)

| Poziom | Opis |
|-------|-------------|
| 0 | Brak wiedzy |
| 1-2 | Początkujący |
| 3-4 | Średniozaawansowany |
| 5-6 | Zaawansowany |
| 7-8 | Ekspert |
| 9-10 | Mistrz/Autorytet |

### Skala tabu (Uniwersalna)

| Poziom | Opis |
|-------|-------------|
| 0 | Brak treści tabu |
| 1 | Łagodne tabu |
| 2 | Lekkie tabu |
| 3 | Umiarkowane tabu |
| 4 | Wysokie tabu |
| 5 | Ekstremalne tabu |

### Skala gęstości leksykalnej (Uniwersalna)

| Poziom | Opis |
|-------|-------------|
| 0-20 | Bardzo niska gęstość |
| 21-40 | Niska gęstość |
| 41-60 | Umiarkowana gęstość |
| 61-80 | Wysoka gęstość |
| 81-100 | Bardzo wysoka gęstość |

### Skala złożoności składniowej (Uniwersalna)

| Poziom | Opis |
|-------|-------------|
| 0-20 | Bardzo prosta |
| 21-40 | Prosta |
| 41-60 | Umiarkowana złożoność |
| 61-80 | Złożona |
| 81-100 | Bardzo złożona |

### Wartości domeny

| Wartość | Opis |
|-------|-------------|
| `legal` | Terminologia prawna |
| `med` | Terminologia medyczna |
| `tech` | Techniczny/IT |
| `business` | Biznes/korporacyjny |
| `fin` | Finanse/bankowość |
| `acad` | Akademicki/naukowy |
| `sci` | Nauka/badania |

## Przykłady implementacji

### Pojedynczy klasyfikator (Forma długa)
```
# Najbardziej formalny koreański
ko-x-form-1

# Bardzo grzeczny japoński
ja-x-polite-2

# Prawniczy angielski
en-x-domain-legal

# Koreański z Gyeongsang
ko-x-geo-gyeong

# Praindoeuropejski
x-proto-ine
```

### Pojedynczy klasyfikator (Forma krótka)
```
# Najbardziej formalny koreański
ko-x-f-1

# Bardzo grzeczny japoński
ja-x-p-2

# Prawniczy angielski
en-x-d-legal

# Koreański z Gyeongsang
ko-x-g-gyeong

# Praindoeuropejski
x-a-ine
```

### Wielokrotne klasyfikatory
```
# Nieformalny ale grzeczny koreański język biznesowy
ko-x-form-4-polite-2-domain-business
ko-x-f-4-p-2-d-business

# Formalny i pełen szacunku japoński język medyczny
ja-x-form-1-polite-1-domain-med
ja-x-f-1-p-1-d-med

# Południowy wietnamski z neutralną formalnością, grzeczną mową, domeną techniczną
vi-x-geo-southern-form-3-polite-2-domain-tech
vi-x-g-southern-f-3-p-2-d-tech

# Złożona klasyfikacja z wieloma wymiarami
en-x-h-middle-e-poetry-m-written-f-1
ja-x-f-2-p-1-d-med-h-kobun-m-written

# Odmiany językowe pokazujące rozróżnienie formalność/grzeczność
ko-x-f-5-p-2  # Bardzo swobodny ale grzeczny (do starszego przyjaciela)
ko-x-f-1-p-4  # Bardzo formalny ale familiarny (pisemnie do rówieśnika)
ja-x-f-4-p-1  # Swobodna formalność ale najwyższy szacunek
en-x-f-5-j-4  # Bardzo swobodny angielski z wysokim poziomem tabu
```

## Przypadki użycia

1. **Aplikacje do nauki języków**
   - Nauczanie odpowiedniego rejestru dla różnych kontekstów społecznych
   - Zapewnianie treningu słownictwa specyficznego dla domeny

2. **Tłumaczenie maszynowe**
   - Utrzymanie spójności rejestru w tłumaczeniach
   - Stosowanie terminologii specyficznej dla domeny

3. **Klasyfikacja treści**
   - Automatyczne kategoryzowanie tekstu według formalności i domeny
   - Kierowanie treści do odpowiednich recenzentów lub systemów

4. **Lingwistyka korpusowa**
   - Budowanie oznaczonych korpusów do badań językowych
   - Badanie wariacji rejestru i domeny

## Zasady walidacji

1. **Długość podetykiety**: Każda podetykieta po `x-` musi mieć 8 znaków lub mniej
2. **Kolejność**: Klasyfikatory mogą pojawiać się w dowolnej kolejności po `x-`
3. **Unikalność**: Każdy typ klasyfikatora powinien pojawiać się tylko raz na tag (z wyjątkiem `conf`, który może pojawiać się wielokrotnie)
4. **Wielkość liter**: Tagi powinny być małymi literami (bez rozróżnienia wielkości liter zgodnie z BCP 47)
5. **Magiczne tagi**: Krótkie tagi to pojedyncze znaki; `q`, `3`-`9` są zarezerwowane do przyszłego użytku
6. **Mieszanie**: Formy długie i krótkie mogą być mieszane w tym samym tagu
7. **Tagi proto**: Muszą zaczynać się od `x-` i POWINNY używać kodów ISO 639-5, gdy są dostępne (np. `x-proto-sla` nie `x-proto-slavic`)
8. **Pewność**: Klasyfikator `conf`/`c` dotyczy bezpośrednio poprzedzającego klasyfikatora
9. **Wartości numeryczne**: Muszą mieścić się w zdefiniowanych zakresach (0-5 dla tabu, 0-10 dla ekspertyzy, 0-100 dla wartości procentowych)
10. **Format daty**: Daty używają ISO 8601 bez interpunkcji (YYYY, YYYYMM lub YYYYMMDD)

## Kompatybilność

Format LVTag jest w pełni kompatybilny z:
- BCP 47 (RFC 5646)
- Kodami języków ISO 639
- Rejestrem podetykiet języków IANA
- Unicode CLDR

## Korzyści

1. **Precyzja**: Umożliwia szczegółową identyfikację odmian językowych
2. **Rozszerzalność**: Można dodawać nowe rejestry i domeny
3. **Oparty na standardach**: Zbudowany na ustanowionym mechanizmie prywatnego użytku BCP 47
4. **Czytelny maszynowo**: Systematyczny format umożliwia automatyczne przetwarzanie
5. **Czytelny dla człowieka**: Jasne, opisowe podetykiety
6. **Elastyczność**: Obsługa zarówno szczegółowych długich, jak i zwięzłych krótkich tagów
7. **Zwięzłość**: Krótkie magiczne tagi umożliwiają kompaktową reprezentację przy zachowaniu jasności

## Przyszłe rozszerzenia

LVTag jest zaprojektowany do ewoluowania wraz z potrzebami społeczności technologii językowych. Zapraszamy do zgłaszania sugestii dotyczących nowych klasyfikatorów, ulepszeń istniejących oraz opinii z rzeczywistych implementacji.

Aby zaproponować rozszerzenia lub przyczynić się do specyfikacji:
- Otwórz zgłoszenie na [github.com/lvtag/spec](https://github.com/lvtag/spec)
- Dołącz do dyskusji na temat istniejących propozycji
- Podziel się swoimi doświadczeniami z implementacji
- Wyślij pull requesty z ulepszeniami dokumentacji

Zarezerwowane jednoznakowe kody (`q`, `3`-`9`) są dostępne dla przyszłych znormalizowanych rozszerzeń.

## Referencje

- [BCP 47: Tagi do identyfikacji języków](https://www.rfc-editor.org/rfc/rfc5646.html)
- [Rejestr podetykiet języków IANA](https://www.iana.org/assignments/language-subtag-registry/)

---

## Licencja i udzielenie patentów

Ta specyfikacja jest publikowana na licencji **CC0 1.0 Universal (Przekazanie do Domeny Publicznej)**.

**Dlaczego CC0**: Aby zapewnić maksymalną adopcję i swobodę implementacji, LVTag jest umieszczony w domenie publicznej. To oznacza:
- Nie jest wymagane pozwolenie na użycie, implementację lub modyfikację
- Nie jest wymagane podanie źródła (choć jest doceniane)
- Brak barier prawnych dla użytku komercyjnego lub rządowego
- Kompatybilny ze wszystkimi licencjami oprogramowania
- Używany przez główne standardy takie jak Unicode CLDR

**Udzielenie patentów**: Wszelkie patenty obejmujące specyfikację LVTag są niniejszym licencjonowane bez opłat dla każdej implementacji zgodnej z tą specyfikacją.

**Brak poparcia**: Używanie LVTag nie oznacza poparcia ze strony autorów specyfikacji.

W zakresie dozwolonym przez prawo, **Danslav Slavenskoj** zrzekł się wszystkich praw autorskich i powiązanych lub sąsiednich praw do Specyfikacji formatu Language Variant Tag (LVTag). Ta praca jest publikowana z: Stanów Zjednoczonych Ameryki.
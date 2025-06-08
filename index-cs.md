---
layout: default
title: Specifikace jazykového variantního značkování (LVTag)
lang: cs
description: "LVTag je systematický přístup ke klasifikaci jazyků, který rozšiřuje BCP 47 pomocí soukromých podznaček pro přesnou identifikaci jazykových variant napříč dimenzemi formálnosti, zdvořilosti, domény a ortografie."
---

<div align="center">
  <img src="/LVTAG_LOGO.png" alt="LVTag Logo" width="400">
</div>

# Specifikace LVTag

**Verze 1.0**  
**Vytvořil: Danslav Slavenskoj**  
**Datum: květen 2025**

**Jazyky**: [中文简体](/index-zh.md)  [中文繁體](/index-zh-hant.md)  Čeština  [Deutsch](/index-de.md)  [English](/index.md)  [Español](/index-es.md)  [Français](/index-fr.md)  [Hrvatski](/index-hr.md)  [日本語](/index-ja.md)  [한국어](/index-ko.md)  [Polski](/index-pl.md)  [Português](/index-pt.md)  [Русский](/index-ru.md)  [Српски](/index-sr.md)

## Rychlé odkazy

- [JSON Schema](/lvtag-schema.json) - Úplné validační schéma pro formát LVTag
- [Definice klasifikátorů](/lvtag-classifiers.json) - Strojově čitelné specifikace klasifikátorů
- [Specifikace](#specifikace-formátu) - Přejít na podrobnosti formátu
- [Příklady](#příklady-implementace) - Viz LVTag v akci

## Přehled

Formát Language Variant Tag (LVTag) je systematický přístup ke klasifikaci jazyků, který rozšiřuje standard BCP 47 pomocí značek pro soukromé použití. Umožňuje přesnou identifikaci jazykových variant napříč několika dimenzemi včetně formálnosti, zdvořilosti, domény a ortografie.

### Klíčové výhody

**Rigorózní klasifikace**: LVTag přináší systematickou organizaci do jazykového značkování poskytováním jasných, oddělených dimenzí pro různé typy variací. Na rozdíl od existujících značek a systémů, které směšují různé kategorie na stejné úrovni, LVTag udržuje přísné oddělení mezi formálností, zdvořilostí, doménou a dalšími dimenzemi.

**Kompatibilita se standardy**: LVTag je plně kompatibilní s BCP 47 (RFC 5646) a bezproblémově funguje s:
- IANA Language Subtag Registry
- ISO 639 jazykové kódy
- Unicode CLDR
- W3C jazykové značky
- HTTP Accept-Language hlavičky
- XML lang atributy
- HTML lang atributy

**Technologická integrace**: LVTag značky lze přímo použít v:
- Natural Language Processing (NLP) pipeline
- Systémech strojového překladu
- Content Management Systems (CMS)
- Knihovnách pro detekci jazyků
- Vyhledávačích a systémech pro vyhledávání informací
- Webových aplikacích a API
- Lokalizačních pracovních postupech

**Případy použití**:
- **Cílení na publikum**: Přizpůsobení obsahu vhodnému publiku na základě registru a domény
- **Kvalita překladu**: Udržování vhodné úrovně formálnosti a zdvořilosti ve strojovém překladu
- **Výuka jazyků**: Učení studentů vhodnému registru pro různé kontexty
- **Korpusová lingvistika**: Vytváření přesně označených korpusů pro výzkum
- **Analýza sociálních médií**: Klasifikace uživatelsky generovaného obsahu podle registru a domény
- **Zákaznický servis**: Směrování zpráv na základě formálnosti a domény k příslušným agentům

## Zdůvodnění

Zatímco BCP 47 poskytuje vynikající podporu pro identifikaci jazyků, písem a regionů, postrádá standardizované mechanismy pro zachycení sociolingvistických variací v rámci jazyka. Současné standardy neřeší:

- **Variace registru**: Žádný způsob, jak rozlišit mezi formálními a neformálními varietami stejného jazyka
- **Úrovně zdvořilosti**: Kritické pro jazyky jako japonština, korejština a thajština, kde je zdvořilost gramaticky zakódována
- **Doménově specifický jazyk**: Žádný standard pro označování technických, lékařských nebo právních jazykových variet
- **Sociolekty**: Žádný mechanismus pro identifikaci variet sociálních skupin (jazyk mládeže, profesní žargon)
- **Historické fáze**: Omezená podpora pro rozlišování klasických od moderních forem
- **Gradienty formálnosti**: Žádná numerická škála pro výpočetní zpracování registru
- **Prajazyk**: Nekonzistentní kódování - některé prajazyk mají ISO kódy (např. `ine` pro PIE), zatímco jiné ne, a ISO 639-5 rodinné kódy nejsou platné v BCP 47 značkách, což vytváří matoucí prostředí pro historickou lingvistiku
- **Ortografické variace**: Zatímco BCP 47 zpracovává písma, efektivně nezachycuje variace v rámci písem (pravopisné reformy, romanizační systémy, konkurenční standardy), které zásadně ovlivňují zpracování textu, vyhledávání a kontrolu pravopisu

LVTag tyto mezery vyplňuje pomocí mechanismu rozšíření BCP 47 pro soukromé použití (`-x-`), poskytuje systematický, strojově čitelný způsob kódování těchto kritických dimenzí jazykové variace při zachování plné zpětné kompatibility.

### Přesná jazyková klasifikace

Příchod velkých jazykových modelů a sofistikovaných NLP nástrojů učinil přesnou klasifikaci jazykových variet nejen užitečnou, ale nezbytnou. Moderní systémy potřebují:

- Generovat text vhodný pro specifické kontexty (formální vs. neformální, zdvořilý vs. běžný)
- Trénovat na správně klasifikovaných korpusech, aby se předešlo nevhodnému míchání registrů
- Poskytovat kulturně a kontextově vhodné odpovědi
- Přesně zpracovávat přepínání kódů a smíšený jazykový obsah
- Zachovat stylistickou konzistenci při překladu nebo transformaci textu
- Filtrovat trénovací data na základě formálnosti, domény nebo jiných charakteristik
- Přizpůsobit výstup podle preferencí nebo požadavků uživatele

LVTag poskytuje granulární metadata potřebná k pochopení nejen toho, jaký jazyk se používá, ale jak se používá, což umožňuje nuancovanější a vhodnější pipeline pro zpracování jazyka.

## Specifikace formátu

### Základní struktura

```
language-x-[classifier]-[value]-[classifier2]-[value2]...
```

Kde:
- `language` je platná značka primárního jazyka BCP 47 (např. `en`, `ko`, `ja`)
- `x` označuje začátek značek pro soukromé použití
- `classifier` je identifikátor kategorie (viz Magické značky níže)
- `value` je specifická klasifikace v rámci této kategorie

### Magické značky

LVTag podporuje pro flexibilitu dlouhé i krátké "magické" klasifikátory:

| Dlouhá forma | Krátká forma | Popis |
|-----------|------------|-------------|
| `ortho` | `w` | Ortografická varianta |
| `form` | `f` | Úroveň formálnosti (stupnice 1-5) |
| `polite` | `p` | Úroveň zdvořilosti/respektu (stupnice 1-5) |
| `domain` | `d` | Specializovaná slovní zásoba nebo profesní kontext |
| `geo` | `g` | Geografická nebo regionální varianta |
| `proto` | `a` | Prajazyk nebo rekonstruovaný jazyk |
| `hist` | `h` | Historické období nebo fáze jazyka |
| `genre` | `e` | Textový žánr nebo literární styl |
| `medium` | `m` | Komunikační médium (mluvené, psané, digitální) |
| `socio` | `s` | Sociolekt nebo varianta sociální skupiny |
| `modality` | `o` | Režim jazykové produkce |
| `register` | `r` | Jazykový registr |
| `pragma` | `u` | Komunikativní funkce |
| `temporal` | `t` | Časové označení |
| `evidence` | `v` | Zdroj informací |
| `affect` | `k` | Emocionální tón |
| `age` | `n` | Věková/generační varianta |
| `gender` | `i` | Genderová varianta |
| `expert` | `b` | Úroveň odbornosti |
| `interact` | `2` | Interakční struktura |
| `prosody` | `y` | Prozodické rysy |
| `lexical` | `l` | Lexikální hustota (0-100) |
| `syntax` | `z` | Syntaktická složitost (0-100) |
| `start` | `0` | Datum zahájení (ISO 8601 bez interpunkce) |
| `end` | `1` | Datum ukončení (ISO 8601 bez interpunkce) |
| `taboo` | `j` | Úroveň tabu/vulgárního obsahu (stupnice 0-5) |
| `conf` | `c` | Skóre spolehlivosti (0-100) pro předchozí značku |
| — | `q`, `3`-`9` | Rezervováno pro budoucí použití |

### Klasifikátory

#### 1. Ortografický klasifikátor (`ortho` nebo `w`)
Identifikuje specifické ortografické konvence nebo varianty systému psaní nad rámec standardních značek písma.

Formát:
- Dlouhý: `language-x-ortho-[variant]`
- Krátký: `language-x-w-[variant]`

Příklady (kombinované se standardními značkami písma):
- `az-Latn-x-ortho-new` nebo `az-Latn-x-w-new` - Ázerbájdžánské latinské písmo, nová ortografie
- `de-Latn-x-ortho-1901` nebo `de-Latn-x-w-1901` - Německé latinské písmo, ortografie z roku 1901
- `zh-Hans-x-ortho-pinyin` nebo `zh-Hans-x-w-pinyin` - Zjednodušená čínština s pinyinem
- `yi-Hebr-x-ortho-yivo` nebo `yi-Hebr-x-w-yivo` - Jidiš hebrejské písmo, YIVO ortografie

#### 2. Klasifikátor formálnosti (`form` nebo `f`)
Identifikuje úroveň formálnosti používání jazyka.

Formát:
- Dlouhý: `language-x-form-[1-5]`
- Krátký: `language-x-f-[1-5]`

Stupnice formálnosti:
- 1 = Nejformálnější (písemné dokumenty, oficiální projevy)
- 2 = Formální (obchodní schůzky, akademické psaní)
- 3 = Neutrální/standardní (zprávy, běžná konverzace)
- 4 = Neformální (běžná konverzace, e-maily přátelům)
- 5 = Nejběžnější (intimní konverzace, slang)

Příklady:
- `ko-x-form-1` nebo `ko-x-f-1` - Nejformálnější korejština
- `en-x-form-3` nebo `en-x-f-3` - Neutrální angličtina
- `ja-x-form-5` nebo `ja-x-f-5` - Nejběžnější japonština

#### 3. Klasifikátor zdvořilosti (`polite` nebo `p`)
Identifikuje úroveň zdvořilosti/respektu používání jazyka.

Formát:
- Dlouhý: `language-x-polite-[1-5]`
- Krátký: `language-x-p-[1-5]`

Stupnice zdvořilosti:
- 1 = Nejuctivější/nejpokornější (královské oslovení, náboženské kontexty)
- 2 = Velmi zdvořilé (formální honorifika, uctivá řeč)
- 3 = Zdvořilé/neutrální (standardní zdvořilost)
- 4 = Důvěrné (mezi rovnými, přáteli)
- 5 = Intimní/prosté (rodina, velmi blízcí přátelé)

Příklady:
- `ko-x-polite-1` nebo `ko-x-p-1` - Nejvyšší respekt korejština
- `ja-x-polite-2` nebo `ja-x-p-2` - Velmi zdvořilá japonština
- `th-x-polite-3` nebo `th-x-p-3` - Standardně zdvořilá thajština

#### 4. Doménový klasifikátor (`domain` nebo `d`)
Identifikuje specializovanou slovní zásobu nebo profesní kontext.

Formát:
- Dlouhý: `language-x-domain-[domain_type]`
- Krátký: `language-x-d-[domain_type]`

Příklady:
- `en-x-domain-legal` nebo `en-x-d-legal` - Právnická angličtina
- `ja-x-domain-med` nebo `ja-x-d-med` - Lékařská japonština
- `ko-x-domain-business` nebo `ko-x-d-business` - Obchodní korejština
- `ja-x-domain-tech` nebo `ja-x-d-tech` - Technická japonština
- `en-x-domain-fin` nebo `en-x-d-fin` - Finanční angličtina

#### 5. Geografický klasifikátor (`geo` nebo `g`)
Identifikuje regionální nebo geografické jazykové variety.

Formát:
- Dlouhý: `language-x-geo-[region]`
- Krátký: `language-x-g-[region]`

Příklady:
- `ko-x-geo-gyeong` nebo `ko-x-g-gyeong` - Korejština z Kjongsangu (경상도)
- `ko-x-geo-jeolla` nebo `ko-x-g-jeolla` - Korejština z Čolly (전라도)
- `es-x-geo-riopla` nebo `es-x-g-riopla` - Rioplatská španělština
- `pt-x-geo-nordeste` nebo `pt-x-g-nordeste` - Severovýchodní brazilská portugalština

#### 6. Klasifikátor prajazyka (`proto` nebo `a`)
Identifikuje prajazyk nebo rekonstruované historické jazyky.

Formát:
- Dlouhý: `x-proto-[iso639-5_code if available]`
- Krátký: `x-a-[iso639-5_code if available]`

Pravidla:
- MUSÍ použít ISO 639-5 kódy jazykových rodin, pokud jsou k dispozici
- Použijte popisné identifikátory pouze tehdy, když neexistuje žádný ISO 639-5 kód

Příklady s použitím ISO 639-5 kódů:
- `x-proto-ine` nebo `x-a-ine` - Praindoevropština
- `x-proto-gem` nebo `x-a-gem` - Pragermánština
- `x-proto-sla` nebo `x-a-sla` - Praslovanština
- `x-proto-sem` nebo `x-a-sem` - Prasemitština
- `x-proto-cel` nebo `x-a-cel` - Prakeltština
- `x-proto-ira` nebo `x-a-ira` - Praíránština
- `x-proto-inc` nebo `x-a-inc` - Praindoárijština
- `x-proto-bat` nebo `x-a-bat` - Prabaltština
- `x-proto-roa` nebo `x-a-roa` - Prarománština
- `x-proto-trk` nebo `x-a-trk` - Praturečtina

Příklady bez ISO 639-5 kódů (popisné, delší než tři znaky):
- `x-proto-baltslav` nebo `x-a-baltslav` - Prabaltoslovanština (žádný ISO 639-5 kód)

Poznámka:
- Kódy jazykových rodin (ISO 639-5) NEJSOU platné jako standardní primární značky jazyka BCP 47, což je důvod, proč jsme je implementovali pomocí x-proto
- Jsou platné a preferované v rámci rozšíření pro soukromé použití (po `x-`)
- Proto všechny značky prajazyka musí začínat `x-` pro soulad s BCP 47

#### 7. Historický klasifikátor (`hist` nebo `h`)
Identifikuje historická období nebo fáze jazyka.

Formát:
- Dlouhý: `language-x-hist-[period]`
- Krátký: `language-x-h-[period]`

Příklady:
- `en-x-hist-old` nebo `en-x-h-old` - Období staré angličtiny
- `en-x-hist-middle` nebo `en-x-h-middle` - Období střední angličtiny
- `ja-x-hist-kobun` nebo `ja-x-h-kobun` - Klasická japonština (古文)
- `ko-x-hist-hunmin` nebo `ko-x-h-hunmin` - Středověká korejština (훈민정음 období)
- `el-x-hist-koine` nebo `el-x-h-koine` - Koiné řečtina (Κοινή)
- `sa-x-hist-vedic` nebo `sa-x-h-vedic` - Védský sanskrt (वैदिक)

#### 8. Žánrový klasifikátor (`genre` nebo `e`)
Identifikuje textový žánr nebo literární styl.

Formát:
- Dlouhý: `language-x-genre-[genre_type]`
- Krátký: `language-x-e-[genre_type]`

Příklady:
- `en-x-genre-news` nebo `en-x-e-news` - Zpravodajská angličtina
- `ja-x-genre-manga` nebo `ja-x-e-manga` - Japonština mangy (漫画)
- `ko-x-genre-webtoon` nebo `ko-x-e-webtoon` - Korejský webtoon (웹툰)
- `zh-x-genre-shi` nebo `zh-x-e-shi` - Čínská poezie (詩)
- `fr-x-genre-bd` nebo `fr-x-e-bd` - Francouzské komiksy (bande dessinée)
- `de-x-genre-marchen` nebo `de-x-e-marchen` - Německé pohádky (Märchen)

#### 9. Klasifikátor média (`medium` nebo `m`)
Identifikuje komunikační médium.

Formát:
- Dlouhý: `language-x-medium-[medium_type]`
- Krátký: `language-x-m-[medium_type]`

Příklady:
- `en-x-medium-spoken` nebo `en-x-m-spoken` - Mluvená angličtina
- `ko-x-medium-digital` nebo `ko-x-m-digital` - Digitální/online korejština
- `ja-x-medium-written` nebo `ja-x-m-written` - Psaná japonština
- `hi-x-medium-bcast` nebo `hi-x-m-bcast` - Vysílací hindština
- `zh-x-medium-sms` nebo `zh-x-m-sms` - SMS/textová zpráva čínština

#### 10. Socio klasifikátor (`socio` nebo `s`)
Identifikuje sociolekt nebo varianty sociálních skupin.

Formát:
- Dlouhý: `language-x-socio-[social_group]`
- Krátký: `language-x-s-[social_group]`

Příklady:
- `en-x-socio-academic` nebo `en-x-s-academic` - Akademický sociolekt
- `en-x-socio-urban` nebo `en-x-s-urban` - Městský sociolekt
- `es-x-socio-juvenil` nebo `es-x-s-juvenil` - Španělský mládežnický sociolekt (jerga juvenil)
- `fr-x-socio-jeune` nebo `fr-x-s-jeune` - Francouzský mládežnický sociolekt
- `de-x-socio-jugend` nebo `de-x-s-jugend` - Německý mládežnický sociolekt (Jugendsprache)
- `ko-x-socio-online` nebo `ko-x-s-online` - Korejský online sociolekt

#### 11. Klasifikátor modality (`modality` nebo `o`)
Identifikuje základní režim jazykové produkce.

Formát:
- Dlouhý: `language-x-modality-[mode]`
- Krátký: `language-x-o-[mode]`

Příklady:
- `en-x-modality-spoken` nebo `en-x-o-spoken` - Mluvená angličtina
- `en-x-modality-written` nebo `en-x-o-written` - Psaná angličtina
- `asl-x-modality-signed` nebo `asl-x-o-signed` - Americký znakový jazyk
- `en-x-modality-multi` nebo `en-x-o-multi` - Multimodální angličtina (řeč + gesta)
- `fr-x-modality-tactile` nebo `fr-x-o-tactile` - Taktilní francouzština (pro hluchoslepé)

#### 12. Klasifikátor registru (`register` nebo `r`)
Identifikuje jazykový registr nebo funkční varietu používání jazyka.

Formát:
- Dlouhý: `language-x-register-[register_type]`
- Krátký: `language-x-r-[register_type]`

Příklady:
- `en-x-register-frozen` nebo `en-x-r-frozen` - Zamrzlý registr (modlitby, sliby)
- `en-x-register-formal` nebo `en-x-r-formal` - Formální registr (akademické práce)
- `en-x-register-consult` nebo `en-x-r-consult` - Konzultativní registr (profesionální)
- `en-x-register-casual` nebo `en-x-r-casual` - Běžný registr (přátelé)
- `en-x-register-intimate` nebo `en-x-r-intimate` - Intimní registr (rodina)

#### 13. Pragmatický funkční klasifikátor (`pragma` nebo `u`)
Identifikuje komunikativní funkci nebo řečový akt.

Formát:
- Dlouhý: `language-x-pragma-[function]`
- Krátký: `language-x-u-[function]`

Příklady:
- `en-x-pragma-request` nebo `en-x-u-request` - Funkce žádosti
- `ja-x-pragma-apology` nebo `ja-x-u-apology` - Funkce omluvy
- `es-x-pragma-complmnt` nebo `es-x-u-complmnt` - Funkce komplimentu
- `ar-x-pragma-greeting` nebo `ar-x-u-greeting` - Funkce pozdravu
- `zh-x-pragma-refusal` nebo `zh-x-u-refusal` - Funkce odmítnutí

#### 14. Klasifikátor časového označení (`temporal` nebo `t`)
Identifikuje časové aspekty nebo vzorce použití času.

Formát:
- Dlouhý: `language-x-temporal-[aspect]`
- Krátký: `language-x-t-[aspect]`

Příklady:
- `en-x-temporal-past` nebo `en-x-t-past` - Diskurz orientovaný na minulost
- `ja-x-temporal-nonpast` nebo `ja-x-t-nonpast` - Zaměření na ne-minulost
- `id-x-temporal-atemprl` nebo `id-x-t-atemprl` - Bezčasový/atemporální
- `fr-x-temporal-future` nebo `fr-x-t-future` - Orientovaný na budoucnost
- `zh-x-temporal-aspect` nebo `zh-x-t-aspect` - Aspektuální zaměření

#### 15. Klasifikátor evidenciality (`evidence` nebo `v`)
Identifikuje označení zdroje informací.

Formát:
- Dlouhý: `language-x-evidence-[source]`
- Krátký: `language-x-v-[source]`

Příklady:
- `qu-x-evidence-direct` nebo `qu-x-v-direct` - Přímý svědek
- `tr-x-evidence-hearsay` nebo `tr-x-v-hearsay` - Z doslechu/hlášeno
- `ja-x-evidence-infer` nebo `ja-x-v-infer` - Inferenční
- `en-x-evidence-assume` nebo `en-x-v-assume` - Předpokládané
- `de-x-evidence-quote` nebo `de-x-v-quote` - Citační

#### 16. Afekt/Emoce klasifikátor (`affect` nebo `k`)
Identifikuje emocionální tón nebo afekt.

Formát:
- Dlouhý: `language-x-affect-[emotion]`
- Krátký: `language-x-k-[emotion]`

Příklady:
- `en-x-affect-angry` nebo `en-x-k-angry` - Rozzlobený tón
- `ja-x-affect-humble` nebo `ja-x-k-humble` - Pokorný afekt
- `es-x-affect-joyful` nebo `es-x-k-joyful` - Radostný výraz
- `ko-x-affect-sad` nebo `ko-x-k-sad` - Smutný/melancholický
- `fr-x-affect-neutral` nebo `fr-x-k-neutral` - Neutrální afekt

#### 17. Věkový/generační klasifikátor (`age` nebo `n`)
Identifikuje věkově nebo generačně související jazykové variety.

Formát:
- Dlouhý: `language-x-age-[generation]`
- Krátký: `language-x-n-[generation]`

Příklady:
- `en-x-age-child` nebo `en-x-n-child` - Dětská řeč
- `ja-x-age-teen` nebo `ja-x-n-teen` - Teenagerský jazyk
- `ko-x-age-elder` nebo `ko-x-n-elder` - Řeč starších
- `es-x-age-genz` nebo `es-x-n-genz` - Generace Z
- `zh-x-age-millenl` nebo `zh-x-n-millenl` - Mileniálská řeč

#### 18. Genderový klasifikátor (`gender` nebo `i`)
Identifikuje genderově související jazykové variety.

Formát:
- Dlouhý: `language-x-gender-[identity]`
- Krátký: `language-x-i-[identity]`

#### 19. Klasifikátor úrovně odbornosti (`expert` nebo `b`)
Identifikuje úroveň doménové odbornosti na stupnici 0-10.

Formát:
- Dlouhý: `language-x-expert-[0-10]`
- Krátký: `language-x-b-[0-10]`

Stupnice odbornosti:
- 0 = Žádné znalosti
- 1-2 = Začátečník
- 3-4 = Středně pokročilý
- 5-6 = Pokročilý
- 7-8 = Expert
- 9-10 = Mistr/Autorita

Příklady:
- `en-x-expert-0` nebo `en-x-b-0` - Žádná odbornost
- `de-x-expert-3` nebo `de-x-b-3` - Středně pokročilá úroveň
- `ja-x-expert-7` nebo `ja-x-b-7` - Expertní úroveň
- `es-x-expert-9` nebo `es-x-b-9` - Mistrovská úroveň
- `zh-x-expert-5` nebo `zh-x-b-5` - Pokročilá úroveň

#### 20. Klasifikátor interakční struktury (`interact` nebo `2`)
Identifikuje konverzační nebo interakční vzorce.

Formát:
- Dlouhý: `language-x-interact-[structure]`
- Krátký: `language-x-2-[structure]`

Příklady:
- `en-x-interact-turn` nebo `en-x-2-turn` - Střídání replik
- `ja-x-interact-overlap` nebo `ja-x-2-overlap` - Překrývající se řeč
- `es-x-interact-monolog` nebo `es-x-2-monolog` - Monologický
- `ar-x-interact-dialog` nebo `ar-x-2-dialog` - Dialogický
- `zh-x-interact-multi` nebo `zh-x-2-multi` - Víceúčastníkový

#### 21. Klasifikátor prozodických rysů (`prosody` nebo `y`)
Identifikuje prozodické nebo suprasegmentální rysy.

Formát:
- Dlouhý: `language-x-prosody-[feature]`
- Krátký: `language-x-y-[feature]`

Příklady:
- `en-x-prosody-stress` nebo `en-x-y-stress` - Přízvukově časovaný
- `ja-x-prosody-pitch` nebo `ja-x-y-pitch` - Výškový přízvuk
- `fr-x-prosody-syllable` nebo `fr-x-y-syllable` - Slabikově časovaný
- `zh-x-prosody-tone` nebo `zh-x-y-tone` - Tónové vzorce
- `es-x-prosody-rhythm` nebo `es-x-y-rhythm` - Rytmické vzorce

#### 22. Klasifikátor lexikální hustoty (`lexical` nebo `l`)
Identifikuje lexikální hustotu jako číselnou hodnotu (0-100).

Formát:
- Dlouhý: `language-x-lexical-[0-100]`
- Krátký: `language-x-l-[0-100]`

Příklady:
- `en-x-lexical-20` nebo `en-x-l-20` - Nízká hustota (20%)
- `de-x-lexical-55` nebo `de-x-l-55` - Střední hustota (55%)
- `ja-x-lexical-75` nebo `ja-x-l-75` - Vysoká hustota (75%)
- `es-x-lexical-40` nebo `es-x-l-40` - Mírná hustota (40%)
- `zh-x-lexical-85` nebo `zh-x-l-85` - Velmi vysoká hustota (85%)

#### 23. Klasifikátor syntaktické složitosti (`syntax` nebo `z`)
Identifikuje syntaktickou složitost jako číselnou hodnotu (0-100).

Formát:
- Dlouhý: `language-x-syntax-[0-100]`
- Krátký: `language-x-z-[0-100]`

Příklady:
- `en-x-syntax-15` nebo `en-x-z-15` - Jednoduchá syntax (15%)
- `de-x-syntax-70` nebo `de-x-z-70` - Složitá syntax (70%)
- `ja-x-syntax-45` nebo `ja-x-z-45` - Střední složitost (45%)
- `es-x-syntax-30` nebo `es-x-z-30` - Nízká složitost (30%)
- `zh-x-syntax-60` nebo `zh-x-z-60` - Vysoká složitost (60%)

#### 24. Klasifikátor data zahájení (`start` nebo `0`)
Identifikuje datum zahájení používání jazyka (formát ISO 8601 bez interpunkce).

Formát:
- Dlouhý: `language-x-start-[YYYYMMDD]`
- Krátký: `language-x-0-[YYYYMMDD]`

Formáty data:
- Úplné datum: YYYYMMDD
- Rok-měsíc: YYYYMM
- Pouze rok: YYYY

Příklady:
- `en-x-start-20240315` nebo `en-x-0-20240315` - Angličtina začínající 15. března 2024
- `ja-x-start-19890108` nebo `ja-x-0-19890108` - Japonština začínající 8. ledna 1989
- `es-x-start-202403` nebo `es-x-0-202403` - Španělština začínající v březnu 2024

#### 25. Klasifikátor data ukončení (`end` nebo `1`)
Identifikuje datum ukončení používání jazyka (formát ISO 8601 bez interpunkce).

Formát:
- Dlouhý: `language-x-end-[YYYYMMDD]`
- Krátký: `language-x-1-[YYYYMMDD]`

Formáty data:
- Úplné datum: YYYYMMDD
- Rok-měsíc: YYYYMM
- Pouze rok: YYYY

Příklady:
- `en-x-end-20240415` nebo `en-x-1-20240415` - Angličtina končící 15. dubna 2024
- `ja-x-end-20190430` nebo `ja-x-1-20190430` - Japonština končící 30. dubna 2019
- `es-x-end-202412` nebo `es-x-1-202412` - Španělština končící v prosinci 2024

#### 26. Klasifikátor tabu (`taboo` nebo `j`)
Identifikuje úroveň tabu, vulgárního nebo urážlivého obsahu.

Formát:
- Dlouhý: `language-x-taboo-[0-5]`
- Krátký: `language-x-j-[0-5]`

Příklady:
- `en-x-taboo-0` nebo `en-x-j-0` - Žádný tabu obsah
- `en-x-taboo-3` nebo `en-x-j-3` - Střední úroveň tabu
- `ja-x-form-5-taboo-4` nebo `ja-x-f-5-j-4` - Velmi běžná japonština s vysokou úrovní tabu

#### 27. Klasifikátor spolehlivosti (`conf` nebo `c`)
Označuje skóre spolehlivosti pro bezprostředně předcházející klasifikátor.

Formát:
- Dlouhý: `language-x-[classifier]-[value]-conf-[0-100]`
- Krátký: `language-x-[classifier]-[value]-c-[0-100]`

Speciální chování:
- Skóre spolehlivosti se vztahuje na klasifikátor bezprostředně před ním
- Pro různé klasifikátory lze použít více skóre spolehlivosti
- Pokud žádný klasifikátor nepředchází, spolehlivost se vztahuje na základní jazykovou značku

Příklady:
- `en-x-form-3-conf-95` nebo `en-x-f-3-c-95` - Neutrální formálnost s 95% spolehlivostí
- `ko-x-polite-2-conf-80-domain-med-conf-60` nebo `ko-x-p-2-c-80-d-med-c-60` - Velmi zdvořilá (80% spolehlivost) lékařská korejština (60% spolehlivost)
- `ja-x-hist-kobun-conf-100` nebo `ja-x-h-kobun-c-100` - Klasická japonština se 100% spolehlivostí
- `x-proto-ine-conf-75` nebo `x-a-ine-c-75` - Praindoevropština se 75% spolehlivostí

### Vícenásobné klasifikace

LVTag podporuje více klasifikátorů v jedné značce pro poskytnutí přesné identifikace jazyka. Dlouhé a krátké formy lze kombinovat:

```
ko-x-form-4-domain-business
ko-x-f-4-d-business
ko-x-form-4-polite-2-domain-business
ko-x-f-4-p-2-d-business
```

Výše uvedené příklady ukazují korejštinu s neformální formálností (4), ale zdvořilou řečí (2) v obchodním kontextu.

## Platné hodnoty

**Poznámka**: Všechny hodnoty musí mít 8 znaků nebo méně, aby splňovaly omezení délky podznačky BCP 47. Zatímco specifické hodnoty pro mnoho klasifikátorů mají být stanoveny prostřednictvím odborného použití a konsensu komunity, numerické stupnice, formáty dat a základní hodnoty uvedené níže jsou definovány v tomto standardu.

### Stupnice formálnosti (Univerzální)

| Úroveň | Popis | Příklady |
|-------|-------------|----------|
| 1 | Nejformálnější | Právní dokumenty, oficiální ceremonie, akademické práce |
| 2 | Formální | Obchodní dopisy, zpravodajské články, prezentace |
| 3 | Neutrální | Standardní konverzace, e-mail, obecné psaní |
| 4 | Neformální | Běžná konverzace, osobní blogy, textové zprávy |
| 5 | Nejběžnější | Slang, intimní konverzace, sociální média |

### Stupnice zdvořilosti (Univerzální)

| Úroveň | Popis | Příklady |
|-------|-------------|----------|
| 1 | Nejuctivější | Královské oslovení, náboženští vůdci, respekt k starším |
| 2 | Velmi zdvořilé | Zákaznický servis, formální schůzky, učitelé |
| 3 | Zdvořilé/neutrální | Standardní interakce, kolegové |
| 4 | Důvěrné | Přátelé, vrstevníci, běžní známí |
| 5 | Intimní/prosté | Blízká rodina, intimní partneři |

### Stupnice odbornosti (Univerzální)

| Úroveň | Popis |
|-------|-------------|
| 0 | Žádné znalosti |
| 1-2 | Začátečník |
| 3-4 | Středně pokročilý |
| 5-6 | Pokročilý |
| 7-8 | Expert |
| 9-10 | Mistr/Autorita |

### Stupnice tabu (Univerzální)

| Úroveň | Popis |
|-------|-------------|
| 0 | Žádný tabu obsah |
| 1 | Mírné tabu |
| 2 | Lehké tabu |
| 3 | Střední tabu |
| 4 | Vysoké tabu |
| 5 | Extrémní tabu |

### Stupnice lexikální hustoty (Univerzální)

| Úroveň | Popis |
|-------|-------------|
| 0-20 | Velmi nízká hustota |
| 21-40 | Nízká hustota |
| 41-60 | Střední hustota |
| 61-80 | Vysoká hustota |
| 81-100 | Velmi vysoká hustota |

### Stupnice syntaktické složitosti (Univerzální)

| Úroveň | Popis |
|-------|-------------|
| 0-20 | Velmi jednoduchá |
| 21-40 | Jednoduchá |
| 41-60 | Střední složitost |
| 61-80 | Složitá |
| 81-100 | Velmi složitá |

### Doménové hodnoty

| Hodnota | Popis |
|-------|-------------|
| `legal` | Právní terminologie |
| `med` | Lékařská terminologie |
| `tech` | Technická/IT |
| `business` | Obchodní/firemní |
| `fin` | Finance/bankovnictví |
| `acad` | Akademická/vědecká |
| `sci` | Vědecká/výzkumná |

## Příklady implementace

### Jeden klasifikátor (Dlouhá forma)
```
# Nejformálnější korejština
ko-x-form-1

# Velmi zdvořilá japonština
ja-x-polite-2

# Právnická angličtina
en-x-domain-legal

# Korejština z Kjongsangu
ko-x-geo-gyeong

# Praindoevropština
x-proto-ine
```

### Jeden klasifikátor (Krátká forma)
```
# Nejformálnější korejština
ko-x-f-1

# Velmi zdvořilá japonština
ja-x-p-2

# Právnická angličtina
en-x-d-legal

# Korejština z Kjongsangu
ko-x-g-gyeong

# Praindoevropština
x-a-ine
```

### Vícenásobné klasifikátory
```
# Neformální, ale zdvořilý korejský obchodní jazyk
ko-x-form-4-polite-2-domain-business
ko-x-f-4-p-2-d-business

# Formální a uctivý japonský lékařský jazyk
ja-x-form-1-polite-1-domain-med
ja-x-f-1-p-1-d-med

# Jižní vietnamština s neutrální formálností, zdvořilou řečí, technickou doménou
vi-x-geo-southern-form-3-polite-2-domain-tech
vi-x-g-southern-f-3-p-2-d-tech

# Složitá klasifikace s více dimenzemi
en-x-h-middle-e-poetry-m-written-f-1
ja-x-f-2-p-1-d-med-h-kobun-m-written

# Jazykové variety ukazující rozdíl mezi formálností a zdvořilostí
ko-x-f-5-p-2  # Velmi běžná, ale zdvořilá (ke staršímu příteli)
ko-x-f-1-p-4  # Velmi formální, ale důvěrná (psaná vrstevníkovi)
ja-x-f-4-p-1  # Běžná formálnost, ale nejvyšší respekt
en-x-f-5-j-4  # Velmi běžná angličtina s vysokou úrovní tabu
```

## Případy použití

1. **Aplikace pro výuku jazyků**
   - Učit vhodný registr pro různé sociální kontexty
   - Poskytovat doménově specifické slovní zásoby

2. **Strojový překlad**
   - Udržovat konzistenci registru v překladech
   - Aplikovat doménově specifickou terminologii

3. **Klasifikace obsahu**
   - Automaticky kategorizovat text podle formálnosti a domény
   - Směrovat obsah k příslušným recenzentům nebo systémům

4. **Korpusová lingvistika**
   - Vytvářet označené korpusy pro lingvistický výzkum
   - Studovat variace registru a domény

## Validační pravidla

1. **Délka podznačky**: Každá podznačka po `x-` musí mít 8 znaků nebo méně
2. **Pořadí**: Klasifikátory se mohou objevit v libovolném pořadí po `x-`
3. **Jedinečnost**: Každý typ klasifikátoru by se měl objevit pouze jednou na značku (kromě `conf`, který se může objevit vícekrát)
4. **Velikost písmen**: Značky by měly být malými písmeny (podle BCP 47 nezáleží na velikosti písmen)
5. **Magické značky**: Krátké formy značek jsou jednoznakové; `q`, `3`-`9` jsou rezervovány pro budoucí použití
6. **Míchání**: Dlouhé a krátké formy lze kombinovat v rámci stejné značky
7. **Proto značky**: Musí začínat `x-` a MĚLY BY používat ISO 639-5 kódy, pokud jsou k dispozici (např. `x-proto-sla`, ne `x-proto-slavic`)
8. **Spolehlivost**: Klasifikátor `conf`/`c` se vztahuje na bezprostředně předcházející klasifikátor
9. **Číselné hodnoty**: Musí být v definovaných rozmezích (0-5 pro tabu, 0-10 pro odbornost, 0-100 pro procentuální hodnoty)
10. **Formát data**: Data používají ISO 8601 bez interpunkce (YYYY, YYYYMM nebo YYYYMMDD)

## Kompatibilita

Formát LVTag je plně kompatibilní s:
- BCP 47 (RFC 5646)
- ISO 639 jazykové kódy
- IANA Language Subtag Registry
- Unicode CLDR

## Výhody

1. **Přesnost**: Umožňuje jemnozrnnou identifikaci jazykových variet
2. **Rozšiřitelnost**: Lze přidat nové registry a domény
3. **Založeno na standardech**: Postaveno na zavedeném mechanismu BCP 47 pro soukromé použití
4. **Strojově čitelné**: Systematický formát umožňuje automatizované zpracování
5. **Lidsky čitelné**: Jasné, popisné podznačky
6. **Flexibilita**: Podpora pro podrobné dlouhé a stručné krátké formy značek
7. **Stručnost**: Krátké magické značky umožňují kompaktní reprezentaci při zachování jasnosti

## Budoucí rozšíření

LVTag je navržen tak, aby se vyvíjel s potřebami komunity jazykových technologií. Vítáme návrhy na nové klasifikátory, vylepšení stávajících a zpětnou vazbu z reálných implementací.

Chcete-li navrhnout rozšíření nebo přispět ke specifikaci:
- Otevřete problém na [github.com/lvtag/spec](https://github.com/lvtag/spec)
- Připojte se k diskusi o existujících návrzích
- Sdílejte své implementační zkušenosti
- Odešlete pull requesty pro vylepšení dokumentace

Rezervované jednoznakové kódy (`q`, `3`-`9`) jsou k dispozici pro budoucí standardizovaná rozšíření.

## Reference

- [BCP 47: Značky pro identifikaci jazyků](https://www.rfc-editor.org/rfc/rfc5646.html)
- [IANA Language Subtag Registry](https://www.iana.org/assignments/language-subtag-registry/)

---

## Licence a patentové udělení

Tato specifikace je vydána pod **CC0 1.0 Universal (Public Domain Dedication)**.

**Proč CC0**: Pro zajištění maximálního přijetí a svobody implementace je LVTag umístěn do veřejné domény. To znamená:
- Není potřeba žádné povolení k použití, implementaci nebo úpravě
- Není vyžadováno žádné uvedení autora (ačkoli je oceňováno)
- Žádné právní překážky pro komerční nebo vládní použití
- Kompatibilní se všemi softwarovými licencemi
- Používáno hlavními standardy jako Unicode CLDR

**Patentové udělení**: Jakékoli patenty pokrývající specifikaci LVTag jsou tímto licencovány bez licenčních poplatků pro jakoukoli implementaci, která vyhovuje této specifikaci.

**Žádné schválení**: Použití LVTag neznamená schválení autory specifikace.

V rozsahu povoleném zákonem se **Danslav Slavenskoj** vzdal všech autorských práv a souvisejících nebo sousedních práv ke specifikaci formátu Language Variant Tag (LVTag). Toto dílo je publikováno z: Spojené státy americké.
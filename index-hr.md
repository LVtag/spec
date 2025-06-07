---
layout: default
title: Specifikacija Language Variant Tag (LVTag)
lang: hr
description: "LVTag je sustavan pristup jezičnoj klasifikaciji koji proširuje BCP 47 korištenjem privatnih podoznaka za preciznu identifikaciju jezičnih varijanti kroz dimenzije formalnosti, pristojnosti, domene i ortografije."
---

# LVTag specifikacija

**Verzija 1.0**  
**Stvorio: Danslav Slavenskoj**  
**Datum: Svibanj 2025**

**Jezici**: [中文简体](/index-zh.md) | [中文繁體](/index-zh-hant.md) | [Čeština](/index-cs.md) | [Deutsch](/index-de.md) | [English](/index.md) | [Español](/index-es.md) | [Français](/index-fr.md) | Hrvatski | [日本語](/index-ja.md) | [한국어](/index-ko.md) | [Polski](/index-pl.md) | [Português](/index-pt.md) | [Русский](/index-ru.md) | [Српски](/index-sr.md)

## Brze poveznice

- [JSON Schema](/lvtag-schema.json) - Potpuna validacijska shema za LVTag format
- [Definicije klasifikatora](/lvtag-classifiers.json) - Strojno čitljive specifikacije klasifikatora
- [Specifikacija](#specifikacija-formata) - Skok na detalje formata
- [Primjeri](#primjeri-implementacije) - Pogledajte LVTag u akciji

## Pregled

Language Variant Tag (LVTag) format je sustavni pristup klasifikaciji jezika koji proširuje BCP 47 standard korištenjem privatnih podoznaka. Omogućuje preciznu identifikaciju jezičnih varijanti kroz više dimenzija uključujući formalnost, pristojnost, domenu i ortografiju.

### Ključne prednosti

**Rigoroznost klasifikacije**: LVTag donosi sustavnu organizaciju u označavanje jezika pružajući jasne, odvojene dimenzije za različite tipove varijacija. Za razliku od postojećih podoznaka i sustava koji miješaju različite kategorije na istoj razini, LVTag održava striktno odvajanje između formalnosti, pristojnosti, domene i drugih dimenzija.

**Kompatibilnost sa standardima**: LVTag je potpuno kompatibilan s BCP 47 (RFC 5646) i besprijekorno funkcionira s:
- IANA Language Subtag Registry
- ISO 639 jezični kodovi
- Unicode CLDR
- W3C jezične oznake
- HTTP Accept-Language zaglavlja
- XML lang atributi
- HTML lang atributi

**Tehnološka integracija**: LVTag oznake mogu se izravno koristiti u:
- Natural Language Processing (NLP) cjevovodima
- Sustavima strojnog prevođenja
- Content Management sustavima (CMS)
- Bibliotekama za detekciju jezika
- Tražilicama i sustavima za pronalaženje informacija
- Web aplikacijama i API-jima
- Lokalizacijskim tijekovima rada

**Slučajevi uporabe**:
- **Ciljanje publike**: Prilagođavanje sadržaja odgovarajućoj publici na temelju registra i domene
- **Kvaliteta prijevoda**: Održavanje odgovarajućih razina formalnosti i pristojnosti u strojnom prijevodu
- **Učenje jezika**: Učenje učenika odgovarajućem registru za različite kontekste
- **Korpusna lingvistika**: Izgradnja precizno označenih korpusa za istraživanje
- **Analiza društvenih medija**: Klasificiranje korisničkog sadržaja prema registru i domeni
- **Korisnička služba**: Usmjeravanje poruka na temelju formalnosti i domene odgovarajućim agentima

## Obrazloženje

Dok BCP 47 pruža izvrsnu podršku za identifikaciju jezika, pisama i regija, nedostaju mu standardizirani mehanizmi za hvatanje sociolingvističkih varijacija unutar jezika. Trenutni standardi ne adresiraju:

- **Varijacije registra**: Nema načina razlikovanja između formalnih i neformalnih varijanti istog jezika
- **Razine pristojnosti**: Kritično za jezike poput japanskog, korejskog i tajlandskog gdje je pristojnost gramatički kodirana
- **Domenski specifičan jezik**: Nema standarda za označavanje tehničkih, medicinskih ili pravnih jezičnih varijanti
- **Socijalekti**: Nema mehanizma za identifikaciju varijanti društvenih grupa (jezik mladih, profesionalni žargon)
- **Povijesne faze**: Ograničena podrška za razlikovanje klasičnih od modernih oblika
- **Gradijenti formalnosti**: Nema numeričke skale za računalnu obradu registra
- **Prajezici**: Nekonzistentno kodiranje - neki prajezici imaju ISO kodove (npr. `ine` za PIE) dok drugi nemaju, a ISO 639-5 obiteljski kodovi nisu valjani u BCP 47 oznakama, stvarajući zbunjujući krajolik za povijesnu lingvistiku
- **Ortografske varijacije**: Dok BCP 47 rukuje pismima, ne hvata učinkovito varijacije unutar pisama (pravopisne reforme, romanizacijski sustavi, konkurentski standardi) koje fundamentalno utječu na obradu teksta, pretraživanje i provjeru pravopisa

LVTag ispunjava ove praznine koristeći BCP 47 mehanizam privatne uporabe (`-x-`), pružajući sustavni, strojno čitljiv način kodiranja ovih kritičnih dimenzija jezične varijacije uz održavanje potpune povratne kompatibilnosti.

### Precizna jezična klasifikacija

Pojava velikih jezičnih modela i sofisticiranih NLP alata učinila je preciznu klasifikaciju jezičnih varijanti ne samo korisnom već i nužnom. Moderni sustavi trebaju:

- Generirati tekst prikladan za specifične kontekste (formalni vs. neformalni, pristojan vs. ležeran)
- Trenirati na ispravno klasificiranim korpusima kako bi izbjegli neprimjereno miješanje registara
- Pružati kulturno i kontekstualno prikladne odgovore
- Točno rukovati prebacivanjem koda i miješanim jezičnim sadržajem
- Sačuvati stilističku dosljednost pri prevođenju ili transformaciji teksta
- Filtrirati podatke za treniranje na temelju formalnosti, domene ili drugih karakteristika
- Prilagoditi izlaz prema preferencijama ili zahtjevima korisnika

LVTag pruža granularne metapodatke potrebne za razumijevanje ne samo koji se jezik koristi, već kako se koristi, omogućujući nijansiranije i prikladnije cjevovode za obradu jezika.

## Specifikacija formata

### Osnovna struktura

```
language-x-[classifier]-[value]-[classifier2]-[value2]...
```

Gdje:
- `language` je valjana BCP 47 primarna jezična podoznaka (npr. `en`, `ko`, `ja`)
- `x` označava početak podoznaka privatne uporabe
- `classifier` je identifikator kategorije (vidi Čarobne oznake ispod)
- `value` je specifična klasifikacija unutar te kategorije

### Čarobne oznake

LVTag podržava i dugačke i kratke "čarobne" klasifikatore za fleksibilnost:

| Dugački oblik | Kratki oblik | Opis |
|-----------|------------|-------------|
| `ortho` | `w` | Ortografska varijanta |
| `form` | `f` | Razina formalnosti (skala 1-5) |
| `polite` | `p` | Razina pristojnosti/poštovanja (skala 1-5) |
| `domain` | `d` | Specijalizirani vokabular ili profesionalni kontekst |
| `geo` | `g` | Geografska ili regionalna varijanta |
| `proto` | `a` | Prajezik ili rekonstruirani jezik |
| `hist` | `h` | Povijesno razdoblje ili faza jezika |
| `genre` | `e` | Tekstualni žanr ili književni stil |
| `medium` | `m` | Komunikacijski medij (govoren, pisan, digitalni) |
| `socio` | `s` | Sociolekt ili varijanta društvene grupe |
| `modality` | `o` | Način jezične produkcije |
| `register` | `r` | Jezični registar |
| `pragma` | `u` | Komunikacijska funkcija |
| `temporal` | `t` | Vremenska oznaka |
| `evidence` | `v` | Izvor informacija |
| `affect` | `k` | Emocionalni ton |
| `age` | `n` | Dobna/generacijska varijanta |
| `gender` | `i` | Rodna varijanta |
| `expert` | `b` | Razina stručnosti |
| `interact` | `2` | Interakcijska struktura |
| `prosody` | `y` | Prozodijska obilježja |
| `lexical` | `l` | Leksička gustoća (0-100) |
| `syntax` | `z` | Sintaktička složenost (0-100) |
| `start` | `0` | Datum početka (ISO 8601 bez interpunkcije) |
| `end` | `1` | Datum kraja (ISO 8601 bez interpunkcije) |
| `taboo` | `j` | Razina tabu/vulgarnog sadržaja (skala 0-5) |
| `conf` | `c` | Ocjena pouzdanosti (0-100) za prethodnu oznaku |
| — | `q`, `3`-`9` | Rezervirano za buduću uporabu |

### Klasifikatori

#### 1. Ortografski klasifikator (`ortho` ili `w`)
Identificira specifične ortografske konvencije ili varijante pisanja izvan standardnih oznaka pisma.

Format:
- Dugački: `language-x-ortho-[variant]`
- Kratki: `language-x-w-[variant]`

Primjeri (kombinirani sa standardnim oznakama pisma):
- `az-Latn-x-ortho-new` ili `az-Latn-x-w-new` - Azerbajdžanski latinski, nova ortografija
- `de-Latn-x-ortho-1901` ili `de-Latn-x-w-1901` - Njemački latinski, ortografija iz 1901
- `zh-Hans-x-ortho-pinyin` ili `zh-Hans-x-w-pinyin` - Pojednostavljeni kineski s pinyin
- `yi-Hebr-x-ortho-yivo` ili `yi-Hebr-x-w-yivo` - Jidiš hebrejski, YIVO ortografija

#### 2. Klasifikator formalnosti (`form` ili `f`)
Identificira razinu formalnosti uporabe jezika.

Format:
- Dugački: `language-x-form-[1-5]`
- Kratki: `language-x-f-[1-5]`

Skala formalnosti:
- 1 = Najformalniji (pisani dokumenti, službeni govori)
- 2 = Formalan (poslovni sastanci, akademsko pisanje)
- 3 = Neutralan/standardan (vijesti, opći razgovor)
- 4 = Neformalan (ležeran razgovor, e-mailovi prijateljima)
- 5 = Najležerniji (intimni razgovor, sleng)

Primjeri:
- `ko-x-form-1` ili `ko-x-f-1` - Najformalniji korejski
- `en-x-form-3` ili `en-x-f-3` - Neutralni engleski
- `ja-x-form-5` ili `ja-x-f-5` - Najležerniji japanski

#### 3. Klasifikator pristojnosti (`polite` ili `p`)
Identificira razinu pristojnosti/poštovanja uporabe jezika.

Format:
- Dugački: `language-x-polite-[1-5]`
- Kratki: `language-x-p-[1-5]`

Skala pristojnosti:
- 1 = Najpristojniji/najponorniji (kraljevsko obraćanje, vjerski konteksti)
- 2 = Vrlo pristojan (formalne časti, pun poštovanja govor)
- 3 = Pristojan/neutralan (standardna pristojnost)
- 4 = Familijarno (među jednakima, prijateljima)
- 5 = Intimno/jednostavno (obitelj, vrlo bliski prijatelji)

Primjeri:
- `ko-x-polite-1` ili `ko-x-p-1` - Korejski s najvišim poštovanjem
- `ja-x-polite-2` ili `ja-x-p-2` - Vrlo pristojni japanski
- `th-x-polite-3` ili `th-x-p-3` - Standardno pristojni tajlandski

#### 4. Domenski klasifikator (`domain` ili `d`)
Identificira specijalizirani vokabular ili profesionalni kontekst.

Format:
- Dugački: `language-x-domain-[domain_type]`
- Kratki: `language-x-d-[domain_type]`

Primjeri:
- `en-x-domain-legal` ili `en-x-d-legal` - Pravni engleski
- `ja-x-domain-med` ili `ja-x-d-med` - Medicinski japanski
- `ko-x-domain-business` ili `ko-x-d-business` - Poslovni korejski
- `ja-x-domain-tech` ili `ja-x-d-tech` - Tehnički japanski
- `en-x-domain-fin` ili `en-x-d-fin` - Financijski engleski

#### 5. Geografski klasifikator (`geo` ili `g`)
Identificira regionalne ili geografske jezične varijante.

Format:
- Dugački: `language-x-geo-[region]`
- Kratki: `language-x-g-[region]`

Primjeri:
- `ko-x-geo-gyeong` ili `ko-x-g-gyeong` - Gyeongsang korejski (경상도)
- `ko-x-geo-jeolla` ili `ko-x-g-jeolla` - Jeolla korejski (전라도)
- `es-x-geo-riopla` ili `es-x-g-riopla` - Rioplatense španjolski
- `pt-x-geo-nordeste` ili `pt-x-g-nordeste` - Sjeveroistočni brazilski portugalski

#### 6. Proto klasifikator (`proto` ili `a`)
Identificira prajezike ili rekonstruirane povijesne jezike.

Format:
- Dugački: `x-proto-[iso639-5_code if available]`
- Kratki: `x-a-[iso639-5_code if available]`

Pravila:
- MORA koristiti ISO 639-5 kodove jezičnih obitelji kada su dostupni
- Koristiti opisne identifikatore samo kada ne postoji ISO 639-5 kod

Primjeri s ISO 639-5 kodovima:
- `x-proto-ine` ili `x-a-ine` - Praindoeuropski
- `x-proto-gem` ili `x-a-gem` - Pragermanski
- `x-proto-sla` ili `x-a-sla` - Praslavenski
- `x-proto-sem` ili `x-a-sem` - Prasemitski
- `x-proto-cel` ili `x-a-cel` - Prakeltski
- `x-proto-ira` ili `x-a-ira` - Prairanski
- `x-proto-inc` ili `x-a-inc` - Praindoarijski
- `x-proto-bat` ili `x-a-bat` - Prabaltički
- `x-proto-roa` ili `x-a-roa` - Praromanski
- `x-proto-trk` ili `x-a-trk` - Praturski

Primjeri bez ISO 639-5 kodova (opisni, duži od tri znaka):
- `x-proto-baltslav` ili `x-a-baltslav` - Prabaltoslavenski (nema ISO 639-5 kod)

Napomena:
- Kodovi jezičnih obitelji (ISO 639-5) NISU valjani kao standardne primarne BCP 47 jezične oznake što je razlog zašto smo ih implementirali koristeći x-proto
- Oni su valjani i preferirani unutar privatnih proširenja (nakon `x-`)
- Stoga sve proto-jezične oznake moraju počinjati s `x-` kako bi bile u skladu s BCP 47

#### 7. Povijesni klasifikator (`hist` ili `h`)
Identificira povijesna razdoblja ili faze jezika.

Format:
- Dugački: `language-x-hist-[period]`
- Kratki: `language-x-h-[period]`

Primjeri:
- `en-x-hist-old` ili `en-x-h-old` - Staroengleski period
- `en-x-hist-middle` ili `en-x-h-middle` - Srednjoengleski period
- `ja-x-hist-kobun` ili `ja-x-h-kobun` - Klasični japanski (古文)
- `ko-x-hist-hunmin` ili `ko-x-h-hunmin` - Srednjokorejski (훈민정음 period)
- `el-x-hist-koine` ili `el-x-h-koine` - Koine grčki (Κοινή)
- `sa-x-hist-vedic` ili `sa-x-h-vedic` - Vedski sanskrt (वैदिक)

#### 8. Žanrovski klasifikator (`genre` ili `e`)
Identificira tekstualni žanr ili književni stil.

Format:
- Dugački: `language-x-genre-[genre_type]`
- Kratki: `language-x-e-[genre_type]`

Primjeri:
- `en-x-genre-news` ili `en-x-e-news` - Novinski engleski
- `ja-x-genre-manga` ili `ja-x-e-manga` - Manga japanski (漫画)
- `ko-x-genre-webtoon` ili `ko-x-e-webtoon` - Korejski webtoon (웹툰)
- `zh-x-genre-shi` ili `zh-x-e-shi` - Kineska poezija (詩)
- `fr-x-genre-bd` ili `fr-x-e-bd` - Francuski stripovi (bande dessinée)
- `de-x-genre-marchen` ili `de-x-e-marchen` - Njemačke bajke (Märchen)

#### 9. Medijski klasifikator (`medium` ili `m`)
Identificira komunikacijski medij.

Format:
- Dugački: `language-x-medium-[medium_type]`
- Kratki: `language-x-m-[medium_type]`

Primjeri:
- `en-x-medium-spoken` ili `en-x-m-spoken` - Govoreni engleski
- `ko-x-medium-digital` ili `ko-x-m-digital` - Digitalni/online korejski
- `ja-x-medium-written` ili `ja-x-m-written` - Pisani japanski
- `hi-x-medium-bcast` ili `hi-x-m-bcast` - Emitovani hindi
- `zh-x-medium-sms` ili `zh-x-m-sms` - SMS/tekstualne poruke kineski

#### 10. Socio klasifikator (`socio` ili `s`)
Identificira socijalekt ili varijante društvenih grupa.

Format:
- Dugački: `language-x-socio-[social_group]`
- Kratki: `language-x-s-[social_group]`

Primjeri:
- `en-x-socio-academic` ili `en-x-s-academic` - Akademski socijalekt
- `en-x-socio-urban` ili `en-x-s-urban` - Urbani socijalekt
- `es-x-socio-juvenil` ili `es-x-s-juvenil` - Španjolski omladinski socijalekt (jerga juvenil)
- `fr-x-socio-jeune` ili `fr-x-s-jeune` - Francuski omladinski socijalekt
- `de-x-socio-jugend` ili `de-x-s-jugend` - Njemački omladinski socijalekt (Jugendsprache)
- `ko-x-socio-online` ili `ko-x-s-online` - Korejski online socijalekt

#### 11. Modalitetski klasifikator (`modality` ili `o`)
Identificira temeljni način jezične produkcije.

Format:
- Dugački: `language-x-modality-[mode]`
- Kratki: `language-x-o-[mode]`

Primjeri:
- `en-x-modality-spoken` ili `en-x-o-spoken` - Govoreni engleski
- `en-x-modality-written` ili `en-x-o-written` - Pisani engleski
- `asl-x-modality-signed` ili `asl-x-o-signed` - Američki znakovni jezik
- `en-x-modality-multi` ili `en-x-o-multi` - Multimodalni engleski (govor + geste)
- `fr-x-modality-tactile` ili `fr-x-o-tactile` - Taktilni francuski (za gluhoslijepe)

#### 12. Registarski klasifikator (`register` ili `r`)
Identificira jezični registar ili funkcionalnu varijantu uporabe jezika.

Format:
- Dugački: `language-x-register-[register_type]`
- Kratki: `language-x-r-[register_type]`

Primjeri:
- `en-x-register-frozen` ili `en-x-r-frozen` - Zamrznuti registar (molitve, zavjeti)
- `en-x-register-formal` ili `en-x-r-formal` - Formalni registar (akademski radovi)
- `en-x-register-consult` ili `en-x-r-consult` - Konzultativni registar (profesionalni)
- `en-x-register-casual` ili `en-x-r-casual` - Ležerni registar (prijatelji)
- `en-x-register-intimate` ili `en-x-r-intimate` - Intimni registar (obitelj)

#### 13. Pragmatički funkcijski klasifikator (`pragma` ili `u`)
Identificira komunikacijsku funkciju ili govorni čin.

Format:
- Dugački: `language-x-pragma-[function]`
- Kratki: `language-x-u-[function]`

Primjeri:
- `en-x-pragma-request` ili `en-x-u-request` - Funkcija zahtjeva
- `ja-x-pragma-apology` ili `ja-x-u-apology` - Funkcija isprike
- `es-x-pragma-complmnt` ili `es-x-u-complmnt` - Funkcija komplimenta
- `ar-x-pragma-greeting` ili `ar-x-u-greeting` - Funkcija pozdrava
- `zh-x-pragma-refusal` ili `zh-x-u-refusal` - Funkcija odbijanja

#### 14. Vremenski klasifikator označavanja (`temporal` ili `t`)
Identificira vremenske aspekte ili obrasce uporabe vremena.

Format:
- Dugački: `language-x-temporal-[aspect]`
- Kratki: `language-x-t-[aspect]`

Primjeri:
- `en-x-temporal-past` ili `en-x-t-past` - Diskurs orijentiran na prošlost
- `ja-x-temporal-nonpast` ili `ja-x-t-nonpast` - Fokus na ne-prošlost
- `id-x-temporal-atemprl` ili `id-x-t-atemprl` - Bezvremenski/atemporalni
- `fr-x-temporal-future` ili `fr-x-t-future` - Orijentiran na budućnost
- `zh-x-temporal-aspect` ili `zh-x-t-aspect` - Aspektualni fokus

#### 15. Evidencijalni klasifikator (`evidence` ili `v`)
Identificira označavanje izvora informacija.

Format:
- Dugački: `language-x-evidence-[source]`
- Kratki: `language-x-v-[source]`

Primjeri:
- `qu-x-evidence-direct` ili `qu-x-v-direct` - Izravni svjedok
- `tr-x-evidence-hearsay` ili `tr-x-v-hearsay` - Glasine/izvješteno
- `ja-x-evidence-infer` ili `ja-x-v-infer` - Inferencijalno
- `en-x-evidence-assume` ili `en-x-v-assume` - Pretpostavljeno
- `de-x-evidence-quote` ili `de-x-v-quote` - Citativ

#### 16. Afekt/emocija klasifikator (`affect` ili `k`)
Identificira emocionalni ton ili afekt.

Format:
- Dugački: `language-x-affect-[emotion]`
- Kratki: `language-x-k-[emotion]`

Primjeri:
- `en-x-affect-angry` ili `en-x-k-angry` - Ljutiti ton
- `ja-x-affect-humble` ili `ja-x-k-humble` - Skromni afekt
- `es-x-affect-joyful` ili `es-x-k-joyful` - Radosni izraz
- `ko-x-affect-sad` ili `ko-x-k-sad` - Tužan/melankoličan
- `fr-x-affect-neutral` ili `fr-x-k-neutral` - Neutralni afekt

#### 17. Dobni/generacijski klasifikator (`age` ili `n`)
Identificira dobno ili generacijski povezane jezične varijante.

Format:
- Dugački: `language-x-age-[generation]`
- Kratki: `language-x-n-[generation]`

Primjeri:
- `en-x-age-child` ili `en-x-n-child` - Dječji govor
- `ja-x-age-teen` ili `ja-x-n-teen` - Tinejdžerski jezik
- `ko-x-age-elder` ili `ko-x-n-elder` - Govor starijih
- `es-x-age-genz` ili `es-x-n-genz` - Generacija Z
- `zh-x-age-millenl` ili `zh-x-n-millenl` - Milenijalski govor

#### 18. Rodni klasifikator (`gender` ili `i`)
Identificira rodno povezane jezične varijante.

Format:
- Dugački: `language-x-gender-[identity]`
- Kratki: `language-x-i-[identity]`

Primjeri:
(Primjeri uklonjeni)

#### 19. Klasifikator razine stručnosti (`expert` ili `b`)
Identificira razinu domenske stručnosti na skali 0-10.

Format:
- Dugački: `language-x-expert-[0-10]`
- Kratki: `language-x-b-[0-10]`

Skala stručnosti:
- 0 = Bez znanja
- 1-2 = Početnik
- 3-4 = Srednja razina
- 5-6 = Napredna razina
- 7-8 = Stručnjak
- 9-10 = Majstor/Autoritet

Primjeri:
- `en-x-expert-0` ili `en-x-b-0` - Bez stručnosti
- `de-x-expert-3` ili `de-x-b-3` - Srednja razina
- `ja-x-expert-7` ili `ja-x-b-7` - Stručna razina
- `es-x-expert-9` ili `es-x-b-9` - Majstorska razina
- `zh-x-expert-5` ili `zh-x-b-5` - Napredna razina

#### 20. Interakcijski strukturni klasifikator (`interact` ili `2`)
Identificira konverzacijske ili interakcijske obrasce.

Format:
- Dugački: `language-x-interact-[structure]`
- Kratki: `language-x-2-[structure]`

Primjeri:
- `en-x-interact-turn` ili `en-x-2-turn` - Izmjena redoslijeda
- `ja-x-interact-overlap` ili `ja-x-2-overlap` - Preklapajući govor
- `es-x-interact-monolog` ili `es-x-2-monolog` - Monološki
- `ar-x-interact-dialog` ili `ar-x-2-dialog` - Dijaloški
- `zh-x-interact-multi` ili `zh-x-2-multi` - Višestranački

#### 21. Prozodijski klasifikator obilježja (`prosody` ili `y`)
Identificira prozodijska ili suprasegmentalna obilježja.

Format:
- Dugački: `language-x-prosody-[feature]`
- Kratki: `language-x-y-[feature]`

Primjeri:
- `en-x-prosody-stress` ili `en-x-y-stress` - Vremenski naglasak
- `ja-x-prosody-pitch` ili `ja-x-y-pitch` - Tonski naglasak
- `fr-x-prosody-syllable` ili `fr-x-y-syllable` - Slogovno tempiranje
- `zh-x-prosody-tone` ili `zh-x-y-tone` - Tonski obrasci
- `es-x-prosody-rhythm` ili `es-x-y-rhythm` - Ritmički obrasci

#### 22. Leksički gustoća klasifikator (`lexical` ili `l`)
Identificira leksičku gustoću kao numeričku vrijednost (0-100).

Format:
- Dugački: `language-x-lexical-[0-100]`
- Kratki: `language-x-l-[0-100]`

Primjeri:
- `en-x-lexical-20` ili `en-x-l-20` - Niska gustoća (20%)
- `de-x-lexical-55` ili `de-x-l-55` - Srednja gustoća (55%)
- `ja-x-lexical-75` ili `ja-x-l-75` - Visoka gustoća (75%)
- `es-x-lexical-40` ili `es-x-l-40` - Umjerena gustoća (40%)
- `zh-x-lexical-85` ili `zh-x-l-85` - Vrlo visoka gustoća (85%)

#### 23. Sintaktička složenost klasifikator (`syntax` ili `z`)
Identificira sintaktičku složenost kao numeričku vrijednost (0-100).

Format:
- Dugački: `language-x-syntax-[0-100]`
- Kratki: `language-x-z-[0-100]`

Primjeri:
- `en-x-syntax-15` ili `en-x-z-15` - Jednostavna sintaksa (15%)
- `de-x-syntax-70` ili `de-x-z-70` - Složena sintaksa (70%)
- `ja-x-syntax-45` ili `ja-x-z-45` - Umjerena složenost (45%)
- `es-x-syntax-30` ili `es-x-z-30` - Niska složenost (30%)
- `zh-x-syntax-60` ili `zh-x-z-60` - Visoka složenost (60%)

#### 24. Klasifikator datuma početka (`start` ili `0`)
Identificira datum početka uporabe jezika (ISO 8601 format bez interpunkcije).

Format:
- Dugački: `language-x-start-[YYYYMMDD]`
- Kratki: `language-x-0-[YYYYMMDD]`

Formati datuma:
- Potpuni datum: YYYYMMDD
- Godina-mjesec: YYYYMM
- Samo godina: YYYY

Primjeri:
- `en-x-start-20240315` ili `en-x-0-20240315` - Engleski koji počinje 15. ožujka 2024
- `ja-x-start-19890108` ili `ja-x-0-19890108` - Japanski koji počinje 8. siječnja 1989
- `es-x-start-202403` ili `es-x-0-202403` - Španjolski koji počinje u ožujku 2024

#### 25. Klasifikator datuma kraja (`end` ili `1`)
Identificira datum kraja uporabe jezika (ISO 8601 format bez interpunkcije).

Format:
- Dugački: `language-x-end-[YYYYMMDD]`
- Kratki: `language-x-1-[YYYYMMDD]`

Formati datuma:
- Potpuni datum: YYYYMMDD
- Godina-mjesec: YYYYMM
- Samo godina: YYYY

Primjeri:
- `en-x-end-20240415` ili `en-x-1-20240415` - Engleski koji završava 15. travnja 2024
- `ja-x-end-20190430` ili `ja-x-1-20190430` - Japanski koji završava 30. travnja 2019
- `es-x-end-202412` ili `es-x-1-202412` - Španjolski koji završava u prosincu 2024

#### 26. Tabu klasifikator (`taboo` ili `j`)
Identificira razinu tabu, vulgarnog ili uvredljivog sadržaja.

Format:
- Dugački: `language-x-taboo-[0-5]`
- Kratki: `language-x-j-[0-5]`

Primjeri:
- `en-x-taboo-0` ili `en-x-j-0` - Bez tabu sadržaja
- `en-x-taboo-3` ili `en-x-j-3` - Umjerena razina tabua
- `ja-x-form-5-taboo-4` ili `ja-x-f-5-j-4` - Vrlo ležerni japanski s visokom razinom tabua

#### 27. Klasifikator pouzdanosti (`conf` ili `c`)
Označava ocjenu pouzdanosti za neposredno prethodni klasifikator.

Format:
- Dugački: `language-x-[classifier]-[value]-conf-[0-100]`
- Kratki: `language-x-[classifier]-[value]-c-[0-100]`

Posebno ponašanje:
- Ocjena pouzdanosti odnosi se na klasifikator neposredno prije njega
- Više ocjena pouzdanosti može se koristiti za različite klasifikatore
- Ako ne prethodi klasifikator, pouzdanost se odnosi na osnovnu jezičnu oznaku

Primjeri:
- `en-x-form-3-conf-95` ili `en-x-f-3-c-95` - Neutralna formalnost s 95% pouzdanosti
- `ko-x-polite-2-conf-80-domain-med-conf-60` ili `ko-x-p-2-c-80-d-med-c-60` - Vrlo pristojan (80% pouzdanosti) medicinski korejski (60% pouzdanosti)
- `ja-x-hist-kobun-conf-100` ili `ja-x-h-kobun-c-100` - Klasični japanski sa 100% pouzdanosti
- `x-proto-ine-conf-75` ili `x-a-ine-c-75` - Praindoeuropski sa 75% pouzdanosti

### Višestruke klasifikacije

LVTag podržava više klasifikatora u jednoj oznaci za pružanje precizne identifikacije jezika. Dugački i kratki oblici mogu se miješati:

```
ko-x-form-4-domain-business
ko-x-f-4-d-business
ko-x-form-4-polite-2-domain-business
ko-x-f-4-p-2-d-business
```

Gornji primjeri pokazuju korejski s neformalnom formalnošću (4) ali pristojnim govorom (2) u poslovnom kontekstu.

## Valjane vrijednosti

**Napomena**: Sve vrijednosti moraju biti 8 znakova ili kraće kako bi se udovoljilo ograničenjima duljine BCP 47 podoznaka. Dok se specifične vrijednosti za mnoge klasifikatore trebaju utvrditi stručnom uporabom i konsenzusom zajednice, numeričke skale, formati datuma i osnovne vrijednosti navedene ispod definirane su u ovom standardu.

### Skala formalnosti (Univerzalna)

| Razina | Opis | Primjeri |
|-------|-------------|----------|
| 1 | Najformalniji | Pravni dokumenti, službene ceremonije, akademski radovi |
| 2 | Formalan | Poslovni dopisi, novinski članci, prezentacije |
| 3 | Neutralan | Standardni razgovor, e-mail, opće pisanje |
| 4 | Neformalan | Ležeran razgovor, osobni blogovi, tekstualne poruke |
| 5 | Najležerniji | Sleng, intimni razgovor, društveni mediji |

### Skala pristojnosti (Univerzalna)

| Razina | Opis | Primjeri |
|-------|-------------|----------|
| 1 | Najpristojniji | Kraljevsko obraćanje, vjerski vođe, poštovanje starijih |
| 2 | Vrlo pristojan | Korisnička služba, formalni sastanci, učitelji |
| 3 | Pristojan/neutralan | Standardne interakcije, kolege |
| 4 | Familijarno | Prijatelji, vršnjaci, ležerni poznanici |
| 5 | Intimno/jednostavno | Bliska obitelj, intimni partneri |

### Skala stručnosti (Univerzalna)

| Razina | Opis |
|-------|-------------|
| 0 | Bez znanja |
| 1-2 | Početnik |
| 3-4 | Srednja razina |
| 5-6 | Napredna razina |
| 7-8 | Stručnjak |
| 9-10 | Majstor/Autoritet |

### Skala tabua (Univerzalna)

| Razina | Opis |
|-------|-------------|
| 0 | Bez tabu sadržaja |
| 1 | Blagi tabu |
| 2 | Lagani tabu |
| 3 | Umjereni tabu |
| 4 | Visoki tabu |
| 5 | Ekstremni tabu |

### Skala leksičke gustoće (Univerzalna)

| Razina | Opis |
|-------|-------------|
| 0-20 | Vrlo niska gustoća |
| 21-40 | Niska gustoća |
| 41-60 | Umjerena gustoća |
| 61-80 | Visoka gustoća |
| 81-100 | Vrlo visoka gustoća |

### Skala sintaktičke složenosti (Univerzalna)

| Razina | Opis |
|-------|-------------|
| 0-20 | Vrlo jednostavno |
| 21-40 | Jednostavno |
| 41-60 | Umjerena složenost |
| 61-80 | Složeno |
| 81-100 | Vrlo složeno |

### Vrijednosti domene

| Vrijednost | Opis |
|-------|-------------|
| `legal` | Pravna terminologija |
| `med` | Medicinska terminologija |
| `tech` | Tehnička/IT |
| `business` | Poslovna/korporativna |
| `fin` | Financije/bankarstvo |
| `acad` | Akademska/znanstvena |
| `sci` | Znanstvena/istraživačka |

## Primjeri implementacije

### Pojedinačni klasifikator (Dugački oblik)
```
# Najformalniji korejski
ko-x-form-1

# Vrlo pristojni japanski
ja-x-polite-2

# Pravni engleski
en-x-domain-legal

# Gyeongsang korejski
ko-x-geo-gyeong

# Praindoeuropski
x-proto-ine
```

### Pojedinačni klasifikator (Kratki oblik)
```
# Najformalniji korejski
ko-x-f-1

# Vrlo pristojni japanski
ja-x-p-2

# Pravni engleski
en-x-d-legal

# Gyeongsang korejski
ko-x-g-gyeong

# Praindoeuropski
x-a-ine
```

### Višestruki klasifikatori
```
# Neformalni ali pristojni korejski poslovni jezik
ko-x-form-4-polite-2-domain-business
ko-x-f-4-p-2-d-business

# Formalni i pun poštovanja japanski medicinski jezik
ja-x-form-1-polite-1-domain-med
ja-x-f-1-p-1-d-med

# Južni vijetnamski s neutralnom formalnošću, pristojnim govorom, tehničkom domenom
vi-x-geo-southern-form-3-polite-2-domain-tech
vi-x-g-southern-f-3-p-2-d-tech

# Složena klasifikacija s više dimenzija
en-x-h-middle-e-poetry-m-written-f-1
ja-x-f-2-p-1-d-med-h-kobun-m-written

# Jezične varijante koje pokazuju razliku formalnost/pristojnost
ko-x-f-5-p-2  # Vrlo ležeran ali pristojan (starijem prijatelju)
ko-x-f-1-p-4  # Vrlo formalan ali familijarno (pisano vršnjaku)
ja-x-f-4-p-1  # Ležerna formalnost ali najviše poštovanje
en-x-f-5-j-4  # Vrlo ležerni engleski s visokom razinom tabua
```

## Slučajevi uporabe

1. **Aplikacije za učenje jezika**
   - Podučavati odgovarajući registar za različite društvene kontekste
   - Pružati domenski specifično vokabularno usavršavanje

2. **Strojno prevođenje**
   - Održavati dosljednost registra u prijevodima
   - Primjenjivati domenski specifičnu terminologiju

3. **Klasifikacija sadržaja**
   - Automatski kategorizirati tekst prema formalnosti i domeni
   - Usmjeravati sadržaj odgovarajućim recenzentima ili sustavima

4. **Korpusna lingvistika**
   - Graditi označene korpuse za lingvističko istraživanje
   - Proučavati varijacije registra i domene

## Pravila validacije

1. **Duljina podoznake**: Svaka podoznaka nakon `x-` mora imati 8 znakova ili manje
2. **Redoslijed**: Klasifikatori mogu se pojaviti bilo kojim redoslijedom nakon `x-`
3. **Jedinstvenost**: Svaki tip klasifikatora trebao bi se pojaviti samo jednom po oznaci (osim `conf` koji se može pojaviti više puta)
4. **Velika/mala slova**: Oznake bi trebale biti malim slovima (ne razlikuje se veličina slova prema BCP 47)
5. **Čarobne oznake**: Kratke oznake su pojedinačni znakovi; `q`, `3`-`9` rezervirani su za buduću uporabu
6. **Miješanje**: Dugački i kratki oblici mogu se miješati unutar iste oznake
7. **Proto oznake**: Moraju počinjati s `x-` i TREBALE BI koristiti ISO 639-5 kodove kada su dostupni (npr. `x-proto-sla` ne `x-proto-slavic`)
8. **Pouzdanost**: Klasifikator `conf`/`c` odnosi se na neposredno prethodni klasifikator
9. **Numeričke vrijednosti**: Moraju biti unutar definiranih raspona (0-5 za tabu, 0-10 za stručnost, 0-100 za postotne vrijednosti)
10. **Format datuma**: Datumi koriste ISO 8601 bez interpunkcije (YYYY, YYYYMM ili YYYYMMDD)

## Kompatibilnost

LVTag format je potpuno kompatibilan s:
- BCP 47 (RFC 5646)
- ISO 639 jezični kodovi
- IANA Language Subtag Registry
- Unicode CLDR

## Prednosti

1. **Preciznost**: Omogućuje finozrnu identifikaciju jezičnih varijanti
2. **Proširivost**: Mogu se dodati novi registri i domene
3. **Temeljen na standardima**: Izgrađen na utvrđenom BCP 47 mehanizmu privatne uporabe
4. **Strojno čitljiv**: Sustavni format omogućuje automatiziranu obradu
5. **Ljudski čitljiv**: Jasne, opisne podoznake
6. **Fleksibilnost**: Podrška za detaljne dugačke i sažete kratke oznake
7. **Kratkoća**: Kratke čarobne oznake omogućuju kompaktnu reprezentaciju uz održavanje jasnoće

## Buduća proširenja

LVTag je dizajniran da evoluira s potrebama zajednice jezičnih tehnologija. Pozdravljamo prijedloge za nove klasifikatore, poboljšanja postojećih i povratne informacije iz stvarnih implementacija.

Za predlaganje proširenja ili doprinos specifikaciji:
- Otvorite problem na [github.com/lvtag/spec](https://github.com/lvtag/spec)
- Pridružite se raspravi o postojećim prijedlozima
- Podijelite svoja iskustva implementacije
- Pošaljite pull zahtjeve za poboljšanja dokumentacije

Rezervirani jednoznačni kodovi (`q`, `3`-`9`) dostupni su za buduća standardizirana proširenja.

## Reference

- [BCP 47: Oznake za identifikaciju jezika](https://www.rfc-editor.org/rfc/rfc5646.html)
- [IANA Language Subtag Registry](https://www.iana.org/assignments/language-subtag-registry/)

---

## Licenca i davanje patenata

Ova specifikacija objavljena je pod **CC0 1.0 Universal (Public Domain Dedication)**.

**Zašto CC0**: Kako bi osigurali maksimalno prihvaćanje i slobodu implementacije, LVTag je stavljen u javnu domenu. To znači:
- Nije potrebno dopuštenje za korištenje, implementaciju ili modificiranje
- Nije potrebno pripisivanje (iako se cijeni)
- Nema pravnih prepreka za komercijalnu ili državnu uporabu
- Kompatibilno sa svim softverskim licencama
- Koristi ga glavni standardi poput Unicode CLDR

**Davanje patenata**: Svi patenti koji pokrivaju LVTag specifikaciju ovime se licenciraju bez naknade za bilo koju implementaciju koja je u skladu s ovom specifikacijom.

**Bez podrške**: Korištenje LVTaga ne implicira podršku autora specifikacije.

U mjeri dopuštenoj zakonom, **Danslav Slavenskoj** odrekao se svih autorskih i srodnih ili susjednih prava na specifikaciju Language Variant Tag (LVTag) formata. Ovaj rad objavljen je iz: Sjedinjene Američke Države.
EOF < /dev/null
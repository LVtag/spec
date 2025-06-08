---
layout: default
title: Language Variant Tag (LVTag) Spezifikation
lang: de
description: "LVTag ist ein systematischer Ansatz zur Sprachklassifikation, der BCP 47 durch private Subtags erweitert, um Sprachvarianten über die Dimensionen Formalität, Höflichkeit, Domäne und Orthographie präzise zu identifizieren."
---

<div align="center">
  <img src="/LVTAG_LOGO.png" alt="LVTag Logo" width="100">
</div>

# LVTag-Spezifikation

**Version 1.0**  
**Erstellt von Danslav Slavenskoj**  
**Datum: Mai 2025**

**Sprachen**: [中文简体](/index-zh.md)  [中文繁體](/index-zh-hant.md)  [Čeština](/index-cs.md)  Deutsch  [English](/index.md)  [Español](/index-es.md)  [Français](/index-fr.md)  [Hrvatski](/index-hr.md)  [日本語](/index-ja.md)  [한국어](/index-ko.md)  [Polski](/index-pl.md)  [Português](/index-pt.md)  [Русский](/index-ru.md)  [Српски](/index-sr.md)

## Schnelllinks

- [JSON-Schema](/lvtag-schema.json) - Vollständiges Validierungsschema für das LVTag-Format
- [Klassifikator-Definitionen](/lvtag-classifiers.json) - Maschinenlesbare Klassifikator-Spezifikationen
- [Spezifikation](#format-spezifikation) - Zu den Formatdetails springen
- [Beispiele](#implementierungsbeispiele) - LVTag in Aktion sehen

## Überblick

Das Language Variant Tag (LVTag)-Format ist ein systematischer Ansatz zur Sprachklassifikation, der den BCP 47-Standard durch Private-Use-Subtags erweitert. Es ermöglicht die präzise Identifikation von Sprachvarianten über mehrere Dimensionen hinweg, einschließlich Formalität, Höflichkeit, Domäne und Orthographie.

### Hauptvorteile

**Klassifikationsrigorosität**: LVTag bringt systematische Organisation in die Sprachkennzeichnung, indem es klare, getrennte Dimensionen für verschiedene Variationstypen bereitstellt. Im Gegensatz zu bestehenden Subtags und Systemen, die verschiedene Kategorien auf derselben Ebene vermischen, behält LVTag eine strikte Trennung zwischen Formalität, Höflichkeit, Domäne und anderen Dimensionen bei.

**Standards-Kompatibilität**: LVTag ist vollständig kompatibel mit BCP 47 (RFC 5646) und funktioniert nahtlos mit:
- IANA Language Subtag Registry
- ISO 639 Sprachcodes
- Unicode CLDR
- W3C-Sprachtags
- HTTP Accept-Language-Header
- XML lang-Attribute
- HTML lang-Attribute

**Technologie-Integration**: LVTag-Tags können direkt verwendet werden in:
- Natural Language Processing (NLP)-Pipelines
- Maschinelle Übersetzungssysteme
- Content Management Systeme (CMS)
- Spracherkennungsbibliotheken
- Suchmaschinen und Informationsabrufsysteme
- Webanwendungen und APIs
- Lokalisierungs-Workflows

**Anwendungsfälle**:
- **Zielgruppenansprache**: Inhalte basierend auf Register und Domäne an geeignete Zielgruppen anpassen
- **Übersetzungsqualität**: Angemessene Formalitäts- und Höflichkeitsstufen in maschineller Übersetzung beibehalten
- **Sprachenlernen**: Lernenden das angemessene Register für verschiedene Kontexte beibringen
- **Korpuslinguistik**: Präzise getaggte Korpora für die Forschung erstellen
- **Social-Media-Analyse**: Benutzergenerierte Inhalte nach Register und Domäne klassifizieren
- **Kundenservice**: Nachrichten basierend auf Formalität und Domäne an geeignete Agenten weiterleiten

## Begründung

Während BCP 47 hervorragende Unterstützung für die Identifizierung von Sprachen, Schriften und Regionen bietet, fehlen standardisierte Mechanismen zur Erfassung soziolinguistischer Variation innerhalb einer Sprache. Aktuelle Standards behandeln nicht:

- **Registervariation**: Keine Möglichkeit, zwischen formellen und informellen Varietäten derselben Sprache zu unterscheiden
- **Höflichkeitsstufen**: Kritisch für Sprachen wie Japanisch, Koreanisch und Thai, wo Höflichkeit grammatisch kodiert ist
- **Domänenspezifische Sprache**: Kein Standard für die Kennzeichnung technischer, medizinischer oder juristischer Sprachvarietäten
- **Soziolekte**: Kein Mechanismus zur Identifizierung von Varietäten sozialer Gruppen (Jugendsprache, Fachjargon)
- **Historische Stadien**: Begrenzte Unterstützung zur Unterscheidung klassischer von modernen Formen
- **Formalitätsgradienten**: Keine numerische Skala für die computergestützte Verarbeitung von Registern
- **Ursprachen**: Inkonsistente Kodierung - einige Ursprachen haben ISO-Codes (z.B. `ine` für PIE), während andere keine haben, und ISO 639-5-Familiencodes sind in BCP 47-Tags nicht gültig, was eine verwirrende Landschaft für die historische Linguistik schafft
- **Orthographische Variation**: Während BCP 47 Schriften behandelt, erfasst es nicht effektiv Variationen innerhalb von Schriften (Rechtschreibreformen, Romanisierungssysteme, konkurrierende Standards), die die Textverarbeitung, Suche und Rechtschreibprüfung grundlegend beeinflussen

LVTag füllt diese Lücken mithilfe des Private-Use-Erweiterungsmechanismus von BCP 47 (`-x-`), indem es eine systematische, maschinenlesbare Methode zur Kodierung dieser kritischen Dimensionen der Sprachvariation bereitstellt und dabei die volle Rückwärtskompatibilität beibehält.

### Präzise Sprachklassifikation

Das Aufkommen großer Sprachmodelle und ausgefeilter NLP-Tools hat die präzise Klassifikation von Sprachvarietäten nicht nur nützlich, sondern unverzichtbar gemacht. Moderne Systeme müssen:

- Text generieren, der für spezifische Kontexte geeignet ist (formell vs. informell, höflich vs. lässig)
- Auf ordnungsgemäß klassifizierten Korpora trainieren, um unangemessene Registermischungen zu vermeiden
- Kulturell und kontextuell angemessene Antworten bereitstellen
- Code-Switching und gemischtsprachige Inhalte genau handhaben
- Stilistische Konsistenz beim Übersetzen oder Transformieren von Text bewahren
- Trainingsdaten basierend auf Formalität, Domäne oder anderen Merkmalen filtern
- Die Ausgabe an Benutzerpräferenzen oder -anforderungen anpassen

LVTag bietet die granularen Metadaten, die benötigt werden, um nicht nur zu verstehen, welche Sprache verwendet wird, sondern wie sie verwendet wird, was nuanciertere und angemessenere Sprachverarbeitungs-Pipelines ermöglicht.

## Format-Spezifikation

### Grundstruktur

```
language-x-[classifier]-[value]-[classifier2]-[value2]...
```

Wobei:
- `language` ein gültiger BCP 47-Primärsprachen-Subtag ist (z.B. `en`, `ko`, `ja`)
- `x` den Beginn von Private-Use-Subtags anzeigt
- `classifier` ein Kategoriebezeichner ist (siehe Magische Tags unten)
- `value` die spezifische Klassifikation innerhalb dieser Kategorie ist

### Magische Tags

LVTag unterstützt sowohl Lang- als auch Kurzform-"magische" Klassifikatoren für Flexibilität:

| Langform | Kurzform | Beschreibung |
|-----------|------------|-------------|
| `ortho` | `w` | Orthographische Variante |
| `form` | `f` | Formalitätsstufe (1-5 Skala) |
| `polite` | `p` | Höflichkeits-/Respektstufe (1-5 Skala) |
| `domain` | `d` | Spezialisiertes Vokabular oder professioneller Kontext |
| `geo` | `g` | Geografische oder regionale Varietät |
| `proto` | `a` | Ursprache oder rekonstruierte Sprache |
| `hist` | `h` | Historische Periode oder Stadium einer Sprache |
| `genre` | `e` | Textgenre oder literarischer Stil |
| `medium` | `m` | Kommunikationsmedium (gesprochen, geschrieben, digital) |
| `socio` | `s` | Soziolekt oder Varietät sozialer Gruppen |
| `modality` | `o` | Modus der Sprachproduktion |
| `register` | `r` | Sprachregister |
| `pragma` | `u` | Kommunikative Funktion |
| `temporal` | `t` | Zeitliche Markierung |
| `evidence` | `v` | Informationsquelle |
| `affect` | `k` | Emotionaler Ton |
| `age` | `n` | Alters-/Generationsvarietät |
| `gender` | `i` | Geschlechtsvarietät |
| `expert` | `b` | Expertisegrad |
| `interact` | `2` | Interaktionsstruktur |
| `prosody` | `y` | Prosodische Merkmale |
| `lexical` | `l` | Lexikalische Dichte (0-100) |
| `syntax` | `z` | Syntaktische Komplexität (0-100) |
| `start` | `0` | Startdatum (ISO 8601 ohne Interpunktion) |
| `end` | `1` | Enddatum (ISO 8601 ohne Interpunktion) |
| `taboo` | `j` | Tabu-/Vulgärinhaltsstufe (0-5 Skala) |
| `conf` | `c` | Konfidenzwert (0-100) für vorhergehendes Tag |
| — | `q`, `3`-`9` | Für zukünftige Verwendung reserviert |

### Klassifikatoren

#### 1. Orthographie-Klassifikator (`ortho` oder `w`)
Identifiziert spezifische orthographische Konventionen oder Schriftsystemvarianten über Standard-Schrift-Tags hinaus.

Format:
- Lang: `language-x-ortho-[variant]`
- Kurz: `language-x-w-[variant]`

Beispiele (kombiniert mit Standard-Schrift-Tags):
- `az-Latn-x-ortho-new` oder `az-Latn-x-w-new` - Aserbaidschanisch lateinische Schrift, neue Orthographie
- `de-Latn-x-ortho-1901` oder `de-Latn-x-w-1901` - Deutsch lateinische Schrift, 1901 Orthographie
- `zh-Hans-x-ortho-pinyin` oder `zh-Hans-x-w-pinyin` - Vereinfachtes Chinesisch mit Pinyin
- `yi-Hebr-x-ortho-yivo` oder `yi-Hebr-x-w-yivo` - Jiddisch hebräische Schrift, YIVO-Orthographie

#### 2. Formalitäts-Klassifikator (`form` oder `f`)
Identifiziert die Formalitätsstufe der Sprachverwendung.

Format:
- Lang: `language-x-form-[1-5]`
- Kurz: `language-x-f-[1-5]`

Formalitätsskala:
- 1 = Am formellsten (schriftliche Dokumente, offizielle Reden)
- 2 = Formell (Geschäftstreffen, akademisches Schreiben)
- 3 = Neutral/Standard (Nachrichten, allgemeine Konversation)
- 4 = Informell (lockere Konversation, E-Mails an Freunde)
- 5 = Am lockersten (intime Konversation, Slang)

Beispiele:
- `ko-x-form-1` oder `ko-x-f-1` - Formellstes Koreanisch
- `en-x-form-3` oder `en-x-f-3` - Neutrales Englisch
- `ja-x-form-5` oder `ja-x-f-5` - Lockerstes Japanisch

#### 3. Höflichkeits-Klassifikator (`polite` oder `p`)
Identifiziert die Höflichkeits-/Respektstufe der Sprachverwendung.

Format:
- Lang: `language-x-polite-[1-5]`
- Kurz: `language-x-p-[1-5]`

Höflichkeitsskala:
- 1 = Am respektvollsten/ehrerbietigsten (königliche Anrede, religiöse Kontexte)
- 2 = Sehr höflich (formelle Höflichkeitsformen, respektvolle Rede)
- 3 = Höflich/neutral (Standard-Höflichkeit)
- 4 = Vertraut (unter Gleichen, Freunden)
- 5 = Intim/schlicht (Familie, sehr enge Freunde)

Beispiele:
- `ko-x-polite-1` oder `ko-x-p-1` - Höchster Respekt Koreanisch
- `ja-x-polite-2` oder `ja-x-p-2` - Sehr höfliches Japanisch
- `th-x-polite-3` oder `th-x-p-3` - Standard-höfliches Thai

#### 4. Domänen-Klassifikator (`domain` oder `d`)
Identifiziert spezialisiertes Vokabular oder professionellen Kontext.

Format:
- Lang: `language-x-domain-[domain_type]`
- Kurz: `language-x-d-[domain_type]`

Beispiele:
- `en-x-domain-legal` oder `en-x-d-legal` - Juristisches Englisch
- `ja-x-domain-med` oder `ja-x-d-med` - Medizinisches Japanisch
- `ko-x-domain-business` oder `ko-x-d-business` - Geschäftskoreanisch
- `ja-x-domain-tech` oder `ja-x-d-tech` - Technisches Japanisch
- `en-x-domain-fin` oder `en-x-d-fin` - Finanzenglisch

#### 5. Geografischer Klassifikator (`geo` oder `g`)
Identifiziert regionale oder geografische Sprachvarietäten.

Format:
- Lang: `language-x-geo-[region]`
- Kurz: `language-x-g-[region]`

Beispiele:
- `ko-x-geo-gyeong` oder `ko-x-g-gyeong` - Gyeongsang-Koreanisch (경상도)
- `ko-x-geo-jeolla` oder `ko-x-g-jeolla` - Jeolla-Koreanisch (전라도)
- `es-x-geo-riopla` oder `es-x-g-riopla` - Rioplatense-Spanisch
- `pt-x-geo-nordeste` oder `pt-x-g-nordeste` - Nordöstliches brasilianisches Portugiesisch

#### 6. Proto-Klassifikator (`proto` oder `a`)
Identifiziert Ursprachen oder rekonstruierte historische Sprachen.

Format:
- Lang: `x-proto-[iso639-5_code if available]`
- Kurz: `x-a-[iso639-5_code if available]`

Regeln:
- MUSS ISO 639-5-Sprachfamiliencodes verwenden, wenn verfügbar
- Verwenden Sie beschreibende Identifikatoren nur, wenn kein ISO 639-5-Code existiert

Beispiele mit ISO 639-5-Codes:
- `x-proto-ine` oder `x-a-ine` - Proto-Indoeuropäisch
- `x-proto-gem` oder `x-a-gem` - Proto-Germanisch
- `x-proto-sla` oder `x-a-sla` - Proto-Slawisch
- `x-proto-sem` oder `x-a-sem` - Proto-Semitisch
- `x-proto-cel` oder `x-a-cel` - Proto-Keltisch
- `x-proto-ira` oder `x-a-ira` - Proto-Iranisch
- `x-proto-inc` oder `x-a-inc` - Proto-Indo-Arisch
- `x-proto-bat` oder `x-a-bat` - Proto-Baltisch
- `x-proto-roa` oder `x-a-roa` - Proto-Romanisch
- `x-proto-trk` oder `x-a-trk` - Proto-Türkisch

Beispiele ohne ISO 639-5-Codes (beschreibend, länger als drei Zeichen):
- `x-proto-baltslav` oder `x-a-baltslav` - Proto-Balto-Slawisch (kein ISO 639-5-Code)

Hinweis:
- Sprachfamiliencodes (ISO 639-5) sind NICHT als Standard-Primär-BCP-47-Sprachtags gültig, weshalb wir sie mit x-proto implementiert haben
- Sie sind gültig und bevorzugt innerhalb von Private-Use-Erweiterungen (nach `x-`)
- Daher müssen alle Proto-Sprach-Tags mit `x-` beginnen, um BCP 47 zu entsprechen

#### 7. Historischer Klassifikator (`hist` oder `h`)
Identifiziert historische Perioden oder Stadien einer Sprache.

Format:
- Lang: `language-x-hist-[period]`
- Kurz: `language-x-h-[period]`

Beispiele:
- `en-x-hist-old` oder `en-x-h-old` - Altenglische Periode
- `en-x-hist-middle` oder `en-x-h-middle` - Mittelenglische Periode
- `ja-x-hist-kobun` oder `ja-x-h-kobun` - Klassisches Japanisch (古文)
- `ko-x-hist-hunmin` oder `ko-x-h-hunmin` - Mittelkoreanisch (훈민정음 Periode)
- `el-x-hist-koine` oder `el-x-h-koine` - Koine-Griechisch (Κοινή)
- `sa-x-hist-vedic` oder `sa-x-h-vedic` - Vedisches Sanskrit (वैदिक)

#### 8. Genre-Klassifikator (`genre` oder `e`)
Identifiziert Textgenre oder literarischen Stil.

Format:
- Lang: `language-x-genre-[genre_type]`
- Kurz: `language-x-e-[genre_type]`

Beispiele:
- `en-x-genre-news` oder `en-x-e-news` - Nachrichtenenglisch
- `ja-x-genre-manga` oder `ja-x-e-manga` - Manga-Japanisch (漫画)
- `ko-x-genre-webtoon` oder `ko-x-e-webtoon` - Koreanischer Webtoon (웹툰)
- `zh-x-genre-shi` oder `zh-x-e-shi` - Chinesische Poesie (詩)
- `fr-x-genre-bd` oder `fr-x-e-bd` - Französische Comics (bande dessinée)
- `de-x-genre-marchen` oder `de-x-e-marchen` - Deutsche Märchen (Märchen)

#### 9. Medium-Klassifikator (`medium` oder `m`)
Identifiziert das Kommunikationsmedium.

Format:
- Lang: `language-x-medium-[medium_type]`
- Kurz: `language-x-m-[medium_type]`

Beispiele:
- `en-x-medium-spoken` oder `en-x-m-spoken` - Gesprochenes Englisch
- `ko-x-medium-digital` oder `ko-x-m-digital` - Digitales/Online-Koreanisch
- `ja-x-medium-written` oder `ja-x-m-written` - Geschriebenes Japanisch
- `hi-x-medium-bcast` oder `hi-x-m-bcast` - Rundfunk-Hindi
- `zh-x-medium-sms` oder `zh-x-m-sms` - SMS/Textnachricht Chinesisch

#### 10. Sozio-Klassifikator (`socio` oder `s`)
Identifiziert Soziolekt oder Varietäten sozialer Gruppen.

Format:
- Lang: `language-x-socio-[social_group]`
- Kurz: `language-x-s-[social_group]`

Beispiele:
- `en-x-socio-academic` oder `en-x-s-academic` - Akademischer Soziolekt
- `en-x-socio-urban` oder `en-x-s-urban` - Städtischer Soziolekt
- `es-x-socio-juvenil` oder `es-x-s-juvenil` - Spanischer Jugendsoziolekt (jerga juvenil)
- `fr-x-socio-jeune` oder `fr-x-s-jeune` - Französischer Jugendsoziolekt
- `de-x-socio-jugend` oder `de-x-s-jugend` - Deutscher Jugendsoziolekt (Jugendsprache)
- `ko-x-socio-online` oder `ko-x-s-online` - Koreanischer Online-Soziolekt

#### 11. Modalitäts-Klassifikator (`modality` oder `o`)
Identifiziert den grundlegenden Modus der Sprachproduktion.

Format:
- Lang: `language-x-modality-[mode]`
- Kurz: `language-x-o-[mode]`

Beispiele:
- `en-x-modality-spoken` oder `en-x-o-spoken` - Gesprochenes Englisch
- `en-x-modality-written` oder `en-x-o-written` - Geschriebenes Englisch
- `asl-x-modality-signed` oder `asl-x-o-signed` - Amerikanische Gebärdensprache
- `en-x-modality-multi` oder `en-x-o-multi` - Multimodales Englisch (Sprache + Gesten)
- `fr-x-modality-tactile` oder `fr-x-o-tactile` - Taktiles Französisch (für Taubblinde)

#### 12. Register-Klassifikator (`register` oder `r`)
Identifiziert das Sprachregister oder die funktionale Varietät der Sprachverwendung.

Format:
- Lang: `language-x-register-[register_type]`
- Kurz: `language-x-r-[register_type]`

Beispiele:
- `en-x-register-frozen` oder `en-x-r-frozen` - Erstarrtes Register (Gebete, Gelöbnisse)
- `en-x-register-formal` oder `en-x-r-formal` - Formelles Register (akademische Arbeiten)
- `en-x-register-consult` oder `en-x-r-consult` - Beratungsregister (professionell)
- `en-x-register-casual` oder `en-x-r-casual` - Lässiges Register (Freunde)
- `en-x-register-intimate` oder `en-x-r-intimate` - Intimes Register (Familie)

#### 13. Pragmatischer Funktions-Klassifikator (`pragma` oder `u`)
Identifiziert die kommunikative Funktion oder den Sprechakt.

Format:
- Lang: `language-x-pragma-[function]`
- Kurz: `language-x-u-[function]`

Beispiele:
- `en-x-pragma-request` oder `en-x-u-request` - Anfragefunktion
- `ja-x-pragma-apology` oder `ja-x-u-apology` - Entschuldigungsfunktion
- `es-x-pragma-complmnt` oder `es-x-u-complmnt` - Komplimentfunktion
- `ar-x-pragma-greeting` oder `ar-x-u-greeting` - Grußfunktion
- `zh-x-pragma-refusal` oder `zh-x-u-refusal` - Ablehnungsfunktion

#### 14. Temporaler Markierungs-Klassifikator (`temporal` oder `t`)
Identifiziert zeitliche Aspekte oder Tempusverwendungsmuster.

Format:
- Lang: `language-x-temporal-[aspect]`
- Kurz: `language-x-t-[aspect]`

Beispiele:
- `en-x-temporal-past` oder `en-x-t-past` - Vergangenheitsorientierter Diskurs
- `ja-x-temporal-nonpast` oder `ja-x-t-nonpast` - Nicht-Vergangenheitsfokus
- `id-x-temporal-atemprl` oder `id-x-t-atemprl` - Zeitlos/atemporal
- `fr-x-temporal-future` oder `fr-x-t-future` - Zukunftsorientiert
- `zh-x-temporal-aspect` oder `zh-x-t-aspect` - Aspektueller Fokus

#### 15. Evidentialitäts-Klassifikator (`evidence` oder `v`)
Identifiziert Informationsquellenmarkierung.

Format:
- Lang: `language-x-evidence-[source]`
- Kurz: `language-x-v-[source]`

Beispiele:
- `qu-x-evidence-direct` oder `qu-x-v-direct` - Direkter Zeuge
- `tr-x-evidence-hearsay` oder `tr-x-v-hearsay` - Hörensagen/berichtet
- `ja-x-evidence-infer` oder `ja-x-v-infer` - Inferentiell
- `en-x-evidence-assume` oder `en-x-v-assume` - Angenommen
- `de-x-evidence-quote` oder `de-x-v-quote` - Zitativ

#### 16. Affekt/Emotions-Klassifikator (`affect` oder `k`)
Identifiziert emotionalen Ton oder Affekt.

Format:
- Lang: `language-x-affect-[emotion]`
- Kurz: `language-x-k-[emotion]`

Beispiele:
- `en-x-affect-angry` oder `en-x-k-angry` - Wütender Ton
- `ja-x-affect-humble` oder `ja-x-k-humble` - Demütiger Affekt
- `es-x-affect-joyful` oder `es-x-k-joyful` - Freudiger Ausdruck
- `ko-x-affect-sad` oder `ko-x-k-sad` - Traurig/melancholisch
- `fr-x-affect-neutral` oder `fr-x-k-neutral` - Neutraler Affekt

#### 17. Alters-/Generations-Klassifikator (`age` oder `n`)
Identifiziert alters- oder generationsbezogene Sprachvarietäten.

Format:
- Lang: `language-x-age-[generation]`
- Kurz: `language-x-n-[generation]`

Beispiele:
- `en-x-age-child` oder `en-x-n-child` - Kindersprache
- `ja-x-age-teen` oder `ja-x-n-teen` - Teenagersprache
- `ko-x-age-elder` oder `ko-x-n-elder` - Sprache Älterer
- `es-x-age-genz` oder `es-x-n-genz` - Generation Z
- `zh-x-age-millenl` oder `zh-x-n-millenl` - Millennialsprache

#### 18. Gender-Klassifikator (`gender` oder `i`)
Identifiziert geschlechtsbezogene Sprachvarietäten.

Format:
- Lang: `language-x-gender-[identity]`
- Kurz: `language-x-i-[identity]`

#### 19. Expertisegrad-Klassifikator (`expert` oder `b`)
Identifiziert den Grad der Domänenexpertise auf einer 0-10-Skala.

Format:
- Lang: `language-x-expert-[0-10]`
- Kurz: `language-x-b-[0-10]`

Expertiseskala:
- 0 = Kein Wissen
- 1-2 = Anfänger
- 3-4 = Mittelstufe
- 5-6 = Fortgeschritten
- 7-8 = Experte
- 9-10 = Meister/Autorität

Beispiele:
- `en-x-expert-0` oder `en-x-b-0` - Keine Expertise
- `de-x-expert-3` oder `de-x-b-3` - Mittelstufe
- `ja-x-expert-7` oder `ja-x-b-7` - Expertenniveau
- `es-x-expert-9` oder `es-x-b-9` - Meisterniveau
- `zh-x-expert-5` oder `zh-x-b-5` - Fortgeschrittenes Niveau

#### 20. Interaktionsstruktur-Klassifikator (`interact` oder `2`)
Identifiziert konversationelle oder interaktionale Muster.

Format:
- Lang: `language-x-interact-[structure]`
- Kurz: `language-x-2-[structure]`

Beispiele:
- `en-x-interact-turn` oder `en-x-2-turn` - Sprecherwechsel
- `ja-x-interact-overlap` oder `ja-x-2-overlap` - Überlappende Rede
- `es-x-interact-monolog` oder `es-x-2-monolog` - Monologisch
- `ar-x-interact-dialog` oder `ar-x-2-dialog` - Dialogisch
- `zh-x-interact-multi` oder `zh-x-2-multi` - Mehrparteien

#### 21. Prosodische Merkmale-Klassifikator (`prosody` oder `y`)
Identifiziert prosodische oder suprasegmentale Merkmale.

Format:
- Lang: `language-x-prosody-[feature]`
- Kurz: `language-x-y-[feature]`

Beispiele:
- `en-x-prosody-stress` oder `en-x-y-stress` - Betonungszeitgesteuert
- `ja-x-prosody-pitch` oder `ja-x-y-pitch` - Tonhöhenakzent
- `fr-x-prosody-syllable` oder `fr-x-y-syllable` - Silbenzeitgesteuert
- `zh-x-prosody-tone` oder `zh-x-y-tone` - Tonale Muster
- `es-x-prosody-rhythm` oder `es-x-y-rhythm` - Rhythmische Muster

#### 22. Lexikalische Dichte-Klassifikator (`lexical` oder `l`)
Identifiziert lexikalische Dichte als numerischen Wert (0-100).

Format:
- Lang: `language-x-lexical-[0-100]`
- Kurz: `language-x-l-[0-100]`

Beispiele:
- `en-x-lexical-20` oder `en-x-l-20` - Niedrige Dichte (20%)
- `de-x-lexical-55` oder `de-x-l-55` - Mittlere Dichte (55%)
- `ja-x-lexical-75` oder `ja-x-l-75` - Hohe Dichte (75%)
- `es-x-lexical-40` oder `es-x-l-40` - Moderate Dichte (40%)
- `zh-x-lexical-85` oder `zh-x-l-85` - Sehr hohe Dichte (85%)

#### 23. Syntaktische Komplexitäts-Klassifikator (`syntax` oder `z`)
Identifiziert syntaktische Komplexität als numerischen Wert (0-100).

Format:
- Lang: `language-x-syntax-[0-100]`
- Kurz: `language-x-z-[0-100]`

Beispiele:
- `en-x-syntax-15` oder `en-x-z-15` - Einfache Syntax (15%)
- `de-x-syntax-70` oder `de-x-z-70` - Komplexe Syntax (70%)
- `ja-x-syntax-45` oder `ja-x-z-45` - Moderate Komplexität (45%)
- `es-x-syntax-30` oder `es-x-z-30` - Niedrige Komplexität (30%)
- `zh-x-syntax-60` oder `zh-x-z-60` - Hohe Komplexität (60%)

#### 24. Startdatum-Klassifikator (`start` oder `0`)
Identifiziert das Startdatum der Sprachverwendung (ISO 8601-Format ohne Interpunktion).

Format:
- Lang: `language-x-start-[YYYYMMDD]`
- Kurz: `language-x-0-[YYYYMMDD]`

Datumsformate:
- Vollständiges Datum: YYYYMMDD
- Jahr-Monat: YYYYMM
- Nur Jahr: YYYY

Beispiele:
- `en-x-start-20240315` oder `en-x-0-20240315` - Englisch beginnend am 15. März 2024
- `ja-x-start-19890108` oder `ja-x-0-19890108` - Japanisch beginnend am 8. Januar 1989
- `es-x-start-202403` oder `es-x-0-202403` - Spanisch beginnend im März 2024

#### 25. Enddatum-Klassifikator (`end` oder `1`)
Identifiziert das Enddatum der Sprachverwendung (ISO 8601-Format ohne Interpunktion).

Format:
- Lang: `language-x-end-[YYYYMMDD]`
- Kurz: `language-x-1-[YYYYMMDD]`

Datumsformate:
- Vollständiges Datum: YYYYMMDD
- Jahr-Monat: YYYYMM
- Nur Jahr: YYYY

Beispiele:
- `en-x-end-20240415` oder `en-x-1-20240415` - Englisch endend am 15. April 2024
- `ja-x-end-20190430` oder `ja-x-1-20190430` - Japanisch endend am 30. April 2019
- `es-x-end-202412` oder `es-x-1-202412` - Spanisch endend im Dezember 2024

#### 26. Tabu-Klassifikator (`taboo` oder `j`)
Identifiziert die Ebene von Tabu-, vulgärem oder anstößigem Inhalt.

Format:
- Lang: `language-x-taboo-[0-5]`
- Kurz: `language-x-j-[0-5]`

Beispiele:
- `en-x-taboo-0` oder `en-x-j-0` - Kein Tabu-Inhalt
- `en-x-taboo-3` oder `en-x-j-3` - Moderate Tabu-Ebene
- `ja-x-form-5-taboo-4` oder `ja-x-f-5-j-4` - Sehr lockeres Japanisch mit hoher Tabu-Ebene

#### 27. Konfidenz-Klassifikator (`conf` oder `c`)
Gibt den Konfidenzwert für den unmittelbar vorhergehenden Klassifikator an.

Format:
- Lang: `language-x-[classifier]-[value]-conf-[0-100]`
- Kurz: `language-x-[classifier]-[value]-c-[0-100]`

Spezielles Verhalten:
- Der Konfidenzwert gilt für den unmittelbar davor stehenden Klassifikator
- Mehrere Konfidenzwerte können für verschiedene Klassifikatoren verwendet werden
- Wenn kein Klassifikator vorausgeht, gilt die Konfidenz für das Basis-Sprach-Tag

Beispiele:
- `en-x-form-3-conf-95` oder `en-x-f-3-c-95` - Neutrale Formalität mit 95% Konfidenz
- `ko-x-polite-2-conf-80-domain-med-conf-60` oder `ko-x-p-2-c-80-d-med-c-60` - Sehr höflich (80% Konfidenz) medizinisches Koreanisch (60% Konfidenz)
- `ja-x-hist-kobun-conf-100` oder `ja-x-h-kobun-c-100` - Klassisches Japanisch mit 100% Konfidenz
- `x-proto-ine-conf-75` oder `x-a-ine-c-75` - Proto-Indoeuropäisch mit 75% Konfidenz

### Mehrfachklassifikationen

LVTag unterstützt mehrere Klassifikatoren in einem einzigen Tag, um eine präzise Sprachidentifikation zu ermöglichen. Sowohl Lang- als auch Kurzformen können gemischt werden:

```
ko-x-form-4-domain-business
ko-x-f-4-d-business
ko-x-form-4-polite-2-domain-business
ko-x-f-4-p-2-d-business
```

Die obigen Beispiele zeigen Koreanisch mit informeller Formalität (4), aber höflicher Rede (2) im Geschäftskontext.

## Gültige Werte

**Hinweis**: Alle Werte müssen 8 Zeichen oder kürzer sein, um den BCP 47-Subtag-Längenbeschränkungen zu entsprechen. Während spezifische Werte für viele Klassifikatoren durch Expertennutzung und Gemeinschaftskonsens festgelegt werden sollen, sind die numerischen Skalen, Datumsformate und unten aufgeführten Grundwerte in diesem Standard definiert.

### Formalitätsskala (Universal)

| Stufe | Beschreibung | Beispiele |
|-------|-------------|----------|
| 1 | Am formellsten | Rechtsdokumente, offizielle Zeremonien, akademische Arbeiten |
| 2 | Formell | Geschäftsbriefe, Nachrichtenartikel, Präsentationen |
| 3 | Neutral | Standardkonversation, E-Mail, allgemeines Schreiben |
| 4 | Informell | Lockere Konversation, persönliche Blogs, Textnachrichten |
| 5 | Am lockersten | Slang, intime Konversation, soziale Medien |

### Höflichkeitsskala (Universal)

| Stufe | Beschreibung | Beispiele |
|-------|-------------|----------|
| 1 | Am respektvollsten | Königliche Anrede, religiöse Führer, Respekt vor Älteren |
| 2 | Sehr höflich | Kundenservice, formelle Meetings, Lehrer |
| 3 | Höflich/neutral | Standardinteraktionen, Kollegen |
| 4 | Vertraut | Freunde, Gleichgestellte, lockere Bekannte |
| 5 | Intim/schlicht | Enge Familie, intime Partner |

### Expertiseskala (Universal)

| Stufe | Beschreibung |
|-------|-------------|
| 0 | Kein Wissen |
| 1-2 | Anfänger |
| 3-4 | Mittelstufe |
| 5-6 | Fortgeschritten |
| 7-8 | Experte |
| 9-10 | Meister/Autorität |

### Tabu-Skala (Universal)

| Stufe | Beschreibung |
|-------|-------------|
| 0 | Kein Tabu-Inhalt |
| 1 | Mildes Tabu |
| 2 | Leichtes Tabu |
| 3 | Moderates Tabu |
| 4 | Hohes Tabu |
| 5 | Extremes Tabu |

### Lexikalische Dichteskala (Universal)

| Stufe | Beschreibung |
|-------|-------------|
| 0-20 | Sehr niedrige Dichte |
| 21-40 | Niedrige Dichte |
| 41-60 | Moderate Dichte |
| 61-80 | Hohe Dichte |
| 81-100 | Sehr hohe Dichte |

### Syntaktische Komplexitätsskala (Universal)

| Stufe | Beschreibung |
|-------|-------------|
| 0-20 | Sehr einfach |
| 21-40 | Einfach |
| 41-60 | Moderate Komplexität |
| 61-80 | Komplex |
| 81-100 | Sehr komplex |

### Domänenwerte

| Wert | Beschreibung |
|-------|-------------|
| `legal` | Rechtsterminologie |
| `med` | Medizinische Terminologie |
| `tech` | Technisch/IT |
| `business` | Geschäftlich/unternehmerisch |
| `fin` | Finanzen/Banking |
| `acad` | Akademisch/wissenschaftlich |
| `sci` | Wissenschaftlich/Forschung |

## Implementierungsbeispiele

### Einzelklassifikator (Langform)
```
# Formellstes Koreanisch
ko-x-form-1

# Sehr höfliches Japanisch
ja-x-polite-2

# Juristisches Englisch
en-x-domain-legal

# Gyeongsang-Koreanisch
ko-x-geo-gyeong

# Proto-Indoeuropäisch
x-proto-ine
```

### Einzelklassifikator (Kurzform)
```
# Formellstes Koreanisch
ko-x-f-1

# Sehr höfliches Japanisch
ja-x-p-2

# Juristisches Englisch
en-x-d-legal

# Gyeongsang-Koreanisch
ko-x-g-gyeong

# Proto-Indoeuropäisch
x-a-ine
```

### Mehrfachklassifikatoren
```
# Informelle aber höfliche koreanische Geschäftssprache
ko-x-form-4-polite-2-domain-business
ko-x-f-4-p-2-d-business

# Formelle und respektvolle japanische medizinische Sprache
ja-x-form-1-polite-1-domain-med
ja-x-f-1-p-1-d-med

# Südvietnamesisch mit neutraler Formalität, höflicher Rede, technischer Domäne
vi-x-geo-southern-form-3-polite-2-domain-tech
vi-x-g-southern-f-3-p-2-d-tech

# Komplexe Klassifikation mit mehreren Dimensionen
en-x-h-middle-e-poetry-m-written-f-1
ja-x-f-2-p-1-d-med-h-kobun-m-written

# Sprachvarietäten, die Formalitäts-/Höflichkeitsunterscheidung zeigen
ko-x-f-5-p-2  # Sehr locker aber höflich (zu älterem Freund)
ko-x-f-1-p-4  # Sehr formell aber vertraut (schriftlich an Gleichgestellten)
ja-x-f-4-p-1  # Lockere Formalität aber höchster Respekt
en-x-f-5-j-4  # Sehr lockeres Englisch mit hoher Tabu-Ebene
```

## Anwendungsfälle

1. **Sprachlern-Anwendungen**
   - Angemessenes Register für verschiedene soziale Kontexte lehren
   - Domänenspezifisches Vokabeltraining bereitstellen

2. **Maschinelle Übersetzung**
   - Registerkonsistenz in Übersetzungen beibehalten
   - Domänenspezifische Terminologie anwenden

3. **Inhaltsklassifikation**
   - Text automatisch nach Formalität und Domäne kategorisieren
   - Inhalte an geeignete Prüfer oder Systeme weiterleiten

4. **Korpuslinguistik**
   - Getaggte Korpora für linguistische Forschung erstellen
   - Register- und Domänenvariation studieren

## Validierungsregeln

1. **Subtag-Länge**: Jeder Subtag nach `x-` muss 8 Zeichen oder weniger haben
2. **Reihenfolge**: Klassifikatoren können in beliebiger Reihenfolge nach `x-` erscheinen
3. **Eindeutigkeit**: Jeder Klassifikatortyp sollte nur einmal pro Tag erscheinen (außer `conf`, das mehrmals erscheinen kann)
4. **Groß-/Kleinschreibung**: Tags sollten kleingeschrieben sein (gemäß BCP 47 nicht case-sensitiv)
5. **Magische Tags**: Kurzform-Tags sind einzelne Zeichen; `q`, `3`-`9` sind für zukünftige Verwendung reserviert
6. **Mischung**: Lang- und Kurzformen können innerhalb desselben Tags gemischt werden
7. **Proto-Tags**: Müssen mit `x-` beginnen und SOLLTEN ISO 639-5-Codes verwenden, wenn verfügbar (z.B. `x-proto-sla` nicht `x-proto-slavic`)
8. **Konfidenz**: Der `conf`/`c` Klassifikator gilt für den unmittelbar vorhergehenden Klassifikator
9. **Numerische Werte**: Müssen innerhalb definierter Bereiche liegen (0-5 für Tabu, 0-10 für Expertise, 0-100 für Prozentwerte)
10. **Datumsformat**: Daten verwenden ISO 8601 ohne Interpunktion (YYYY, YYYYMM oder YYYYMMDD)

## Kompatibilität

Das LVTag-Format ist vollständig kompatibel mit:
- BCP 47 (RFC 5646)
- ISO 639 Sprachcodes
- IANA Language Subtag Registry
- Unicode CLDR

## Vorteile

1. **Präzision**: Ermöglicht feinkörnige Sprachvarietätsidentifikation
2. **Erweiterbarkeit**: Neue Register und Domänen können hinzugefügt werden
3. **Standardbasiert**: Aufgebaut auf etabliertem BCP 47 Private-Use-Mechanismus
4. **Maschinenlesbar**: Systematisches Format ermöglicht automatisierte Verarbeitung
5. **Menschenlesbar**: Klare, beschreibende Subtags
6. **Flexibilität**: Unterstützung für sowohl ausführliche Langform- als auch prägnante Kurzform-Tags
7. **Kürze**: Kurze magische Tags ermöglichen kompakte Darstellung bei Beibehaltung der Klarheit

## Zukünftige Erweiterungen

LVTag ist so konzipiert, dass es sich mit den Bedürfnissen der Sprachtechnologie-Community entwickelt. Wir begrüßen Vorschläge für neue Klassifikatoren, Verbesserungen bestehender und Feedback aus realen Implementierungen.

Um Erweiterungen vorzuschlagen oder zur Spezifikation beizutragen:
- Öffnen Sie ein Issue auf [github.com/lvtag/spec](https://github.com/lvtag/spec)
- Beteiligen Sie sich an der Diskussion über bestehende Vorschläge
- Teilen Sie Ihre Implementierungserfahrungen
- Reichen Sie Pull Requests für Dokumentationsverbesserungen ein

Reservierte Einzelzeichencodes (`q`, `3`-`9`) sind für zukünftige standardisierte Erweiterungen verfügbar.

## Referenzen

- [BCP 47: Tags zur Identifizierung von Sprachen](https://www.rfc-editor.org/rfc/rfc5646.html)
- [IANA Language Subtag Registry](https://www.iana.org/assignments/language-subtag-registry/)

---

## Lizenz und Patentgewährung

Diese Spezifikation wird unter der **CC0 1.0 Universal (Public Domain Dedication)** veröffentlicht.

**Warum CC0**: Um maximale Akzeptanz und Implementierungsfreiheit zu gewährleisten, wird LVTag in die Public Domain gestellt. Das bedeutet:
- Keine Erlaubnis zur Nutzung, Implementierung oder Modifikation erforderlich
- Keine Namensnennung erforderlich (obwohl geschätzt)
- Keine rechtlichen Hindernisse für kommerzielle oder behördliche Nutzung
- Kompatibel mit allen Softwarelizenzen
- Verwendet von großen Standards wie Unicode CLDR

**Patentgewährung**: Alle Patente, die die LVTag-Spezifikation abdecken, werden hiermit lizenzgebührenfrei für jede Implementierung lizenziert, die dieser Spezifikation entspricht.

**Keine Befürwortung**: Die Verwendung von LVTag impliziert keine Befürwortung durch die Spezifikationsautoren.

Soweit gesetzlich möglich, hat **Danslav Slavenskoj** auf alle Urheber- und verwandten oder Nachbarrechte an der Language Variant Tag (LVTag) Format Spezifikation verzichtet. Dieses Werk wird veröffentlicht aus: Vereinigte Staaten von Amerika.
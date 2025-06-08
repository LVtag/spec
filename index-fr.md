---
layout: default
title: Spécification du Language Variant Tag (LVTag)
lang: fr
description: "LVTag est une approche systématique de la classification linguistique qui étend BCP 47 en utilisant des sous-étiquettes privées pour l'identification précise des variétés linguistiques à travers les dimensions de formalité, politesse, domaine et orthographe."
---

<div align="center">
  <img src="/LVTAG_LOGO.png" alt="LVTag Logo" width="400">
</div>

# Spécification LVTag

**Version 1.0**  
**Créé par Danslav Slavenskoj**  
**Date : Mai 2025**

**Langues** : [中文简体](/index-zh.md)  [中文繁體](/index-zh-hant.md)  [Čeština](/index-cs.md)  [Deutsch](/index-de.md)  [English](/index.md)  [Español](/index-es.md)  Français  [Hrvatski](/index-hr.md)  [日本語](/index-ja.md)  [한국어](/index-ko.md)  [Polski](/index-pl.md)  [Português](/index-pt.md)  [Русский](/index-ru.md)  [Српски](/index-sr.md)

## Liens rapides

- [Schéma JSON](/lvtag-schema.json) - Schéma de validation complet pour le format LVTag
- [Définitions des classificateurs](/lvtag-classifiers.json) - Spécifications des classificateurs lisibles par machine
- [Spécification](#spécification-du-format) - Aller aux détails du format
- [Exemples](#exemples-dimplémentation) - Voir LVTag en action

## Aperçu

Le format Language Variant Tag (LVTag) est une approche systématique de la classification des langues qui étend la norme BCP 47 en utilisant des sous-étiquettes à usage privé. Il permet l'identification précise des variétés linguistiques à travers plusieurs dimensions, y compris la formalité, la politesse, le domaine et l'orthographe.

### Avantages clés

**Rigueur de classification** : LVTag apporte une organisation systématique au marquage linguistique en fournissant des dimensions claires et séparées pour différents types de variation. Contrairement aux sous-étiquettes et systèmes existants qui mélangent différentes catégories au même niveau, LVTag maintient une séparation stricte entre formalité, politesse, domaine et autres dimensions.

**Compatibilité avec les normes** : LVTag est entièrement compatible avec BCP 47 (RFC 5646) et fonctionne parfaitement avec :
- Registre des sous-étiquettes de langue IANA
- Codes de langue ISO 639
- Unicode CLDR
- Balises de langue W3C
- En-têtes HTTP Accept-Language
- Attributs lang XML
- Attributs lang HTML

**Intégration technologique** : Les balises LVTag peuvent être utilisées directement dans :
- Pipelines de traitement du langage naturel (NLP)
- Systèmes de traduction automatique
- Systèmes de gestion de contenu (CMS)
- Bibliothèques de détection de langue
- Moteurs de recherche et systèmes de récupération d'information
- Applications web et API
- Flux de travail de localisation

**Cas d'usage** :
- **Ciblage d'audience** : Adapter le contenu aux audiences appropriées en fonction du registre et du domaine
- **Qualité de traduction** : Maintenir des niveaux appropriés de formalité et de politesse dans la traduction automatique
- **Apprentissage des langues** : Enseigner aux apprenants le registre approprié pour différents contextes
- **Linguistique de corpus** : Construire des corpus précisément étiquetés pour la recherche
- **Analyse des médias sociaux** : Classer le contenu généré par les utilisateurs par registre et domaine
- **Service client** : Router les messages en fonction de la formalité et du domaine vers les agents appropriés

## Justification

Bien que BCP 47 fournisse un excellent support pour identifier les langues, les écritures et les régions, il manque de mécanismes standardisés pour capturer la variation sociolinguistique au sein d'une langue. Les normes actuelles n'abordent pas :

- **Variation de registre** : Aucun moyen de distinguer entre les variétés formelles et informelles de la même langue
- **Niveaux de politesse** : Critique pour les langues comme le japonais, le coréen et le thaï où la politesse est encodée grammaticalement
- **Langage spécifique au domaine** : Aucune norme pour marquer les variétés techniques, médicales ou juridiques du langage
- **Sociolectes** : Aucun mécanisme pour identifier les variétés de groupes sociaux (langage des jeunes, jargon professionnel)
- **Étapes historiques** : Support limité pour distinguer les formes classiques des formes modernes
- **Gradients de formalité** : Aucune échelle numérique pour le traitement informatique du registre
- **Proto-langues** : Encodage incohérent - certaines proto-langues ont des codes ISO (par ex., `ine` pour PIE) tandis que d'autres non, et les codes de famille ISO 639-5 ne sont pas valides dans les balises BCP 47, créant un paysage confus pour la linguistique historique
- **Variation orthographique** : Bien que BCP 47 gère les écritures, il ne capture pas efficacement les variations au sein des écritures (réformes orthographiques, systèmes de romanisation, normes concurrentes) qui affectent fondamentalement le traitement du texte, la recherche et la vérification orthographique

LVTag comble ces lacunes en utilisant le mécanisme d'extension à usage privé de BCP 47 (`-x-`), fournissant un moyen systématique et lisible par machine d'encoder ces dimensions critiques de la variation linguistique tout en maintenant une compatibilité ascendante complète.

### Classification linguistique précise

L'avènement des grands modèles de langage et des outils NLP sophistiqués a rendu la classification précise des variétés linguistiques non seulement utile mais essentielle. Les systèmes modernes doivent :

- Générer du texte approprié à des contextes spécifiques (formel vs informel, poli vs familier)
- S'entraîner sur des corpus correctement classifiés pour éviter de mélanger les registres de manière inappropriée
- Fournir des réponses culturellement et contextuellement appropriées
- Gérer avec précision le changement de code et le contenu multilingue
- Préserver la cohérence stylistique lors de la traduction ou de la transformation du texte
- Filtrer les données d'entraînement en fonction de la formalité, du domaine ou d'autres caractéristiques
- Adapter la sortie pour correspondre aux préférences ou aux exigences de l'utilisateur

LVTag fournit les métadonnées granulaires nécessaires pour comprendre non seulement quelle langue est utilisée, mais comment elle est utilisée, permettant des pipelines de traitement du langage plus nuancés et appropriés.

## Spécification du format

### Structure de base

```
language-x-[classifier]-[value]-[classifier2]-[value2]...
```

Où :
- `language` est une sous-étiquette de langue principale BCP 47 valide (par ex., `en`, `ko`, `ja`)
- `x` indique le début des sous-étiquettes à usage privé
- `classifier` est un identifiant de catégorie (voir Balises magiques ci-dessous)
- `value` est la classification spécifique au sein de cette catégorie

### Balises magiques

LVTag prend en charge les classificateurs « magiques » sous forme longue et courte pour plus de flexibilité :

| Forme longue | Forme courte | Description |
|-----------|------------|-------------|
| `ortho` | `w` | Variante orthographique |
| `form` | `f` | Niveau de formalité (échelle 1-5) |
| `polite` | `p` | Niveau de politesse/respect (échelle 1-5) |
| `domain` | `d` | Vocabulaire spécialisé ou contexte professionnel |
| `geo` | `g` | Variété géographique ou régionale |
| `proto` | `a` | Proto-langue ou langue reconstruite |
| `hist` | `h` | Période historique ou stade d'une langue |
| `genre` | `e` | Genre textuel ou style littéraire |
| `medium` | `m` | Média de communication (parlé, écrit, numérique) |
| `socio` | `s` | Sociolecte ou variété de groupe social |
| `modality` | `o` | Mode de production du langage |
| `register` | `r` | Registre linguistique |
| `pragma` | `u` | Fonction communicative |
| `temporal` | `t` | Marquage temporel |
| `evidence` | `v` | Source d'information |
| `affect` | `k` | Ton émotionnel |
| `age` | `n` | Variété d'âge/génération |
| `gender` | `i` | Variété de genre |
| `expert` | `b` | Niveau d'expertise |
| `interact` | `2` | Structure interactionnelle |
| `prosody` | `y` | Caractéristiques prosodiques |
| `lexical` | `l` | Densité lexicale (0-100) |
| `syntax` | `z` | Complexité syntaxique (0-100) |
| `start` | `0` | Date de début (ISO 8601 sans ponctuation) |
| `end` | `1` | Date de fin (ISO 8601 sans ponctuation) |
| `taboo` | `j` | Niveau de contenu tabou/vulgaire (échelle 0-5) |
| `conf` | `c` | Score de confiance (0-100) pour la balise précédente |
| — | `q`, `3`-`9` | Réservé pour usage futur |

### Classificateurs

#### 1. Classificateur orthographique (`ortho` ou `w`)
Identifie les conventions orthographiques spécifiques ou les variantes du système d'écriture au-delà des balises d'écriture standard.

Format :
- Long : `language-x-ortho-[variant]`
- Court : `language-x-w-[variant]`

Exemples (combinés avec des balises d'écriture standard) :
- `az-Latn-x-ortho-new` ou `az-Latn-x-w-new` - Azéri écriture latine, nouvelle orthographe
- `de-Latn-x-ortho-1901` ou `de-Latn-x-w-1901` - Allemand écriture latine, orthographe de 1901
- `zh-Hans-x-ortho-pinyin` ou `zh-Hans-x-w-pinyin` - Chinois simplifié avec pinyin
- `yi-Hebr-x-ortho-yivo` ou `yi-Hebr-x-w-yivo` - Yiddish écriture hébraïque, orthographe YIVO

#### 2. Classificateur de formalité (`form` ou `f`)
Identifie le niveau de formalité de l'usage linguistique.

Format :
- Long : `language-x-form-[1-5]`
- Court : `language-x-f-[1-5]`

Échelle de formalité :
- 1 = Le plus formel (documents écrits, discours officiels)
- 2 = Formel (réunions d'affaires, écriture académique)
- 3 = Neutre/standard (actualités, conversation générale)
- 4 = Informel (conversation décontractée, courriels à des amis)
- 5 = Le plus familier (conversation intime, argot)

Exemples :
- `ko-x-form-1` ou `ko-x-f-1` - Coréen le plus formel
- `en-x-form-3` ou `en-x-f-3` - Anglais neutre
- `ja-x-form-5` ou `ja-x-f-5` - Japonais le plus familier

#### 3. Classificateur de politesse (`polite` ou `p`)
Identifie le niveau de politesse/respect de l'usage linguistique.

Format :
- Long : `language-x-polite-[1-5]`
- Court : `language-x-p-[1-5]`

Échelle de politesse :
- 1 = Le plus respectueux/déférent (adresse royale, contextes religieux)
- 2 = Très poli (honorifiques formels, discours respectueux)
- 3 = Poli/neutre (politesse standard)
- 4 = Familier (entre égaux, amis)
- 5 = Intime/simple (famille, amis très proches)

Exemples :
- `ko-x-polite-1` ou `ko-x-p-1` - Coréen de plus haut respect
- `ja-x-polite-2` ou `ja-x-p-2` - Japonais très poli
- `th-x-polite-3` ou `th-x-p-3` - Thaï poli standard

#### 4. Classificateur de domaine (`domain` ou `d`)
Identifie le vocabulaire spécialisé ou le contexte professionnel.

Format :
- Long : `language-x-domain-[domain_type]`
- Court : `language-x-d-[domain_type]`

Exemples :
- `en-x-domain-legal` ou `en-x-d-legal` - Anglais juridique
- `ja-x-domain-med` ou `ja-x-d-med` - Japonais médical
- `ko-x-domain-business` ou `ko-x-d-business` - Coréen des affaires
- `ja-x-domain-tech` ou `ja-x-d-tech` - Japonais technique
- `en-x-domain-fin` ou `en-x-d-fin` - Anglais financier

#### 5. Classificateur géographique (`geo` ou `g`)
Identifie les variétés linguistiques régionales ou géographiques.

Format :
- Long : `language-x-geo-[region]`
- Court : `language-x-g-[region]`

Exemples :
- `ko-x-geo-gyeong` ou `ko-x-g-gyeong` - Coréen de Gyeongsang (경상도)
- `ko-x-geo-jeolla` ou `ko-x-g-jeolla` - Coréen de Jeolla (전라도)
- `es-x-geo-riopla` ou `es-x-g-riopla` - Espagnol rioplatense
- `pt-x-geo-nordeste` ou `pt-x-g-nordeste` - Portugais du nord-est brésilien

#### 6. Classificateur proto (`proto` ou `a`)
Identifie les proto-langues ou les langues historiques reconstruites.

Format :
- Long : `x-proto-[iso639-5_code if available]`
- Court : `x-a-[iso639-5_code if available]`

Règles :
- DOIT utiliser les codes de famille de langues ISO 639-5 lorsqu'ils sont disponibles
- Utiliser des identifiants descriptifs uniquement lorsqu'aucun code ISO 639-5 n'existe

Exemples utilisant les codes ISO 639-5 :
- `x-proto-ine` ou `x-a-ine` - Proto-indo-européen
- `x-proto-gem` ou `x-a-gem` - Proto-germanique
- `x-proto-sla` ou `x-a-sla` - Proto-slave
- `x-proto-sem` ou `x-a-sem` - Proto-sémitique
- `x-proto-cel` ou `x-a-cel` - Proto-celtique
- `x-proto-ira` ou `x-a-ira` - Proto-iranien
- `x-proto-inc` ou `x-a-inc` - Proto-indo-aryen
- `x-proto-bat` ou `x-a-bat` - Proto-baltique
- `x-proto-roa` ou `x-a-roa` - Proto-roman
- `x-proto-trk` ou `x-a-trk` - Proto-turc

Exemples sans codes ISO 639-5 (descriptifs, plus de trois caractères) :
- `x-proto-baltslav` ou `x-a-baltslav` - Proto-balto-slave (pas de code ISO 639-5)

Note :
- Les codes de famille de langues (ISO 639-5) ne sont PAS valides comme balises de langue principale BCP 47 standard, c'est pourquoi nous les avons implémentés en utilisant x-proto
- Ils sont valides et préférés dans les extensions à usage privé (après `x-`)
- Par conséquent, toutes les balises de proto-langue doivent commencer par `x-` pour se conformer à BCP 47

#### 7. Classificateur historique (`hist` ou `h`)
Identifie les périodes historiques ou les stades d'une langue.

Format :
- Long : `language-x-hist-[period]`
- Court : `language-x-h-[period]`

Exemples :
- `en-x-hist-old` ou `en-x-h-old` - Période du vieil anglais
- `en-x-hist-middle` ou `en-x-h-middle` - Période du moyen anglais
- `ja-x-hist-kobun` ou `ja-x-h-kobun` - Japonais classique (古文)
- `ko-x-hist-hunmin` ou `ko-x-h-hunmin` - Coréen moyen (훈민정음 période)
- `el-x-hist-koine` ou `el-x-h-koine` - Grec koinè (Κοινή)
- `sa-x-hist-vedic` ou `sa-x-h-vedic` - Sanskrit védique (वैदिक)

#### 8. Classificateur de genre (`genre` ou `e`)
Identifie le genre textuel ou le style littéraire.

Format :
- Long : `language-x-genre-[genre_type]`
- Court : `language-x-e-[genre_type]`

Exemples :
- `en-x-genre-news` ou `en-x-e-news` - Anglais journalistique
- `ja-x-genre-manga` ou `ja-x-e-manga` - Japonais de manga (漫画)
- `ko-x-genre-webtoon` ou `ko-x-e-webtoon` - Coréen de webtoon (웹툰)
- `zh-x-genre-shi` ou `zh-x-e-shi` - Poésie chinoise (詩)
- `fr-x-genre-bd` ou `fr-x-e-bd` - Bande dessinée française
- `de-x-genre-marchen` ou `de-x-e-marchen` - Contes de fées allemands (Märchen)

#### 9. Classificateur de média (`medium` ou `m`)
Identifie le média de communication.

Format :
- Long : `language-x-medium-[medium_type]`
- Court : `language-x-m-[medium_type]`

Exemples :
- `en-x-medium-spoken` ou `en-x-m-spoken` - Anglais parlé
- `ko-x-medium-digital` ou `ko-x-m-digital` - Coréen numérique/en ligne
- `ja-x-medium-written` ou `ja-x-m-written` - Japonais écrit
- `hi-x-medium-bcast` ou `hi-x-m-bcast` - Hindi de diffusion
- `zh-x-medium-sms` ou `zh-x-m-sms` - Chinois SMS/message texte

#### 10. Classificateur socio (`socio` ou `s`)
Identifie le sociolecte ou les variétés de groupes sociaux.

Format :
- Long : `language-x-socio-[social_group]`
- Court : `language-x-s-[social_group]`

Exemples :
- `en-x-socio-academic` ou `en-x-s-academic` - Sociolecte académique
- `en-x-socio-urban` ou `en-x-s-urban` - Sociolecte urbain
- `es-x-socio-juvenil` ou `es-x-s-juvenil` - Sociolecte jeune espagnol
- `fr-x-socio-jeune` ou `fr-x-s-jeune` - Sociolecte jeune français
- `de-x-socio-jugend` ou `de-x-s-jugend` - Sociolecte jeune allemand (Jugendsprache)
- `ko-x-socio-online` ou `ko-x-s-online` - Sociolecte coréen en ligne

#### 11. Classificateur de modalité (`modality` ou `o`)
Identifie le mode fondamental de production du langage.

Format :
- Long : `language-x-modality-[mode]`
- Court : `language-x-o-[mode]`

Exemples :
- `en-x-modality-spoken` ou `en-x-o-spoken` - Anglais parlé
- `en-x-modality-written` ou `en-x-o-written` - Anglais écrit
- `asl-x-modality-signed` ou `asl-x-o-signed` - Langue des signes américaine
- `en-x-modality-multi` ou `en-x-o-multi` - Anglais multimodal (parole + gestes)
- `fr-x-modality-tactile` ou `fr-x-o-tactile` - Français tactile (pour les sourds-aveugles)

#### 12. Classificateur de registre (`register` ou `r`)
Identifie le registre linguistique ou la variété fonctionnelle de l'usage linguistique.

Format :
- Long : `language-x-register-[register_type]`
- Court : `language-x-r-[register_type]`

Exemples :
- `en-x-register-frozen` ou `en-x-r-frozen` - Registre figé (prières, serments)
- `en-x-register-formal` ou `en-x-r-formal` - Registre formel (articles académiques)
- `en-x-register-consult` ou `en-x-r-consult` - Registre consultatif (professionnel)
- `en-x-register-casual` ou `en-x-r-casual` - Registre familier (amis)
- `en-x-register-intimate` ou `en-x-r-intimate` - Registre intime (famille)

#### 13. Classificateur de fonction pragmatique (`pragma` ou `u`)
Identifie la fonction communicative ou l'acte de parole.

Format :
- Long : `language-x-pragma-[function]`
- Court : `language-x-u-[function]`

Exemples :
- `en-x-pragma-request` ou `en-x-u-request` - Fonction de demande
- `ja-x-pragma-apology` ou `ja-x-u-apology` - Fonction d'excuse
- `es-x-pragma-complmnt` ou `es-x-u-complmnt` - Fonction de compliment
- `ar-x-pragma-greeting` ou `ar-x-u-greeting` - Fonction de salutation
- `zh-x-pragma-refusal` ou `zh-x-u-refusal` - Fonction de refus

#### 14. Classificateur de marquage temporel (`temporal` ou `t`)
Identifie les aspects temporels ou les modèles d'utilisation du temps.

Format :
- Long : `language-x-temporal-[aspect]`
- Court : `language-x-t-[aspect]`

Exemples :
- `en-x-temporal-past` ou `en-x-t-past` - Discours orienté vers le passé
- `ja-x-temporal-nonpast` ou `ja-x-t-nonpast` - Focus non-passé
- `id-x-temporal-atemprl` ou `id-x-t-atemprl` - Intemporel/atemporel
- `fr-x-temporal-future` ou `fr-x-t-future` - Orienté vers le futur
- `zh-x-temporal-aspect` ou `zh-x-t-aspect` - Focus aspectuel

#### 15. Classificateur d'évidentialité (`evidence` ou `v`)
Identifie le marquage de la source d'information.

Format :
- Long : `language-x-evidence-[source]`
- Court : `language-x-v-[source]`

Exemples :
- `qu-x-evidence-direct` ou `qu-x-v-direct` - Témoin direct
- `tr-x-evidence-hearsay` ou `tr-x-v-hearsay` - Ouï-dire/rapporté
- `ja-x-evidence-infer` ou `ja-x-v-infer` - Inférentiel
- `en-x-evidence-assume` ou `en-x-v-assume` - Supposé
- `de-x-evidence-quote` ou `de-x-v-quote` - Citatif

#### 16. Classificateur d'affect/émotion (`affect` ou `k`)
Identifie le ton émotionnel ou l'affect.

Format :
- Long : `language-x-affect-[emotion]`
- Court : `language-x-k-[emotion]`

Exemples :
- `en-x-affect-angry` ou `en-x-k-angry` - Ton colérique
- `ja-x-affect-humble` ou `ja-x-k-humble` - Affect humble
- `es-x-affect-joyful` ou `es-x-k-joyful` - Expression joyeuse
- `ko-x-affect-sad` ou `ko-x-k-sad` - Triste/mélancolique
- `fr-x-affect-neutral` ou `fr-x-k-neutral` - Affect neutre

#### 17. Classificateur d'âge/génération (`age` ou `n`)
Identifie les variétés linguistiques liées à l'âge ou à la génération.

Format :
- Long : `language-x-age-[generation]`
- Court : `language-x-n-[generation]`

Exemples :
- `en-x-age-child` ou `en-x-n-child` - Langage enfantin
- `ja-x-age-teen` ou `ja-x-n-teen` - Langage adolescent
- `ko-x-age-elder` ou `ko-x-n-elder` - Langage des aînés
- `es-x-age-genz` ou `es-x-n-genz` - Génération Z
- `zh-x-age-millenl` ou `zh-x-n-millenl` - Langage millénial

#### 18. Classificateur de genre (`gender` ou `i`)
Identifie les variétés linguistiques liées au genre.

Format :
- Long : `language-x-gender-[identity]`
- Court : `language-x-i-[identity]`

#### 19. Classificateur du niveau d'expertise (`expert` ou `b`)
Identifie le niveau d'expertise du domaine sur une échelle de 0 à 10.

Format :
- Long : `language-x-expert-[0-10]`
- Court : `language-x-b-[0-10]`

Échelle d'expertise :
- 0 = Aucune connaissance
- 1-2 = Débutant
- 3-4 = Intermédiaire
- 5-6 = Avancé
- 7-8 = Expert
- 9-10 = Maître/Autorité

Exemples :
- `en-x-expert-0` ou `en-x-b-0` - Aucune expertise
- `de-x-expert-3` ou `de-x-b-3` - Niveau intermédiaire
- `ja-x-expert-7` ou `ja-x-b-7` - Niveau expert
- `es-x-expert-9` ou `es-x-b-9` - Niveau maître
- `zh-x-expert-5` ou `zh-x-b-5` - Niveau avancé

#### 20. Classificateur de structure interactionnelle (`interact` ou `2`)
Identifie les modèles conversationnels ou interactionnels.

Format :
- Long : `language-x-interact-[structure]`
- Court : `language-x-2-[structure]`

Exemples :
- `en-x-interact-turn` ou `en-x-2-turn` - Tour de parole
- `ja-x-interact-overlap` ou `ja-x-2-overlap` - Parole chevauchante
- `es-x-interact-monolog` ou `es-x-2-monolog` - Monologique
- `ar-x-interact-dialog` ou `ar-x-2-dialog` - Dialogique
- `zh-x-interact-multi` ou `zh-x-2-multi` - Multi-parties

#### 21. Classificateur de caractéristiques prosodiques (`prosody` ou `y`)
Identifie les caractéristiques prosodiques ou suprasegmentales.

Format :
- Long : `language-x-prosody-[feature]`
- Court : `language-x-y-[feature]`

Exemples :
- `en-x-prosody-stress` ou `en-x-y-stress` - Rythmé par l'accent
- `ja-x-prosody-pitch` ou `ja-x-y-pitch` - Accent de hauteur
- `fr-x-prosody-syllable` ou `fr-x-y-syllable` - Rythmé par la syllabe
- `zh-x-prosody-tone` ou `zh-x-y-tone` - Modèles tonals
- `es-x-prosody-rhythm` ou `es-x-y-rhythm` - Modèles rythmiques

#### 22. Classificateur de densité lexicale (`lexical` ou `l`)
Identifie la densité lexicale comme valeur numérique (0-100).

Format :
- Long : `language-x-lexical-[0-100]`
- Court : `language-x-l-[0-100]`

Exemples :
- `en-x-lexical-20` ou `en-x-l-20` - Faible densité (20%)
- `de-x-lexical-55` ou `de-x-l-55` - Densité moyenne (55%)
- `ja-x-lexical-75` ou `ja-x-l-75` - Haute densité (75%)
- `es-x-lexical-40` ou `es-x-l-40` - Densité modérée (40%)
- `zh-x-lexical-85` ou `zh-x-l-85` - Très haute densité (85%)

#### 23. Classificateur de complexité syntaxique (`syntax` ou `z`)
Identifie la complexité syntaxique comme valeur numérique (0-100).

Format :
- Long : `language-x-syntax-[0-100]`
- Court : `language-x-z-[0-100]`

Exemples :
- `en-x-syntax-15` ou `en-x-z-15` - Syntaxe simple (15%)
- `de-x-syntax-70` ou `de-x-z-70` - Syntaxe complexe (70%)
- `ja-x-syntax-45` ou `ja-x-z-45` - Complexité modérée (45%)
- `es-x-syntax-30` ou `es-x-z-30` - Faible complexité (30%)
- `zh-x-syntax-60` ou `zh-x-z-60` - Haute complexité (60%)

#### 24. Classificateur de date de début (`start` ou `0`)
Identifie la date de début de l'utilisation linguistique (format ISO 8601 sans ponctuation).

Format :
- Long : `language-x-start-[YYYYMMDD]`
- Court : `language-x-0-[YYYYMMDD]`

Formats de date :
- Date complète : YYYYMMDD
- Année-mois : YYYYMM
- Année seulement : YYYY

Exemples :
- `en-x-start-20240315` ou `en-x-0-20240315` - Anglais commençant le 15 mars 2024
- `ja-x-start-19890108` ou `ja-x-0-19890108` - Japonais commençant le 8 janvier 1989
- `es-x-start-202403` ou `es-x-0-202403` - Espagnol commençant en mars 2024

#### 25. Classificateur de date de fin (`end` ou `1`)
Identifie la date de fin de l'utilisation linguistique (format ISO 8601 sans ponctuation).

Format :
- Long : `language-x-end-[YYYYMMDD]`
- Court : `language-x-1-[YYYYMMDD]`

Formats de date :
- Date complète : YYYYMMDD
- Année-mois : YYYYMM
- Année seulement : YYYY

Exemples :
- `en-x-end-20240415` ou `en-x-1-20240415` - Anglais se terminant le 15 avril 2024
- `ja-x-end-20190430` ou `ja-x-1-20190430` - Japonais se terminant le 30 avril 2019
- `es-x-end-202412` ou `es-x-1-202412` - Espagnol se terminant en décembre 2024

#### 26. Classificateur de tabou (`taboo` ou `j`)
Identifie le niveau de contenu tabou, vulgaire ou offensant.

Format :
- Long : `language-x-taboo-[0-5]`
- Court : `language-x-j-[0-5]`

Exemples :
- `en-x-taboo-0` ou `en-x-j-0` - Aucun contenu tabou
- `en-x-taboo-3` ou `en-x-j-3` - Niveau de tabou modéré
- `ja-x-form-5-taboo-4` ou `ja-x-f-5-j-4` - Japonais très familier avec un niveau de tabou élevé

#### 27. Classificateur de confiance (`conf` ou `c`)
Indique le score de confiance pour le classificateur immédiatement précédent.

Format :
- Long : `language-x-[classifier]-[value]-conf-[0-100]`
- Court : `language-x-[classifier]-[value]-c-[0-100]`

Comportement spécial :
- Le score de confiance s'applique au classificateur immédiatement précédent
- Plusieurs scores de confiance peuvent être utilisés pour différents classificateurs
- S'il n'y a pas de classificateur précédent, la confiance s'applique à la balise de langue de base

Exemples :
- `en-x-form-3-conf-95` ou `en-x-f-3-c-95` - Formalité neutre avec 95% de confiance
- `ko-x-polite-2-conf-80-domain-med-conf-60` ou `ko-x-p-2-c-80-d-med-c-60` - Très poli (80% de confiance) coréen médical (60% de confiance)
- `ja-x-hist-kobun-conf-100` ou `ja-x-h-kobun-c-100` - Japonais classique avec 100% de confiance
- `x-proto-ine-conf-75` ou `x-a-ine-c-75` - Proto-indo-européen avec 75% de confiance

### Classifications multiples

LVTag prend en charge plusieurs classificateurs dans une seule balise pour fournir une identification linguistique précise. Les formes longues et courtes peuvent être mélangées :

```
ko-x-form-4-domain-business
ko-x-f-4-d-business
ko-x-form-4-polite-2-domain-business
ko-x-f-4-p-2-d-business
```

Les exemples ci-dessus montrent le coréen avec une formalité informelle (4) mais un discours poli (2) dans un contexte commercial.

## Valeurs valides

**Note** : Toutes les valeurs doivent avoir 8 caractères ou moins pour se conformer aux restrictions de longueur des sous-étiquettes BCP 47. Bien que les valeurs spécifiques pour de nombreux classificateurs doivent être établies par l'usage expert et le consensus communautaire, les échelles numériques, les formats de date et les valeurs de base énumérées ci-dessous sont définis dans cette norme.

### Échelle de formalité (Universelle)

| Niveau | Description | Exemples |
|-------|-------------|----------|
| 1 | Le plus formel | Documents juridiques, cérémonies officielles, articles académiques |
| 2 | Formel | Lettres d'affaires, articles de presse, présentations |
| 3 | Neutre | Conversation standard, courriel, écriture générale |
| 4 | Informel | Conversation décontractée, blogs personnels, messages texte |
| 5 | Le plus familier | Argot, conversation intime, médias sociaux |

### Échelle de politesse (Universelle)

| Niveau | Description | Exemples |
|-------|-------------|----------|
| 1 | Le plus respectueux | Adresse royale, chefs religieux, respect des aînés |
| 2 | Très poli | Service client, réunions formelles, enseignants |
| 3 | Poli/neutre | Interactions standard, collègues |
| 4 | Familier | Amis, pairs, connaissances occasionnelles |
| 5 | Intime/simple | Famille proche, partenaires intimes |

### Échelle d'expertise (Universelle)

| Niveau | Description |
|-------|-------------|
| 0 | Aucune connaissance |
| 1-2 | Débutant |
| 3-4 | Intermédiaire |
| 5-6 | Avancé |
| 7-8 | Expert |
| 9-10 | Maître/Autorité |

### Échelle de tabou (Universelle)

| Niveau | Description |
|-------|-------------|
| 0 | Aucun contenu tabou |
| 1 | Tabou léger |
| 2 | Tabou faible |
| 3 | Tabou modéré |
| 4 | Tabou élevé |
| 5 | Tabou extrême |

### Échelle de densité lexicale (Universelle)

| Niveau | Description |
|-------|-------------|
| 0-20 | Très faible densité |
| 21-40 | Faible densité |
| 41-60 | Densité modérée |
| 61-80 | Haute densité |
| 81-100 | Très haute densité |

### Échelle de complexité syntaxique (Universelle)

| Niveau | Description |
|-------|-------------|
| 0-20 | Très simple |
| 21-40 | Simple |
| 41-60 | Complexité modérée |
| 61-80 | Complexe |
| 81-100 | Très complexe |

### Valeurs de domaine

| Valeur | Description |
|-------|-------------|
| `legal` | Terminologie juridique |
| `med` | Terminologie médicale |
| `tech` | Technique/IT |
| `business` | Affaires/entreprise |
| `fin` | Finance/banque |
| `acad` | Académique/savant |
| `sci` | Scientifique/recherche |

## Exemples d'implémentation

### Classificateur unique (Forme longue)
```
# Coréen le plus formel
ko-x-form-1

# Japonais très poli
ja-x-polite-2

# Anglais juridique
en-x-domain-legal

# Coréen de Gyeongsang
ko-x-geo-gyeong

# Proto-indo-européen
x-proto-ine
```

### Classificateur unique (Forme courte)
```
# Coréen le plus formel
ko-x-f-1

# Japonais très poli
ja-x-p-2

# Anglais juridique
en-x-d-legal

# Coréen de Gyeongsang
ko-x-g-gyeong

# Proto-indo-européen
x-a-ine
```

### Classificateurs multiples
```
# Langue d'affaires coréenne informelle mais polie
ko-x-form-4-polite-2-domain-business
ko-x-f-4-p-2-d-business

# Langue médicale japonaise formelle et respectueuse
ja-x-form-1-polite-1-domain-med
ja-x-f-1-p-1-d-med

# Vietnamien du sud avec formalité neutre, discours poli, domaine technique
vi-x-geo-southern-form-3-polite-2-domain-tech
vi-x-g-southern-f-3-p-2-d-tech

# Classification complexe avec plusieurs dimensions
en-x-h-middle-e-poetry-m-written-f-1
ja-x-f-2-p-1-d-med-h-kobun-m-written

# Variétés linguistiques montrant la distinction formalité/politesse
ko-x-f-5-p-2  # Très familier mais poli (à un ami plus âgé)
ko-x-f-1-p-4  # Très formel mais familier (écrit à un pair)
ja-x-f-4-p-1  # Formalité familière mais plus haut respect
en-x-f-5-j-4  # Anglais très familier avec un niveau de tabou élevé
```

## Cas d'usage

1. **Applications d'apprentissage des langues**
   - Enseigner le registre approprié pour différents contextes sociaux
   - Fournir une formation de vocabulaire spécifique au domaine

2. **Traduction automatique**
   - Maintenir la cohérence du registre dans les traductions
   - Appliquer la terminologie spécifique au domaine

3. **Classification du contenu**
   - Catégoriser automatiquement le texte par formalité et domaine
   - Router le contenu vers les réviseurs ou systèmes appropriés

4. **Linguistique de corpus**
   - Construire des corpus étiquetés pour la recherche linguistique
   - Étudier la variation de registre et de domaine

## Règles de validation

1. **Longueur de sous-étiquette** : Chaque sous-étiquette après `x-` doit avoir 8 caractères ou moins
2. **Ordre** : Les classificateurs peuvent apparaître dans n'importe quel ordre après `x-`
3. **Unicité** : Chaque type de classificateur ne doit apparaître qu'une seule fois par balise (sauf `conf` qui peut apparaître plusieurs fois)
4. **Casse** : Les balises doivent être en minuscules (insensible à la casse selon BCP 47)
5. **Balises magiques** : Les balises de forme courte sont des caractères uniques ; `q`, `3`-`9` sont réservés pour une utilisation future
6. **Mélange** : Les formes longues et courtes peuvent être mélangées dans la même balise
7. **Balises proto** : Doivent commencer par `x-` et DEVRAIENT utiliser les codes ISO 639-5 lorsqu'ils sont disponibles (par ex., `x-proto-sla` pas `x-proto-slavic`)
8. **Confiance** : Le classificateur `conf`/`c` s'applique au classificateur immédiatement précédent
9. **Valeurs numériques** : Doivent être dans les plages définies (0-5 pour tabou, 0-10 pour expertise, 0-100 pour les valeurs en pourcentage)
10. **Format de date** : Les dates utilisent ISO 8601 sans ponctuation (YYYY, YYYYMM ou YYYYMMDD)

## Compatibilité

Le format LVTag est entièrement compatible avec :
- BCP 47 (RFC 5646)
- Codes de langue ISO 639
- Registre des sous-étiquettes de langue IANA
- Unicode CLDR

## Avantages

1. **Précision** : Permet l'identification fine des variétés linguistiques
2. **Extensibilité** : De nouveaux registres et domaines peuvent être ajoutés
3. **Basé sur des normes** : Construit sur le mécanisme d'usage privé BCP 47 établi
4. **Lisible par machine** : Le format systématique permet un traitement automatisé
5. **Lisible par l'homme** : Sous-étiquettes claires et descriptives
6. **Flexibilité** : Support pour les balises de forme longue détaillée et de forme courte concise
7. **Brièveté** : Les balises magiques courtes permettent une représentation compacte tout en maintenant la clarté

## Extensions futures

LVTag est conçu pour évoluer avec les besoins de la communauté technologique linguistique. Nous accueillons les suggestions pour de nouveaux classificateurs, des améliorations aux classificateurs existants, et des retours d'expérience d'implémentations réelles.

Pour proposer des extensions ou contribuer à la spécification :
- Ouvrir un problème sur [github.com/lvtag/spec](https://github.com/lvtag/spec)
- Rejoindre la discussion sur les propositions existantes
- Partager vos expériences d'implémentation
- Soumettre des pull requests pour des améliorations de documentation

Les codes à caractère unique réservés (`q`, `3`-`9`) sont disponibles pour de futures extensions standardisées.

## Références

- [BCP 47 : Balises pour identifier les langues](https://www.rfc-editor.org/rfc/rfc5646.html)
- [Registre des sous-étiquettes de langue IANA](https://www.iana.org/assignments/language-subtag-registry/)

---

## Licence et octroi de brevets

Cette spécification est publiée sous **CC0 1.0 Universal (Dédicace au domaine public)**.

**Pourquoi CC0** : Pour garantir une adoption maximale et une liberté d'implémentation, LVTag est placé dans le domaine public. Cela signifie :
- Aucune autorisation nécessaire pour utiliser, implémenter ou modifier
- Aucune attribution requise (bien qu'appréciée)
- Aucune barrière juridique pour une utilisation commerciale ou gouvernementale
- Compatible avec toutes les licences de logiciels
- Utilisé par des normes majeures comme Unicode CLDR

**Octroi de brevets** : Tous les brevets couvrant la spécification LVTag sont par la présente licenciés sans redevance pour toute implémentation conforme à cette spécification.

**Aucune approbation** : L'utilisation de LVTag n'implique pas l'approbation des auteurs de la spécification.

Dans la mesure permise par la loi, **Danslav Slavenskoj** a renoncé à tous les droits d'auteur et droits connexes ou voisins à la spécification du format Language Variant Tag (LVTag). Ce travail est publié depuis : États-Unis d'Amérique.
EOF < /dev/null
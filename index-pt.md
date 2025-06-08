---
layout: default
title: Especificação do Language Variant Tag (LVTag)
lang: pt
description: "LVTag é uma abordagem sistemática para classificação de idiomas que estende o BCP 47 usando subetiquetas de uso privado para identificação precisa de variedades linguísticas através das dimensões de formalidade, polidez, domínio e ortografia."
---

<div align="center">
  <img src="/LVTAG_LOGO.png" alt="LVTag Logo" width="200">
</div>

# Especificação LVTag

**Versão 1.0**  
**Criado por Danslav Slavenskoj**  
**Data: Maio 2025**

**Idiomas**: [中文简体](/index-zh.md)  [中文繁體](/index-zh-hant.md)  [Čeština](/index-cs.md)  [Deutsch](/index-de.md)  [English](/index.md)  [Español](/index-es.md)  [Français](/index-fr.md)  [Hrvatski](/index-hr.md)  [日本語](/index-ja.md)  [한국어](/index-ko.md)  [Polski](/index-pl.md)  Português  [Русский](/index-ru.md)  [Српски](/index-sr.md)

## Links rápidos

- [Esquema JSON](/lvtag-schema.json) - Esquema de validação completo para o formato LVTag
- [Definições de classificadores](/lvtag-classifiers.json) - Especificações de classificadores legíveis por máquina
- [Especificação](#especificação-do-formato) - Ir para os detalhes do formato
- [Exemplos](#exemplos-de-implementação) - Ver LVTag em ação

## Visão geral

O formato Language Variant Tag (LVTag) é uma abordagem sistemática para classificação de idiomas que estende o padrão BCP 47 usando subetiquetas de uso privado. Permite a identificação precisa de variedades linguísticas em múltiplas dimensões, incluindo formalidade, polidez, domínio e ortografia.

### Benefícios principais

**Rigor de classificação**: LVTag traz organização sistemática à marcação de idiomas ao fornecer dimensões claras e separadas para diferentes tipos de variação. Ao contrário de subetiquetas e sistemas existentes que misturam diferentes categorias no mesmo nível, LVTag mantém separação estrita entre formalidade, polidez, domínio e outras dimensões.

**Compatibilidade com padrões**: LVTag é totalmente compatível com BCP 47 (RFC 5646) e funciona perfeitamente com:
- Registro de Subetiquetas de Idiomas IANA
- Códigos de idioma ISO 639
- Unicode CLDR
- Etiquetas de idioma W3C
- Cabeçalhos HTTP Accept-Language
- Atributos lang XML
- Atributos lang HTML

**Integração tecnológica**: As etiquetas LVTag podem ser usadas diretamente em:
- Pipelines de processamento de linguagem natural (NLP)
- Sistemas de tradução automática
- Sistemas de gerenciamento de conteúdo (CMS)
- Bibliotecas de detecção de idioma
- Mecanismos de busca e sistemas de recuperação de informação
- Aplicações web e APIs
- Fluxos de trabalho de localização

**Casos de uso**:
- **Direcionamento de público**: Adequar conteúdo a públicos apropriados com base em registro e domínio
- **Qualidade de tradução**: Manter níveis apropriados de formalidade e polidez em tradução automática
- **Aprendizado de idiomas**: Ensinar aos alunos o registro apropriado para diferentes contextos
- **Linguística de corpus**: Construir corpora precisamente etiquetados para pesquisa
- **Análise de mídia social**: Classificar conteúdo gerado por usuários por registro e domínio
- **Atendimento ao cliente**: Direcionar mensagens com base em formalidade e domínio para agentes apropriados

## Justificativa

Embora o BCP 47 forneça excelente suporte para identificar idiomas, scripts e regiões, carece de mecanismos padronizados para capturar variação sociolinguística dentro de um idioma. Os padrões atuais não abordam:

- **Variação de registro**: Sem forma de distinguir entre variedades formais e informais do mesmo idioma
- **Níveis de polidez**: Crítico para idiomas como japonês, coreano e tailandês onde a polidez é codificada gramaticalmente
- **Linguagem específica de domínio**: Sem padrão para marcar variedades técnicas, médicas ou legais de linguagem
- **Socioletos**: Sem mecanismo para identificar variedades de grupos sociais (linguagem juvenil, jargão profissional)
- **Estágios históricos**: Suporte limitado para distinguir formas clássicas de modernas
- **Gradientes de formalidade**: Sem escala numérica para processamento computacional de registro
- **Protolínguas**: Codificação inconsistente - algumas protolínguas têm códigos ISO (ex.: `ine` para PIE) enquanto outras não, e códigos de família ISO 639-5 não são válidos em etiquetas BCP 47, criando um cenário confuso para linguística histórica
- **Variação ortográfica**: Embora o BCP 47 lide com scripts, não captura efetivamente variações dentro de scripts (reformas ortográficas, sistemas de romanização, padrões concorrentes) que afetam fundamentalmente o processamento de texto, busca e verificação ortográfica

LVTag preenche essas lacunas usando o mecanismo de extensão de uso privado do BCP 47 (`-x-`), fornecendo uma maneira sistemática e legível por máquina de codificar essas dimensões críticas de variação linguística mantendo compatibilidade retroativa completa.

### Classificação linguística precisa

O advento de grandes modelos de linguagem e ferramentas NLP sofisticadas tornou a classificação precisa de variedades linguísticas não apenas útil, mas essencial. Sistemas modernos precisam:

- Gerar texto apropriado para contextos específicos (formal vs. informal, polido vs. casual)
- Treinar em corpora adequadamente classificados para evitar misturar registros inadequadamente
- Fornecer respostas cultural e contextualmente apropriadas
- Lidar com precisão com mudança de código e conteúdo de idiomas mistos
- Preservar consistência estilística ao traduzir ou transformar texto
- Filtrar dados de treinamento com base em formalidade, domínio ou outras características
- Adaptar a saída para corresponder às preferências ou requisitos do usuário

LVTag fornece os metadados granulares necessários para entender não apenas qual idioma está sendo usado, mas como está sendo usado, permitindo pipelines de processamento de linguagem mais matizados e apropriados.

## Especificação do formato

### Estrutura básica

```
language-x-[classifier]-[value]-[classifier2]-[value2]...
```

Onde:
- `language` é uma subetiqueta de idioma principal BCP 47 válida (ex.: `en`, `ko`, `ja`)
- `x` indica o início das subetiquetas de uso privado
- `classifier` é um identificador de categoria (veja Etiquetas mágicas abaixo)
- `value` é a classificação específica dentro dessa categoria

### Etiquetas mágicas

LVTag suporta classificadores "mágicos" de forma longa e curta para flexibilidade:

| Forma longa | Forma curta | Descrição |
|-----------|------------|-------------|
| `ortho` | `w` | Variante ortográfica |
| `form` | `f` | Nível de formalidade (escala 1-5) |
| `polite` | `p` | Nível de polidez/respeito (escala 1-5) |
| `domain` | `d` | Vocabulário especializado ou contexto profissional |
| `geo` | `g` | Variedade geográfica ou regional |
| `proto` | `a` | Protolíngua ou língua reconstruída |
| `hist` | `h` | Período histórico ou estágio de uma língua |
| `genre` | `e` | Gênero textual ou estilo literário |
| `medium` | `m` | Meio de comunicação (falado, escrito, digital) |
| `socio` | `s` | Socioleto ou variedade de grupo social |
| `modality` | `o` | Modo de produção linguística |
| `register` | `r` | Registro linguístico |
| `pragma` | `u` | Função comunicativa |
| `temporal` | `t` | Marcação temporal |
| `evidence` | `v` | Fonte de informação |
| `affect` | `k` | Tom emocional |
| `age` | `n` | Variedade etária/geracional |
| `gender` | `i` | Variedade de gênero |
| `expert` | `b` | Nível de expertise |
| `interact` | `2` | Estrutura interacional |
| `prosody` | `y` | Características prosódicas |
| `lexical` | `l` | Densidade lexical (0-100) |
| `syntax` | `z` | Complexidade sintática (0-100) |
| `start` | `0` | Data de início (ISO 8601 sem pontuação) |
| `end` | `1` | Data de término (ISO 8601 sem pontuação) |
| `taboo` | `j` | Nível de conteúdo tabu/vulgar (escala 0-5) |
| `conf` | `c` | Pontuação de confiança (0-100) para a etiqueta anterior |
| — | `q`, `3`-`9` | Reservado para uso futuro |

### Classificadores

#### 1. Classificador ortográfico (`ortho` ou `w`)
Identifica convenções ortográficas específicas ou variantes do sistema de escrita além das etiquetas padrão de script.

Formato:
- Longo: `language-x-ortho-[variant]`
- Curto: `language-x-w-[variant]`

Exemplos (combinados com etiquetas padrão de script):
- `az-Latn-x-ortho-new` ou `az-Latn-x-w-new` - Azeri escrita latina, nova ortografia
- `de-Latn-x-ortho-1901` ou `de-Latn-x-w-1901` - Alemão escrita latina, ortografia de 1901
- `zh-Hans-x-ortho-pinyin` ou `zh-Hans-x-w-pinyin` - Chinês simplificado com pinyin
- `yi-Hebr-x-ortho-yivo` ou `yi-Hebr-x-w-yivo` - Iídiche escrita hebraica, ortografia YIVO

#### 2. Classificador de formalidade (`form` ou `f`)
Identifica o nível de formalidade do uso linguístico.

Formato:
- Longo: `language-x-form-[1-5]`
- Curto: `language-x-f-[1-5]`

Escala de formalidade:
- 1 = Mais formal (documentos escritos, discursos oficiais)
- 2 = Formal (reuniões de negócios, escrita acadêmica)
- 3 = Neutro/padrão (notícias, conversa geral)
- 4 = Informal (conversa casual, e-mails para amigos)
- 5 = Mais casual (conversa íntima, gíria)

Exemplos:
- `ko-x-form-1` ou `ko-x-f-1` - Coreano mais formal
- `en-x-form-3` ou `en-x-f-3` - Inglês neutro
- `ja-x-form-5` ou `ja-x-f-5` - Japonês mais casual

#### 3. Classificador de polidez (`polite` ou `p`)
Identifica o nível de polidez/respeito do uso linguístico.

Formato:
- Longo: `language-x-polite-[1-5]`
- Curto: `language-x-p-[1-5]`

Escala de polidez:
- 1 = Mais respeitoso/deferente (endereço real, contextos religiosos)
- 2 = Muito polido (honoríficos formais, fala respeitosa)
- 3 = Polido/neutro (polidez padrão)
- 4 = Familiar (entre iguais, amigos)
- 5 = Íntimo/simples (família, amigos muito próximos)

Exemplos:
- `ko-x-polite-1` ou `ko-x-p-1` - Coreano de mais alto respeito
- `ja-x-polite-2` ou `ja-x-p-2` - Japonês muito polido
- `th-x-polite-3` ou `th-x-p-3` - Tailandês polido padrão

#### 4. Classificador de domínio (`domain` ou `d`)
Identifica vocabulário especializado ou contexto profissional.

Formato:
- Longo: `language-x-domain-[domain_type]`
- Curto: `language-x-d-[domain_type]`

Exemplos:
- `en-x-domain-legal` ou `en-x-d-legal` - Inglês jurídico
- `ja-x-domain-med` ou `ja-x-d-med` - Japonês médico
- `ko-x-domain-business` ou `ko-x-d-business` - Coreano de negócios
- `ja-x-domain-tech` ou `ja-x-d-tech` - Japonês técnico
- `en-x-domain-fin` ou `en-x-d-fin` - Inglês financeiro

#### 5. Classificador geográfico (`geo` ou `g`)
Identifica variedades linguísticas regionais ou geográficas.

Formato:
- Longo: `language-x-geo-[region]`
- Curto: `language-x-g-[region]`

Exemplos:
- `ko-x-geo-gyeong` ou `ko-x-g-gyeong` - Coreano de Gyeongsang (경상도)
- `ko-x-geo-jeolla` ou `ko-x-g-jeolla` - Coreano de Jeolla (전라도)
- `es-x-geo-riopla` ou `es-x-g-riopla` - Espanhol rioplatense
- `pt-x-geo-nordeste` ou `pt-x-g-nordeste` - Português do nordeste brasileiro

#### 6. Classificador proto (`proto` ou `a`)
Identifica protolínguas ou línguas históricas reconstruídas.

Formato:
- Longo: `x-proto-[iso639-5_code if available]`
- Curto: `x-a-[iso639-5_code if available]`

Regras:
- DEVE usar códigos de família de idiomas ISO 639-5 quando disponíveis
- Usar identificadores descritivos apenas quando não existir código ISO 639-5

Exemplos usando códigos ISO 639-5:
- `x-proto-ine` ou `x-a-ine` - Proto-indo-europeu
- `x-proto-gem` ou `x-a-gem` - Proto-germânico
- `x-proto-sla` ou `x-a-sla` - Proto-eslavo
- `x-proto-sem` ou `x-a-sem` - Proto-semítico
- `x-proto-cel` ou `x-a-cel` - Proto-céltico
- `x-proto-ira` ou `x-a-ira` - Proto-iraniano
- `x-proto-inc` ou `x-a-inc` - Proto-indo-ariano
- `x-proto-bat` ou `x-a-bat` - Proto-báltico
- `x-proto-roa` ou `x-a-roa` - Proto-românico
- `x-proto-trk` ou `x-a-trk` - Proto-túrquico

Exemplos sem códigos ISO 639-5 (descritivos, mais de três caracteres):
- `x-proto-baltslav` ou `x-a-baltslav` - Proto-balto-eslavo (sem código ISO 639-5)

Nota:
- Códigos de família de idiomas (ISO 639-5) NÃO são válidos como etiquetas de idioma principal BCP 47 padrão, por isso implementamos usando x-proto
- Eles são válidos e preferidos dentro de extensões de uso privado (após `x-`)
- Portanto, todas as etiquetas de protolíngua devem começar com `x-` para estar em conformidade com BCP 47

#### 7. Classificador histórico (`hist` ou `h`)
Identifica períodos históricos ou estágios de uma língua.

Formato:
- Longo: `language-x-hist-[period]`
- Curto: `language-x-h-[period]`

Exemplos:
- `en-x-hist-old` ou `en-x-h-old` - Período do inglês antigo
- `en-x-hist-middle` ou `en-x-h-middle` - Período do inglês médio
- `ja-x-hist-kobun` ou `ja-x-h-kobun` - Japonês clássico (古文)
- `ko-x-hist-hunmin` ou `ko-x-h-hunmin` - Coreano médio (훈민정음 período)
- `el-x-hist-koine` ou `el-x-h-koine` - Grego koiné (Κοινή)
- `sa-x-hist-vedic` ou `sa-x-h-vedic` - Sânscrito védico (वैदिक)

#### 8. Classificador de gênero (`genre` ou `e`)
Identifica gênero textual ou estilo literário.

Formato:
- Longo: `language-x-genre-[genre_type]`
- Curto: `language-x-e-[genre_type]`

Exemplos:
- `en-x-genre-news` ou `en-x-e-news` - Inglês jornalístico
- `ja-x-genre-manga` ou `ja-x-e-manga` - Japonês de mangá (漫画)
- `ko-x-genre-webtoon` ou `ko-x-e-webtoon` - Coreano de webtoon (웹툰)
- `zh-x-genre-shi` ou `zh-x-e-shi` - Poesia chinesa (詩)
- `fr-x-genre-bd` ou `fr-x-e-bd` - Quadrinhos franceses (bande dessinée)
- `de-x-genre-marchen` ou `de-x-e-marchen` - Contos de fadas alemães (Märchen)

#### 9. Classificador de meio (`medium` ou `m`)
Identifica o meio de comunicação.

Formato:
- Longo: `language-x-medium-[medium_type]`
- Curto: `language-x-m-[medium_type]`

Exemplos:
- `en-x-medium-spoken` ou `en-x-m-spoken` - Inglês falado
- `ko-x-medium-digital` ou `ko-x-m-digital` - Coreano digital/online
- `ja-x-medium-written` ou `ja-x-m-written` - Japonês escrito
- `hi-x-medium-bcast` ou `hi-x-m-bcast` - Hindi transmitido
- `zh-x-medium-sms` ou `zh-x-m-sms` - Chinês SMS/mensagem de texto

#### 10. Classificador socio (`socio` ou `s`)
Identifica socioleto ou variedades de grupos sociais.

Formato:
- Longo: `language-x-socio-[social_group]`
- Curto: `language-x-s-[social_group]`

Exemplos:
- `en-x-socio-academic` ou `en-x-s-academic` - Socioleto acadêmico
- `en-x-socio-urban` ou `en-x-s-urban` - Socioleto urbano
- `es-x-socio-juvenil` ou `es-x-s-juvenil` - Socioleto juvenil espanhol (jerga juvenil)
- `fr-x-socio-jeune` ou `fr-x-s-jeune` - Socioleto juvenil francês
- `de-x-socio-jugend` ou `de-x-s-jugend` - Socioleto juvenil alemão (Jugendsprache)
- `ko-x-socio-online` ou `ko-x-s-online` - Socioleto coreano online

#### 11. Classificador de modalidade (`modality` ou `o`)
Identifica o modo fundamental de produção linguística.

Formato:
- Longo: `language-x-modality-[mode]`
- Curto: `language-x-o-[mode]`

Exemplos:
- `en-x-modality-spoken` ou `en-x-o-spoken` - Inglês falado
- `en-x-modality-written` ou `en-x-o-written` - Inglês escrito
- `asl-x-modality-signed` ou `asl-x-o-signed` - Língua de sinais americana
- `en-x-modality-multi` ou `en-x-o-multi` - Inglês multimodal (fala + gestos)
- `fr-x-modality-tactile` ou `fr-x-o-tactile` - Francês tátil (para surdocegos)

#### 12. Classificador de registro (`register` ou `r`)
Identifica registro linguístico ou variedade funcional do uso linguístico.

Formato:
- Longo: `language-x-register-[register_type]`
- Curto: `language-x-r-[register_type]`

Exemplos:
- `en-x-register-frozen` ou `en-x-r-frozen` - Registro congelado (orações, juramentos)
- `en-x-register-formal` ou `en-x-r-formal` - Registro formal (artigos acadêmicos)
- `en-x-register-consult` ou `en-x-r-consult` - Registro consultivo (profissional)
- `en-x-register-casual` ou `en-x-r-casual` - Registro casual (amigos)
- `en-x-register-intimate` ou `en-x-r-intimate` - Registro íntimo (família)

#### 13. Classificador de função pragmática (`pragma` ou `u`)
Identifica função comunicativa ou ato de fala.

Formato:
- Longo: `language-x-pragma-[function]`
- Curto: `language-x-u-[function]`

Exemplos:
- `en-x-pragma-request` ou `en-x-u-request` - Função de solicitação
- `ja-x-pragma-apology` ou `ja-x-u-apology` - Função de desculpa
- `es-x-pragma-complmnt` ou `es-x-u-complmnt` - Função de elogio
- `ar-x-pragma-greeting` ou `ar-x-u-greeting` - Função de saudação
- `zh-x-pragma-refusal` ou `zh-x-u-refusal` - Função de recusa

#### 14. Classificador de marcação temporal (`temporal` ou `t`)
Identifica aspectos temporais ou padrões de uso temporal.

Formato:
- Longo: `language-x-temporal-[aspect]`
- Curto: `language-x-t-[aspect]`

Exemplos:
- `en-x-temporal-past` ou `en-x-t-past` - Discurso orientado ao passado
- `ja-x-temporal-nonpast` ou `ja-x-t-nonpast` - Foco não-passado
- `id-x-temporal-atemprl` ou `id-x-t-atemprl` - Atemporal/sem tempo
- `fr-x-temporal-future` ou `fr-x-t-future` - Orientado ao futuro
- `zh-x-temporal-aspect` ou `zh-x-t-aspect` - Foco aspectual

#### 15. Classificador evidencial (`evidence` ou `v`)
Identifica marcação de fonte de informação.

Formato:
- Longo: `language-x-evidence-[source]`
- Curto: `language-x-v-[source]`

Exemplos:
- `qu-x-evidence-direct` ou `qu-x-v-direct` - Testemunha direta
- `tr-x-evidence-hearsay` ou `tr-x-v-hearsay` - Boato/reportado
- `ja-x-evidence-infer` ou `ja-x-v-infer` - Inferencial
- `en-x-evidence-assume` ou `en-x-v-assume` - Assumido
- `de-x-evidence-quote` ou `de-x-v-quote` - Citativo

#### 16. Classificador de afeto/emoção (`affect` ou `k`)
Identifica tom emocional ou afeto.

Formato:
- Longo: `language-x-affect-[emotion]`
- Curto: `language-x-k-[emotion]`

Exemplos:
- `en-x-affect-angry` ou `en-x-k-angry` - Tom raivoso
- `ja-x-affect-humble` ou `ja-x-k-humble` - Afeto humilde
- `es-x-affect-joyful` ou `es-x-k-joyful` - Expressão alegre
- `ko-x-affect-sad` ou `ko-x-k-sad` - Triste/melancólico
- `fr-x-affect-neutral` ou `fr-x-k-neutral` - Afeto neutro

#### 17. Classificador de idade/geração (`age` ou `n`)
Identifica variedades linguísticas relacionadas à idade ou geração.

Formato:
- Longo: `language-x-age-[generation]`
- Curto: `language-x-n-[generation]`

Exemplos:
- `en-x-age-child` ou `en-x-n-child` - Fala infantil
- `ja-x-age-teen` ou `ja-x-n-teen` - Linguagem adolescente
- `ko-x-age-elder` ou `ko-x-n-elder` - Fala de idosos
- `es-x-age-genz` ou `es-x-n-genz` - Geração Z
- `zh-x-age-millenl` ou `zh-x-n-millenl` - Fala millennial

#### 18. Classificador de gênero (`gender` ou `i`)
Identifica variedades linguísticas relacionadas ao gênero.

Formato:
- Longo: `language-x-gender-[identity]`
- Curto: `language-x-i-[identity]`

#### 19. Classificador de nível de expertise (`expert` ou `b`)
Identifica o nível de expertise de domínio em uma escala de 0-10.

Formato:
- Longo: `language-x-expert-[0-10]`
- Curto: `language-x-b-[0-10]`

Escala de expertise:
- 0 = Sem conhecimento
- 1-2 = Iniciante
- 3-4 = Intermediário
- 5-6 = Avançado
- 7-8 = Expert
- 9-10 = Mestre/Autoridade

Exemplos:
- `en-x-expert-0` ou `en-x-b-0` - Sem expertise
- `de-x-expert-3` ou `de-x-b-3` - Nível intermediário
- `ja-x-expert-7` ou `ja-x-b-7` - Nível expert
- `es-x-expert-9` ou `es-x-b-9` - Nível mestre
- `zh-x-expert-5` ou `zh-x-b-5` - Nível avançado

#### 20. Classificador de estrutura interacional (`interact` ou `2`)
Identifica padrões conversacionais ou interacionais.

Formato:
- Longo: `language-x-interact-[structure]`
- Curto: `language-x-2-[structure]`

Exemplos:
- `en-x-interact-turn` ou `en-x-2-turn` - Tomada de turno
- `ja-x-interact-overlap` ou `ja-x-2-overlap` - Fala sobreposta
- `es-x-interact-monolog` ou `es-x-2-monolog` - Monológico
- `ar-x-interact-dialog` ou `ar-x-2-dialog` - Dialógico
- `zh-x-interact-multi` ou `zh-x-2-multi` - Multipartidário

#### 21. Classificador de características prosódicas (`prosody` ou `y`)
Identifica características prosódicas ou suprassegmentais.

Formato:
- Longo: `language-x-prosody-[feature]`
- Curto: `language-x-y-[feature]`

Exemplos:
- `en-x-prosody-stress` ou `en-x-y-stress` - Ritmo acentual
- `ja-x-prosody-pitch` ou `ja-x-y-pitch` - Acento tonal
- `fr-x-prosody-syllable` ou `fr-x-y-syllable` - Ritmo silábico
- `zh-x-prosody-tone` ou `zh-x-y-tone` - Padrões tonais
- `es-x-prosody-rhythm` ou `es-x-y-rhythm` - Padrões rítmicos

#### 22. Classificador de densidade lexical (`lexical` ou `l`)
Identifica densidade lexical como valor numérico (0-100).

Formato:
- Longo: `language-x-lexical-[0-100]`
- Curto: `language-x-l-[0-100]`

Exemplos:
- `en-x-lexical-20` ou `en-x-l-20` - Baixa densidade (20%)
- `de-x-lexical-55` ou `de-x-l-55` - Densidade média (55%)
- `ja-x-lexical-75` ou `ja-x-l-75` - Alta densidade (75%)
- `es-x-lexical-40` ou `es-x-l-40` - Densidade moderada (40%)
- `zh-x-lexical-85` ou `zh-x-l-85` - Densidade muito alta (85%)

#### 23. Classificador de complexidade sintática (`syntax` ou `z`)
Identifica complexidade sintática como valor numérico (0-100).

Formato:
- Longo: `language-x-syntax-[0-100]`
- Curto: `language-x-z-[0-100]`

Exemplos:
- `en-x-syntax-15` ou `en-x-z-15` - Sintaxe simples (15%)
- `de-x-syntax-70` ou `de-x-z-70` - Sintaxe complexa (70%)
- `ja-x-syntax-45` ou `ja-x-z-45` - Complexidade moderada (45%)
- `es-x-syntax-30` ou `es-x-z-30` - Baixa complexidade (30%)
- `zh-x-syntax-60` ou `zh-x-z-60` - Alta complexidade (60%)

#### 24. Classificador de data de início (`start` ou `0`)
Identifica data de início do uso linguístico (formato ISO 8601 sem pontuação).

Formato:
- Longo: `language-x-start-[YYYYMMDD]`
- Curto: `language-x-0-[YYYYMMDD]`

Formatos de data:
- Data completa: YYYYMMDD
- Ano-mês: YYYYMM
- Apenas ano: YYYY

Exemplos:
- `en-x-start-20240315` ou `en-x-0-20240315` - Inglês começando em 15 de março de 2024
- `ja-x-start-19890108` ou `ja-x-0-19890108` - Japonês começando em 8 de janeiro de 1989
- `es-x-start-202403` ou `es-x-0-202403` - Espanhol começando em março de 2024

#### 25. Classificador de data de término (`end` ou `1`)
Identifica data de término do uso linguístico (formato ISO 8601 sem pontuação).

Formato:
- Longo: `language-x-end-[YYYYMMDD]`
- Curto: `language-x-1-[YYYYMMDD]`

Formatos de data:
- Data completa: YYYYMMDD
- Ano-mês: YYYYMM
- Apenas ano: YYYY

Exemplos:
- `en-x-end-20240415` ou `en-x-1-20240415` - Inglês terminando em 15 de abril de 2024
- `ja-x-end-20190430` ou `ja-x-1-20190430` - Japonês terminando em 30 de abril de 2019
- `es-x-end-202412` ou `es-x-1-202412` - Espanhol terminando em dezembro de 2024

#### 26. Classificador de tabu (`taboo` ou `j`)
Identifica o nível de conteúdo tabu, vulgar ou ofensivo.

Formato:
- Longo: `language-x-taboo-[0-5]`
- Curto: `language-x-j-[0-5]`

Exemplos:
- `en-x-taboo-0` ou `en-x-j-0` - Sem conteúdo tabu
- `en-x-taboo-3` ou `en-x-j-3` - Nível moderado de tabu
- `ja-x-form-5-taboo-4` ou `ja-x-f-5-j-4` - Japonês muito casual com alto nível de tabu

#### 27. Classificador de confiança (`conf` ou `c`)
Indica a pontuação de confiança para o classificador imediatamente anterior.

Formato:
- Longo: `language-x-[classifier]-[value]-conf-[0-100]`
- Curto: `language-x-[classifier]-[value]-c-[0-100]`

Comportamento especial:
- A pontuação de confiança se aplica ao classificador imediatamente anterior
- Múltiplas pontuações de confiança podem ser usadas para diferentes classificadores
- Se não houver classificador precedente, a confiança se aplica à etiqueta de idioma base

Exemplos:
- `en-x-form-3-conf-95` ou `en-x-f-3-c-95` - Formalidade neutra com 95% de confiança
- `ko-x-polite-2-conf-80-domain-med-conf-60` ou `ko-x-p-2-c-80-d-med-c-60` - Muito polido (80% confiança) coreano médico (60% confiança)
- `ja-x-hist-kobun-conf-100` ou `ja-x-h-kobun-c-100` - Japonês clássico com 100% de confiança
- `x-proto-ine-conf-75` ou `x-a-ine-c-75` - Proto-indo-europeu com 75% de confiança

### Classificações múltiplas

LVTag suporta múltiplos classificadores em uma única etiqueta para fornecer identificação linguística precisa. Formas longas e curtas podem ser misturadas:

```
ko-x-form-4-domain-business
ko-x-f-4-d-business
ko-x-form-4-polite-2-domain-business
ko-x-f-4-p-2-d-business
```

Os exemplos acima mostram coreano com formalidade informal (4) mas fala polida (2) em contexto de negócios.

## Valores válidos

**Nota**: Todos os valores devem ter 8 caracteres ou menos para cumprir as restrições de comprimento de subetiqueta BCP 47. Embora valores específicos para muitos classificadores devam ser estabelecidos através de uso especializado e consenso da comunidade, escalas numéricas, formatos de data e valores básicos listados abaixo são definidos neste padrão.

### Escala de formalidade (Universal)

| Nível | Descrição | Exemplos |
|-------|-------------|----------|
| 1 | Mais formal | Documentos legais, cerimônias oficiais, artigos acadêmicos |
| 2 | Formal | Cartas comerciais, artigos de notícias, apresentações |
| 3 | Neutro | Conversa padrão, e-mail, escrita geral |
| 4 | Informal | Conversa casual, blogs pessoais, mensagens de texto |
| 5 | Mais casual | Gíria, conversa íntima, mídia social |

### Escala de polidez (Universal)

| Nível | Descrição | Exemplos |
|-------|-------------|----------|
| 1 | Mais respeitoso | Endereço real, líderes religiosos, respeito aos idosos |
| 2 | Muito polido | Atendimento ao cliente, reuniões formais, professores |
| 3 | Polido/neutro | Interações padrão, colegas |
| 4 | Familiar | Amigos, pares, conhecidos casuais |
| 5 | Íntimo/simples | Família próxima, parceiros íntimos |

### Escala de expertise (Universal)

| Nível | Descrição |
|-------|-------------|
| 0 | Sem conhecimento |
| 1-2 | Iniciante |
| 3-4 | Intermediário |
| 5-6 | Avançado |
| 7-8 | Expert |
| 9-10 | Mestre/Autoridade |

### Escala de tabu (Universal)

| Nível | Descrição |
|-------|-------------|
| 0 | Sem conteúdo tabu |
| 1 | Tabu leve |
| 2 | Tabu baixo |
| 3 | Tabu moderado |
| 4 | Tabu alto |
| 5 | Tabu extremo |

### Escala de densidade lexical (Universal)

| Nível | Descrição |
|-------|-------------|
| 0-20 | Densidade muito baixa |
| 21-40 | Densidade baixa |
| 41-60 | Densidade moderada |
| 61-80 | Densidade alta |
| 81-100 | Densidade muito alta |

### Escala de complexidade sintática (Universal)

| Nível | Descrição |
|-------|-------------|
| 0-20 | Muito simples |
| 21-40 | Simples |
| 41-60 | Complexidade moderada |
| 61-80 | Complexo |
| 81-100 | Muito complexo |

### Valores de domínio

| Valor | Descrição |
|-------|-------------|
| `legal` | Terminologia jurídica |
| `med` | Terminologia médica |
| `tech` | Técnico/TI |
| `business` | Negócios/corporativo |
| `fin` | Finanças/bancário |
| `acad` | Acadêmico/erudito |
| `sci` | Científico/pesquisa |

## Exemplos de implementação

### Classificador único (Forma longa)
```
# Coreano mais formal
ko-x-form-1

# Japonês muito polido
ja-x-polite-2

# Inglês jurídico
en-x-domain-legal

# Coreano de Gyeongsang
ko-x-geo-gyeong

# Proto-indo-europeu
x-proto-ine
```

### Classificador único (Forma curta)
```
# Coreano mais formal
ko-x-f-1

# Japonês muito polido
ja-x-p-2

# Inglês jurídico
en-x-d-legal

# Coreano de Gyeongsang
ko-x-g-gyeong

# Proto-indo-europeu
x-a-ine
```

### Múltiplos classificadores
```
# Linguagem de negócios coreana informal mas polida
ko-x-form-4-polite-2-domain-business
ko-x-f-4-p-2-d-business

# Linguagem médica japonesa formal e respeitosa
ja-x-form-1-polite-1-domain-med
ja-x-f-1-p-1-d-med

# Vietnamita do sul com formalidade neutra, fala polida, domínio técnico
vi-x-geo-southern-form-3-polite-2-domain-tech
vi-x-g-southern-f-3-p-2-d-tech

# Classificação complexa com múltiplas dimensões
en-x-h-middle-e-poetry-m-written-f-1
ja-x-f-2-p-1-d-med-h-kobun-m-written

# Variedades linguísticas mostrando distinção formalidade/polidez
ko-x-f-5-p-2  # Muito casual mas polido (para um amigo mais velho)
ko-x-f-1-p-4  # Muito formal mas familiar (escrito para um colega)
ja-x-f-4-p-1  # Formalidade casual mas mais alto respeito
en-x-f-5-j-4  # Inglês muito casual com alto nível de tabu
```

## Casos de uso

1. **Aplicações de aprendizado de idiomas**
   - Ensinar registro apropriado para diferentes contextos sociais
   - Fornecer treinamento de vocabulário específico de domínio

2. **Tradução automática**
   - Manter consistência de registro nas traduções
   - Aplicar terminologia específica de domínio

3. **Classificação de conteúdo**
   - Categorizar automaticamente texto por formalidade e domínio
   - Direcionar conteúdo para revisores ou sistemas apropriados

4. **Linguística de corpus**
   - Construir corpora etiquetados para pesquisa linguística
   - Estudar variação de registro e domínio

## Regras de validação

1. **Comprimento de subetiqueta**: Cada subetiqueta após `x-` deve ter 8 caracteres ou menos
2. **Ordem**: Classificadores podem aparecer em qualquer ordem após `x-`
3. **Unicidade**: Cada tipo de classificador deve aparecer apenas uma vez por etiqueta (exceto `conf` que pode aparecer múltiplas vezes)
4. **Maiúsculas/minúsculas**: Etiquetas devem ser em minúsculas (sem distinção de maiúsculas conforme BCP 47)
5. **Etiquetas mágicas**: Etiquetas de forma curta são caracteres únicos; `q`, `3`-`9` são reservados para uso futuro
6. **Mistura**: Formas longas e curtas podem ser misturadas dentro da mesma etiqueta
7. **Etiquetas proto**: Devem começar com `x-` e DEVEM usar códigos ISO 639-5 quando disponíveis (ex.: `x-proto-sla` não `x-proto-slavic`)
8. **Confiança**: Classificador `conf`/`c` se aplica ao classificador imediatamente anterior
9. **Valores numéricos**: Devem estar dentro dos intervalos definidos (0-5 para tabu, 0-10 para expertise, 0-100 para valores percentuais)
10. **Formato de data**: Datas usam ISO 8601 sem pontuação (YYYY, YYYYMM ou YYYYMMDD)

## Compatibilidade

O formato LVTag é totalmente compatível com:
- BCP 47 (RFC 5646)
- Códigos de idioma ISO 639
- Registro de Subetiquetas de Idiomas IANA
- Unicode CLDR

## Benefícios

1. **Precisão**: Permite identificação detalhada de variedades linguísticas
2. **Extensibilidade**: Novos registros e domínios podem ser adicionados
3. **Baseado em padrões**: Construído sobre o mecanismo estabelecido de uso privado BCP 47
4. **Legível por máquina**: Formato sistemático permite processamento automatizado
5. **Legível por humanos**: Subetiquetas claras e descritivas
6. **Flexibilidade**: Suporte para etiquetas de forma longa detalhada e forma curta concisa
7. **Concisão**: Etiquetas mágicas curtas permitem representação compacta mantendo clareza

## Extensões futuras

LVTag é projetado para evoluir com as necessidades da comunidade de tecnologia linguística. Recebemos sugestões para novos classificadores, melhorias aos existentes e feedback de implementações do mundo real.

Para propor extensões ou contribuir com a especificação:
- Abra uma issue em [github.com/lvtag/spec](https://github.com/lvtag/spec)
- Participe da discussão sobre propostas existentes
- Compartilhe suas experiências de implementação
- Envie pull requests para melhorias de documentação

Os códigos de caractere único reservados (`q`, `3`-`9`) estão disponíveis para futuras extensões padronizadas.

## Referências

- [BCP 47: Etiquetas para identificar idiomas](https://www.rfc-editor.org/rfc/rfc5646.html)
- [Registro de Subetiquetas de Idiomas IANA](https://www.iana.org/assignments/language-subtag-registry/)

---

## Licença e concessão de patentes

Esta especificação é lançada sob **CC0 1.0 Universal (Dedicação ao Domínio Público)**.

**Por que CC0**: Para garantir máxima adoção e liberdade de implementação, LVTag é colocado no domínio público. Isso significa:
- Nenhuma permissão necessária para usar, implementar ou modificar
- Nenhuma atribuição necessária (embora apreciada)
- Sem barreiras legais para uso comercial ou governamental
- Compatível com todas as licenças de software
- Usado por padrões importantes como Unicode CLDR

**Concessão de patentes**: Quaisquer patentes que cubram a especificação LVTag são licenciadas sem royalties para qualquer implementação em conformidade com esta especificação.

**Sem endosso**: O uso de LVTag não implica endosso pelos autores da especificação.

Na medida permitida por lei, **Danslav Slavenskoj** renunciou a todos os direitos autorais e direitos relacionados ou conexos à Especificação do Formato Language Variant Tag (LVTag). Este trabalho é publicado dos: Estados Unidos da América.
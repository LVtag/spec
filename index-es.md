---
layout: default
title: Especificación del Language Variant Tag (LVTag)
lang: es
---

# Especificación LVTag

**Versión 1.0**  
**Creado por Danslav Slavenskoj**  
**Fecha: Mayo 2025**

**Idiomas**: [中文简体](/index-zh.md) | [中文繁體](/index-zh-hant.md) | [Čeština](/index-cs.md) | [Deutsch](/index-de.md) | [English](/index.md) | Español | [Français](/index-fr.md) | [Hrvatski](/index-hr.md) | [日本語](/index-ja.md) | [한국어](/index-ko.md) | [Polski](/index-pl.md) | [Português](/index-pt.md) | [Русский](/index-ru.md) | [Српски](/index-sr.md)

## Enlaces rápidos

- [Esquema JSON](/lvtag-schema.json) - Esquema de validación completo para el formato LVTag
- [Definiciones de clasificadores](/lvtag-classifiers.json) - Especificaciones de clasificadores legibles por máquina
- [Especificación](#especificación-del-formato) - Saltar a los detalles del formato
- [Ejemplos](#ejemplos-de-implementación) - Ver LVTag en acción

## Resumen

El formato Language Variant Tag (LVTag) es un enfoque sistemático para la clasificación de idiomas que extiende el estándar BCP 47 utilizando subetiquetas de uso privado. Permite la identificación precisa de variedades lingüísticas a través de múltiples dimensiones, incluyendo formalidad, cortesía, dominio y ortografía.

### Beneficios clave

**Rigor de clasificación**: LVTag aporta organización sistemática al etiquetado de idiomas proporcionando dimensiones claras y separadas para diferentes tipos de variación. A diferencia de las subetiquetas y sistemas existentes que mezclan diferentes categorías en el mismo nivel, LVTag mantiene una separación estricta entre formalidad, cortesía, dominio y otras dimensiones.

**Compatibilidad con estándares**: LVTag es totalmente compatible con BCP 47 (RFC 5646) y funciona perfectamente con:
- Registro de subetiquetas de idioma IANA
- Códigos de idioma ISO 639
- Unicode CLDR
- Etiquetas de idioma W3C
- Encabezados HTTP Accept-Language
- Atributos lang XML
- Atributos lang HTML

**Integración tecnológica**: Las etiquetas LVTag se pueden usar directamente en:
- Pipelines de procesamiento de lenguaje natural (NLP)
- Sistemas de traducción automática
- Sistemas de gestión de contenidos (CMS)
- Bibliotecas de detección de idiomas
- Motores de búsqueda y recuperación de información
- Aplicaciones web y APIs
- Flujos de trabajo de localización

**Casos de uso**:
- **Orientación de audiencia**: Adaptar el contenido a audiencias apropiadas según el registro y dominio
- **Calidad de traducción**: Mantener niveles apropiados de formalidad y cortesía en traducción automática
- **Aprendizaje de idiomas**: Enseñar a los estudiantes el registro apropiado para diferentes contextos
- **Lingüística de corpus**: Construir corpus etiquetados con precisión para investigación
- **Análisis de redes sociales**: Clasificar contenido generado por usuarios según registro y dominio
- **Servicio al cliente**: Dirigir mensajes según formalidad y dominio a agentes apropiados

## Justificación

Aunque BCP 47 proporciona un excelente soporte para identificar idiomas, escrituras y regiones, carece de mecanismos estandarizados para capturar la variación sociolingüística dentro de un idioma. Los estándares actuales no abordan:

- **Variación de registro**: No hay forma de distinguir entre variedades formales e informales del mismo idioma
- **Niveles de cortesía**: Crítico para idiomas como japonés, coreano y tailandés donde la cortesía está codificada gramaticalmente
- **Lenguaje específico de dominio**: No hay estándar para marcar variedades técnicas, médicas o legales del lenguaje
- **Sociolectos**: No hay mecanismo para identificar variedades de grupos sociales (lenguaje juvenil, jerga profesional)
- **Etapas históricas**: Soporte limitado para distinguir formas clásicas de modernas
- **Gradientes de formalidad**: No hay escala numérica para el procesamiento computacional del registro
- **Protolenguajes**: Codificación inconsistente: algunos protolenguajes tienen códigos ISO (p. ej., `ine` para PIE) mientras que otros no, y los códigos de familia ISO 639-5 no son válidos en las etiquetas BCP 47, creando un panorama confuso para la lingüística histórica
- **Variación ortográfica**: Aunque BCP 47 maneja escrituras, no captura efectivamente las variaciones dentro de las escrituras (reformas ortográficas, sistemas de romanización, estándares en competencia) que afectan fundamentalmente el procesamiento de texto, búsqueda y corrección ortográfica

LVTag llena estos vacíos utilizando el mecanismo de extensión de uso privado de BCP 47 (`-x-`), proporcionando una forma sistemática y legible por máquina de codificar estas dimensiones críticas de la variación lingüística mientras mantiene total compatibilidad hacia atrás.

### Clasificación lingüística precisa

La llegada de grandes modelos de lenguaje y herramientas NLP sofisticadas ha hecho que la clasificación precisa de variedades lingüísticas no solo sea útil sino esencial. Los sistemas modernos necesitan:

- Generar texto apropiado para contextos específicos (formal vs. informal, cortés vs. casual)
- Entrenar en corpus correctamente clasificados para evitar mezclar registros inapropiadamente
- Proporcionar respuestas cultural y contextualmente apropiadas
- Manejar con precisión el cambio de código y contenido de idiomas mixtos
- Preservar la consistencia estilística al traducir o transformar texto
- Filtrar datos de entrenamiento según formalidad, dominio u otras características
- Adaptar la salida para coincidir con las preferencias o requisitos del usuario

LVTag proporciona los metadatos granulares necesarios para entender no solo qué idioma se está usando, sino cómo se está usando, permitiendo pipelines de procesamiento de lenguaje más matizados y apropiados.

## Especificación del formato

### Estructura básica

```
language-x-[classifier]-[value]-[classifier2]-[value2]...
```

Donde:
- `language` es una subetiqueta de idioma principal válida de BCP 47 (p. ej., `en`, `ko`, `ja`)
- `x` indica el comienzo de las subetiquetas de uso privado
- `classifier` es un identificador de categoría (ver Etiquetas mágicas a continuación)
- `value` es la clasificación específica dentro de esa categoría

### Etiquetas mágicas

LVTag admite clasificadores "mágicos" tanto de forma larga como corta para mayor flexibilidad:

| Forma larga | Forma corta | Descripción |
|-----------|------------|-------------|
| `ortho` | `w` | Variante ortográfica |
| `form` | `f` | Nivel de formalidad (escala 1-5) |
| `polite` | `p` | Nivel de cortesía/respeto (escala 1-5) |
| `domain` | `d` | Vocabulario especializado o contexto profesional |
| `geo` | `g` | Variedad geográfica o regional |
| `proto` | `a` | Protolengua o lengua reconstruida |
| `hist` | `h` | Período histórico o etapa de una lengua |
| `genre` | `e` | Género textual o estilo literario |
| `medium` | `m` | Medio de comunicación (hablado, escrito, digital) |
| `socio` | `s` | Sociolecto o variedad de grupo social |
| `modality` | `o` | Modo de producción del lenguaje |
| `register` | `r` | Registro lingüístico |
| `pragma` | `u` | Función comunicativa |
| `temporal` | `t` | Marcación temporal |
| `evidence` | `v` | Fuente de información |
| `affect` | `k` | Tono emocional |
| `age` | `n` | Variedad de edad/generación |
| `gender` | `i` | Variedad de género |
| `expert` | `b` | Nivel de experiencia |
| `interact` | `2` | Estructura interaccional |
| `prosody` | `y` | Características prosódicas |
| `lexical` | `l` | Densidad léxica (0-100) |
| `syntax` | `z` | Complejidad sintáctica (0-100) |
| `start` | `0` | Fecha de inicio (ISO 8601 sin puntuación) |
| `end` | `1` | Fecha de fin (ISO 8601 sin puntuación) |
| `taboo` | `j` | Nivel de contenido tabú/vulgar (escala 0-5) |
| `conf` | `c` | Puntuación de confianza (0-100) para la etiqueta anterior |
| — | `q`, `3`-`9` | Reservado para uso futuro |

### Clasificadores

#### 1. Clasificador ortográfico (`ortho` o `w`)
Identifica convenciones ortográficas específicas o variantes del sistema de escritura más allá de las etiquetas estándar de escritura.

Formato:
- Largo: `language-x-ortho-[variant]`
- Corto: `language-x-w-[variant]`

Ejemplos (combinados con etiquetas estándar de escritura):
- `az-Latn-x-ortho-new` o `az-Latn-x-w-new` - Azerí escritura latina, nueva ortografía
- `de-Latn-x-ortho-1901` o `de-Latn-x-w-1901` - Alemán escritura latina, ortografía de 1901
- `zh-Hans-x-ortho-pinyin` o `zh-Hans-x-w-pinyin` - Chino simplificado con pinyin
- `yi-Hebr-x-ortho-yivo` o `yi-Hebr-x-w-yivo` - Yidis escritura hebrea, ortografía YIVO

#### 2. Clasificador de formalidad (`form` o `f`)
Identifica el nivel de formalidad del uso del lenguaje.

Formato:
- Largo: `language-x-form-[1-5]`
- Corto: `language-x-f-[1-5]`

Escala de formalidad:
- 1 = Más formal (documentos escritos, discursos oficiales)
- 2 = Formal (reuniones de negocios, escritura académica)
- 3 = Neutral/estándar (noticias, conversación general)
- 4 = Informal (conversación casual, correos a amigos)
- 5 = Más casual (conversación íntima, jerga)

Ejemplos:
- `ko-x-form-1` o `ko-x-f-1` - Coreano más formal
- `en-x-form-3` o `en-x-f-3` - Inglés neutral
- `ja-x-form-5` o `ja-x-f-5` - Japonés más casual

#### 3. Clasificador de cortesía (`polite` o `p`)
Identifica el nivel de cortesía/respeto del uso del lenguaje.

Formato:
- Largo: `language-x-polite-[1-5]`
- Corto: `language-x-p-[1-5]`

Escala de cortesía:
- 1 = Más respetuoso/deferente (dirección real, contextos religiosos)
- 2 = Muy cortés (honoríficos formales, discurso respetuoso)
- 3 = Cortés/neutral (cortesía estándar)
- 4 = Familiar (entre iguales, amigos)
- 5 = Íntimo/llano (familia, amigos muy cercanos)

Ejemplos:
- `ko-x-polite-1` o `ko-x-p-1` - Coreano de máximo respeto
- `ja-x-polite-2` o `ja-x-p-2` - Japonés muy cortés
- `th-x-polite-3` o `th-x-p-3` - Tailandés cortés estándar

#### 4. Clasificador de dominio (`domain` o `d`)
Identifica vocabulario especializado o contexto profesional.

Formato:
- Largo: `language-x-domain-[domain_type]`
- Corto: `language-x-d-[domain_type]`

Ejemplos:
- `en-x-domain-legal` o `en-x-d-legal` - Inglés legal
- `ja-x-domain-med` o `ja-x-d-med` - Japonés médico
- `ko-x-domain-business` o `ko-x-d-business` - Coreano de negocios
- `ja-x-domain-tech` o `ja-x-d-tech` - Japonés técnico
- `en-x-domain-fin` o `en-x-d-fin` - Inglés financiero

#### 5. Clasificador geográfico (`geo` o `g`)
Identifica variedades lingüísticas regionales o geográficas.

Formato:
- Largo: `language-x-geo-[region]`
- Corto: `language-x-g-[region]`

Ejemplos:
- `ko-x-geo-gyeong` o `ko-x-g-gyeong` - Coreano de Gyeongsang (경상도)
- `ko-x-geo-jeolla` o `ko-x-g-jeolla` - Coreano de Jeolla (전라도)
- `es-x-geo-riopla` o `es-x-g-riopla` - Español rioplatense
- `pt-x-geo-nordeste` o `pt-x-g-nordeste` - Portugués del nordeste brasileño

#### 6. Clasificador proto (`proto` o `a`)
Identifica protolenguajes o lenguas históricas reconstruidas.

Formato:
- Largo: `x-proto-[iso639-5_code if available]`
- Corto: `x-a-[iso639-5_code if available]`

Reglas:
- DEBE usar códigos de familia de idiomas ISO 639-5 cuando estén disponibles
- Use identificadores descriptivos solo cuando no exista un código ISO 639-5

Ejemplos usando códigos ISO 639-5:
- `x-proto-ine` o `x-a-ine` - Protoindoeuropeo
- `x-proto-gem` o `x-a-gem` - Protogermánico
- `x-proto-sla` o `x-a-sla` - Protoeslavo
- `x-proto-sem` o `x-a-sem` - Protosemítico
- `x-proto-cel` o `x-a-cel` - Protocelta
- `x-proto-ira` o `x-a-ira` - Protoiranio
- `x-proto-inc` o `x-a-inc` - Protoindoario
- `x-proto-bat` o `x-a-bat` - Protobáltico
- `x-proto-roa` o `x-a-roa` - Protorromance
- `x-proto-trk` o `x-a-trk` - Prototúrquico

Ejemplos sin códigos ISO 639-5 (descriptivos, más de tres caracteres):
- `x-proto-baltslav` o `x-a-baltslav` - Protobaltoeslavo (sin código ISO 639-5)

Nota:
- Los códigos de familia de idiomas (ISO 639-5) NO son válidos como etiquetas de idioma principal estándar BCP 47, por lo que los hemos implementado usando x-proto
- Son válidos y preferidos dentro de las extensiones de uso privado (después de `x-`)
- Por lo tanto, todas las etiquetas de protolengua deben comenzar con `x-` para cumplir con BCP 47

#### 7. Clasificador histórico (`hist` o `h`)
Identifica períodos históricos o etapas de una lengua.

Formato:
- Largo: `language-x-hist-[period]`
- Corto: `language-x-h-[period]`

Ejemplos:
- `en-x-hist-old` o `en-x-h-old` - Período del inglés antiguo
- `en-x-hist-middle` o `en-x-h-middle` - Período del inglés medio
- `ja-x-hist-kobun` o `ja-x-h-kobun` - Japonés clásico (古文)
- `ko-x-hist-hunmin` o `ko-x-h-hunmin` - Coreano medio (훈민정음 período)
- `el-x-hist-koine` o `el-x-h-koine` - Griego koiné (Κοινή)
- `sa-x-hist-vedic` o `sa-x-h-vedic` - Sánscrito védico (वैदिक)

#### 8. Clasificador de género (`genre` o `e`)
Identifica el género textual o estilo literario.

Formato:
- Largo: `language-x-genre-[genre_type]`
- Corto: `language-x-e-[genre_type]`

Ejemplos:
- `en-x-genre-news` o `en-x-e-news` - Inglés de noticias
- `ja-x-genre-manga` o `ja-x-e-manga` - Japonés de manga (漫画)
- `ko-x-genre-webtoon` o `ko-x-e-webtoon` - Coreano de webtoon (웹툰)
- `zh-x-genre-shi` o `zh-x-e-shi` - Poesía china (詩)
- `fr-x-genre-bd` o `fr-x-e-bd` - Cómics franceses (bande dessinée)
- `de-x-genre-marchen` o `de-x-e-marchen` - Cuentos de hadas alemanes (Märchen)

#### 9. Clasificador de medio (`medium` o `m`)
Identifica el medio de comunicación.

Formato:
- Largo: `language-x-medium-[medium_type]`
- Corto: `language-x-m-[medium_type]`

Ejemplos:
- `en-x-medium-spoken` o `en-x-m-spoken` - Inglés hablado
- `ko-x-medium-digital` o `ko-x-m-digital` - Coreano digital/en línea
- `ja-x-medium-written` o `ja-x-m-written` - Japonés escrito
- `hi-x-medium-bcast` o `hi-x-m-bcast` - Hindi de transmisión
- `zh-x-medium-sms` o `zh-x-m-sms` - Chino de SMS/mensaje de texto

#### 10. Clasificador socio (`socio` o `s`)
Identifica sociolecto o variedades de grupos sociales.

Formato:
- Largo: `language-x-socio-[social_group]`
- Corto: `language-x-s-[social_group]`

Ejemplos:
- `en-x-socio-academic` o `en-x-s-academic` - Sociolecto académico
- `en-x-socio-urban` o `en-x-s-urban` - Sociolecto urbano
- `es-x-socio-juvenil` o `es-x-s-juvenil` - Sociolecto juvenil español (jerga juvenil)
- `fr-x-socio-jeune` o `fr-x-s-jeune` - Sociolecto juvenil francés
- `de-x-socio-jugend` o `de-x-s-jugend` - Sociolecto juvenil alemán (Jugendsprache)
- `ko-x-socio-online` o `ko-x-s-online` - Sociolecto coreano en línea

#### 11. Clasificador de modalidad (`modality` o `o`)
Identifica el modo fundamental de producción del lenguaje.

Formato:
- Largo: `language-x-modality-[mode]`
- Corto: `language-x-o-[mode]`

Ejemplos:
- `en-x-modality-spoken` o `en-x-o-spoken` - Inglés hablado
- `en-x-modality-written` o `en-x-o-written` - Inglés escrito
- `asl-x-modality-signed` o `asl-x-o-signed` - Lengua de señas americana
- `en-x-modality-multi` o `en-x-o-multi` - Inglés multimodal (habla + gestos)
- `fr-x-modality-tactile` o `fr-x-o-tactile` - Francés táctil (para sordociegos)

#### 12. Clasificador de registro (`register` o `r`)
Identifica el registro lingüístico o variedad funcional del uso del lenguaje.

Formato:
- Largo: `language-x-register-[register_type]`
- Corto: `language-x-r-[register_type]`

Ejemplos:
- `en-x-register-frozen` o `en-x-r-frozen` - Registro congelado (oraciones, juramentos)
- `en-x-register-formal` o `en-x-r-formal` - Registro formal (artículos académicos)
- `en-x-register-consult` o `en-x-r-consult` - Registro consultivo (profesional)
- `en-x-register-casual` o `en-x-r-casual` - Registro casual (amigos)
- `en-x-register-intimate` o `en-x-r-intimate` - Registro íntimo (familia)

#### 13. Clasificador de función pragmática (`pragma` o `u`)
Identifica la función comunicativa o acto de habla.

Formato:
- Largo: `language-x-pragma-[function]`
- Corto: `language-x-u-[function]`

Ejemplos:
- `en-x-pragma-request` o `en-x-u-request` - Función de solicitud
- `ja-x-pragma-apology` o `ja-x-u-apology` - Función de disculpa
- `es-x-pragma-complmnt` o `es-x-u-complmnt` - Función de cumplido
- `ar-x-pragma-greeting` o `ar-x-u-greeting` - Función de saludo
- `zh-x-pragma-refusal` o `zh-x-u-refusal` - Función de rechazo

#### 14. Clasificador de marcación temporal (`temporal` o `t`)
Identifica aspectos temporales o patrones de uso del tiempo.

Formato:
- Largo: `language-x-temporal-[aspect]`
- Corto: `language-x-t-[aspect]`

Ejemplos:
- `en-x-temporal-past` o `en-x-t-past` - Discurso orientado al pasado
- `ja-x-temporal-nonpast` o `ja-x-t-nonpast` - Enfoque no pasado
- `id-x-temporal-atemprl` o `id-x-t-atemprl` - Atemporal/sin tiempo
- `fr-x-temporal-future` o `fr-x-t-future` - Orientado al futuro
- `zh-x-temporal-aspect` o `zh-x-t-aspect` - Enfoque aspectual

#### 15. Clasificador de evidencialidad (`evidence` o `v`)
Identifica la marcación de fuente de información.

Formato:
- Largo: `language-x-evidence-[source]`
- Corto: `language-x-v-[source]`

Ejemplos:
- `qu-x-evidence-direct` o `qu-x-v-direct` - Testigo directo
- `tr-x-evidence-hearsay` o `tr-x-v-hearsay` - De oídas/reportado
- `ja-x-evidence-infer` o `ja-x-v-infer` - Inferencial
- `en-x-evidence-assume` o `en-x-v-assume` - Asumido
- `de-x-evidence-quote` o `de-x-v-quote` - Citativo

#### 16. Clasificador de afecto/emoción (`affect` o `k`)
Identifica el tono emocional o afecto.

Formato:
- Largo: `language-x-affect-[emotion]`
- Corto: `language-x-k-[emotion]`

Ejemplos:
- `en-x-affect-angry` o `en-x-k-angry` - Tono enojado
- `ja-x-affect-humble` o `ja-x-k-humble` - Afecto humilde
- `es-x-affect-joyful` o `es-x-k-joyful` - Expresión alegre
- `ko-x-affect-sad` o `ko-x-k-sad` - Triste/melancólico
- `fr-x-affect-neutral` o `fr-x-k-neutral` - Afecto neutral

#### 17. Clasificador de edad/generación (`age` o `n`)
Identifica variedades lingüísticas relacionadas con la edad o generación.

Formato:
- Largo: `language-x-age-[generation]`
- Corto: `language-x-n-[generation]`

Ejemplos:
- `en-x-age-child` o `en-x-n-child` - Habla infantil
- `ja-x-age-teen` o `ja-x-n-teen` - Lenguaje adolescente
- `ko-x-age-elder` o `ko-x-n-elder` - Habla de ancianos
- `es-x-age-genz` o `es-x-n-genz` - Generación Z
- `zh-x-age-millenl` o `zh-x-n-millenl` - Habla millennial

#### 18. Clasificador de género (`gender` o `i`)
Identifica variedades lingüísticas relacionadas con el género.

Formato:
- Largo: `language-x-gender-[identity]`
- Corto: `language-x-i-[identity]`

Ejemplos:
(Ejemplos eliminados)

#### 19. Clasificador de nivel de experiencia (`expert` o `b`)
Identifica el nivel de experiencia en el dominio en una escala de 0-10.

Formato:
- Largo: `language-x-expert-[0-10]`
- Corto: `language-x-b-[0-10]`

Escala de experiencia:
- 0 = Sin conocimiento
- 1-2 = Principiante
- 3-4 = Intermedio
- 5-6 = Avanzado
- 7-8 = Experto
- 9-10 = Maestro/Autoridad

Ejemplos:
- `en-x-expert-0` o `en-x-b-0` - Sin experiencia
- `de-x-expert-3` o `de-x-b-3` - Nivel intermedio
- `ja-x-expert-7` o `ja-x-b-7` - Nivel experto
- `es-x-expert-9` o `es-x-b-9` - Nivel maestro
- `zh-x-expert-5` o `zh-x-b-5` - Nivel avanzado

#### 20. Clasificador de estructura interaccional (`interact` o `2`)
Identifica patrones conversacionales o interaccionales.

Formato:
- Largo: `language-x-interact-[structure]`
- Corto: `language-x-2-[structure]`

Ejemplos:
- `en-x-interact-turn` o `en-x-2-turn` - Turnos de habla
- `ja-x-interact-overlap` o `ja-x-2-overlap` - Habla superpuesta
- `es-x-interact-monolog` o `es-x-2-monolog` - Monológico
- `ar-x-interact-dialog` o `ar-x-2-dialog` - Dialógico
- `zh-x-interact-multi` o `zh-x-2-multi` - Multipartito

#### 21. Clasificador de características prosódicas (`prosody` o `y`)
Identifica características prosódicas o suprasegmentales.

Formato:
- Largo: `language-x-prosody-[feature]`
- Corto: `language-x-y-[feature]`

Ejemplos:
- `en-x-prosody-stress` o `en-x-y-stress` - Acentual
- `ja-x-prosody-pitch` o `ja-x-y-pitch` - Acento tonal
- `fr-x-prosody-syllable` o `fr-x-y-syllable` - Silábico
- `zh-x-prosody-tone` o `zh-x-y-tone` - Patrones tonales
- `es-x-prosody-rhythm` o `es-x-y-rhythm` - Patrones rítmicos

#### 22. Clasificador de densidad léxica (`lexical` o `l`)
Identifica la densidad léxica como un valor numérico (0-100).

Formato:
- Largo: `language-x-lexical-[0-100]`
- Corto: `language-x-l-[0-100]`

Ejemplos:
- `en-x-lexical-20` o `en-x-l-20` - Baja densidad (20%)
- `de-x-lexical-55` o `de-x-l-55` - Densidad media (55%)
- `ja-x-lexical-75` o `ja-x-l-75` - Alta densidad (75%)
- `es-x-lexical-40` o `es-x-l-40` - Densidad moderada (40%)
- `zh-x-lexical-85` o `zh-x-l-85` - Densidad muy alta (85%)

#### 23. Clasificador de complejidad sintáctica (`syntax` o `z`)
Identifica la complejidad sintáctica como un valor numérico (0-100).

Formato:
- Largo: `language-x-syntax-[0-100]`
- Corto: `language-x-z-[0-100]`

Ejemplos:
- `en-x-syntax-15` o `en-x-z-15` - Sintaxis simple (15%)
- `de-x-syntax-70` o `de-x-z-70` - Sintaxis compleja (70%)
- `ja-x-syntax-45` o `ja-x-z-45` - Complejidad moderada (45%)
- `es-x-syntax-30` o `es-x-z-30` - Baja complejidad (30%)
- `zh-x-syntax-60` o `zh-x-z-60` - Alta complejidad (60%)

#### 24. Clasificador de fecha de inicio (`start` o `0`)
Identifica la fecha de inicio del uso del lenguaje (formato ISO 8601 sin puntuación).

Formato:
- Largo: `language-x-start-[YYYYMMDD]`
- Corto: `language-x-0-[YYYYMMDD]`

Formatos de fecha:
- Fecha completa: YYYYMMDD
- Año-mes: YYYYMM
- Solo año: YYYY

Ejemplos:
- `en-x-start-20240315` o `en-x-0-20240315` - Inglés comenzando el 15 de marzo de 2024
- `ja-x-start-19890108` o `ja-x-0-19890108` - Japonés comenzando el 8 de enero de 1989
- `es-x-start-202403` o `es-x-0-202403` - Español comenzando en marzo de 2024

#### 25. Clasificador de fecha de fin (`end` o `1`)
Identifica la fecha de fin del uso del lenguaje (formato ISO 8601 sin puntuación).

Formato:
- Largo: `language-x-end-[YYYYMMDD]`
- Corto: `language-x-1-[YYYYMMDD]`

Formatos de fecha:
- Fecha completa: YYYYMMDD
- Año-mes: YYYYMM
- Solo año: YYYY

Ejemplos:
- `en-x-end-20240415` o `en-x-1-20240415` - Inglés terminando el 15 de abril de 2024
- `ja-x-end-20190430` o `ja-x-1-20190430` - Japonés terminando el 30 de abril de 2019
- `es-x-end-202412` o `es-x-1-202412` - Español terminando en diciembre de 2024

#### 26. Clasificador de tabú (`taboo` o `j`)
Identifica el nivel de contenido tabú, vulgar u ofensivo.

Formato:
- Largo: `language-x-taboo-[0-5]`
- Corto: `language-x-j-[0-5]`

Ejemplos:
- `en-x-taboo-0` o `en-x-j-0` - Sin contenido tabú
- `en-x-taboo-3` o `en-x-j-3` - Nivel de tabú moderado
- `ja-x-form-5-taboo-4` o `ja-x-f-5-j-4` - Japonés muy casual con alto nivel de tabú

#### 27. Clasificador de confianza (`conf` o `c`)
Indica la puntuación de confianza para el clasificador inmediatamente anterior.

Formato:
- Largo: `language-x-[classifier]-[value]-conf-[0-100]`
- Corto: `language-x-[classifier]-[value]-c-[0-100]`

Comportamiento especial:
- La puntuación de confianza se aplica al clasificador inmediatamente anterior
- Se pueden usar múltiples puntuaciones de confianza para diferentes clasificadores
- Si no hay clasificador precedente, la confianza se aplica a la etiqueta de idioma base

Ejemplos:
- `en-x-form-3-conf-95` o `en-x-f-3-c-95` - Formalidad neutral con 95% de confianza
- `ko-x-polite-2-conf-80-domain-med-conf-60` o `ko-x-p-2-c-80-d-med-c-60` - Muy cortés (80% confianza) coreano médico (60% confianza)
- `ja-x-hist-kobun-conf-100` o `ja-x-h-kobun-c-100` - Japonés clásico con 100% de confianza
- `x-proto-ine-conf-75` o `x-a-ine-c-75` - Protoindoeuropeo con 75% de confianza

### Clasificaciones múltiples

LVTag admite múltiples clasificadores en una sola etiqueta para proporcionar una identificación precisa del idioma. Se pueden mezclar formas largas y cortas:

```
ko-x-form-4-domain-business
ko-x-f-4-d-business
ko-x-form-4-polite-2-domain-business
ko-x-f-4-p-2-d-business
```

Los ejemplos anteriores muestran coreano con formalidad informal (4) pero habla cortés (2) en contexto empresarial.

## Valores válidos

**Nota**: Todos los valores deben tener 8 caracteres o menos para cumplir con las restricciones de longitud de subetiqueta BCP 47. Si bien los valores específicos para muchos clasificadores deben establecerse a través del uso experto y el consenso de la comunidad, las escalas numéricas, formatos de fecha y valores básicos enumerados a continuación están definidos en este estándar.

### Escala de formalidad (Universal)

| Nivel | Descripción | Ejemplos |
|-------|-------------|----------|
| 1 | Más formal | Documentos legales, ceremonias oficiales, artículos académicos |
| 2 | Formal | Cartas comerciales, artículos de noticias, presentaciones |
| 3 | Neutral | Conversación estándar, correo electrónico, escritura general |
| 4 | Informal | Conversación casual, blogs personales, mensajes de texto |
| 5 | Más casual | Jerga, conversación íntima, redes sociales |

### Escala de cortesía (Universal)

| Nivel | Descripción | Ejemplos |
|-------|-------------|----------|
| 1 | Más respetuoso | Dirección real, líderes religiosos, respeto a los ancianos |
| 2 | Muy cortés | Servicio al cliente, reuniones formales, maestros |
| 3 | Cortés/neutral | Interacciones estándar, colegas |
| 4 | Familiar | Amigos, compañeros, conocidos casuales |
| 5 | Íntimo/llano | Familia cercana, parejas íntimas |

### Escala de experiencia (Universal)

| Nivel | Descripción |
|-------|-------------|
| 0 | Sin conocimiento |
| 1-2 | Principiante |
| 3-4 | Intermedio |
| 5-6 | Avanzado |
| 7-8 | Experto |
| 9-10 | Maestro/Autoridad |

### Escala de tabú (Universal)

| Nivel | Descripción |
|-------|-------------|
| 0 | Sin contenido tabú |
| 1 | Tabú leve |
| 2 | Tabú ligero |
| 3 | Tabú moderado |
| 4 | Tabú alto |
| 5 | Tabú extremo |

### Escala de densidad léxica (Universal)

| Nivel | Descripción |
|-------|-------------|
| 0-20 | Densidad muy baja |
| 21-40 | Densidad baja |
| 41-60 | Densidad moderada |
| 61-80 | Densidad alta |
| 81-100 | Densidad muy alta |

### Escala de complejidad sintáctica (Universal)

| Nivel | Descripción |
|-------|-------------|
| 0-20 | Muy simple |
| 21-40 | Simple |
| 41-60 | Complejidad moderada |
| 61-80 | Complejo |
| 81-100 | Muy complejo |

### Valores de dominio

| Valor | Descripción |
|-------|-------------|
| `legal` | Terminología legal |
| `med` | Terminología médica |
| `tech` | Técnico/TI |
| `business` | Negocios/corporativo |
| `fin` | Finanzas/banca |
| `acad` | Académico/erudito |
| `sci` | Científico/investigación |

## Ejemplos de implementación

### Clasificador único (Forma larga)
```
# Coreano más formal
ko-x-form-1

# Japonés muy cortés
ja-x-polite-2

# Inglés legal
en-x-domain-legal

# Coreano de Gyeongsang
ko-x-geo-gyeong

# Protoindoeuropeo
x-proto-ine
```

### Clasificador único (Forma corta)
```
# Coreano más formal
ko-x-f-1

# Japonés muy cortés
ja-x-p-2

# Inglés legal
en-x-d-legal

# Coreano de Gyeongsang
ko-x-g-gyeong

# Protoindoeuropeo
x-a-ine
```

### Múltiples clasificadores
```
# Lenguaje empresarial coreano informal pero cortés
ko-x-form-4-polite-2-domain-business
ko-x-f-4-p-2-d-business

# Lenguaje médico japonés formal y respetuoso
ja-x-form-1-polite-1-domain-med
ja-x-f-1-p-1-d-med

# Vietnamita del sur con formalidad neutral, habla cortés, dominio técnico
vi-x-geo-southern-form-3-polite-2-domain-tech
vi-x-g-southern-f-3-p-2-d-tech

# Clasificación compleja con múltiples dimensiones
en-x-h-middle-e-poetry-m-written-f-1
ja-x-f-2-p-1-d-med-h-kobun-m-written

# Variedades lingüísticas que muestran distinción formalidad/cortesía
ko-x-f-5-p-2  # Muy casual pero cortés (a un amigo mayor)
ko-x-f-1-p-4  # Muy formal pero familiar (escrito a un compañero)
ja-x-f-4-p-1  # Formalidad casual pero máximo respeto
en-x-f-5-j-4  # Inglés muy casual con alto nivel de tabú
```

## Casos de uso

1. **Aplicaciones de aprendizaje de idiomas**
   - Enseñar el registro apropiado para diferentes contextos sociales
   - Proporcionar entrenamiento de vocabulario específico del dominio

2. **Traducción automática**
   - Mantener la consistencia del registro en las traducciones
   - Aplicar terminología específica del dominio

3. **Clasificación de contenido**
   - Categorizar automáticamente el texto por formalidad y dominio
   - Dirigir el contenido a revisores o sistemas apropiados

4. **Lingüística de corpus**
   - Construir corpus etiquetados para investigación lingüística
   - Estudiar la variación de registro y dominio

## Reglas de validación

1. **Longitud de subetiqueta**: Cada subetiqueta después de `x-` debe tener 8 caracteres o menos
2. **Orden**: Los clasificadores pueden aparecer en cualquier orden después de `x-`
3. **Unicidad**: Cada tipo de clasificador debe aparecer solo una vez por etiqueta (excepto `conf` que puede aparecer múltiples veces)
4. **Mayúsculas/minúsculas**: Las etiquetas deben estar en minúsculas (no sensible a mayúsculas según BCP 47)
5. **Etiquetas mágicas**: Las etiquetas de forma corta son caracteres únicos; `q`, `3`-`9` están reservados para uso futuro
6. **Mezcla**: Las formas largas y cortas se pueden mezclar dentro de la misma etiqueta
7. **Etiquetas proto**: Deben comenzar con `x-` y DEBERÍAN usar códigos ISO 639-5 cuando estén disponibles (p. ej., `x-proto-sla` no `x-proto-slavic`)
8. **Confianza**: El clasificador `conf`/`c` se aplica al clasificador inmediatamente anterior
9. **Valores numéricos**: Deben estar dentro de los rangos definidos (0-5 para tabú, 0-10 para experiencia, 0-100 para valores porcentuales)
10. **Formato de fecha**: Las fechas usan ISO 8601 sin puntuación (YYYY, YYYYMM o YYYYMMDD)

## Compatibilidad

El formato LVTag es totalmente compatible con:
- BCP 47 (RFC 5646)
- Códigos de idioma ISO 639
- Registro de subetiquetas de idioma IANA
- Unicode CLDR

## Beneficios

1. **Precisión**: Permite la identificación de variedades lingüísticas de grano fino
2. **Extensibilidad**: Se pueden agregar nuevos registros y dominios
3. **Basado en estándares**: Construido sobre el mecanismo de uso privado BCP 47 establecido
4. **Legible por máquina**: El formato sistemático permite el procesamiento automatizado
5. **Legible por humanos**: Subetiquetas claras y descriptivas
6. **Flexibilidad**: Soporte para etiquetas tanto de forma larga detallada como de forma corta concisa
7. **Brevedad**: Las etiquetas mágicas cortas permiten una representación compacta manteniendo la claridad

## Extensiones futuras

LVTag está diseñado para evolucionar con las necesidades de la comunidad de tecnología lingüística. Damos la bienvenida a sugerencias para nuevos clasificadores, mejoras a los existentes y comentarios de implementaciones del mundo real.

Para proponer extensiones o contribuir a la especificación:
- Abra un issue en [github.com/lvtag/spec](https://github.com/lvtag/spec)
- Únase a la discusión sobre propuestas existentes
- Comparta sus experiencias de implementación
- Envíe pull requests para mejoras de documentación

Los códigos de un solo carácter reservados (`q`, `3`-`9`) están disponibles para futuras extensiones estandarizadas.

## Referencias

- [BCP 47: Etiquetas para identificar idiomas](https://www.rfc-editor.org/rfc/rfc5646.html)
- [Registro de subetiquetas de idioma IANA](https://www.iana.org/assignments/language-subtag-registry/)

---

## Licencia y concesión de patentes

Esta especificación se publica bajo **CC0 1.0 Universal (Dedicación de dominio público)**.

**Por qué CC0**: Para garantizar la máxima adopción y libertad de implementación, LVTag se coloca en el dominio público. Esto significa:
- No se necesita permiso para usar, implementar o modificar
- No se requiere atribución (aunque se aprecia)
- Sin barreras legales para uso comercial o gubernamental
- Compatible con todas las licencias de software
- Utilizado por estándares principales como Unicode CLDR

**Concesión de patentes**: Cualquier patente que cubra la especificación LVTag se licencia por la presente libre de regalías para cualquier implementación que cumpla con esta especificación.

**Sin respaldo**: El uso de LVTag no implica respaldo por parte de los autores de la especificación.

En la medida permitida por la ley, **Danslav Slavenskoj** ha renunciado a todos los derechos de autor y derechos relacionados o conexos a la Especificación del formato Language Variant Tag (LVTag). Este trabajo se publica desde: Estados Unidos de América.
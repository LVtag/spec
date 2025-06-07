#!/usr/bin/env node

/**
 * LVTag Validator - JavaScript implementation
 * Language Variant Tag (LVTag) format validator
 * Version 1.0
 * 
 * Validates language tags according to the LVTag specification
 * which extends BCP 47 using private-use subtags.
 */

class LVTagValidator {
  constructor() {
    // Define classifier mappings
    this.classifiers = {
      // Long form to short form mappings
      ortho: 'w', form: 'f', polite: 'p', domain: 'd', geo: 'g',
      proto: 'a', hist: 'h', genre: 'e', medium: 'm', socio: 's',
      modality: 'o', register: 'r', pragma: 'u', temporal: 't',
      evidence: 'v', affect: 'k', age: 'n', gender: 'i', expert: 'b',
      interact: '2', prosody: 'y', lexical: 'l', syntax: 'z',
      start: '0', end: '1', taboo: 'j', conf: 'c'
    };

    // Reverse mapping for validation
    this.shortToLong = Object.fromEntries(
      Object.entries(this.classifiers).map(([k, v]) => [v, k])
    );

    // Valid numeric scales
    this.numericScales = {
      form: { min: 1, max: 5 },
      polite: { min: 1, max: 5 },
      taboo: { min: 0, max: 5 },
      expert: { min: 0, max: 10 },
      lexical: { min: 0, max: 100 },
      syntax: { min: 0, max: 100 },
      conf: { min: 0, max: 100 }
    };

    // Valid domain values
    this.domainValues = ['legal', 'med', 'tech', 'business', 'fin', 'acad', 'sci'];

    // ISO 639-5 language family codes
    this.iso639_5 = [
      'ine', 'gem', 'sla', 'sem', 'cel', 'ira', 'inc', 'bat', 'roa', 'trk',
      'dra', 'fiu', 'cau', 'afa', 'aus', 'paa', 'tai', 'hmn', 'sit', 'tut',
      'myn', 'nai', 'sai', 'art', 'ber', 'cus', 'egy', 'nub', 'ssa', 'nic',
      'bnt', 'khi', 'kro', 'mno', 'mun', 'oto', 'phi', 'pra', 'sal', 'sio',
      'son', 'tup', 'wak', 'ypk', 'znd'
    ];

    // Reserved short forms
    this.reserved = ['q', '3', '4', '5', '6', '7', '8', '9'];
  }

  /**
   * Validate a complete LVTag
   * @param {string} tag - The language tag to validate
   * @returns {object} Validation result with isValid and errors/warnings
   */
  validate(tag) {
    const result = {
      isValid: true,
      errors: [],
      warnings: [],
      parsed: null
    };

    if (!tag || typeof tag !== 'string') {
      result.isValid = false;
      result.errors.push('Tag must be a non-empty string');
      return result;
    }

    // Basic pattern check
    const pattern = /^(([a-z]{2,3}|x)(-[a-z0-9]{1,8})*(-x(-[a-z0-9]{1,8})+))$/;
    if (!pattern.test(tag.toLowerCase())) {
      result.isValid = false;
      result.errors.push('Tag does not match basic LVTag pattern');
      return result;
    }

    // Parse the tag
    const parsed = this.parse(tag.toLowerCase());
    result.parsed = parsed;

    // Validate proto-language tags
    if (parsed.language === 'x' && parsed.classifiers.length > 0) {
      const firstClassifier = parsed.classifiers[0];
      if (firstClassifier.type !== 'proto' && firstClassifier.type !== 'a') {
        result.isValid = false;
        result.errors.push('Tags starting with "x" must have proto/a as first classifier');
      }
    }

    // Validate each classifier
    const seenClassifiers = new Set();
    for (let i = 0; i < parsed.classifiers.length; i++) {
      const classifier = parsed.classifiers[i];
      const validation = this.validateClassifier(classifier, i, parsed.classifiers);
      
      if (validation.errors.length > 0) {
        result.isValid = false;
        result.errors.push(...validation.errors);
      }
      
      result.warnings.push(...validation.warnings);

      // Check for duplicate classifiers (except conf)
      if (classifier.type !== 'conf' && classifier.type !== 'c') {
        const key = this.normalizeClassifierType(classifier.type);
        if (seenClassifiers.has(key)) {
          result.warnings.push(`Duplicate classifier: ${classifier.type}`);
        }
        seenClassifiers.add(key);
      }
    }

    return result;
  }

  /**
   * Parse a language tag into components
   * @param {string} tag - The language tag to parse
   * @returns {object} Parsed components
   */
  parse(tag) {
    const parts = tag.split('-');
    const result = {
      language: parts[0],
      subtags: [],
      classifiers: []
    };

    let inPrivateUse = false;
    let i = 1;

    // Parse standard subtags before private use
    while (i < parts.length && parts[i] !== 'x') {
      result.subtags.push(parts[i]);
      i++;
    }

    // Parse private use section
    if (i < parts.length && parts[i] === 'x') {
      i++; // Skip 'x'
      while (i < parts.length) {
        const type = parts[i];
        const value = parts[i + 1];
        
        if (value !== undefined) {
          result.classifiers.push({ type, value });
          i += 2;
        } else {
          // Handle case where value might be missing
          result.classifiers.push({ type, value: '' });
          i++;
        }
      }
    }

    return result;
  }

  /**
   * Normalize classifier type (convert long form to short form)
   * @param {string} type - Classifier type
   * @returns {string} Normalized type
   */
  normalizeClassifierType(type) {
    return this.classifiers[type] || type;
  }

  /**
   * Validate a single classifier
   * @param {object} classifier - The classifier to validate
   * @param {number} index - Index in classifiers array
   * @param {array} allClassifiers - All classifiers for context
   * @returns {object} Validation result
   */
  validateClassifier(classifier, index, allClassifiers) {
    const result = { errors: [], warnings: [] };
    const { type, value } = classifier;

    // Check if classifier type is valid
    if (!this.classifiers[type] && !this.shortToLong[type]) {
      if (this.reserved.includes(type)) {
        result.warnings.push(`Using reserved classifier: ${type}`);
      } else {
        result.errors.push(`Unknown classifier type: ${type}`);
        return result;
      }
    }

    // Validate subtag length
    if (value.length > 8) {
      result.errors.push(`Value too long for ${type}: ${value} (max 8 characters)`);
    }

    // Get the canonical name for the classifier
    const canonicalType = this.shortToLong[type] || type;

    // Validate specific classifier values
    switch (canonicalType) {
      case 'form':
      case 'polite':
      case 'taboo':
      case 'expert':
      case 'lexical':
      case 'syntax':
      case 'conf':
        const scale = this.numericScales[canonicalType];
        const num = parseInt(value);
        if (isNaN(num) || num < scale.min || num > scale.max) {
          result.errors.push(`Invalid ${canonicalType} value: ${value} (must be ${scale.min}-${scale.max})`);
        }
        break;

      case 'domain':
        if (!this.domainValues.includes(value) && value.length > 0) {
          result.warnings.push(`Non-standard domain value: ${value}`);
        }
        break;

      case 'proto':
        if (this.iso639_5.includes(value)) {
          // Valid ISO 639-5 code
        } else if (value.length <= 3) {
          result.warnings.push(`Proto value "${value}" is not a recognized ISO 639-5 code`);
        }
        break;

      case 'start':
      case 'end':
        if (!this.isValidDate(value)) {
          result.errors.push(`Invalid date format for ${canonicalType}: ${value}`);
        }
        break;

      case 'conf':
        // Confidence should apply to previous classifier
        if (index === 0) {
          result.warnings.push('Confidence classifier has no preceding classifier');
        }
        break;
    }

    return result;
  }

  /**
   * Validate date format (YYYY, YYYYMM, or YYYYMMDD)
   * @param {string} date - Date string to validate
   * @returns {boolean} Whether date is valid
   */
  isValidDate(date) {
    if (!/^\d{4}(\d{2}(\d{2})?)?$/.test(date)) {
      return false;
    }

    const year = parseInt(date.substr(0, 4));
    if (year < 1 || year > 9999) return false;

    if (date.length >= 6) {
      const month = parseInt(date.substr(4, 2));
      if (month < 1 || month > 12) return false;
    }

    if (date.length === 8) {
      const day = parseInt(date.substr(6, 2));
      if (day < 1 || day > 31) return false;
    }

    return true;
  }

  /**
   * Format validation result for display
   * @param {object} result - Validation result
   * @returns {string} Formatted result
   */
  formatResult(result) {
    let output = '';
    
    if (result.isValid) {
      output += '✓ Valid LVTag\n';
    } else {
      output += '✗ Invalid LVTag\n';
    }

    if (result.errors.length > 0) {
      output += '\nErrors:\n';
      result.errors.forEach(error => {
        output += `  - ${error}\n`;
      });
    }

    if (result.warnings.length > 0) {
      output += '\nWarnings:\n';
      result.warnings.forEach(warning => {
        output += `  - ${warning}\n`;
      });
    }

    if (result.parsed) {
      output += '\nParsed structure:\n';
      output += `  Language: ${result.parsed.language}\n`;
      if (result.parsed.subtags.length > 0) {
        output += `  Subtags: ${result.parsed.subtags.join(', ')}\n`;
      }
      if (result.parsed.classifiers.length > 0) {
        output += '  Classifiers:\n';
        result.parsed.classifiers.forEach(c => {
          const longForm = this.shortToLong[c.type] || c.type;
          output += `    - ${longForm} (${c.type}): ${c.value}\n`;
        });
      }
    }

    return output;
  }
}

// CLI interface
if (require.main === module) {
  const validator = new LVTagValidator();
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('LVTag Validator v1.0');
    console.log('Usage: node lvtag-validator.js <tag1> [tag2] ...');
    console.log('\nExamples:');
    console.log('  node lvtag-validator.js en-x-f-3');
    console.log('  node lvtag-validator.js ko-x-form-1-polite-2');
    console.log('  node lvtag-validator.js x-proto-ine');
    process.exit(0);
  }

  // Validate each provided tag
  args.forEach(tag => {
    console.log(`\nValidating: ${tag}`);
    console.log('─'.repeat(50));
    const result = validator.validate(tag);
    console.log(validator.formatResult(result));
  });
}

// Export for use as module
module.exports = LVTagValidator;
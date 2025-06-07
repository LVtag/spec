#!/usr/bin/env python3

"""
LVTag Validator - Python implementation
Language Variant Tag (LVTag) format validator
Version 1.0

Validates language tags according to the LVTag specification
which extends BCP 47 using private-use subtags.
"""

import re
import sys
import json
from typing import Dict, List, Tuple, Optional, Set


class LVTagValidator:
    """Validator for Language Variant Tag (LVTag) format"""
    
    def __init__(self):
        # Define classifier mappings
        self.classifiers = {
            # Long form to short form mappings
            'ortho': 'w', 'form': 'f', 'polite': 'p', 'domain': 'd', 'geo': 'g',
            'proto': 'a', 'hist': 'h', 'genre': 'e', 'medium': 'm', 'socio': 's',
            'modality': 'o', 'register': 'r', 'pragma': 'u', 'temporal': 't',
            'evidence': 'v', 'affect': 'k', 'age': 'n', 'gender': 'i', 'expert': 'b',
            'interact': '2', 'prosody': 'y', 'lexical': 'l', 'syntax': 'z',
            'start': '0', 'end': '1', 'taboo': 'j', 'conf': 'c'
        }
        
        # Reverse mapping for validation
        self.short_to_long = {v: k for k, v in self.classifiers.items()}
        
        # Valid numeric scales
        self.numeric_scales = {
            'form': {'min': 1, 'max': 5},
            'polite': {'min': 1, 'max': 5},
            'taboo': {'min': 0, 'max': 5},
            'expert': {'min': 0, 'max': 10},
            'lexical': {'min': 0, 'max': 100},
            'syntax': {'min': 0, 'max': 100},
            'conf': {'min': 0, 'max': 100}
        }
        
        # Valid domain values
        self.domain_values = ['legal', 'med', 'tech', 'business', 'fin', 'acad', 'sci']
        
        # ISO 639-5 language family codes
        self.iso639_5 = {
            'ine', 'gem', 'sla', 'sem', 'cel', 'ira', 'inc', 'bat', 'roa', 'trk',
            'dra', 'fiu', 'cau', 'afa', 'aus', 'paa', 'tai', 'hmn', 'sit', 'tut',
            'myn', 'nai', 'sai', 'art', 'ber', 'cus', 'egy', 'nub', 'ssa', 'nic',
            'bnt', 'khi', 'kro', 'mno', 'mun', 'oto', 'phi', 'pra', 'sal', 'sio',
            'son', 'tup', 'wak', 'ypk', 'znd'
        }
        
        # Reserved short forms
        self.reserved = {'q', '3', '4', '5', '6', '7', '8', '9'}
        
        # Basic pattern for LVTag
        self.pattern = re.compile(r'^(([a-z]{2,3}|x)(-[a-z0-9]{1,8})*(-x(-[a-z0-9]{1,8})+))$')

    def validate(self, tag: str) -> Dict:
        """
        Validate a complete LVTag
        
        Args:
            tag: The language tag to validate
            
        Returns:
            Dictionary with validation results
        """
        result = {
            'is_valid': True,
            'errors': [],
            'warnings': [],
            'parsed': None
        }
        
        if not tag or not isinstance(tag, str):
            result['is_valid'] = False
            result['errors'].append('Tag must be a non-empty string')
            return result
        
        # Basic pattern check
        if not self.pattern.match(tag.lower()):
            result['is_valid'] = False
            result['errors'].append('Tag does not match basic LVTag pattern')
            return result
        
        # Parse the tag
        parsed = self.parse(tag.lower())
        result['parsed'] = parsed
        
        # Validate proto-language tags
        if parsed['language'] == 'x' and parsed['classifiers']:
            first_classifier = parsed['classifiers'][0]
            if first_classifier['type'] not in ('proto', 'a'):
                result['is_valid'] = False
                result['errors'].append('Tags starting with "x" must have proto/a as first classifier')
        
        # Validate each classifier
        seen_classifiers = set()
        for i, classifier in enumerate(parsed['classifiers']):
            validation = self._validate_classifier(classifier, i, parsed['classifiers'])
            
            if validation['errors']:
                result['is_valid'] = False
                result['errors'].extend(validation['errors'])
            
            result['warnings'].extend(validation['warnings'])
            
            # Check for duplicate classifiers (except conf)
            if classifier['type'] not in ('conf', 'c'):
                key = self._normalize_classifier_type(classifier['type'])
                if key in seen_classifiers:
                    result['warnings'].append(f"Duplicate classifier: {classifier['type']}")
                seen_classifiers.add(key)
        
        return result

    def parse(self, tag: str) -> Dict:
        """
        Parse a language tag into components
        
        Args:
            tag: The language tag to parse
            
        Returns:
            Dictionary with parsed components
        """
        parts = tag.split('-')
        result = {
            'language': parts[0],
            'subtags': [],
            'classifiers': []
        }
        
        i = 1
        
        # Parse standard subtags before private use
        while i < len(parts) and parts[i] != 'x':
            result['subtags'].append(parts[i])
            i += 1
        
        # Parse private use section
        if i < len(parts) and parts[i] == 'x':
            i += 1  # Skip 'x'
            while i < len(parts):
                classifier_type = parts[i]
                
                if i + 1 < len(parts):
                    value = parts[i + 1]
                    result['classifiers'].append({'type': classifier_type, 'value': value})
                    i += 2
                else:
                    # Handle case where value might be missing
                    result['classifiers'].append({'type': classifier_type, 'value': ''})
                    i += 1
        
        return result

    def _normalize_classifier_type(self, classifier_type: str) -> str:
        """Normalize classifier type (convert long form to short form)"""
        return self.classifiers.get(classifier_type, classifier_type)

    def _validate_classifier(self, classifier: Dict, index: int, all_classifiers: List) -> Dict:
        """
        Validate a single classifier
        
        Args:
            classifier: The classifier to validate
            index: Index in classifiers array
            all_classifiers: All classifiers for context
            
        Returns:
            Dictionary with errors and warnings
        """
        result = {'errors': [], 'warnings': []}
        classifier_type = classifier['type']
        value = classifier['value']
        
        # Check if classifier type is valid
        if classifier_type not in self.classifiers and classifier_type not in self.short_to_long:
            if classifier_type in self.reserved:
                result['warnings'].append(f'Using reserved classifier: {classifier_type}')
            else:
                result['errors'].append(f'Unknown classifier type: {classifier_type}')
                return result
        
        # Validate subtag length
        if len(value) > 8:
            result['errors'].append(f'Value too long for {classifier_type}: {value} (max 8 characters)')
        
        # Get the canonical name for the classifier
        canonical_type = self.short_to_long.get(classifier_type, classifier_type)
        
        # Validate specific classifier values
        if canonical_type in self.numeric_scales:
            scale = self.numeric_scales[canonical_type]
            try:
                num = int(value)
                if num < scale['min'] or num > scale['max']:
                    result['errors'].append(
                        f"Invalid {canonical_type} value: {value} "
                        f"(must be {scale['min']}-{scale['max']})"
                    )
            except ValueError:
                result['errors'].append(f"Invalid numeric value for {canonical_type}: {value}")
        
        elif canonical_type == 'domain':
            if value and value not in self.domain_values:
                result['warnings'].append(f'Non-standard domain value: {value}')
        
        elif canonical_type == 'proto':
            if value in self.iso639_5:
                pass  # Valid ISO 639-5 code
            elif len(value) <= 3:
                result['warnings'].append(f'Proto value "{value}" is not a recognized ISO 639-5 code')
        
        elif canonical_type in ('start', 'end'):
            if not self._is_valid_date(value):
                result['errors'].append(f'Invalid date format for {canonical_type}: {value}')
        
        elif canonical_type == 'conf':
            # Confidence should apply to previous classifier
            if index == 0:
                result['warnings'].append('Confidence classifier has no preceding classifier')
        
        return result

    def _is_valid_date(self, date: str) -> bool:
        """Validate date format (YYYY, YYYYMM, or YYYYMMDD)"""
        if not re.match(r'^\d{4}(\d{2}(\d{2})?)?$', date):
            return False
        
        try:
            year = int(date[0:4])
            if year < 1 or year > 9999:
                return False
            
            if len(date) >= 6:
                month = int(date[4:6])
                if month < 1 or month > 12:
                    return False
            
            if len(date) == 8:
                day = int(date[6:8])
                if day < 1 or day > 31:
                    return False
            
            return True
        except ValueError:
            return False

    def format_result(self, result: Dict) -> str:
        """Format validation result for display"""
        output = []
        
        if result['is_valid']:
            output.append('✓ Valid LVTag')
        else:
            output.append('✗ Invalid LVTag')
        
        if result['errors']:
            output.append('\nErrors:')
            for error in result['errors']:
                output.append(f'  - {error}')
        
        if result['warnings']:
            output.append('\nWarnings:')
            for warning in result['warnings']:
                output.append(f'  - {warning}')
        
        if result['parsed']:
            output.append('\nParsed structure:')
            output.append(f"  Language: {result['parsed']['language']}")
            
            if result['parsed']['subtags']:
                output.append(f"  Subtags: {', '.join(result['parsed']['subtags'])}")
            
            if result['parsed']['classifiers']:
                output.append('  Classifiers:')
                for c in result['parsed']['classifiers']:
                    long_form = self.short_to_long.get(c['type'], c['type'])
                    output.append(f"    - {long_form} ({c['type']}): {c['value']}")
        
        return '\n'.join(output)


def main():
    """CLI interface"""
    validator = LVTagValidator()
    
    if len(sys.argv) < 2:
        print('LVTag Validator v1.0')
        print('Usage: python lvtag_validator.py <tag1> [tag2] ...')
        print('\nExamples:')
        print('  python lvtag_validator.py en-x-f-3')
        print('  python lvtag_validator.py ko-x-form-1-polite-2')
        print('  python lvtag_validator.py x-proto-ine')
        sys.exit(0)
    
    # Validate each provided tag
    for tag in sys.argv[1:]:
        print(f'\nValidating: {tag}')
        print('─' * 50)
        result = validator.validate(tag)
        print(validator.format_result(result))


if __name__ == '__main__':
    main()
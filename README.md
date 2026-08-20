# Farever Guide

Independent editorial game guide published at:

https://richmondtaobao.github.io/farever-guide/

## Local development

```bash
python3 -m http.server 8080
```

Open http://localhost:8080.

## Site features

- Homepage and focused guides for beginners, classes, weapons, builds and dungeons
- Language switching for English, French, German, Japanese, Simplified Chinese, Spanish, Brazilian Portuguese and Korean
- Privacy, cookie, terms, disclaimer, about and contact information
- Consent-gated Google Analytics 4 integration
- Google Search Console verification, sitemap and robots directives

## Checks

```bash
npx playwright test
xmllint --noout sitemap.xml
```

# Alpine Turbo Drive Adapter
[![npm](https://img.shields.io/npm/v/alpine-turbo-drive-adapter)](https://www.npmjs.com/package/alpine-turbo-drive-adapter)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/alpine-turbo-drive-adapter?color=#0F0)](https://bundlephobia.com/result?p=alpine-turbo-drive-adapter)
[![](https://data.jsdelivr.com/v1/package/npm/alpine-turbo-drive-adapter/badge)](https://www.jsdelivr.com/package/npm/alpine-turbo-drive-adapter)
[![](https://img.shields.io/static/v1?label=Support&message=%20%E2%9D%A4%20&logo=GitHub&link=https://github.com/sponsors/SimoTod&color=ff69b4)](https://github.com/sponsors/SimoTod)


Alpine-turbo-drive-adapter, formerly alpine-turbolinks-adapter, allows you to add support for Alpine.js to your Turbolinks/Turbo powered apps.
It handles events to properly clean up the DOM from Alpine generated code when navigating between pages.

## Install

### From CDN
Just include `<script src="https://cdn.jsdelivr.net/npm/alpine-turbo-drive-adapter@1.0.x/dist/alpine-turbo-drive-adapter.min.js" defer></script>` before your Alpine script in your page

### From NPM
 Install the package
```bash
npm i alpine-turbo-drive-adapter
```
Include it in your script along with Alpine JS.
```javascript
import 'alpine-turbo-drive-adapter'
import 'alpinejs'
```

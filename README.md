# Alpine Turbo Drive Adapter
[![npm](https://img.shields.io/npm/v/alpine-turbo-drive-adapter)](https://www.npmjs.com/package/alpine-turbo-drive-adapter)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/alpine-turbo-drive-adapter?color=#0F0)](https://bundlephobia.com/result?p=alpine-turbo-drive-adapter)
[![](https://data.jsdelivr.com/v1/package/npm/alpine-turbo-drive-adapter/badge)](https://www.jsdelivr.com/package/npm/alpine-turbo-drive-adapter)
[![](https://img.shields.io/npm/dm/alpine-turbo-drive-adapter?color=%23cb3837&logo=npm)](https://www.npmjs.com/package/alpine-turbo-drive-adapter)
[![](https://img.shields.io/static/v1?label=Support&message=%20%E2%9D%A4%20&logo=GitHub&link=https://github.com/sponsors/SimoTod&color=ff69b4)](https://github.com/sponsors/SimoTod)

Alpine-turbo-drive-adapter allows you to add support for Alpine.js V3 to your Turbolinks/Turbo powered apps.
It handles events to properly clean up the DOM from Alpine generated code when navigating between pages.

If you look for the Alpine v2 version, look at the [1.x branch](https://github.com/SimoTod/alpine-turbo-drive-adapter/tree/1.x).

## Install

### From CDN
Just include `<script src="https://cdn.jsdelivr.net/npm/alpine-turbo-drive-adapter2.0.x/dist/alpine-turbo-drive-adapter.min.js" defer></script>` before your Alpine script in your page

### From NPM
 Install the package
```bash
npm i alpine-turbo-drive-adapter
```
Include it in your script along with Alpine JS (make sure Alpine is available on the window object).
```javascript
import 'alpine-turbo-drive-adapter'
import Alpine from 'alpinejs'
window.Alpine = Alpine
```

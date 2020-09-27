# Alpine Turbolinks Adapter

Alpine-turbolinks-adapter allows you to add support for Alpine.js to your Turbolinks powered apps.
It handles Turbolinks events to properly clean up the DOM from Alpine generated code when navigating between pages.

## Install

### From CDN
Just include `<script src="https://cdn.jsdelivr.net/npm/alpine-turbolinks-adapter@0.3.x/dist/alpine-turbolinks-adapter.min.js" defer></script>` before your Alpine script in your page.

### From NPM
 Install the package
```bash
npm i alpine-turbolinks-adapter
```
Include it in your script along with Alpine JS.
```javascript
import 'alpine-turbolinks-adapter'
import 'alpinejs'
```

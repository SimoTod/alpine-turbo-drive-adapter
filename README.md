# Alpine Turbo Adapter

Alpine-turbo-adapter, formerly alpine-turbolinks-adapter, allows you to add support for Alpine.js to your Turbolinks/Turbo powered apps.
It handles events to properly clean up the DOM from Alpine generated code when navigating between pages.

## Install

### From CDN
Just include `<script src="https://cdn.jsdelivr.net/npm/alpine-turbo-adapter@1.0.x/dist/alpine-turbo-adapter.min.js" defer></script>` before your Alpine script in your page.

### From NPM
 Install the package
```bash
npm i alpine-turbo-adapter
```
Include it in your script along with Alpine JS.
```javascript
import 'alpine-turbo-adapter'
import 'alpinejs'
```

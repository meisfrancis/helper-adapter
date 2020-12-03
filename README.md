# Omoeo Helper Adapter

This package used only for Back-end

### Including

* API Error Code
* Call Center
* Common
    * Cache
    * API Adapter
    * Info Attachment
    * Mailer
    * SMS
* Delivery

### Installing

* **For npm**

```
npm install git+ssh://git@bitbucket.org:omoeo/omoeo-helper-adapter.git
```
  * **For yarn**
```
yarn add git+ssh://git@bitbucket.org:omoeo/omoeo-helper-adapter.git
```

### Usage

```
import {adapterCache} from 'omoeo-helper-adapter/common'
console.log(adapterCache.generateKey('nameKey', {paramOfKey}))
```

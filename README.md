# meteor-methods
ES6 import/export support for Meteor methods.


```javascript
import {Method} from 'meteor-methods'

testMethod = new Method('testMethod', function () {
  console.log(this.Random.id()) // This gives the same id on the client and server

  // Other code
})

```

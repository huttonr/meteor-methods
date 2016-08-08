# meteor-methods
*ES6 import/export support for Meteor methods.*  
  
[![npm version](https://badge.fury.io/js/meteor-methods.svg)](https://badge.fury.io/js/meteor-methods)

## Installation

`meteor npm install --save meteor-methods`

## Example Usage

```javascript
// customerMethods.js
import { Method } from 'meteor-methods';
import { Customers } from '/lib/collections';

export const addCustomer = new Method('Customers_addCustomer', function (personName) {
  check(personName, String);
  
  if (Customers.findOne({personName})) {
    throw new Meteor.Error('Customer with that name already exists.');
  }
  
  return Customers.insert({personName, createdBy: this.userId});
});



// customersTemplate.js
import { addCustomer } from './customerMethods.js';

/*    ...    */

function onAddCustomerClick(personName) {
  addCustomer(personName, (err, res) => {
    if (err) {
      alert(`Error: ${ err.message }`);
    }
    
    alert(`Added customer with id: ${ res }`);
  });
}
```

---
title: "Notes from Interviews"
date: 2022-07-18T12:02:07-07:00
hidden: false
draft: false
tags:
  - "Front-End"
  - "Esther"
slug: "notes from interveiws"
---


<Esther>
Some notes from those technical interviews I had so far  
Talked with some mentors on [ADPList](https://app.adplist.org/signup?referral_id=99993&src=user) 🥰

</Esther>

--------------------------

### Pure function

```javascript
function pure (num) {
  return num * 5;
}
```

- Always returns same result
- Never depends on any state/data/change
- Always return something
- Test cases will be straighforward

### High Order Function
 - Takes another function as an argument
 - Returns function

### High Order Component
 - Takes a component as an input and returns a new compnent
 - Idealy enhance the component
 - Usually a pure function and returns a new component
 - Use cases: loader while fetching data

### Undefined VS null

| `Undefined`                   | `Null`               |
|-------------------------------|----------------------|
| Declared, but not yet defined | No value, on purpose |
| The type is `undefined`       | The type is `object` |
| Equal to `NaN`                | Equal to 0           |

### THIS
#### In a method
refer to **the owner object** (me)


```javascript
var me = {
  firstName: 'John',
  lastName: 'Doe',
  fullName: function () {
    return this.firstName + ' ' + this.lastName;
  }
}
```

#### Alone & Independent
refer to **the global object (window)**

```javascript
var x = this.name;
```

#### In a function
refer to **the global object**

```javascript
function myFunction () {
  return this.name;
}
```

#### In a function "strict mode"
`undefined`

```javascript
"use strict"
function myFunction () {
  return this.name;
}
```

#### In Event Handlers
refer to **the HTML Element** that received the event (button)

```html
<button onclick="this.style.display='none'">
  Button
</button>
```

#### `call()` & `apply()` - Explict binding
force the function(a) to refer to **the object**(b)

```javascript
var a = {
  fullName: function () {
    return this.firstName + ' ' + this.lastName;
  }
}
var b = {
  firstName: 'John',
  lastName: 'Doe',
}
a.fullName.call(b);
```

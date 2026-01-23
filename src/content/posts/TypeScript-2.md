---
title: "TypeScript 2: Union, Narrowing & Interface"
date: 2023-03-23T12:17:38-07:00
hidden: false
draft: false
tags:
  - "Esther"
  - "Front-End"
---


<Esther>
Dive a bit deeper! 🧐

</Esther>

--------------------------

## Union Type

```typescript
let answer: any;    // any type
let typedAnswer: string | number; // union type
```

As a result of supporting a union of multiple types, TypeScript allows you to access properties that are common among the member types without any error.

```typescript
let typedAnswer: string | number[] = 'Codecademy';
console.log(typedAnswer.length);      // Prints 10
console.log(typedAnswer.match('my')); // Prints ["my"]

typedAnswer = [3, 5, 1];
console.log(typedAnswer.length);      // Prints 3
// The .match method will not work for an array type
console.log(typedAnswer.match(5));  // Error: Proper
```


### Union of Array Types

```typescript
const getLength = (arr: string[] | number[]) => {
  return arr.length;
}

let strArr: string[] = ["foo", "bar", "baz"];
let numArr: number[] = [1, 2, 3, 4, 5];

console.log(getLength(strArr)); // Output: 3
console.log(getLength(numArr)); // Output: 5
```


### Union Type Narrowing

Use the `typeof` operator with the variable name and compare it with the type you expect for the variable.

```typescript
const choices: [string, string] = ['NO', 'YES'];
const processAnswer = (answer: number | boolean) => {
  if (typeof answer === 'number') {
    console.log(choices[answer]);
  } else if (typeof answer === 'boolean') {
    if (answer) {
      console.log(choices[1]);
    } else {
      console.log(choices[0]);
    }
  }
}
processAnswer(true);   // Prints "YES"
processAnswer(0);      // Prints "NO"
```

### Function Return Union Type

```typescript
const calculateArea = (shape: 'circle' | 'rectangle', dimensions: number[]): number | null => {
  if (shape === 'circle' && dimensions.length === 1) {
    const radius = dimensions[0];
    return Math.PI * radius * radius; // return type is number
  } else if (shape === 'rectangle' && dimensions.length === 2) {
    const length = dimensions[0];
    const width = dimensions[1];
    return length * width; // return type is number
  } else {
    return null; // return type is null
  }
};

const circleArea: number | null = calculateArea('circle', [5]);
console.log(circleArea); // Prints "78.53981633974483"

const rectangleArea: number | null = calculateArea('rectangle', [4, 5]);
console.log(rectangleArea); // Prints "20"

const invalidArea: number | null = calculateArea('circle', [3, 4]);
console.log(invalidArea); // Prints "null"

```

### Union of Literal Types

```typescript
type RPS = 'rock' | 'paper' | 'scissors' ;
const play = (choice: RPS): void => {
  console.log('You: ', choice);
  let result: string = '';
  switch (choice) {
    case 'rock':
      result = 'paper';
      break;
    case 'paper':
      result = 'scissors';
      break;
    case 'scissors':
      result = 'rock';
      break;
  }
  console.log('Me: ', result);
}
const number = Math.floor(Math.random()*3);
let choices: [RPS, RPS, RPS] = ['rock', 'paper', 'scissors'];
play(choices[number]);
```

## Type Narrowing

Using `typeof` to guard the variable type, including `number`, `string` and `boolean`.

```typescript
const choices: [string, string] = ['NO', 'YES'];
const processAnswer = (answer: number | boolean) => {
  if (typeof answer === 'number') {
    console.log(choices[answer]);
  } else if (typeof answer === 'boolean') {
    if (answer) {
      console.log(choices[1]);
    } else {
      console.log(choices[0]);
    }
  }
}
processAnswer(true);    // Prints "YES"
processAnswer(0);       // Prints "NO"
```

Using `if` statement to help

```typescript
function formatAge(age: number | string) {
  if (typeof age === 'number') {
    return age.toFixed(); // age must be a number
  }
  return age; // age must not be a number
}
console.log(formatAge(3.5));    // Prints "4"
console.log(formatAge('3.5'));  // Prints "3.5"
```

## Interface Type

Interface can only define *objects*.

```typescript
interface Publication {
  isbn: string;
  author: string;
  publisher: string;
}
```

The difference between Type alias and Interface:

```typescript
// Type alias
type ISBN = number | string;
type PublicationT = {
  isbn: ISBN;
  author: string;
  publisher: string;
}

// Interface can only define an object type
interface PublicationI {
  isbn: ISBN;
  author: string;
  publisher: string;
}
```

#### Interface for Classes

```typescript
interface Shape {
  area: number;
  computeArea: () => number;
}

// Rectangle class implements the Shape interface
class Rectangle implements Shape {
  width: number;
  height: number;
  area: number;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.area = this.computeArea();
  }
  computeArea = (): number => {
    return this.width * this.height;
  }
}

let target = new Rectangle(4, 5);
console.log(target.area);  // Prints "20"
```

#### Nested Interface

```typescript
interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}

interface Person {
  name: string;
  age: number;
  address: Address;
}

class Customer implements Person {
  name: string;
  age: number;
  address: Address;
  constructor(name: string, age: number, address: Address) {
    this.name = name;
    this.age = age;
    this.address = address;
  }
}

const myAddress: Address = {
  street: '123 Main St',
  city: 'Anytown',
  state: 'CA',
  zip: '12345'
};

const customer = new Customer('John Doe', 30, myAddress);
console.log(customer.name); // Output: 'John Doe'
console.log(customer.address.street); // Output: '123 Main St'
```

#### Interface Inheritance

```typescript
interface Animal {
  name: string;
  move(distance: number): void;
}

interface Bird extends Animal {
  fly(): void;
}

class Eagle implements Bird {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  move(distance: number) {
    console.log(`${this.name} flew ${distance} meters.`);
  }
  fly() {
    console.log(`${this.name} is flying.`);
  }
}

const eagle = new Eagle('Bald Eagle');
eagle.move(1000); // Prints "Bald Eagle flew 1000 meters."
eagle.fly(); // Prints "Bald Eagle is flying."
```

#### Interface Index Signature

In TypeScript, you can define an object property whose name is not known in advance or whose name can be a number instead of a string.

```typescript
interface FruitPrices {
  [fruit: string]: number;
}

const fruitPrices: FruitPrices = { apple: 1.99, banana: 0.99, orange: 2.49 };

interface Sales {
  [fruit: string]: number;
}

const sales: Sales = { apple: 10, banana: 20, orange: 15 };

// Calculate the total revenue from fruit sales
let revenue = 0;
for (let fruit in sales) {
  if (fruit in fruitPrices) {
    revenue += sales[fruit] * fruitPrices[fruit];
  }
}

console.log(Total revenue: $${revenue.toFixed(2)});
// Prints "Total revenue: $44.55"
```

#### Interface Optional Properties

```typescript
nterface Profile {
  name: string;
  age: number;
  hobbies?: string[];
}

const teacher: Profile = {name: 'Tom Sawyer', age: 18}; 
```

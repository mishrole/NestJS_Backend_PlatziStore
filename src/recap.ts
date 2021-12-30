// Safe type

const myName = 'Mitchell';
const myAge = 24;

const sum = (a: number, b: number) => a + b;
sum(1, 2);

// Classes

class Person {
  // Declaración opcional *
  // private age;
  // private name;
  // public name: string;
  // name;

  // Construye al objeto persona
  // constructor(name: string, age: number) {
  // También se puede declarar así *
  constructor(private name: string, private age: number) {
    this.age = age;
    this.name = name;
  }

  getSummary() {
    return `my name is ${this.name} and age is ${this.age}`;
  }
}

const mitchell = new Person('Mitchell', 24);
mitchell.getSummary();

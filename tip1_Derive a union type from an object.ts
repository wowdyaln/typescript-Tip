// Derive a union type from an object


/*

Sometimes you may need want to type an object which has several different optional keys,
but all with the same type.
We can map over a union type to accomplish this instead of chaining | in an object type.

I start with some code that looks like this

*/

export const fruitCounts = {
  apple: 1,
  pear: 4,
  banana: 26,
}

type SingleFruitCount =
  | {
      apple: number
    }
  | {
      banana: number
    }
  | {
      pear: number
    }

const singleFruitCount: SingleFruitCount = {
  banana: 12,
}


/*

Let's start improving this.
First I will make a FruitCount type out of my fruitCounts object,
then I'm going to make a new type called NewSingleFruitCount.

*/

type FruitCounts = typeof fruitCounts

type NewSingleFruitCount = {
  [K in keyof FruitCounts]: {
    [K2 in K]: number
  }
}[keyof FruitCounts]

const fruit: NewSingleFruitCount ={ apple: 3}

/*



What this is doing is its taking each key in FruitCounts and setting its type to an empty object.
So when I use it, TypeScript will be expecting a shape like this.

*/


// const singleFruitCount: NewSingleFruitCount = {
//   apple: {},
//   pear: {},
//   banana: {},
// }


/*

But, I want the properties to be numbers.

*/

// type NewSingleFruitCount = {
//   [K in keyof FruitCounts]: {
//     [K2 in K]: number
//   }
// }


/*

As you can see, if I just do that, I still haven't quite got a union type.
I get this odd nested structure, and I will still have to have every possible fruit present.


*/

// const singleFruitCount: NewSingleFruitCount = {
//   apple: {
//     apple: 2,
//   },
//   pear: {
//     pear: 4,
//   },
//   banana: {
//     banana: 26,
//   },
// }


/*

So, what I'm going to do is map over our NewSingleFruitCount type to get rid of those parent keys,
and fully create my union type.


*/

// type NewSingleFruitCount = {
//   [K in keyof FruitCounts]: {
//     [K2 in K]: number
//   }
// }[keyof FruitCounts]


/*


And with that, I can now assign our singleFruitCount how I'd like.

*/

// const singleFruitCount: NewSingleFruitCount = {
//   apple: 2,
// }

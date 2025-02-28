let m = new Map(); // Hash Map
// console.log(m);

// add values to your hash map
m.set(10, 100);
m.set(8, true);
m.set("apple", 45);
m.set(10.2, true);

// console.log(m);
// console.log(m.get("apple"));

// console.log(m.size);

// m.set(10, "apple"); // replaces 10 => 100 with 10 => "apple"

// console.log(m);

// for (t of m) {
//     console.log(t); // array with t[0] being key and t[1] being value
// }

// for (t of m.keys()) {
//     console.log(t); // prints only keys
// }

// for (t of m.value()) {
//     console.log(t); // prints only values
// }

// delete a key

// m.delete("apple");
// console.log(m);

m.clear()
console.log(m);
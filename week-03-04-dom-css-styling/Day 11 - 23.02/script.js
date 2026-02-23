const title = document.querySelector(`#title`)
console.log('title');

console.log(title.innerText)
console.log(title.textContent)

const elements = document.getElementsByTagName("li")

//console.log(elements)

const elements1 = document.querySelectorAll("li")
console.log(elements1)

const h1 = document.querySelector("h1");
console.log(h1.id);
console.log(h1.className);

/*
h1.id = "sth";
h1.className = "2222"
h1.style = "color: red"
*/
const heading = document.querySelector("#heading");
// add, contains, remove, replace, toggle
heading.classList.add("underline")

heading.classList.contains("italic")
//true


const heading2 = document.querySelector("#heading");
heading2.style.backgroundColor = "ccc"
heading2.style.color = "gray"
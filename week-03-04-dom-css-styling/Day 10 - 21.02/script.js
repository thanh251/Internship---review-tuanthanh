const h1 = document.getElementById("heading");
const h2 = document.getElementById("title");
console.log(h1);
console.log(h2);
h2.innerText = "Heading 2323";

const h3 = document.getElementsByTagName("h2");
h3[1].innerText = "k có";
console.log(h3[1]);

const result = document.querySelector("#heading");
console.log(result);

const result2 = document.querySelectorAll("#heading");
console.log(result2);

const h4 = document.querySelector("#title")
console.dir(h4);

const output = document.querySelector("#output");

output.innerText = "Hello world";

//<div id="test"> Chào <strong>Thành</strong>! <span style="display: none;">(Đây là tin nhắn ẩn)</span></div>
//const box = document.querySelector("#test")
//box.innerText;
// nếu dùng innerText thì sẽ chỉ lấy ra "Chào Thành!
// nếu dùng innerHTML thì sẽ lấy ra "Chào <strong>Thành</strong>! (Đây là tin nhắn ẩn)"

const parent = document.querySelector("#test");
console.log(parent.innerHTML);
//output: Chào <strong>Thành</strong>! <span style="display: none;">(Đây là tin nhắn ẩn)</span>


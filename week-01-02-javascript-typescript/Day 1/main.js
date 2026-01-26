const userN = " ádfdf"
const userNamee = " 12323123"
alert(userN);
console.log(userNamee)

// Bài 1
const userName = 'Nguyen Van A'
const userAge = 20;
const emailAddress = 'nguyenvana@example.com'

// Bài 2
let number = 5;
number = 10;
console.log(number)


// Bài 3
let a = 1;
let b = 2;

let c = a 
a = b
b = c
console.log(a, b)

//Toán tử số học và gán
// Ví dụ
let sumInt = 5+ 3; 
let sumIntFlt = 7 + 3.5;
let result1 = 10% 3 //1 

let ca = 9
ca++;
console.log(a); //6


//HÀM
function showGreeting(title) {
    console.log(title);
    console.log("XIn chào");
}
showGreeting();
showGreeting("vc");
showGreeting("pbt");

function sum (d,f){
    console.log(d+f);
}
const ka = sum(4,7)
console.log(ka)

// Ví dụ hàm:
function diemTB (diemToan, diemLy, diemHoa){
    return (diemToan+diemHoa+diemLy)/3
}
function multiply (a,b){
    return a*b
}
console.log(multiply(56,99))

function cToF (d){
    return d*4/5 + 32;
}
console.log(cToF(10))
function swapNumbers( a,b){
    a = a + b
    b = a - b
    a = a - b
    return `${a}, ${b}`
}
console.log(swapNumbers(5,6))

// ví dụ i++ và ++i
let i = 1
let result = ++i + i++ - i-- + --i + ++i// 2 + 2 - 3 + 1 +  2
console.log(result)

//Hoisting
greeting ();

function greeting(){
    console.log("Xin chào")
}

console.log(greeting);
var greeting = "xin chào" // undefined do k phải là hàm

// NỐI CHUỖI VÀ NỘI SUY
// Ví dụ 
let message = "xin \"chào"
console.log(message)

// Ví dụ toán tử nối chuỗi
let greeting1 = "Thành" + " Tới đây"
console.log(greeting1)

// ví dụ template strings
let o = 10;
let p = 20;
let total = o + p;
let messages = ` Tổng các ${a} và ${b} là ${total}`
console.log(messages)

function createLinkin(v,r){
    return `<a href=" ${v}>${r}</a>`
}
console.log(createLinkin("https://google.com", "Search"))

//Bài 3

function calculateTotalScore (studentName, score, regionalBonus = 0){
    totalScore = score + regionalBonus
    return `Sinh viên ${studentName} có tổng điểm là ${totalScore}`
}
console.log(calculateTotalScore("Thành", 9))
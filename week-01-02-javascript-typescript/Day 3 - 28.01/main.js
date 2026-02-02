// Toán tử Logic
let temp = 25;
let dayOff = "Sunday";
let today = "Sunday";

if (temp > 20 && today === dayOff){
    console.log ("Đi picnic")
} 
    else{
        console.log ("Ở nhà")
}

// Toán tử OR (||)
const result1 = true || true
console.log (result1) 

//Kết hợp toán tử OR và AND
let isNewUser = true;
let isVipMember = true;
let purchaseAmount = 600000;

if ((isNewUser || isVipMember) && purchaseAmount > 500000){
    console.log ("Đủ điều kiện nhận quà")
}   else{
    console.log ("Khong đủ điều kiện nhận quà")
}

// ví dụ 1
function isSchoolAge (age) {
    if (age >=6 && age <= 18){
        console.log ("Độ tuổi đi học")
    } else {
        console.log ("Không phải độ tuổi đi học")
    }
}
isSchoolAge(56)
isSchoolAge(17)

//data types
let a = 'thành'
console.log (typeof a)

let largeNumber = BigInt(9007199254741991)
let bigNumber = 9007199254741991n

console.log(typeof largeNumber)
console.log(typeof bigNumber)

let results2 = null;
console.log (typeof results2); //object

let uniqueID= Symbol('id');
console.log (typeof uniqueID); //symbol

let user1 = {
    name: "Nguyễn Văn A",
    age: 30,
};
console.log (typeof user); //object

let products = ['Iphone', 'Samsung', 'Oppo'];
console.log (typeof products); //object

function testFunction (){
    let a= 1 + 2; //k có return
}
let result = testFunction();
console.log (result)

let objk = {name: "Thành"};
console.log (objk.age); //undefined do age k có

//bài tập Data type
function checkDataType (value){
    return typeof value;
}
console.log(checkDataType(123))

//OBJECT Basic
//VD1
// const user = {
//     username: "john_doe",
//     email: "user@example.com",
//     signUpDate: "2023-10-01",
// }
// //VD2
// const config = {
//     apiUrl: "https://api.example.com",
//     apiKey: "abc123",
//     timeout: 5000,
// };

// Thêm key value
const car ={
    make: "Toyota",
    model: "Camry",
}
car.color = "Gray"
car["year"] = 2024
console.log (car)

const { make, model} = car

console.log (make)
console.log (model)


// Object destructuring
const book ={
    title: "JavaScript Basics",
    author: "Jane Doe",
    year: 2022,
}
const { title, year} = book
console.log (title)
console.log (year)  

//phương thức
const dog = {
    //Thuộc tính
    name: "Buddy",
    age: 3,
    //Phương thức
    bark: function (){
        console.log("Gâu gâu!")
    }
}
dog.bark(); //Gâu gâu!

//VD3:
const studentManager = {
    //thuộc tính
    name: ' Quản lý sinh viên',
    theme: 'dark',
    data : [],
    add: function () {

    },
    edit: function () {

    },
    delete: function () {

    }
}

// keywword this
const person1 = {
    firstname : "John",
    lastname : "Doe",
    getFullName: function (){
        return `${this.firstname} ${this.lastname}`;
    }
}

//Enhancing object literals

// shorthand property names
const name = "Alice";
const age = 28;
const person = { 
    name, 
    age,
};
console.log (person)

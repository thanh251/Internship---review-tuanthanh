// test
console.log("2711")
// If-else
let temp = 0;

if (temp > 50){
    console.log("Nóng");
}
    else if(temp === 0)  {
        console.log("Bình thg")
    }
    else{
        console.log("Lanh")
    }

// ví dụ 2
function func1 (){
	console.log("Đúng");
}

function func2(){
	console.log("Sai")
}

4 === 4 ? func1() : func2();

4 !== 4 ? func1() : func2();

//Tạo hàm 
//Bài 2: kiểm tra số chẵn hay lẻ
function checkEvenOdd (num) {
    if (num % 2 === 0 ){
        return "Số chẵn"
    }
    else{
        return "Số lẻ"
    }
}
console.log((7))

console.log((88))

//Bài 3
//Hàm bình thường
function checkInteger1(num) {
    if (num % 1 === 0) {
        return "Số thực"
    }
    else{
        return "Không phải số nguyên"
    }
}

// sử dụng inline if-elese
function checkInteger2 (num){
    if (num % 1 === 0) return "Số thực"
    else return "Không phải số nguyên"
}

//TOán tử 3 ngôi
function checkInteger3 (num){
    return num % 1 === 0? "Sô nguyên" : "Không phải số nguyên";
}
console.log(checkInteger1(423.0))
console.log(checkInteger2(423))
console.log(checkInteger3(42.3))

// Bài 4
function compareNumbers (a,b){
    if (a>b){
        return "Số thứ nhất lớn hơn"
    }
    else if ( a < b){
        return "Số thứ hai lớn hơn"
    }
    else{
        return " Hai số bằng nhau"
    }
}
console.log(compareNumbers(5,78))
console.log(compareNumbers(99,78))
console.log(compareNumbers(78,78))
//trường hợp toán tử 3 ngôi
function compareNumbers1 (a,b){
    return a > b ? "Số thứ nhất lớn hơn" : a<b ? "Số thứ hai lớn hơn" : "Hai số bằng nhau";
}
// Bài 5
function calculateShipping (distance){
    if (0< distance <= 5){
        price = 5 * distance * 1000
        return `Phí vận chuyển là ${price}đ`
    }
    else{
        price= 5* distance * 1000 + 1000 * (distance)
        return `Phí vận chuyển là ${price}đ`
    }
}
console.log(calculateShipping(4.2))
console.log(calculateShipping(99.2))

//Bài 6
function calculateDiscount (totalAmount){
    if (totalAmount < 500){
        return totalAmount
    }
    else if (totalAmount < 1000 ){
        return totalAmount * 0.9
    }
    else {
        return totalAmount * 0.85
    }
}

console.log(calculateDiscount(1100))
console.log(calculateDiscount(892))

//SWTICH CASE
//Ví dụ
// switch (month){
//     case 1:
//         console.log("Tháng 1");
//         break;
//     case 2:
//         console.log("Tháng 2");
//         break;
//     case 3:
//         console.log("Tháng 3");
//         break;
//     default:
//         console.log(" Tháng k hợp lệ ")
// }



// Fall through
let month = 5;

switch (month){
    case 1:
    case 2:
    case 3:
        console.log("Quý 1")
        break;
    case 4:
    case 5:
    case 6:
        console.log("Quý 2");
        break;
    default:
        console.log("Quý khác")
}

// Ví dụ
let temper = 18
switch (true){
    case temper > 30:
        console.log("trời nóng");
        break;
    case temper > 20:
        console.log("trời đệp")
        break;
    default:
        console.log("trời k bth")
}
//6.18
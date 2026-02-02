export class GameOfLife {
  constructor(board) { // tạo ma trận
    this.board = board; // lưu ma trận vào board
    this.rows = board.length; // đo chiều cao
    this.cols = board.length > 0 ? board[0].length : 0; // Nếu có dữ liệu thì độ dài hàng đầu tiên làm số cột, không thì số cột = 0
  }

  tick() { // vận hành game
    if (this.rows === 0 || this.cols === 0) return; // ktra nếu cột hoặc hàng rỗng thì dừng

    const nextBoard = this.board.map(arr => [...arr]); // tạo ra bản sao nextBoard 
    // map(arr => [...arr]) để tạo ra một bản sao k chỉ địa chỉ mà còn dữ liệu bên trong => Copy hoàn toàn

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        //Dùng 2 vòng lặp để đi qua từng ô một, từ trái sang phải, từ trên xuống dưới.
        const liveNeighbors = this.countLiveNeighbors(r, c); // Lưu điều kiện vào liveNeighbors
        const isAlive = this.board[r][c] === 1; 

        if (isAlive) {
          if (liveNeighbors < 2 || liveNeighbors > 3) {
            nextBoard[r][c] = 0;
          }
        } else {
          if (liveNeighbors === 3) {
            nextBoard[r][c] = 1;
          }
        }
      }
    }
    
    this.board = nextBoard;
  }

  state() {
    return this.board;
  }

  countLiveNeighbors(row, col) {
    let count = 0;
    for (let i = -1; i <= 1; i++) { //quét dòng từ -1 đến 1
      for (let j = -1; j <= 1; j++) { //quét cột từ -1 đến 1
        if (i === 0 && j === 0) continue;
        //địa chỉ nhà hàng xóm
        const neighborRow = row + i;
        const neighborCol = col + j;

        if (
          neighborRow >= 0 &&
          neighborRow < this.rows &&
          neighborCol >= 0 &&
          neighborCol < this.cols
        ) {
          if (this.board[neighborRow][neighborCol] === 1) {
            count++;
          }
        }
      }
    }
    return count;
  }
}

//baif 2
export const translate = (rna) => {
  if (!rna) return [];
  const proteins = [];
  for (let i = 0; i < rna.length; i += 3){
    const codon = rna.slice(i, i + 3);
    const protein = getProtein(codon);

    if (protein === 'STOP'){
      break;
    }
    proteins.push(protein);
  }
  return proteins;
};

const getProtein = (codon) => {
  switch (codon){
    case 'AUG':
      return 'Methionine'
    case 'UUU':
    case 'UUC':
      return 'Phenylalanine'
    case 'UUA':
    case 'UUG':
      return 'Leucine'
    case 'UCU':
    case 'UCC':
    case 'UCA':
    case 'UCG':
      return 'Serine'
    case 'UAU':
    case 'UAC':
      return 'Tyrosine';
    case 'UGU':
    case 'UGC':
      return 'Cysteine';
    case 'UGG':
      return 'Tryptophan';
    case 'UAA':
    case 'UAG':
    case 'UGA':
      return 'STOP';
    default:
      throw new Error('Invalid codon');
  }
};

// Bài 3
export class DiffieHellman {
  constructor(p, g) {
    const pBig = BigInt(p);
    const gBig = BigInt(g);

    if (pBig < 2n || gBig < 2n) {
      throw new Error('Invalid constructor arguments');
    }

    if (!this.isPrime(pBig) || !this.isPrime(gBig)) {
      throw new Error('Arguments must be prime');
    }

    this.p = pBig;
    this.g = gBig;
  }

  getPublicKey(privateKey) {
    const a = BigInt(privateKey);

    if (a <= 1n || a >= this.p) {
      throw new Error('Private key must be greater than 1 and less than p');
    }

    return Number((this.g ** a) % this.p);
  }

  getSecret(theirPublicKey, myPrivateKey) {
    const B = BigInt(theirPublicKey);
    const a = BigInt(myPrivateKey);

    return Number((B ** a) % this.p);
  }

  static getPrivateKey(p) {
    const pBig = BigInt(p);

    if (pBig <= 2n) {
      throw new Error('p must be greater than 2');
    }

    const max = Number(pBig - 2n);
    const rand = Math.floor(Math.random() * max) + 2;

    return BigInt(rand);
  }

  isPrime(n) {
    if (n === 2n) return true;
    if (n < 2n || n % 2n === 0n) return false;

    for (let i = 3n; i * i <= n; i += 2n) {
      if (n % i === 0n) return false;
    }
    return true;
  }
}
// Bài 4
export const isArmstrongNumber = (number) => {
  const strCurrent = String(number);
  const power = BigInt(strCurrent.length);

  let sum = 0n;

  for (let char of strCurrent) {

    const digit = BigInt(char);
    

    sum += digit ** power;
  }

  return sum === BigInt(number);
};

//Bài 5
export const toRoman = (number) => {
  const mapping = [
    { value: 1000, numeral: 'M' },
    { value: 900, numeral: 'CM' }, 
    { value: 500, numeral: 'D' },
    { value: 400, numeral: 'CD' }, 
    { value: 100, numeral: 'C' },
    { value: 90, numeral: 'XC' },  
    { value: 50, numeral: 'L' },
    { value: 40, numeral: 'XL' },  
    { value: 10, numeral: 'X' },
    { value: 9, numeral: 'IX' },   
    { value: 5, numeral: 'V' },
    { value: 4, numeral: 'IV' },   
    { value: 1, numeral: 'I' },
  ];

  let result = '';

  for (const item of mapping) {
    while (number >= item.value) {
      result += item.numeral;
      number -= item.value;
    }
  }

  return result;
};
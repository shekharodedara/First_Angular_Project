n = 5;
// function triangle(num) {
//     for (let i = 0; i < num; i++) {
//         s = "";
//         for (let j = num - i; j > 0; j--) s += "S";
//         console.log(s);
//     }
//     console.log("---------------------------------------------");
//     a = "";
//     for (let i = 0; i < num; i++) {
//         a += "S";
//         console.log(a);
//     }
// }
// triangle(n);

// function pyramid(num) {
//     for (let i = 0; i < num; i++) {
//         s = ''
//         for(let j = num; j > i + 1; j--) s += ' '
//         for(let k = 0; k < i + 1; k++) s += 'S'
//         for(let l = 0; l < i; l++) s += 'S'
//         console.log(s);
//      }
// }

// function pyramid(num) {
//     for (let i = 0; i < num; i++) {
//         s = ''
//         for(let j = num; j > i + 1; j--) s += ' ' // let j = 1; j < num - i; j++
//         for(let k = 0; k < i * 2 + 1; k++) s += 'S'
//         console.log(s);
//      }
// }
// pyramid(n);

// function pyramid2(n){
// for (let i = 1; i <= n; i++) {
//   for (let j = 1; j <= n - i; j++) process.stdout.write('J')
//   for (let k = 0; k < 2 * i - 1; k++) process.stdout.write('K')
//   console.log();
// }
// }
// pyramid2(n);


function square(num){
    for (let i = 1; i <= num; i++){
        s = ''
        for(let j = 1; j <= num; j++){
            i == 1 || i == num ? 
                s += '*' 
            : j == 1 || j == num ? 
                s += '*' 
            : s += ' ';
        }
        console.log(s)
    }
}
square(n)

function holoTriangle(num){
    for (let i = 1; i <= num; i++){
        s = ''
        for(let j = 1; j <= num-i; j++) s += ' ';
        for(let k = 0; k < i * 2 - 1; k++){
            i == 1 || i == num ?
                s += '*'
            :k == 0 || k == i * 2 - 2 ?
                s +='*'
            : s += ' ';
        }
        console.log(s)
    }
}
holoTriangle(n)
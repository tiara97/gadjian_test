//  nomor 1
function reverse(str) {
    let out = ''
    let arr = str.toString().split('')
    for (let i = arr.length - 1; i >= 0; i--) {
        out += arr[i]
    }
    return console.log('NOMOR 1\n' + out + '\n')
}
reverse('Hello World')

// nomor 2
function fibonacci(n) {
    let out = []
    for (let i = 0; i < n; i++) {
        if (i === 0) out.push(0)
        else if (i === 1) out.push(1)  
        else {
            out.push(out[i - 1] + out[i - 2])
        }
    }
    return console.log('NOMOR 2\n' + out.join(' ') + '\n')
}
fibonacci(10)

// nomor 3
function combination(n, r) {
    if(isNaN(parseInt(n)) || isNaN(parseInt(r))) return console.log('Input harus berupa integer')
    if(n < r) return console.log('nilai n harus lebih besar daripada r')
    let sum_n = 1
    let sum_r = 1
    let sum_nr = 1
    for(let i=1; i<=n; i++) {
        sum_n *= i
    }
    for(let i=1; i<=r; i++) {
        sum_r *= i
    }
    for(let i=1; i<=n-r; i++) {
        sum_nr *= i
    }
    return console.log('NOMOR 3\n' + sum_n / (sum_r*sum_nr))
}
combination(4,2)
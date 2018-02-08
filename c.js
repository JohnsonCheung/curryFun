let a1 = 1
let a3 = 3
let a4 = () => {}
let a = $b => ($c,$d) => {
    debugger
    
    $b*($c+$d)
    a4()
}

let b = a(1)
let c = b(2,3)
debugger
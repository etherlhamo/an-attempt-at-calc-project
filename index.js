let buttons = document.querySelectorAll(".digit")
let input = document.querySelector(".input-field")
let operators = document.querySelectorAll(".operator")
let equal = document.querySelector("#equal")
let clear = document.querySelector("#clear")
let compare = ["+","-","*","/"]


buttons.forEach((elemnt) => {
    elemnt.addEventListener("click",()=>{
let i = elemnt.textContent

if (i === ".") {
    let currentNumber = input.value.split(/[+\-*/]/).at(-1)

    if (currentNumber.includes(".")) {
        return
    }
}

input.value += i


    })
}); 

operators.forEach((elemnt) => {
    elemnt.addEventListener("click",()=>{
        let i = elemnt.textContent
        let x = input.value

        if(!compare.includes(x.at(-1))) {
            input.value += i 
        }
        
    })
});


function calculate(expression) {
    let parts = expression.split(/([+\-*/])/)

    if (expression === "" || compare.includes(expression.at(-1))) {
        return "Error"
    }


    for (let i = 0; i < parts.length; i++) {
        if (!compare.includes(parts[i])) {
            parts[i] = Number(parts[i])
        }
    }

    for (let i = 0; i < parts.length; i++) {
        if (parts[i] === "*" || parts[i] === "/") {
            let left = parts[i - 1]
            let right = parts[i + 1]
            let result
            if (parts[i] === "*") {
                result = left * right
            } else {
                if (right === 0){
                    return "error"
                }
                result = left / right
            }
            parts.splice(i - 1, 3, result)
            i--
            console.log(result)
        }
    }

    for (let i = 0; i < parts.length; i++) {
        if (parts[i] === "+" || parts[i] === "-") {
            let left = parts[i - 1]
            let right = parts[i + 1]
            let result
            if (parts[i] === "+") {
                result = left + right
            } else {
                result = left - right
            }
            parts.splice(i - 1, 3, result)
            i--
        }
    }

            return parts[0]
}
equal.addEventListener("click", () => {
    let expression = input.value
    let result = Math.floor(calculate(expression)*1000)

    input.value = Math.floor(result *1000)
})

clear.addEventListener("click", ()=>{
    expression =""
    input.value =""
})
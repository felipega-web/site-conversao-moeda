const form = document.querySelector("form")
const amount = document.querySelector("#amount")
const currency = document.querySelector("#currency")
const footer = document.querySelector("main footer")

amount.addEventListener("input", () => {
    amount.value = amount.value
                            .replace(/,/g, '.') // Substitui vírgula por ponto
                            .replace(/[^0-9.]/g, "") // Remove tudo que não é número ou ponto
                            .replace(/^\.*/g, '') // Remove pontos no começo (ex: ".123")
                            .replace(/\.{2,}/g, ".") // Reduz múltiplos pontos seguidos para um só
                            .replace(/(\..*)\./g, '$1') // Mantém apenas o primeiro ponto decimal
})

form.addEventListener("submit", (event) => {
    event.preventDefault()
    const url = `https://api.exchangerate-api.com/v4/latest/${currency.value}`
    fetch(url)
        .then(response => response.json())
        .then(json => {
            const rate = json.rates.BRL
            const value = amount.value
            const result = value * rate

            document.querySelector("#description").innerHTML = `1 ${currency.value} = R$ ${rate.toFixed(2)}`
            document.querySelector("#result").innerHTML = `${value} ${currency.value} = R$ ${result.toFixed(2)}`    
        })
        
    try {
        footer.classList.add("show-result")
    } catch (error) {
        footer.classList.remove("show-result")
        console.log(error)
        alert(("Não foi possível converter o valor. Tente novamente"))
    }

})
    
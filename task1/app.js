const btn = document.querySelector(".button")
let svg = document.querySelectorAll(".svg")

btn.addEventListener('click', () => {
    svg.forEach(svg => {
        svg.classList.toggle('active')
    })
})
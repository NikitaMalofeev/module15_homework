const btn = document.querySelector(".button");

btn.addEventListener('click', () => {
    let height = document.documentElement.clientHeight;
    let width = document.documentElement.clientWidth;
    alert(`Высота экрана: ${height}, Ширина экрана: ${width}`);
})
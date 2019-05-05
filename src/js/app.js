const nameEl = document.getElementById('name');
const priceEl = document.getElementById('price');
const catEl = document.getElementById('cat');
const button = document.getElementById('add');
const table = document.getElementById('table');
const count = document.getElementById('count');
const total = document.getElementById('total');
const mostExpPur = document.getElementById('mostExpPur');
let scoreTotal = 0;
const arr = [];

button.addEventListener('click', () => {

    const ncp = {
        name: nameEl.value,
        cat: catEl.value,
        price: Number(priceEl.value),

    };
    arr.push(ncp);

    const sorted = arr.slice();
    sorted.sort((a, b) => b.price - a.price);
    mostExpPur.children[0].textContent = sorted[0].name;
    mostExpPur.children[1].textContent = sorted[0].cat;
    mostExpPur.children[2].textContent = sorted[0].price;

    const tr = document.createElement('tr');
    table.appendChild(tr);

    const tName = document.createElement("td");
    tName.textContent = ncp.name;
    tr.appendChild(tName);

    const tCat = document.createElement('td');
    tCat.textContent = ncp.cat;
    tr.appendChild(tCat);

    const tPrice = document.createElement('td');
    tPrice.textContent = ncp.price;
    tr.appendChild(tPrice);

    scoreTotal = scoreTotal + ncp.price;
    total.textContent = scoreTotal;

    const tButton = document.createElement('button');
    tButton.textContent = 'x';
    tButton.className = "btn btn-warning btn-sm";
    tr.appendChild(tButton);

    nameEl.value = catEl.value = priceEl.value = '';

    count.textContent = table.rows.length;

    tButton.addEventListener('click', () => {

        scoreTotal = scoreTotal - Number(tr.children[2].textContent);
        total.textContent = scoreTotal;

        arr.splice(tr.rowIndex - 1, 1);
        console.log(arr);
        if (arr.length > 0) {
            const sorted = arr.slice();
            sorted.sort((a, b) => b.price - a.price);
            mostExpPur.children[0].textContent = sorted[0].name;
            mostExpPur.children[1].textContent = sorted[0].cat;
            mostExpPur.children[2].textContent = sorted[0].price;
        }

        if (arr.length === 0) {
            mostExpPur.children[0].textContent = '';
            mostExpPur.children[1].textContent = '';
            mostExpPur.children[2].textContent = '0';
        }

        table.removeChild(tr);
        count.textContent = table.rows.length;
    });
});







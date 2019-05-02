const nameEl = document.getElementById('name');
const priceEl = document.getElementById('price');
const catEl = document.getElementById('cat');
const button = document.getElementById('add');
const list = document.getElementById('list');
const table = document.getElementById('table');

button.addEventListener('click', () => {
    const name = nameEl.value;
    console.log(nameEl);
    console.log(name);

    const price = Number(priceEl.value);
    console.log(price);
    console.log(typeof price);

    const cat = catEl.value;

    // const li = document.createElement('li');
    // li.textContent = name + '  ' + cat + '  ' + price;
    // li.className = 'list-group-item';
    // list.appendChild(li);

    const tr = document.createElement('tr');
    tr.idName = 'tr';
    table.appendChild(tr);
    console.log(tr);
    console.log(table);

    // const td = document.getElementById('tr');

    const tName = document.createElement("td");
    tName.textContent = name;
    tr.appendChild(tName);

    const tCat = document.createElement('td');
    tCat.textContent = cat;
    tr.appendChild(tCat);

    const tPrice = document.createElement('td');
    tPrice.textContent = price;
    tr.appendChild(tPrice);

    const tButton = document.createElement('button');
    tButton.textContent = 'x';
    tButton.className = "btn btn-warning btn-sm";
    tr.appendChild(tButton);

    nameEl.value ='';
    catEl.value = '';
    priceEl.value = '';

    tButton.addEventListener('click',()=>{
        table.removeChild(tr);

    })
});






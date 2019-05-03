//import {calculateTotal} from "./lib.js";

const nameEl = document.getElementById('name');
const priceEl = document.getElementById('price');
const catEl = document.getElementById('cat');
const button = document.getElementById('add');
const table = document.getElementById('table');
const count = document.getElementById('count');
const total =document.getElementById('total');
let scoreTotal = 0;

button.addEventListener('click', () => {
    const name = nameEl.value;

    const price = Number (priceEl.value);

    const cat = catEl.value;


    const tr = document.createElement('tr');
    table.appendChild(tr);

    const tName = document.createElement("td");
    tName.textContent = name;
    tr.appendChild(tName);

    const tCat = document.createElement('td');
    tCat.textContent = cat;
    tr.appendChild(tCat);

    const tPrice = document.createElement('td');
    tPrice.textContent =price;
    tr.appendChild(tPrice);

    const tButton = document.createElement('button');
    tButton.textContent = 'x';
    tButton.className = "btn btn-warning btn-sm";
    tr.appendChild(tButton);


    // total.textContent = Number(price) + scoreTotal;
    // scoreTotal =+ price;

    nameEl.value ='';
    catEl.value = '';
    priceEl.value = '';

    count.textContent = table.rows.length;
    console.dir(table.rows);

total.textContent


    tButton.addEventListener('click',()=>{

        scoreTotal = scoreTotal - 1;
        table.removeChild(tr);
        count.textContent = count.textContent - 1;

    });

//     const testV = table.rows[length - 1].cells[2];
   //  console.log(testV.textContent);



});






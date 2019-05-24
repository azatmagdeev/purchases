import {findMaxCat, findMaxCatName} from "./lib.js";

export class PurchasesWidget {
    constructor(parent, parent2) {
        this.parent = parent;
        this.parent2 = parent2;
        this.purchases = [];
        this.init();
    }

    init() {
        this.parent.innerHTML = `
          <div class="container">
                    <div class="row">
                        <div class="col mt-3"><h1>Purchases List</h1></div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-sm-3"><input type="text" class="form-control" placeholder="name" id="name"
                                                     autofocus required></div>
                        <div class="col-sm-3"><input type="text" class="form-control" placeholder="category" id="cat"
                                                      required></div>
                        <div class="col-sm-3"><input type="number" class="form-control" placeholder="price" id="price"
                                                     autofocus required></div>

                        <div class="col-sm-3">
                            <button class="btn btn-block btn-primary" id="add">Add</button>
                        </div>
                    </div>
                </div>
                <table class="table table-striped mt-3">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                       <th></th>
                       <th></th>
                       
                    </tr>
                    </thead>
                    <tbody id="table">

                    <!-- there will be a purchases table-->

                    </tbody>
                </table>`;
        this.name = document.getElementById('name');
        this.cat = document.getElementById('cat');
        this.price = document.getElementById('price');
        this.add = document.getElementById('add');
        this.add.addEventListener('click', () => {
            this.onAdd()
        });
        this.table = document.getElementById('table');
        this.parent2.innerHTML = `<aside class="col-sm-6 col-md-12">
                        <table class="table table-bordered">
                            <tbody>
                            <tr>
                                <td colspan="3"><b>Most expensive purchase:</b></td>
                            </tr>
                            <tr id="mostExpPur">
                                <td></td>
                                <td></td>
                                <td align="right">0</td>
                            </tr>
                            <tr>
                                <td colspan="3"><b>Most expensive category:</b></td>
                            </tr>
                            <tr id="mostExpCat">
                                <td colspan="2"></td>
                                <td align="right">0</td>
                            </tr>
                            <tr>
                                <td colspan="3"><b>Stats:</b></td>
                            </tr>
                            <tr>
                                <td colspan="2">Total</td>
                                <td colspan="1" id="total" align="right">0</td>
                            </tr>
                            <tr>
                                <td colspan="2">Count</td>
                                <td id="count" align="right">0</td>
                            </tr>
                            </tbody>
                        </table>

                    </aside>`;
        this.count = document.getElementById('count');
        this.total = document.getElementById('total');
        this.mostExpPur = document.getElementById('mostExpPur');
        this.mostExpCat = document.getElementById('mostExpCat');
    }

    onAdd() {
        class Purchase {
            constructor(name, cat, price) {
                this.name = name;
                this.cat = cat;
                this.price = Number(price);
            };
        }

        const ncp = new Purchase(
            this.name.value,
            this.cat.value,
            this.price.value);

        this.purchases.push(ncp);

        this.name.value = this.cat.value = this.price.value = '';

        this.createTable();

    }

    createTable() {
        this.table.innerHTML = '';
        for (const purchase of this.purchases) {

            const tr = document.createElement('tr');
            this.table.appendChild(tr);

            const tName = document.createElement("td");
            tName.textContent = purchase.name;
            tr.appendChild(tName);

            const tCat = document.createElement('td');
            tCat.textContent = purchase.cat;
            tr.appendChild(tCat);

            const tPrice = document.createElement('td');
            tPrice.textContent = purchase.price;
            tr.appendChild(tPrice);

            const xBtn = document.createElement('button');
            xBtn.innerHTML = `<b>X</b>`;
            xBtn.className = "btn btn-warning btn-sm float-right";
            tr.appendChild(xBtn);
            xBtn.addEventListener('click', () => {
                this.purchases.splice(this.purchases.indexOf(purchase), 1);
                this.createTable();
            });

            if (this.purchases.indexOf(purchase) !== 0) {

                const upBtn = document.createElement('button');
                upBtn.textContent = '▲';
                upBtn.className = "btn btn-success btn-sm float-right";
                tr.appendChild(upBtn);
                upBtn.addEventListener('click', () => {
                    const newPos = this.purchases.indexOf(purchase) - 1;
                    const moved = this.purchases.splice(this.purchases.indexOf(purchase), 1);
                    this.purchases.splice(newPos, 0, moved[0]);
                    this.createTable();
                });
            }

            if (this.purchases.indexOf(purchase) !== this.purchases.length - 1) {

                const downBtn = document.createElement('button');
                downBtn.textContent = '▼';
                downBtn.className = "btn btn-success btn-sm float-right";
                tr.appendChild(downBtn);
                downBtn.addEventListener('click', () => {
                    const newPos = this.purchases.indexOf(purchase) + 1;
                    const moved = this.purchases.splice(this.purchases.indexOf(purchase), 1);
                    this.purchases.splice(newPos, 0, moved[0]);
                    this.createTable();
                });
            }


        }
        this.calculateCount();
        this.calculateTotal();
        this.findExpPur();
        this.findExpCat();
    }


    calculateCount() {
        this.count.textContent = String(this.purchases.length);
    }

    calculateTotal() {
        const prices = [];
        for (let i = 0; i < this.purchases.length; i++) {
            prices.push(this.purchases[i].price)
        }
        let sum = 0;
        prices.forEach(num => sum += Number(num));
        this.total.textContent = sum;
    }

    findExpPur() {
        if (this.purchases.length !== 0) {
            const sorted = [...this.purchases];
            sorted.sort((a, b) => b.price - a.price);
            this.mostExpPur.children[0].textContent = sorted[0].name;
            this.mostExpPur.children[1].textContent = sorted[0].cat;
            this.mostExpPur.children[2].textContent = sorted[0].price;
        }
        if (this.purchases.length === 0) {
            this.mostExpPur.children[1].textContent = '';
            this.mostExpPur.children[2].textContent = '0';
            this.mostExpPur.children[0].textContent = '';
            this.mostExpCat.children[0].textContent = '';
            this.mostExpCat.children[1].textContent = '0';
        }

    }

    findExpCat() {
        const catPrice = {};
        for (let i = 0; i < this.purchases.length; i++) {
            catPrice[this.purchases[i].cat] = [];
        }
        for (let i = 0; i < this.purchases.length; i++) {
            catPrice[this.purchases[i].cat].push(Number(this.purchases[i].price));
        }

        const result = {};
        for (let i = 0; i < this.purchases.length; i++) {
            result[this.purchases[i].cat] = catPrice[this.purchases[i].cat].reduce(function (sum, num) {
                return sum + num
            });
        }

        this.mostExpCat.children[0].textContent = findMaxCatName(result);
        this.mostExpCat.children[1].textContent = String(findMaxCat(result));
    }
}

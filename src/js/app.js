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
const mostExpCat = document.getElementById('mostExpCat');
let cp = {};
let result = {};


button.addEventListener('click', () => {

        //создаю объект имя-категория-цена
        const ncp = {
            name: nameEl.value,
            cat: catEl.value,
            price: Number(priceEl.value),
        };
        arr.push(ncp); //добавляю в массив объектов

        const sorted = arr.slice(); //копирую массив для сортировки
        sorted.sort((a, b) => b.price - a.price);//сортирую по цене
        //вывожу наибольший объект
        mostExpPur.children[0].textContent = sorted[0].name;
        mostExpPur.children[1].textContent = sorted[0].cat;
        mostExpPur.children[2].textContent = sorted[0].price;

        //создаю список - таблицу
        const tr = document.createElement('tr');
        table.appendChild(tr);//создаю новую строку в таблице

        const tName = document.createElement("td");
        tName.textContent = ncp.name;
        tr.appendChild(tName); //вывожу имя в строке

        const tCat = document.createElement('td');
        tCat.textContent = ncp.cat;
        tr.appendChild(tCat);//вывожу категорию в строке

        const tPrice = document.createElement('td');
        tPrice.textContent = ncp.price;
        tr.appendChild(tPrice);//вывожу цену в строке

        const tButton = document.createElement('button');
        tButton.textContent = 'x';
        tButton.className = "btn btn-warning btn-sm";
        tr.appendChild(tButton);//создаю кнопку удаления в строке

        nameEl.value = catEl.value = priceEl.value = '';//очищаю поля ввода

        count.textContent = table.rows.length;//вывожу количество покупок-строк в таблице
        scoreTotal = scoreTotal + ncp.price; //тотал увеличиваю на цену
        total.textContent = scoreTotal;//вывожу тотал

        //!вычисляю дорогую категорию
        //создаю массивы из категорий
        for (let i = 0; i < table.rows.length; i++) {
            cp[table.rows[i].cells[1].textContent] = [];
        }

        //добавляю цены в массивы категорий из таблицы
        for (let i = 0; i < table.rows.length; i++) {
            cp[table.rows[i].cells[1].textContent].push(Number(table.rows[i].cells[2].textContent));
        }

        result = {};//создаю объект, где будут храниться суммированные категории
        //свойства объекта - вычисленные из таблицы названия категорий, значение свойств - сумма массивов категорий
        for (let i = 0; i < table.rows.length; i++) {
            result[table.rows[i].cells[1].textContent] = cp[table.rows[i].cells[1].textContent].reduce(function (sum, current) {
                return sum + current
            });
        }

        // вычисляю наибольшее значение среди свойств
        function findMaxCat(result) {
            let maxCat = 0;
            for (let key in result) {
                if (result[key] > maxCat) {
                    maxCat = result[key];
                }
            }
            return maxCat;
        }

        //вычисляю имя свойства с наибольшим значением
        function findMaxCatName(result) {
            let maxCat = 0;
            let maxCatName = '';
            for (let key in result) {
                if (result[key] > maxCat) {
                    maxCat = result[key];
                    maxCatName = key;
                }
            }
            return maxCatName;
        }
        //вывожу имя и значение максимальной категории
        mostExpCat.children[0].textContent = findMaxCatName(result);
        mostExpCat.children[1].textContent = findMaxCat(result);


        tButton.addEventListener('click', () => {

            scoreTotal = scoreTotal - Number(tr.children[2].textContent);//вычитаю из тотала цену удаляемой строки
            total.textContent = scoreTotal;

            arr.splice(tr.rowIndex - 1, 1);//удаляю из массива объект строки таблицы

            if (arr.length > 0) {  //если массив не пустой, сортирую массив после удаления строки
                const sorted = arr.slice();
                sorted.sort((a, b) => b.price - a.price);
                mostExpPur.children[0].textContent = sorted[0].name;
                mostExpPur.children[1].textContent = sorted[0].cat;
                mostExpPur.children[2].textContent = sorted[0].price;
            }

            if (arr.length === 0) {//если массив пустой, то обнуляю значения самой дорогой покупки
                mostExpPur.children[0].textContent = '';
                mostExpPur.children[1].textContent = '';
                mostExpPur.children[2].textContent = '0';
            }

            table.removeChild(tr);// удаляю строку таблицы
            count.textContent = table.rows.length; //обновляю значение количества покупок

            //!вычисляю самую дорогую категорию
            for (let i = 0; i < table.rows.length; i++) {
                cp[table.rows[i].cells[1].textContent] = [];
            }

            for (let i = 0; i < table.rows.length; i++) {
                cp[table.rows[i].cells[1].textContent].push(Number(table.rows[i].cells[2].textContent));
            }

            result = {};
            for (let i = 0; i < table.rows.length; i++) {
                result[table.rows[i].cells[1].textContent] = cp[table.rows[i].cells[1].textContent].reduce(function (sum, current) {
                    return sum + current
                });
            }
            console.log(result);

            function findMaxCat(result) {
                let maxCat = 0;
                for (let key in result) {
                    if (result[key] > maxCat) {
                        maxCat = result[key];
                    }
                }
                return maxCat;
            }

            function findMaxCatName(result) {
                let maxCat = 0;
                let maxCatName = '';
                for (let key in result) {
                    if (result[key] > maxCat) {
                        maxCat = result[key];
                        maxCatName = key;
                    }
                }
                return maxCatName;
            }

            mostExpCat.children[0].textContent = findMaxCatName(result);
            mostExpCat.children[1].textContent = findMaxCat(result);
        });

    }
)
;
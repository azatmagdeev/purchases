export function findMaxCat(object) {
    let maxCat = 0;
    for (let key in object) {
        if (object[key] > maxCat) {
            maxCat = object[key];
        }
    }
    return maxCat;
}

export function findMaxCatName(object) {
    let maxCat = 0;
    let maxCatName = '';
    for (let key in object) {
        if (object[key] > maxCat) {
            maxCat = object[key];
            maxCatName = key;
        }
    }
    return maxCatName;
}

export class Purchase {
    constructor(name, cat, price) {
        this.name = name;
        this.cat = cat;
        this.price = Number(price);
    };
}


import {findMaxCat} from "../lib.js";

test('most expensive category is found', () => {
    const object = {
        food: 1000,
        car: 3000,
        home: 5000,
    };
    const expected = 5000;

    const result = findMaxCat(object);

    expect(result).toBe(expected);
});

import {findMaxCatName} from "../lib.js";

test('most expensive category\'s name is found', () => {
    const object = {
        home: 5000,
        food: 1000,
        car: 3000,
    };
    const expected = 'home';

    const result = findMaxCatName(object);

    expect(result).toBe(expected);
});
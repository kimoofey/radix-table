import {Cosmonaut, orderType} from "../types";
import {headers, sortOrder} from "../CONSTS";

export function sortArrayOfObjects(array: Cosmonaut[], ordering: orderType, orderBy: number) {
    if (orderBy < 0)
        return array;

    const header = headers[orderBy];
    let sorted = array.map((el, i) => {
        return {index: i, value: el[header]};
    });

    sorted.sort(function (a, b) {
        if (a.value > b.value) {
            return ordering === sortOrder.ASC ? 1 : -1;
        }
        if (a.value < b.value) {
            return ordering === sortOrder.ASC ? -1 : 1;
        }
        return 0;
    });

    return sorted.map(function (el) {
        return array[el.index];
    });
}
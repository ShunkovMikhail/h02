"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = exports.TABLE = exports.admins = void 0;
exports.admins = { 'admin': 'qwerty' };
//-------------------DB------------------------+
var TABLE;
(function (TABLE) {
    TABLE[TABLE["BLOGS"] = 0] = "BLOGS";
    TABLE[TABLE["POSTS"] = 1] = "POSTS";
})(TABLE = exports.TABLE || (exports.TABLE = {}));
let data = [[]];
let increment = [0, 0];
//-------------------DB------------------------+
class DB {
    create(table, input) {
        data[table].push(input);
        while (!(!data[table][increment[table]] || data[table][increment[table]] === null)) {
            increment[table]++;
        }
    }
    createAtID(table, id, input) {
        data[table][id] = input;
    }
    get(table, id) {
        return data[table][id];
    }
    getAll(table) {
        return data[table].filter(o => o !== null);
    }
    update(table, id, input) {
        console.log(data[table], 'data');
        data[table][id] = Object.assign({}, data[table][id], input);
    }
    delete(table, id) {
        if (!data[table][id] || data[table][id] === null) {
            return 404;
        }
        data[table][id] = null;
        return 204;
    }
    clearTable(table) {
        data[table] = [];
        return 204;
    }
    clear() {
        data = [[]];
        return 204;
    }
    nextID(table) {
        return increment[table];
    }
    exists(table, id) {
        return !(!data[table][id] || data[table][id] === null);
    }
}
exports.DB = DB;

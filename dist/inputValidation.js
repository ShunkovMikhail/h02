"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validate = void 0;
const data_1 = require("./data");
class Validate {
    CreateVideo(input) {
        let errors = [];
        if (!equalType(input.title, '')) {
            errors.push({
                message: 'Incorrect type!',
                field: 'title'
            });
        }
        else if (input.title.length > 40) {
            errors.push({
                message: 'Too many characters! (maxLength: 40)',
                field: 'title'
            });
        }
        if (!equalType(input.author, '')) {
            errors.push({
                message: 'Incorrect type!',
                field: 'author'
            });
        }
        else if (input.author.length > 20) {
            errors.push({
                message: 'Too many characters! (maxLength: 20)',
                field: 'author'
            });
        }
        if (!arrayStrictMatch(Object.keys(data_1.RESOLUTIONS), input.availableResolutions)) {
            errors.push({
                message: 'At least one resolution should be added!',
                field: 'availableResolutions'
            });
        }
        if (errors[0]) {
            return { HTTPStatus: 400, Response: { errorsMessages: errors }, Success: false };
        }
        return { HTTPStatus: 201, Response: undefined, Success: true };
    }
    UpdateVideo(input) {
        let errors = [];
        if (!equalType(input.title, '')) {
            errors.push({
                message: 'Incorrect type!',
                field: 'title'
            });
        }
        else if (input.title.length > 40) {
            errors.push({
                message: 'Too many characters! (maxLength: 40)',
                field: 'title'
            });
        }
        if (!equalType(input.author, '')) {
            errors.push({
                message: 'Incorrect type!',
                field: 'author'
            });
        }
        else if (input.author.length > 20) {
            errors.push({
                message: 'Too many characters! (maxLength: 20)',
                field: 'author'
            });
        }
        if (!equalType(input.publicationDate, '')) {
            errors.push({
                message: 'Incorrect type!',
                field: 'publicationDate'
            });
        }
        else {
            const dateIsValid = (new Date(Date.parse(input.publicationDate)).toISOString() ===
                new Date(input.publicationDate).toISOString());
            if (!dateIsValid) {
                errors.push({
                    message: 'Incorrect date-time format!',
                    field: 'publicationDate'
                });
            }
        }
        if (!equalType(input.minAgeRestriction, 0) && !equalType(input.minAgeRestriction, null)) {
            errors.push({
                message: 'Incorrect type!',
                field: 'minAgeRestriction'
            });
        }
        else if (input.minAgeRestriction !== null) {
            if (input.minAgeRestriction > 18 || input.minAgeRestriction < 1) {
                errors.push({
                    message: 'minAgeRestriction should be null or (1 - 18)!',
                    field: 'minAgeRestriction'
                });
            }
        }
        if (!equalType(input.canBeDownloaded, false)) {
            errors.push({
                message: 'Incorrect type!',
                field: 'canBeDownloaded'
            });
        }
        if (!arrayStrictMatch(Object.keys(data_1.RESOLUTIONS), input.availableResolutions)) {
            errors.push({
                message: 'At least one resolution should be added!',
                field: 'availableResolutions'
            });
        }
        if (errors[0]) {
            return { HTTPStatus: 400, Response: { errorsMessages: errors }, Success: false };
        }
        return { HTTPStatus: 204, Response: undefined, Success: true };
    }
}
exports.Validate = Validate;
/**Return true if the second array contains at least 1 value
 * and all values from the second array exactly match the first array.
 */
const arrayStrictMatch = (first, second) => {
    if (second === null) {
        return false;
    }
    if (second.length < 1) {
        return false;
    }
    for (let i = 0; i < second.length; i++) {
        if (first.indexOf(second[i]) === -1) {
            return false;
        }
    }
    return true;
};
const equalType = (a, b) => { return typeof (a) === typeof (b); };

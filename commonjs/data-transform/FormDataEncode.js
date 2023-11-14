"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormDataEncode = void 0;
/**
 * @class FormDataEncode
 */
class FormDataEncode {
    /**
     * @inheritDoc
     */
    dataEncode(data) {
        let formData = new FormData();
        for (let prop in data) {
            // skip loop if the property is from prototype
            if (!data.hasOwnProperty(prop))
                continue;
            switch (true) {
                case data[prop] === null:
                    formData.append(prop, data[prop]);
                    break;
                case Array.isArray(data[prop]):
                    // Append array data
                    for (let cont = 0; data[prop].length > cont; cont++) {
                        formData.append(`${prop}[]`, data[prop][cont]);
                    }
                    break;
                case typeof data[prop] === 'object' && !(data[prop] instanceof File):
                    // Append obje t data
                    for (let intProp in data[prop]) {
                        formData.append(`${prop}[${intProp}]`, data[prop][intProp]);
                    }
                    break;
                default:
                    // Append default data
                    formData.append(prop, data[prop]);
            }
        }
        return formData;
    }
}
exports.FormDataEncode = FormDataEncode;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
            formData.append(prop, data[prop]);
        }
        return formData;
    }
}
exports.FormDataEncode = FormDataEncode;

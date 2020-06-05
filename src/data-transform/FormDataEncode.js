/**
 * @class FormDataEncode
 */
export class FormDataEncode {
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
//# sourceMappingURL=FormDataEncode.js.map
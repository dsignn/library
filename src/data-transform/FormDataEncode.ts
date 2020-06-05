import {DataEncodeInterface} from "./DataEncodeInterface";

/**
 * @class FormDataEncode
 */
export class FormDataEncode implements DataEncodeInterface {

    /**
     * @inheritDoc
     */
    dataEncode(data: object): any {
        let formData = new FormData();
        for (let prop in data) {
            // skip loop if the property is from prototype
            if (!data.hasOwnProperty(prop)) continue;

            formData.append(prop, data[prop]);
        }
        return formData;
    }
}
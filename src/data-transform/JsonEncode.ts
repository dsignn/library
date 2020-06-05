import {DataEncodeInterface} from "./DataEncodeInterface";

/**
 * @class JsonEncode
 */
export class JsonEncode implements DataEncodeInterface {

    /**
     * @inheritDoc
     */
    dataEncode(data: object): any {
        return JSON.stringify(data);
    }
}
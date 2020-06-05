import {DataDecodeInterface} from "./DataDecodeInterface";

/**
 * @class JsonDecode
 */
export class JsonDecode implements DataDecodeInterface {

    /**
     * @inheritDoc
     */
    dataDecode(data: any): object {
        return JSON.parse(data);
    }
}
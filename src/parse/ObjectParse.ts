import {ParseInterface} from "./ParseInterface";

/**
 *
 */
export class ObjectParse implements ParseInterface{

    /**
     * @inheritDoc
     */
    parse(data: object): string {
        return JSON.stringify(data);
    }
}

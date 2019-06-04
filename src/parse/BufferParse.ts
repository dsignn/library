import {ParseInterface} from "./ParseInterface";

/**
 *
 */
export class BufferParse implements ParseInterface{

    /**
     * @inheritDoc
     */
    parse(data: Buffer): object {
        return JSON.parse(data.toString());
    }
}

/// <reference types="node" />
import { ParseInterface } from "./ParseInterface";
/**
 *
 */
export declare class BufferParse implements ParseInterface {
    /**
     * @inheritDoc
     */
    parse(data: Buffer): object;
}

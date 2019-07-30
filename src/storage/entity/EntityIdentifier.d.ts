import { EntityIdentifierInterface } from "./EntityIdentifierInterface";
/**
 *
 */
export declare class EntityIdentifier implements EntityIdentifierInterface {
    /**
     * @type string
     */
    protected id: string;
    /**
     * @inheritDoc
     */
    getId(): string;
    /**
     * @inheritDoc
     */
    setId(id: string): this;
}

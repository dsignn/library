import {EntityIdentifierInterface} from "./EntityIdentifierInterface";
/**
 *
 */
export class EntityIdentifier implements EntityIdentifierInterface {

    /**
     * @type string
     */
    protected id:string;

    /**
     * @inheritDoc
     */
    getId(): string {
        return this.id;
    }

    /**
     * @inheritDoc
     */
    setId(id: string) {
        this.id = id;
        return this;
    }
}
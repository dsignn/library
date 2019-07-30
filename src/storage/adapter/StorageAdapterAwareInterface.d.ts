import { StorageAdapterInterface } from "./StorageAdapterInterface";
/**
 *
 */
export interface StorageAdapterAwareInterface {
    /**
     * @return {StorageAdapterInterface}
     */
    getAdapter(): StorageAdapterInterface;
    /**
     * @param {StorageAdapterInterface} adapter
     * @return {this}
     */
    setAdapter(adapter: StorageAdapterInterface): void;
}

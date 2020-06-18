/**
 *
 */
export interface PathInterface {

    /**
     * @return {string}
     */
    getPath(): string;

    /**
     * @return {boolean}
     */
    isAbsolute(): boolean;

    /**
     * @param {string} directory
     */
    setDirectory(directory: string): PathInterface;

    /**
     * @param {string} nameFile
     */
    setNameFile(nameFile: string): PathInterface;

    /**
     * @param {string} extension
     */
    setExtension(extension: string): PathInterface;
}

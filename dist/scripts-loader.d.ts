/*!
 * Scripts-Loader JavaScript Library v1.1.1
 * https://github.com/Mubarrat/scripts-loader/
 * 
 * Released under the MIT license
 * https://github.com/Mubarrat/scripts-loader/blob/main/LICENSE
 */
/**
 * An simple implementation that the data is xml or json.
 * @param data The data to be checked.
 * @returns If data is in xml, "xml". Or if data is in json, "json". Or an empty string will be returned.
 */
declare function detectFormatXmlOrJson(data: string): "xml" | "json" | "";
/**
 * An function that loads script.
 * @param data The script array where scripts will be loaded.
 * @param renderer The renderer type can either be "document" or "ajax" or "fetch"
 */
declare function loadScript(data: ScriptArray, renderer: "document" | "ajax" | "fetch"): void;
/**
 * The script array class
 */
declare class ScriptArray extends Array<ScriptObject> {
    /**
     * The constructor of this script array.
     * @param array The array of this class.
     */
    constructor(...array: ScriptObject[]);
    /**
     * Adds an script object.
     * @param scriptObject The script object to be added.
     * @returns Return the number of adding.
     */
    add(scriptObject: ScriptObject): number;
    /**
     * Get all names.
     */
    get names(): string[];
}
/**
 * A class for script object.
 */
declare class ScriptObject {
    /**
     * A name for using in another dependency
     */
    name: string;
    /**
     * Sources for this object. Not-first sources are fallback.
     */
    sources: string[];
    /**
     * Dependencies for this javaScript
     */
    dependencies: string[];
    /**
     * An promise list. Merge promises here
     */
    promises: Promise<void>[];
}
/**
 * Define an shortname with objects.
 */
declare const $ls: ((data: string | {}[]) => void) & {
    /**
     * An xml helper function.
     */
    xml: ((data: string) => void) & {
        /**
         * This is document injection rendering mode.
         * @param data The xml data.
         */
        document(data: string): void;
        /**
         * This is ajax loading rendering mode.
         * @param data The xml data.
         */
        ajax(data: string): void;
        /**
         * This is fetching rendering mode.
         * @param data The xml data.
         */
        fetch(data: string): void;
    };
    /**
     * An json helper function
     */
    json: ((data: string) => void) & {
        /**
         * This is document injection rendering mode.
         * @param data The json data.
         */
        document(data: string): void;
        /**
         * This is ajax loading rendering mode.
         * @param data The json data.
         */
        ajax(data: string): void;
        /**
         * This is fetching rendering mode.
         * @param data The json data.
         */
        fetch(data: string): void;
    };
    /**
     * This is document injection rendering mode.
     * @param data The script array.
     */
    document(data: string | {}[]): void;
    /**
     * This is ajax loading rendering mode.
     * @param data The script array.
     */
    ajax(data: string | {}[]): void;
    /**
     * This is fetching rendering mode.
     * @param data The script array.
     */
    fetch(data: string | {}[]): void;
    /**
     * Load from url
     * @param url The url where is data
     * @param mode The loading mode
     */
    url: ((url: string, mode?: "ajax" | "fetch") => void) & {
        /**
         * This is document injection rendering mode from url.
         * @param url The url where is data
         * @param mode The loading mode
         */
        document(url: string, mode?: "ajax" | "fetch"): Promise<void>;
        /**
         * This is document injection rendering mode from url.
         * @param url The url where is data
         * @param mode The loading mode
         */
        ajax(url: string, mode?: "ajax" | "fetch"): Promise<void>;
        /**
         * This is document injection rendering mode from url.
         * @param url The url where is data
         * @param mode The loading mode
         */
        fetch(url: string, mode?: "ajax" | "fetch"): void;
    };
};
/**
 * This method returns the validated script array.
 * @param data The script array to be validated.
 * @returns Returns the validated script array.
 */
declare function validateAsScriptArray(data: {}[]): ScriptArray;
/**
 * It validates json as script array.
 * @param data The data to be parsed.
 * @returns Returns the parsed script array.
 */
declare function validateJsonAsScriptArray(data: string): ScriptArray;
/**
 * It validates xml string as script array.
 * @param data The data to be parsed.
 * @returns Returns an script array.
 */
declare function validateXmlAsScriptArray(data: string): ScriptArray;
//# sourceMappingURL=scripts-loader.d.ts.map
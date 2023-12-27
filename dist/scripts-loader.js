/*!
 * Scripts-Loader JavaScript Library v1.0.4
 * https://github.com/Mubarrat/scripts-loader/
 * 
 * Released under the MIT license
 * https://github.com/Mubarrat/scripts-loader/blob/main/LICENSE
 */
"use strict";
function detectFormatXmlOrJson(data) {
    switch (data.trim().charAt(0)) {
        case '<':
            try {
                new DOMParser().parseFromString(data, "text/xml");
                return "xml";
            }
            catch (_a) {
                return "";
            }
        case '{':
        case '}':
            try {
                JSON.parse(data);
                return "json";
            }
            catch (_b) {
                return "";
            }
        default:
            return "";
    }
}
function loadScript(data, renderer) {
    switch (renderer) {
        case "document":
            for (const item of data) {
                if (item.sources.length === 0) {
                    continue;
                }
                if (item.dependencies.length > 0) {
                    const promises = new Array().concat(...item.dependencies.map(dependencyName => {
                        const dependentScript = data.find(script => script.name === dependencyName);
                        return dependentScript ? dependentScript.promises : Promise.resolve();
                    }));
                    Promise.all(item.promises = item.promises.concat(...promises))
                        .then(_ => loadScriptFromSource([...item.sources]), console.error)
                        .catch(console.error);
                }
                else {
                    item.promises = item.promises.concat(loadScriptFromSource([...item.sources]));
                }
            }
            break;
        case "ajax":
            for (const item of data) {
                if (item.sources.length === 0) {
                    continue;
                }
                if (item.dependencies.length > 0) {
                    const promises = new Array().concat(...item.dependencies.map(dependencyName => {
                        const dependentScript = data.find(script => script.name === dependencyName);
                        return dependentScript ? dependentScript.promises : Promise.resolve();
                    }));
                    Promise.all(item.promises = item.promises.concat(...promises))
                        .then(_ => loadScriptFromAjax([...item.sources]), console.error)
                        .catch(console.error);
                }
                else {
                    item.promises = item.promises.concat(loadScriptFromAjax([...item.sources]));
                }
            }
            break;
        default:
            throw new Error('`renderer` is either be "document" or "ajax"');
    }
    function loadScriptFromSource(sources) {
        return new Promise((resolve, reject) => {
            if (sources.length === 0) {
                reject('All sources failed.');
                return;
            }
            const scriptE = document.createElement("script");
            scriptE.type = 'text/javascript';
            scriptE.src = sources.shift();
            scriptE.onload = () => resolve();
            scriptE.onerror = () => loadScriptFromSource(sources).then(resolve).catch(reject);
            document.head.appendChild(scriptE);
        });
    }
    function loadScriptFromAjax(sources) {
        return new Promise((resolve, reject) => {
            if (sources.length === 0) {
                reject('All sources failed.');
                return;
            }
            const xhr = new XMLHttpRequest();
            xhr.open('GET', sources.shift());
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        new Function(xhr.responseText)();
                        resolve();
                    }
                    else {
                        loadScriptFromSource(sources).then(resolve).catch(reject);
                    }
                }
            };
            xhr.send();
        });
    }
}
class ScriptArray extends Array {
    constructor(...array) {
        if (!Array.isArray(array)) {
            throw new Error("`array` isn't array");
        }
        if (!array.every(x => x instanceof ScriptObject)) {
            throw new Error("Every item of `array` isn't an instance of ScriptObject");
        }
        super(...array);
    }
    add(scriptObject) {
        return this.push(scriptObject);
    }
    get names() {
        return this.map(s => s.name);
    }
}
class ScriptObject {
    constructor() {
        this.name = "";
        this.sources = [];
        this.dependencies = [];
        this.promises = [];
    }
}
const $ls = Object.assign((data) => {
    if (typeof data !== "string" && !Array.isArray(data)) {
        throw new Error("`data` should be either string or an object array.");
    }
    if (typeof data === "string") {
        switch (detectFormatXmlOrJson(data)) {
            case "xml":
                $ls.xml(data);
                break;
            case "json":
                $ls.json(data);
                break;
            default:
                throw new Error("Unknown type");
        }
    }
    else {
        $ls.document(data);
    }
}, {
    xml: Object.assign((data) => {
        if (typeof data !== "string") {
            throw new Error("data should be string");
        }
        $ls.xml.document(data);
    }, {
        document(data) {
            if (typeof data !== "string") {
                throw new Error("data should be string");
            }
            loadScript(validateXmlAsScriptArray(data), "document");
        },
        ajax(data) {
            if (typeof data !== "string") {
                throw new Error("data should be string");
            }
            loadScript(validateXmlAsScriptArray(data), "ajax");
        }
    }),
    json: Object.assign((data) => {
        if (typeof data !== "string") {
            throw new Error("data should be string");
        }
        $ls.json.document(data);
    }, {
        document(data) {
            if (typeof data !== "string") {
                throw new Error("data should be string");
            }
            loadScript(validateJsonAsScriptArray(data), "document");
        },
        ajax(data) {
            if (typeof data !== "string") {
                throw new Error("data should be string");
            }
            loadScript(validateJsonAsScriptArray(data), "ajax");
        }
    }),
    document(data) {
        if (!Array.isArray(data)) {
            throw new Error("data should be string");
        }
        loadScript(validateAsScriptArray(data), "document");
    },
    ajax(data) {
        if (!Array.isArray(data)) {
            throw new Error("data should be string");
        }
        loadScript(validateAsScriptArray(data), "ajax");
    },
    url(url) {
        const xhr = new XMLHttpRequest;
        xhr.open("GET", url);
        xhr.onreadystatechange = () => xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200 && $ls(xhr.responseText);
        xhr.send();
    }
});
function validateAsScriptArray(data) {
    if (!Array.isArray(data)) {
        throw new Error('Root element should be an array');
    }
    return new ScriptArray(...data.map(item => {
        if (typeof item !== 'object' || Array.isArray(item)) {
            throw new Error('Items should be objects');
        }
        const numAttributes = Object.keys(item).length;
        if (numAttributes < 1 || numAttributes > 3) {
            throw new Error('Items should have from 1 to 3 attributes');
        }
        const { name, source, sources, dependency, dependencies } = item;
        if (!source && !sources) {
            throw new Error('Attributes source(s) are required');
        }
        if (source && sources) {
            throw new Error('source and sources both are defined');
        }
        return Object.assign(new ScriptObject, {
            name: name || "",
            sources: sources || (source ? [source] : []),
            dependencies: dependencies || (dependency ? [dependency] : [])
        });
    }));
}
function validateJsonAsScriptArray(data) {
    if (typeof data !== "string") {
        throw new Error("`data` isn't string");
    }
    return validateAsScriptArray(JSON.parse(data));
}
function validateXmlAsScriptArray(data) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, "text/xml");
    const namespace = "http://schemas.mubarrat.com/scripts-loader/";
    return validateAsScriptArray([...xmlDoc.getElementsByTagNameNS(namespace, "script")].map(x => {
        return {
            name: x.getAttribute("name"),
            sources: [...x.getElementsByTagNameNS(namespace, "source")].map(x => x.textContent),
            dependencies: [...x.getElementsByTagNameNS(namespace, "dependency")].map(x => x.textContent)
        };
    }));
}
//# sourceMappingURL=scripts-loader.js.map
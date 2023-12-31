/*
 * MIT License
 *
 * Copyright (c) 2023 Mubarrat
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * It validates xml string as script array.
 * @param data The data to be parsed.
 * @returns Returns an script array.
 */
function validateXmlAsScriptArray(data: string): ScriptArray {
  
  // Initialize a new DOM Parser
  const parser = new DOMParser();

  // Parse xml
  const xmlDoc = parser.parseFromString(data, "text/xml");

  // Namespace
  const namespace = "http://schemas.mubarrat.com/scripts-loader/";

  // Mapping and return to main validator to validate
  return validateAsScriptArray([...xmlDoc.getElementsByTagNameNS(namespace, "script")].map(x => {

    // Returns
    return {

      // Define name
      name: x.getAttribute("name"),

      // Define sources
      sources: [...x.getElementsByTagNameNS(namespace, "source")].map(x => x.textContent),

      // Define dependencies
      dependencies: [...x.getElementsByTagNameNS(namespace, "dependency")].map(x => x.textContent)
    }
  }));
}

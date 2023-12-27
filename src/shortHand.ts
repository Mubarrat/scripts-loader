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
 * Define an shortname with objects.
 */
const $ls = Object.assign((data: string | {}[]) => {

  // Let's check data is a string or an object array
  if (typeof data !== "string" && !Array.isArray(data)) {

    // Throw an error
    throw new Error("`data` should be either string or an object array.");
  }

  // If data is an string
  if (typeof data === "string") {

    // Switch case
    switch (detectFormatXmlOrJson(data)) {

      // If an xml type
      case "xml":
        
        // Call Xml Helper Method
        $ls.xml(data);
        break;

      // If an json type
      case "json":
        
        // Call Json Helper Method
        $ls.json(data);
        break;

      // If anything else
      default:

        // Throw an error
        throw new Error("Unknown type");
    }
  }

  // Data is an array
  else {

    // Call the helper method
    $ls.document(data);
  }
}, {

  /**
   * An xml helper function.
   */
  xml: Object.assign((data: string) => {

    // If data isn't string
    if (typeof data !== "string") {

      // Throw an error
      throw new Error("data should be string");
    }

    // Load script
    $ls.xml.document(data);
  }, {

    /**
     * This is document injection rendering mode.
     * @param data The xml data.
     */
    document(data: string) {

      // If data isn't string
      if (typeof data !== "string") {

        // Throw an error
        throw new Error("data should be string");
      }

      // Load script
      loadScript(validateXmlAsScriptArray(data), "document");
    },

    /**
     * This is ajax loading rendering mode.
     * @param data The xml data.
     */
    ajax(data: string) {

      // If data isn't string
      if (typeof data !== "string") {

        // Throw an error
        throw new Error("data should be string");
      }

      // Load script
      loadScript(validateXmlAsScriptArray(data), "ajax");
    }
  }),

  /**
   * An json helper function
   */
  json: Object.assign((data: string) => {

    // If data isn't string
    if (typeof data !== "string") {

      // Throw an error
      throw new Error("data should be string");
    }

    // Load script
    $ls.json.document(data);
  }, {

    /**
     * This is document injection rendering mode.
     * @param data The json data.
     */
    document(data: string) {

      // If data isn't string
      if (typeof data !== "string") {

        // Throw an error
        throw new Error("data should be string");
      }

      // Load script
      loadScript(validateJsonAsScriptArray(data), "document");
    },

    /**
     * This is ajax loading rendering mode.
     * @param data The json data.
     */
    ajax(data: string) {

      // If data isn't string
      if (typeof data !== "string") {

        // Throw an error
        throw new Error("data should be string");
      }

      // Load script
      loadScript(validateJsonAsScriptArray(data), "ajax");
    }
  }),

  /**
   * This is document injection rendering mode.
   * @param data The script array.
   */
  document(data: {}[]) {

    // If data isn't string
    if (!Array.isArray(data)) {

      // Throw an error
      throw new Error("data should be string");
    }

    // Load script
    loadScript(validateAsScriptArray(data), "document");
  },

  /**
   * This is ajax loading rendering mode.
   * @param data The script array.
   */
  ajax(data: {}[]) {

    // If data isn't string
    if (!Array.isArray(data)) {

      // Throw an error
      throw new Error("data should be string");
    }

    // Load script
    loadScript(validateAsScriptArray(data), "ajax");
  },

  /**
   * Load from url
   * @param url The url where is data
   */
  url(url: string) {

    // Create a new request
    const xhr = new XMLHttpRequest;

    // Open the request
    xhr.open("GET", url);

    // Handle the request
    xhr.onreadystatechange = () => xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200 && $ls(xhr.responseText);

    // Send the request
    xhr.send();
  }
});

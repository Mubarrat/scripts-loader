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
    },

    /**
     * This is fetching rendering mode.
     * @param data The xml data.
     */
    fetch(data: string) {

      // If data isn't string
      if (typeof data !== "string") {

        // Throw an error
        throw new Error("data should be string");
      }

      // Load script
      loadScript(validateXmlAsScriptArray(data), "fetch");
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
    },

    /**
     * This is fetching rendering mode.
     * @param data The json data.
     */
    fetch(data: string) {

      // If data isn't string
      if (typeof data !== "string") {

        // Throw an error
        throw new Error("data should be string");
      }

      // Load script
      loadScript(validateJsonAsScriptArray(data), "fetch");
    }
  }),

  /**
   * This is document injection rendering mode.
   * @param data The script array.
   */
  document(data: string | {}[]) {

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
          $ls.xml.document(data);
          break;

        // If an json type
        case "json":
          
          // Call Json Helper Method
          $ls.json.document(data);
          break;

        // If anything else
        default:

          // Throw an error
          throw new Error("Unknown type");
      }
    }

    // Data is an array
    else {

      // Load script
      loadScript(validateAsScriptArray(data), "document");
    }
  },

  /**
   * This is ajax loading rendering mode.
   * @param data The script array.
   */
  ajax(data: string | {}[]) {

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
          $ls.xml.ajax(data);
          break;

        // If an json type
        case "json":
          
          // Call Json Helper Method
          $ls.json.ajax(data);
          break;

        // If anything else
        default:

          // Throw an error
          throw new Error("Unknown type");
      }
    }

    // Data is an array
    else {

      // Load script
      loadScript(validateAsScriptArray(data), "ajax");
    }
  },

  /**
   * This is fetching rendering mode.
   * @param data The script array.
   */
  fetch(data: string | {}[]) {

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
          $ls.xml.fetch(data);
          break;

        // If an json type
        case "json":
          
          // Call Json Helper Method
          $ls.json.fetch(data);
          break;

        // If anything else
        default:

          // Throw an error
          throw new Error("Unknown type");
      }
    }

    // Data is an array
    else {

      // Load script
      loadScript(validateAsScriptArray(data), "fetch");
    }
  },

  /**
   * Load from url
   * @param url The url where is data
   * @param mode The loading mode
   */
  url: Object.assign((url: string, mode: "ajax" | "fetch" = "fetch") => {

    // If url isn't striing
    if (typeof url !== "string") {

      // Let's throw an error
      throw new Error("url must be string");
    }

    // If mode is neither "ajax" nor "fetch"
    if (mode != "ajax" && mode != "fetch") {

      // Let's throw an error
      throw new Error(`mode must be either "ajax" or "fetch"`);
    }

    // Let's call helpers
    $ls.url.document(url, mode);
  }, {

    /**
     * This is document injection rendering mode from url.
     * @param url The url where is data
     * @param mode The loading mode
     */
    async document(url: string, mode: "ajax" | "fetch" = "fetch") {

      // Switch between cases
      switch (mode) {

        // If mode is ajax
        case "ajax":
  
          // Create a new request
          const xhr = new XMLHttpRequest;
  
          // Open the request
          xhr.open("GET", url);
  
          // Handle the request
          xhr.onreadystatechange = () => xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200 && $ls.document(xhr.responseText);
  
          // Send the request
          xhr.send();
          break;
  
        // If mode is fetch
        case "fetch":
            
          // Start fetching
          fetch(url)

            // Then read the text
            .then(response => {

              // Get the response by creating a fetch request
              return response.text();
            })

            // Then load the data
            .then(data => {

              // Execute
              return $ls.document(data);
            })
          break;
  
        // If mode is anything else
        default:
  
          // Let's throw an error
          throw new Error(`Loading mode can either be "ajax" or "fetch"`)
      }
    },

    /**
     * This is document injection rendering mode from url.
     * @param url The url where is data
     * @param mode The loading mode
     */
    async ajax(url: string, mode: "ajax" | "fetch" = "fetch") {

      // Switch between cases
      switch (mode) {

        // If mode is ajax
        case "ajax":
  
          // Create a new request
          const xhr = new XMLHttpRequest;
  
          // Open the request
          xhr.open("GET", url);
  
          // Handle the request
          xhr.onreadystatechange = () => xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200 && $ls.ajax(xhr.responseText);
  
          // Send the request
          xhr.send();
          break;
  
        // If mode is fetch
        case "fetch":
            
          // Start fetching
          fetch(url)

            // Then read the text
            .then(response => {

              // Get the response by creating a fetch request
              return response.text();
            })

            // Then load the data
            .then(data => {

              // Execute
              return $ls.ajax(data);
            })
          break;
  
        // If mode is anything else
        default:
  
          // Let's throw an error
          throw new Error(`Loading mode can either be "ajax" or "fetch"`)
      }
    },

    /**
     * This is document injection rendering mode from url.
     * @param url The url where is data
     * @param mode The loading mode
     */
    fetch(url: string, mode: "ajax" | "fetch" = "fetch") {

      // Switch between cases
      switch (mode) {

        // If mode is ajax
        case "ajax":
  
          // Create a new request
          const xhr = new XMLHttpRequest;
  
          // Open the request
          xhr.open("GET", url);
  
          // Handle the request
          xhr.onreadystatechange = () => xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200 && $ls.fetch(xhr.responseText);
  
          // Send the request
          xhr.send();
          break;
  
        // If mode is fetch
        case "fetch":
            
          // Start fetching
          fetch(url)

            // Then read the text
            .then(response => {

              // Get the response by creating a fetch request
              return response.text();
            })

            // Then load the data
            .then(data => {

              // Execute
              return $ls.fetch(data);
            })
          break;
  
        // If mode is anything else
        default:
  
          // Let's throw an error
          throw new Error(`Loading mode can either be "ajax" or "fetch"`)
      }
    }
  })
});

/*
The following code section defines a utility named $ls, facilitating the
handling of both strings and arrays of objects. This utility employs a
structure that accommodates multiple data formats, such as XML and JSON, and
their respective rendering modes: document injection, AJAX loading, and
fetching.

The initial function checks whether the input is a string or an array of
objects. If it's a string, it's further processed based on its format: XML or
JSON. Subsequently, corresponding methods (xml or json) are invoked based on
the detected format. If the input is an array of objects, it calls the
'document' method.

The 'xml' and 'json' methods within this utility serve as helpers. They contain
three rendering modes: document injection, AJAX loading, and fetching. Each
rendering mode checks for the data type, performs necessary validations, and
then proceeds to load the script accordingly.

Additionally, the utility provides three methods - document, ajax, and fetch -
to process script arrays. These methods check the input type, detect the format
(XML or JSON), and handle the loading of the script accordingly.

There's also a 'url' method that accepts a URL and a loading mode ('ajax' or
'fetch'). This method, in turn, employs the corresponding loading method to
fetch data from the URL and subsequently call the relevant processing method
('document', 'ajax', or 'fetch') based on the obtained data type and mode.

Despite the current implementation appearing extensive, it has been consciously
designed to provide comprehensive support for multiple data formats and various
loading modes. The verbosity of the code is intended to ensure readability,
maintainability, and comprehensive handling of different data types and loading
scenarios.

What if this short hand didn't ever be made?
*/

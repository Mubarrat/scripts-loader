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
const $ls = Object.assign((data: string) => $ls[detectFormatXmlOrJson(data)](data), {

  // Define xml with default is document
  xml: Object.assign((data: string) => $ls.xml.document(data), {

    // Define document function.
    document(data: string) { loadScript(validateXmlAsScriptArray(data), "document") },

    // Define ajax function; shouldn't be used.
    ajax(data: string) { loadScript(validateXmlAsScriptArray(data), "ajax") }
  }),

  // Define json
  json: Object.assign((data: string) => $ls.xml.document(data), {

    // Define document function.
    document(data: string) { loadScript(validateJsonAsScriptArray(data), "document") },

    // Define ajax function; shouldn't be used.
    ajax(data: string) { loadScript(validateJsonAsScriptArray(data), "ajax") }
  }),

  // Define an empty case
  ""() { throw new Error("Unknown type") }
});

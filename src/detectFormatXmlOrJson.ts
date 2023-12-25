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
 * An simple implementation that the data is xml or json.
 * @param data The data to be checked.
 * @returns If data is in xml, "xml". Or if data is in json, "json". Or a empty string will be returned.
 */
function detectFormatXmlOrJson(data: string): "xml" | "json" | "" {

  // Case the first char
  switch (data.trim().charAt(0)) {

    // If starts with `<`
    case '<':

      // Surround with try/catch
      try {

        // If xml, try parsing with DOM parser
        new DOMParser().parseFromString(data, "text/xml");

        // Return xml data type and parsing successful
        return "xml";
      }

      // This is not clearly xml, since exception thrown
      catch {

        // Return empty string
        return "";
      }

    // If starts with `{` or `[`
    case '{':
    case '}':

      // Surround with try/catch
      try {

        // If json, try parsing
        JSON.parse(data);

        // Return json data type, parse successful
        return "json";
      }
      
      // This is not clearly json, since exception thrown
      catch {

        // Return empty string
        return "";
      }

    // If anything else
    default:

      // Return empty string
      return "";
  }
}
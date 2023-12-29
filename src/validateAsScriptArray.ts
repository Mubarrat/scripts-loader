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
 * This method returns the validated script array.
 * @param data The script array to be validated.
 * @returns Returns the validated script array.
 */
function validateAsScriptArray(data: {}[]): ScriptArray {

  // Check if the root element is an array
  if (!Array.isArray(data)) {

    // Throw an error because it's not
    throw new Error('Root element should be an array');
  }

  // Check each item in the array
  return new ScriptArray(...data.map(item => {

    // Check if each item is an object
    if (typeof item !== 'object' || Array.isArray(item)) {

      // Throw an error because it's not
      throw new Error('Items should be objects');
    }

    // Number of attributes
    const numAttributes = Object.keys(item).length;

    // Check if number of attributes is from 1 to 3.
    if (numAttributes < 1 || numAttributes > 3) {

      // Throw an error because it's not
      throw new Error('Items should have from 1 to 3 attributes');
    }

    // Define and out
    const { name, source, sources, dependency, dependencies } = item as any;

    // Check for required attributes
    if (!source && !sources) {

      // Throw an error
      throw new Error('Attributes source(s) are required');
    }

    // Check if `source` and `sources` both are defined
    if (source && sources) {

      // Throw an error
      throw new Error('source and sources both are defined');
    }

    // Return script object with assigned properties
    return Object.assign(new ScriptObject, {

      // Return name
      name: name || "",

      // Return sources
      sources: sources || (source ? [source] : []),

      // Return additional dependencies
      dependencies: dependencies || (dependency ? [dependency] : [])
    });
  }));
}

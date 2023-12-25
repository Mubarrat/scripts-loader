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
 * The script array class
 */
class ScriptArray extends Array<ScriptObject> {

  /**
   * The constructor of this script array.
   * @param array The array of this class.
   */
  constructor(...array: ScriptObject[]) {

    // Check if `array` isn't an array
    if (!Array.isArray(array)) {

      // Throw an error because it's not
      throw new Error("`array` isn't array");
    }

    // Check if items of `array` isn't ScriptObject
    if (!array.every(x => x instanceof ScriptObject)) {

      // Throw an error because it's not
      throw new Error("Every item of `array` isn't an instance of ScriptObject");
    }
    
    // Assign array to this
    super(...array);
  }

  /**
   * Adds an script object.
   * @param scriptObject The script object to be added.
   * @returns Return the number of adding.
   */
  add(scriptObject: ScriptObject): number {

    // Return the number
    return this.push(scriptObject);
  }

  /**
   * Get all names.
   */
  get names(): string[] {

    // Return by mapping to the name
    return this.map(s => s.name);
  }
}

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
 * An function that loads script.
 * @param data The script array where scripts will be loaded.
 * @param renderer The renderer type can either be "document" or "ajax" or "fetch"
 */
function loadScript(data: ScriptArray, renderer: "document" | "ajax" | "fetch") {
  
  // Switch the cases and set promises
  switch (renderer) {
    
    // If renderer mode is document
    case "document":

      // Iterate item of given Script Array
      for (const item of data) {

        // Check id sources length is zero
        if (item.sources.length === 0) {

          // Skip if no sources provided
          continue;
        }
        
        // It has Additonal dependencies.
        if (item.dependencies.length > 0) {

          // Flatten the array.
          const promises = new Array<Promise<void>>().concat(...item.dependencies.map(dependencyName => {

            // Find the script object with the given dependency name
            const dependentScript = data.find(script => script.name === dependencyName);

            // If dependentScript, return it's promises or tell promise to resolve it.
            return dependentScript ? dependentScript.promises : Promise.resolve();
          }));

          // Merge the existing promises with the promises from dependencies
          // Do the promise all to load this script
          Promise.all(item.promises = item.promises.concat(...promises))

            // Succeed or rejected
            .then(_ => loadScriptFromSource([...item.sources]), console.error)
        }
        
        // It has no dependencies
        else {

          // Use triple dots so that original source doesn't get replaced.
          item.promises = item.promises.concat(loadScriptFromSource([...item.sources]));
        }
      }
      break;
      
    // If renderer mode is ajax
    case "ajax":

      // Iterate item of given Script Array
      for (const item of data) {

        // Check id sources length is zero
        if (item.sources.length === 0) {

          // Skip if no sources provided
          continue;
        }
        
        // It has Additonal dependencies.
        if (item.dependencies.length > 0) {

          // Flatten the array.
          const promises = new Array<Promise<void>>().concat(...item.dependencies.map(dependencyName => {

            // Find the script object with the given dependency name
            const dependentScript = data.find(script => script.name === dependencyName);

            // If dependentScript, return it's promises or tell promise to resolve it.
            return dependentScript ? dependentScript.promises : Promise.resolve();
          }));

          // Merge the existing promises with the promises from dependencies
          // Do the promise all to load this script
          Promise.all(item.promises = item.promises.concat(...promises))

            // Succeed or rejected
            .then(_ => loadScriptFromAjax([...item.sources]), console.error)
        }
        
        // It has no dependencies
        else {

          // Use triple dots so that original source doesn't get replaced.
          item.promises = item.promises.concat(loadScriptFromAjax([...item.sources]));
        }
      }
      break;
      
      // If renderer mode is fetch
      case "fetch":
  
        // Iterate item of given Script Array
        for (const item of data) {
  
          // Check id sources length is zero
          if (item.sources.length === 0) {
  
            // Skip if no sources provided
            continue;
          }
          
          // It has Additonal dependencies.
          if (item.dependencies.length > 0) {
  
            // Flatten the array.
            const promises = new Array<Promise<void>>().concat(...item.dependencies.map(dependencyName => {
  
              // Find the script object with the given dependency name
              const dependentScript = data.find(script => script.name === dependencyName);
  
              // If dependentScript, return it's promises or tell promise to resolve it.
              return dependentScript ? dependentScript.promises : Promise.resolve();
            }));
  
            // Merge the existing promises with the promises from dependencies
            // Do the promise all to load this script
            Promise.all(item.promises = item.promises.concat(...promises))
  
              // Succeed or rejected
              .then(_ => loadScriptFromFetch([...item.sources]), console.error)
          }
          
          // It has no dependencies
          else {
  
            // Use triple dots so that original source doesn't get replaced.
            item.promises = item.promises.concat(loadScriptFromFetch([...item.sources]));
          }
        }
        break;

    // The renderer mode is unknown
    default:

      // Throw an error
      throw new Error('`renderer` is either be "document" or "ajax" or "fetch"');
  }

  // An inner method - for renderer mode is document
  function loadScriptFromSource(sources: string[]): Promise<void> {

    // Return new promise
    return new Promise((resolve, reject) => {

      // Reject if all sources failed
      if (sources.length === 0) {

        reject('All sources failed.');
        return;
      }

      // Create a new script element
      const scriptE = document.createElement("script");

      // Set the type
      scriptE.type = 'text/javascript';

      // Set the source, shifting has no chance of unknown
      scriptE.src = sources.shift() as string;

      // Since loaded, resolve it
      scriptE.onload = () => resolve();

      // Since error, try loading fallback sources
      scriptE.onerror = () => loadScriptFromSource(sources).then(resolve, reject);

      // Append to the child of head
      document.head.appendChild(scriptE);
    });
  }

  // Second inner method - for renderer mode is ajax
  function loadScriptFromAjax(sources: string[]): Promise<void> {

    // Return new promise
    return new Promise((resolve, reject) => {

      // Reject if all sources failed
      if (sources.length === 0) {

        reject('All sources failed.');
        return;
      }

      // Create a new xml http request
      const xhr = new XMLHttpRequest();

      // Open the request
      xhr.open('GET', sources.shift() as string);

      // Done
      xhr.onreadystatechange = function () {

        // If request is done
        if (xhr.readyState === XMLHttpRequest.DONE) {

          // If xhr status is 200
          if (xhr.status === 200) {

            // Don't surrounding because our methods are correct and error happens in their js file

            // Create a function and load the js
            new Function(xhr.responseText)();

            // Resolved
            resolve();
          }
          
          // Not ok - 200
          else {

            // Try loading fallbacks
            loadScriptFromSource(sources).then(resolve, reject);
          }
        }
      };

      // Send the request
      xhr.send();
    });
  }

  // Third inner method - for renderer mode is fetch
  function loadScriptFromFetch(sources: string[]): Promise<void> {

    // Return new promise
    return new Promise((resolve, reject) => {

      // Reject if all sources failed
      if (sources.length === 0) {

        reject('All sources failed.');
        return;
      }

      fetch(sources.shift() as string)

        // Succeeded
        .then(resp => {

          // Open the request and get by starting fetching
          resp.text().then(data => {

            // Surround with try/catch 
            try {

              // Create a function and load the JavaScript
              new Function(data)();
            }

            // Our functions are ok. The problem is in the source.
            catch (ex) {

              // Let's log the error
              console.error(ex);
            }

            // Resolved
            resolve();
          });
        })
        
        // Error occurred
        .catch(_ => {

          // Try loading fallbacks
          loadScriptFromSource(sources).then(resolve, reject);
        });
    });
  }
}

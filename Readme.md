# Scripts Loader

## Overview

The Scripts Loader is a lightweight and adaptable script loader library crafted specifically to dynamically load JavaScript files within web applications. Its versatile nature simplifies script management, adeptly handles dependencies, and ensures the seamless integration of external scripts. With its flexible loading strategies, it provides a reliable solution for effortlessly managing script loading complexities, empowering developers to streamline their web application development process.

> [!NOTE]
> While the library supports TypeScript during development, the released version exclusively includes JavaScript files and a map file. This deliberate choice ensures ease of use without any additional dependencies or frameworks.

## Purpose

Ever experienced the frustration of repeatedly pressing <kbd>Ctrl</kbd> + <kbd>F5</kbd> on a website, only to have certain JavaScript files stubbornly refuse to load? The Scripts Loader serves as a steadfast solution to this common issue encountered during script loading via HTML. The challenge often arises from the disparate nature of JavaScript files—while some stand independently, others rely on additional files for proper execution. This disparity in dependencies leads to erratic behavior, causing script failures that disrupt the entire functionality of a web application. Our library confronts these challenges directly, promising seamless and dependable script loading without the headache of missing dependencies.

With seamless support for both JSON and XML syntaxes, integrating and utilizing this library is a breeze. Its intuitive design empowers developers to effortlessly manage and load scripts, simplifying even the most complex dependencies. Bid farewell to wrestling with intricate script loading processes—the Scripts Loader streamlines integration, providing a dependable and streamlined solution.

### Why No CSS Support?

You might wonder why CSS support isn't included in this library. Unlike JavaScript files that often demand precise handling for dependencies, CSS files, being dynamically loaded, tend to be more self-contained. Typically, CSS files don't heavily rely on external dependencies for their functionality; they can often resolve themselves even if additional dependencies aren't explicitly specified.

By focusing specifically on JavaScript loading and dependency management, we've tailored our library to confront the critical challenges associated with script loading, while ensuring simplicity and effectiveness in handling intricate JavaScript dependencies.

## Installation
### Download
Get our latest [release files](https://github.com/Mubarrat/scripts-loader/releases) directly from this GitHub repository.

#### Contents
Upon download and extraction, you'll find a structure resembling this:
```
scripts-loader
├── scripts-loader.js
├── scripts-loader.js.map
└── scripts-loader.min.js
```

### Link
For direct access:
```
https://cdn.jsdelivr.net/gh/Mubarrat/scripts-loader@1.x/dist/scripts-loader.js
```
For the minimized version:
```
https://cdn.jsdelivr.net/gh/Mubarrat/scripts-loader@1.x/dist/scripts-loader.min.js
```

### For npm Installation
Visit our [package page](https://github.com/Mubarrat/scripts-loader/pkgs/npm/scripts-loader).

## Guides

Dive into our comprehensive guides and documentation available in our [Wiki](https://github.com/Mubarrat/scripts-loader/wiki) for detailed instructions and essential resources:

- **Installation Guide**: Seamless steps to integrate the Scripts Loader into your project.
- **Usage Examples**: Practical demonstrations featuring various implementation scenarios.
- **API Documentation**: Detailed insights into available APIs, parameters, and usage guidelines.
- **Troubleshooting**: Solutions to common issues, error handling, and FAQs for a smoother development journey.

Explore our [Wiki](https://github.com/Mubarrat/scripts-loader/wiki) to supercharge your coding experience with the Scripts Loader!

## Schemas for IDE Use

For developers operating within Integrated Development Environments (IDEs), these schemas offer structured formats to enhance the editing experience:

1. [JSON Schema](https://cdn.jsdelivr.net/gh/Mubarrat/scripts-loader@1.x/schema.json)
   - JSON format schema for validation and code hinting in compatible IDEs.

2. [XSD Schema](https://cdn.jsdelivr.net/gh/Mubarrat/scripts-loader@1.x/schema.xsd)
   - XSD format schema aiding XML-based editing environments, facilitating validation and autocomplete functionalities.

These schemas prove invaluable, ensuring script compatibility, validating configurations, and enhancing the overall development process within supported IDEs.

## Contributing

We enthusiastically welcome contributions to enrich the Scripts Loader library. Whether it's fixing a bug, implementing new features, or improving documentation, your efforts are immensely appreciated. To contribute, follow these guidelines:

### Bug Reports and Feature Requests

If you encounter a bug or have a feature request, check our [issue tracker](https://github.com/Mubarrat/scripts-loader/issues) to see if it's already reported. If not, feel free to open a new issue. When reporting a bug, include:

- A clear and descriptive title
- Steps to reproduce the bug
- Expected behavior versus observed behavior
- Any relevant code snippets, error messages, or screenshots

For feature requests, outline the proposed feature's functionality and potential benefits.

### Pull Requests

We encourage pull requests for bug fixes, documentation improvements, or new features. Follow these steps:

1. Fork the repository and create a new branch from the `main` branch.
2. Implement your changes, ensuring they align with our coding standards and practices.
3. Write clear commit messages that describe the changes made.
4. Thoroughly test your changes.
5. Submit a pull request (PR) and provide a detailed description:
   - Explain the problem solved or the feature added.
   - Reference related issues, if any.

### Code Contribution Guidelines

- Maintain consistent coding styles in line with the repository's standards.
- Use descriptive comments where necessary to enhance clarity.
- Ensure that your code changes don't introduce new issues or break existing functionality.
- Update documentation if your changes impact it.

### Code of Conduct

Adhere to our [Code of Conduct](Code_oF_Conduct.md) in all project-related interactions.

### Seeking Assistance

For help or clarification on contributing, feel free to reach out by [creating an issue](https://github.com/Mubarrat/scripts-loader/issues).

Thank you for considering contributing to the Scripts Loader library!

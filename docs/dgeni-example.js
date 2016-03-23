// Canonical path provides a consistent path (i.e. always forward slashes) across different OSes
var path = require('canonical-path');

var Package = require('dgeni').Package;

// Create and export a new Dgeni package called dgeni-example. This package depends upon
// the jsdoc and nunjucks packages defined in the dgeni-packages npm module.
module.exports = new Package('dgeni-example', [
  require('dgeni-packages/nunjucks'),
  require('dgeni-packages/typescript')
])
// this is required because the parsing-tags pseudo marker processor is defined in jsdoc package which is not referenced here.
  .processor({ name: 'parsing-tags', $runAfter: ['files-read'], $runBefore: ['processing-docs'] })

// Configure our dgeni-example package. We can ask the Dgeni dependency injector
// to provide us with access to services and processors that we wish to configure
  .config(function (log,
    readFilesProcessor,
    readTypeScriptModules,
    templateFinder,
    writeFilesProcessor) {

    // Set logging level
    log.level = 'silly'
    
    readFilesProcessor.sourceFiles = ["xxxxxx"];
    readFilesProcessor.basePath = ".";
    readFilesProcessor.fileReaders = [{name: "xx", getDocs: function() {}, defaultPattern: /xxxxxx/}];

    // Specify the base path used when resolving relative paths to source and output files
    readTypeScriptModules.basePath = path.resolve(__dirname, '..');

    // Specify collections of source files that should contain the documentation to extract
    readTypeScriptModules.sourceFiles = [
      {
        // Process all ts files in `src` and its subfolders ...
        include: 'src/**/*.ts',
        // ... except for this one!
        exclude: 'src/**/node_modules/**/*',
        // When calculating the relative path to these files use this as the base path.
        // So `src/foo/bar.ts` will have relative path of `foo/bar.ts`
        basePath: 'src'
      }
    ];

    // Add a folder to search for our own templates to use when rendering docs
    templateFinder.templateFolders.unshift(path.resolve(__dirname, 'templates'));

    // Specify how to match docs to templates.
    // In this case we just use the same static template for all docs
    templateFinder.templatePatterns.unshift('common.template.html');

    // Specify where the writeFilesProcessor will write our generated doc files
    writeFilesProcessor.outputFolder = 'build';
  });
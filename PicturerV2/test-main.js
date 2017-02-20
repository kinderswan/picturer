var allTestFiles = []
var TEST_REGEXP = /(spec|test)\.js$/i

// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function(file) {
    if (TEST_REGEXP.test(file)) {
        // Normalize paths to RequireJS module names.
        // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
        // then do not normalize the paths
        var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
        allTestFiles.push(normalizedTestModule);
    }
})

require.config({
    // Karma serves files under /base, which is the basePath from your config file
    baseUrl: '/base',

    "paths": {
        "backbone": "libs/backbone",
        "bridget": "libs/jquery-bridget",
        "imagesLoaded": "libs/imagesloaded.pkgd",
        "jquery": "libs/jquery",
        "json": "libs/json",
        "masonry": "libs/masonry",
        "simplemodal": "libs/jquery.simplemodal.1.4.4.min",
        "text": "libs/text",
        "underscore": "libs/underscore",
        "pictures": "js/pictures",
        "shared": "js/shared"
    },
    "shim": {
        "backbone": {
            "deps": [
                "underscore",
                "jquery"
            ],
            "exports": "Backbone"
        },
        "imagesLoaded": {
            "deps": ["jquery"],
            "exports": "imagesLoaded"
        },
        "masonry": {
            "deps": ["jquery"],
            "exports": "masonry"
        },
        "simplemodal": {
            "deps": ["jquery"],
            "exports": "modal"
        },
        "underscore": { "exports": "_" }
    },

    // dynamically load all test files
    deps: allTestFiles,

    // we have to kickoff jasmine, as it is asynchronous
    callback: window.__karma__.start
})
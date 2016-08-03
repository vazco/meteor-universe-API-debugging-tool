Package.describe({
    name: 'universe:api-debugger',
    summary: 'Debugging tool for API.',
    version: '1.0.0',
    readme: 'README.md'
});

Npm.depends({
    lodash: '4.4.0'
});

Package.onUse(function (api) {
    api.versionsFrom('1.3.2.3');

    api.use([
        'modules',
        'ecmascript'
    ]);

    api.mainModule('./index.js', 'server');
});

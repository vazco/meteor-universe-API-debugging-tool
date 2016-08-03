Universe API debugging tool logs any content you want to file, which you can later easily inspect.

This package is perfect when you need to debug REST, SOAP or any other kind of API calls. This package creates in your operating system's temp directory new folder named by default 'universe_api_debugger' (you can change that), and inside this folder its creating new files with nicely formatted content.

Remember that you can use it to debug any kind of behaviour of your application and save its results to file, it doesn't necessarily have to be API calls!

How to use it?

import {DebuggingTool} from 'meteor/universe:api-debugging-tool';

Debugger API:

1. DebuggingTool.initReportCreation('this text goes to file', '.file-extension', 'file-name');

This method is responsible for generating new file inside your api debugger folder

2. DebuggingTool.apiGetResponseText([Any]);

This method accepts array as argument and is responsible for pretty formatting each item inside this array and
returns result as one big string. This method works perfectly with array of javascript objects.

3. DebuggingTool.deleteFilesFromFolder({filesToDelOrOmit: [String], isDeleteAll: Boolean});

This method is responsible for deleting files inside your debugging folder. You can use it two ways:

if isDeleteAll === true then filesToDelOrOmit is array of files names which you don't want to delete

if isDeleteAll === false then filesToDelOrOmit is array of files names which you WANT to delete

EXAMPLE USAGE:

DebuggingTool.deleteFilesFromFolder({
    filesToDelOrOmit: [],
    isDeleteAll: true
});

DebuggingTool.initReportCreation(
    DebuggingTool.apiGetResponseText(apiResponseArray),
    '.txt',
    'apiResponseFileName'
);

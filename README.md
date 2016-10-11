<a href="http://unicms.io"><img src="http://unicms.io/banners/standalone.png" /></a>

# Universe API debugger

Universe API debugger logs any content you want to file, which you can later easily inspect.

This package is perfect when you need to debug REST, SOAP or any other kind of API calls. This package creates in your operating system's temp directory new folder named by default 'universe_api_debugger' (you can change that), and inside this folder its creating new files with nicely formatted content.

Remember that you can use it to debug any kind of behaviour of your application and save its results to file, it doesn't necessarily have to be API calls!

### How to import it?

```js
import {DebuggingTool} from 'meteor/universe:api-debugger';
```

### Debugger API

```js
DebuggingTool.initReportCreation('this text goes to file', '.file-extension', 'file-name');
```

This method is responsible for generating new file inside your api debugger folder

```js
DebuggingTool.apiGetResponseText([Any]);
```

This method accepts array as argument and is responsible for pretty formatting each item inside this array and
returns result as one big string. This method works perfectly with array of javascript objects.

```js
DebuggingTool.deleteFilesFromFolder({filesToDelOrOmit: [String], isDeleteAll: Boolean});
```

This method is responsible for deleting files inside your debugging folder. You can use it two ways:
if isDeleteAll === true then filesToDelOrOmit is array of files names which you don't want to delete
if isDeleteAll === false then filesToDelOrOmit is array of files names which you WANT to delete

### Example usage:

```js
DebuggingTool.deleteFilesFromFolder({
    filesToDelOrOmit: [],
    isDeleteAll: true
});

DebuggingTool.initReportCreation(
    DebuggingTool.apiGetResponseText(apiResponseArray),
    '.txt',
    'apiResponseFileName'
);
```
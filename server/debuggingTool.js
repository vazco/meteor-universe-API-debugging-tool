import {Meteor} from 'meteor/meteor';
import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import os from 'os';


const API_INVESTIGATOR_PATH = path.resolve(
    os.tmpdir(),
    _.get(Meteor.settings.public, 'apiInvestigatorFolderName', 'universe_api_debugger')
);

export const DebuggingTool = {
    deleteFilesFromFolder: function ({filesToDelOrOmit = [], isDeleteAll = false}) {
        if (!fs.existsSync(API_INVESTIGATOR_PATH)) {
            return;
        }
        var i, listOfFiles = fs.readdirSync(API_INVESTIGATOR_PATH);
        filesToDelOrOmit = filesToDelOrOmit || [];

        if (isDeleteAll) {
            for (i = 0; i < listOfFiles.length; i++) {
                if (!_.contains(filesToDelOrOmit, listOfFiles[i])) {
                    fs.unlinkSync(path.join(API_INVESTIGATOR_PATH, listOfFiles[i]));
                }
            }
        } else {
            for (i = 0; i < filesToDelOrOmit.length; i++) {
                fs.unlinkSync(path.join(API_INVESTIGATOR_PATH + filesToDelOrOmit[i]));
            }
        }
    },
    initReportCreation: function (textToSave, fileExtension, fileName) {
        var highestFileNumber = 0, filePath, nextFileNumber;
        if (fs.existsSync(API_INVESTIGATOR_PATH)) {
            highestFileNumber = this._getHighestNumber(fs.readdirSync(API_INVESTIGATOR_PATH));
        }
        nextFileNumber = ++highestFileNumber;
        filePath = this._createFile(nextFileNumber, fileExtension, fileName);
        const handle = fs.openSync(filePath, 'w');
        fs.writeFile(filePath, textToSave, {flag: 'w', encoding: 'utf8'},
            function (err) {
                if (err) {
                    console.log('debugging_tool.js:37 - err', err);
                } else {
                    console.log('SUCCESS: Report file ' + filePath + ' created');
                }
                fs.closeSync(handle);
            }
        );
    },
    apiGetResponseText: function (args) {
        // this method accepts all arguments of procedure callback as array
        if (!args) {
            return '';
        }
        return Array.prototype.map.call(args, (item, i) => {
            return `<<<<<PARAMETER ${i}>>>>>\n\n${JSON.stringify(item, null, 5)}\n\n`;
        }) || '';
    },
    _createFile: function (fileNumber, fileExtension = '.txt', fileName = 'soap_rpc') {
        if (!fs.existsSync(API_INVESTIGATOR_PATH)) {
            fs.mkdirSync(API_INVESTIGATOR_PATH);
        }
        return path.join(API_INVESTIGATOR_PATH, fileName + fileNumber + fileExtension);
    },
    _getHighestNumber: function (listOfFiles) {
        var listOfFilesNumbers = [];
        if (listOfFiles.length && this._checkIfAnyFileHasNumberInName(listOfFiles)) {

            listOfFiles.forEach(function (fileName) {
                var matchNumber = fileName.match(/\d+/);
                if (matchNumber) {
                    listOfFilesNumbers.push(parseInt(matchNumber));
                }
            });

            return listOfFilesNumbers.sort(this._sortNumber)[listOfFilesNumbers.length - 1];
        }

        return 0;
    },
    _checkIfAnyFileHasNumberInName: function (listOfFiles) {
        var i;

        for (i = 0; i < listOfFiles.length; i++) {
            if (listOfFiles[i].match(/\d+/)) {
                return true;
            }
        }

        return false;
    },
    _sortNumber: function (a,b) {
        return a - b;
    }
};

export default DebuggingTool;

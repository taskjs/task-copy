var Execution = require('execution');
var path = require('path');
var file = require('./file');

module.exports = Execution.extend({
    // The type of option could be HTML5 input types: file, directory, number, range, select,
    // url, email, tel, color, date, time, month, time, week, datetime(datetime-local),
    // string(text), boolean(checkbox), array, regexp, function and object.
    options: {
        dest: {
            label: 'Dest',
            type: 'string',
            placeholder: 'file or directory'
        },
        recursive: {
            label: 'Recursively directories',
            default: true,
            type: 'boolean'
        },
        force: {
            label: 'Overwrite existing files',
            default: true,
            type: 'boolean'
        },
        backup: {
            label: 'Backup overwrited files',
            default: true,
            type: 'boolean',
            placeholder: 'make a backup of each existing destination file'
        },
        flatten: {
            label: 'Ignore source directory structure',
            type: 'boolean',
            default: false,
            placeholder: 'ignore source directory structure'
        },
        update: {
            label: 'Overwrite older files',
            type: 'boolean',
            default: false,
            placeholder: 'copy only when the SOURCE file is newer than the destination file or when the destination file is missing'
        },
        parents: {
            label: 'Copy full path'
            default: false,
            type: 'boolean',
            placeholder: 'full path to be copied to the destination directory'
        },
        verbose: {
            label: 'Log copied',
            type: 'boolean',
            default: true,
            placeholder: 'log file/directory names after they are copied'
        }
    },
    run: function (inputs, options, logger) {
        if (typeof options === 'string') {
            options = {dest: options};
        }
        return this._run(inputs, options, logger);
    },
    execute: function (resolve, reject) {
        var options = this.options;
        var inputs = this.inputs;
        var logger = this.logger;

        var dest = options.dest;
        var verbose = options.verbose;
        var parents = options.parents;

        if (!dest) {
            throw new Error('Copy task dest is null');
        }

        inputs.forEach(function (input) {
            var filepath = input.path || input;
            // eg. source/path/file.js -> dest/path => dest/path/source/path/file.js
            if (parents) {
                if (!file.isDir(dest)) {
                    throw new Error('With parents options, the copy destination "' + dest + '" must be a directory')
                }
                dest = path.join(dest, filepath);
            }

            var target = dest;

            if (file.isFile(filepath) && file.isDir(dest)) {
                var filename = file.basename(filepath);
                target = path.join(dest, filename);
            }

            file.copy(filepath, target, options);

            if (verbose) {
                logger.log('Copy', filepath, '>', target);
            }
        });

        resolve(inputs);
    }
})

# task-copy
> Copy files and folders.

## The "copy" task

### Usage Examples

```js
var copy = new (require('task-copy'))
copy.run(inputs, options, logger)
```

### Options

#### options.dest
Type: `string`

Dest file or directory.

#### options.recursive
Type: `boolean`
Default: `true`

Recursively copy directories.

#### options.force
Type: `boolean`
Default: `true`

Recursively copy directories.

#### options.backup
Type: `boolean`
Default: `true`

Recursively copy directories.

#### options.flatten
Type: `boolean`
Default: `false`

Ignore source directory structure.

#### options.update
Type: `boolean`
Default: `false`

Copy only when the SOURCE file is newer than the destination file or when the destination file is missing.

#### options.parents
Type: `boolean`
Default: `false`

Full path to be copied to the destination directory.

#### options.verbose
Type: `boolean`
Default: `true`

Log file/directory names after they are copied.

## Release History
* 2014-04-09    0.1.0    Initial release.

## License
Copyright (c) 2014 Yuanyan Cao. Licensed under the MIT license.

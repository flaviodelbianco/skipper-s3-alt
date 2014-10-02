Skipper S3 Alternative
======================

Skipper S3 Alternative is a filesystem adapter which enables Skipper to stream file uploads directly to Amazon S3.

## Installation

`npm install skipper-s3-alt`

## Usage

```js
req.file('avatar').upload({
    adapter: require('skipper-s3-alt'),
    key: 'YOUR_S3_API_KEY',
    secret: 'YOUR_S3_API_SECRET',
    bucket: 'YOUR_S3_BUCKET'
}, function (err, uploadedFiles) {
    // ...
});
```

It exposes the following adapter-specific options:

 Option     | Type                             | Description
 ---------- | -------------------------------- | --------------
 key        | ((string))                       | Your AWS "Access Key ID", e.g. `"BZIZIZFFHXR27BFUOZ7"` (_required_)
 secret     | ((string))                       | Your AWS "Secret Access Key", e.g. `"L8ZN3aP1B9qkUgggUnEZ6KzrQJbJxx4EMjNaWy3n"` (_required_)
 bucket     | ((string))                       | The bucket to upload your files into, e.g. `"my_cool_file_uploads"` (_required_)
 region     | ((string))                       | The S3 region where the bucket is located, e.g. `"us-west-2"`.
 fileACL    | ((string))                       | The permission of the file on S3: `private | public-read | public-read-write | authenticated-read | bucket-owner-read | bucket-owner-full-control` default is set to `public-read`.
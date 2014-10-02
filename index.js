/**
 * Module dependencies
 */

var extend = require('extend'),
    path = require('path'),
    AWS = require('aws-sdk'),
    mime = require('mime');

module.exports = function (options) {
    options = extend(true, {
        key: null,
        secret: null,
        region: null,
        bucket: null,
        maxBytes: null,
        fileACL: 'public-read'
    }, options);

    AWS.config.update({
        accessKeyId: options.key,
        secretAccessKey: options.secret,
        region: options.region
    });

    var s3 = new AWS.S3({ params: {Bucket: options.bucket}});

    var adapter = {

        read: function (fd, cb) {
            return cb(new Error('TODO'));
        },

        rm: function (fd, cb){
            return cb(new Error('TODO'));
        },

        ls: function (dirname, cb) {
            return cb(new Error('TODO'));
        },

        receive: function () {

            var receiver = require('stream').Writable({ objectMode: true });

            receiver._write = function (streamFile, encoding, done) {
                var fullBuffer = Buffer('');
                streamFile.on('data', function(buffer) {
                    fullBuffer = Buffer.concat([fullBuffer, buffer]);
                });
                streamFile.on('end', function(data) {
                    var params = {
                        Key: streamFile.fd,
                        ACL: options.fileACL,
                        Body: fullBuffer,
                        ContentType: mime.lookup(streamFile.fd)
                    };
                    s3.putObject(params, function(err, data) {
                        if (err) {
                            receiver__.emit('error', err);
                            return;
                        }

                        streamFile.extra = data;
                        done();
                    });
                });
            };

            return receiver;
        }
    };

    return adapter;
};
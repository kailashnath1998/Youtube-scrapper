
var fs = require('fs');
var youtubedl = require('youtube-dl');

function prompt(question, callback) {
    var stdin = process.stdin,
        stdout = process.stdout;

    stdin.resume();
    stdout.write(question);

    stdin.once('data', function (data) {
        callback(data.toString().trim());
    });
}
var input;

prompt('Enter Url: ', function (input) {
    var video = youtubedl(input.toString(),
      // Optional arguments passed to youtube-dl.
      ['--format=18'],
      // Additional options can be given for calling `child_process.execFile()`.
      { cwd: __dirname });

    // Will be called when the download starts.
    video.on('info', function(info) {
      console.log('Download started');
      var name = info.filename;
      console.log('filename: ' + name);
      console.log('size: ' + info.size);
      video.pipe(fs.createWriteStream(name.toString()+'.mp3'));
      /*console.log('exiting');
      process.exit();*/
    });
});

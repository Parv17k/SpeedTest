var str = '1';
    for (var dup = 0; dup < 20; dup++) {
        str += str;
    }
// Define a boundary
var boundary = "---------------------------7da24f2e50046";
var body = '--' + boundary + '\r\n'
// Parameter name is "file" and local filename is "temp.txt"
+ 'Content-Disposition: form-data; name="file";'
+ 'filename="temp.txt"\r\n'
// Add the file's mime-type
+ 'Content-type: plain/text\r\n\r\n'
// Add your data:
+ str + '\r\n'
+ '--' + boundary + '--';
var test = function() {
    var downloaded = 0,
        uploaded = 0;
    var downloadTimer, uploadTimer;
    var downSpeed = 0,
        upSpeed = 0;
    var lastDownTime = 0;
        lastUpTime = 0;
    $.ajax({
        xhr: function() {
                var xhr = new window.XMLHttpRequest();
                //Upload progress
                xhr.upload.addEventListener("progress", function(evt){
                    var endTime = (new Date()).getTime();
                    upSpeed = ((evt.loaded - uploaded) * 1000) / ((endTime - lastUpTime) * 1024);
                    //console.log('Up: ' + upSpeed);
                    $('#us').text((upSpeed*1000000).toFixed(3)+"Mbps");
                    uploaded = evt.loaded;
                    lastUpTime = endTime;
                }, false);
                //Download progress
                xhr.addEventListener("progress", function(evt){
                    var endTime = (new Date()).getTime();
                    downSpeed = ((evt.loaded - downloaded) * 1000) / ((endTime - lastDownTime) * 1024);
                    //console.log('down: ' + downSpeed);
                    $('#ds').text((downSpeed*100000000000).toFixed(3)+"Mbps");
                    downloaded = evt.loaded;
                    lastDownTime = endTime;
                }, false);
            return xhr;
        },
        contentType: "multipart/form-data; boundary=" + boundary,
        type: 'POST',
        url: "",
        data: body,
        success: function(data){
        //Do something success-ish
        }
    });
};

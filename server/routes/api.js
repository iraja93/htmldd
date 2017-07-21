const express = require('express');
var jsonfile = require('jsonfile')
var fs = require("fs");
var mkdirp = require('mkdirp');

var userHome = require('user-home');




var bodyParser = require('body-parser');

var router = express();
//var jsonParser = bodyParser.json({ limit: 1024 * 1024 * 20, type: 'application/json' });
//var urlencodedParser = bodyParser.urlencoded({ extended: true, limit: 1024 * 1024 * 20, type: 'application/x-www-form-urlencoding' })

//router.use(jsonParser);
//router.use(urlencodedParser);

var bodyParser = require('body-parser');
router.use(bodyParser({limit: '50mb'}));
router.use(bodyParser.urlencoded({limit: '50mb'}));
router.use(bodyParser());
router.get('/', (req, res) => {

    res.send('api works');
});

router.post('/saveProject',(req, res) => {
    
    console.log('ASazsaddda');
    console.log(userHome);

    var projectName=req.body.projectName;
    var projectLocation= userHome+'/AppBuilderWorks/'+projectName;
    var projectMetaDataLocation=userHome+'./AppBuilderWorks/';
    console.log(projectLocation);
    //fs.mkdirSync(projectLocation);
    if (!fs.existsSync(projectLocation)){
    fs.mkdirSync(projectLocation);
}
   
    var fileName = req.body.fName + ".json";
    var metaName = "metaInfo.json";
    var metafileForViewsName="metaInfoViews.json";
    var file = projectLocation+'/' + fileName;

    var metaInfoForProjects = projectMetaDataLocation + metaName;
    var metaInfoForViews= projectLocation+'/'+metafileForViewsName;

    var metaInfo = { name: projectName, date: Date.now() };
   

    if(!fs.existsSync(metaInfoForProjects))
        {
            var createMetaInfosStream = fs.createWriteStream("metaName");
            createMetaInfosStream.end();
            fs.writeFile(metaInfoForProjects, "[]");
        }

    if(!fs.existsSync(metaInfoForViews))
        {
            var createMetaInfosStream = fs.createWriteStream("metaName");
            createMetaInfosStream.end();
            fs.writeFile(metaInfoForViews, "[]");
        }


    if(!fs.existsSync(file))
        {
            jsonfile.readFile(metaInfoForViews, function (err, data) {
                var json = data;
                json.push(metaInfo)
                jsonfile.writeFile(metaInfoForViews, json)
            })
            var createStream = fs.createWriteStream("fileName");
            createStream.end();

        }

        if(!fs.existsSync(file))
        {
            jsonfile.readFile(metaInfoForProjects, function (err, data) {
                var json = data;
                json.push(metaInfo)
                jsonfile.writeFile(metaInfoForProjects, json)
            })
            var createStream = fs.createWriteStream("fileName");
            createStream.end();

        }
            
        jsonfile.writeFile(file, req.body.val, function (err) {

            if (err) {
                var obj = { msg: 'File Creation Failed' }
                console.log(err);
                res.send(obj);
            }

            console.log('File' + req.body.fName + ' Saved');
            var obj = { msg: 'File Saved Successfully' }
            res.send(obj);

        })


        
});




router.post('/openProject', (req, res) => {
    console.log("Open Project");
    console.log(req.body.fName);
    var fileName = req.body.fName + ".json";

    //var obj={msg:"File Opened"};

    var file = './' + fileName;
    jsonfile.readFile(file, function (err, obj) {

        if (err) {
            console.log(err);
            res.send(err);
        }
        //console.dir(obj)

        console.log("File Opened");

        res.send(obj);
    })




});




router.post('/saveSidebarJSON', bodyParser, (req, res) => {

    //console.log("Hell, Yeah I am alive.");

    var file = './assets/json/sideBar.json/sideBar.json';
    var obj = { msg: 'Files Saved' }
    console.log(req.body);
    jsonfile.writeFile(file, req.body, function (err) {

        if (err) {
            res.send("Failed to update");
        }

        console.log('File Updated')



    })

    res.send(obj);
});


router.get('/getAllProjects', (req, res) => {

    

    var metaName = "metaInfo.json";
    var file = './' + metaName;

    jsonfile.readFile(file, function (err, obj) {

        if (err) {
            console.log(err);
            res.send(err);
        }
        //console.dir(obj)
        console.log("Meta File Opened From get all project");
        console.log(obj);
        res.send(obj);
    })

});


router.post('/deleteFile', (req, res) => {
    console.log("Hello from Delete Method");
    console.log(req.body.fName);
    var filePath = './' + req.body.fName + ".json";
    if (fs.existsSync(filePath)) {

        console.log('File exists. Deleting now ...');
        fs.unlink(filePath);
        var obj = { msg: "File Deleted" };

        var metaInfoFileName = "./metaInfo.json";
        jsonfile.readFile(metaInfoFileName, function (err, data) {
            var json = data;
            console.log(data);
            //json.push(metaInfo)

            index = json.findIndex(x => x.name == req.body.fName);

            json.splice(index);



            jsonfile.writeFile(metaInfoFileName, json);

            var obj = { msg: "File Deleted" };
            res.send(obj);

            // Do something
        })

    }
    else {


        console.log('File not found, so not deleting.');
        var obj = { msg: "File Not Found" };
        res.send(obj);
    }
});









// Get all posts



/*router.get('/getTasks', (req, res) => {
db.collection('todos').find().toArray((err, result) => {
if (err) return console.log(err)
res.send(result)
})
})



router.post('/deleteTask', (req, res) => {
db.collection('todos').findOneAndDelete({key: req.body.key},
(err, result) => {
if (err) return res.send(500, err)
res.send(result)
})
})
*/


module.exports = router;
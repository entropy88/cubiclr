// TODO: Require Controllers...
const fs=require('fs');
const bodyParser = require('body-parser');
const db=[];
const  urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = (app) => {
   



    // TODO...
    app.get("/", function (req, res){
     res.render('index')
    })
    app.get("/about", function (req, res){
      const cubesJson=require('./database.json');
        res.render('about',cubesJson)
       })

       app.get("/create", function (req, res){
        res.render('create')
       })

       app.post('/create',urlencodedParser, function (req, res){
         let id=db.length;
          let name=req.body.name;
          let description=req.body.description;
          let difficulty=req.body.difficulty;
          let url=req.body.imageUrl;
          const newCube={id, name, description,difficulty,url}
           db.push(newCube);
           console.log(db);




           fs.writeFile(__dirname+'/database.json', JSON.stringify(db), function (err,data) {
            if (err) {
              return console.log(err);
            }
            console.log(data);
          });

        res.send('welcome, ' + JSON.stringify(req.body))

       })

       app.get("/details/:id", function (req, res){
        const cubesJson=require('./database.json');
    console.log(req.params.id)
    const cube=cubesJson.find(id=>id===req.params.id)
      console.log(cube)
        res.render('details', cube)
       })
};
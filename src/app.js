const express=require('express');
const app=express();
const path=require('path');
const hbs = require('hbs')
const PORT=process.env.PORT || 3000;

require('./db/conn')
const Register=require('./models/register')
const publicPath = path.join(__dirname, '../public')
const templatePath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use(express.static(publicPath))

app.set('view engine','hbs');

app.set('views',templatePath);

hbs.registerPartials(partialPath);

app.get('/',(req,res)=>{
    res.render('index');
})
app.get('/about', (req, res) => {
    res.render('about',{
        title:"about page"
    });
});

app.get('/registration', (req, res) => {
    res.render('registration');
});

app.post('/registration', async (req, res) => {
    try{
        const password=req.body.password;
        const cpassword=req.body.cpassword;

        if(password==cpassword)
        {
            const registerUser=new Register({
                Firstname:req.body.firstname,
                Lastname:req.body.lastname,
                Email:req.body.email,
                Password:password,
                ConfirmPassword:cpassword
            })

            const registerResult= await registerUser.save();
            res.status(201).render("index");
        }
        else{
            res.send("password is not matching");
        }
    }
    catch(err){
        res.status(400).send(err);
    }
});



app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`)
})
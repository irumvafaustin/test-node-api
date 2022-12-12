const express = require('express');
const bodyparser = require('body-parser');
const Stripe =require("stripe");
const mysql = require('mysql');
const app = express();
const cors = require('cors');
const {raw} = require('body-parser');
const Connection = require('mysql/lib/Connection');
const stripe = new Stripe(process.env.STRIPE_SECRET);

const port = process.env.PORT || 5000
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
app.use(cors())
//mysql code
const pool = mysql.createPool({
    connectionLimit:10,
    host:'localhost',
    user:'root',
    password:'',
    database:'amsp'
})

//=================== Post ========================== 
//insert data into post table in database
app.post('/post',(req,res)=>{
    const title = req.body.title
    const description = req.body.description
    console.log(title+""+description)

    const sqlInsert ="INSERT INTO post(title, description) VALUES (?,?)"
    pool.query(sqlInsert,[title,description],(err,result)=>{
        console.log(err)
    });

});
// Fetch data from post 

app.get('/postdata', (rep,res)=>{
    pool.getConnection((err, Connection)=>{
        if(err) throw err
        Connection.query('SELECT * FROM post', (err, raws)=>{
            Connection.release()
            if(!err){
                res.json(raws);
                console.log(raws)
            }else{
                console.log(err)
            }
        })
    })
})

//================== End Post ====================================
//===================Customer user ===============================
//insert data into users table in database
app.post('/signup',(req,res)=>{
    const fullname = req.body.name
    const gender = req.body.gender
    const phone = req.body.phone
    const email = req.body.email
    const password = req.body.password
    console.log(fullname+""+gender+""+phone+""+email+""+password)

    const sqlInsert ="INSERT INTO users(name, gender, phone, email, password) VALUES (?,?,?,?,?)"
    pool.query(sqlInsert,[fullname,gender,phone,email,password],(err,result)=>{
        console.log(err)
    });

});

// fetch data from database in users table

app.get('/signin', (rep,res)=>{
    pool.getConnection((err, Connection)=>{
        if(err) throw err
        Connection.query('SELECT * FROM users', (err, raws)=>{
            Connection.release()
            if(!err){
                res.json(raws);
                console.log(raws)
            }else{
                console.log(err)
            }
        })
    })
})

// Update customer user from users table 
app.post('/updateuser',(req,res)=>{
    const fullname= req.body.name
    const gender = req.body.type
    const phone= req.body.quantity
    const email = req.body.price
    const password=req.body.price
    const id = req.body.id
 
     console.log(fullname+""+gender+""+phone+""+email)
    
     const sqlInsert ='UPDATE users set name=?, gender=? , phone=? , email=?, password=? WHERE id=?'
     pool.query(sqlInsert,[fullname, gender, phone, email, password,id],(err,result)=>{
       console.log(err)
     })
 });
 //delete data from material table

 app.post('/deleteusers',(req,res)=>{
    const id = req.body.idx
    
 
     console.log(parseInt(id))
    
     const sqlInsert ='DELETE FROM users WHERE id=?'
     pool.query(sqlInsert,[parseInt(id)],(err,result)=>{
       console.log(err)
     })
 });
   

//===================End Customer User =============================

//=================== Materials =============================

//insert data into material table in database
app.post('/material',(req,res)=>{
    const name = req.body.name
    const type = req.body.type
    const quantity = req.body.quantity
    const price = req.body.price
    console.log(name+""+type+""+quantity+""+price)

    const sqlInsert ="INSERT INTO material(name, type, quantity, price) VALUES (?,?,?,?)"
    pool.query(sqlInsert,[name,type,quantity,price],(err,result)=>{
        console.log(err)
    });
});


// fetch data from database in material table

app.get('/material', (rep,res)=>{
    pool.getConnection((err, Connection)=>{
        if(err) throw err
        Connection.query('SELECT * FROM material', (err, raws)=>{
            Connection.release()
            if(!err){
                res.json(raws);
                console.log(raws)
            }else{
                console.log(err)
            }
        })
    })
})

//update data from material table

app.post('/updatematerial',(req,res)=>{
    const name= req.body.name
    const type = req.body.type
    const quantity= req.body.quantity
    const price = req.body.price
    const id = req.body.id
 
     console.log(name+""+type+""+quantity+""+price)
    
     const sqlInsert ='UPDATE material set name=?, type=? , quantity=? , price=? WHERE id=?'
     pool.query(sqlInsert,[name, type, quantity, price,id],(err,result)=>{
       console.log(err)
     })
 });
 //delete data from material table

 app.post('/deletematerial',(req,res)=>{
    const id = req.body.idx
    
 
     console.log(parseInt(id))
    
     const sqlInsert ='DELETE FROM material WHERE id=?'
     pool.query(sqlInsert,[parseInt(id)],(err,result)=>{
       console.log(err)
     })
 });
   
//===================End Materials =============================

//=========================== Employee =============================

//insert data into employee table in database
app.post('/employee',(req,res)=>{
    const name = req.body.name
    const phone = req.body.phone
    const gender = req.body.gender
    const position = req.body.position
    const salary = req.body.salary
    console.log(name+""+phone+""+gender+""+position+""+salary)

    const sqlInsert ="INSERT INTO employee(name, phone, gender, position, salary) VALUES (?,?,?,?,?)"
    pool.query(sqlInsert,[name,phone,gender,position,salary],(err,result)=>{
        console.log(err)
    });
});
// fetch data from database in employee table

app.get('/employee', (rep,res)=>{
    pool.getConnection((err, Connection)=>{
        if(err) throw err
        Connection.query('SELECT * FROM employee', (err, raws)=>{
            Connection.release()
            if(!err){
                res.json(raws);
                console.log(raws)
            }else{
                console.log(err)
            }
        })
    })
})

//update data from employee table

app.post('/updateemployee',(req,res)=>{
    const name = req.body.name
    const phone = req.body.phone
    const gender = req.body.gender
    const position = req.body.position
    const salary = req.body.salary
    const id = req.body.id
 
     console.log(name+""+phone+""+gender+""+position+""+salary)
    
     const sqlInsert ='UPDATE employee set name=?, phone=? , gender=? , position=? , salary=? WHERE id=?'
     pool.query(sqlInsert,[name, phone, gender, position, salary, id],(err,result)=>{
       console.log(err)
     })
 });
 //delete data from employee table

 app.post('/deleteemployee',(req,res)=>{
    const id = req.body.idx
    
 
     console.log(parseInt(id))
    
     const sqlInsert ='DELETE FROM employee WHERE id=?'
     pool.query(sqlInsert,[parseInt(id)],(err,result)=>{
       console.log(err)
     })
 });
  
 
 //================ End Employee ==============================
app.post('/stripePay',async(request,response)=>{
    try {
        const {name,amount} = req.body;
        if(!name) return res.status(400).json({message:"Please enter the name"});

        const paymentIntent = await stripe.paymentIntents.create({
            amount:amount * 100,
            metadata:{name},
            currency:"usd",
            payment_method_types:['card']
        });
        const clientSecret = paymentIntent.client_secret;
        res.status(200).json({message:"payment iNitiated",clientSecret});
    } catch (error) {
        res.status(200).json({error:error.message})
    }
});







app.listen(port, ()=> console.log('hello'));
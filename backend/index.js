const express=require("express");
const mysql=require("mysql");
const bodyParser=require("body-parser");

const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.listen(3001,()=>{
    console.log("Start");
});
const db=mysql.createConnection({
    host:'127.0.0.1',
    port:'3306',
    user:'root',
    database:'uzytkownicy'
})
db.connect((err)=>{
    if(err){
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log("Połączono");
})
function queryPromise(sql,values=[]){
    return new Promise((resolve,reject)=>{
        db.query(sql,values, (error,results)=>{
            if(error){
                reject(error);
            }else{
                resolve(results);
            }
        })
    });
}
//CREATE
app.post('/uzytkownicy', async(req,res)=>{
    try{
        const{username, haslo, email}=req.body;
        if(!username || !haslo || !email){
            throw new Error("Wszystkie pola muszą być wypełnione.");
        }
        //if(!email.value.match(validRegex)){
         //   throw new Error("Proszę podaj prawidłowy email.");
       // }
        const użytkownik=[username,haslo,email];
        const SQL="INSERT INTO uzytkownicy (Username,Hasło,Email) VALUES (?,?,?)";
        const result=await queryPromise(SQL,użytkownik)
        res.json({id:result.insertID,username,haslo,email});
    }catch(err){
        console.log(err);
    }
})
app.post('/ulubione', async(req,res)=>{
    try{
        var{IDUzytkownik, IDFilm}=req.body;
        if(!IDUzytkownik || !IDFilm){
            throw new Error("Wszystkie pola muszą być wypełnione.");
        }
        const para=[IDUzytkownik, IDFilm];
        const SQL="INSERT INTO ulubione (IDUżytkownik, IDFilm) VALUES (?,?)";
        const result=await queryPromise(SQL,para)
        res.json({IDUzytkownik, IDFilm});
    }catch(err){
        console.log(err);
    }
})
app.post('/obejrzane', async(req,res)=>{
    try{
        var{IDUzytkownik, IDFilm}=req.body;
        if(!IDUzytkownik || !IDFilm){
            throw new Error("Wszystkie pola muszą być wypełnione.");
        }
        const para=[IDUzytkownik, IDFilm];
        const SQL="INSERT INTO obejrzane (IDUżytkownik, IDFilm) VALUES (?,?)";
        const result=await queryPromise(SQL,para)
        res.json({IDUzytkownik, IDFilm});
    }catch(err){
        console.log(err);
    }
})
app.post('/kolejka', async(req,res)=>{
    try{
        var{IDUzytkownik, IDFilm}=req.body;
        if(!IDUzytkownik || !IDFilm){
            throw new Error("Wszystkie pola muszą być wypełnione.");
        }
        const para=[IDUzytkownik, IDFilm];
        const SQL="INSERT INTO kolejka (IDUżytkownik, IDFilm) VALUES (?,?)";
        const result=await queryPromise(SQL,para)
        res.json({IDUzytkownik, IDFilm});
    }catch(err){
        console.log(err);
    }
})
//READ.
app.get('/uzytkownicy',async(req,res)=>{
    var SQL='SELECT * FROM uzytkownicy';
    const results=await queryPromise(SQL);
    res.status(500).json(results);
})
app.get('/uzytkownicy/:id', async(req,res)=>{
    try{
        const{id}=req.params;
        var SQL = 'SELECT * FROM uzytkownicy WHERE Id=?';
        const results=await queryPromise(SQL,[id]);
        if(results.length===0){
            res.status(404).json({error: 'Nie ma takiego użytkownika'});
        }else{
            res.status(500).json(results[0]);
        }
    }
    catch{
        console.log(err);
        res.status(500).json({error:'Nie znaleziono prawidłowego użytkownika'});
    }
})
app.get('/ulubione/:id', async(req,res)=>{
    try{
        const{id}=req.params;
        var SQL = 'SELECT IDFilm FROM ulubione WHERE IDUżytkownik=?';
        const results=await queryPromise(SQL,[id]);
        if(results.length===0){
            res.status(404).json({error: 'Nie ma takiego użytkownika'});
        }else{
            res.status(500).json(results);
        }
    }
    catch{
        console.log(err);
        res.status(500).json({error:'Nie znaleziono prawidłowego użytkownika'});
    }
})
app.get('/obejrzane/:id', async(req,res)=>{
    try{
        const{id}=req.params;
        var SQL = 'SELECT IDFilm FROM obejrzane WHERE IDUżytkownik=?';
        const results=await queryPromise(SQL,[id]);
        if(results.length===0){
            res.status(404).json({error: 'Nie ma takiego użytkownika'});
        }else{
            res.status(500).json(results);
        }
    }
    catch{
        console.log(err);
        res.status(500).json({error:'Nie znaleziono prawidłowego użytkownika'});
    }
})
app.get('/kolejka/:id', async(req,res)=>{
    try{
        const{id}=req.params;
        var SQL = 'SELECT IDFilm FROM kolejka WHERE IDUżytkownik=?';
        const results=await queryPromise(SQL,[id]);
        if(results.length===0){
            res.status(404).json({error: 'Nie ma takiego użytkownika'});
        }else{
            res.status(500).json(results);
        }
    }
    catch{
        console.log(err);
        res.status(500).json({error:'Nie znaleziono prawidłowego użytkownika'});
    }
})
//Search
app.get('/uzytkownicy/szukaj', async(req,res)=>{
    try {
        const {query} =req.body;
        const SQL='SELECT * FROM uzytkownicy WHERE username LIKE ?';
        const result=await queryPromise(SQL,[query]);

        if(result.length===0){
            res.status(200).json({msg:"Nie ma takiego użytkownika",length:result.length});
        }
        res.status(200).json(result);
    }catch(err){
        res.status(500).json({error:"Nie znaleziono prawidłowego użytkownika"})
    }
})
//Update
app.put('/uzytkownicy/:id',async(req,res)=>{
    try{
        const id=req.params.id;
        const{username, haslo, email}=req.body;
        const SQL="UPDATE uzytkownicy SET Username = ? , Hasło = ?, Email=? WHERE Id=?";
        const result=await queryPromise(SQL,[username,haslo,email,id])
        if(result.affectedRows===0){
            res.send(404).json({error:"Nie ma takiego użytkownika"})
        }
        else{
            res.status(200).json({id:id,username,haslo,email});
        }
    }catch(err){
        res.status(500).json({error:"Nie znaleziono prawidłowego użytkownika"})
    }
})
//Remove
app.delete('/uzytkownicy/:id',async(req,res)=>{
    try{
        const id=req.params.id;
        const SQL='DELETE FROM uzytkownicy WHERE Id=?';
        const result=await queryPromise(SQL,[id]);
        if(result.affectedRows===0){
            res.status(404).json({error:"Nie ma takiego użytkownika"});
        }
        else{
            res.status(200).json({msg:"Użytkownik usunięty"});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Nie można usunąć wpisu"})
    }
})
app.delete('/ulubione/:id',async(req,res)=>{
    try{
        const id=req.params.id;
        const {IDFilm}=req.body;
        const SQL='DELETE FROM ulubione WHERE IDUżytkownik=? AND IDFilm=?';
        const result=await queryPromise(SQL,[id,IDFilm]);
        if(result.affectedRows===0){
            res.status(404).json({error:"Nie ma takiego użytkownika lub filmu"});
        }
        else{
            res.status(200).json({msg:"Film usunięty z listy"});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Nie można usunąć wpisu"})
    }
})
app.delete('/ulubione/:id',async(req,res)=>{
    try{
        const id=req.params.id;
        const {IDFilm}=req.body;
        const SQL='DELETE FROM obejrzane WHERE IDUżytkownik=? AND IDFilm=?';
        const result=await queryPromise(SQL,[id,IDFilm]);
        if(result.affectedRows===0){
            res.status(404).json({error:"Nie ma takiego użytkownika lub filmu"});
        }
        else{
            res.status(200).json({msg:"Film usunięty z listy"});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Nie można usunąć wpisu"})
    }
})
app.delete('/kolejka/:id',async(req,res)=>{
    try{
        const id=req.params.id;
        const {IDFilm}=req.body;
        const SQL='DELETE FROM kolejka WHERE IDUżytkownik=? AND IDFilm=?';
        const result=await queryPromise(SQL,[id,IDFilm]);
        if(result.affectedRows===0){
            res.status(404).json({error:"Nie ma takiego użytkownika lub filmu"});
        }
        else{
            res.status(200).json({msg:"Film usunięty z listy"});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Nie można usunąć wpisu"})
    }
})
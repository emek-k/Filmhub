const express=require("express");
const mysql=require("mysql");
const bodyParser=require("body-parser");

const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

const cors = require('cors');
app.use(cors());

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
app.post('/uzytkownicy', async (req, res) => {
  try {
    const { username, haslo, email } = req.body;
    if (!username || !haslo || !email) {
      return res.status(400).json({ error: "Wszystkie pola muszą być wypełnione" });
    }

    const checkSQL = "SELECT * FROM uzytkownicy WHERE Username = ? OR Email = ?";
    const existingUser = await queryPromise(checkSQL, [username, email]);

    if (existingUser.length > 0) {
      return res.status(409).json({ error: "Użytkownik o danym email lub username już istnieje" });
    }

    // Insert new user
    const insertSQL = "INSERT INTO uzytkownicy (Username, Haslo, Email) VALUES (?, ?, ?)";
    const result = await queryPromise(insertSQL, [username, haslo, email]);

    res.json({ id: result.insertId, username, email });
  } catch (err) {
    console.error("Database Query Error:", err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});


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
app.get('/uzytkownicy/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const SQL = 'SELECT * FROM uzytkownicy WHERE Id = ?';
    const result = await queryPromise(SQL, [id]);

    if (result.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});
app.get('/ulubione/:id', async (req, res) => {
  try {
    const { id } = req.params;
    var SQL = 'SELECT IDFilm FROM ulubione WHERE IDUzytkownik = ?';
    const results = await queryPromise(SQL, [id]);

    if (results.length === 0) {
      return res.status(404).json({ error: 'No favorite movies found for this user' });
    }

    const movieDetailsPromises = results.map(film =>
      axios.get(`${TMDB_BASE_URL}/movie/${film.IDFilm}?api_key=${API_KEY}`)
    );

    const movieDetailsResponses = await Promise.all(movieDetailsPromises);
    const movies = movieDetailsResponses.map(response => response.data);

    res.json(movies);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

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
        const SQL='DELETE FROM ulubione WHERE IDUzytkownik=? AND IDFilm=?';
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
app.delete('/obejrzane/:id',async(req,res)=>{
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

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required." });
    }

    const SQL = "SELECT * FROM uzytkownicy WHERE BINARY Username = ? AND Haslo = ?";
    const users = await queryPromise(SQL, [username, password]);

    if (users.length === 0) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    res.json({ message: "Login successful", user: users[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

const axios = require('axios');

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = 'ac0accae8ecc4e6cba7c3a1110a8bb30';
app.get('/movies/popular', async (req, res) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/popular?api_key=${API_KEY}`);
    res.json(response.data.results);
  } catch (error) {
    console.error('Error fetching data from TMDB:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

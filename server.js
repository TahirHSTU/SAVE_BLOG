let express = require('express')
let app = express()
let nodemailer = require('nodemailer')




let mongodb = require('mongodb')
let db
let connectionString = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false'

mongodb.connect(connectionString, {useNewUrlParser: true}, function(err, client){
    db = client.db()
    app.listen(3000)
})
// this line tells express to automatically take asynchronous request data and add it to req object
app.use(express.json())
// this line tells express to automatically take submitted form data and add it to request object
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))


app.get('/', function(req, res){
    db.collection('myBlog').find().sort({"_id": -1}).toArray(function(err, myBlog){
        res.send(`<html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="contact.css">
            <title>Document</title>
        </head>
        <body>
            <div id="contact" class="contact">
                <li><form id="form" action="/create-blog" method="POST">
                  <h2>Blog</h2>
                  <input name="heading" type="text" placeholder="Heading" id="email">
                  <input name="blog_body" type="textarea" placeholder="Blog body">
                  <input type="submit" id="submit">
                  </form>
                </li>  
                </div>
              
        
                <div class="blog_body2">
                    ${myBlog.map(function(anyName){
                        return `<li class="heading" id="heading">${anyName.heading}</li>
                        <li class="blog_body" id="blog_body">${anyName.blog_body} </li>
                        <button data-id="${anyName._id}"  class="edit">Edit</button>
                        <button>Delete</button>`
                    }).join('')}
                </div>
                <script src="https://unpkg.com/axios/dist/axios.min.js"></script>

                <script src="/browserSide.js"></script>
        </body>
        </html>`)
    })
    
})

app.post('/create-blog', function(req, res){
    db.collection('myBlog').insertOne({heading: req.body.heading,
    blog_body: req.body.blog_body}, function(){
        
        res.redirect('/')
    })
  })


app.post('/edit-blog', function(req, res){

  db.collection('myBlog').findOneAndUpdate({_id: new mongodb.ObjectID(req.body.id)}, {$set: {heading: req.body.heading, blog_body: req.body.blog_body}}, function(){
    res.send("Success")
  })
 
})
// homepage functions ends here


app.get('/blog', function(req, res) {
  db.collection('myBlog').find().sort({"_id": -1}).toArray(function(err, myBlog){
  res.send(`<!DOCTYPE html>
  <html lang="en" >
  <head>
    <meta charset="UTF-8">
    <title>CodePen - Build_a_product_landing_page</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap');
  
  * {
    --background-image: url(https://scontent.fdac12-1.fna.fbcdn.net/v/t1.6435-9/67185798_2450960881633224_3803101645487734784_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=8bfeb9&_nc_ohc=JRDriKBgU2AAX9yyCW3&_nc_ht=scontent.fdac12-1.fna&oh=3d9d082214e2f58912234c2bd53383e5&oe=60DC8084);
    --activities-icon: url();
    --activities-color: #b8c0cc;
    --background-colorNF: #131417;
  }
  @keyframes blink {
    0%{
      background-color: yellow;
    }
     25%{
      background-color: #00ce2d;
     
    }
     50%{
      background-color: yellow;
    }
    75%{
      background-color: #00ce2d;
     
    }
   100%{
      background-color: yellow;
    }
    
  }
  
  body {
  
    font-family: 'Montserrat', sans-serif;
    width: 100%;
    
    margin: 0;
    
  }
  nav {
    display: flex;
    position: fixed;
    top: 0px;
    left: 0px;
    padding: 20px 20px 20px 20px;
    justify-content: space-between;
    background-color: var(--background-colorNF);
    color: white;
    width: 100%;
    z-index: 10;
    
  }
  @media(max-width: 700px) {
    nav{
    flex-direction: column;
    }
  }
  
  .nav-link {
    color: white;
    text-decoration: none;
  }
  nav li {
    display: inline-block;
    padding: 20px 50px 10px 20px;
    border-radius: 13px;
    }
  nav li:hover{
     background-color: yellow;
   
    
  }
   nav li:hover a{
    color: green;
     letter-spacing: 2px;
  }
  .logo {
    max-width: 50px;
    clip-path: circle(50% at 50% 50%);
    
  }
  
  
  /* nav bar code finished here */
   
  
   /* Blog card code goes here */
  
  /*PEN STYLES*/
  
  
  .blog-card {
    display: flex;
    flex-direction: column;
    margin: 1rem auto;
    box-shadow: 0 3px 7px -1px rgba(0, 0, 0, 0.1);
    margin-bottom: 1.6%;
    background: #fff;
    line-height: 1.4;
    font-family: sans-serif;
    border-radius: 5px;
    overflow: hidden;
    z-index: 0;
    margin-top: 15rem;
  }
  
  .blog-card a {
    color: inherit;
  }
  
  .blog-card a:hover {
    color: #5ad67d;
  }
  
  .blog-card:hover .photo {
    transform: scale(1.3) rotate(3deg);
  }
  
  .blog-card .meta {
    position: relative;
    z-index: 0;
    height: 200px;
  }
  
  .blog-card .photo {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-size: cover;
    background-position: center;
    transition: transform .2s;
  }
  
  .blog-card .details,
    .blog-card .details ul {
    margin: auto;
    padding: 0;
    list-style: none;
  }
  
  .blog-card .details {
    position: absolute;
    top: 0;
    bottom: 0;
    left: -100%;
    margin: auto;
    transition: left .2s;
    background: rgba(0, 0, 0, 0.6);
    color: #fff;
    padding: 10px;
    width: 100%;
    font-size: .9rem;
  }
  
  .blog-card .details a {
    text-decoration: dotted underline;
  }
  
  .blog-card .details ul li {
    display: inline-block;
  }
  
  .blog-card .details .author:before {
    font-family: FontAwesome;
    margin-right: 10px;
    content: "\f007";
  }
  
  .blog-card .details .date:before {
    font-family: FontAwesome;
    margin-right: 10px;
    content: "\f133";
  }
  
  .blog-card .details .tags ul:before {
    font-family: FontAwesome;
    content: "\f02b";
    margin-right: 10px;
  }
  
  .blog-card .details .tags li {
    margin-right: 2px;
  }
  
  .blog-card .details .tags li:first-child {
    margin-left: -4px;
  }
  
  .blog-card .description {
    padding: 1rem;
    background: #fff;
    position: relative;
    z-index: 1;
  }
  
  .blog-card .description h1,
      .blog-card .description h2 {
    font-family: Poppins, sans-serif;
  }
  
  .blog-card .description h1 {
    line-height: 1;
    margin: 0;
    font-size: 1.7rem;
  }
  
  .blog-card .description h2 {
    font-size: 1rem;
    font-weight: 300;
    text-transform: uppercase;
    color: #a2a2a2;
    margin-top: 5px;
  }
  
  .blog-card .description .read-more {
    text-align: right;
  }
  
  .blog-card .description .read-more a {
    color: #5ad67d;
    display: inline-block;
    position: relative;
  }
  
  .blog-card .description .read-more a:after {
    content: "\f061";
    font-family: FontAwesome;
    margin-left: -10px;
    opacity: 0;
    vertical-align: middle;
    transition: margin .3s, opacity .3s;
  }
  
  .blog-card .description .read-more a:hover:after {
    margin-left: 5px;
    opacity: 1;
  }
  
  .blog-card p {
    position: relative;
    margin: 1rem 0 0;
  }
  
  .blog-card p:first-of-type {
    margin-top: 1.25rem;
  }
  
  .blog-card p:first-of-type:before {
    content: "";
    position: absolute;
    height: 5px;
    background: #5ad67d;
    width: 35px;
    top: -0.75rem;
    border-radius: 3px;
  }
  
  .blog-card:hover .details {
    left: 0%;
  }
  
  @media (min-width: 640px) {
    .blog-card {
      flex-direction: row;
      max-width: 700px;
    }
  
    .blog-card .meta {
      flex-basis: 40%;
      height: auto;
    }
  
    .blog-card .description {
      flex-basis: 60%;
    }
  
    .blog-card .description:before {
      transform: skewX(-3deg);
      content: "";
      background: #fff;
      width: 30px;
      position: absolute;
      left: -10px;
      top: 0;
      bottom: 0;
      z-index: -1;
    }
  
    .blog-card.alt {
      flex-direction: row-reverse;
    }
  
    .blog-card.alt .description:before {
      left: inherit;
      right: -10px;
      transform: skew(3deg);
    }
  
    .blog-card.alt .details {
      padding-left: 25px;
    }
  }
  
  /*  footer */
  
  footer{
    display: flex;
    background-color: var(--background-colorNF);
    width: 100%;
    justify-content: space-around;
  }
  footer li,footer a{
    display: inline-block;
    padding: 0 0 1cm 1cm;
    margin: 0.4cm 0 0 0.1cm;
    text-decoration: none;
    color: white;
  }
  
  @media(max-width: 700px){
    footer{
      flex-direction: column;
    }
  }
  </style>
  
  </head>
  <body>
  <!-- partial:index.partial.html -->
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SAVE HSTU</title>
  </head>
  <body>
    <header id="header">
      <nav id="nav-bar">
      <li><img id="header-img" src="https://scontent.fdac12-1.fna.fbcdn.net/v/t1.6435-9/121596169_132300508620920_9118668398298529590_n.png?_nc_cat=111&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=6vhFEV8-APgAX84vwQy&tn=Uf6FDVnbHUU-zVXl&_nc_ht=scontent.fdac12-1.fna&oh=0429cdcf44b30e04d3c4c59228f8eaff&oe=60DB4149" alt="save logo" class="logo"></li>
      <li><a class="nav-link" href="#home">Home</a></li>
      <li><a class="nav-link" href="#activities">Our Activities</a></li>
      <li><a class="nav-link" href="#contact">Contact</a></li>
        
      </nav>
    </header>
  
  
    
        ${myBlog.map(function(anyName){
          return `<div class="blog-card">
          <div class="meta">
            <div class="photo" style="background-image: url(https://storage.googleapis.com/chydlx/codepen/blog-cards/image-1.jpg)"></div>
            <ul class="details">
              <li class="author"><a href="#">John Doe</a></li>
              <li class="date">Aug. 24, 2015</li>
              <li class="tags">
                <ul>
                  <li><a href="#">Learn</a></li>
                  <li><a href="#">Code</a></li>
                  <li><a href="#">HTML</a></li>
                  <li><a href="#">CSS</a></li>
                </ul>
              </li>
            </ul>
          </div>
          <div class="description">
          <h1>${anyName.heading}</h1>
          <h2>Opening a door to the future</h2>
          <p> ${anyName.blog_body}</p>
          <p class="read-more">
            <a href="#">Read More</a>
            </p>
            </div>
          </div>
          ` 
        }).join('')}
  
       
  
      
      <footer>
           <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#identity">Team</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </footer>
      
    </div>
    <script src='https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js'></script>
  </body>
  </html>
  <!-- partial -->
    
  </body>
  </html>
  `)
  })
})

app.get('/contact', function(req, res){
  res.send(`<html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
          /* contact section starts here */
  .contact {
    display: flex;
    flex-direction: row;
    color: green;
    margin: 1in 1in 1in 1in;
    padding: 1in 1in 1in 1in;
    border: 1px solid;
  }
  .contact li a{
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: green;
  /*   text-align: center; */
    position: relative;
    left: 1in;
    top: 1in;
    padding: 0 0 1cm 10px;
  }
  .contact li form{
    display: flex;
    flex-direction: column;
    width: 100%;
    
  }
  .contact li{
    display: inline-block;
  }
  
  .contact form input{
        width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-sizing: border-box;
  }
  input[type=submit]{
    background-color: yellow;
  }
  input[type=submit]:hover {
    background-color: green;
    border: 0px solid none;
    transform: scale(1.05);
   }
      </style>
      <title>Email</title>
  </head>
  <body>
      <div id="contact" class="contact">
          <li><form id="form" action="/contact-email" method="POST">
            <h2>Contact us</h2>
            <input name="email" type="email" placeholder="Email" id="email">
            <input name="feedback" type="textarea" placeholder="Your Comment">
            <input type="submit" id="submit">
            </form>
          </li> 
          <li>
            <a href="facebook.com/savehstuchapter">Our facebook page</a>
            <a href="mailto:save.hstu@gmail.com">Our Email</a>
          </li>
        </div>
  </body>
  </html>`)
})

app.post('/contact-email', function(req, res){
 let mail_subject = req.body.email;
 let mail_body = req.body.feedback;


  let transporter = nodemailer.createTransport({
    service: 'hotmail',
  
  
    auth: {
      user: 'tahirtamin20@outlook.com',
      pass: 'mycpscr56964'
    }
  });

  var mailOptions = {
    from: 'tahirtamin20@outlook.com',
    to: 'save.hstu@gmail.com',
    subject:  mail_subject,
    html: `${mail_body} Reply here: <a href="mailto:${mail_subject}">Reply</a>`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  res.redirect('/contact')
})

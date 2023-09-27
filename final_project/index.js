Skip to content
amiraallagui
/
expressBookReviews-1

Type / to search

Code
Pull requests
Actions
Projects
Security
Insights
Pane width
Use a value between 14% and 49%

17
Change width
Files
Go to file
t
final_project
router
auth_users.js
booksdb.js
general.js
README.md
index.js
package.json
.DS_Store
.gitignore
LICENSE
README.md
Documentation • Share feedback
BreadcrumbsexpressBookReviews-1/final_project
/index.js
Latest commit
amiraallagui
amiraallagui
Update index.js
e2a65f1
 · 
5 months ago
History
File metadata and controls

Code

Blame
39 lines (29 loc) · 1.18 KB
const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"secretKey",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
  // Check if the user has an access token in the session
  if (!req.session.accessToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Verify the access token and extract the user password from it
  const accessToken = req.session.accessToken;
  try {
    const decodedToken = jwt.verify(accessToken, "secretKey");
    const userPassword = decodedToken.userPassword;
    req.userPassword = userPassword;
    next();
  } catch (err) {
    return res.status(401).json(err);

    //return res.status(401).json({accessToken:req.session.accessToken, message: "Invalid access token" });
  }

});
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
expressBookReviews-1/final_project/index.js at main · amiraallagui/expressBookReviews-1

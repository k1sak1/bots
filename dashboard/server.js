const express = require("express");
const chalk = require("chalk");
const client = require("../index");
const cookies = require("cookies");
const middleware = require("./modules/middleware");

const rootRoutes = require("./routes/root-routes");
const dashboardRoutes = require("./routes/dashboard-routes");
const authRoutes = require("./routes/auth-routes");

const app = express();

app.use(cookies.express('a', 'b', 'c'));
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));

app.use('/', 
    middleware.updateUser, rootRoutes,
    authRoutes, middleware.validateUser, middleware.updateGuilds, dashboardRoutes
)

app.get('*', (req, res) => {
    res.render('errors/404.pug')
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(chalk.green("[express] App listening on port ", PORT))
});
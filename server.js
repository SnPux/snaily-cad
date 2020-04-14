const express = require("express");
const app = express();
let eSession = require('easy-session');
let cookieParser = require('cookie-parser');
let creds = require("./creds.json");
const favicon = require('express-favicon');
const session = require("express-session");
const bodyParser = require('body-parser');
const path = require('path');
require("dotenv").config()
// Variables
let port = creds.ENV === "dev" ? 3001 : creds.ProductionPort;
const mysql = require('mysql');
let connection;

let db = {
    host: "localhost",
    user: "root",
    database: creds.database,
    password: process.env.DBP,
    multipleStatements: true,
    timeout: 0
};


// Admin
const {
    adminPanel,
    usersPage,
    adminEditCitizen,
    adminEditCitizenPage,
    editCADPage,
    deleteAllCitizens,
    banUser,
    unBanUser,
    editCAD,
    actionLogPage
} = require("./routes/admin");

// Vehicles
const {
    addCarPage,
    carValuePage,
    editVehiclePage,
    editVehicle,
    deleteVehiclePage,
    addCar,
    regVehicle,
    regVehiclePage,
    editVehiclePageCitizen,
    editVehicleCitizen,
    deleteVehicleCitizen
} = require("./routes/values/cars");

// Genders
const {
    genderPage,
    deleteGender,
    addGenderPage,
    addGender,
    editGender,
    editGenderPage
} = require("./routes/values/genders");
// Weapons
const {
    weaponsPage,
    deleteWeapon,
    addWeaponPage,
    addWeapon,
    editWeapon,
    editWeaponPage,
    regWeapon,
    regWeaponPage,
    citizenDeleteWeapon
} = require("./routes/values/weapons");

// Ethnicities
const {
    ethnicitiesPage,
    addethnicityPage,
    addethnicity,
    editEthnicityPage,
    editethnicity,
    deleteEthnicity
} = require("./routes/values/ethnicities");

// Officers
const {
    officersPage,
    tabletPage,
    penalCodesPage,
    officersDash,
    searchNamePage,
    searchPlatePage,
    plateResultsPage,
    nameResultsPage,
    officerApplyPage,
    addOffencePage,
    addOffence,
    officerApply,
    addWarrant,
    addWarrantPage,
    addOfficer,
    addOfficerPage,
    suspendLicensePlate,
    suspendLicenseName,
    statusChange,
    codesPage,
    officerBolo,
    removeOfficerBolo,
    officerOffencer,
    versionChange,
    officerWeaponSearch,
    officerAddWarrant,
    officerAPI,
    quickWarrant,
    officerAPIPlate,
    officerAPIWeapon,
    cancelCall911,
    update911call
} = require("./routes/officers/officer");

const {
    emsPage,
    statusChangeEMS, addEMSPage,
    addEMS
} = require('./routes/ems-fd/ems-fd')

// Citizens
const {
    citizenPage,
    citizenDetailPage,
    addCitizen,
    addCitizenPage,
    editCitizenPage,
    editCitizen,
    deleteCitizens,
    companyPage,
    company,
    createCompany,
    companyDetailPage,
    createCompanyPostPage,
    createCompanyPost,
    editCompanyPage,
    editCitizenCompanyPage,
    editCitizenCompany
} = require("./routes/citizens/citizen");

// Registration - Login
const {
    loginPage,
    registerPage,
    login,
    register,
    editAccountPage,
    editAccountUsername,
    editAccountPassword,
    deleteAccount
} = require("./routes/login-reg");

const { addDept, addDeptPage, editDept, deleteDept, editDeptPage, deptPage } = require("./routes/values/depts")

const {
    dispatchPage,
    disptachWeaponSearch,
    disptachAddressSearch,
    statusChangeDispatch,
    statusChangeDispatchEMS,
    editAOP,
    createBolo,
    removeBolo,
    updateDispatchCall,
    cancelCall911Dis
} = require("./routes/dispatch")

const {
    homePage,
    logout
} = require("./routes/index");

const { legalPage, addLegalPage, deleteLegal, addLegal, editLegalPage, editLegal } = require("./routes/values/legal")


const { towPage, createTowCall, cancelCallTow } = require("./routes/tow/tow")

const { create911Call } = require("./routes/911/911")

// Middleware
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.set('views', __dirname + '/views');
app.set("view engine", "ejs")
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));
app.use(favicon(__dirname + '/public/icon2.png'));

app.use(eSession.main(session));


// Main Pages
app.get("/", homePage);
app.get(`/logout`, logout);

//  Login : Registration
app.get(`/login`, loginPage);
app.post(`/login`, login);
app.get(`/register`, registerPage);
app.post(`/register`, register);


app.get("/account/edit", editAccountPage);
app.post("/account/edit/username", editAccountUsername);
app.post("/account/edit/password", editAccountPassword);
app.post("/delete-account", deleteAccount)

// Admin
app.get("/admin", adminPanel);
app.get("/admin/users", usersPage);
app.get("/admin/users/edit/:id", adminEditCitizenPage);
app.post("/admin/users/edit/:id", adminEditCitizen);
app.get("/admin/edit-cad", editCADPage)
app.post("/admin/edit-cad", editCAD)
app.post("/admin/delete-citizens", deleteAllCitizens)
app.post("/admin/ban-:id", banUser)
app.post("/admin/unban-:id", unBanUser)
app.get("/admin/action-log", actionLogPage)

// Citizens
app.get("/citizen", citizenPage);
app.get("/citizens/:id-:full_name", citizenDetailPage);
app.get("/citizen/add", addCitizenPage);
app.post("/citizen/add", addCitizen);
app.get("/citizen/edit/:id-:full_name", editCitizenPage);
app.post("/citizen/edit/:id-:full_name", editCitizen);
app.get("/citizen/delete/:id-:full_name", deleteCitizens);
app.get("/citizen/company", companyPage);
app.post("/citizen/company/join", company);
app.post("/citizen/company/create", createCompany);
app.get("/citizen/company/:id-:company", companyDetailPage);
app.get("/citizen/company/:id-:company/create-post", createCompanyPostPage)
app.post("/citizen/company/:id-:company", createCompanyPost)
app.get("/citizen/company/:id-:company/edit-company", editCompanyPage)
app.get("/citizen/company/:id-:company/edit/:citizen", editCitizenCompanyPage)
app.post("/citizen/company/:id-:company/edit/:citizen", editCitizenCompany)
// Tow
app.get("/tow", towPage)
app.post("/create-tow-call", createTowCall)
app.post("/create-911-call", create911Call)
app.get("/tow/cancel-call-:callID", cancelCallTow)



app.get("/dispatch", dispatchPage);
app.post("/dispatch/search/weapon", disptachWeaponSearch);
app.post("/dispatch/search/address", disptachAddressSearch);
app.post("/dispatch/status", statusChangeDispatch);
app.post("/dispatch/status-ems", statusChangeDispatchEMS);
app.post("/dispatch/aop", editAOP);
app.post("/dispatch/bolo", createBolo);
app.post("/dispatch/remove-bolo", removeBolo);
app.post("/dispatch/update-call-:id", updateDispatchCall)
app.get("/dispatch/cancel-call-:id", cancelCall911Dis)




// Officers
app.get("/myofficers", officersPage)
app.get("/officers/dash", officersDash)
app.get("/officers/penal-codes", penalCodesPage)
app.get("/officers/dash/search/plate", searchPlatePage)
app.get("/officers/dash/search/plate/:id-:owner", plateResultsPage)
app.get("/officers/dash/offence/add/:id-:first_name-:last_name", addOffencePage)
app.post("/officers/dash/offence/add/:id-:first_name-:last_name", addOffence)
app.get("/officers/dash/search/person-name", searchNamePage)
app.get("/officers/dash/search/name/:id-:first_name-:last_name", nameResultsPage)
app.get("/officers/apply", officerApplyPage);
app.post("/officers/apply", officerApply);
app.get("/officers/dash/warrants/add/:id-:first_name-:last_name", addWarrantPage)
app.post("/officers/dash/warrants/add/:id-:first_name-:last_name", addWarrant)
app.post("/officers/warrant", officerAddWarrant)
app.get('/officers/add', addOfficerPage)
app.post('/officers/add', addOfficer)
app.post("/officers/dash/search/plate/:id-:first_name-:last_name/suspend", suspendLicensePlate)
app.post("/myofficers/status", statusChange)
app.get("/officers/dash/codes", codesPage)
app.post("/officers/bolo", officerBolo)
app.post("/officers/remove-bolo", removeOfficerBolo)
app.post("/officers/dash/search/name/:id-:first_name-:last_name/suspend/dmv", suspendLicenseName)
app.post("/officers/dash/search/name/:id-:first_name-:last_name/suspend/pilot", suspendLicenseName)
app.post("/officers/dash/search/name/:id-:first_name-:last_name/suspend/fire", suspendLicenseName)
app.post("/officers/dash/search/name/:id-:first_name-:last_name/suspend/ccw", suspendLicenseName)
app.post("/officers/dash/offence", officerOffencer)
app.post("/officers/version/compact", versionChange)
app.post("/officers/version/real", versionChange)
app.get("/officers/api/:name", officerAPI)
app.get("/officers/api/plate/:plate", officerAPIPlate)
app.get("/officers/api/weapon/:serial", officerAPIWeapon)
app.post("/officers/quickwarrant", quickWarrant)
app.get("/officers/cancel-call-:id", cancelCall911)
app.post("/officers/dash/update-call-:id", update911call)

app.post("/officers/search/weapon", officerWeaponSearch);

// EMS/FD
app.get('/ems-fd', emsPage);
app.post("/ems-fd/status", statusChangeEMS)
app.get("/ems-fd/add", addEMSPage)
app.post("/ems-fd/add", addEMS)

// Cars
app.get("/admin/values/cars", carValuePage)
app.get("/admin/values/cars/add", addCarPage)
app.get("/admin/values/cars/edit/:id", editVehiclePage)
app.get("/admin/values/cars/delete/:id", deleteVehiclePage)
app.post("/admin/values/cars/edit/:id", editVehicle)
app.post("/admin/values/cars/add", addCar)

// Citizen cars
app.get("/citizen/:id/:car-:plate/edit", editVehiclePageCitizen)
app.post("/citizen/:id/:car-:plate/edit", editVehicleCitizen)
app.get("/citizen/:id/:car/delete", deleteVehicleCitizen)
// Car Regestration
app.get("/cars/register", regVehiclePage)
app.post("/cars/register", regVehicle)

// Genders 
app.get("/admin/values/genders", genderPage)
app.get("/admin/values/genders/add", addGenderPage)
app.get("/admin/values/genders/delete/:id", deleteGender)
app.post("/admin/values/genders/add", addGender)
app.get("/admin/values/genders/edit/:id", editGenderPage)
app.post("/admin/values/genders/edit/:id", editGender)

// ethnicities 
app.get("/admin/values/ethnicities", ethnicitiesPage)
app.get("/admin/values/ethnicities/add", addethnicityPage)
app.get("/admin/values/ethnicities/edit/:id", editEthnicityPage)
app.get("/admin/values/ethnicities/delete/:id", deleteEthnicity)
app.post("/admin/values/ethnicities/edit/:id", editethnicity)
app.post("/admin/values/ethnicities/add", addethnicity)

// Weapons
app.get("/admin/values/weapons", weaponsPage)
app.get("/admin/values/weapons/add", addWeaponPage)
app.get("/admin/values/weapons/delete/:id", deleteWeapon)
app.post("/admin/values/weapons/add", addWeapon)
app.get("/admin/values/weapons/edit/:id", editWeaponPage)
app.post("/admin/values/weapons/edit/:id", editWeapon)

// Departments
app.get("/admin/values/depts", deptPage)
app.get("/admin/values/depts/add", addDeptPage)
app.get("/admin/values/depts/edit/:id", editDeptPage)
app.get("/admin/values/depts/delete/:id", deleteDept)
app.post("/admin/values/depts/edit/:id", editDept)
app.post("/admin/values/depts/add", addDept)
// citizen weapons

app.get("/weapon/:id/:weapon/delete", citizenDeleteWeapon)
// Weapon registration
app.get("/weapons/register", regWeaponPage)
app.post("/weapons/register", regWeapon)

// Legal 
app.get("/admin/values/legal", legalPage)
app.get("/admin/values/legal/add", addLegalPage)
app.get("/admin/values/legal/delete/:id", deleteLegal)
app.post("/admin/values/legal/add", addLegal)
app.get("/admin/values/legal/edit/:id", editLegalPage)
app.post("/admin/values/legal/edit/:id", editLegal)


// 404
app.get('/*', (req, res) => {
    res.status(404).render("errors/404.ejs", {
        title: "404 | Equinox CAD",
        isAdmin: "",
        desc: "",
    });
});

async function main() {
    function handleDisconnect() {
        connection = mysql.createConnection(db); // Recreate the connection, since
        // the old one cannot be reused.
        global.connection = connection

        connection.connect(function (err) { // The server is either down
            connection.timeout = 0;
            if (err) { // or restarting (takes a while sometimes).
                console.log('error when connecting to db2:', err);
                setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
            } // to avoid a hot loop, and to allow our node script to
        }); // process asynchronous requests in the meantime.
        connection.on('error - 2', function (err) {
            console.log('db error', err);
            if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
                handleDisconnect(); // lost due to either server restart, or a
            } else { // connnection idle timeout (the wait_timeout
                throw err; // server variable configures this)
            }
        });
        connection.on('error', function (err) {
            console.log('db error - 2', err);
            if (err.code === 'ECONNRESET') { // Connection to the MySQL server is usually
                handleDisconnect(); // lost due to either server restart, or a
            } else { // connnection idle timeout (the wait_timeout
                throw err; // server variable configures this)
            }
        });
    };
    handleDisconnect();
    app.listen(port, () => {
        console.log(`Running on ${port}`)
    });
    setInterval(function () {
        connection.query("SELECT 1", (err, result) => {
            if (err) {
                console.log(err);
            }
        })
    });
}

main();
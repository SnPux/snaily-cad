module.exports = {
    citizenPage: (req, res, next) => {

        if (!req.session.loggedin) {
            res.redirect("/login")
        } else {
            let query = "SELECT * FROM `users` WHERE username = '" + req.session.username2 + "'";
            connection1.query(query, (err, result1) => {
                let query = "SELECT * FROM `citizens` WHERE linked_to = '" + req.session.username2 + "'"
                connection1.query("SELECT * FROM `users`", (err, result1) => {
                    connection.query(query, (err, result) => {
                        if (err) {
                            console.log(err)
                        }
                        res.render("citizens/citizen.ejs", { title: "Citizens", citizen: result, isAdmin: result1[0].admin, message: "", username: req.session.username2 })
                    })
                })
            });

        }


    },
    citizenDetailPage: (req, res) => {
        if (!req.session.loggedin) {
            res.redirect("/login")
        } else {
            let query = "SELECT * FROM `users` WHERE username = '" + req.session.username2 + "'";

            connection1.query(query, (err, result1) => {
                let id = req.params.id;
                let first_name = req.params.first_name;
                let last_name = req.params.last_name;
                // let owner = first_name + " " + last_name;
                let owner = req.params.first_name;
                let query = "SELECT * FROM `citizens` WHERE id = '" + id + "' ";
                let vehiclesQ = "SELECT * FROM `registered_cars` WHERE `owner` = '" + owner + "'"
                let weaponsQ = "SELECT * FROM `registered_weapons` WHERE `owner` = '" + first_name + "'"
                connection.query(`${query}; ${vehiclesQ}; ${weaponsQ}`, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    if (result[0][0].linked_to == req.session.username2) {
                        res.render("citizens/detail-citizens.ejs", { title: "Citizen Detail | Equinox CAD", citizen: result[0], vehicles: result[1], weapons: result[2], isAdmin: result1[0].admin })
                    } else {
                        res.sendStatus(401)
                    }
                });
            });


        }
    },
    addCitizenPage: (req, res) => {
        if (!req.session.loggedin) {
            res.redirect("/login")
        } else {
            let query = "SELECT * FROM `users` WHERE username = '" + req.session.username2 + "'";
            connection1.query(query, (err, result1) => {
                let genderQ = "SELECT * FROM `genders`"
                let ethnicityQ = "SELECT * FROM `ethnicities`"
                let dmvQ = "SELECT * FROM `in_statuses`"
                connection.query(`${genderQ}; ${ethnicityQ}; ${dmvQ}`, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.render("citizens/add-citizen.ejs", { title: "Add Citizen | Equinox CAD", genders: result[0], ethnicities: result[1], dmvs: result[2], isAdmin: result1[0].admin, username: req.session.username2 })

                });
            });


        }
    },
    addCitizen: (req, res) => {
        if (!req.session.loggedin) {
            res.redirect("/login")
        } else {
            let query = "SELECT * FROM `users` WHERE username = '" + req.session.username2 + "'";
            connection1.query(query, (err, result1) => {
                // let first_name = req.body.first_name;
                let first_name = req.body.full_name;
                // let last_name = req.body.last_name;
                let last_name = "Unknown";
                // let full_name = first_name + " " + last_name;
                let full_name = first_name;
                let linked_to = req.session.username2;
                let birth = req.body.birth;
                let gender = req.body.gender;
                let ethnicity = req.body.ethnicity;
                let hair_color = req.body.hair;
                let eyes_color = req.body.eyes;
                let address = req.body.address;
                let height = req.body.height;
                if (height == "") {
                    height = "Unknown"
                }
                let weight = req.body.weight;
                if (weight == "") {
                    weight = "Unknown"
                }
                let dmv = req.body.dmv;
                let fireArms = req.body.fire;
                let pilot = req.body.pilot;



                let query = "INSERT INTO `citizens` ( `first_name`, `last_name`, `full_name`, `linked_to`, `birth`, `gender`, `ethnicity`, `hair`, `eyes`, `address`, `height`, `weight`, `dmv`, `fire_licence`, `pilot_licence`) VALUES ('" + first_name + "','" + last_name + "','" + full_name + "','" + linked_to + "','" + birth + "','" + gender + "','" + ethnicity + "','" + hair_color + "','" + eyes_color + "','" + address + "','" + height + "','" + weight + "', '" + dmv + "', '" + fireArms + "' ,'" + pilot + "')";
                connection.query(query, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect(`/citizen`);
                });
            });

        }
    },
    editCitizenPage: (req, res) => {
        if (!req.session.loggedin) {
            res.redirect("/login")
        } else {
            let query = "SELECT * FROM `users` WHERE username = '" + req.session.username2 + "'";
            connection1.query(query, (err, result1) => {
                let genderQ = "SELECT * FROM `genders`"
                let ethnicityQ = "SELECT * FROM `ethnicities`"
                let dmvQ = "SELECT * FROM `in_statuses`"
                let id = req.params.id;
                let current = "SELECT * FROM `citizens` WHERE `id` = '" + id + "'"

                connection.query(`${genderQ}; ${ethnicityQ}; ${dmvQ}; ${current}`, (err, result) => {
                    if (result[3][0].linked_to == req.session.username2) {
                        res.render("citizens/edit-citizen.ejs", { title: "Edit Citizen | Equinox CAD", genders: result[0], ethnicities: result[1], dmvs: result[2], current: result[3], isAdmin: result1[0].admin, username: result[3] })
                    } else {
                        res.sendStatus(401)
                    }
                    if (err) {
                        console.log(err)
                    }
                });
            });

        }
    },
    editCitizen: (req, res) => {
        if (!req.session.loggedin) {
            res.redirect("/login")
        } else {
            let id = req.params.id
            connection.query("SELECT * FROM citizens WHERE id = '" + id + "'", (err, citiZn) => {
                if (err) {
                    console.log(err)
                    return res.sendStatus(500)
                } else {


                    let first_name = req.body.full_name;
                    // let last_name = req.body.last_name;
                    let last_name = "Unknown";
                    // let full_name = first_name + " " + last_name;
                    let full_name = first_name;
                    let birth = req.body.birth;
                    let gender = req.body.gender;
                    let ethnicity = req.body.ethnicity;
                    let hair_color = req.body.hair;
                    let eyes_color = req.body.eyes;
                    let address = req.body.address;
                    let height = req.body.height;
                    if (height == "") {
                        height = "Unknown"
                    }
                    let weight = req.body.weight;
                    if (weight == "") {
                        weight = "Unknown"
                    }
                    let dmv = req.body.dmv;
                    let fireArms = req.body.fire;
                    let pilot = req.body.pilot
                    let query = 'UPDATE `citizens` SET `first_name` = "' + first_name + '", `last_name` = "' + last_name + '", `full_name` = "' + full_name + '", `birth` = "' + birth + '", `gender` = "' + gender + '", `ethnicity` = "' + ethnicity + '", `hair` = "' + hair_color + '", `eyes` = "' + eyes_color + '", `address` = "' + address + '", `height` = "' + height + '", `weight` = "' + weight + '", `dmv` = "' + dmv + '", `fire_licence` = "' + fireArms + '", `pilot_licence` = "' + pilot + '" WHERE `citizens`.`id` = "' + id + '"';
                    let query2 = 'UPDATE `registered_cars` SET `owner` = "' + full_name + '" WHERE `registered_cars`.`owner` = "' + citiZn[0].full_name + '"';
                    let weapons = 'UPDATE `registered_weapons` SET `owner` = "' + full_name + '" WHERE `registered_weapons`.`owner` = "' + citiZn[0].full_name + '"';
                    connection.query(`${query}; ${query2}; ${weapons}`, (err, result) => {
                        if (err) {
                            console.log(err)
                        }
                        res.redirect(`/citizens/${id}-${first_name}-${last_name}`)
                    })
                }
            })

        }
    },
    deleteCitizens: (req, res) => {
        if (!req.session.loggedin) {
            res.redirect("/login")
        } else {
            let id = req.params.id;
            let query = 'SELECT * FROM citizens WHERE id = "' + id + '"';

            connection.query(query, (err, result) => {
                let vehicles = "DELETE FROM registered_cars WHERE owner = '" + result[0].full_name + "'"
                let weapons = "DELETE FROM registered_weapons WHERE owner = '" + result[0].full_name + "'"
                let citizens = "DELETE FROM citizens WHERE id = '" + id + "'"
                connection.query(`${vehicles}; ${weapons}; ${citizens}`, (err1, result1) => {
                    if (err1) {
                        return res.status(500).send(err);
                    }
                    res.redirect("/citizen")
                });

            });
        }
    },
    companyPage: (req, res) => {
        if (!req.session.loggedin) {
            res.redirect("/login")
        } else {
            let query = "SELECT * FROM `users` WHERE username = '" + req.session.username2 + "'";
            connection1.query(query, (err, result1) => {
                let query2 = "SELECT * FROM businesses";
                let citizen = "SELECT * FROM citizens WHERE linked_to = '" + req.session.username2 + "'"
                connection.query(`${query2}; ${citizen}`, (err, result) => {

                    res.render("citizens/company.ejs", { title: "Edit Citizen | Equinox CAD", isAdmin: result1[0].admin, businesses: result[0], current: result[1] })
                })
            });

        }
    },
    company: (req, res) => {
        let joined_business = req.body.join_business;
        let citizen_name = req.body.citizen_name;
        let query = 'UPDATE `citizens` SET `business` = "' + joined_business + '" WHERE `citizens`.`full_name` = "' + citizen_name + '"';

        connection.query(query, (err, result1) => {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            } else {
                res.redirect(`/citizen/company/${joined_business}`)
                console.log(result1);

            }
        })
    },
    createCompany: (req, res) => {
        let companyName = req.body.companyName;
        let owner = req.body.owner;
        let query = 'INSERT INTO `businesses` (`business_name`, `business_owner`) VALUES  ("' + companyName + '", "' + owner + '")';

        connection.query(query, (err, result1) => {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            } else {
                res.redirect(`/citizen/company/${companyName}`)
                console.log(result1);

            }
        })
    },
    companyDetailPage: (req, res) => {
        res.render("company/main.ejs", { title: req.params.company + "| Equinox CAD", isAdmin: "" })
    }
}
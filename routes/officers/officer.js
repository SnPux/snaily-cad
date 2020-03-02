const fetch = require("node-fetch")
module.exports = {
    officersPage: (req, res, next) => {
        if (req.session.loggedin) {
            let query = "SELECT * FROM `users` WHERE username = '" + req.session.username2 + "'"
            connection1.query(query, (err, result1) => {
                if (result1[0].leo == 'yes') {
                    let qeury = "SELECT * FROM `officers` WHERE linked_to = '" + req.session.username2 + "'"
                    connection.query(qeury, (err, result) => {
                        if (err) {
                            console.log("Error" + err)
                        }
                        res.render("officers-pages/officers.ejs", {
                            title: "Equinox Officers",
                            users: "qsd",
                            isAdmin: result1[0].admin,
                            officers: result
                        });

                    });
                } else {
                    res.sendStatus(403);
                };
            });
        } else {
            res.redirect("/login");
        };
    },
    addOfficerPage: (req, res) => {
        if (req.session.loggedin) {
            let query = "SELECT * FROM `users` WHERE username = '" + req.session.username2 + "'"
            connection1.query(query, (err, result1) => {
                if (result1[0].leo == 'yes') {
                    res.render("officers-pages/add-officers.ejs", { title: "Add Officer | Equinox CAD", isAdmin: result1[0].admin, req: req })
                } else {
                    res.sendStatus(403);
                };
            });
        } else {
            res.redirect("/login");
        };
    },
    addOfficer: (req, res) => {
        if (req.session.loggedin) {
            let query = "SELECT * FROM `users` WHERE username = '" + req.session.username2 + "'"
            connection1.query(query, (err, result1) => {
                if (result1[0].leo == 'yes') {
                    let officer_name = req.body.officer_name;
                    let dept = req.body.dept;
                    let query = "INSERT INTO `officers` ( `officer_name`,`officer_dept`,`linked_to`) VALUES ('" + officer_name + "','" + dept + "','" + req.session.username2 + "')";

                    connection.query(query, (err, result) => {
                        if (err) {
                            return res.sendStatus(500)
                        } else {
                            res.redirect("/myofficers")
                        }
                    })
                } else {
                    res.sendStatus(403);
                };
            });
        } else {
            res.redirect("/login");
        };
    },
    penalCodesPage: (req, res) => {
        if (req.session.loggedin) {
            let query = "SELECT * FROM `users` WHERE username = '" + req.session.username2 + "'"
            connection1.query(query, (err, result) => {
                if (result[0].leo == 'yes') {
                    const url = "http://95.179.141.103:3000";
                    fetch(url)
                        .then(res => res.json())
                        .then(json => res.render("officers-pages/penal-codes.ejs", {
                            title: "Penal Codes | Equinox CAD",
                            penals: json,
                            isAdmin: result[0].admin
                        }))
                } else {
                    res.sendStatus(403);
                };
            });
        } else {
            res.redirect("/login")
        }
    },
    officersDash: (req, res) => {
        if (req.session.loggedin) {
            let query = "SELECT * FROM `users` WHERE username = '" + req.session.username2 + "'"
            connection1.query(query, (err, result) => {
                if (result[0].leo == 'yes') {
                    res.render("officers-pages/officers-dash.ejs", {
                        title: "Police Department",
                        isAdmin: result[0].admin
                    })
                } else {
                    res.sendStatus(403);
                };
            });
        } else {
            res.redirect("/login")
        }
    },
    searchPlatePage: (req, res) => {
        if (req.session.loggedin) {
            let query = "SELECT * FROM `users` WHERE username = '" + req.session.username2 + "'"
            connection1.query(query, (err, result1) => {
                if (result1[0].leo == 'yes') {
                    let query = "SELECT * FROM `registered_cars` ORDER by id ASC"
                    connection.query(query, (err, result) => {
                        res.render("officers-pages/plate.ejs", {
                            title: "Plate Search | Police Department",
                            isAdmin: result1[0].admin,
                            plates: result
                        })
                    })
                } else {
                    res.sendStatus(403);
                };
            });
        } else {
            res.redirect("/login")
        }
    },
    searchNamePage: (req, res) => {
        if (req.session.loggedin) {
            let query = "SELECT * FROM `users` WHERE username = '" + req.session.username2 + "'"
            connection1.query(query, (err, result1) => {
                if (result1[0].leo == 'yes') {
                    let query = "SELECT * FROM `citizens` ORDER by id ASC"

                    connection.query(query, (err, result) => {
                        res.render("officers-pages/name.ejs", {
                            title: "Name Search | Police Department",
                            isAdmin: result1[0].admin,
                            information: result
                        })

                    })
                } else {
                    res.sendStatus(403);
                };
            });
        } else {
            res.redirect("/login")
        };
    },
    plateResultsPage: (req, res) => {
        if (req.session.loggedin) {
            let query = "SELECT * FROM `users` WHERE username = '" + req.session.username2 + "'"
            connection1.query(query, (err, result1) => {
                if (result1[0].leo == 'yes') {
                    let id = req.params.id;
                    let query = "SELECT * FROM `registered_cars` WHERE id = '" + id + "' ";
                    let getOwner = req.params.owner;
                    // let owner = getOwner.split(" ");
                    // let first_name = owner[0];
                    // let last_name = owner[1];

                    let query2 = "SELECT * FROM `citizens` WHERE full_name = '" + getOwner + "'"

                    connection.query(`${query}; ${query2};`, (err, result) => {
                        if (err) {
                            return res.status(404).send(err);
                        }

                        res.render("officers-pages/plate-results.ejs", {
                            title: "Plate Results | Police Department",
                            isAdmin: result1[0].admin,
                            plates: result[0][0],
                            name: result[1][0]
                        })
                    });
                } else {
                    res.sendStatus(403);
                };
            });
        } else {
            res.redirect("/login")
        }
    },
    nameResultsPage: (req, res) => {
        if (req.session.loggedin) {
            let query = "SELECT * FROM `users` WHERE username = '" + req.session.username2 + "'"
            connection1.query(query, (err, result1) => {
                if (result1[0].leo == 'yes') {
                    let id = req.params.id;
                    let first_name = req.params.first_name;
                    let last_name = req.params.last_name;
                    let owner = req.params.first_name;
                    let chargeQ = "SELECT * FROM `posted_charges` WHERE `name` = '" + owner + "'";
                    let vehiclesQ = "SELECT * FROM `registered_cars` WHERE `owner` = '" + owner + "'";
                    let weaponsQ = "SELECT * FROM `registered_weapons` WHERE `owner` = '" + owner + "'";
                    let query = "SELECT * FROM `citizens` WHERE id = '" + id + "' ";
                    let warrantsQ = "SELECT * FROM `warrants` WHERE name = '" + owner + "'";


                    connection.query(`${query}; ${vehiclesQ}; ${weaponsQ}; ${chargeQ}; ${warrantsQ}`, (err, result) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        res.render("officers-pages/name-results.ejs", {
                            title: "Name Results | Police Department",
                            isAdmin: result1[0].admin,
                            result: result[0][0],
                            vehicles: result[1],
                            weapons: result[2],
                            charges: result[3],
                            warrants: result[4]
                        })
                    });
                } else {
                    res.sendStatus(403);
                };
            });
        } else {
            res.redirect("/login");
        };
    },
    officerApplyPage: (req, res) => {
        res.render("officers-pages/apply.ejs", {
            title: "Apply | Equinox CAD",
            isAdmin: req.session.isAdmin
        })
    },
    officerApply: (req, res) => {
        res.redirect("/")
        let dUsername = req.body.dUsername;
        let q1 = req.body.q1;
        let q2 = req.body.q2;
        let q3 = req.body.q3;
        let q4 = req.body.q4;
        let q5 = req.body.q5;
        // 643417616337207296 << Testing channel
        // 679698348730482689 << app channel - Equinox Roleplay
        let embed = new Discord.RichEmbed()
            .setTitle(`New Police Application From ${dUsername}`)
            .setColor("0000FF")
            .addField("**What inspired you to apply?**", q1)
            .addField("**Do you have previous experience as an officer?**", q2)
            .addField("**Which department you looking to apply to?**", q3)
            .addField("**Are you over 16?**", q4)
            .addField("**Do you agree that you will be on duty once a week as a minimal requirement?**", q5)
        bot.channels.get("679712964374167560").send(embed)
        // .then(async (embedMsg, message) => {
        //     embedMsg.react("✅").then(r => {
        //         embedMsg.react("❌")
        //         let approved = embedMsg.createReactionCollector((reaction, user) => reaction.emoji.name === '✅' && user.id !== bot.user.id);
        //         let declined = embedMsg.createReactionCollector((reaction, user) => reaction.emoji.name === '❌' && user.id !== bot.user.id);

        //         approved.on('collect', r => {
        //             bot.channels.get("643417616337207296").send(`${dUsername} Was Declined`)
        //         });

        //         declined.on("collect", r => {
        //             bot.channels.get("643417616337207296").send(`${dUsername} Was Declined`)

        //         });
        //     })
        // })
        // await message.react("😄")
    },
    addOffencePage: (req, res) => {

        if (req.session.loggedin) {
            let query = "SELECT * FROM `users` WHERE username = '" + req.session.username2 + "'"
            connection1.query(query, (err, result) => {
                if (result[0].leo == 'yes') {
                    const url = "http://95.179.141.103:3000";
                    fetch(url)
                        .then(res => res.json())
                        .then(json => res.render("officers-pages/add-offence.ejs", {
                            title: "Add Offence | Equinox CAD",
                            penals: json,
                            isAdmin: result[0].admin,
                            req: req
                        }))
                } else {
                    res.sendStatus(403);
                };
            });
        } else {
            res.redirect("/login")
        }
    },
    addOffence: (req, res) => {
        if (req.session.loggedin) {
            let query = "SELECT * FROM `users` WHERE username = '" + req.session.username2 + "'"
            connection1.query(query, (err, result) => {
                if (result[0].leo == 'yes') {

                    let name = req.body.name;
                    let offence = req.body.offence;
                    let date = req.body.date;
                    let officer_name = req.body.officer_name;
                    let notes = req.body.notes;
                    if (notes == "") {
                        notes = "None"
                    }

                    let query = "INSERT INTO `posted_charges` ( `name`, `charge`, `notes`, `officer_name`, `date`) VALUES ('" + name + "','" + offence + "','" + notes + "','" + officer_name + "','" + date + "')";
                    connection.query(query, (err, result) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        res.redirect(`/officers/dash/search/person-name`);
                    });
                } else {
                    res.sendStatus(403);
                };
            });
        } else {
            res.redirect("/login")
        }
    },
    addWarrantPage: (req, res) => {
        if (req.session.loggedin) {
            let query = "SELECT * FROM `users` WHERE username = '" + req.session.username2 + "'"
            connection1.query(query, (err, result) => {
                if (result[0].leo == 'yes') {
                    res.render("officers-pages/warrant.ejs", { title: "Add Warrant | Equinox CAD", isAdmin: result[0].admin, req: req })
                } else {
                    res.sendStatus(403);
                };
            });
        } else {
            res.redirect("/login")
        }
    },
    addWarrant: (req, res) => {
        if (req.session.loggedin) {
            let query = "SELECT * FROM `users` WHERE username = '" + req.session.username2 + "'"
            connection1.query(query, (err, result) => {
                if (result[0].leo == 'yes') {
                    let name = req.body.name;
                    let d_from = req.body.d_from;
                    let d_to = req.body.d_to;
                    let reason = req.body.reason
                    let query = "INSERT INTO `warrants` ( `name`, `reason`, `d_from`, `d_to`) VALUES ('" + name + "','" + reason + "','" + d_from + "','" + d_to + "')";

                    connection.query(query, (err, result) => {
                        if (err) {
                            return res.sendStatus(500).send("Something went wrong in the response."), console.log(err)
                        } else {
                            res.redirect(`/officers/dash/search/person-name`)
                        }

                    })
                } else {
                    res.sendStatus(403);
                };
            });
        } else {
            res.redirect("/login")
        }
    },
    suspendLicensePlate: (req, res) => {
        let id = req.params.id
        let query = "SELECT * FROM `citizens` WHERE id = '" + id + "'";
        let query2 = "UPDATE `citizens` SET `dmv` = 'Suspended' WHERE `citizens`.`id` = '" + id + "'"
        connection.query(query, (err, result1) => {
            connection.query(query2, (err, result) => {
                if (err) {
                    console.log(err)
                    return res.sendStatus(500);
                } else {
                    res.redirect("/officers/dash/search/plate/")
                }
            })
        })
    },
    suspendLicenseName: (req, res) => {
        let id = req.params.id;
        let query = "SELECT * FROM `citizens` WHERE id = '" + id + "'";
        let query2 = "UPDATE `citizens` SET `dmv` = 'Suspended' WHERE `citizens`.`id` = '" + id + "'"
        connection.query(query, (err, result1) => {
            connection.query(query2, (err, result) => {
                if (err) {
                    console.log(err)
                    return res.sendStatus(500);
                } else {
                    res.redirect("/officers/dash/search/person-name/")
                }
            })
        })
    },
}
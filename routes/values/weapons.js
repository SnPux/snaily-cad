module.exports = {
    weaponsPage: (req, res) => {
        if (req.session.loggedin) {
            let query2 = "SELECT cadID FROM `users` WHERE cadID = '" + req.params.cadID + "'"

            connection1.query(query2, (err, result2) => {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                } else {
                    if (result2[0]) {

                        let query = "SELECT * FROM `users` WHERE username = '" + req.session.username2 + "'"
                        connection1.query(query, (err, result1) => {
                            if (result1[0].admin == 'moderator' || result1[0].admin == 'admin' || result1[0].admin == 'owner') {
                                let query = "SELECT * FROM `weapons` WHERE `cadID` = '" + req.params.cadID + "'  ORDER BY id ASC"
                                connection.query(query, (err, result) => {
                                    if (err) {
                                        res.sendStatus(400)
                                    }
                                    res.render("admin-pages/weapons.ejs", { title: 'Admin Panel | Weapons', weapons: result, isAdmin: result1[0].admin, cadId: result2[0].cadID })
                                })
                            } else {
                                res.sendStatus(403)
                            }
                        })
                    } else {
                        res.sendStatus(404)
                    }
                }
            })


        } else {
            let query2 = "SELECT cadID FROM `users` WHERE cadID = '" + req.params.cadID + "'"

            connection1.query(query2, (err, result2) => {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                } else {
                    if (result2[0]) {
                        res.redirect(`/cad/${result2[0].cadID}/login`)
                    } else {
                        res.sendStatus(404)
                    }
                }
            })
        }
    },
    deleteWeapon: (req, res) => {
        if (req.session.loggedin) {
            let query2 = "SELECT cadID FROM `users` WHERE cadID = '" + req.params.cadID + "'"

            connection1.query(query2, (err, result2) => {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                } else {
                    if (result2[0]) {
                        let query = "SELECT * FROM `users` WHERE username = '" + req.session.username2 + "'"
                        connection1.query(query, (err, result) => {
                            if (result[0].admin == 'moderator' || result[0].admin == 'admin' || result[0].admin == 'owner') {
                                let playerId = req.params.id;
                                // let getImageQuery = 'SELECT image from `players` WHERE id = "' + playerId + '"';
                                let deleteUserQuery = 'DELETE FROM weapons WHERE id = "' + playerId + '"';

                                connection.query(deleteUserQuery, (err, result) => {
                                    if (err) {
                                        return res.status(500).send(err);
                                    }
                                    res.redirect(`/cad/${result2[0].cadID}/admin/values/weapons`)
                                });
                            } else {
                                res.sendStatus(403)
                            }
                        })
                    } else {
                        res.sendStatus(404)
                    }
                }
            })

        } else {
            let query2 = "SELECT cadID FROM `users` WHERE cadID = '" + req.params.cadID + "'"

            connection1.query(query2, (err, result2) => {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                } else {
                    if (result2[0]) {
                        res.redirect(`/cad/${result2[0].cadID}/login`)
                    } else {
                        res.sendStatus(404)
                    }
                }
            });

        }
    },
    addWeaponPage: (req, res) => {
        if (req.session.loggedin) {
            let query2 = "SELECT cadID FROM `users` WHERE cadID = '" + req.params.cadID + "'"

            connection1.query(query2, (err, result2) => {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                } else {
                    if (result2[0]) {
                        let query = "SELECT * FROM `users` WHERE username = '" + req.session.username2 + "'"
                        connection1.query(query, (err, result1) => {
                            if (result1[0].admin == 'moderator' || result1[0].admin == 'admin' || result1[0].admin == 'owner') {
                                res.render("weapons/add-weapons.ejs", { title: "Add Weapon", isAdmin: result1[0].admin, cadId: result2[0].cadID })
                            } else {
                                res.sendStatus(403)
                            }
                        })
                    } else {
                        res.sendStatus(404)
                    }
                }
            })



        } else {
            let query2 = "SELECT cadID FROM `users` WHERE cadID = '" + req.params.cadID + "'"

            connection1.query(query2, (err, result2) => {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                } else {
                    if (result2[0]) {
                        res.redirect(`/cad/${result2[0].cadID}/login`)
                    } else {
                        res.sendStatus(404)
                    }
                }
            })


        }
    },
    addWeapon: (req, res) => {
        if (req.session.loggedin) {
            let query2 = "SELECT cadID FROM `users` WHERE cadID = '" + req.params.cadID + "'"

            connection1.query(query2, (err, result2) => {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                } else {
                    if (result2[0]) {
                        let query = "SELECT * FROM `users` WHERE username = '" + req.session.username2 + "'"
                        connection1.query(query, (err, result) => {
                            if (result[0].admin == 'moderator' || result[0].admin == 'admin' || result[0].admin == 'owner') {
                                let name = req.body.name;
                                let cadId = req.params.cadID

                                let query = "INSERT INTO `weapons` (`name`, `cadID`) VALUES ('" + name + "', '" + cadId + "')";
                                connection.query(query, (err, result) => {
                                    if (err) {
                                        return res.status(500).send(err);
                                    }
                                    res.redirect(`/cad/${result2[0].cadID}/admin/values/weapons`);
                                });
                            } else {
                                res.sendStatus(403);
                            };
                        });
                    } else {
                        res.sendStatus(404);
                    };
                };
            });
        } else {
            let query2 = "SELECT cadID FROM `users` WHERE cadID = '" + req.params.cadID + "'";

            connection1.query(query2, (err, result2) => {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                } else {
                    if (result2[0]) {
                        res.redirect(`/cad/${result2[0].cadID}/login`);
                    } else {
                        res.sendStatus(404);
                    };
                };
            });
        };
    },
    editWeaponPage: (req, res) => {
        if (req.session.loggedin) {
            let query2 = "SELECT cadID FROM `users` WHERE cadID = '" + req.params.cadID + "'";
            connection1.query(query2, (err, result2) => {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                } else {
                    if (result2[0]) {
                        let query = "SELECT * FROM `users` WHERE username = '" + req.session.username2 + "'";
                        connection1.query(query, (err, result1) => {
                            if (result1[0].admin == 'moderator' || result1[0].admin == 'admin' || result1[0].admin == 'owner') {
                                let genderId = req.params.id;
                                let query = "SELECT * FROM `weapons` WHERE id = '" + genderId + "' ";
                                connection.query(query, (err, result) => {
                                    if (err) {
                                        return res.status(500).send(err);
                                    }
                                    res.render("weapons/edit-weapon.ejs", { title: "Edit Gender", weapon: result[0], isAdmin: result1[0].admin, cadId: result2[0].cadID });
                                });
                            } else {
                                res.sendStatus(403);
                            };
                        });
                    } else {
                        res.sendStatus(404);
                    };
                };
            });
        } else {
            let query2 = "SELECT cadID FROM `users` WHERE cadID = '" + req.params.cadID + "'"

            connection1.query(query2, (err, result2) => {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                } else {
                    if (result2[0]) {
                        res.redirect(`/cad/${result2[0].cadID}/login`)
                    } else {
                        res.sendStatus(404)
                    }
                }
            })


        };
    },
    editWeapon: (req, res) => {
        if (req.session.loggedin) {
            let query2 = "SELECT cadID FROM `users` WHERE cadID = '" + req.params.cadID + "'";
            connection1.query(query2, (err, result2) => {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                } else {
                    if (result2[0]) {
                        let query = "SELECT * FROM `users` WHERE username = '" + req.session.username2 + "'";
                        connection1.query(query, (err, result) => {
                            if (result[0].admin == 'moderator' || result[0].admin == 'admin' || result[0].admin == 'owner') {
                                let genderId = req.params.id;
                                let name = req.body.name;
                                let query = 'UPDATE `weapons` SET `name` = "' + name + '" WHERE `weapons`.`id` = "' + genderId + '"';

                                connection.query(query, (err, result) => {
                                    if (err) {
                                        console.log(err)
                                        return res.status(500).send(err);
                                    };
                                    res.redirect(`/cad/${result2[0].cadID}/admin/values/weapons`);
                                });
                            } else {
                                res.sendStatus(403);
                            };
                        });
                    } else {
                        res.sendStatus(404);
                    };
                };
            });
        } else {
            let query2 = "SELECT cadID FROM `users` WHERE cadID = '" + req.params.cadID + "'"

            connection1.query(query2, (err, result2) => {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                } else {
                    if (result2[0]) {
                        res.redirect(`/cad/${result2[0].cadID}/login`)
                    } else {
                        res.sendStatus(404)
                    }
                }
            })


        }
    },
    regWeaponPage: (req, res) => {
        if (!req.session.loggedin) {

            let query2 = "SELECT cadID FROM `users` WHERE cadID = '" + req.params.cadID + "'"

            connection1.query(query2, (err, result2) => {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                } else {
                    if (result2[0]) {
                        res.redirect(`/cad/${result2[0].cadID}/login`)
                    } else {
                        res.sendStatus(404)
                    }
                }
            })


        } else {
            let query2 = "SELECT cadID FROM `users` WHERE cadID = '" + req.params.cadID + "'"

            connection1.query(query2, (err, result2) => {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500)
                } else {
                    let query = "SELECT * FROM `users` WHERE username = '" + req.session.username2 + "'";
                    connection1.query(query, (err, result1) => {
                        let weapons = "SELECT * FROM `weapons` ORDER BY id ASC"
                        let citizens = "SELECT * FROM `citizens`"
                        let wStatusess = "SELECT * FROM `in_statuses` ORDER BY id ASC"
                        let ownerQ = "SELECT * FROM `citizens` WHERE linked_to = '" + req.session.username2 + "'"

                        connection.query(`${weapons}; ${citizens}; ${wStatusess}; ${ownerQ}`, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.render("weapons/reg-weapons.ejs", { title: "Weapon Registration", weapons: result[0], status: result[2], owners: result[1], isAdmin: result1[0].admin, name: req.session.username2, owner: result[3], cadId: result2[0].cadID })
                        });
                    });
                }
            })


        }
    },
    regWeapon: (req, res) => {
        if (!req.session.loggedin) {
            let query2 = "SELECT cadID FROM `users` WHERE cadID = '" + req.params.cadID + "'"

            connection1.query(query2, (err, result2) => {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                } else {
                    if (result2[0]) {
                        res.redirect(`/cad/${result2[0].cadID}/login`)
                    } else {
                        res.sendStatus(404)
                    }
                }
            })


        } else {
            function makeid(length) {
                var result = '';
                var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
                var charactersLength = characters.length;
                for (var i = 0; i < length; i++) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                return result;
            }
            // let owner = req.body.owner;
            let owner = req.body.owner;
            let weapon = req.body.weapon;
            let status = req.body.status;
            let serial_number = makeid(10)

            let query = "INSERT INTO `registered_weapons` (`owner`, `weapon`, `serial_number`, `status`, `cadID`, `linked_to`) VALUES ('" + owner + "', '" + weapon + "', '" + serial_number + "', '" + status + "', '" + req.params.cadID + "', '" + req.session.username2 + "')";


            connection.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }

                let query2 = "SELECT cadID FROM `users` WHERE cadID = '" + req.params.cadID + "'"

                connection1.query(query2, (err, result2) => {
                    if (err) {
                        console.log(err);
                        return res.sendStatus(500);
                    } else {
                        if (result2[0]) {
                            res.redirect(`/cad/${result2[0].cadID}/citizen`)
                        } else {
                            res.sendStatus(404)
                        }
                    }
                })
            });
        };
    },
    citizenDeleteWeapon: (req, res) => {
        if (!req.session.loggedin) {
            let query2 = "SELECT cadID FROM `users` WHERE cadID = '" + req.params.cadID + "'";
            connection1.query(query2, (err, result2) => {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                } else {
                    if (result2[0]) {
                        res.redirect(`/cad/${result2[0].cadID}/login`);
                    } else {
                        res.sendStatus(404);
                    };
                };
            });
        } else {
            let carID = req.params.weapon;
            let query = "DELETE FROM `registered_weapons` WHERE id = '" + carID + "' AND `cadID` = '" + req.params.cadID + "' ";

            connection.query(query, (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500)
                } else {
                    let query2 = "SELECT cadID FROM `users` WHERE cadID = '" + req.params.cadID + "'"
                    connection1.query(query2, (err, result2) => {


                        if (err) {
                            console.log(err);
                            return res.sendStatus(500);
                        } else {
                            if (result2[0]) {
                                let query2 = "SELECT cadID FROM `users` WHERE cadID = '" + req.params.cadID + "'";
                                connection1.query(query2, (err, result2) => {
                                    if (err) {
                                        console.log(err);
                                        return res.sendStatus(500);
                                    } else {
                                        if (result2[0]) {
                                            let query = "SELECT * FROM `users` WHERE username = '" + req.session.username2 + "'";
                                            connection1.query(query, (err, result1) => {
                                                let query = "SELECT * FROM `citizens` WHERE linked_to = '" + req.session.username2 + "' AND cadID = '" + req.params.cadID + "'";
                                                let query2 = "SELECT cad_name FROM `cads` WHERE `cadID` = '" + req.params.cadID + "'";
                                                let query3 = "SELECT * FROM `users`";
                                                let query4 = "SELECT * FROM `cads` WHERE `cadID` = '" + req.params.cadID + "'"
                                                connection1.query(`${query3}; ${query2}; ${query4}`, (err, result4) => {
                                                    connection.query(`${query}`, (err, result) => {
                                                        if (err) {
                                                            console.log(err);
                                                        };
                                                        res.render("citizens/citizen.ejs", { title: "Citizens | SnailyCAD", citizen: result, isAdmin: result1[0].admin, message: "Weapon Successfully removed", username: req.session.username2, cadId: result2[0].cadID, cadName: result4[1][0].cad_name, aop: result4[2][0].AOP });
                                                    });
                                                });
                                            });
                                        } else {
                                            res.send("CAD not found");
                                        };
                                    };
                                });
                            } else {
                                res.sendStatus(404);
                            };
                        };
                    });
                };
            });
        };
    }
};
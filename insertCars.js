const mysql = require('mysql');

let db = mysql.createConnection({
    host: "95.179.141.103",
    user: "root",
    password: '7{aH$mkLP@vfpW-!',
    database: 'equinox_cad'
});

const cars = [
    "2001 Chevrolet Corvette C5 Z06",
    "1983 Dacia 1310 Sport Coupe",
    "2020 Chevrolet Corvette",
    "1988 Lamborghini Countach",
    "1996 Chevrolet Impala SS",
    "1976 Ford Gran Torino",
    "1978 JoBuilt Hauler 270",
    "1983 Customs Peterbilt Show Hauler",
    "2014 Suzuki GSXR1000",
    "2016 Kawasaki KX250F",
    "2013 Ferrari GTO 599XX",
    "2019 Bugatti Divo",
    "1959 Cadillac Eldorado Biarritz Convertible",
    "1992 Honda Nsx TypeR",
    "1976 Lamborghini Jarama",
    "1988 Lamborghini Jalpa",
    "2001 Lamborghini Diablo GTR",
    "1997 Lamborghini Diablo SV",
    "1986 Chevrolet K30",
    "Volvo S60",
    "2019 Volvo XC60",
    "2019 Volvo XC90",
    "2020 Volvo XC40",
    "Volvo V60 Polstar",
    "Volvo V60",
    "2020 Chevrolet Silverado Z71",
    "1986 Chevrolet C10",
    "1986 Kawasaki Eliminator ZL400",
    "1969 Dodge Charger R/T",
    "1975 Chrysler New Yorker Brougham",
    "2017 BMW 760M",
    "1959 Chevrolet Impala",
    "2013 Chevrolet Caprice",
    "2013 Chevrolet Tahoe",
    "2014 Ford Explorer",
    "2019 Porsche 911 GT3 RS",
    "2017 Chevrolet Impala LTZ",
    "2013 Ford Mustang Cobra",
    "1970 Chevrolet Chevelle SS",
    "2011 Benefactor Serrano",
    "2017 Benefactor Streiter",
    "2014 Dodge Charger SRT8",
    "2012 Benefactor Surano",
    "1957 Benefactor Stirling GT",
    "2016 Dodge Charger SE",
    "2016 Dodge Charger R/T",
    "2010 Benefactor Terrorbyte",
    "2007 Benefactor XLS",
    "2006 Dodge Charger",
    "2016 Dodge Charger SRT8",
    "2016 Dodge Charger Hellcat",
    "2016 Dodge Charger PPV",
    "2011 Ford C.V.P.I.",
    "1969 Pontiac Firebird Trans-Am",
    "2012 Cheval Fugitive",
    "2001 Lamborghini Diablo VT",
    "Volvo C30 R-Design",
    "2012 Vapid scout",
    "2016 Mercedes-Benz A45 AMG",
    "1987 JoBuilt Phantom",
    "1987 Chevrolet Silverado",
    "2018 Jaguar XE SV (Project 8)",
    "2017 Chevrolet Silverado",
    "2015 RAM 2500",
    "2006 Dodge Charger SRT8",
    "2013 Benefactor Dubsta",
    "2013 Benefactor Dubsta 6x6",
    "1976 Benefactor Glendale",
    "2017 Benefactor Krieger",
    "2013 Benefactor Panto",
    "2007 Benefactor XLS (Armored)",
    "2015 Benefactor Schafter LWB",
    "2010 Benefactor Schafter V12 (Armored)",
    "2010 Benefactor Schafter V12",
    "2010 Benefactor Schafter",
    "2015 Benefactor Schafter LWB (Armored)",
    "2010 Benefactor Schwartzer",
    "2010 Bravado Buffalo",
    "2014 Bravado Buffalo S",
    "2000 Bravado Banshee",
    "2002 Bravado Banshee 900R",
    "2009 Bravado Bison",
    "1946 Bravado Duneloader",
    "2010 Bravado Guantlet",
    "1970 Bravado Gauntlet Classic",
    "2019 Bravado Gauntlet Hellfire",
    "2013 Bravado Gresley",
    "2008 Bravado Paradise",
    "1940 Bravado Rat-Loader",
    "1940 Bravado Rat-Truck",
    "2010 Bravado Redwood Gauntlet",
    "2008 Bravado Rumpo",
    "2012 Bravado Rumpo Custom",
    "2014 Bravado Sprunk Buffalo",
    "2005 Bravado Verlierer",
    "2000 Bravado Youga",
    "1968 Bravado Youga Classic",
    "2001 Vapid Benson",
    "1965 Vapid Blade",
    "1987 Vapid Bobcat XL",
    "2003 Vapid Bullet",
    "2015 Vapid Caracara 4x4",
    "1965 Vapid Chino Custom",
    "2011 Benefactor Feltzer",
    "2014 Benefactor Schlagen GT",
    "1964 Vapid Chino",
    "1951 Vapid Clique",
    "2013 Vapid Contender",
    "2014 Vapid Dominator",
    "2016 Vapid Dominator GTX",
    "1967 Vapid Ellie",
    "2016 Vapid Flash GT",
    "2017 Vapid FMJ",
    "1985 Vapid GB200",
    "2015 Vapid Guardian",
    "1920 Vapid Hotknife",
    "1933 Vapid Hustler",
    "1956 Vapid Slamvan",
    "2006 Vapid Minivan",
    "2007 Vapid Minivan Custom",
    "1957 Vapid Peyote",
    "1957 Vapid Peyote Gasser",
    "2008 Vapid Radius",
    "1975 Vapid Retinue MK I",
    "1975 Vapid Retinue MK II",
    "2017 Vapid Riata",
    "2008 Vapid Sadler",
    "2012 Vapid Sandking SWB",
    "2014 Vapid Sandking XL",
    "2003 Vapid Speedo",
    "1997 Vapid Stainer",
    "2011 Vapid Stainer",
    "2016 Dodge Charger SXT",
    "2016 Dodge Charger Scat Pack",
    "2002 Enus Cognoscenti",
    "2002 Enus Cognoscenti (Armored)",
    "2004 Enus Cognoscenti 55",
    "2004 Enus Cognoscenti 55 (Armored)",
    "2008 Enus Cognoscenti Cabrio",
    "2012 Enus Huntley S",
    "2018 Enus Paragon R",
    "2018 Enus Paragon R (Armored)",
    "1955 Enus Stafford",
    "2007 Enus Super Diamond",
    "2014 Enus Windsor",
    "2010 Enus Windsor Drop",
    "2013 Fathom FQ2",
    "2002 Gallivanter Baller",
    "2013 Gallivanter Baller",
    "2015 Gallivanter Baller LE",
    "2015 Gallivanter Baller LE (Armored)",
    "2017 Gallivanter Baller LWB",
    "2011 Declasse Asea",
    "1969 Declasse Stallion",
    "1995 Declasse Burrito",
    "1965 Declasse Tampa",
    "2009 Declasse Granger",
    "1967 Declasse Impaler",
    "1966 Declasse Mamba",
    "1985 Declasse Moonbeam",
    "2007 Declasse Premier",
    "1980 Declasse Rancher XL",
    "1975 Declasse Rhapsody",
    "1957 Declasse Tornado",
    "1972 Declasse Tulip",
    "1974 Declasse Vamos",
    "1963 Declasse Voodoo",
    "1968 Declasse Vigero",
    "1970 Declasse Yosemite",
    "2006 Bollokan Prairie",
    "1998 Chariot Romero",
    "2015 Audi RS6",
    "2008 Subaru Impreza WRX STI",
    "1978 DeClasse Saber Turbo",
    "2011 BMW 750li",
    "2018 Lamborghini Urus",
    "2019 Ford Shelby Mustang GT500",
    "2006 BMW X5",
    "2018 Dodge Charger PPV",
    "2016 Ford Explorer PI",
    "1980 Jobuilt Hauler",
    "1990 MTL Packer",
    "2017 Corvette C7",
    "2015 Pfister Neon",
    "2019 Pfister Neon",
    "1996 Pegassi Infernus Classic",
    "1988 Pegassi Torero",
    "1984 Grotti Cheetah Classic",
    "1959 Invetero Coquette Blackfin",
    "2011 Subaru Impreza WRX STI Limited Sport Tech",
    "1987 Buick GNX",
    "1970 Schyster Deviant",
    "2006 Schyster Fusilade",
    "1975 Zirconium Journey",
    "1995 Zirconium Stratum",
    "1986 Willard Faction",
    "2013 Western Bagger",
    "1970 Western Cliffhanger",
    "2000 Western Daemon",
    "1928 Western Gargoyle",
    "2013 Western Nightblade",
    "2000 Western Rat Bike",
    "2014 Western Sovereign",
    "2000 Western Wolfsbane",
    "2003 Western Zombie Chopper",
    "2003 Western Zombie Bobber",
    "1957 Weeny Dynasty",
    "2006 Weeny Issi",
    "1970 Weeny Issi Classic",
    "2018 Weeny Issi Sport",
    "1966 Vulcar Fagaloa",
    "1990 Vulcar Ingot",
    "1980 Vulcar Nebula Turbo",
    "2017 Gallivanter Baller LWB (Armored)",
    "1970 Vulcar Warrener",
    "2018 Vysser Neo",
    "2003 Übermacht Oracle",
    "2007 Übermacht Oracle XS",
    "2019 Übermacht Rebla GTS",
    "2016 Übermacht Revolter",
    "2018 Übermacht SC1",
    "2009 Übermacht Sentinel",
    "1988 Übermacht Sentinel Classic",
    "2008 Übermacht Sentinel XS",
    "2011 Übermacht Zion",
    "2013 Übermacht Zion Cabrio",
    "1989 Übermacht Zeon Classic",
    "2013 Truffade Adder",
    "2016 Truffade Nero",
    "2020 Truffade Thrax",
    "1940 Truffade Z-Type",
    "2005 Shitzu Defiler",
    "2014 Shitzu Hakuchou",
    "2015 Shitzu Hakuchou Drag",
    "2013 Shitzu PCJ-600",
    "2015 Shitzu Vader",
    "1975 Rune Cheburek",
    "2019 Progen Emerus",
    "1998 Progen GP1",
    "2015 Progen Itali GTB",
    "2014 Progen T20",
    "1996 Progen Tyrus",
    "2018 Principe Deveste Eight",
    "2015 Principe Diablous",
    "2013 Principe Lectro",
    "2010 Principe Nemesis",
    "2015 Pfister 811",
    "2006 Pfister Comet",
    "1972 Pfister Comet Retro Custom",
    "1983 Pfister Comet Safari",
    "2012 Pfister Comet SR",
    "1970 Pegassi Faggio",
    "2014 Pegassi Bati 801",
    "2013 Pegassi BatiRR",
    "1976 Pegassi Eskey",
    "2010 Pegassi Faggio Sport",
    "1991 Pegassi FCR 1000",
    "2002 Pegassi Infernus",
    "1973 Pegassi Monroe",
    "2017 Pegassi Osiris",
    "2018 Pegassi Reaper",
    "2010 Pegassi Ruffian",
    "2016 Pegassi Tempesta",
    "2017 Pegassi Tezeract",
    "1980 Pegassi Torero",
    "2018 Pegassi Toros",
    "2013 Pegassi Vacca",
    "2014 Pegassi Vortex",
    "2012 Pegassi Zentorno",
    "2020 Pegassi Zorrusso",
    "2016 Överflöd Autarch",
    "2006 Överflöd Entity XF",
    "2015 Överflöd Entitiy XXR",
    "2020 Överflöd Imorgon",
    "2016 Överflöd Tyrant",
    "1995 Ocelot Ardent",
    "2015 Ocelot F620",
    "2012 Ocelot Jackal",
    "2018 Ocelot Jugular",
    "2016 Ocelot Locust",
    "2013 Ocelot Lynx",
    "2007 Ocelot Paraiah",
    "1994 Ocelot Penetrator",
    "1980 Ocelot Sromberg",
    "1966 Ocelot Swinger",
    "2010 Ocelot XA-21",
    "2017 Obey 8F Drafter",
    "2015 Obey 9F",
    "2012 Obey 9F Cabrio",
    "1985 Obey Omnis",
    "2014 Obey Rocoto",
    "2010 Obey Tailgater",
    "2011 Nagasaki BF400",
    "2013 Nagasaki Blazer",
    "2014 Nagasaki Carbon RS",
    "2015 Nagasaki Chimera",
    "2020 Nagasaki Outlaw",
    "2014 Nagasaki Shotaro",
    "2014 Nagasaki Street Blazer",
    "2017 MTL Dune",
    "1990 MTL Flatbed",
    "1992 MTL Ponder",
    "2006 Mammoth Patriot",
    "2008 Mammoth Patriot Stretch",
    "2010 Maibatsu Manchez",
    "2000 Maibatsu Mule",
    "2012 Maibatsu Penumba",
    "2006 Maibatsu Sandchez",
    "2005 Maxwell Asbo",
    "2018 Maxwell Vagrant",
    "2013 LCC Avarus",
    "2010 LCC Hexer",
    "2012 LCC Innovation",
    "1958 Lampadati Casco",
    "2010 Lampadati Felon",
    "2012 Lampadati Felon GT",
    "2020 Lampadati Furore",
    "2019 Lampadati Komoda",
    "1968 Lampadati Michelli",
    "2016 Lampadati Novak",
    "1975 Lampadati Pigalle",
    "1978 Lampadati Tropos Rallye",
    "1980 Lampadati Viseris",
    "1970 Karin 190z",
    "2011 Karin Asterope",
    "2012 Karin BeeJay XL",
    "2009 Karin Dilettante",
    "2018 Karin Everon",
    "1986 Karin Futo",
    "2006 Karin Intruder",
    "2015 Karin Kuruma",
    "2014 Karin Kuruma (Armored)",
    "1988 Karin Rebel",
    "2003 Karin Sultan",
    "2006 Karin Sultan RS",
    "2000 Karin Sultan Classic",
    "2007 JoBuilt Rubble",
    "1999 JoBuilt Trashmaster",
    "2016 Invetero Coquette",
    "1955 Invetero Coquette BlackFin",
    "1965 Invetero Coquette Classic",
    "1981 Imponte Deluxo",
    "1968 Imponte Dukes",
    "1970 Imponte Duke O'Death",
    "1971 Imponte Nightshade",
    "1970 Imponte Phoenix",
    "1985 Imponte Ruiner",
    "2000 HVY Biff",
    "2002 HVY Mixer",
    "2011 Hijak Khamelion",
    "2012 Hijak Ruston",
    "2016 Grotti Bestia GTS",
    "2007 Grotti Brioso R/A",
    "2012 Grotti Cartbonizzare",
    "2004 Grotti Cheetah",
    "2020 Grotti Furia",
    "1956 Grotti GT500",
    "2018 Grotti Itali GTO",
    "1954 Grotti Stinger",
    "1956 Grotti Stinger GT",
    "1987 Grotti Turismo Classic",
    "2013 Grotti Turismo R",
    "2012 Grotti Visione",
    "2014 Grotti X80 Proto",
    "2016 Emperor ETR1",
    "2006 Emperor Habanero",
    "2016 Dundreary Landstalker",
    "1970 Dundreary Regina",
    "1980 Dundreary Virgo Classic",
    "2006 Dinka Akuma",
    "1999 Dinka Blista",
    "1987 Dinka Blista Compact",
    "2010 Dinka Double T",
    "2004 Dinka Enduro",
    "2015 Dinka Jester",
    "1980 Dinka Jester Classic",
    "2010 Dinka Thrust",
    "2015 Dinka Vindicator",
    "2013 Dewbauchee Exemplar",
    "1965 Dewbauchee JB 700",
    "2018 Dewbauchee Massacro",
    "2015 Dewbauchee Rapid GT",
    "1980 Dewbauchee Rapid GT Classic",
    "2012 Dewbauchee Seven-70",
    "2015 Dewbauchee Specter",
    "2018 Dewbauchee Vagner",
    "2016 Coil Brawler",
    "2014 Coil Cyclone",
    "2014 Coil Raiden", ,
    "2008 Coil Voltic",
    "1965 Cheval Picador",
    "2013 Cheval Surge",
    "2017 Cheval Taipan",
    "2011 Albany Cavalcade (2) (2nd Gen)",
    "1969 Canis Bodhi",
    "2018 Canis Freecrawler",
    "1988 Canis Kalahari",
    "2017 Canis Kamacho",
    "2015 Canis Mesa",
    "2004 Canis Seminole",
    "2010 Brute Boxville",
    "2000 Brute Bus",
    "2000 Brute Camper",
    "2012 Brute Dashound",
    "1995 Brute Pony",
    "2002 Brute Rental Shuttle Bus",
    "2001 Brute Stockade",
    "2009 Brute Taco Van",
    "2005 Brute Tipper",
    "2001 Brute Utility Truck",
    "1998 Brute Tour Bus",
    "1970 BF Bifta",
    "2011 BF Dune Buggy",
    "1963 BF Injection",
    "2012 BF Raptor",
    "1950 BF Surfer",
    "1990 Annis Elegy Retro Custom",
    "2007 Annis Elegy RH8",
    "1997 Annis Hellion",
    "1975 Annis Savestra",
    "2005 Annis Apocalypse ZR380",
    "2013 Albany Alpha",
    "1965 Albany Buccaneer",
    "2005 Albany Cavalcade (1st Gen)",
    "1982 Albany Emperor",
    "1964 Albany Fränken Stange",
    "1950 Albany Hermes",
    "1967 Albany Lurcher",
    "1968 Albany Manana",
    "2000 Albany Primo",
    "1928 Albany Roosevelt",
    "2006 Albany Stretch",
    "1970 Albany Virgo",
    "2011 Albany Washington",
    "2000 Nissan Skyline R34 GTR",
    "2004 Subaru Impreza WRX STI",
    "2018 Range Rover Vogue Startech",
    "2014 Honda CBR1000 RR",
    "1966 Ford Mustang Fastback 2+2",
    "1980 Ford Bronco",
    "2012 Kenworth T440 Heavy Wrecker",
    "2008 Ford F550 Flatbed Tow Truck",
    "2019 Bravado Gauntlet Custom",
    "1981 BMW M1",
    "2004 Saleen S7",
    "2008 Dodge Viper ACR",
    "2017 Mercedes-AMG Brabus 700",
    "2003 Infiniti G35",
    "2017 HSV Limited Edition GTS Maloo",
    "1999 Ford Crown Victoria",
    "2005 BMW M3 E46",
    "2013 Vapid Sandking Utility",
    "1995 Mammoth Patriot Classic",
    "2001 Kenworth T700",
    "1998 Toyota supra",
    "2012 Chrysler SRT8 300",
    "2004 Ford Mustang Mach 1",
    "2019 Dodge Ram 1500",
    "1973 Dodge Cuda",
    "2018 Mustang RTR",
    "2006 Chevrolet Corvette Z06",
    "1996 Chevrolet Corvette GS",
    "2010 Audi S5",
    "1993 Ford Mustang Cobra",
    "1989 Mazda RX-7 FC3S",
    "1995 Mustang GT",
    "2020 Chevrolet Camaro SS",
    "1988 Toyota MR-2 GT",
    "2012 Volvo VNL 780",
    "2014 Kenworth W900 6x2 Mid Cab",
    "2010 Benefactor Turreted Limo",
    "2013 Audi RS4 Avant",
    "2014 Benefactor Surano",
    "2005 Mitsubishi Lancer IX",
    "2013 Mercedes-Benz G65 AMG",
    "2018 Mercedes-Benz S63 AMG",
    "2011 CVPI",
    "2018 Chevrolet Tahoe",
    "2016 Dodge Challenger",
    "2016 Dodge Challenger Hellcat",
    "2016 Dodge Challenger Demon",
    "2016 Dodge Challenger Liberty Walk",
    "2016 Dodge Challenger R/T",
    "2016 Dodge Challenger SRT",
    "1990 Nissan 180SX Type-X",
    "2000 Vapid Sadler - Ambulance",
    "2006 BMW 760i (e65)",
    "1992 Vapid Bus Classic",
    "1969 Chevrolet Camaro SS",
    "2007 Mercedes-Benz CLS 500 (W219)",
    "1984 Chevrolet G20",
    "2018 Eager Beaver Trailer",
    "2012 Dodge Challenger SRT",
    "1965 Shelby Cobra 427",
    "2009 sanctus",
    "1984 Toyota Supra"
]
cars.forEach(car => {
    db.query("INSERT INTO `vehicles` (`cname`, `cadID`) VALUES ('" + car + "', 'zqvLuWgnf7')", (err, result) => {
        if (err) {
            return console.log(err)
        }
        console.log("added")
    })
})

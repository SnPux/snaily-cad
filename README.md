# SnailyCAD

Free NodeJS CAD For your Community

**Update**

I'm currently working on a v2 for this CAD/MDT! I hope to release v2 end of June, mid July.

Things that will change when v2 releases:

- **v1** will not receive any updates unless bug fixes
- **v1** and **v2** will both still get support
- More coming soon!

## Changelog

View the full changelog [here](https://github.com/Dev-CasperTheGhost/snaily-cad/blob/master/CHANGELOG.md)

## Screenshots

View a complete gallery of screenshots [here](https://github.com/Dev-CasperTheGhost/snaily-cad/blob/master/SCREENSHOTS.md)

## How To setup

### Requirements

- [NodeJS](https://nodejs.org)
- [Xampp MySQL](https://www.apachefriends.org/download.html)

### Installation

1. Clone this repo to your PC, Run `git clone https://github.com/Dev-CasperTheGhost/snaily-cad.git`
2. Go into the folder using: `cd snaily-cad`
3. Run `npm install` to install all required dependencies
4. Install XAMPP MySQL server to connect to the database. link: [https://www.apachefriends.org/download.html](https://www.apachefriends.org/download.html)
5. Make a database called "snaily-cad"
6. Import the `snaily-cad.sql` file into that database
7. Rename `creds-template.json` to `creds.json` and configure if needed.
8. Run `npm start` to start the CAD
9. The console should display on what port the CAD is running on, default is 80 [http://localhost/](http://localhost/)
10. Enjoy!

## Found bugs & Suggestions

### Bugs

Open an issue [here](https://github.com/Dev-CasperTheGhost/snaily-cad/issues/new?assignees=&labels=bug&template=bug_report.md&title=) and I'll fix it asap.

### Suggestions

Open an issue [here](https://github.com/Dev-CasperTheGhost/snaily-cad/issues/new) and I'll see what I can do!

## FAQ

- How Do I change the Icon?

  - goto `public/icons/` and there will be a file called `icon.png` replace this file with yours, It might take a little before the changes have been saved

- Am I allowed to translate this CAD?

  - Yes, you are allowed to translate this CAD. (Only for your community)

- How can I make backups of the database?

  - This is fairly simple! Only takes a few steps

    1. Head on over to the phpmyadmin, [http://localhost/phpmyadmin/](http://localhost/phpmyadmin/)
    2. Select the snaily-cad database you created
    3. At the top you will see a few icons and buttons, head over to "Export"
    4. Now Export the database by clicking go.

## Main Features

- Administration Panel
- Dispatch System
- LEO System
- EMS/FD System
- Citizen Panel
- Tow
- Bleeter

- Bleeter

  - able to send bleets
  - Edit bleets
  - moderators+ can delete a bleet

- Citizen

  - see tickets/arrest reports
  - Add medical records, allergies/medication/health problems
  - upload picture of citizen character
  - Register vehicles & weapons
  - Call tow truckers or emergency services
  - Drivers, Pilots, Firearms and CCW License
  - Companies:
    - Company Blog Page
    - Create Unlimited Blog Posts
    - Manage Employees
    - Manage Posts
    - Join a Company
    - Start your own Company

- Administration

  - User Permissions
  - Action Logs
  - CAD Settings
  - Ban Integration
  - Add Custom vehicles, genders, weapons, ethnicities and departments…

- LEO

  - Vehicle Search
  - Person Search
  - Penal Codes
  - 10-Codes
  - Create Bolos
  - Expire licenses
  - Add Written Warnings
  - Add Tickets
  - Add Arrest Reports
  - Add Warrants

- EMS/FD
  - EMS/FD Dashboard
  - Able to search up medical records

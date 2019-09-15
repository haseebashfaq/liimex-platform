# Liimex Platform (Digital Insurance platform)
Customer Side Angular App
<br>
<br>
### Table of contents
  * [Stack](#Stack)


## Stack
This project is made up of a **Node** server which serves an **Angular** app. See [versions](#Versions) for which version to use. The Angular client communicates with a separate Node server (backoffice) for server side computations. As the database, the client communicates directly with **Firebase**.

* [Learn about firebase](https://firebase.google.com/docs/database/web/start)

#### Frontend
The frontend is as stated above **Angular**. More specifically, it is **Foundation** which is an Angular based framework. Foundation includes a lot of CSS and functionality which would otherwise be handled by libraries such as Bootstrap. It includes commands such as ```zf-open``` for opening modals etc. Another CSS library included in the App is **MaterializeCSS**.

Links to Foundation and Materialize
* [Foundation for Apps](http://foundation.zurb.com/apps/docs/) (beware that the library is deprecated)
* [Materialize](http://materializecss.com/getting-started.html) (has some cool CSS features)

#### Backend
The backend of this project (i.e. the node server), doesn't have any purpose other than serving the front end. So this chapter is short.

## Development Setup
So you wish to get this running on your own machine huh? Here are a few things to note:
* **Firebase** can be run locally on your machine using this [library](https://www.npmjs.com/package/firebase-server). However not all parts of the service will work locally, such as file storage. Because of this, we use the hosted **development environment** on Firebase for our development. This means that you must be connected to the internet for the development.

#### Installations
First clone the repo to your well structured development workspace. Then follow the steps to install:
* NodeJS 6.10 and npm
```bash
  # Install node and npm using nvm:
  curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash
  nvm install 6.10

  # Important: Once this is done open a new terminal window so that node and npm are in path.
```

* Install bower
```bash
  npm install -g bower
```
* Install gulp
```bash
  npm install -g gulp
```

Once thats done, install the dependencies with
```javascript
  npm install
```

and then the bower dependencies with
```javascript
  bower install
```

Once thats done you should be good to go. Beware of potential missing elements in the bower.json file.

#### Running the App
Running the app is done with gulp using this simple command
```
  gulp
```
This should output a bunch of messags and compile a **build** folder in your project. Then serve that folder on the desired port. Default is 3000.

#### Keeping the Code clean
Depending on your editor, you may wish to install a different linter. For **Atom** the following Linter package is a good choice:
```
  apm install linter-eslint
```

The basic linter eslint is included in the **package.json** and should therefore already be installed at this point following **npm install**.

## Linter
Please use the linter **(.eslint)** file included in the project. This linter has been added after development begun, so many errors and warnings may show up from current code. Feel free to fix those. You will be rewarded with cookies.

## Testing
There are some unit tests here and there, but we need to reengineer tests and set up better and more specific test cases. So far the only existing unit-tests, are for the activity questions to test questions in relation to industry codes. There are also unit-tests for the recommendation algorithm, however this is in the **backoffice** repository.

## Contribution
In order to contribute, you need to have two-factor-auth enabled, and instead of your account password, you will need to provide a **personal authentication token**. These can be generated in the **settings** on Github.

#### Pull / Fetch
To contribute to the project, it is important to follow these steps:
* First, you need to pull/fetch a clean version of the Master branch
* Then, make a new branch with a descriptive name of what you are changing or implementing. An example of this could be **ui-updates-account-page** or **exact-match-search**
* Use # to connect your branch to a ticket

#### Commit
When you make commits, please include one of the following words (fixed, changed, added, removed) for either bugs, changes, new features, or removing things. Make an effort to be descriptive. Here are a few examples:
* fixed: bug that caused the screen to go blank
* added: new tooltip text to flower.jpg
* removed: finance input on signup page

#### Push
When you are finished with your awesome stuff, push to your branch. When you're completely done and want the branch merged with master, create a **Pull Request**.

#### Merging Sprints into master
When starting a sprint, branch out from **master** into a branch nammed **sprint-x**. Then branch further out from that with **sprint-x-issue-y**. To merge them back into **master** go the reverse way back, i.e. first merge **sprint-x-issue-y** into **sprint-x**, then **sprint-x** into **master**

## Deployment Guide
Deploying the project to the **Heroku** development environment, is pretty straight forward. Create a Pull Request from master into the branch **heroku-deploy**. This will put the app on the following url
* [Development](https://thawing-everglades-53612.herokuapp.com/#!/login)
* [Staging](https://tranquil-tundra-54833.herokuapp.com/#!/login) (needs further setup)

## Zenhub ScrumBoard
## Versions
Please use **Node version 6.11.x**

## Troubleshooting

#### Common Issues
* App not loading in browser? This is usually the result of a missing dependency. Opening console and checking for **injector error** will show what package is missing.
* Some bower dependencies might not be included in the bower.json file. As such ```bower install``` will not completely install all needed packages.
* Syntax Issues in **CSS** will crash the gulp process, always. So if you're editing some CSS, and suddenly the app doesn't seem to update when you save, this is likely what happened. Fix this by killing the node process manually (via terminal or activity monitor), and running the **gulp** command again.

# Task Manger App - MERN Stack


## Description

This app firstly authenticates and verifies a user before taken them to the Task manager page which is a page that displays the users oustanding tasks. From this page, the user is alos able to add/delete and update tasks as needed.

The web app will be used by my team (The Dealing Desk at Futuregrowth Asset Management) to manage their daily tasks and activities. Currently most of our actions are being driven be emails which carries some risk due to emails not being received or picked up too late. 
In addition, there is also a risk of tasks being duplicated. Since Covid, the team has been working from home and it is very possible that these emails may be picked and acted upon by different members of the team.
It is envisaged that this web driven Task Management Tool, will go a long way in reducing this risk by making these undertakings more visible and transparent for everyone on the team to see.


## Table of Contents

* System Achitecture
* System Requirements
* Setup
* Running the App
* Testing the App
* How to Use the App
* Login Details
* Web Link


## System Architecture

I will be using the MERN Stack to build the task management web app. The reason for this is that this framework contains all the requirements to build the envisaged tool. Considering the people that would be using the tool, the outlay of the app needs to be intuitive and simple, so styling is important and I think that using React to create the front of the app would be appropriate as it allows for easy customization and styling. I plan on using Reacts Grid layout (and bootstrap) to style the front end and make visually appealing to the users
In addition the app also to store tasks in a database and because these tasks are singular it makes sense to store them as documents in Mongodb. To that end using express/node.js for the back-end also make sense. The app will only have one page (so no multiple pages and is another reason for choosing to use express/node instead of next.js).
To summarise, the user interface will be designed in React with the back-end implemented using express/node.js, which in turn would interact with the database Mongodb.

## System Requirements
The main users of the system would be the people on the dealing at Futuregrowth. Have a universal task manager whereby everyone can see what tasks are outstanding and who is working on which activity is vital to ensuring firstly all tasks are complete and secondly that all tasks have been assigned and are being looked at.
In addition, deploying the app so that it can be viewed on a mobile would also be highly useful as one can interact with any incoming tasks timeously (i.e. they don’t need to be in the office or at their desks).
Depending on how well the system performs one can also look to roll this task management tool out to the rest of the organization – this would add value and ensure that the broader teams are all in sync.

### Functional Requirements
*User should be able to add tasks to a dashboard.
*System should allow a user to assign tasks to individuals (to show if a user is working on task).
*User should be able to mark task as complete on the dashboard.
*User should also be able to delete/remove tasks from the dashboard.
*The user should also be able to edit tasks that are on the dashboard.
*Optional – the user should be able to filter on tasks, such as the ones assigned to them.

### Non-Functional Requirements
*Usability - The interface should be simple and contain as little inputs as possible – it should be easy for the user to navigate and control.
*Reliability - The tasks should be managed in a database – mongdb. This would ensure continuity and reliability.
*Performance – Since this is a simple task management app linked to mongodb, the performance of this tool should be consistent.
*Security - For security - there should be a login page that only allows individuals on the dealing team to login.


## Setup

To run the app, first save the task file (login) onto your computer. Thereafter open the command line and navigate to the location you saved the file (i.e. the task file you saved). Then run the npm install command. This command will create the nodes_modules files and allows you to run this task. as on your browser.

Thereafter navigate to the 'todo' folder (contained within the login file) from your command line and once again run npm install command. Again this command will allow you to create the nodes_modules file which will allow you to run this task as an app on your browser.

After installing nodes_modules files, you are now ready to run your app.


## Running the App

First navigate to the login folder from the command line and enter 'npm start'. this will lauch the server which you can open as your localhost on you web browser. This server has the same interface the app that we have created.

After launching the server you can then navigate to the todo folder within the login folder from your command line and again enter 'npm start'. This will launch the app.


## Testing the App

To test the app, simply follow the same steps as to Run the App (see above) but enter 'npm test' in the command line instead of 'npm start'.


## How to use the App

Once the user launches the app, they will be taken to the login page for authentication. The user can then enter the login details (see below) to acces the task manager page. The user first needs to submit the details before clicking the authentication button.

Once the user is authenticated and logs into the task manger page, the user will be able to view all the outstanding tasks for the day. From here the user can input details to enter a new task or if the user likes, they can also delete tasks as required.

To update a task, the user can fill in the updated details (in the input boxes) and then click update, a pop up box will appear asking the user to enter the id for the task they want to update. Once the user enter the number of the task, then this task will be updated with the new details accordingly.



## Login Details

username: desiRed
password: sharksRule


## Login Details

https://sleepy-wave-74809.herokuapp.com/




















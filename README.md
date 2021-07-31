-- ROUTINE --
Creating positive and healthy habits have been a hot topic lately, especially coming out of one of the most unpredictable times in our lives when nothing seemed normal or routine. “Routine” is an application that allows users to track habits that will set them up for a balanced and successful life. Users will be able to create a login that will lead them to the application. Once they are logged in, they will be able to set up new habits to track as well as submit journal entries about their habit journey.  

- PERN Stack Application - utilizing PostgresSql, Express, React, and Node 

- STYLING: Material UI was utilized for this project 

- DATA FLOW: 

Client Side: /user endpoint
1) Auth/Register:
User's can select to either register as a new user or login by selecting a button on the home page. That will redirect them to an overall Auth page. 
Registration form on Auth page validates password contents and sends POST request to /user/register.

2) Auth/Login:
Login form, sends POST to user/login

Client Side: /habit endpoint 
1) Habits Page:
User will be able to enter new habits on this page - submit button sends POST request to habit/entry
Pass habit details as props to profile page

2) Profile Page:
Will fetch all current habits and each has a link to delete habit, update habit, or add a journal entry. 

Client Side: /journal enpoint 
1) Journal Page:
User will be able to add journal entries on this page to help track progress on habits. 

2) Once a journal entry has been created, user's can also delete or update that entry. 









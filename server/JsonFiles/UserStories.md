# User Stories for techNotes

1. [ ] Server
   1. [x] subscriptions_ws REST api server <--> subscriptionsDB(members[get data from membersWS], movies[]get data from moviesWS], subscriptions)
      1. [x] server is running on port 4000/4001 if couldn't get to .env
      2. [x] connect subscriptionsDB to mongoDB
      3. [x] create subscriptions_ws routes
      4. [x] create subscriptions_ws controllers
      5. [x] check all routes with request.rest
   2. [ ] cinema_ws REST api server <--> usersDB(users)
      1. [x] server is running on port 3000/3001 if couldn't get to .env
      2. [x] connect usersDB to mongoDB
      3. [x] create users collection routes
      4. [x] create subscriptions routes
      5. [x] create subscriptions_ws controllers
      6. [x] check all routes with request.rest
2.  [ ] Client
   1. [] Add an employee login to the notes app

# EATALIA
## Structure of our project
In our website we have 8 pages:
* Main page
* About
* Menu
* Location
* Register
* Login
* User profile
* Admin panel
## Contributions to our project
Design part was done by Raimkulova Taslima with animations and connections between pages and js logic was done by Daniyaruly Danial.
## Design of our project
In main page we added responsive navigation bar which we then used in all other pages. Also there is animation with 2 blocks which moving to the right then to the left opposite to each other.
## Logic of our project
### Main page
When main page is downloaded it is save the info about admin account into the local storage with key "adminInfo". Then it gets the item form local storage "active" where i store information about active account. If it is empty it returns empty object and you can see register and login pages. If it is not empty then it will show in navigation bar "Hi! 'username'". In main page there are two functions. First called checkAccount() where we check is there any active account which is logged in to go the user page. Second called checkLogin() to check if the user active and give him permission to go the menu page. That is why if not logged in then you cannot go to the user page or menu to make an order.
### About
In this page nothing knew. You again have two functions checkAccount() and checkLogin().
### Menu
In menu page we give for the user ability to choose one product out of nine. User can order only one product at a time. New function there would be makeOrder(prodname, prodprice) which takes two arguments (product name and product price). When you click on the cart image in cards first of all function will check if this account in the list of those who already ordered food through "orders" object in local storage. If this account is not in the list then function adds user to the list and alerts that you have successfully placed an order. If this user is already in the list then it will tell that you have already made an order. And if admin will try to make an order then it will just say that you are an admin and you cannot make an orders.
### Location
New function in location is initMap() function where we create map, place markers and define zoom value. We have 5 addresses with their markers and we gave them titles.
### Register
In registration page we have validation and checking account for its existence. When we click on the "Register" button it will check first name, last name, email and password step by step with functions checkFname(fname), checkLname(lname), checkEmail(email) and checkPassword(password). And when every function will return true we start to push user data to local storage. checkFname() function checks first name for emptiness and according that change style of text, like make it red or green. That is same for the checkLname() function. In checkEmail() function it will also check it for emptiness, but also check email for pattern which i created with regular expressions. And it is also applies for checkPassword() function with one difference that there is another pattern for password. After this checking event listener take from local storage object "userData" where we store all users information and with then checks is there this typed account, or in other words, is this account new, and if new pushes it local storage and opens main page, if it is not new then it will alert that this account is already exist and do not give permission to create same account. Also there is checkbox to convert password to text and vice versa.
### Login
Here, in login page like in registration page with event listener program will validate email and then password. After validation it checks is this email and password same for admin info, if yes then it will set admin info as an "active", if no it will check is this user disabled or not. For this program gets list of "disabled" users from local storage, and check if there is email which is in input. If yes, then it will alert that this account is disabled and you cannot log in. If no, then it will check this account for exsitence in "userData" list. If it is find this account in list of users then program set as an active account and you will go to the main page. If no, then it will alert that you need to try again with another email and/or password.
### User profile
In user page it will show information about this user, especially first name, last name, email, password, product name and product price which you ordered. It works exactly as in previously described pages. Additionally, there are two new functions called cancel() and logout(). Function cancel serve to cancel your order. It is takes your info from "active" and in "orders" deletes your account. Function logout() serve to logout you from your account just by removing "active" object in local storage and opens main page.
### Admin panel
There in admin panel i have these functions: showUsers(event), refresh(button), logout(button), edit(button), save(button), onDelete(button), enable(button), disable(button). Also there are all validation which were in register form. Function showUsers() creates one by one table cells in table body and enters there full information about users in each row. This happens through a for loop where also extracts information from "orders" to enter product name and price if this user have an order. Then it is also checks for is this user disabled. Function refresh() empties the table calls function showUsers(). Function logout() removes admin from active users. Function edit() sets attribute "contenteditable" for cells of choosen row and then turns this button to save button with same name of function. Function save() validates recently entered information, checks product name for its existence, checks is this account new or already exist, and only after this updates information about this user, turnoff attribute, returns edit button and reloads admin page. onDelete() function shows pop-up window with confirmation to delete this user, and it is deletes this user from list of users in local storage and from table. Function enable() removes this user from "disabled" list if it was there and if it was not then alerts that this user is already enabled. disable() function pushes information about this user to the "disabled" list in local storage if this user is enabled, and if it is disabled already then function alerts about it.
## Links

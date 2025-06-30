Employee Management System (EMS)
An Employee Management System built using React.js for the frontend, Node.js + Express.js for the backend, and MongoDB as the database. The system allows users to Create, Read, Update, and Delete (CRUD) employee records efficiently.

Features

Search Employees by name or email.

Add New Employees with details like name, email, address, and phone number.

Edit Existing Employees and update information.

Delete Employees from the system.

Client-side validation for form inputs.

Logout Functionality 



Layer	Technology
Frontend:	React.js, Bootstrap
Backend	:Node.js
Database:	MongoDB (Mongoose)
Tools:	REST API, Fetch API, npm



Frontend Setup:

cd employee-management
npm install
npm start


Backend Setup:

cd Backend
node index.js


API Endpoints:
Method	Endpoint	Description
GET	/employees	Fetch all employees or by search
POST	/employees	Add a new employee
PUT	/employees/:id	Update employee details
DELETE	/employees/:id	Delete an employee



Validation Rules:

Name: Only letters and spaces allowed.

Email: Must be in valid format.

Phone: Exactly 10 digits.


Admin login credentials:

Username: admin
Password: admin123

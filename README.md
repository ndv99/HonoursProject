
# Honours Project

A multi - screen viewing system for **Formula One** races, <br>
created for the research at the **[University of Dundee]** .

# Setup

1. Clone the repository to your PC.
2. Create a python virtual environment for the folder: `python3 -m venv HonoursProject`
3. Activate the virtual environment: `HonoursProject\Scripts\activate` (this will be `./HonoursProject/bin/activate` on unix/linux)
4. Enter the folder (`cd HonoursProject`) and install the project requirements for the backend: `pip install -r requirements.txt`
5. Navigate to the server folder (`cd server`) and make the migrations for the server: `py manage.py migrate`
6. Create a superuser: `py manage.py createsuperuser` and give it a username and password
7. Run the server: `py manage.py runserver`
8. Open a new terminal and navigate out of the server folder into the frontend folder
9. Install the requirements: `npm install`
10. Run the frontend: `npm start`
11. Navigate to localhost:3000 and localhost:8000/admin in your browser. The former is the frontend, and the latter is the admin page for the backend.


<!----------------------------------------------------------------------------->

[University of Dundee]: https://www.dundee.ac.uk/
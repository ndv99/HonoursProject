
# Honours Project [![Badge License]][License]

A multi - screen viewing system for **Formula One** races, <br>
created for the research at the **[University of Dundee]** .

<br>

## Setup

<br>

1. Clone this repository

    <br>

2. Create a python virtual environment

    ```sh
    python3 -m venv HonoursProject
    ```
    
    <br>

3. Activate the virtual environment

    #### Windows

    ```sh
    HonoursProject\Scripts\activate
    ```
    
    #### Linux
    
    ```sh
    ./HonoursProject/bin/activate
    ```
    
    <br>
    
4. Enter the folder

    ```sh
    cd HonoursProject
    ```
    
    <br>

5. Install the project requirements for the **backend**

    ```sh
    pip install -r requirements.txt
    ```
    
    <br>

6. Navigate to the server folder 

    ```sh
    cd server
    ```
    
    <br>
    
7. Migrate the server

    ```sh
    py manage.py migrate
    ```

    <br>

8. Create a superuser
    
    ```sh
    py manage.py createsuperuser
    ```
    
    *Give it a **Username** and* ***Password***

    <br>

9. Run the server

    ```sh
    py manage.py runserver
    ```
    
    <br>

10. Open a new terminal and navigate out of <br>
    the server folder into the frontend folder

    <br>

9. Install the requirements

    ```sh
    npm install
    ```
    
    <br>

10. Run the frontend
    
    ```sh
    npm start
    ```
    
    <br>

11. Navigate to the following urls in your browser:

    #### Frontend
    
    [`localhost:3000`][Frontend]
    
    #### Backend
    
    [`localhost:8000/admin`][Backend]
    

<!----------------------------------------------------------------------------->


[Badge License]: https://img.shields.io/badge/License-Unknown-darkgray?style=for-the-badge
[License]: #

[University of Dundee]: https://www.dundee.ac.uk/

[Frontend]: http://localhost:3000
[Backend]: http://localhost:8000/admin

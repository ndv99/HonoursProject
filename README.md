
# Honours Project

A multi - screen viewing system for **Formula One** races, <br>
created for the research at the **[University of Dundee]** .

<br>

## Setup

1. Clone this repository

2. Create a python virtual environment

    ```sh
    python3 -m venv HonoursProject
    ```

3. Activate the virtual environment

    #### Windows

    ```sh
    HonoursProject\Scripts\activate
    ```
    
    #### Linux
    
    ```sh
    ./HonoursProject/bin/activate
    ```
    
4. Enter the folder

    ```sh
    cd HonoursProject
    ```

5. Install the project requirements for the **backend**

    ```sh
    pip install -r requirements.txt
    ```

6. Navigate to the server folder 

    ```sh
    cd server
    ```
7. Migrate the server

    ```sh
    py manage.py migrate
    ```

8. Create a superuser
    
    ```sh
    py manage.py createsuperuser
    ```
    
    *Give it a **Username** and* ***Password***

9. Run the server

    ```sh
    py manage.py runserver
    ```

10. Open a new terminal and navigate out of <br>
    the server folder into the frontend folder

9. Install the requirements

    ```sh
    npm install
    ```

10. Run the frontend
    
    ```sh
    npm start
    ```

11. Navigate to the following urls in your browser:

    #### Frontend
    
    [`localhost:3000`][Frontend]
    
    #### Backend
    
    [`localhost:8000/admin`][Backend]
    

<!----------------------------------------------------------------------------->

[University of Dundee]: https://www.dundee.ac.uk/

[Frontend]: localhost:3000
[Backend]: localhost:8000/admin
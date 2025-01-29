# Welcome to the backend! 👋

The backend uses a `PostgreSQL` database and the `Django` framework. Django authentication classes and JWT tokens are used to authenticate users.

## Installing python packages

Assuming you created and activated the virtual enviroment from the main [README](../README.md), run:

```bash
pip install requirements.txt
```

to install the python packages used for this project.

## PSQL install instructions

For `Mac`:

- Install Postgres App `https://postgresapp.com/`
  - [ ] Open the app (little blue elephant) and select initialize/start
- Type `psql` into your terminal. You should then see something similar to:

  ```
  psql (9.6.5, server 9.6.6)
  Type "help" for help.

  username=#
  ```

- If the above does not show/you get an error, run the following commands in your terminal:

```
brew update
brew doctor
brew install postgresql
```

If you see the following error: `psql: error: connection to server on socket "/tmp/.s.PGSQL.5432" failed: FATAL: database "username" does not exist`, then run the command `createdb` to initialise the database.

For `Linux / WSL`:
Follow the installation instructions for your distribution [here](https://www.postgresql.org/download/linux/#generic)

## Connect to the backend to the database

Once you've installed the `psql` client, modify the `DATABASES` section in [settings.py](./backend/settings.py) with the below snippet. Make sure to replace `USER` with your user by running `\du` inside the `psql` client and `PASSWORD` with the password you created when installing the client. Don't worry about `TEST`, the database will be created and destroyed automatically when running the tests.

```bash
DATABASES = {
    'default': {
    'ENGINE': 'django.db.backends.postgresql',
    'USER': 'mydatabaseuser',
    'NAME': 'shopkeeper',
    'PASSWORD': 'mypassword',
    "HOST": "127.0.0.1",
    "PORT": "5432",
    'TEST': {
        'NAME': 'shopkeeper_test' #test database
    }
}
```

Create a superuser with:

```
python3 manage.py createsuperuser
```

and run the server with:

```
python3 manage.py runserver
```

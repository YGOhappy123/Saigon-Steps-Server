# Saigon Steps - Web Service

This is the Web Service (Server) portion of our University Graduation project. Built with ExpressJS, Typescript, MySQL and Prisma.

## Table of Contents

-   [Technologies Used](#technologies-used)
-   [Required Dependencies](#required-dependencies)
-   [Installation](#installation)
-   [Before You Run](#before-you-run)
-   [Development](#development)
-   [Connect other devices to this server](#connect-other-devices-to-this-server)
-   [Features](#features)
-   [Suggested VS Code Extensions](#suggested-vs-code-extensions)
-   [Contributors](#contributors)

## Technologies Used

-   [Express JS](https://expressjs.com/)
-   [MySQL](https://www.mysql.com/)
-   [Prisma](https://www.prisma.io/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [Axios](https://axios-http.com/)
-   [Day JS](https://day.js.org/)

## Required Dependencies

-   `Node.js` v20.17 or later: [Download Node.js](https://nodejs.org/en)
-   `MySQL`
-   `TypeScript`

Make sure to have these installed before proceeding with the project setup.

**Note:** If you encounter any issues installing the `MySQL`, consider running it through `XAMPP` or `Docker`.

## Installation

Follow these steps to set up and run the application locally.

1. Clone the repository:

    ```bash
    git clone https://github.com/YGOhappy123/Saigon_Steps_Server.git
    ```

2. Navigate to the project directory:

    ```bash
    cd Saigon_Steps_Server
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

## Before You Run

Before running the project, make sure to set up the database and environment variables:

1. Create a `.env` file:

    In the root directory of your project (at the same level as `.env.example`), create a `.env` file.

2. Populate the environment variables:

    Copy the variables from `.env.example` into `.env` and replace the placeholder values with your actual configuration.

    **Notes:**

    - You must replace `<SQL_DATABASE_URL>` with the actual connection string to your local MySQL instance.

3. For collaborators:

    If you are a collaborator on this project, please contact the project owner to obtain the values for the environment variables.

4. Apply the migrations to create the necessary database tables. Use the following command in the terminal:

    ```bash
    npm run migrate
    ```

    This command will apply the existing migrations to the specified database, ensuring your local database is synchronized with the schema file and required tables are created.

    **Notes:**

    - Your database must be created before applying any migrations.
    - You need to repeat this process whenever there is a change in models definition (schema file).

5. Verify the synchronized database:

    If you don't see a tables populated in your MySQL tool's UI after running above commands, try disconnecting and reconnecting your MySQL.

## Development

To start the development server, use:

```bash
npm run dev
```

This will start the ExpressJS server

You can view the app by visiting `http://localhost:5000` in your browser.

You can also replace `localhost` with your device's `IPv4 Address`, which can be found by entering the following command in the `terminal` and look for `Wireless LAN adapter Wi-Fi` > `IPv4 Address`:

```bash
ipconfig
```

## Connect Other Devices To This Server

**Requirement:** All devices must be connected to the same network.

Follow these steps to ensure that your firewall allows incoming connections on port 5000.

1. Open `Windows Defender Firewall`.
2. Click on `Advanced settings`.
3. Select `Inbound Rules` and then `New Rule`.
4. Choose `Port`, click `Next`.
5. Select `TCP` and enter `5000` in the specific local ports box.
6. Allow the connection and complete the wizard.

Now you can access the app using other devices by visiting `http://<IPv4 Adddess>:5000`

## Features

-   **RESTful API** 🛠 Exposes endpoints following REST principles for ease of use and scalability.
-   **Database Integration** 💾 Uses MySQL with Prisma for data persistence.
-   **Authentication and Authorization** 🔑 Secure your API with JWT-based authentication.
-   **Cross-Platform** 🌐 Runs on any operating system that supports Javascript
-   **Migrations** 🔄 Easily handle database schema changes using Prisma migrations.

## Suggested VS Code Extensions

| Extension                     | Publisher            | Required? | Supported features                                                |
| :---------------------------- | :------------------- | :-------: | :---------------------------------------------------------------- |
| Prettier - Code formatter     | Prettier             |    Yes    | Code formatting                                                   |
| Prisma                        | Prisma               |    Yes    | Code formatting and autocomplete for Prisma files                 |
| Code Spell Checker            | Street Side Software |    No     | Spelling checker for source code                                  |
| Multiple cursor case preserve | Cardinal90           |    No     | Preserves case when editing with multiple cursors                 |
| TPretty TypeScript Errors     | yoavbls              |    No     | Make TypeScript errors prettier and more human-readable in VSCode |
| GitLens                       | GitKraken            |    No     | Enhanced Git integration and code history tracking                |

## Contributors

Thanks to the following people for contributing to this project ✨:

<table>
    <tr>
        <td align="center">
            <a href="https://github.com/YGOhappy123">
                <img 
                    src="https://avatars.githubusercontent.com/u/90592072?v=4"
                    alt="YGOhappy123" width="100px;" height="100px;" 
                    style="border-radius: 4px; background: #fff;"
                /><br />
                <sub><b>YGOhappy123</b></sub>
            </a>
        </td>
        <td align="center">
            <a href="https://github.com/hnninh21">
                <img 
                    src="https://avatars.githubusercontent.com/u/107742272?v=4"
                    alt="hnninh21" width="100px;" height="100px;"                 
                    style="border-radius: 4px; background: #fff;"
                /><br />
                <sub><b>hnninh21</b></sub>
            </a>
        </td>
    </tr>
</table>

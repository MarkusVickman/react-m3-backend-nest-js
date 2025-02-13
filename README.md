# Nest.JS API - Discgolf-grossisten
Denna backend API är tänkt att kunna användas av ett lager. I det här fallet är den anpassad för att lagerföra discgolf discar och hantera användare.
Repot innehåller en Nest.Js backend med en CRUD api som ansluter till en MySql-databas. Apin är publicerad i en docker-container till Google Cloud Run.
Här är ett exempel på hur en webbapplikation kan se ut som använder denna api [Webbapp DG-gross](https://dg-gross.netlify.app/) Denna webbapplikation går det att läsa mer om på följande repo [Repo DG-gross](https://github.com/Webbutvecklings-programmet/projekt---klient-applikation-MarkusVickman/blob/main/README.md)

## Backend innehåller bland annat
* Databasanslutning till mySQL
* ORM för att sköta databasförfrågningar
* DTO med class-validator för att säkerställa data och datatype
* ValidationPipe för felmeddelandehantering
* Entity-scheman för tabellerna
* Bcrypt lösenord hashing
* Inloggning som returnerar JWT-token
* @useguard som skyddar routes

## Api ändpunkt
Det tar ungefär 10 sekunder för första svaret och ändpunkten finns här: [Välkomstmeddelande](https://dg-gross-1050979898493.europe-north1.run.app/) | [Lagret av discar](https://dg-gross-1050979898493.europe-north1.run.app/disc) 

## Dischantering
Funktioner i detta api för att hantera ett lager av discgolf-discar har följande funktioner:
* Hämta en disc
* Hämta alla discar
* Lägga till discar
* Uppdatera information om disc
* Ta bort discar

### Dischantering Databastabell
Discar lagras i en mySql-databas enligt tabellen nedan. 

|                         | disc                                     |              |
|-------------------------|------------------------------------------|--------------|
|id                       |int autoincrement                         | PK           |
|brand                    |varchar(100)                              |              |
|model                    |varchar(100)                              |              |
|version                  |varchar(100)                              |              |
|plastic                  |varchar(100)                              |              |
|amount                   |int                                       |              |
|fly_stats                |varchar(20)                               |              |
|about                    |varchar(10000)                            |              |
|price                    |int                                       |              |


### Dischantering ändpunkter
När id krävs skickas det med som en html-parameter.
Skyddade routes kräver att access_token skickas med som `Authorization`: `Bearer + access_token`.

|Metod  |Ändpunkt           |Beskrivning                                                                 |
|-------|-------------------|----------------------------------------------------------------------------|
|GET    |/disc/             |Hämtar alla lagrade discar.                                                 |
|GET    |/disc/:ID          |Hämtar en specifik disc med angivet ID.                                                         |
|POST   |/disc/create/      |Lagrar en ny disc. Alla parametrar för tabellen behöver skickas med         |
|PUT    |/disc/update/:ID   |Uppdaterar en disc med angivet ID. Skicka med de parametrar du vill ändra.  |
|DELETE |/disc/delete/:ID   |Raderar en disc med angivet ID.                                             |


## Användarhantering
Funktioner i detta api för att hantera användare har följande funktioner:
* Skapa användare.
* Logga in användare.
* Redigera användare.
* Verifiera och avverifiera konton för att ge dem tillgång att logga in.
* Ändra konton till admin och till vanliga konton.
* Ta bort konton.

### Användarhantering Databastabell
Användare lagras i en mySql-databas enligt tabellen nedan. 

|                         | user                                     |              |
|-------------------------|------------------------------------------|--------------|
|email                    |varchar(200)                              | PK           |
|name                     |varchar(200)                              |              |
|password                 |varchar                                   |              |
|isVerified               |boolean default: false                    |              |
|isAdmin                  |boolean default: false                    |              |

### Användarhantering ändpunkter 
När id krävs skickas det med som en html-parameter.
Skyddade routes kräver att access_token skickas med som `Authorization`: `Bearer + access_token`.

|Metod  |Ändpunkt        |Beskrivning                                                                               |
|-------|----------------|------------------------------------------------------------------------------------------|
|GET    |/user/          |Hämtar alla användare.                                                                    |
|GET    |/user/:email    |Hämtar en specifik användare med angivet ID.                                              |
|POST   |/user/register/ |Skapar en ny användare om emailen inte finns redan. Name, email och lösenord skickas med. |
|PUT    |/user/:email    |Uppdaterar en användare med angivet ID. Skicka med de parametrar du vill ändra.           |
|DELETE |/user/:email    |Raderar en användare med angivet ID.                                                      |
|GET    |/auth/profile/  |Hämtar aktuell inloggad användare.                                                        |
|POST   |/auth/login/    |Loggar in och returnerar access_token                                                     |


## Återskapa
Om du vill testa själv kan du klona och återskapa projektet.
Projektet skapades med version 22.11.0.

### Project setup
Installera nest.js och alla dependencies.

```bash
     npm install -g @nestjs/cli
     npm install
```

Spara anslutningsinställningar till din MySql-databas i en .env i rootkatalogen enligt följande:

     
        DB_HOST=din host
        DB_PORT= din port
        DB_USERNAME=ditt användarnamn
        DB_PASSWORD= ditt lösenord
        DB_DATABASE= din databas

        JWT_CONSTANTS=slumpvis vald träng på 32 teckan av stora och små bokstäver samt siffror
    
Tabeller från /entities/.entity.ts-filerna kommer att skapas och scynkas automatiskt. Så inga tabeller behöver skapas av användaren. Dock bör synchronize ändras till false i filen database.prividers.ts efter publicering för att undvika dataförluster om scheman ändras.

### Testköra lokalt
```bash
     npm run start
```
Alternativt:
```bash
     npm run start:dev
```
### Publicera
Projektet kan publiceras med docker till vald tjänst där databas variabler från .env-filen ska sparas som enviremental secrets. Följande dockerfil(finns i repot) används vid publicering:

```bash
     # Use the official Node.js image as the base image
     FROM node:22.11.0
     
     # Set the working directory inside the container
     WORKDIR /usr/src/app
     
     # Copy package.json and package-lock.json to the working directory
     COPY package*.json ./
     
     # Install the application dependencies
     RUN npm install
     
     # Copy the rest of the application files
     COPY . .
     
     # Build the NestJS application
     RUN npm run build
     
     # Expose the application port
     EXPOSE 3000
     
     # Command to run the application
     CMD ["node", "dist/main"]
```


### Skapad av MARKUS VICKMAN (MAVI2302) 

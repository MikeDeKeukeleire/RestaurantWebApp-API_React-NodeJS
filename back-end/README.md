# Den Tyto API

Deze API is gemaakt door Mike De Keukeleire in NodeJS.

## Get started
### Yarn

Na het GIT clonen dien je het commando `yarn install` uit te voeren.

Nu maak je een `.env` file aan in de root met volgende content:
```
NODE_ENV=development
DATABASE_USERNAME="root"
DATABASE_PASSWORD="root"
DATABASE_HOST="localhost"
DATABASE_PORT=3306
```

Vervolgens ook een `.env.test`
```
# General configuration
NODE_ENV=test
# Database configuration
DATABASE_USERNAME="root"
DATABASE_PASSWORD="root"
```

## API opstarten
Voer het commando `yarn start` uit om de API op te starten.
Voer het commando `yarn test` uit om de API te testen.
Surf naar [http://localhost:9000/swagger](http://localhost:9000/swagger) voor een UI

## Credentials
De inloggegevens zijn:
```
gebruikersnaam: Katrien
wachtwoord: 12345678
```

## Bijhorende web app
https://github.com/HOGENT-Web/frontendweb-karine-2122-MikeDeKeukeleire

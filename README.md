# Pokyny pro spuštění
- nainstalujte si následující technologie
  - Java 17 https://www.oracle.com/cz/java/technologies/downloads/#java17
    - zadejte lokaci do JAVA_HOME a Path systémových proměnných
  - MySQL https://dev.mysql.com/doc/mysql-getting-started/en/
  - npm a node https://www.freecodecamp.org/news/nvm-for-windows-how-to-download-and-install-node-version-manager-in-windows-10/
- otevřete MySQL Command Line a zadejte: *create database <your_database_name>*
- otevřete soubor src/main/resources/application.properties a nastavte následující proměnné dle vaší databáze
  - *spring.datasource.url=jdbc:mysql://localhost:<your_port>/<your_database_name>*
  - *spring.datasource.username=<your_username>*
  - *spring.datasource.password=<your_password>*
- do IntelliJ IDEA přidejte MySQL DataSource, kam vyplňte stejné údaje jako do application.properties
- nyní půjde snadno spustit předpřipravené skripty
- naplňte databázi daty spuštěním src/main/scripts/db/refresh_script.sql
- spusťte hlavní spring třídu
- ve složce /frontend spusťte příkaz *npm install* následovaný příkazem *npm run dev*

# Pokyny pro otestování
- backend lze testovat například v aplikaci Postman, zde je příklad volání endpointů
  - GET http://localhost:8080/link/all
  - GET http://localhost:8080/link/3
  - POST http://localhost:8080/link
    - Headers: Content-Type: application/json
    - Body: {"name": "ahoj", "url": "www.ahoj.cz", "description": "zdravim zdravim", "availableFirefox": "true", "availableChrome": "false", "active": "true", "newTab": "false"}
  - PUT http://localhost:8080/link/3
    - Headers: Content-Type: application/json
    - Body: {"name": "test", "url": "https://www.test.cz", "description": "test test test", "availableFirefox": "false", "availableChrome": "false", "active": "true", "newTab": "true"}
  - DELETE http://localhost:8080/link/3
- Swagger UI: http://localhost:8080/swagger-ui/index.html
- frontend jsem testoval v následujících prohlížečích: Edge, Chrome, Firefox

# Co se nestihlo
- bohužel je toho více, v případě zájmu rád cokoliv z následujících doplním
  - validace - délky vstupů, typy, mezní hodnoty a další
  - unit testy
  - logování
  - zlepšení práce s obrázky
  - vlastní popup okno u mazání linku - např. z MaterialUI
  - do historie se momentálně nezapisují změny obrázků
  - historie by mohla obsahovat časový údaj, kdy ke změně došlo
  - zevrubné ostestování, které by odhalilo další nedostatky
  - statická analýza kódu, která by odhalila další nedostatky (např. Sonarqube)

## Endpunkte

### Allgemeine Endpunkte

- `GET /`: Grundlegender Gesundheitscheck des Servers.
- `POST /upload`: Zum Hochladen von Produktbildern.

### Produktbezogene Endpunkte-ADdmin

- `POST /addproduct`: Zum Hinzufügen neuer Produkte.
- `POST /removeproduct`: Zum Entfernen von Produkten.
- `GET /allproducts`: Zum Abrufen aller Produkte.

### Benutzerbezogene Endpunkte

- `POST /signup`: Zum Registrieren neuer Benutzer.
- `POST /login`: Zum Anmelden von Benutzern.
- `POST /addtocart`: Zum Hinzufügen von Produkten zum Warenkorb.
- `POST /removefromcart`: Zum Entfernen von Produkten aus dem Warenkorb.
- `GET /getcart`: Zum Abrufen des Warenkorbs des Benutzers.

## Technologien

- **Node.js** und **Express.js**: Für den Serveraufbau und das Routing.
- **MongoDB** und **Mongoose**: Für die Datenbankverwaltung.
- **JWT (JSON Web Tokens)**: Für die Authentifizierung und Autorisierung.
- **bcrypt**: Zum Hashen von Passwörtern.

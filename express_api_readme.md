# My Express API (CRUD with JSON Storage)

## Project Description
This is a simple Node.js + Express backend with CRUD operations for `tasks`. The server stores data in `data.json`. Each object has:

- `id` — unique identifier (auto-increment)
- `name` — task name (required)
- Optional fields (e.g., `description`)

Example object:
```json
{
  "id": 1,
  "name": "Task 1",
  "description": "Task description"
}
```

---

## Installation and Run

1. Clone the repository:
```bash
git clone <YOUR_GITHUB_REPO_LINK>
cd my-express-api
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Install nodemon for auto-restart during development:
```bash
npm install --save-dev nodemon
```

4. Start the server:
```bash
npm start        # normal start
npm run dev      # development with auto-restart
```

Server will run at `http://localhost:3000`.

---

## API Routes

### Demo Routes
| Method | URL | Description |
|--------|-----|-------------|
| GET    | `/` | Server check. Returns `Server is running` |
| GET    | `/hello` | Returns `{ "message": "Hello from server!" }` |
| GET    | `/time` | Returns current server time |
| GET    | `/status` | Returns server status `{ "status": "ok" }` |

### CRUD Routes for `tasks` (/objects)
| Method | URL | Body | Description |
|--------|-----|------|-------------|
| GET    | `/objects` | — | Get all objects |
| POST   | `/objects` | `{ "name": "Task 1", "description": "..." }` | Create a new object. Returns created object |
| PUT    | `/objects/:id` | `{ "name": "Updated name", "description": "..." }` | Update object by id |
| DELETE | `/objects/:id` | — | Delete object by id |

---

## Example curl Requests

**GET all objects**
```bash
curl http://localhost:3000/objects
```

**POST new object**
```bash
curl -X POST http://localhost:3000/objects \
  -H "Content-Type: application/json" \
  -d '{"name":"Task 1","description":"Task description"}'
```

**PUT update object**
```bash
curl -X PUT http://localhost:3000/objects/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Task 1 updated","description":"Updated description"}'
```

**DELETE object**
```bash
curl -X DELETE http://localhost:3000/objects/1
```

---

## Project Structure
```
my-express-api/
├─ package.json
├─ server.js
├─ data.json
└─ README.md
```
- `server.js` — main Express server file
- `data.json` — storage for JSON objects
- `package.json` — dependencies and scripts
- `README.md` — project documentation

---

## Features
- All data stored in `data.json`
- Auto-increment object IDs
- `express.json()` middleware used for JSON parsing
- Ready for testing via Postman, curl, or browser


// server.js
const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(express.json()); // middleware для JSON


async function readData() {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}

async function writeData(data) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}


app.get('/', (req, res) => res.send('Server is running'));
app.get('/hello', (req, res) => res.json({ message: 'Hello from server!' }));
app.get('/time', (req, res) => res.json({ serverTime: new Date().toISOString() }));
app.get('/status', (req, res) => res.status(200).json({ status: 'ok' }));


app.get('/objects', async (req, res) => {
  try {
    const objects = await readData();
    res.json(objects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка чтения данных' });
  }
});


app.post('/objects', async (req, res) => {
  try {
    const { name, ...others } = req.body;
    if (!name || typeof name !== 'string') {
      return res.status(400).json({ error: 'Поле name обязательно' });
    }

    const objects = await readData();
    const maxId = objects.reduce((m, o) => (o.id > m ? o.id : m), 0);
    const newObj = { id: maxId + 1, name, ...others };
    objects.push(newObj);
    await writeData(objects);
    res.status(201).json(newObj);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка создания объекта' });
  }
});


app.put('/objects/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, ...others } = req.body;
    if (!name || typeof name !== 'string') {
      return res.status(400).json({ error: 'Поле name обязательно' });
    }

    const objects = await readData();
    const index = objects.findIndex(o => o.id === id);
    if (index === -1) return res.status(404).json({ error: 'Объект не найден' });

    objects[index] = { ...objects[index], name, ...others };
    await writeData(objects);
    res.json(objects[index]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка обновления объекта' });
  }
});


app.delete('/objects/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const objects = await readData();
    const index = objects.findIndex(o => o.id === id);
    if (index === -1) return res.status(404).json({ error: 'Объект не найден' });

    objects.splice(index, 1);
    await writeData(objects);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка удаления объекта' });
  }
});

// 404 для всех других маршрутов
app.use((req, res) => res.status(404).json({ error: 'Маршрут не найден' }));

// --- Запуск сервера ---
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

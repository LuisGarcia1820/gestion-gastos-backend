const express = require("express");
const app = express();
const PORT = 3000;

// Permite que el servidor entienda formato JSON
app.use(express.json());

// Evita errores de bloqueo (CORS) al conectar con el HTML de forma local
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Datos de prueba iniciales
let gastos = [
  {
    id: 1,
    descripcion: "Servicios Públicos",
    monto: 85000,
    categoria: "Hogar",
  },
];

// 1. RUTA PARA LISTAR GASTOS (GET)
app.get("/api/gastos", (req, res) => {
  res.json(gastos);
});

// [NUEVA RUTA COMPLEMENTARIA]: RUTA PARA CREAR GASTO (POST)
// Necesaria para que el botón "Guardar" del formulario no falle
app.post("/api/gastos", (req, res) => {
  const { descripcion, monto, categoria } = req.body;

  const nuevoGasto = {
    id: gastos.length > 0 ? gastos[gastos.length - 1].id + 1 : 1, // Autoincrementa el ID
    descripcion,
    monto: parseFloat(monto),
    categoria,
  };

  gastos.push(nuevoGasto);
  res.status(201).json({ mensaje: "Creado", gasto: nuevoGasto });
});

// 2. RUTA PARA ACTUALIZAR UN GASTO (PUT)
app.put("/api/gastos/:id", (req, res) => {
  const { id } = req.params;
  const { descripcion, monto, categoria } = req.body;

  const gasto = gastos.find((g) => g.id === parseInt(id));

  if (!gasto) {
    return res.status(404).json({ error: "No encontrado" });
  }

  if (descripcion) gasto.descripcion = descripcion;
  if (monto) gasto.monto = parseFloat(monto);
  if (categoria) gasto.categoria = categoria;

  res.json({ mensaje: "Actualizado", gasto });
});

// 3. RUTA PARA ELIMINAR UN GASTO (DELETE)
app.delete("/api/gastos/:id", (req, res) => {
  const { id } = req.params;
  const index = gastos.findIndex((g) => g.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ error: "No encontrado" });
  }

  gastos.splice(index, 1);
  res.json({ mensaje: "Eliminado" });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

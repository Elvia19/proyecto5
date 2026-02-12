import React, { useEffect, useState } from "react";

// Componente principal
function App() {
  const [todos, setTodos] = useState([]); // Estado con la lista de tareas
  const [loading, setLoading] = useState(true); // Estado de carga
  const [nuevaTarea, setNuevaTarea] = useState(""); // Estado para input de nueva tarea
  const [filtro, setFiltro] = useState("todas"); // Estado para filtrar tareas: todas, completadas, pendientes

  const API_URL = "https://abcd1234.execute-api.us-east-1.amazonaws.com/todos"; // Tu API

  // Función que obtiene los datos desde la API
  const fetchTodos = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTodos(data);
      setLoading(false);
    } catch (error) {
      console.error("Error al cargar los datos:", error);
      setLoading(false);
    }
  };

  // useEffect se ejecuta al iniciar la app
  useEffect(() => {
    fetchTodos();
  }, []);

  // Función para agregar una nueva tarea
  const agregarTarea = async () => {
    if (nuevaTarea.trim() === "") return;
    try {
      // Enviar la tarea a la API (POST)
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: nuevaTarea, done: false })
      });
      if (response.ok) {
        fetchTodos(); // Recargar lista después de agregar
        setNuevaTarea(""); // Limpiar input
      }
    } catch (error) {
      console.error("Error al agregar tarea:", error);
    }
  };

  // Función para marcar tarea como completada
  const toggleDone = async (id, done) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ done: !done })
      });
      if (response.ok) fetchTodos();
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
    }
  };

  // Filtrar tareas según el estado
  const tareasFiltradas = todos.filter(todo => {
    if (filtro === "completadas") return todo.done;
    if (filtro === "pendientes") return !todo.done;
    return true; // todas
  });

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Lista de Tareas</h1>

      {/* Input para nueva tarea */}
      <input
        type="text"
        value={nuevaTarea}
        placeholder="Agregar nueva tarea"
        onChange={(e) => setNuevaTarea(e.target.value)}
      />
      <button onClick={agregarTarea}>Agregar</button>

      {/* Filtros */}
      <div style={{ margin: "10px 0" }}>
        <button onClick={() => setFiltro("todas")}>Todas</button>
        <button onClick={() => setFiltro("completadas")}>Completadas</button>
        <button onClick={() => setFiltro("pendientes")}>Pendientes</button>
      </div>

      {/* Lista de tareas */}
      {loading ? (
        <p>Cargando tareas...</p>
      ) : tareasFiltradas.length === 0 ? (
        <p>No hay tareas para mostrar</p>
      ) : (
        <ul>
          {tareasFiltradas.map(todo => (
            <li key={todo.id} style={{ cursor: "pointer" }}>
              <span
                onClick={() => toggleDone(todo.id, todo.done)}
                style={{
                  textDecoration: todo.done ? "line-through" : "none",
                  color: todo.done ? "green" : "black"
                }}
              >
                {todo.task} {todo.done ? "✅" : "❌"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;


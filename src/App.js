import React, { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nuevaTarea, setNuevaTarea] = useState("");
  const [filtro, setFiltro] = useState("todas");

  const API_URL = "https://abcd1234.execute-api.us-east-1.amazonaws.com/todos";

  // Obtener tareas desde la API
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

  useEffect(() => {
    fetchTodos();
  }, []);

  // Agregar nueva tarea
  const agregarTarea = async () => {
    if (nuevaTarea.trim() === "") return;
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: nuevaTarea, done: false }),
      });
      if (response.ok) {
        fetchTodos();
        setNuevaTarea("");
      }
    } catch (error) {
      console.error("Error al agregar tarea:", error);
    }
  };

  // Marcar tarea como completada/pendiente
  const toggleDone = async (id, done) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ done: !done }),
      });
      if (response.ok) fetchTodos();
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
    }
  };

  // Filtrar tareas
  const tareasFiltradas = todos.filter((todo) => {
    if (filtro === "completadas") return todo.done;
    if (filtro === "pendientes") return !todo.done;
    return true;
  });

  // Estilos
  const estilos = {
    contenedor: {
      maxWidth: "500px",
      margin: "40px auto",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f8f9fa",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    },
    titulo: {
      textAlign: "center",
      color: "#343a40",
    },
    input: {
      padding: "10px",
      width: "70%",
      borderRadius: "5px",
      border: "1px solid #ced4da",
      marginRight: "10px",
    },
    boton: {
      padding: "10px 15px",
      borderRadius: "5px",
      border: "none",
      backgroundColor: "#007bff",
      color: "white",
      cursor: "pointer",
    },
    filtroBoton: {
      padding: "5px 10px",
      margin: "0 5px",
      borderRadius: "5px",
      border: "none",
      cursor: "pointer",
    },
    lista: {
      listStyle: "none",
      padding: 0,
    },
    tarea: (done) => ({
      padding: "10px",
      margin: "5px 0",
      borderRadius: "5px",
      backgroundColor: done ? "#d4edda" : "#fff3cd",
      color: done ? "#155724" : "#856404",
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }),
  };

  return (
    <div style={estilos.contenedor}>
      <h1 style={estilos.titulo}>Lista de Tareas</h1>

      {/* Input y botón para nueva tarea */}
      <div style={{ marginBottom: "15px" }}>
        <input
          style={estilos.input}
          type="text"
          value={nuevaTarea}
          placeholder="Agregar nueva tarea"
          onChange={(e) => setNuevaTarea(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && agregarTarea()}
        />
        <button style={estilos.boton} onClick={agregarTarea}>
          Agregar
        </button>
      </div>

      {/* Botones de filtro */}
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <button
          style={{ ...estilos.filtroBoton, backgroundColor: filtro === "todas" ? "#007bff" : "#6c757d", color: "white" }}
          onClick={() => setFiltro("todas")}
        >
          Todas
        </button>
        <button
          style={{ ...estilos.filtroBoton, backgroundColor: filtro === "pendientes" ? "#ffc107" : "#6c757d", color: "white" }}
          onClick={() => setFiltro("pendientes")}
        >
          Pendientes
        </button>
        <button
          style={{ ...estilos.filtroBoton, backgroundColor: filtro === "completadas" ? "#28a745" : "#6c757d", color: "white" }}
          onClick={() => setFiltro("completadas")}
        >
          Completadas
        </button>
      </div>

      {/* Lista de tareas */}
      {loading ? (
        <p>Cargando tareas...</p>
      ) : tareasFiltradas.length === 0 ? (
        <p>No hay tareas para mostrar</p>
      ) : (
        <ul style={estilos.lista}>
          {tareasFiltradas.map((todo) => (
            <li key={todo.id} style={estilos.tarea(todo.done)} onClick={() => toggleDone(todo.id, todo.done)}>
              <span>{todo.task}</span>
              <span>{todo.done ? "✅" : "❌"}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";

function App() {

  // Estado donde se guardan las tareas
  const [todos, setTodos] = useState([]);

  // Estado para saber si está cargando la información
  const [loading, setLoading] = useState(true);

  // Estado para el input de nueva tarea
  const [nuevaTarea, setNuevaTarea] = useState("");

  // Estado para controlar el filtro (todas, pendientes, completadas)
  const [filtro, setFiltro] = useState("todas");

  // URL de tu API en AWS
  const API_URL = "https://abcd1234.execute-api.us-east-1.amazonaws.com/todos";


  // 🔵 FUNCIÓN PARA OBTENER TAREAS DESDE AWS
  const fetchTodos = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      setTodos(data); // Guardamos las tareas en el estado
      setLoading(false); // Quitamos el estado de carga
    } catch (error) {
      console.error("Error al cargar datos:", error);
      setLoading(false);
    }
  };

  // Se ejecuta automáticamente cuando la app inicia
  useEffect(() => {
    fetchTodos();
  }, []);


  // 🟢 FUNCIÓN PARA AGREGAR NUEVA TAREA
  const agregarTarea = () => {

    // Validamos que no esté vacío
    if (nuevaTarea.trim() === "") return;

    // Creamos una nueva tarea con ID temporal
    const nueva = {
      id: Date.now(), // ID único basado en tiempo
      task: nuevaTarea,
      done: false
    };

    // Agregamos la nueva tarea al estado actual
    setTodos([...todos, nueva]);

    // Limpiamos el input
    setNuevaTarea("");
  };


  // 🟡 FUNCIÓN PARA MARCAR COMPLETADA / PENDIENTE
  const toggleDone = (id) => {
    const actualizadas = todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    );

    setTodos(actualizadas);
  };


  // 🟣 FILTRO DE TAREAS
  const tareasFiltradas = todos.filter(todo => {
    if (filtro === "pendientes") return !todo.done;
    if (filtro === "completadas") return todo.done;
    return true;
  });


  // 🎨 ESTILOS IMPACTANTES
  const estilos = {
    fondo: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea, #764ba2)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    tarjeta: {
      backgroundColor: "white",
      padding: "30px",
      borderRadius: "15px",
      width: "400px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
    },
    titulo: {
      textAlign: "center",
      marginBottom: "20px",
      color: "#333"
    },
    input: {
      width: "70%",
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      marginRight: "10px"
    },
    botonAgregar: {
      padding: "10px 15px",
      borderRadius: "8px",
      border: "none",
      backgroundColor: "#667eea",
      color: "white",
      cursor: "pointer"
    },
    filtros: {
      marginTop: "15px",
      marginBottom: "15px",
      display: "flex",
      justifyContent: "space-between"
    },
    botonFiltro: {
      padding: "6px 10px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      backgroundColor: "#ddd"
    },
    lista: {
      listStyle: "none",
      padding: 0
    },
    tarea: (done) => ({
      padding: "10px",
      marginBottom: "8px",
      borderRadius: "8px",
      backgroundColor: done ? "#d4edda" : "#f8d7da",
      display: "flex",
      justifyContent: "space-between",
      cursor: "pointer"
    })
  };


  return (
    <div style={estilos.fondo}>
      <div style={estilos.tarjeta}>

        <h1 style={estilos.titulo}>📌 Lista de Tareas</h1>

        {/* INPUT Y BOTÓN */}
        <div>
          <input
            style={estilos.input}
            type="text"
            placeholder="Escribe una nueva tarea..."
            value={nuevaTarea}
            onChange={(e) => setNuevaTarea(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && agregarTarea()}
          />
          <button style={estilos.botonAgregar} onClick={agregarTarea}>
            Agregar
          </button>
        </div>

        {/* BOTONES DE FILTRO */}
        <div style={estilos.filtros}>
          <button style={estilos.botonFiltro} onClick={() => setFiltro("todas")}>
            Todas
          </button>
          <button style={estilos.botonFiltro} onClick={() => setFiltro("pendientes")}>
            Pendientes
          </button>
          <button style={estilos.botonFiltro} onClick={() => setFiltro("completadas")}>
            Completadas
          </button>
        </div>

        {/* LISTA */}
        {loading ? (
          <p>Cargando tareas...</p>
        ) : (
          <ul style={estilos.lista}>
            {tareasFiltradas.map(todo => (
              <li
                key={todo.id}
                style={estilos.tarea(todo.done)}
                onClick={() => toggleDone(todo.id)}
              >
                <span>{todo.task}</span>
                <span>{todo.done ? "✅" : "❌"}</span>
              </li>
            ))}
          </ul>
        )}

      </div>
    </div>
  );
}

export default App;

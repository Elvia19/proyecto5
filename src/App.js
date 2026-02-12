import React, { useEffect, useState } from 'react';

// Componente principal
function App() {
  const [todos, setTodos] = useState([]); // Guardamos la lista de tareas
  const [loading, setLoading] = useState(true); // Controla si aún estamos cargando datos

  // Función que obtiene los datos desde la API
  const fetchTodos = async () => {
    try {
      const response = await fetch("https://abcd1234.execute-api.us-east-1.amazonaws.com/todos"); // Reemplaza con tu URL
      const data = await response.json(); // Convertimos la respuesta JSON a objeto
      setTodos(data); // Guardamos las tareas en el estado
      setLoading(false); // Terminamos de cargar
    } catch (error) {
      console.error("Error al cargar los datos:", error);
      setLoading(false);
    }
  };

  // useEffect se ejecuta una vez al iniciar la app
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Lista de Tareas</h1>
      {loading ? (
        <p>Cargando tareas...</p>
      ) : (
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              {todo.task} {todo.done ? "✅" : "❌"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

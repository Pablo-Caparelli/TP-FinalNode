import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";

const socket = io("http://localhost:1234");

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [mensajes, setMensajes] = useState([]);
  const [nuevoMensaje, setNuevoMensaje] = useState("");
  const [chatId, setChatId] = useState(null);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");

  // ⚠️ TEMPORAL (después lo reemplazás con login real)
  const usuarioLogueadoId = "69efa7dd0ef2f02303ce7698";

  // 1. Cargar usuarios
  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const res = await axios.get("http://localhost:1234/users");
        setUsuarios(res.data);
      } catch (error) {
        console.error("Error al traer usuarios:", error);
      }
    };
    cargarUsuarios();
  }, []);

  // 2. Crear / obtener chat + historial
  useEffect(() => {
    if (usuarioSeleccionado) {
      const iniciarChat = async () => {
        try {
          // 🔥 Crear o buscar chat
          const resChat = await axios.post("http://localhost:1234/chats", {
            user1: usuarioLogueadoId,
            user2: usuarioSeleccionado._id,
          });

          const chat = resChat.data.data;
          setChatId(chat._id);

          // 🔥 Unirse al room
          socket.emit("join_chat", chat._id);

          // 🔥 Traer mensajes reales
          const resMensajes = await axios.get(
            `http://localhost:1234/messages/${chat._id}`,
          );

          if (resMensajes.data.success) {
            setMensajes(resMensajes.data.data);
          }
        } catch (error) {
          console.error("Error al iniciar chat:", error);
        }
      };

      iniciarChat();
    }
  }, [usuarioSeleccionado]);

  // 3. Escuchar mensajes en tiempo real
  useEffect(() => {
    socket.on("recibir_mensaje", (data) => {
      setMensajes((prev) => [...prev, data]);
    });

    return () => socket.off("recibir_mensaje");
  }, []);

  // 4. Enviar mensaje
  const enviarMensaje = async (e) => {
    e.preventDefault();

    if (!nuevoMensaje.trim() || !usuarioSeleccionado || !chatId) return;

    const payload = {
      text: nuevoMensaje,
      userId: usuarioLogueadoId,
      chatId: chatId, // ✅ ahora sí correcto
    };

    try {
      const res = await axios.post("http://localhost:1234/messages", payload);

      if (res.data.success) {
        socket.emit("enviar_mensaje", res.data.data);
        setNuevoMensaje("");
      }
    } catch (error) {
      console.error(
        "Error al enviar mensaje:",
        error.response?.data || error.message,
      );
    }
  };

  const crearUsuario = async (e) => {
    e.preventDefault();

    if (!nombre.trim() || !email.trim()) return;

    try {
      const res = await axios.post("http://localhost:1234/users", {
        name: nombre,
        email: email,
      });

      if (res.data.success) {
        // 🔥 lo agregamos sin recargar
        setUsuarios((prev) => [...prev, res.data.data]);

        // limpiar inputs
        setNombre("");
        setEmail("");
      }
    } catch (error) {
      console.error("Error al crear usuario:", error);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "sans-serif" }}>
      {/* SIDEBAR */}
      <div
        style={{
          width: "300px",
          borderRight: "1px solid #ddd",
          backgroundColor: "#f0f2f5",
        }}
      >
        <div
          style={{
            padding: "20px",
            backgroundColor: "#075e54",
            color: "white",
          }}
        >
          <h2 style={{ margin: 0 }}>Contactos</h2>
        </div>

        {/* 👇 FORMULARIO VA ACÁ (fuera del header) */}
        <form onSubmit={crearUsuario} style={{ padding: "10px" }}>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre"
            style={{
              width: "100%",
              marginBottom: "5px",
              padding: "8px",
            }}
          />

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            style={{
              width: "100%",
              marginBottom: "5px",
              padding: "8px",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "8px",
              backgroundColor: "#25d366",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Agregar usuario
          </button>
        </form>

        <div style={{ overflowY: "auto" }}>
          {usuarios.map((user) => (
            <div
              key={user._id}
              onClick={() => setUsuarioSeleccionado(user)}
              style={{
                padding: "15px",
                borderBottom: "1px solid #ddd",
                cursor: "pointer",
                backgroundColor:
                  usuarioSeleccionado?._id === user._id ? "#ebebeb" : "white",
              }}
            >
              <strong>{user.name}</strong>
              <div style={{ fontSize: "12px", color: "gray" }}>
                {user.email}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CHAT */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#e5ddd5",
        }}
      >
        {usuarioSeleccionado ? (
          <>
            <header style={{ padding: "15px", backgroundColor: "#ededed" }}>
              <strong>Chat con {usuarioSeleccionado.name}</strong>
            </header>

            <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
              {mensajes.map((m, i) => (
                <div
                  key={m._id || i}
                  style={{
                    margin: "10px 0",
                    padding: "10px",
                    backgroundColor:
                      m.userId === usuarioLogueadoId
                        ? "#dcf8c6" // 🟢 estilo WhatsApp (enviado)
                        : "white",
                    borderRadius: "8px",
                    width: "fit-content",
                  }}
                >
                  {m.text}
                </div>
              ))}
            </div>

            <form
              onSubmit={enviarMensaje}
              style={{
                padding: "15px",
                display: "flex",
                backgroundColor: "#f0f0f0",
              }}
            >
              <input
                value={nuevoMensaje}
                onChange={(e) => setNuevoMensaje(e.target.value)}
                placeholder="Escribe un mensaje..."
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "20px",
                  border: "1px solid #ccc",
                }}
              />

              <button
                type="submit"
                style={{
                  marginLeft: "10px",
                  padding: "10px 20px",
                  backgroundColor: "#128c7e",
                  color: "white",
                  border: "none",
                  borderRadius: "20px",
                }}
              >
                Enviar
              </button>
            </form>
          </>
        ) : (
          <div style={{ margin: "auto" }}>Selecciona un contacto</div>
        )}
      </div>
    </div>
  );
}

export default App;

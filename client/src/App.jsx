import React, { useEffect, useState } from 'react'
import { listIncidents, createIncident, updateIncident, deleteIncident } from './api'
import IncidentList from './components/IncidentList'
import IncidentForm from './components/IncidentForm'
import Cart from './components/Cart'
import Login from './components/Login'
import { CartProvider } from './context/CartContext'

export default function App() {
  const [incidents, setIncidents] = useState([])
  const [editing, setEditing] = useState(null)
  const [query, setQuery] = useState('')
  const [cartVisible, setCartVisible] = useState(false)
  const [user, setUser] = useState(null)

  const load = async (q = '') => {
    const items = await listIncidents(q)
    setIncidents(items)
  }

  useEffect(() => { if (user) load() }, [user])

  const onCreate = async (data) => {
    await createIncident(data)
    await load(query)
  }

  const onUpdate = async (id, data) => {
    await updateIncident(id, data)
    setEditing(null)
    await load(query)
  }

  const onDelete = async (id) => {
    await deleteIncident(id)
    await load(query)
  }

  const onSearch = async (e) => {
    e.preventDefault()
    await load(query)
  }

  // Si no hay usuario logueado → mostrar pantalla de login
  if (!user) {
    return <Login onLogin={setUser} />
  }

  return (
    <CartProvider>
      <div className="container">
        <div className="header">
          <h1>Incidencias - Soporte</h1>
          <div className="user-info">
            <span>👤 {user.email}</span>
            <button onClick={() => setUser(null)}>Cerrar sesión</button>
            <button onClick={() => setCartVisible(true)}>🛒 Carrito</button>
          </div>
        </div>

        <div className="top-row">
          <form onSubmit={onSearch}>
            <input placeholder="Buscar por texto..." value={query} onChange={e => setQuery(e.target.value)} />
            <button type="submit">Buscar</button>
            <button type="button" onClick={() => { setQuery(''); load('') }}>Limpiar</button>
          </form>
        </div>

        <div className="grid">
          <div className="panel">
            <h2>Crear nueva incidencia</h2>
            <IncidentForm onSubmit={onCreate} submitLabel="Crear" />
          </div>

          <div className="panel">
            <h2>Lista de incidencias</h2>
            <IncidentList items={incidents} onEdit={setEditing} onDelete={onDelete} />
          </div>
        </div>

        {editing && (
          <div className="modal">
            <div className="modal-content">
              <h3>Editar incidencia</h3>
              <IncidentForm
                initial={editing}
                onSubmit={(data) => onUpdate(editing.id, data)}
                submitLabel="Guardar"
                onCancel={() => setEditing(null)}
              />
            </div>
          </div>
        )}

        <Cart visible={cartVisible} onClose={() => setCartVisible(false)} />
      </div>
    </CartProvider>
  )
}

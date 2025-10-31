import React from 'react'
import { useCart } from '../context/CartContext'

export default function IncidentList({ items = [], onEdit, onDelete }) {
  const { addToCart } = useCart();

  if (!items.length) return <div>No hay incidencias</div>

  return (
    <div className="list">
      {items.map(it => (
        <div className="card" key={it.id}>
          <div className="card-header">
            <strong>{it.title}</strong>
            <small>{new Date(it.created_at).toLocaleString()}</small>
          </div>
          <div className="card-body">
            <p>{it.description}</p>
            <p><em>Cliente:</em> {it.customer_name || '-'} | {it.customer_phone || '-'}</p>
            <p><strong>Estado:</strong> {it.status}</p>
          </div>
          <div className="card-actions">
            <button onClick={() => onEdit(it)}>Editar</button>
            <button onClick={() => { if (confirm('Eliminar incidencia?')) onDelete(it.id) }}>Eliminar</button>
            <button
              onClick={() => addToCart(it)}
              style={{
                backgroundColor: '#4f46e5',
                color: 'white',
                border: 'none',
                padding: '5px 10px',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              🛒 Agregar
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

import React, { useState } from 'react'

export default function IncidentForm({ initial = {}, onSubmit, submitLabel='Guardar', onCancel }){
  const [title, setTitle] = useState(initial.title || '')
  const [description, setDescription] = useState(initial.description || '')
  const [status, setStatus] = useState(initial.status || 'abierta')
  const [customer_name, setCustomerName] = useState(initial.customer_name || '')
  const [customer_phone, setCustomerPhone] = useState(initial.customer_phone || '')
  const [loading, setLoading] = useState(false)

  const submit = async (e) =>{
    e.preventDefault()
    setLoading(true)
    try{
      await onSubmit({ title, description, status, customer_name, customer_phone })
      // limpiar formulario si fue creación
      if(!initial.id){
        setTitle('')
        setDescription('')
        setStatus('abierta')
        setCustomerName('')
        setCustomerPhone('')
      }
    }catch(err){
      alert('Error: ' + err.message)
    }finally{
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="form">
      <label>Título</label>
      <input value={title} onChange={e=>setTitle(e.target.value)} required />

      <label>Descripción</label>
      <textarea value={description} onChange={e=>setDescription(e.target.value)} />

      <label>Estado</label>
      <select value={status} onChange={e=>setStatus(e.target.value)}>
        <option value="abierta">abierta</option>
        <option value="en_progreso">en_progreso</option>
        <option value="resuelta">resuelta</option>
      </select>

      <label>Nombre cliente</label>
      <input value={customer_name} onChange={e=>setCustomerName(e.target.value)} />

      <label>Teléfono cliente</label>
      <input value={customer_phone} onChange={e=>setCustomerPhone(e.target.value)} />

      <div className="form-actions">
        <button disabled={loading} type="submit">{submitLabel}</button>
        {onCancel && <button type="button" onClick={onCancel}>Cancelar</button>}
      </div>
    </form>
  )
}

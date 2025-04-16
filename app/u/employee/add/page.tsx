'use client'

import React, { useState } from 'react'
import { database } from '../../../../config/firebase' // ajuste o caminho conforme seu projeto
import { v4 as uuidv4 } from 'uuid'

export default function EmployeeForm() {
  const [form, setForm] = useState({
    photo: '', name: '', email: '', phone: '', BI: '', address: '',
    fatherName: '', matherName: '', altura: '', bron: '', BI_epired: '',
    stade: '', cargo: '', Start: '', job: '', AgenteNumber: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const id = uuidv4()

    try {
      await database.ref(`employees/${id}`).set({ id, ...form })
      alert('Funcionário cadastrado com sucesso!')
      setForm(
        { 
        photo: '', name: '', email: '', phone: '', BI: '', address: '',
        fatherName: '', matherName: '', altura: '', bron: '', BI_epired: '',
        stade: '', cargo: '', Start: '', job: '', AgenteNumber: '',
      })
    } catch (error) {
      console.error('Erro ao salvar funcionário:', error)
      alert('Erro ao cadastrar funcionário.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 max-w-xl mx-auto mt-10">
      {Object.keys(form).map((field) => (
        <input
          key={field}
          type="text"
          name={field}
          value={(form as any)[field]}
          onChange={handleChange}
          placeholder={field}
          className="border border-gray-300 px-4 py-2 rounded-md"
        />
      ))}
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Cadastrar Funcionário
      </button>
    </form>
  )
}

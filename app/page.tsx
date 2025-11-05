'use client'
import { useState, useEffect, FormEvent } from 'react'
import { supabase } from '../lib/supabaseClient'

interface Student {
  id: number
  name: string
  age: number
}

export default function Home() {
  const [students, setStudents] = useState<Student[]>([])
  const [name, setName] = useState('')
  const [age, setAge] = useState('')

  // 🧠 Fetch data from Supabase
  async function fetchStudents(): Promise<void> {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .order('id', { ascending: true })
    if (error) console.error('Error fetching data:', error)
    else setStudents(data ?? [])
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  // ➕ Add student
  async function addStudent(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    if (!name || !age) return alert('Please fill all fields')
    const { error } = await supabase.from('students').insert([{ name, age: Number(age) }])
    if (error) console.error('Error adding student:', error)
    else {
      setName('')
      setAge('')
      fetchStudents()
    }
  }

  // ✏️ Update student
  async function updateStudent(id: number, currentAge: number): Promise<void> {
    const newAgeStr = prompt('Enter new age:', String(currentAge))
    if (newAgeStr === null) return
    const newAge = Number(newAgeStr)
    if (Number.isNaN(newAge)) return alert('Invalid age')
    const { error } = await supabase.from('students').update({ age: newAge }).eq('id', id)
    if (error) console.error('Error updating student:', error)
    else fetchStudents()
  }

  // ❌ Delete student
  async function deleteStudent(id: number): Promise<void> {
    if (!confirm('Are you sure you want to delete this student?')) return
    const { error } = await supabase.from('students').delete().eq('id', id)
    if (error) console.error('Error deleting student:', error)
    else fetchStudents()
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">🎓 Student Manager</h1>

      {/* Add Form */}
      <form
        onSubmit={addStudent}
        className="bg-white p-6 rounded-2xl shadow-md mb-8 w-full max-w-md flex flex-col sm:flex-row gap-2"
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-24 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add
        </button>
      </form>

      {/* Students List */}
      <div className="w-full max-w-md space-y-3">
        {students.length === 0 ? (
          <p className="text-gray-500 text-center">No students yet.</p>
        ) : (
          students.map((s) => (
            <div
              key={s.id}
              className="bg-white shadow p-4 rounded-xl flex justify-between items-center border border-gray-200"
            >
              <div>
                <h2 className="font-semibold text-gray-800">{s.name}</h2>
                <p className="text-sm text-gray-500">Age: {s.age}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => updateStudent(s.id, s.age)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteStudent(s.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

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
      .order('id', { ascending: false })
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
    <div
      className="relative min-h-screen flex flex-col items-center justify-start py-16 overflow-hidden"
      style={{
      background:
        'radial-gradient(circle at 10% 10%, rgba(138,92,255,0.12), transparent 12%),' +
        'radial-gradient(circle at 90% 90%, rgba(6,182,212,0.08), transparent 15%),' +
        'linear-gradient(180deg, #06020a 0%, #0b1020 30%, #2a0b3a 100%)',
      color: 'white',
      }}
    >
      {/* Decorative mystical blobs */}
      <div className="pointer-events-none absolute -left-24 -top-24 w-80 h-80 rounded-full bg-purple-500 opacity-20 blur-3xl transform rotate-12" />
      <div className="pointer-events-none absolute -right-32 top-32 w-96 h-96 rounded-full bg-cyan-400 opacity-14 blur-3xl transform -rotate-12" />
      <div className="pointer-events-none absolute inset-0 animate-[pulse_12s_linear_infinite] opacity-5 bg-[radial-gradient(closest-side,rgba(255,255,255,0.03),transparent)]" />

      <h1 className="z-10 text-4xl sm:text-5xl font-extrabold mb-8 bg-clip-text text-transparent"
      style={{
        backgroundImage: 'linear-gradient(90deg,#c084fc,#60a5fa,#34d399)',
        textShadow: '0 6px 30px rgba(0,0,0,0.6)',
      }}
      >
      🔮 Arcane Student Ledger
      </h1>

      <div className="z-10 w-full max-w-3xl px-6">
      {/* Add Form */}
      <form
        onSubmit={addStudent}
        className="backdrop-blur-md bg-white/6 border border-white/8 shadow-xl rounded-3xl p-5 mb-8 flex flex-col sm:flex-row gap-3 items-center"
      >
        <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="flex-1 bg-white/4 placeholder:text-white/60 text-white border border-white/6 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-300 transition"
        />
        <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        className="w-28 bg-white/4 placeholder:text-white/60 text-white border border-white/6 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-300 transition"
        />
        <button
        type="submit"
        className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 hover:scale-[1.02] text-white px-5 py-3 rounded-lg shadow-md transition"
        >
        Add
        </button>
      </form>

      {/* Students List */}
      <div className="space-y-4">
        {students.length === 0 ? (
        <div className="backdrop-blur-md bg-white/4 border border-white/6 rounded-2xl p-8 text-center text-white/80 shadow-lg">
          <p className="text-lg">No students yet. The grimoire is empty... for now.</p>
        </div>
        ) : (
        students.map((s) => (
          <div
          key={s.id}
          className="relative overflow-hidden backdrop-blur-sm bg-gradient-to-r from-white/3 to-white/6 border border-white/6 rounded-2xl p-4 flex justify-between items-center shadow-lg hover:shadow-2xl transition"
          >
          {/* rune accent */}
          <div className="absolute -left-8 -top-8 w-24 h-24 rounded-full bg-gradient-to-tr from-violet-500/10 to-cyan-400/6 blur-2xl pointer-events-none" />

          <div>
            <h2 className="font-semibold text-white text-lg">{s.name}</h2>
            <p className="text-sm text-white/70">Age: {s.age}</p>
          </div>
          <div className="flex gap-3">
            <button
            onClick={() => updateStudent(s.id, s.age)}
            className="px-3 py-1 rounded-md bg-yellow-400/90 hover:bg-yellow-500 text-black text-sm shadow-sm transition"
            >
            Edit
            </button>
            <button
            onClick={() => deleteStudent(s.id)}
            className="px-3 py-1 rounded-md bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 text-white text-sm shadow-sm transition"
            >
            Delete
            </button>
          </div>
          </div>
        ))
        )}
      </div>
      </div>

      {/* Footer sigil */}
      <div className="z-0 absolute bottom-8 left-1/2 -translate-x-1/2 text-white/20 text-xs">
      <span>✵ Ancient Mage Theme • glassmorphism • high-contrast</span>
      </div>
    </div>
  )
}


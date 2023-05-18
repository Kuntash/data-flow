'use client'
import { createAccount } from '@main/utils'
import { useState } from 'react'

export default function Home() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async () => {
    const payload = {
      name,
      email,
      password,
    }
    await createAccount(payload)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={handleSubmit}>Create account</button>
    </main>
  )
}

'use client'
import { UserAtom } from '@main/globalState/user'
import { createAccount } from '@main/utils'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'

export default function Home() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userState] = useAtom(UserAtom)

  const handleSignUp = async () => {
    const payload = {
      name,
      email,
      password,
    }
    await createAccount(payload)
  }

  useEffect(() => {
    console.log('user state: ', userState)
  }, [userState])
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

      <button onClick={handleSignUp}>Create account</button>
    </main>
  )
}

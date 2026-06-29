const base = 'http://localhost:5000/api/users'

async function req(path, opts) {
  const res = await fetch(`${base}${path}`, opts)
  const body = await res.text()
  try { return JSON.parse(body) } catch { return body }
}

(async () => {
  try {
    console.log('Registering user...')
    const reg = await req('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Auto Tester', email: 'auto@example.com', password: 'pass1234', role: 'Student' })
    })
    console.log('Register response:', reg)

    console.log('Logging in...')
    const login = await req('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'auto@example.com', password: 'pass1234' })
    })
    console.log('Login response:', login)

    const id = (login && login.user && login.user._id) || (reg && reg.user && reg.user._id)
    if (!id) {
      console.error('No user id returned; aborting dashboard fetch')
      process.exit(1)
    }

    console.log('Fetching dashboard...')
    const dash = await req(`/dashboard/${id}`, { method: 'GET' })
    console.log('Dashboard response:', dash)
  } catch (err) {
    console.error('Test script error:', err)
    process.exit(1)
  }
})()

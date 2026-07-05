import { useState } from 'react'
import { themeConfig } from './config/theme.config'
import { CookieConsent } from './components/CookieConsent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Welcome to {themeConfig.appName}
        </h1>
        <p className="text-xl text-muted-foreground">
          Enterprise-grade boilerplate with React, Vite, Tailwind CSS, and Shadcn UI.
        </p>
        
        <div className="p-8 border border-border rounded-lg bg-card text-card-foreground shadow-sm">
          <button 
            onClick={() => setCount((c) => c + 1)}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Count is {count}
          </button>
          <p className="mt-4 text-sm text-muted-foreground">
            Edit <code className="font-mono bg-muted px-1 py-0.5 rounded">src/App.tsx</code> and save to test HMR
          </p>
        </div>
      </div>
      <CookieConsent />
    </div>
  )
}

export default App

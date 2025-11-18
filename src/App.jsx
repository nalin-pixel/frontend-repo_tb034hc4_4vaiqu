import { useState } from 'react'
import DocumentUploader from './components/DocumentUploader'
import DocumentList from './components/DocumentList'

function App() {
  const [refresh, setRefresh] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]" />

      <div className="relative min-h-screen p-6">
        <header className="max-w-5xl mx-auto mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Docs Ascenseurs</h1>
          <p className="text-blue-200/80">Téléversez, recherchez, visualisez et téléchargez des documents par marque.</p>
        </header>

        <main className="max-w-5xl mx-auto grid grid-cols-1 gap-6">
          <section>
            <h2 className="text-white font-semibold mb-3">Ajouter un document</h2>
            <DocumentUploader onUploaded={() => setRefresh(r => r+1)} />
          </section>

          <section key={refresh}>
            <h2 className="text-white font-semibold mb-3">Bibliothèque</h2>
            <DocumentList />
          </section>
        </main>
      </div>
    </div>
  )
}

export default App

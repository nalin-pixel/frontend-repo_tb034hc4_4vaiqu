import { useEffect, useState } from 'react'

const BACKEND = import.meta.env.VITE_BACKEND_URL

export default function DocumentList() {
  const [items, setItems] = useState([])
  const [brand, setBrand] = useState('')
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(false)

  const load = async () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (brand) params.set('brand', brand)
    if (q) params.set('q', q)
    const res = await fetch(`${BACKEND}/api/documents?${params.toString()}`)
    const data = await res.json()
    setItems(data.items || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  return (
    <div className="bg-slate-800/50 border border-blue-500/20 rounded-xl p-4">
      <div className="flex gap-2 mb-3">
        <input value={brand} onChange={(e)=>setBrand(e.target.value)} placeholder="Marque" className="px-3 py-2 rounded bg-slate-900/60 text-white border border-slate-700"/>
        <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Recherche" className="px-3 py-2 rounded bg-slate-900/60 text-white border border-slate-700 flex-1"/>
        <button onClick={load} className="px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded">Rechercher</button>
      </div>
      {loading ? <p className="text-blue-200">Chargement...</p> : (
        <ul className="divide-y divide-slate-700">
          {items.map(it => (
            <li key={it.id} className="py-3 flex items-center justify-between">
              <div>
                <p className="text-white font-medium">{it.title} <span className="text-xs text-blue-300/70">({it.brand})</span></p>
                {it.description && <p className="text-blue-300/70 text-sm">{it.description}</p>}
                {it.size != null && <p className="text-blue-300/50 text-xs">{(it.size/1024/1024).toFixed(2)} MB</p>}
              </div>
              <div className="flex gap-2">
                <a href={`${BACKEND}/api/documents/${it.id}/view`} target="_blank" rel="noreferrer" className="px-3 py-1 text-sm bg-slate-700 hover:bg-slate-600 text-white rounded">Visualiser</a>
                <a href={`${BACKEND}/api/documents/${it.id}/download`} className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-500 text-white rounded">Télécharger</a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

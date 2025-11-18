import { useState } from 'react'

const BACKEND = import.meta.env.VITE_BACKEND_URL

export default function DocumentUploader({ onUploaded }) {
  const [file, setFile] = useState(null)
  const [brand, setBrand] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!file) return setError('Choisissez un fichier')
    if (!brand || !title) return setError('Marque et titre sont requis')

    const form = new FormData()
    form.append('brand', brand)
    form.append('title', title)
    if (description) form.append('description', description)
    if (tags) form.append('tags', tags)
    form.append('file', file)

    setLoading(true)
    try {
      const res = await fetch(`${BACKEND}/api/documents`, {
        method: 'POST',
        body: form,
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Erreur lors de l\'upload')
      onUploaded?.(data)
      setFile(null)
      setTitle('')
      setDescription('')
      setTags('')
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800/50 border border-blue-500/20 rounded-xl p-4 space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input value={brand} onChange={(e)=>setBrand(e.target.value)} placeholder="Marque (ex: Otis)" className="px-3 py-2 rounded bg-slate-900/60 text-white border border-slate-700"/>
        <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Titre du document" className="px-3 py-2 rounded bg-slate-900/60 text-white border border-slate-700"/>
      </div>
      <input value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Description (optionnel)" className="w-full px-3 py-2 rounded bg-slate-900/60 text-white border border-slate-700"/>
      <input value={tags} onChange={(e)=>setTags(e.target.value)} placeholder="Tags séparés par des virgules" className="w-full px-3 py-2 rounded bg-slate-900/60 text-white border border-slate-700"/>

      <input type="file" onChange={(e)=>setFile(e.target.files?.[0]||null)} className="block w-full text-blue-200"/>
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <button disabled={loading} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md disabled:opacity-50">
        {loading ? 'Téléchargement...' : 'Uploader'}
      </button>
    </form>
  )
}

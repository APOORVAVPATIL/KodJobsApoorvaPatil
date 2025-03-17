export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      <header className="border-b bg-white">
        <div className="container mx-auto py-4">
          <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow animate-pulse">
          <div className="p-6 space-y-6">
            <div className="flex gap-4">
              <div className="h-20 w-20 bg-gray-200 rounded-full" />
              <div className="space-y-2">
                <div className="h-6 w-48 bg-gray-200 rounded" />
                <div className="h-4 w-32 bg-gray-200 rounded" />
              </div>
            </div>
            
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-6 w-32 bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-2/3 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
} 
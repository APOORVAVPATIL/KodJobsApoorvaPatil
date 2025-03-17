export default function Loading() {
  return (
    <main className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="border rounded-lg overflow-hidden bg-white shadow-sm p-6 animate-pulse">
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-slate-200 rounded-md"></div>
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-slate-200 rounded"></div>
                  <div className="h-3 w-24 bg-slate-200 rounded"></div>
                </div>
              </div>
              <div className="h-4 w-16 bg-slate-200 rounded"></div>
            </div>
            <div className="mt-4 space-y-3">
              <div className="h-6 w-3/4 bg-slate-200 rounded"></div>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="h-6 w-16 bg-slate-200 rounded-full"></div>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <div className="h-4 w-32 bg-slate-200 rounded"></div>
                <div className="h-8 w-24 bg-slate-200 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}


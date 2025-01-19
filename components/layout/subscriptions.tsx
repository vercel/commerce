import Link from 'next/link';

export default function Subscriptions() {
  return (
    <div className="p-4">
      <h2 className="mb-6 text-3xl font-bold">Abbonamenti</h2>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-4">
        {/* Settimanale */}
        <div className="flex h-[40vh] w-full flex-col items-center justify-center rounded-lg border p-6 text-center">
          <h3 className="mb-2 text-xl font-semibold">Settimanale</h3>
          <p className="mb-4">Abbonati per una settimana</p>
          <p className="my-2 text-xl font-bold">4 w/€</p>
          <Link href="/subscribe/settimanale" className="rounded bg-blue-600 px-4 py-2 text-white">
            Iscriviti
          </Link>
        </div>
        {/* Mensile */}
        <div className="flex h-[40vh] flex-col items-center justify-center rounded-lg border p-6 text-center">
          <h3 className="mb-2 text-xl font-semibold">Mensile</h3>
          <p className="mb-4">Abbonati per un mese</p>
          <p className="my-2 text-xl font-bold">10 m/€</p>
          <Link href="/subscribe/mensile" className="rounded bg-blue-600 px-4 py-2 text-white">
            Iscriviti
          </Link>
        </div>
        {/* Annuale */}
        <div className="flex h-[40vh] flex-col items-center justify-center rounded-lg border p-6 text-center">
          <h3 className="mb-2 text-xl font-semibold">Annuale</h3>
          <p className="mb-4">Abbonati per un anno</p>
          <p className="my-2 text-xl font-bold">100 y/€</p>
          <Link href="/subscribe/annuale" className="rounded bg-blue-600 px-4 py-2 text-white">
            Iscriviti
          </Link>
        </div>
        {/* Luxury */}
        <div className="flex h-[40vh] flex-col items-center justify-center rounded-lg border p-6 text-center">
          <h3 className="mb-2 text-xl font-semibold">Luxury</h3>
          <p className="mb-4">Esperienza premium</p>
          <p className="my-2 text-xl font-bold">20 m/€</p>
          <Link href="/subscribe/luxury" className="rounded bg-blue-600 px-4 py-2 text-white">
            Iscriviti
          </Link>
        </div>
      </div>
    </div>
  );
}

export function ServiceExpiredPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f3f6f4] px-6 text-[#16352b]">
      <section className="w-full max-w-xl rounded-3xl border border-[#16352b]/15 bg-white p-8 text-center shadow-xl">
        <p className="text-sm uppercase tracking-[0.25em] text-[#be6c3c]">Service Notice</p>
        <h1 className="mt-4 text-3xl font-semibold">Website Service Has Expired</h1>
        <p className="mt-4 text-[#466158]">Please contact your service representative to renew and restore access.</p>
        <a className="mt-8 inline-flex rounded-full border border-[#16352b]/25 px-5 py-2.5 text-sm hover:bg-[#16352b] hover:text-white" href="/admin/login">
          Administrator Login
        </a>
      </section>
    </main>
  )
}

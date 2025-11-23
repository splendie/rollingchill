export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Yellow */}
      <section className="bg-[#FDD835] py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-black text-center">
            Our Products
          </h1>
        </div>
      </section>

      {/* Products Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Products coming soon...</p>
        </div>
      </section>
    </main>
  );
}

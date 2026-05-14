import Image from "next/image"
import { categories } from "../../data/Data"

const FeaturedCategories = () => {
  return (
    <section className="py-20 px-6 md:px-16 bg-white">

      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-[2rem] font-extrabold text-gray-900 tracking-tight">Featured Categories</h2>
        <p className="text-gray-400 text-sm mt-2">Lorem ipsum dolor sit amet</p>
      </div>

      {/* Cards row */}
      <div className="flex gap-4 justify-center flex-wrap">
        {categories.map((cat, i) => (
          <div
            key={cat.id}
            className={`group relative flex flex-col w-[160px] md:w-[185px] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
              i === 2
                ? "ring-2 ring-[#1a5c5c] shadow-lg shadow-teal-900/10"
                : "border border-gray-100 shadow-sm"
            }`}
          >
            {/* Top label */}
            <div className="bg-white px-4 pt-4 pb-2 z-10">
              <p className="text-[13px] font-bold text-gray-800">{cat.title}</p>
              <p className="text-[11px] text-gray-400 mt-0.5">{cat.count} Properties</p>
            </div>

            {/* Image */}
            <div className="relative h-[140px] w-full overflow-hidden">
              <Image
                src={cat.img}
                alt={cat.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* subtle gradient at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FeaturedCategories

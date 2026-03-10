export default function HeroSection() {
  return (
    <section
      className="bg-cover bg-center h-125 text-white flex items-center justify-center"
      style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold">
          Unlocking Boundless Possibilities
        </h1>
        <p className="mt-2 text-lg">
          Our multiverse of success in diverse industries
        </p>
      </div>
    </section>
  );
}

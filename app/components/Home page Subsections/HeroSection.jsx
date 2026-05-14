import heroimg from "../../../public/hero.png"
import Image from "next/image"

const HeroSection = () => {
    return (
        <section>

            <div className="relative w-full h-screen">
                <Image
                    src={heroimg}
                    alt="hero image"
                    fill
                    className="object-cover"
                />
            </div>

        </section>
    )
}

export default HeroSection
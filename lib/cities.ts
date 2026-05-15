export interface City {
  slug: string;
  name: string;
  province: string;
  tagline: string;
  description: string;
  img: string;
  heroImg: string;
  count: number;
  avgPrice: string;
  topAreas: string[];
  highlights: { label: string; value: string }[];
  large?: boolean;
}

const cities: City[] = [
  {
    slug: "lahore",
    name: "Lahore",
    province: "Punjab",
    tagline: "The Heart of Pakistan",
    description: "Lahore is Pakistan's cultural capital and one of its most vibrant real estate markets. From the luxury enclaves of DHA and Bahria Town to the historic charm of Gulberg, Lahore offers something for every buyer and investor.",
    img: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=900&q=80",
    heroImg: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=1600&q=80",
    count: 3,
    avgPrice: "PKR 1.8 Crore",
    topAreas: ["DHA Phase 5", "Bahria Town", "Gulberg", "Model Town", "Johar Town"],
    highlights: [
      { label: "Listings",   value: "3+"    },
      { label: "Avg. Price", value: "1.8 Cr" },
      { label: "Top Area",   value: "DHA"   },
      { label: "Growth",     value: "+12%"  },
    ],
    large: true,
  },
  {
    slug: "karachi",
    name: "Karachi",
    province: "Sindh",
    tagline: "City of Lights",
    description: "Pakistan's financial hub and largest city, Karachi boasts a dynamic property market with premium developments in Clifton, DHA, and Bahria Town. Ideal for both residential and commercial investments.",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    heroImg: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80",
    count: 2,
    avgPrice: "PKR 2.5 Crore",
    topAreas: ["Clifton", "DHA", "Bahria Town", "Gulshan-e-Iqbal", "North Nazimabad"],
    highlights: [
      { label: "Listings",   value: "2+"    },
      { label: "Avg. Price", value: "2.5 Cr" },
      { label: "Top Area",   value: "Clifton" },
      { label: "Growth",     value: "+9%"   },
    ],
  },
  {
    slug: "islamabad",
    name: "Islamabad",
    province: "ICT",
    tagline: "The Green Capital",
    description: "Pakistan's planned capital city is known for its wide tree-lined avenues, modern infrastructure, and premium real estate. F and G sectors remain the most sought-after addresses for families and diplomats alike.",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
    heroImg: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80",
    count: 2,
    avgPrice: "PKR 3.5 Crore",
    topAreas: ["F-7", "F-10", "F-11", "Blue Area", "Bahria Town Phase 8"],
    highlights: [
      { label: "Listings",   value: "2+"    },
      { label: "Avg. Price", value: "3.5 Cr" },
      { label: "Top Area",   value: "F-7"   },
      { label: "Growth",     value: "+15%"  },
    ],
  },
  {
    slug: "rawalpindi",
    name: "Rawalpindi",
    province: "Punjab",
    tagline: "The Twin City",
    description: "Rawalpindi's proximity to Islamabad makes it one of Pakistan's fastest-growing real estate markets. Bahria Town Phase 8 and Saddar remain hotspots for both residential and commercial buyers.",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
    heroImg: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80",
    count: 1,
    avgPrice: "PKR 2.1 Crore",
    topAreas: ["Bahria Town Phase 8", "Saddar", "Chaklala", "Gulraiz", "PWD Housing"],
    highlights: [
      { label: "Listings",   value: "1+"    },
      { label: "Avg. Price", value: "2.1 Cr" },
      { label: "Top Area",   value: "Bahria" },
      { label: "Growth",     value: "+11%"  },
    ],
  },
  {
    slug: "peshawar",
    name: "Peshawar",
    province: "KPK",
    tagline: "Gateway to the North",
    description: "Peshawar is KPK's capital and an emerging real estate destination. With new housing schemes and commercial developments, the city offers excellent value for early investors.",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
    heroImg: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80",
    count: 1,
    avgPrice: "PKR 1.2 Crore",
    topAreas: ["Hayatabad", "University Town", "Saddar", "Gulbahar", "Ring Road"],
    highlights: [
      { label: "Listings",   value: "1+"    },
      { label: "Avg. Price", value: "1.2 Cr" },
      { label: "Top Area",   value: "Hayatabad" },
      { label: "Growth",     value: "+8%"   },
    ],
  },
];

export default cities;

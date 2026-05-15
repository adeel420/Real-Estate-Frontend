export interface Property {
  id: string;
  title: string;
  location: string;
  city: string;
  price: string;
  priceRaw: number;
  type: "For Sale" | "For Rent";
  category: "Apartment" | "Villa" | "Commercial" | "Plot";
  beds?: number;
  baths?: number;
  area: number;
  agentName: string;
  agentInitials: string;
  img: string;
  featured?: boolean;
}

const properties: Property[] = [
  {
    id: "1",
    title: "Modern 3-Bed Apartment in DHA",
    location: "DHA Phase 5, Lahore",
    city: "Lahore",
    price: "PKR 1.8 Crore",
    priceRaw: 18000000,
    type: "For Sale",
    category: "Apartment",
    beds: 3,
    baths: 2,
    area: 1400,
    agentName: "Ahmed Raza",
    agentInitials: "AR",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&q=80",
    featured: true,
  },
  {
    id: "2",
    title: "Luxury Villa with Pool",
    location: "Bahria Town, Karachi",
    city: "Karachi",
    price: "PKR 4.5 Crore",
    priceRaw: 45000000,
    type: "For Sale",
    category: "Villa",
    beds: 5,
    baths: 4,
    area: 4200,
    agentName: "Sara Khan",
    agentInitials: "SK",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=700&q=80",
    featured: true,
  },
  {
    id: "3",
    title: "Commercial Plaza Ground Floor",
    location: "Blue Area, Islamabad",
    city: "Islamabad",
    price: "PKR 85,000/mo",
    priceRaw: 85000,
    type: "For Rent",
    category: "Commercial",
    area: 1800,
    agentName: "Usman Ali",
    agentInitials: "UA",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=700&q=80",
  },
  {
    id: "4",
    title: "Residential Plot 10 Marla",
    location: "Gulberg, Lahore",
    city: "Lahore",
    price: "PKR 2.2 Crore",
    priceRaw: 22000000,
    type: "For Sale",
    category: "Plot",
    area: 2250,
    agentName: "Fatima Malik",
    agentInitials: "FM",
    img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=700&q=80",
  },
  {
    id: "5",
    title: "Cozy 2-Bed Apartment",
    location: "Clifton Block 4, Karachi",
    city: "Karachi",
    price: "PKR 45,000/mo",
    priceRaw: 45000,
    type: "For Rent",
    category: "Apartment",
    beds: 2,
    baths: 1,
    area: 950,
    agentName: "Bilal Hussain",
    agentInitials: "BH",
    img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=700&q=80",
  },
  {
    id: "6",
    title: "Modern Villa in Bahria Town",
    location: "Bahria Town Phase 8, Rawalpindi",
    city: "Rawalpindi",
    price: "PKR 3.1 Crore",
    priceRaw: 31000000,
    type: "For Sale",
    category: "Villa",
    beds: 4,
    baths: 3,
    area: 3500,
    agentName: "Nadia Shah",
    agentInitials: "NS",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=700&q=80",
  },
  {
    id: "7",
    title: "Commercial Office Space",
    location: "Saddar, Peshawar",
    city: "Peshawar",
    price: "PKR 55,000/mo",
    priceRaw: 55000,
    type: "For Rent",
    category: "Commercial",
    area: 1200,
    agentName: "Tariq Mehmood",
    agentInitials: "TM",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=80",
  },
  {
    id: "8",
    title: "Corner Plot 1 Kanal",
    location: "F-10, Islamabad",
    city: "Islamabad",
    price: "PKR 6.8 Crore",
    priceRaw: 68000000,
    type: "For Sale",
    category: "Plot",
    area: 4500,
    agentName: "Zara Qureshi",
    agentInitials: "ZQ",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80",
  },
];

export default properties;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Banner from "../Banner/Banner";
import "./HomePage.css";

const categories = [
  { name: "Araçlar", path: "/vehicle", image: "https://temelbilgi.com/wp-content/uploads/2021/11/2021-mazda3-incelemesi-1-850x638.jpg" },
  { name: "Elektronik", path: "/electronic", image: "https://ares.shiftdelete.net/2024/11/samsung-2.jpg" },
  { name: "Kıyafetler", path: "/dress", image: "https://www.atlihangiyim.com/wp-content/uploads/2023/06/IMG_8515-1024x683.jpg" },
  { name: "Emlak", path: "/estate", image: "https://st2.depositphotos.com/3108485/8897/i/450/depositphotos_88979780-stock-photo-holding-house-representing-home-ownership.jpg" },
  { name: "Müzik Aletleri", path: "/music", image: "https://www.rekormuzik.com/UserFiles/Image/images/muzik_aleti_satin_alirken_dikkat_edilmesi_gerekenler.jpg" },
];

const HomePage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
    // Arama terimine göre en uygun kategoriyi bul
    const searchTermLower = term.toLowerCase();
    const matchingCategory = categories.find(category => 
      category.name.toLowerCase().includes(searchTermLower)
    );

    if (matchingCategory) {
      navigate(matchingCategory.path);
    }
  };

  return (
    <div className="homepage">
      
      {/* Tek Banner */}
      <Banner 
        onSearch={handleSearch}
        title="Açık Artırmalar Başladı!"
        description="Hayalinizdeki ürünü en iyi fiyatla yakalayın."
        backgroundImage="https://static.vecteezy.com/ti/gratis-vektor/p1/17441708-auktionshammer-symbol-holzhammer-gesetzeskonzept-isolierteillustration-vektor.jpg"
        overlayOpacity={0.5}
        searchPlaceholder="Kategori adı ile arama yapın..."
      />

      {/* Kategoriler */}
      <motion.h2 
        className="homepage-title"
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Kategoriler
      </motion.h2>

      <div className="category-grid">
        {categories.map((category, index) => (
          <motion.div 
            key={index} 
            className="category-card"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <Link to={category.path} className="category-link">
              <div 
                className="category-bg" 
                style={{ backgroundImage: `url(${category.image})` }}
              />
              <div className="category-overlay">
                <h2>{category.name}</h2>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

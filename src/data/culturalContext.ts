/**
 * Cultural Visual Context Dataset
 * Respectful, iconic landmarks, art forms, traditions, and natural wonders
 * representing cultures associated with each language.
 */

export interface CulturalItem {
  title: string;
  caption: string;
  imageUrl: string;
  category: 'landmark' | 'tradition' | 'nature' | 'art';
}

export interface CulturalContext {
  region: string;
  tagline: string;
  items: CulturalItem[];
}

// Fallback / Default for Auto-Detect prior to language detection
export const GLOBAL_CULTURAL_CONTEXT: CulturalContext = {
  region: 'Global Linguistic Heritage',
  tagline: 'Bridging 7,000+ living languages, diverse civilizations & human wisdom.',
  items: [
    {
      title: 'Ancient Rosetta Stone',
      caption: 'Rosetta Stone & script decipherment, Egypt & Global Heritage',
      imageUrl: 'https://images.unsplash.com/photo-1599732488828-592f72ecb1be?auto=format&fit=crop&w=400&q=80',
      category: 'landmark',
    },
    {
      title: 'World UNESCO Library',
      caption: 'Classical manuscripts & world archives preservation',
      imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=400&q=80',
      category: 'art',
    },
    {
      title: 'Global Cultural Crossroads',
      caption: 'International cultural exchange & harmony',
      imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80',
      category: 'nature',
    },
  ],
};

export const CULTURAL_CONTEXT_MAP: Record<string, CulturalContext> = {
  // Malayalam (Kerala)
  ml: {
    region: 'Kerala & Malayali Culture',
    tagline: 'God’s Own Country: Classical Kathakali, lush backwaters & spice traditions.',
    items: [
      {
        title: 'Kathakali Classical Dance',
        caption: 'Kathakali classical dance drama with elaborate Vesham makeup',
        imageUrl: 'https://images.unsplash.com/photo-1609137144822-0d1911974d64?auto=format&fit=crop&w=400&q=80',
        category: 'art',
      },
      {
        title: 'Kerala Backwaters & Houseboat',
        caption: 'Serene palm-fringed backwaters & Kettuvallam houseboats, Alappuzha',
        imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=400&q=80',
        category: 'nature',
      },
      {
        title: 'Theyyam Ritual Artform',
        caption: 'Theyyam sacred ceremonial dance of North Malabar',
        imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80',
        category: 'tradition',
      },
    ],
  },

  // Marathi (Maharashtra)
  mr: {
    region: 'Maharashtra & Marathi Heritage',
    tagline: 'Land of Chhatrapati Shivaji Maharaj, historic Sahyadri hill forts & Ganpati Utsav.',
    items: [
      {
        title: 'Gateway of India, Mumbai',
        caption: 'Iconic Indo-Saracenic arch overlooking the Arabian Sea',
        imageUrl: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
      {
        title: 'Ganeshotsav Celebration',
        caption: 'Grand Ganeshotsav festival & traditional Dhol-Tasha folk ensembles',
        imageUrl: 'https://images.unsplash.com/photo-1567591414240-e17ee96277ad?auto=format&fit=crop&w=400&q=80',
        category: 'tradition',
      },
      {
        title: 'Ajanta & Ellora Caves',
        caption: 'Ancient rock-cut Buddhist, Hindu & Jain monastic temples, Aurangabad',
        imageUrl: 'https://images.unsplash.com/photo-1609946850406-81cfdf789212?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
    ],
  },

  // Hindi (North & Central India)
  hi: {
    region: 'India & Hindi Literary Traditions',
    tagline: 'Vibrant cultural heritage, classical festivals of light & timeless monuments.',
    items: [
      {
        title: 'Taj Mahal, Agra',
        caption: 'UNESCO World Heritage ivory-white marble mausoleum on the Yamuna',
        imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
      {
        title: 'Diwali Festival of Lights',
        caption: 'Traditional terracotta earthen diyas illuminated for Deepawali',
        imageUrl: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=400&q=80',
        category: 'tradition',
      },
      {
        title: 'Ghats of Varanasi',
        caption: 'Ancient riverfront heritage & spiritual traditions on the sacred Ganga',
        imageUrl: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
    ],
  },

  // Chinese (Simplified & Traditional)
  'zh-CN': {
    region: 'China & East Asian Heritage',
    tagline: 'Ancient civilizational philosophy, classical dynasty architecture & poetic calligraphy.',
    items: [
      {
        title: 'The Great Wall of China',
        caption: 'Ancient stone fortifications winding along northern mountain ridges',
        imageUrl: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
      {
        title: 'Classical Temple & Pagoda',
        caption: 'Traditional curved roof eaves & courtyard architecture',
        imageUrl: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
      {
        title: 'Spring Blossom Festival',
        caption: 'Blooming cherry & plum blossoms during traditional Lunar Spring celebrations',
        imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80',
        category: 'nature',
      },
    ],
  },
  'zh-TW': {
    region: 'Taiwan & Traditional Chinese Arts',
    tagline: 'Living preservation of traditional characters, night markets & mountain tea gardens.',
    items: [
      {
        title: 'Jiufen Old Town',
        caption: 'Historic mountain lantern streets overlooking the northern coast',
        imageUrl: 'https://images.unsplash.com/photo-1508247967583-7d982ea01526?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
      {
        title: 'Sun Moon Lake',
        caption: 'Serene misty alpine lake and Wenwu lakeside temple',
        imageUrl: 'https://images.unsplash.com/photo-1552993873-0dd1110e025f?auto=format&fit=crop&w=400&q=80',
        category: 'nature',
      },
      {
        title: 'Traditional Lantern Art',
        caption: 'Pingxi sky lantern blessings and calligraphy traditions',
        imageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=400&q=80',
        category: 'tradition',
      },
    ],
  },

  // French
  fr: {
    region: 'France & Francophone World',
    tagline: 'Artistic salon culture, iconic culinary arts & timeless romantic architecture.',
    items: [
      {
        title: 'Eiffel Tower & Paris Skyline',
        caption: 'Iconic iron lattice tower standing gracefully above the Champ de Mars',
        imageUrl: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
      {
        title: 'Château & French Countryside',
        caption: 'Historic Loire Valley châteaux, lavender fields & vineyard terraces',
        imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
      {
        title: 'Parisian Café Culture',
        caption: 'Bustling sidewalk bistro terrace, fresh croissants & literary gatherings',
        imageUrl: 'https://images.unsplash.com/photo-1550340499-a6c60fc8287c?auto=format&fit=crop&w=400&q=80',
        category: 'tradition',
      },
    ],
  },

  // Japanese
  ja: {
    region: 'Japan & Japanese Aesthetic',
    tagline: 'Harmony of ancient shinto tranquility, zen gardens & cutting-edge modernity.',
    items: [
      {
        title: 'Mount Fuji & Chureito Pagoda',
        caption: 'Sacred snow-capped volcano framed by blooming sakura cherry blossoms',
        imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
      {
        title: 'Fushimi Inari Torii Gates',
        caption: 'Vermilion torii gate corridor winding through sacred Mount Inari forest',
        imageUrl: 'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
      {
        title: 'Traditional Tea Ceremony',
        caption: 'Zen chado matcha tea preparation honoring mindfulness & guest hospitality',
        imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80',
        category: 'tradition',
      },
    ],
  },

  // English
  en: {
    region: 'Anglophone World & Literature',
    tagline: 'From historic Westminster to vast landscapes of global English literature.',
    items: [
      {
        title: 'Big Ben & Westminster, London',
        caption: 'Elizabeth Tower and the historic Houses of Parliament along the River Thames',
        imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
      {
        title: 'Cotswolds & Rolling Countryside',
        caption: 'Quaint honey-stone stone cottages and historic pastoral countryside',
        imageUrl: 'https://images.unsplash.com/photo-1520967824495-b529aeba26df?auto=format&fit=crop&w=400&q=80',
        category: 'nature',
      },
      {
        title: 'Historic Oxford Library',
        caption: 'Radcliffe Camera and Bodleian library scholastic architectural heritage',
        imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80',
        category: 'art',
      },
    ],
  },

  // Spanish
  es: {
    region: 'Spain & Hispanic World',
    tagline: 'Passionate flamenco rhythm, monumental cathedrals & sunny Mediterranean plazas.',
    items: [
      {
        title: 'Sagrada Família, Barcelona',
        caption: 'Antoni Gaudí’s breathtaking modernist basilica with intricate organic spires',
        imageUrl: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
      {
        title: 'Alhambra Palaces, Granada',
        caption: 'Nasrid Islamic palatial courtyards and Moorish tilework in Andalusia',
        imageUrl: 'https://images.unsplash.com/photo-1591871937573-74dbba515c4c?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
      {
        title: 'Flamenco Cultural Art',
        caption: 'Passionate traditional acoustic Spanish guitar and expressive dance art',
        imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80',
        category: 'art',
      },
    ],
  },

  // German
  de: {
    region: 'Germany & Central European Traditions',
    tagline: 'Fairy-tale castles, classical music heritage & forested alpine peaks.',
    items: [
      {
        title: 'Neuschwanstein Castle',
        caption: '19th-century Romanesque Revival palace nestled in the Bavarian Alps',
        imageUrl: 'https://images.unsplash.com/photo-1534313314376-a72289b6181e?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
      {
        title: 'Brandenburg Gate, Berlin',
        caption: 'Neoclassical monument symbolizing European unity and peace',
        imageUrl: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
      {
        title: 'Black Forest Alpine Scenery',
        caption: 'Evergreen forested mountain ranges and timber-framed historic towns',
        imageUrl: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=400&q=80',
        category: 'nature',
      },
    ],
  },

  // Korean
  ko: {
    region: 'Korea & Hallyu Culture',
    tagline: 'Joseon royal palaces, vibrant hanbok textiles & energetic urban creativity.',
    items: [
      {
        title: 'Gyeongbokgung Royal Palace',
        caption: 'Grand Joseon dynasty throne hall and ceremonial mountain backdrop, Seoul',
        imageUrl: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
      {
        title: 'Bukchon Hanok Village',
        caption: 'Traditional wooden tiled hanok homes nestled within modern cityscape',
        imageUrl: 'https://images.unsplash.com/photo-1546874177-9e664107314e?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
      {
        title: 'Traditional Hanbok Attire',
        caption: 'Graceful vibrant silk traditional garments celebrated during seasonal holidays',
        imageUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=400&q=80',
        category: 'tradition',
      },
    ],
  },

  // Arabic
  ar: {
    region: 'Arab World & Middle East',
    tagline: 'Rich poetic tradition, breathtaking desert dunes & intricate geometric calligraphy.',
    items: [
      {
        title: 'Sheikh Zayed Grand Mosque',
        caption: 'Dazzling white Macedonian marble domes and reflective courtyard pools',
        imageUrl: 'https://images.unsplash.com/photo-1512632570417-a60028753dda?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
      {
        title: 'Petra Nabataean Treasury',
        caption: 'Magnificent rock-carved rose-red facade of Al-Khazneh in Jordan',
        imageUrl: 'https://images.unsplash.com/photo-1579606032822-4a00b0f4df34?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
      {
        title: 'Arabian Desert Dunes',
        caption: 'Golden windswept sand dunes and celestial stargazing night skies',
        imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=400&q=80',
        category: 'nature',
      },
    ],
  },

  // Russian
  ru: {
    region: 'Russia & Slavic Traditions',
    tagline: 'Colorful onion-domed cathedrals, vast taiga forests & classical ballet artistry.',
    items: [
      {
        title: 'Saint Basil’s Cathedral',
        caption: 'Iconic vibrant onion domes on Red Square in Moscow',
        imageUrl: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
      {
        title: 'Winter Palace & Hermitage',
        caption: 'Baroque imperial architecture and grand canals of Saint Petersburg',
        imageUrl: 'https://images.unsplash.com/photo-1547448415-e9f5b28e570d?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
      {
        title: 'Lake Baikal Winter Ice',
        caption: 'World’s oldest and deepest freshwater lake with crystal blue ice fractures',
        imageUrl: 'https://images.unsplash.com/photo-1551845041-63e8e76836ea?auto=format&fit=crop&w=400&q=80',
        category: 'nature',
      },
    ],
  },

  // Portuguese
  pt: {
    region: 'Portugal & Lusophone World',
    tagline: 'Atlantic maritime history, azulejo ceramic tiles & soulful Fado melodies.',
    items: [
      {
        title: 'Belém Tower, Lisbon',
        caption: '16th-century Manueline fortified tower on the northern bank of the Tagus',
        imageUrl: 'https://images.unsplash.com/photo-1509024644558-2f56ce76c490?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
      {
        title: 'Traditional Azulejo Tiles',
        caption: 'Elaborate blue and white glazed ceramic tile murals adorning facades',
        imageUrl: 'https://images.unsplash.com/photo-1555881400-74d7acaacd81?auto=format&fit=crop&w=400&q=80',
        category: 'art',
      },
      {
        title: 'Pena Palace, Sintra',
        caption: 'Romanticist castle painted in bright pastel yellow and red atop Sintra mountains',
        imageUrl: 'https://images.unsplash.com/photo-1585208798174-6ced3877fd10?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
    ],
  },

  // Italian
  it: {
    region: 'Italy & Classical Renaissance',
    tagline: 'Cradle of the Renaissance, ancient Roman forums & picturesque Tuscan hills.',
    items: [
      {
        title: 'Colosseum of Rome',
        caption: 'Ancient stone amphitheatre standing at the center of the Eternal City',
        imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
      {
        title: 'Grand Canal of Venice',
        caption: 'Historic palazzos and gondolas navigating Venetian waterways',
        imageUrl: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
      {
        title: 'Rolling Hills of Tuscany',
        caption: 'Cypress-lined farm roads, sunlit vineyards & olive groves',
        imageUrl: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=400&q=80',
        category: 'nature',
      },
    ],
  },

  // Bengali
  bn: {
    region: 'Bengal & Bengali Renaissance',
    tagline: 'Land of Rabindranath Tagore, vibrant Durga Puja festivities & Sundarbans.',
    items: [
      {
        title: 'Victoria Memorial, Kolkata',
        caption: 'Grand white Makrana marble monument surrounded by lush reflection pools',
        imageUrl: 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
      {
        title: 'Durga Puja Celebrations',
        caption: 'Spectacular art installations, pandals, and dhak drumming traditions',
        imageUrl: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=400&q=80',
        category: 'tradition',
      },
      {
        title: 'Sundarbans Mangrove Forest',
        caption: 'World’s largest coastal mangrove forest and delta sanctuary',
        imageUrl: 'https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?auto=format&fit=crop&w=400&q=80',
        category: 'nature',
      },
    ],
  },

  // Tamil
  ta: {
    region: 'Tamil Nadu & Dravidian Heritage',
    tagline: 'Ancient Sangam literature, towering temple Gopurams & Bharatanatyam.',
    items: [
      {
        title: 'Meenakshi Amman Temple',
        caption: 'Towering multi-tiered temple gopurams adorned with vibrant sculpted deities',
        imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
      {
        title: 'Shore Temple, Mamallapuram',
        caption: 'UNESCO World Heritage 8th-century granite rock-cut coastal shrine',
        imageUrl: 'https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
      {
        title: 'Bharatanatyam Dance Art',
        caption: 'Classical Indian dance characterized by expressive mudras and rhythmic footwork',
        imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80',
        category: 'art',
      },
    ],
  },

  // Telugu
  te: {
    region: 'Andhra Pradesh & Telangana',
    tagline: 'Historic Charminar, Golconda diamond fortresses & classical Kuchipudi.',
    items: [
      {
        title: 'Charminar, Hyderabad',
        caption: 'Iconic 16th-century four-minaret monument and bustling Old City bazaar',
        imageUrl: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
      {
        title: 'Golconda Fort Architecture',
        caption: 'Medieval citadel renowned for acoustic engineering and royal palaces',
        imageUrl: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
      {
        title: 'Tirumala Venkateswara Temple',
        caption: 'Sacred hill shrine of Tirupati surrounded by the Seshachalam hills',
        imageUrl: 'https://images.unsplash.com/photo-1609946850406-81cfdf789212?auto=format&fit=crop&w=400&q=80',
        category: 'tradition',
      },
    ],
  },

  // Gujarati
  gu: {
    region: 'Gujarat & Heritage of Peace',
    tagline: 'Birthplace of Mahatma Gandhi, vibrant Garba folk dances & Rani ki Vav.',
    items: [
      {
        title: 'Rani ki Vav Stepwell, Patan',
        caption: 'Intricately sculpted UNESCO underground stepwell and temple pavilion',
        imageUrl: 'https://images.unsplash.com/photo-1609946850406-81cfdf789212?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
      {
        title: 'Navratri Garba Dance',
        caption: 'Colorful circular folk dance and traditional chaniya choli during Navratri',
        imageUrl: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=400&q=80',
        category: 'tradition',
      },
      {
        title: 'White Desert of Kutch',
        caption: 'Shimmering white salt desert marshes under the luminous full moon',
        imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=400&q=80',
        category: 'nature',
      },
    ],
  },

  // Punjabi
  pa: {
    region: 'Punjab & Land of Five Rivers',
    tagline: 'The Golden Temple, warm hospitality, energetic Bhangra & fertile golden fields.',
    items: [
      {
        title: 'Sri Harmandir Sahib (Golden Temple)',
        caption: 'Gilded gurdwara illuminated over the sacred Amrit Sarovar, Amritsar',
        imageUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
      {
        title: 'Bhangra Folk Ensemble',
        caption: 'High-energy harvest festival celebration with dhol percussion and turbans',
        imageUrl: 'https://images.unsplash.com/photo-1567591414240-e17ee96277ad?auto=format&fit=crop&w=400&q=80',
        category: 'tradition',
      },
      {
        title: 'Lush Mustard Fields',
        caption: 'Endless golden-yellow mustard blooms celebrating the arrival of Vaisakhi',
        imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80',
        category: 'nature',
      },
    ],
  },

  // Urdu
  ur: {
    region: 'Urdu Literary Heritage & South Asia',
    tagline: 'Refined ghazals, Mughal poetic courts & historic arched havelis.',
    items: [
      {
        title: 'Badshahi Mosque, Lahore',
        caption: 'Majestic carved red sandstone Mughal courtyard and marble domes',
        imageUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
      {
        title: 'Faisal Mosque, Islamabad',
        caption: 'Contemporary tent-shaped architecture set against the Margalla Hills',
        imageUrl: 'https://images.unsplash.com/photo-1512632570417-a60028753dda?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
      {
        title: 'Classical Urdu Calligraphy',
        caption: 'Nastaliq poetic calligraphy script and traditional inkcraft',
        imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=400&q=80',
        category: 'art',
      },
    ],
  },

  // Turkish
  tr: {
    region: 'Turkey & Anatolian Crossroads',
    tagline: 'Where East meets West: Hagia Sophia, Cappadocia fairy chimneys & Grand Bazaar.',
    items: [
      {
        title: 'Hagia Sophia, Istanbul',
        caption: 'Monumental Byzantine dome and historic minarets over the Bosphorus strait',
        imageUrl: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
      {
        title: 'Cappadocia Hot Air Balloons',
        caption: 'Sunrise balloon flights floating over volcanic tuff fairy chimneys',
        imageUrl: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=400&q=80',
        category: 'nature',
      },
      {
        title: 'Grand Bazaar & Turkish Lamps',
        caption: 'Mosaic glass lanterns and aromatic spice lanes in historic Istanbul',
        imageUrl: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=400&q=80',
        category: 'tradition',
      },
    ],
  },

  // Vietnamese
  vi: {
    region: 'Vietnam & Indochina Heritage',
    tagline: 'Emerald waters of Ha Long Bay, lantern-lit Hội An & lush rice terraces.',
    items: [
      {
        title: 'Hạ Long Bay Limestone Karsts',
        caption: 'Towering emerald islets and traditional wooden junk boats on the Gulf of Tonkin',
        imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=400&q=80',
        category: 'nature',
      },
      {
        title: 'Hội An Ancient Town',
        caption: 'Silk lantern-lit canal streets and historic wooden merchant houses',
        imageUrl: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
      {
        title: 'Mu Cang Chai Terraces',
        caption: 'Cascading golden mountain rice terraces sculpted along northwest slopes',
        imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80',
        category: 'nature',
      },
    ],
  },

  // Thai
  th: {
    region: 'Thailand & Kingdom of Siam',
    tagline: 'Gilded Buddhist wats, floating river markets & serene tropical islands.',
    items: [
      {
        title: 'Grand Palace & Wat Phra Kaew',
        caption: 'Gilded spires and the sacred Temple of the Emerald Buddha, Bangkok',
        imageUrl: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
      {
        title: 'Loy Krathong Festival of Lights',
        caption: 'Floating candlelit lotus baskets on tranquil rivers carrying prayers',
        imageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=400&q=80',
        category: 'tradition',
      },
      {
        title: 'Phi Phi Islands Limestone Cliffs',
        caption: 'Crystal-clear turquoise waters and dramatic karst sea cliffs in the Andaman Sea',
        imageUrl: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=400&q=80',
        category: 'nature',
      },
    ],
  },

  // Greek
  el: {
    region: 'Greece & Aegean Civilization',
    tagline: 'Cradle of Western democracy, classical philosophy & whitewashed islands.',
    items: [
      {
        title: 'Parthenon & Acropolis, Athens',
        caption: 'Classical 5th-century BC Doric temple dedicated to goddess Athena',
        imageUrl: 'https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
      {
        title: 'Santorini Blue Domes',
        caption: 'Whitewashed cliffside villas and blue-domed chapels overlooking the caldera',
        imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=400&q=80',
        category: 'nature',
      },
      {
        title: 'Meteora Monasteries',
        caption: 'Historic Eastern Orthodox monasteries perched atop natural sandstone rock pillars',
        imageUrl: 'https://images.unsplash.com/photo-1504512485720-7d83a16ee930?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
    ],
  },

  // Hebrew
  he: {
    region: 'Israel & Levantine Heritage',
    tagline: 'Ancient stone alleys of Jerusalem, serene Dead Sea & innovative Mediterranean coast.',
    items: [
      {
        title: 'Old City of Jerusalem',
        caption: 'Historic golden limestone ramparts, Western Wall & iconic golden dome',
        imageUrl: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
      {
        title: 'Dead Sea Salt Formations',
        caption: 'Mineral-rich hypersaline waters and dramatic turquoise salt islands',
        imageUrl: 'https://images.unsplash.com/photo-1568851406497-6a1571d87e07?auto=format&fit=crop&w=400&q=80',
        category: 'nature',
      },
      {
        title: 'Jaffa Ancient Port',
        caption: 'Ancient stone alleyways, artists’ quarters & Mediterranean sea breeze',
        imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
    ],
  },

  // Dutch
  nl: {
    region: 'Netherlands & Dutch Culture',
    tagline: 'Historic canal rings, historic windmills, vibrant tulips & artistic master painters.',
    items: [
      {
        title: 'Amsterdam Canal Houses',
        caption: '17th-century gabled canal houses lining tree-shaded waterways',
        imageUrl: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
      {
        title: 'Kinderdijk Historic Windmills',
        caption: 'UNESCO drainage windmill network in the polder landscape',
        imageUrl: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
      {
        title: 'Keukenhof Tulip Fields',
        caption: 'Vibrant spring tulip rows blooming across Dutch flower fields',
        imageUrl: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=400&q=80',
        category: 'nature',
      },
    ],
  },

  // Swedish
  sv: {
    region: 'Sweden & Scandinavia',
    tagline: 'Gamla Stan cobblestones, midnight sun & tranquil archipelagos.',
    items: [
      {
        title: 'Gamla Stan, Stockholm',
        caption: 'Colorful ochre townhouses on Stortorget square in Old Town',
        imageUrl: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
      {
        title: 'Swedish Archipelago Summer',
        caption: 'Granite islands, traditional red Falu wooden cabins & sailing waters',
        imageUrl: 'https://images.unsplash.com/photo-1508189860394-7f21e51b8c27?auto=format&fit=crop&w=400&q=80',
        category: 'nature',
      },
      {
        title: 'Northern Lights (Aurora Borealis)',
        caption: 'Vibrant green celestial auroras dancing over Swedish Lapland',
        imageUrl: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=400&q=80',
        category: 'nature',
      },
    ],
  },

  // Polish
  pl: {
    region: 'Poland & Central Europe',
    tagline: 'Wawel Royal Castle, historic amber markets & Bialowieza primeval forests.',
    items: [
      {
        title: 'Kraków Main Market Square',
        caption: 'Renaissance Cloth Hall (Sukiennice) and St. Mary’s twin Gothic towers',
        imageUrl: 'https://images.unsplash.com/photo-1519197924294-4ba991a11128?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
      {
        title: 'Wawel Royal Castle',
        caption: 'Gothic and Renaissance royal residence overlooking the Vistula River',
        imageUrl: 'https://images.unsplash.com/photo-1541845157-a6d2d100c931?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
      {
        title: 'Tatra Mountain Valleys',
        caption: 'Granite peaks and crystal alpine tarns on the southern border',
        imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80',
        category: 'nature',
      },
    ],
  },

  // Indonesian
  id: {
    region: 'Indonesia & Nusantara',
    tagline: 'Emerald volcanic isles, Borobudur stupas & rich Batik textile arts.',
    items: [
      {
        title: 'Borobudur Temple Stupas',
        caption: 'World’s largest 9th-century Buddhist sanctuary nestled in Central Java',
        imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
      {
        title: 'Ulun Danu Bratan, Bali',
        caption: 'Iconic water temple resting gracefully on Lake Bratan with misty mountains',
        imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
      {
        title: 'Tegallalang Rice Terraces',
        caption: 'Traditional Subak irrigation rice paddies carved along palm valleys',
        imageUrl: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=400&q=80',
        category: 'nature',
      },
    ],
  },

  // Swahili
  sw: {
    region: 'Swahili Coast & East Africa',
    tagline: 'Zanzibar dhow sailing, Mount Kilimanjaro snows & Serengeti migrations.',
    items: [
      {
        title: 'Serengeti Savannah Wildlife',
        caption: 'Vast golden acacia plains during the Great Wildebeest Migration',
        imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=400&q=80',
        category: 'nature',
      },
      {
        title: 'Mount Kilimanjaro Summit',
        caption: 'Africa’s highest volcanic peak rising majestically over the savannah',
        imageUrl: 'https://images.unsplash.com/photo-1589553416260-f586c8f1514f?auto=format&fit=crop&w=400&q=80',
        category: 'nature',
      },
      {
        title: 'Stone Town & Zanzibar Dhows',
        caption: 'Traditional wooden dhow sailboats gliding over turquoise Indian Ocean waters',
        imageUrl: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=400&q=80',
        category: 'tradition',
      },
    ],
  },

  // Ukrainian
  uk: {
    region: 'Ukraine & Eastern European Heritage',
    tagline: 'Golden domes of Kyiv Pechersk Lavra, sunflower plains & Vyshyvanka embroidery.',
    items: [
      {
        title: 'Saint Sophia’s Cathedral, Kyiv',
        caption: 'Ancient 11th-century Byzantine cathedral with gilded green cupolas',
        imageUrl: 'https://images.unsplash.com/photo-1561542320-9a18cd340469?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
      {
        title: 'Carpathian Wooden Churches',
        caption: 'Traditional wooden tserkvas nestled in lush mountain foothills',
        imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
      {
        title: 'Golden Sunflower Fields',
        caption: 'Expansive golden sunflower fields beneath broad azure skies',
        imageUrl: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=400&q=80',
        category: 'nature',
      },
    ],
  },

  // Filipino / Tagalog
  tl: {
    region: 'Philippines & Pearl of the Orient',
    tagline: 'Banaue ancient rice terraces, crystal lagoons of Palawan & warm Bayanihan spirit.',
    items: [
      {
        title: 'Banaue Rice Terraces, Ifugao',
        caption: '2,000-year-old mountain terraces hand-carved by indigenous Ifugao ancestors',
        imageUrl: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=400&q=80',
        category: 'nature',
      },
      {
        title: 'El Nido, Palawan Lagoons',
        caption: 'Turquoise lagoons framed by dramatic towering black limestone karsts',
        imageUrl: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=400&q=80',
        category: 'nature',
      },
      {
        title: 'Vigan Heritage Street',
        caption: 'Preserved Spanish colonial cobblestone Calle Crisologo and ancestral mansions',
        imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
    ],
  },

  // Persian (Farsi)
  fa: {
    region: 'Iran & Persian Civilization',
    tagline: 'Ancient Persepolis columns, dazzling Isfahan tilework & classical Hafez poetry.',
    items: [
      {
        title: 'Nasir al-Mulk (Pink Mosque)',
        caption: 'Stunning kaleidoscope stained glass morning illumination in Shiraz',
        imageUrl: 'https://images.unsplash.com/photo-1579606032822-4a00b0f4df34?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
      {
        title: 'Naqsh-e Jahan Square, Isfahan',
        caption: 'Magnificent Safavid royal square with turquoise arabesque domes',
        imageUrl: 'https://images.unsplash.com/photo-1512632570417-a60028753dda?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
      {
        title: 'Ancient Persepolis Gateways',
        caption: 'Achaemenid imperial capital ceremonial relief carvings, Fars province',
        imageUrl: 'https://images.unsplash.com/photo-1609946850406-81cfdf789212?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
    ],
  },

  // Nepali
  ne: {
    region: 'Nepal & Himalayan Heritage',
    tagline: 'Swayambhunath eyes of wisdom, Mount Everest peaks & prayer flags.',
    items: [
      {
        title: 'Mount Everest (Sagarmatha)',
        caption: 'World’s highest majestic snow peak rising into the Himalayan stratosphere',
        imageUrl: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=400&q=80',
        category: 'nature',
      },
      {
        title: 'Boudhanath Stupa Mandala',
        caption: 'Massive sacred Buddhist stupa with fluttering colorful prayer flags, Kathmandu',
        imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
      {
        title: 'Patan Durbar Square',
        caption: 'Newar carved wooden pagoda temples and bronze statuary',
        imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80',
        category: 'tradition',
      },
    ],
  },

  // Kannada
  kn: {
    region: 'Karnataka & Vijayanagara Empire',
    tagline: 'Hampi granite ruins, Mysore royal illumination & Western Ghats coffee hills.',
    items: [
      {
        title: 'Stone Chariot, Hampi',
        caption: 'Magnificent 16th-century Vijayanagara monolithic stone chariot shrine',
        imageUrl: 'https://images.unsplash.com/photo-1609946850406-81cfdf789212?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
      {
        title: 'Mysore Palace Illumination',
        caption: 'Indo-Saracenic royal palace glowing with nearly 100,000 festival lights',
        imageUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
      {
        title: 'Yakshagana Theatre Art',
        caption: 'Traditional folk theatre with vibrant headdresses and epic storytelling',
        imageUrl: 'https://images.unsplash.com/photo-1609137144822-0d1911974d64?auto=format&fit=crop&w=400&q=80',
        category: 'art',
      },
    ],
  },

  // Odia
  or: {
    region: 'Odisha & Kalinga Architecture',
    tagline: 'Sun Temple of Konark, Puri Jagannath Ratha Yatra & classical Odissi dance.',
    items: [
      {
        title: 'Konark Sun Temple Wheels',
        caption: 'Colossal 13th-century chariot wheels intricately carved into stone',
        imageUrl: 'https://images.unsplash.com/photo-1609946850406-81cfdf789212?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
      {
        title: 'Classical Odissi Dance',
        caption: 'Graceful Tribhanga posture and expressive silver filigree ornaments',
        imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80',
        category: 'art',
      },
      {
        title: 'Chilika Lake Sanctuary',
        caption: 'Asia’s largest brackish lagoon hosting migratory flamingos',
        imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
        category: 'nature',
      },
    ],
  },
};

/**
 * Helper to fetch cultural context data for any language code.
 * Falls back gracefully to generic cultural beauty if code is unmapped.
 */
export function getCulturalContextForLanguage(
  code: string,
  detectedCode?: string
): CulturalContext {
  const activeCode = (code === 'auto' ? detectedCode : code) || 'auto';
  const directMatch = CULTURAL_CONTEXT_MAP[activeCode];
  if (directMatch) return directMatch;

  // Prefix match (e.g. 'zh' for 'zh-CN')
  const prefix = activeCode.split('-')[0].toLowerCase();
  if (CULTURAL_CONTEXT_MAP[prefix]) return CULTURAL_CONTEXT_MAP[prefix];

  // If still auto or not detected yet
  if (activeCode === 'auto') return GLOBAL_CULTURAL_CONTEXT;

  // General graceful fallback for any other language
  return {
    region: `${activeCode.toUpperCase()} Cultural Traditions`,
    tagline: 'Celebrating iconic architecture, historical landmarks & natural beauty.',
    items: [
      {
        title: 'Historic Heritage Site',
        caption: 'Ancient architectural monument and cultural preservation',
        imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=400&q=80',
        category: 'landmark',
      },
      {
        title: 'Traditional Folk Arts',
        caption: 'Celebration of local heritage, music, and seasonal festivities',
        imageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=400&q=80',
        category: 'tradition',
      },
      {
        title: 'Scenic Natural Landscape',
        caption: 'Protected natural parklands and regional topography',
        imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80',
        category: 'nature',
      },
    ],
  };
}

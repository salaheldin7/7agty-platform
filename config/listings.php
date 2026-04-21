<?php

return [
    'listing_types' => [
        'property' => [
            'name_en' => 'Property',
            'name_ar' => 'عقار',
            'icon' => 'Home',
            'has_rent_buy' => true,
        ],
        'car' => [
            'name_en' => 'Car',
            'name_ar' => 'سيارة',
            'icon' => 'Car',
            'has_rent_buy' => true,
        ],
        'electronics' => [
            'name_en' => 'Electronics',
            'name_ar' => 'إلكترونيات',
            'icon' => 'Tv',
            'has_rent_buy' => false,
        ],
        'mobile' => [
            'name_en' => 'Mobile & Tablet',
            'name_ar' => 'جوال وتابلت',
            'icon' => 'Smartphone',
            'has_rent_buy' => false,
        ],
        'job' => [
            'name_en' => 'Job',
            'name_ar' => 'وظيفة',
            'icon' => 'Briefcase',
            'has_rent_buy' => false,
        ],
        'vehicle_booking' => [
            'name_en' => 'Book a Vehicle',
            'name_ar' => 'حجز مركبة',
            'icon' => 'Truck',
            'has_rent_buy' => false,
        ],
        'doctor_booking' => [
            'name_en' => 'Book a Doctor',
            'name_ar' => 'حجز طبيب',
            'icon' => 'Stethoscope',
            'has_rent_buy' => false,
        ],
    ],

    'property_categories' => [
        'villa' => ['name_en' => 'Villa', 'name_ar' => 'فيلا'],
        'apartment' => ['name_en' => 'Apartment', 'name_ar' => 'شقة'],
        'townhouse' => ['name_en' => 'Townhouse', 'name_ar' => 'تاون هاوس'],
        'land' => ['name_en' => 'Land', 'name_ar' => 'أرض'],
        'building' => ['name_en' => 'Building', 'name_ar' => 'مبنى'],
        'commercial' => ['name_en' => 'Commercial', 'name_ar' => 'تجاري'],
        'office' => ['name_en' => 'Office', 'name_ar' => 'مكتب'],
        'shop' => ['name_en' => 'Shop', 'name_ar' => 'محل'],
        'warehouse' => ['name_en' => 'Warehouse', 'name_ar' => 'مخزن'],
    ],

    'car_makes' => [
        'Audi' => [
            'logo' => 'https://cdn.brandfolder.io/5H442O3W/at/pl546j-7le8zk-199wvr/Audi_Rings_2016.svg',
            'models' => [
                'A1', 'A3', 'A4', 'A4 Allroad', 'A5', 'A6', 'A6 Allroad', 'A7', 'A8',
                'Q2', 'Q3', 'Q4 e-tron', 'Q5', 'Q7', 'Q8', 'Q8 e-tron',
                'TT', 'TT RS', 'R8',
                'RS3', 'RS4', 'RS5', 'RS6', 'RS7', 'RS Q3', 'RS Q8',
                'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'SQ5', 'SQ7', 'SQ8',
                'e-tron GT'
            ]
        ],
        'BMW' => [
            'logo' => 'https://www.carlogos.org/logo/BMW-logo-2020-blue-white-2048x2048.png',
            'models' => ['1 Series', '2 Series', '3 Series', '4 Series', '5 Series', '6 Series', '7 Series', '8 Series', 'X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7', 'Z4', 'i4', 'iX', 'M Series']
        ],
        'Mercedes-Benz' => [
            'logo' => 'https://www.carlogos.org/logo/Mercedes-Benz-logo-2011-1920x1080.png',
            'models' => ['A-Class', 'B-Class', 'C-Class', 'CLA', 'CLS', 'E-Class', 'S-Class', 'GLA', 'GLB', 'GLC', 'GLE', 'GLS', 'G-Class', 'EQA', 'EQB', 'EQC', 'EQE', 'EQS', 'AMG GT']
        ],
        'Volkswagen' => [
            'logo' => 'https://www.carlogos.org/logo/Volkswagen-logo-2019-3840x2160.png',
            'models' => ['Golf', 'Polo', 'Passat', 'Jetta', 'Tiguan', 'T-Roc', 'T-Cross', 'Touareg', 'Atlas', 'Arteon', 'ID.3', 'ID.4', 'ID.5', 'Taos', 'Amarok', 'Caddy', 'Transporter', 'Beetle']
        ],
        'Toyota' => [
            'logo' => 'https://www.carlogos.org/logo/Toyota-logo-1989-3840x2160.png',
            'models' => ['Corolla', 'Camry', 'Avalon', 'Yaris', 'RAV4', 'Highlander', 'Land Cruiser', 'Prado', '4Runner', 'Fortuner', 'Hilux', 'Tacoma', 'Tundra', 'Prius', 'C-HR', 'bZ4X', 'Supra', '86', 'Sequoia', 'Venza', 'Sienna', 'Crown', 'Corolla Cross', 'Rush', 'Avanza', 'FJ Cruiser', 'Granvia']
        ],
        'Honda' => [
            'logo' => 'https://www.carlogos.org/logo/Honda-logo-1200x1200.png',
            'models' => ['Civic', 'Accord', 'City', 'CR-V', 'HR-V', 'Pilot', 'Passport', 'Ridgeline', 'Odyssey', 'Fit', 'Jazz', 'Insight', 'CR-Z', 'Element']
        ],
        'Ford' => [
            'logo' => 'https://www.carlogos.org/logo/Ford-logo-2017-3840x2160.png',
            'models' => ['Mustang', 'F-150', 'F-250', 'F-350', 'Explorer', 'Expedition', 'Edge', 'Escape', 'Bronco', 'Bronco Sport', 'Ranger', 'Maverick', 'Focus', 'Fusion', 'Fiesta', 'EcoSport', 'Territory', 'Transit']
        ],
        'Chevrolet' => [
            'logo' => 'https://www.carlogos.org/logo/Chevrolet-logo-2013-2560x1440.png',
            'models' => ['Silverado', 'Silverado HD', 'Tahoe', 'Suburban', 'Equinox', 'Traverse', 'Blazer', 'Trailblazer', 'Trax', 'Malibu', 'Camaro', 'Corvette', 'Colorado', 'Spark', 'Sonic', 'Cruze', 'Impala', 'Bolt EV', 'Bolt EUV']
        ],
        'Nissan' => [
            'logo' => 'https://www.carlogos.org/logo/Nissan-logo-2020-3840x2160.png',
            'models' => ['Altima', 'Sentra', 'Maxima', 'Versa', 'Patrol', 'X-Trail', 'Pathfinder', 'Kicks', 'Rogue', 'Murano', 'Armada', 'Frontier', 'Titan', 'GT-R', '370Z', 'Z', 'Leaf', 'Ariya', 'Sunny', 'Micra', 'Qashqai', 'Juke']
        ],
        'Hyundai' => [
            'logo' => 'https://www.carlogos.org/logo/Hyundai-logo-2011-1920x1080.png',
            'models' => ['Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Palisade', 'Kona', 'Venue', 'Accent', 'Veloster', 'Ioniq', 'Ioniq 5', 'Ioniq 6', 'Santa Cruz', 'Azera', 'Genesis Coupe', 'i10', 'i20', 'i30', 'Creta', 'Staria', 'H1']
        ],
        'Kia' => [
            'logo' => 'https://www.carlogos.org/logo/Kia-logo-2021-3840x2160.png',
            'models' => ['Forte', 'K5', 'K8', 'K9', 'Sportage', 'Sorento', 'Telluride', 'Seltos', 'Soul', 'Niro', 'EV6', 'EV9', 'Stinger', 'Carnival', 'Rio', 'Picanto', 'Cerato', 'Cadenza', 'Optima', 'Ceed', 'Stonic']
        ],
        'Mazda' => [
            'logo' => 'https://www.carlogos.org/logo/Mazda-logo-1997-1920x1080.png',
            'models' => ['Mazda2', 'Mazda3', 'Mazda6', 'CX-3', 'CX-30', 'CX-5', 'CX-50', 'CX-60', 'CX-9', 'CX-90', 'MX-5 Miata', 'MX-30', 'RX-7', 'RX-8']
        ],
        'Lexus' => [
            'logo' => 'https://www.carlogos.org/logo/Lexus-logo-1988-1920x1080.png',
            'models' => ['ES', 'IS', 'GS', 'LS', 'RC', 'LC', 'UX', 'NX', 'RX', 'GX', 'LX', 'LFA']
        ],
        'Porsche' => [
            'logo' => 'https://www.carlogos.org/logo/Porsche-logo-2008-3840x2160.png',
            'models' => ['911', 'Taycan', 'Panamera', 'Cayenne', 'Macan', '718 Boxster', '718 Cayman']
        ],
        'Jaguar' => [
            'logo' => 'https://www.carlogos.org/logo/Jaguar-logo-2012-1920x1080.png',
            'models' => ['XE', 'XF', 'XJ', 'F-Type', 'E-Pace', 'F-Pace', 'I-Pace']
        ],
        'Land Rover' => [
            'logo' => 'https://www.carlogos.org/logo/Land-Rover-logo-2011-green-1920x1080.png',
            'models' => ['Defender', 'Discovery', 'Discovery Sport', 'Range Rover', 'Range Rover Sport', 'Range Rover Velar', 'Range Rover Evoque']
        ],
        'Volvo' => [
            'logo' => 'https://www.carlogos.org/logo/Volvo-logo-2014-3840x2160.png',
            'models' => ['S60', 'S90', 'V60', 'V90', 'XC40', 'XC60', 'XC90', 'C40 Recharge', 'EX30', 'EX90']
        ],
        'Subaru' => [
            'logo' => 'https://www.carlogos.org/logo/Subaru-logo-2003-1920x1080.png',
            'models' => ['Impreza', 'Legacy', 'Outback', 'Forester', 'Crosstrek', 'Ascent', 'WRX', 'BRZ', 'Solterra']
        ],
        'Tesla' => [
            'logo' => 'https://www.carlogos.org/logo/Tesla-logo-2200x2800.png',
            'models' => ['Model 3', 'Model S', 'Model X', 'Model Y', 'Cybertruck', 'Roadster']
        ],
        'Ferrari' => [
            'logo' => 'https://www.carlogos.org/logo/Ferrari-logo-1920x1080.png',
            'models' => ['SF90', 'F8 Tributo', 'F8 Spider', 'Roma', 'Portofino', '296 GTB', '812 Superfast', 'Purosangue']
        ],
        'Lamborghini' => [
            'logo' => 'https://www.carlogos.org/logo/Lamborghini-logo-3840x2160.png',
            'models' => ['Huracán', 'Aventador', 'Urus', 'Revuelto']
        ],
        'Bentley' => [
            'logo' => 'https://www.carlogos.org/logo/Bentley-logo-1920x1080.png',
            'models' => ['Continental GT', 'Flying Spur', 'Bentayga', 'Mulsanne']
        ],
        'Rolls-Royce' => [
            'logo' => 'https://www.carlogos.org/logo/Rolls-Royce-logo-2048x2048.png',
            'models' => ['Phantom', 'Ghost', 'Wraith', 'Dawn', 'Cullinan', 'Spectre']
        ],
        'Maserati' => [
            'logo' => 'https://www.carlogos.org/logo/Maserati-logo-2048x2048.png',
            'models' => ['Ghibli', 'Quattroporte', 'Levante', 'MC20', 'GranTurismo', 'GranCabrio']
        ],
        'Jeep' => [
            'logo' => 'https://www.carlogos.org/logo/Jeep-logo-green-1920x1080.png',
            'models' => ['Wrangler', 'Grand Cherokee', 'Cherokee', 'Compass', 'Renegade', 'Gladiator', 'Grand Wagoneer']
        ],
        'Cadillac' => [
            'logo' => 'https://www.carlogos.org/logo/Cadillac-logo-2014-1920x1080.png',
            'models' => ['Escalade', 'XT4', 'XT5', 'XT6', 'CT4', 'CT5', 'Lyriq']
        ],
        'Dodge' => [
            'logo' => 'https://www.carlogos.org/logo/Dodge-logo-2011-3840x2160.png',
            'models' => ['Charger', 'Challenger', 'Durango', 'Hornet']
        ],
        'GMC' => [
            'logo' => 'https://www.carlogos.org/logo/GMC-logo-1920x1080.png',
            'models' => ['Sierra', 'Canyon', 'Yukon', 'Acadia', 'Terrain', 'Hummer EV']
        ],
        'RAM' => [
            'logo' => 'https://www.carlogos.org/logo/Ram-logo-2010-2048x2048.png',
            'models' => ['1500', '2500', '3500', 'ProMaster', 'ProMaster City']
        ],
        'Infiniti' => [
            'logo' => 'https://www.carlogos.org/logo/Infiniti-logo-1989-2048x2048.png',
            'models' => ['Q50', 'Q60', 'QX50', 'QX55', 'QX60', 'QX80']
        ],
        'Acura' => [
            'logo' => 'https://www.carlogos.org/logo/Acura-logo-1990-2048x2048.png',
            'models' => ['ILX', 'TLX', 'RDX', 'MDX', 'NSX', 'Integra']
        ],
        'Genesis' => [
            'logo' => 'https://www.carlogos.org/logo/Genesis-logo-2560x1440.png',
            'models' => ['G70', 'G80', 'G90', 'GV60', 'GV70', 'GV80']
        ],
        'Mini' => [
            'logo' => 'https://www.carlogos.org/logo/Mini-logo-2015-1920x1080.png',
            'models' => ['Cooper', 'Cooper S', 'Countryman', 'Clubman', 'Electric']
        ],
        'MG' => [
            'logo' => 'https://www.carlogos.org/logo/MG-logo-2010-1920x1080.png',
            'models' => ['MG5', 'MG6', 'HS', 'ZS', 'RX5', 'Marvel R']
        ],
        'Geely' => [
            'logo' => 'https://www.carlogos.org/logo/Geely-logo-2014-2048x2048.png',
            'models' => ['Coolray', 'Emgrand', 'Azkarra', 'Okavango', 'Tugella']
        ],
        'BYD' => [
            'logo' => 'https://www.carlogos.org/logo/BYD-logo-2007-2048x2048.png',
            'models' => ['Atto 3', 'Dolphin', 'Seal', 'Han', 'Tang', 'Song Plus']
        ],
        'Chery' => [
            'logo' => 'https://www.carlogos.org/logo/Chery-logo-2013-3840x2160.png',
            'models' => ['Tiggo 7', 'Tiggo 8', 'Arrizo 6', 'Arrizo 5', 'QQ']
        ],
        'Great Wall' => [
            'logo' => 'https://www.carlogos.org/logo/Great-Wall-logo-2007-1920x1080.png',
            'models' => ['Poer', 'King Kong', 'Voleex C30', 'Wingle']
        ],
        'Haval' => [
            'logo' => 'https://www.carlogos.org/logo/Haval-logo-1920x1080.png',
            'models' => ['H6', 'H9', 'Jolion', 'F7', 'Dargo']
        ],
        'Mitsubishi' => [
            'logo' => 'https://www.carlogos.org/logo/Mitsubishi-logo-1920x1080.png',
            'models' => ['Outlander', 'Eclipse Cross', 'Pajero', 'Pajero Sport', 'L200', 'Mirage', 'Attrage', 'ASX', 'Lancer', 'Montero', 'Xpander', 'Triton']
        ],
        'Suzuki' => [
            'logo' => 'https://www.carlogos.org/logo/Suzuki-logo-5000x2500.png',
            'models' => ['Swift', 'Vitara', 'Grand Vitara', 'S-Cross', 'Jimny', 'Baleno', 'Dzire', 'Ciaz', 'Ertiga', 'XL7', 'Celerio', 'Alto', 'Ignis', 'APV']
        ],
        'Fiat' => [
            'logo' => 'https://www.carlogos.org/logo/Fiat-logo-2006-1920x1080.png',
            'models' => ['500', '500X', '500L', 'Tipo', 'Panda', 'Ducato', 'Doblo', '124 Spider']
        ],
        'Peugeot' => [
            'logo' => 'https://www.carlogos.org/logo/Peugeot-logo-2021-3840x2160.png',
            'models' => ['208', '308', '3008', '5008', '2008', '408', '508', 'Rifter', 'Traveller', 'Partner', 'Expert', 'e-208', 'e-2008']
        ],
        'Renault' => [
            'logo' => 'https://www.carlogos.org/logo/Renault-logo-2021-3840x2160.png',
            'models' => ['Clio', 'Megane', 'Captur', 'Kadjar', 'Koleos', 'Talisman', 'Zoe', 'Duster', 'Logan', 'Sandero', 'Scenic', 'Trafic', 'Kangoo', 'Symbol', 'Fluence']
        ],
        'Citroën' => [
            'logo' => 'https://www.carlogos.org/logo/Citroen-logo-2016-1920x1080.png',
            'models' => ['C3', 'C3 Aircross', 'C4', 'C4 Cactus', 'C5', 'C5 Aircross', 'C5 X', 'Berlingo', 'SpaceTourer', 'Jumpy', 'ë-C4', 'C1']
        ],
        'Skoda' => [
            'logo' => 'https://www.carlogos.org/logo/Skoda-logo-2016-3840x2160.png',
            'models' => ['Octavia', 'Superb', 'Fabia', 'Kamiq', 'Karoq', 'Kodiaq', 'Enyaq']
        ],
        'Seat' => [
            'logo' => 'https://www.carlogos.org/logo/SEAT-logo-2012-1920x1080.png',
            'models' => ['Ibiza', 'Leon', 'Arona', 'Ateca', 'Tarraco']
        ],
        'Alfa Romeo' => [
            'logo' => 'https://www.carlogos.org/logo/Alfa-Romeo-logo-2015-1920x1080.png',
            'models' => ['Giulia', 'Stelvio', 'Tonale', 'Giulietta', '4C']
        ],
        'Buick' => [
            'logo' => 'https://www.carlogos.org/logo/Buick-logo-2002-1920x1080.png',
            'models' => ['Enclave', 'Encore', 'Encore GX', 'Envision', 'LaCrosse', 'Regal']
        ],
        'Chrysler' => [
            'logo' => 'https://www.carlogos.org/logo/Chrysler-logo-2010-1920x1080.png',
            'models' => ['200', '300', 'Pacifica', 'Voyager']
        ],
        'Dacia' => [
            'logo' => 'https://www.carlogos.org/logo/Dacia-logo-2008-1920x1080.png',
            'models' => ['Dokker', 'Duster', 'Jogger', 'Logan', 'Sandero', 'Spring']
        ],
        'Daewoo' => [
            'logo' => 'https://www.carlogos.org/logo/Daewoo-logo-1920x1080.png',
            'models' => ['Gentra', 'Lacetti', 'Lanos', 'Matiz', 'Nubira']
        ],
        'Daihatsu' => [
            'logo' => 'https://www.carlogos.org/logo/Daihatsu-logo-1997-1920x1080.png',
            'models' => ['Copen', 'Gran Max', 'Mira', 'Rocky', 'Sirion', 'Terios']
        ],
        'Hummer' => [
            'logo' => 'https://www.carlogos.org/logo/Hummer-logo-1920x1080.png',
            'models' => ['H1', 'H2', 'H3', 'EV']
        ],
        'Isuzu' => [
            'logo' => 'https://www.carlogos.org/logo/Isuzu-logo-1974-1920x1080.png',
            'models' => ['D-Max', 'MU-X']
        ],
        'Lincoln' => [
            'logo' => 'https://www.carlogos.org/logo/Lincoln-logo-2019-1920x1080.png',
            'models' => ['Aviator', 'Corsair', 'Nautilus', 'Navigator', 'Continental', 'MKZ']
        ],
        'Lotus' => [
            'logo' => 'https://www.carlogos.org/logo/Lotus-logo-1920x1080.png',
            'models' => ['Eletre', 'Elise', 'Emira', 'Evija', 'Evora', 'Exige']
        ],
        'McLaren' => [
            'logo' => 'https://www.carlogos.org/logo/McLaren-logo-1991-1920x1080.png',
            'models' => ['540C', '570S', '600LT', '620R', '720S', '765LT', 'Artura', 'GT']
        ],
        'Opel' => [
            'logo' => 'https://www.carlogos.org/logo/Opel-logo-2009-1920x1080.png',
            'models' => ['Astra', 'Combo', 'Corsa', 'Crossland', 'Grandland', 'Insignia', 'Mokka', 'Zafira']
        ],
        'Saab' => [
            'logo' => 'https://www.carlogos.org/logo/Saab-logo-2013-1920x1080.png',
            'models' => ['9-3', '9-4X', '9-5', '9-7X']
        ],
        'Smart' => [
            'logo' => 'https://www.carlogos.org/logo/Smart-logo-1994-3840x2160.png',
            'models' => ['EQ Forfour', 'EQ Fortwo', 'Forfour', 'Fortwo']
        ],
    ],

    'car_models' => [
        // This will be populated dynamically based on make selection
        // Or we can have a comprehensive list per make
    ],

    'electronics_types' => [
        'air_conditioner' => ['name_en' => 'Air Conditioner', 'name_ar' => 'مكيف هواء', 'icon' => '❄️'],
        'blender' => ['name_en' => 'Blender', 'name_ar' => 'خلاط', 'icon' => '�'],
        'camera' => ['name_en' => 'Camera', 'name_ar' => 'كاميرا', 'icon' => '📷'],
        'coffee_maker' => ['name_en' => 'Coffee Maker', 'name_ar' => 'صانعة قهوة', 'icon' => '☕'],
        'desktop' => ['name_en' => 'Desktop PC', 'name_ar' => 'كمبيوتر مكتبي', 'icon' => '�️'],
        'dishwasher' => ['name_en' => 'Dishwasher', 'name_ar' => 'غسالة صحون', 'icon' => '🍽️'],
        'dryer' => ['name_en' => 'Dryer', 'name_ar' => 'نشافة', 'icon' => '🌬️'],
        'fan' => ['name_en' => 'Fan', 'name_ar' => 'مروحة', 'icon' => '🌀'],
        'freezer' => ['name_en' => 'Freezer', 'name_ar' => 'فريزر', 'icon' => '🧊'],
        'gaming_console' => ['name_en' => 'Gaming Console', 'name_ar' => 'جهاز ألعاب', 'icon' => '�'],
        'headphones' => ['name_en' => 'Headphones', 'name_ar' => 'سماعات رأس', 'icon' => '�'],
        'iron' => ['name_en' => 'Iron', 'name_ar' => 'مكواة', 'icon' => '👔'],
        'laptop' => ['name_en' => 'Laptop', 'name_ar' => 'لابتوب', 'icon' => '💻'],
        'microwave' => ['name_en' => 'Microwave', 'name_ar' => 'ميكروويف', 'icon' => '🔥'],
        'mixer' => ['name_en' => 'Mixer', 'name_ar' => 'عجان', 'icon' => '🎂'],
        'monitor' => ['name_en' => 'Monitor', 'name_ar' => 'شاشة كمبيوتر', 'icon' => '�️'],
        'oven' => ['name_en' => 'Oven', 'name_ar' => 'فرن', 'icon' => '�'],
        'printer' => ['name_en' => 'Printer', 'name_ar' => 'طابعة', 'icon' => '�️'],
        'projector' => ['name_en' => 'Projector', 'name_ar' => 'بروجكتر', 'icon' => '📽️'],
        'refrigerator' => ['name_en' => 'Refrigerator', 'name_ar' => 'ثلاجة', 'icon' => '🧊'],
        'router' => ['name_en' => 'Router', 'name_ar' => 'راوتر', 'icon' => '📡'],
        'sound_system' => ['name_en' => 'Sound System', 'name_ar' => 'نظام صوتي', 'icon' => '🔊'],
        'speaker' => ['name_en' => 'Speaker', 'name_ar' => 'سماعة', 'icon' => '🔊'],
        'stove' => ['name_en' => 'Stove', 'name_ar' => 'موقد', 'icon' => '🔥'],
        'toaster' => ['name_en' => 'Toaster', 'name_ar' => 'محمصة خبز', 'icon' => '🍞'],
        'tv' => ['name_en' => 'Television', 'name_ar' => 'تلفزيون', 'icon' => '�'],
        'vacuum_cleaner' => ['name_en' => 'Vacuum Cleaner', 'name_ar' => 'مكنسة كهربائية', 'icon' => '🧹'],
        'washing_machine' => ['name_en' => 'Washing Machine', 'name_ar' => 'غسالة', 'icon' => '🌀'],
        'water_heater' => ['name_en' => 'Water Heater', 'name_ar' => 'سخان ماء', 'icon' => '�'],
    ],

    'item_condition' => [
        'new' => ['name_en' => 'New', 'name_ar' => 'جديد'],
        'used_like_new' => ['name_en' => 'Used - Like New', 'name_ar' => 'مستعمل - كالجديد'],
        'used_good' => ['name_en' => 'Used - Good', 'name_ar' => 'مستعمل - جيد'],
        'used_fair' => ['name_en' => 'Used - Fair', 'name_ar' => 'مستعمل - مقبول'],
    ],

    'mobile_brands' => [
        'Apple' => ['name_en' => 'Apple', 'name_ar' => 'أبل', 'logo' => '🍎'],
        'Asus' => ['name_en' => 'Asus', 'name_ar' => 'أسوس', 'logo' => '📱'],
        'BlackBerry' => ['name_en' => 'BlackBerry', 'name_ar' => 'بلاك بيري', 'logo' => '📱'],
        'Google' => ['name_en' => 'Google Pixel', 'name_ar' => 'جوجل بيكسل', 'logo' => '📱'],
        'Honor' => ['name_en' => 'Honor', 'name_ar' => 'هونر', 'logo' => '📱'],
        'HTC' => ['name_en' => 'HTC', 'name_ar' => 'إتش تي سي', 'logo' => '📱'],
        'Huawei' => ['name_en' => 'Huawei', 'name_ar' => 'هواوي', 'logo' => '📱'],
        'Infinix' => ['name_en' => 'Infinix', 'name_ar' => 'إنفينكس', 'logo' => '📱'],
        'Lenovo' => ['name_en' => 'Lenovo', 'name_ar' => 'لينوفو', 'logo' => '📱'],
        'LG' => ['name_en' => 'LG', 'name_ar' => 'إل جي', 'logo' => '📱'],
        'Motorola' => ['name_en' => 'Motorola', 'name_ar' => 'موتورولا', 'logo' => '📱'],
        'Nokia' => ['name_en' => 'Nokia', 'name_ar' => 'نوكيا', 'logo' => '📱'],
        'Nothing' => ['name_en' => 'Nothing', 'name_ar' => 'ناثينج', 'logo' => '📱'],
        'OnePlus' => ['name_en' => 'OnePlus', 'name_ar' => 'ون بلس', 'logo' => '📱'],
        'Oppo' => ['name_en' => 'Oppo', 'name_ar' => 'أوبو', 'logo' => '📱'],
        'Realme' => ['name_en' => 'Realme', 'name_ar' => 'ريلمي', 'logo' => '📱'],
        'Samsung' => ['name_en' => 'Samsung', 'name_ar' => 'سامسونج', 'logo' => '📱'],
        'Sony' => ['name_en' => 'Sony', 'name_ar' => 'سوني', 'logo' => '📱'],
        'Tecno' => ['name_en' => 'Tecno', 'name_ar' => 'تكنو', 'logo' => '📱'],
        'Vivo' => ['name_en' => 'Vivo', 'name_ar' => 'فيفو', 'logo' => '📱'],
        'Xiaomi' => ['name_en' => 'Xiaomi', 'name_ar' => 'شاومي', 'logo' => '📱'],
        'ZTE' => ['name_en' => 'ZTE', 'name_ar' => 'زد تي إي', 'logo' => '📱'],
    ],

    'mobile_models' => [
        'Apple' => [
            'iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15 Plus', 'iPhone 15',
            'iPhone 14 Pro Max', 'iPhone 14 Pro', 'iPhone 14 Plus', 'iPhone 14',
            'iPhone 13 Pro Max', 'iPhone 13 Pro', 'iPhone 13', 'iPhone 13 Mini',
            'iPhone 12 Pro Max', 'iPhone 12 Pro', 'iPhone 12', 'iPhone 12 Mini',
            'iPhone 11 Pro Max', 'iPhone 11 Pro', 'iPhone 11',
            'iPhone XS Max', 'iPhone XS', 'iPhone XR', 'iPhone X',
            'iPhone SE (2022)', 'iPhone SE (2020)',
            'iPad Pro 12.9"', 'iPad Pro 11"', 'iPad Air', 'iPad Mini', 'iPad 10th Gen', 'iPad 9th Gen',
        ],
        'Samsung' => [
            'Galaxy S24 Ultra', 'Galaxy S24+', 'Galaxy S24',
            'Galaxy S23 Ultra', 'Galaxy S23+', 'Galaxy S23', 'Galaxy S23 FE',
            'Galaxy S22 Ultra', 'Galaxy S22+', 'Galaxy S22',
            'Galaxy S21 Ultra', 'Galaxy S21+', 'Galaxy S21', 'Galaxy S21 FE',
            'Galaxy Z Fold 5', 'Galaxy Z Flip 5',
            'Galaxy Z Fold 4', 'Galaxy Z Flip 4',
            'Galaxy Z Fold 3', 'Galaxy Z Flip 3',
            'Galaxy A54', 'Galaxy A34', 'Galaxy A24', 'Galaxy A14', 'Galaxy A04',
            'Galaxy M54', 'Galaxy M34', 'Galaxy M14',
            'Galaxy Tab S9 Ultra', 'Galaxy Tab S9+', 'Galaxy Tab S9', 'Galaxy Tab S8', 'Galaxy Tab A9',
        ],
        'Huawei' => [
            'P60 Pro', 'P60', 'P50 Pro', 'P50', 'P40 Pro', 'P40',
            'Mate 60 Pro', 'Mate 60', 'Mate 50 Pro', 'Mate 40 Pro',
            'Nova 12', 'Nova 11', 'Nova 10', 'Nova 9',
            'MatePad Pro', 'MatePad 11', 'MatePad',
        ],
        'Xiaomi' => [
            'Xiaomi 14 Pro', 'Xiaomi 14', 'Xiaomi 13T Pro', 'Xiaomi 13T',
            'Xiaomi 13 Pro', 'Xiaomi 13', 'Xiaomi 12T Pro', 'Xiaomi 12T',
            'Redmi Note 13 Pro+', 'Redmi Note 13 Pro', 'Redmi Note 13',
            'Redmi Note 12 Pro+', 'Redmi Note 12 Pro', 'Redmi Note 12',
            'Redmi 13C', 'Redmi 12', 'Redmi A2',
            'POCO X6 Pro', 'POCO X6', 'POCO F5 Pro', 'POCO F5',
            'Xiaomi Pad 6', 'Redmi Pad',
        ],
        'Oppo' => [
            'Find X7 Pro', 'Find X7', 'Find X6 Pro', 'Find X5 Pro',
            'Reno 11 Pro', 'Reno 11', 'Reno 10 Pro+', 'Reno 10 Pro', 'Reno 10',
            'Reno 8 Pro', 'Reno 8', 'Reno 7',
            'A98', 'A78', 'A58', 'A38', 'A18',
        ],
        'Vivo' => [
            'X100 Pro', 'X100', 'X90 Pro', 'X90',
            'V29 Pro', 'V29', 'V27 Pro', 'V27',
            'Y100', 'Y78', 'Y56', 'Y36', 'Y27', 'Y17', 'Y02',
            'iQOO 12 Pro', 'iQOO 12', 'iQOO 11', 'iQOO Z7 Pro',
        ],
        'OnePlus' => [
            'OnePlus 12', 'OnePlus 11', 'OnePlus 10 Pro', 'OnePlus 10T',
            'OnePlus Nord 3', 'OnePlus Nord CE 3', 'OnePlus Nord N30',
            'OnePlus Pad',
        ],
        'Realme' => [
            'Realme GT 5 Pro', 'Realme GT 5', 'Realme GT 3', 'Realme GT Neo 5',
            'Realme 11 Pro+', 'Realme 11 Pro', 'Realme 11',
            'Realme C67', 'Realme C65', 'Realme C55', 'Realme C53', 'Realme C33',
        ],
        'Google' => [
            'Pixel 8 Pro', 'Pixel 8', 'Pixel 7a',
            'Pixel 7 Pro', 'Pixel 7', 'Pixel 6a',
            'Pixel Fold', 'Pixel Tablet',
        ],
        'Nokia' => [
            'G60 5G', 'G42 5G', 'X30 5G', 'X20',
            'C32', 'C22', 'C12', 'C02',
            'T21', 'T20',
        ],
        'Motorola' => [
            'Edge 40 Pro', 'Edge 40', 'Edge 30 Ultra', 'Edge 30 Pro',
            'Moto G84', 'Moto G73', 'Moto G54', 'Moto G34',
            'Razr 40 Ultra', 'Razr 40',
        ],
        'Sony' => [
            'Xperia 1 V', 'Xperia 5 V', 'Xperia 10 V',
            'Xperia 1 IV', 'Xperia 5 IV', 'Xperia 10 IV',
        ],
        'Honor' => [
            'Magic 6 Pro', 'Magic 6', 'Magic 5 Pro', 'Magic 5',
            'X9a', 'X8a', 'X7a', 'X6a',
            '90', '70', '50',
        ],
        'Infinix' => [
            'Note 30 Pro', 'Note 30', 'Note 12 Pro', 'Note 12',
            'Hot 40 Pro', 'Hot 40', 'Hot 30', 'Hot 20',
            'Zero 30', 'Zero 20',
        ],
        'Tecno' => [
            'Phantom V Fold', 'Phantom X2 Pro', 'Phantom X2',
            'Camon 20 Pro', 'Camon 20', 'Camon 19 Pro',
            'Spark 10 Pro', 'Spark 10', 'Spark Go',
            'Pova 5 Pro', 'Pova 5',
        ],
        'Nothing' => [
            'Phone (2)', 'Phone (1)',
        ],
    ],

    'job_types' => [
        'accounting' => ['name_en' => 'Accounting & Finance', 'name_ar' => 'محاسبة ومالية', 'icon' => '💰'],
        'administration' => ['name_en' => 'Administration', 'name_ar' => 'إدارة', 'icon' => '📋'],
        'architecture' => ['name_en' => 'Architecture', 'name_ar' => 'هندسة معمارية', 'icon' => '🏛️'],
        'arts_design' => ['name_en' => 'Arts & Design', 'name_ar' => 'فنون وتصميم', 'icon' => '🎨'],
        'automotive' => ['name_en' => 'Automotive', 'name_ar' => 'سيارات', 'icon' => '�'],
        'banking' => ['name_en' => 'Banking', 'name_ar' => 'بنوك', 'icon' => '🏦'],
        'construction' => ['name_en' => 'Construction', 'name_ar' => 'إنشاءات', 'icon' => '🏗️'],
        'consulting' => ['name_en' => 'Consulting', 'name_ar' => 'استشارات', 'icon' => '�'],
        'customer_service' => ['name_en' => 'Customer Service', 'name_ar' => 'خدمة عملاء', 'icon' => '📞'],
        'education' => ['name_en' => 'Education & Training', 'name_ar' => 'تعليم وتدريب', 'icon' => '�'],
        'engineering' => ['name_en' => 'Engineering', 'name_ar' => 'هندسة', 'icon' => '⚙️'],
        'healthcare' => ['name_en' => 'Healthcare & Medical', 'name_ar' => 'رعاية صحية', 'icon' => '🏥'],
        'hospitality' => ['name_en' => 'Hospitality & Tourism', 'name_ar' => 'ضيافة وسياحة', 'icon' => '🏨'],
        'hr' => ['name_en' => 'Human Resources', 'name_ar' => 'موارد بشرية', 'icon' => '👥'],
        'insurance' => ['name_en' => 'Insurance', 'name_ar' => 'تأمين', 'icon' => '�️'],
        'it_software' => ['name_en' => 'IT & Software', 'name_ar' => 'تقنية معلومات', 'icon' => '💻'],
        'legal' => ['name_en' => 'Legal', 'name_ar' => 'قانوني', 'icon' => '⚖️'],
        'logistics' => ['name_en' => 'Logistics & Supply Chain', 'name_ar' => 'لوجستيات', 'icon' => '🚚'],
        'manufacturing' => ['name_en' => 'Manufacturing', 'name_ar' => 'تصنيع', 'icon' => '🏭'],
        'marketing' => ['name_en' => 'Marketing & Advertising', 'name_ar' => 'تسويق وإعلان', 'icon' => '�'],
        'media' => ['name_en' => 'Media & Communication', 'name_ar' => 'إعلام واتصال', 'icon' => '�'],
        'real_estate' => ['name_en' => 'Real Estate', 'name_ar' => 'عقارات', 'icon' => '�️'],
        'retail' => ['name_en' => 'Retail & Sales', 'name_ar' => 'تجزئة ومبيعات', 'icon' => '🛒'],
        'sales' => ['name_en' => 'Sales', 'name_ar' => 'مبيعات', 'icon' => '🤝'],
        'security' => ['name_en' => 'Security & Safety', 'name_ar' => 'أمن وسلامة', 'icon' => '�'],
        'telecommunications' => ['name_en' => 'Telecommunications', 'name_ar' => 'اتصالات', 'icon' => '📡'],
        'other' => ['name_en' => 'Other', 'name_ar' => 'أخرى', 'icon' => '�'],
    ],

    'job_work_type' => [
        'full_time' => ['name_en' => 'Full Time', 'name_ar' => 'دوام كامل'],
        'part_time' => ['name_en' => 'Part Time', 'name_ar' => 'دوام جزئي'],
        'contract' => ['name_en' => 'Contract', 'name_ar' => 'عقد'],
        'freelance' => ['name_en' => 'Freelance', 'name_ar' => 'عمل حر'],
        'internship' => ['name_en' => 'Internship', 'name_ar' => 'تدريب'],
    ],

    'job_location_type' => [
        'on_site' => ['name_en' => 'On-Site', 'name_ar' => 'في الموقع'],
        'remote' => ['name_en' => 'Remote', 'name_ar' => 'عن بعد'],
        'hybrid' => ['name_en' => 'Hybrid', 'name_ar' => 'مختلط'],
    ],

    'vehicle_types' => [
        'bicycle' => ['name_en' => 'Bicycle', 'name_ar' => 'دراجة هوائية', 'icon' => '🚲', 'with_driver' => false],
        'bus' => ['name_en' => 'Bus', 'name_ar' => 'حافلة', 'icon' => '🚌', 'with_driver' => true, 'capacity' => '15-50 passengers'],
        'coupe' => ['name_en' => 'Coupe', 'name_ar' => 'كوبيه', 'icon' => '🏎️', 'with_driver' => true, 'capacity' => '2-4 passengers'],
        'hatchback' => ['name_en' => 'Hatchback', 'name_ar' => 'هاتشباك', 'icon' => '🚗', 'with_driver' => true, 'capacity' => '4-5 passengers'],
        'limousine' => ['name_en' => 'Limousine', 'name_ar' => 'ليموزين', 'icon' => '🚗', 'with_driver' => true, 'capacity' => '6-10 passengers'],
        'luxury' => ['name_en' => 'Luxury Car', 'name_ar' => 'سيارة فاخرة', 'icon' => '🏎️', 'with_driver' => true, 'capacity' => '4-5 passengers'],
        'minibus' => ['name_en' => 'Minibus', 'name_ar' => 'ميني باص', 'icon' => '�', 'with_driver' => true, 'capacity' => '8-15 passengers'],
        'minivan' => ['name_en' => 'Minivan', 'name_ar' => 'ميني فان', 'icon' => '🚐', 'with_driver' => true, 'capacity' => '6-8 passengers'],
        'motorcycle' => ['name_en' => 'Motorcycle', 'name_ar' => 'دراجة نارية', 'icon' => '🏍️', 'with_driver' => false, 'capacity' => '1-2 passengers'],
        'pickup_truck' => ['name_en' => 'Pickup Truck', 'name_ar' => 'بيك أب', 'icon' => '�', 'with_driver' => true, 'capacity' => '2-5 passengers'],
        'scooter' => ['name_en' => 'Scooter', 'name_ar' => 'سكوتر', 'icon' => '🛴', 'with_driver' => false, 'capacity' => '1 passenger'],
        'sedan' => ['name_en' => 'Sedan', 'name_ar' => 'سيارة سيدان', 'icon' => '🚗', 'with_driver' => true, 'capacity' => '4-5 passengers'],
        'sports_car' => ['name_en' => 'Sports Car', 'name_ar' => 'سيارة رياضية', 'icon' => '🏎️', 'with_driver' => true, 'capacity' => '2-4 passengers'],
        'suv' => ['name_en' => 'SUV', 'name_ar' => 'دفع رباعي', 'icon' => '🚙', 'with_driver' => true, 'capacity' => '5-7 passengers'],
        'truck' => ['name_en' => 'Truck', 'name_ar' => 'شاحنة', 'icon' => '🚚', 'with_driver' => true, 'capacity' => 'Cargo'],
        'van' => ['name_en' => 'Van', 'name_ar' => 'فان', 'icon' => '🚐', 'with_driver' => true, 'capacity' => '8-12 passengers'],
        'wagon' => ['name_en' => 'Wagon', 'name_ar' => 'واجن', 'icon' => '�', 'with_driver' => true, 'capacity' => '5-7 passengers'],
    ],

    'vehicle_rental_options' => [
        'with_driver' => ['name_en' => 'With Driver', 'name_ar' => 'مع سائق'],
        'self_drive' => ['name_en' => 'Self Drive', 'name_ar' => 'قيادة ذاتية'],
    ],

    'doctor_specialties' => [
        'allergy_immunology' => ['name_en' => 'Allergy & Immunology', 'name_ar' => 'حساسية ومناعة', 'icon' => '🤧'],
        'anesthesiology' => ['name_en' => 'Anesthesiology', 'name_ar' => 'تخدير', 'icon' => '💉'],
        'audiology' => ['name_en' => 'Audiology', 'name_ar' => 'سمعيات', 'icon' => '👂'],
        'bariatric_surgery' => ['name_en' => 'Bariatric Surgery', 'name_ar' => 'جراحة السمنة', 'icon' => '⚕️'],
        'cardiology' => ['name_en' => 'Cardiology', 'name_ar' => 'قلب', 'icon' => '❤️'],
        'cosmetology' => ['name_en' => 'Cosmetology', 'name_ar' => 'تجميل', 'icon' => '💄'],
        'dentistry' => ['name_en' => 'Dentistry', 'name_ar' => 'أسنان', 'icon' => '🦷'],
        'dermatology' => ['name_en' => 'Dermatology', 'name_ar' => 'جلدية', 'icon' => '🧴'],
        'diabetes' => ['name_en' => 'Diabetes & Endocrinology', 'name_ar' => 'سكري وغدد صماء', 'icon' => '💉'],
        'dietitian' => ['name_en' => 'Dietitian & Nutrition', 'name_ar' => 'تغذية', 'icon' => '�'],
        'emergency' => ['name_en' => 'Emergency Medicine', 'name_ar' => 'طوارئ', 'icon' => '🚑'],
        'endocrinology' => ['name_en' => 'Endocrinology', 'name_ar' => 'غدد صماء', 'icon' => '🔬'],
        'ent' => ['name_en' => 'ENT (Ear, Nose, Throat)', 'name_ar' => 'أنف وأذن وحنجرة', 'icon' => '👂'],
        'family_medicine' => ['name_en' => 'Family Medicine', 'name_ar' => 'طب أسرة', 'icon' => '👨‍👩‍👧‍👦'],
        'fertility' => ['name_en' => 'Fertility & IVF', 'name_ar' => 'خصوبة وأطفال أنابيب', 'icon' => '👶'],
        'gastroenterology' => ['name_en' => 'Gastroenterology', 'name_ar' => 'جهاز هضمي', 'icon' => '🫁'],
        'general' => ['name_en' => 'General Practitioner', 'name_ar' => 'طبيب عام', 'icon' => '👨‍⚕️'],
        'geriatrics' => ['name_en' => 'Geriatrics', 'name_ar' => 'طب المسنين', 'icon' => '�'],
        'gynecology' => ['name_en' => 'Gynecology & Obstetrics', 'name_ar' => 'نساء وتوليد', 'icon' => '🤰'],
        'hematology' => ['name_en' => 'Hematology', 'name_ar' => 'أمراض دم', 'icon' => '🩸'],
        'infectious_disease' => ['name_en' => 'Infectious Disease', 'name_ar' => 'أمراض معدية', 'icon' => '🦠'],
        'internal_medicine' => ['name_en' => 'Internal Medicine', 'name_ar' => 'باطنية', 'icon' => '⚕️'],
        'nephrology' => ['name_en' => 'Nephrology', 'name_ar' => 'كلى', 'icon' => '🫘'],
        'neurology' => ['name_en' => 'Neurology', 'name_ar' => 'أعصاب', 'icon' => '🧠'],
        'neurosurgery' => ['name_en' => 'Neurosurgery', 'name_ar' => 'جراحة أعصاب', 'icon' => '�'],
        'oncology' => ['name_en' => 'Oncology', 'name_ar' => 'أورام', 'icon' => '🎗️'],
        'ophthalmology' => ['name_en' => 'Ophthalmology', 'name_ar' => 'عيون', 'icon' => '👁️'],
        'orthodontics' => ['name_en' => 'Orthodontics', 'name_ar' => 'تقويم أسنان', 'icon' => '�'],
        'orthopedics' => ['name_en' => 'Orthopedics', 'name_ar' => 'عظام', 'icon' => '🦴'],
        'pediatrics' => ['name_en' => 'Pediatrics', 'name_ar' => 'أطفال', 'icon' => '👶'],
        'physiotherapy' => ['name_en' => 'Physiotherapy', 'name_ar' => 'علاج طبيعي', 'icon' => '🏃'],
        'plastic_surgery' => ['name_en' => 'Plastic Surgery', 'name_ar' => 'جراحة تجميل', 'icon' => '✨'],
        'podiatry' => ['name_en' => 'Podiatry', 'name_ar' => 'طب الأقدام', 'icon' => '🦶'],
        'psychiatry' => ['name_en' => 'Psychiatry', 'name_ar' => 'طب نفسي', 'icon' => '�'],
        'psychology' => ['name_en' => 'Psychology', 'name_ar' => 'علم نفس', 'icon' => '�'],
        'pulmonology' => ['name_en' => 'Pulmonology', 'name_ar' => 'صدرية', 'icon' => '🫁'],
        'radiology' => ['name_en' => 'Radiology', 'name_ar' => 'أشعة', 'icon' => '📡'],
        'rheumatology' => ['name_en' => 'Rheumatology', 'name_ar' => 'روماتيزم', 'icon' => '🦴'],
        'speech_therapy' => ['name_en' => 'Speech Therapy', 'name_ar' => 'علاج النطق', 'icon' => '�️'],
        'surgery' => ['name_en' => 'General Surgery', 'name_ar' => 'جراحة عامة', 'icon' => '🔪'],
        'urology' => ['name_en' => 'Urology', 'name_ar' => 'مسالك بولية', 'icon' => '💧'],
        'vascular_surgery' => ['name_en' => 'Vascular Surgery', 'name_ar' => 'جراحة الأوعية الدموية', 'icon' => '🩸'],
    ],

    'booking_types' => [
        'appointment' => ['name_en' => 'Book Appointment', 'name_ar' => 'حجز موعد'],
        'consultation' => ['name_en' => 'Online Consultation', 'name_ar' => 'استشارة أونلاين'],
        'emergency' => ['name_en' => 'Emergency', 'name_ar' => 'طوارئ'],
        'home_visit' => ['name_en' => 'Home Visit', 'name_ar' => 'زيارة منزلية'],
    ],
];

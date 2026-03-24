<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Disable foreign key checks to allow truncate
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        
        // Clear existing cities to prevent duplicates
        DB::table('cities')->truncate();
        
        // Re-enable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        
        // Get governorate IDs
        $governorates = DB::table('governorates')->pluck('id', 'name_en')->toArray();

        $cities = [
            // Cairo - Full Comprehensive list (80+ cities)
            'Cairo' => [
                // New Cairo & East Cairo
                ['name_en' => 'New Cairo', 'name_ar' => 'القاهرة الجديدة', 'code' => 'NC'],
                ['name_en' => '5th Settlement', 'name_ar' => 'التجمع الخامس', 'code' => '5TH'],
                ['name_en' => '1st Settlement', 'name_ar' => 'التجمع الأول', 'code' => '1ST'],
                ['name_en' => '3rd Settlement', 'name_ar' => 'التجمع الثالث', 'code' => '3RD'],
                ['name_en' => 'Rehab', 'name_ar' => 'الرحاب', 'code' => 'RHB'],
                ['name_en' => 'Madinaty', 'name_ar' => 'مدينتي', 'code' => 'MDN'],
                ['name_en' => 'Shorouk', 'name_ar' => 'الشروق', 'code' => 'SHR'],
                ['name_en' => 'Obour', 'name_ar' => 'العبور', 'code' => 'OBR'],
                ['name_en' => 'Badr City', 'name_ar' => 'مدينة بدر', 'code' => 'BDR'],
                ['name_en' => 'Katameya', 'name_ar' => 'القطامية', 'code' => 'KTM'],
                ['name_en' => 'Katameya Heights', 'name_ar' => 'القطامية هايتس', 'code' => 'KTH'],
                ['name_en' => 'Katameya Dunes', 'name_ar' => 'القطامية ديونز', 'code' => 'KTD'],
                ['name_en' => 'Mountain View', 'name_ar' => 'ماونتن فيو', 'code' => 'MTV'],
                ['name_en' => 'Mirage City', 'name_ar' => 'ميراج سيتي', 'code' => 'MRG'],
                ['name_en' => 'Hyde Park', 'name_ar' => 'هايد بارك', 'code' => 'HYD'],
                ['name_en' => 'Heliopolis New', 'name_ar' => 'هليوبوليس الجديدة', 'code' => 'NHL'],
                ['name_en' => 'Mokattam', 'name_ar' => 'المقطم', 'code' => 'MOK'],
                
                // Heliopolis Area
                ['name_en' => 'Heliopolis', 'name_ar' => 'مصر الجديدة', 'code' => 'HLP'],
                ['name_en' => 'Nasr City', 'name_ar' => 'مدينة نصر', 'code' => 'NSR'],
                ['name_en' => 'Sheraton', 'name_ar' => 'شيراتون', 'code' => 'SHT'],
                ['name_en' => 'Nozha', 'name_ar' => 'النزهة', 'code' => 'NZH'],
                ['name_en' => 'Nozha Jadida', 'name_ar' => 'النزهة الجديدة', 'code' => 'NZJ'],
                ['name_en' => 'Alf Maskan', 'name_ar' => 'ألف مسكن', 'code' => 'ALF'],
                ['name_en' => 'Gesr El Suez', 'name_ar' => 'جسر السويس', 'code' => 'GSS'],
                ['name_en' => 'El Nozha El Gedida', 'name_ar' => 'النزهة الجديدة', 'code' => 'NZG'],
                ['name_en' => 'Airport Area', 'name_ar' => 'منطقة المطار', 'code' => 'ARP'],
                
                // Maadi Area
                ['name_en' => 'Maadi', 'name_ar' => 'المعادي', 'code' => 'MAD'],
                ['name_en' => 'Hadayek El Maadi', 'name_ar' => 'حدائق المعادي', 'code' => 'HDM'],
                ['name_en' => 'Sakanat El Maadi', 'name_ar' => 'ساكنات المعادي', 'code' => 'SKM'],
                ['name_en' => 'Degla', 'name_ar' => 'دجلة', 'code' => 'DGL'],
                ['name_en' => 'Zahraa El Maadi', 'name_ar' => 'زهراء المعادي', 'code' => 'ZHM'],
                ['name_en' => 'Arab El Maadi', 'name_ar' => 'عرب المعادي', 'code' => 'ARM'],
                ['name_en' => 'New Maadi', 'name_ar' => 'المعادي الجديدة', 'code' => 'NMD'],
                ['name_en' => 'Hadayek El Ahram', 'name_ar' => 'حدائق الأهرام', 'code' => 'HAH'],
                
                // Downtown & Central Cairo
                ['name_en' => 'Downtown Cairo', 'name_ar' => 'وسط البلد', 'code' => 'DT'],
                ['name_en' => 'Garden City', 'name_ar' => 'جاردن سيتي', 'code' => 'GC'],
                ['name_en' => 'Zamalek', 'name_ar' => 'الزمالك', 'code' => 'ZAM'],
                ['name_en' => 'Qasr El Nil', 'name_ar' => 'قصر النيل', 'code' => 'QSR'],
                ['name_en' => 'Abdeen', 'name_ar' => 'عابدين', 'code' => 'ABD'],
                ['name_en' => 'Azbakeya', 'name_ar' => 'الأزبكية', 'code' => 'AZB'],
                ['name_en' => 'Bab El Shaariya', 'name_ar' => 'باب الشعرية', 'code' => 'BBS'],
                ['name_en' => 'Bab El Louk', 'name_ar' => 'باب اللوق', 'code' => 'BBL'],
                ['name_en' => 'Tahrir', 'name_ar' => 'التحرير', 'code' => 'THR'],
                ['name_en' => 'Manial', 'name_ar' => 'المنيل', 'code' => 'MNL'],
                ['name_en' => 'Roda Island', 'name_ar' => 'جزيرة الروضة', 'code' => 'ROD'],
                
                // Ramses & Abbasiya Area
                ['name_en' => 'Ramses', 'name_ar' => 'رمسيس', 'code' => 'RMS'],
                ['name_en' => 'Abbasiya', 'name_ar' => 'العباسية', 'code' => 'ABS'],
                ['name_en' => 'Waily', 'name_ar' => 'الوايلي', 'code' => 'WLY'],
                ['name_en' => 'Hadayek El Kobba', 'name_ar' => 'حدائق القبة', 'code' => 'HKB'],
                ['name_en' => 'Saray El Kobba', 'name_ar' => 'سراي القبة', 'code' => 'SRK'],
                ['name_en' => 'Koleyet El Banat', 'name_ar' => 'كلية البنات', 'code' => 'KLB'],
                
                // Ain Shams & Matariya
                ['name_en' => 'Ain Shams', 'name_ar' => 'عين شمس', 'code' => 'ASH'],
                ['name_en' => 'Matariya', 'name_ar' => 'المطرية', 'code' => 'MTR'],
                ['name_en' => 'Zeitoun', 'name_ar' => 'الزيتون', 'code' => 'ZTN'],
                ['name_en' => 'Helmeyat El Zaytoun', 'name_ar' => 'حلمية الزيتون', 'code' => 'HLZ'],
                ['name_en' => 'El Marg', 'name_ar' => 'المرج', 'code' => 'MRJ'],
                ['name_en' => 'New Marg', 'name_ar' => 'المرج الجديدة', 'code' => 'NMJ'],
                
                // Shubra Area
                ['name_en' => 'Shubra', 'name_ar' => 'شبرا', 'code' => 'SHB'],
                ['name_en' => 'Shubra El Kheima', 'name_ar' => 'شبرا الخيمة', 'code' => 'SHK'],
                ['name_en' => 'Rod El Farag', 'name_ar' => 'روض الفرج', 'code' => 'RDF'],
                ['name_en' => 'Sharabiya', 'name_ar' => 'الشرابية', 'code' => 'SHR'],
                ['name_en' => 'Sahel', 'name_ar' => 'الساحل', 'code' => 'SHL'],
                
                // Old Cairo & South
                ['name_en' => 'Masr El Qadima', 'name_ar' => 'مصر القديمة', 'code' => 'MEQ'],
                ['name_en' => 'Sayeda Zeinab', 'name_ar' => 'السيدة زينب', 'code' => 'SZN'],
                ['name_en' => 'Sayeda Aisha', 'name_ar' => 'السيدة عائشة', 'code' => 'SYA'],
                ['name_en' => 'Darb El Ahmar', 'name_ar' => 'درب الأحمر', 'code' => 'DBA'],
                ['name_en' => 'El Khalifa', 'name_ar' => 'الخليفة', 'code' => 'KHL'],
                ['name_en' => 'Fustat', 'name_ar' => 'الفسطاط', 'code' => 'FST'],
                ['name_en' => 'Basateen', 'name_ar' => 'البساتين', 'code' => 'BST'],
                ['name_en' => 'Dar El Salam', 'name_ar' => 'دار السلام', 'code' => 'DSL'],
                ['name_en' => 'Maasara', 'name_ar' => 'المعصرة', 'code' => 'MSR'],
                ['name_en' => 'Zahraa Masr El Qadima', 'name_ar' => 'زهراء مصر القديمة', 'code' => 'ZMQ'],
                
                // Helwan Area
                ['name_en' => 'Helwan', 'name_ar' => 'حلوان', 'code' => 'HLW'],
                ['name_en' => '15th May City', 'name_ar' => 'مدينة 15 مايو', 'code' => '15M'],
                ['name_en' => 'Maasara Helwan', 'name_ar' => 'المعصرة حلوان', 'code' => 'MSH'],
                ['name_en' => 'Tibbin', 'name_ar' => 'طيبين', 'code' => 'TBN'],
                
                // El Salam & Northeast
                ['name_en' => 'El Salam City', 'name_ar' => 'مدينة السلام', 'code' => 'SLM'],
                ['name_en' => 'El Salam 1', 'name_ar' => 'السلام أول', 'code' => 'SL1'],
                ['name_en' => 'El Salam 2', 'name_ar' => 'السلام ثان', 'code' => 'SL2'],
                ['name_en' => 'Future City', 'name_ar' => 'مدينة المستقبل', 'code' => 'FTC'],
                
                // Helmeya Area
                ['name_en' => 'Helmeya', 'name_ar' => 'الحلمية', 'code' => 'HLM'],
                ['name_en' => 'Helmeya El Gedida', 'name_ar' => 'الحلمية الجديدة', 'code' => 'HLG'],
            ],

            // Alexandria - Full Comprehensive list (60+ cities)
            'Alexandria' => [
                // Eastern Alexandria
                ['name_en' => 'Alexandria', 'name_ar' => 'الإسكندرية', 'code' => 'ALX'],
                ['name_en' => 'Montazah', 'name_ar' => 'المنتزه', 'code' => 'MTZ'],
                ['name_en' => 'Montazah 1', 'name_ar' => 'المنتزه أول', 'code' => 'MT1'],
                ['name_en' => 'Montazah 2', 'name_ar' => 'المنتزه ثان', 'code' => 'MT2'],
                ['name_en' => 'Maamoura', 'name_ar' => 'المعمورة', 'code' => 'MAM'],
                ['name_en' => 'Maamoura Beach', 'name_ar' => 'المعمورة الشاطئ', 'code' => 'MMB'],
                ['name_en' => 'Mandara', 'name_ar' => 'المندرة', 'code' => 'MND'],
                ['name_en' => 'Asafra', 'name_ar' => 'العصافرة', 'code' => 'ASF'],
                ['name_en' => 'Asafra Bahri', 'name_ar' => 'العصافرة بحري', 'code' => 'ASB'],
                ['name_en' => 'Asafra Qebli', 'name_ar' => 'العصافرة قبلي', 'code' => 'ASQ'],
                ['name_en' => 'Abu Qir', 'name_ar' => 'أبو قير', 'code' => 'ABQ'],
                ['name_en' => 'Victoria', 'name_ar' => 'فيكتوريا', 'code' => 'VIC'],
                ['name_en' => 'San Stefano', 'name_ar' => 'سان ستيفانو', 'code' => 'SST'],
                ['name_en' => 'Sidi Bishr', 'name_ar' => 'سيدي بشر', 'code' => 'SDB'],
                ['name_en' => 'Sidi Bishr Bahri', 'name_ar' => 'سيدي بشر بحري', 'code' => 'SBB'],
                ['name_en' => 'Sidi Bishr Qebli', 'name_ar' => 'سيدي بشر قبلي', 'code' => 'SBQ'],
                ['name_en' => 'Miami', 'name_ar' => 'ميامي', 'code' => 'MIA'],
                ['name_en' => 'Cleopatra', 'name_ar' => 'كليوباترا', 'code' => 'CLP'],
                ['name_en' => 'Saba Pasha', 'name_ar' => 'سابا باشا', 'code' => 'SBP'],
                
                // Central Alexandria
                ['name_en' => 'Smouha', 'name_ar' => 'سموحة', 'code' => 'SMH'],
                ['name_en' => 'Sidi Gaber', 'name_ar' => 'سيدي جابر', 'code' => 'SG'],
                ['name_en' => 'Stanley', 'name_ar' => 'ستانلي', 'code' => 'STN'],
                ['name_en' => 'Gleem', 'name_ar' => 'جليم', 'code' => 'GLM'],
                ['name_en' => 'Camp Shezar', 'name_ar' => 'كامب شيزار', 'code' => 'CMP'],
                ['name_en' => 'Sporting', 'name_ar' => 'سبورتنج', 'code' => 'SPT'],
                ['name_en' => 'Sporting Club', 'name_ar' => 'نادي سبورتنج', 'code' => 'SPC'],
                ['name_en' => 'Zezenia', 'name_ar' => 'زيزينيا', 'code' => 'ZZN'],
                ['name_en' => 'Roshdy', 'name_ar' => 'رشدي', 'code' => 'RSH'],
                ['name_en' => 'Mostafa Kamel', 'name_ar' => 'مصطفى كامل', 'code' => 'MSK'],
                ['name_en' => 'Bakos', 'name_ar' => 'باكوس', 'code' => 'BKS'],
                ['name_en' => 'Fleming', 'name_ar' => 'فليمنج', 'code' => 'FLM'],
                ['name_en' => 'Kafr Abdo', 'name_ar' => 'كفر عبده', 'code' => 'KFA'],
                ['name_en' => 'Louran', 'name_ar' => 'لوران', 'code' => 'LRN'],
                ['name_en' => 'Gianaclis', 'name_ar' => 'جناكليس', 'code' => 'GNC'],
                ['name_en' => 'Laurent', 'name_ar' => 'لوران', 'code' => 'LRT'],
                ['name_en' => 'Tharwat', 'name_ar' => 'ثروت', 'code' => 'THR'],
                
                // Downtown Alexandria
                ['name_en' => 'Shatby', 'name_ar' => 'شاطبي', 'code' => 'SHT'],
                ['name_en' => 'Bab Sharq', 'name_ar' => 'باب شرق', 'code' => 'BBS'],
                ['name_en' => 'Raml Station', 'name_ar' => 'محطة الرمل', 'code' => 'RML'],
                ['name_en' => 'Azarita', 'name_ar' => 'الأزاريطة', 'code' => 'AZR'],
                ['name_en' => 'Ibrahimeya', 'name_ar' => 'الإبراهيمية', 'code' => 'IBR'],
                ['name_en' => 'Kom El Dekka', 'name_ar' => 'كوم الدكة', 'code' => 'KDK'],
                ['name_en' => 'Manshia', 'name_ar' => 'المنشية', 'code' => 'MNS'],
                ['name_en' => 'Attarin', 'name_ar' => 'العطارين', 'code' => 'ATR'],
                ['name_en' => 'Labban', 'name_ar' => 'اللبان', 'code' => 'LBN'],
                ['name_en' => 'Gomrok', 'name_ar' => 'الجمرك', 'code' => 'GMR'],
                ['name_en' => 'Anfushi', 'name_ar' => 'الأنفوشي', 'code' => 'ANF'],
                ['name_en' => 'Ras El Tin', 'name_ar' => 'رأس التين', 'code' => 'RET'],
                
                // Western Alexandria
                ['name_en' => 'Moharam Bek', 'name_ar' => 'محرم بك', 'code' => 'MHB'],
                ['name_en' => 'Karmouz', 'name_ar' => 'كرموز', 'code' => 'KRZ'],
                ['name_en' => 'Mina El Basal', 'name_ar' => 'ميناء البصل', 'code' => 'MBS'],
                ['name_en' => 'Sidi Gaber Qebli', 'name_ar' => 'سيدي جابر قبلي', 'code' => 'SGQ'],
                ['name_en' => 'Siouf', 'name_ar' => 'سيوف', 'code' => 'SIF'],
                ['name_en' => 'Hadara', 'name_ar' => 'الحضرة', 'code' => 'HDR'],
                ['name_en' => 'Wabour El Meyah', 'name_ar' => 'وابور المياه', 'code' => 'WBM'],
                ['name_en' => 'Amreya', 'name_ar' => 'العامرية', 'code' => 'AMR'],
                ['name_en' => 'Amreya 1', 'name_ar' => 'العامرية أول', 'code' => 'AM1'],
                ['name_en' => 'Amreya 2', 'name_ar' => 'العامرية ثان', 'code' => 'AM2'],
                ['name_en' => 'Borg El Arab', 'name_ar' => 'برج العرب', 'code' => 'BEA'],
                ['name_en' => 'New Borg El Arab', 'name_ar' => 'برج العرب الجديدة', 'code' => 'NBA'],
                ['name_en' => 'Agami', 'name_ar' => 'العجمي', 'code' => 'AGM'],
                ['name_en' => 'Hannoville', 'name_ar' => 'هانوفيل', 'code' => 'HNV'],
                ['name_en' => 'Bitash', 'name_ar' => 'بيطاش', 'code' => 'BTS'],
                ['name_en' => 'King Mariout', 'name_ar' => 'كينج مريوط', 'code' => 'KMR'],
                ['name_en' => 'Dekheila', 'name_ar' => 'الدخيلة', 'code' => 'DKH'],
                ['name_en' => 'Max', 'name_ar' => 'المكس', 'code' => 'MAX'],
                ['name_en' => 'Alexandria Port', 'name_ar' => 'ميناء الإسكندرية', 'code' => 'ALP'],
            ],

            // Giza - Full Comprehensive list (50+ cities)
            'Giza' => [
                // 6th October & Sheikh Zayed
                ['name_en' => '6th of October', 'name_ar' => '6 أكتوبر', 'code' => '6OCT'],
                ['name_en' => 'Sheikh Zayed', 'name_ar' => 'الشيخ زايد', 'code' => 'SZ'],
                ['name_en' => 'Hadayek October', 'name_ar' => 'حدائق أكتوبر', 'code' => 'HDO'],
                ['name_en' => 'Smart Village', 'name_ar' => 'القرية الذكية', 'code' => 'SMV'],
                ['name_en' => 'Zayed 2000', 'name_ar' => 'زايد 2000', 'code' => 'Z2K'],
                ['name_en' => 'West Somid', 'name_ar' => 'غرب سوميد', 'code' => 'WSM'],
                ['name_en' => 'Sodic West', 'name_ar' => 'سوديك ويست', 'code' => 'SDW'],
                ['name_en' => 'Beverly Hills', 'name_ar' => 'بيفرلي هيلز', 'code' => 'BVH'],
                ['name_en' => 'Allegria', 'name_ar' => 'أليجريا', 'code' => 'ALG'],
                ['name_en' => 'Palm Hills', 'name_ar' => 'بالم هيلز', 'code' => 'PLM'],
                ['name_en' => 'Dreamland', 'name_ar' => 'دريم لاند', 'code' => 'DRM'],
                ['name_en' => 'Al Wahat', 'name_ar' => 'الواحات', 'code' => 'WHT'],
                ['name_en' => 'Al Motamayez', 'name_ar' => 'المتميز', 'code' => 'MTM'],
                ['name_en' => 'El Karma', 'name_ar' => 'الكرمة', 'code' => 'KRM'],
                ['name_en' => 'Juhayna Square', 'name_ar' => 'ميدان جهينة', 'code' => 'JHN'],
                ['name_en' => 'El Hosary', 'name_ar' => 'الحصري', 'code' => 'HSR'],
                ['name_en' => 'El Sheikh Zayed Extension', 'name_ar' => 'امتداد الشيخ زايد', 'code' => 'SZE'],
                ['name_en' => 'Zayed Regency', 'name_ar' => 'زايد ريجنسي', 'code' => 'ZRG'],
                ['name_en' => 'Westown', 'name_ar' => 'ويستاون', 'code' => 'WST'],
                ['name_en' => 'Galleria 40', 'name_ar' => 'جاليريا 40', 'code' => 'GL40'],
                
                // Dokki & Mohandessin Area
                ['name_en' => 'Dokki', 'name_ar' => 'الدقي', 'code' => 'DOK'],
                ['name_en' => 'Mohandessin', 'name_ar' => 'المهندسين', 'code' => 'MHN'],
                ['name_en' => 'Agouza', 'name_ar' => 'العجوزة', 'code' => 'AGZ'],
                ['name_en' => 'Mesaha', 'name_ar' => 'المساحة', 'code' => 'MSH'],
                ['name_en' => 'Lebanon Square', 'name_ar' => 'ميدان لبنان', 'code' => 'LBN'],
                ['name_en' => 'Sudan Street', 'name_ar' => 'شارع السودان', 'code' => 'SDN'],
                ['name_en' => 'Gamaat El Dewal', 'name_ar' => 'جامعة الدول', 'code' => 'GMD'],
                ['name_en' => 'El Batal Ahmed Abdel Aziz', 'name_ar' => 'البطل أحمد عبد العزيز', 'code' => 'BTL'],
                ['name_en' => 'Wezaret El Zeraa', 'name_ar' => 'وزارة الزراعة', 'code' => 'WZZ'],
                ['name_en' => 'Shooting Club', 'name_ar' => 'نادي الصيد', 'code' => 'SHC'],
                
                // Giza Downtown
                ['name_en' => 'Giza', 'name_ar' => 'الجيزة', 'code' => 'GIZ'],
                ['name_en' => 'Omraneya', 'name_ar' => 'العمرانية', 'code' => 'OMR'],
                ['name_en' => 'Talbeya', 'name_ar' => 'الطالبية', 'code' => 'TLB'],
                ['name_en' => 'Nahya', 'name_ar' => 'النهضة', 'code' => 'NHY'],
                ['name_en' => 'El Munib', 'name_ar' => 'المنيب', 'code' => 'MNB'],
                ['name_en' => 'El Monib Tunnel', 'name_ar' => 'نفق المنيب', 'code' => 'MNT'],
                
                // Haram & Faisal Area
                ['name_en' => 'Haram', 'name_ar' => 'الهرم', 'code' => 'HRM'],
                ['name_en' => 'Faisal', 'name_ar' => 'فيصل', 'code' => 'FSL'],
                ['name_en' => 'Pyramids Gardens', 'name_ar' => 'حدائق الأهرام', 'code' => 'PYG'],
                ['name_en' => 'Marioteya', 'name_ar' => 'المريوطية', 'code' => 'MRY'],
                ['name_en' => 'Saft El Laban', 'name_ar' => 'صفط اللبن', 'code' => 'SFL'],
                ['name_en' => 'Abu Nomros', 'name_ar' => 'أبو النمرس', 'code' => 'ABN'],
                ['name_en' => 'Dahshour', 'name_ar' => 'دهشور', 'code' => 'DHS'],
                ['name_en' => 'Saqqara', 'name_ar' => 'سقارة', 'code' => 'SQR'],
                ['name_en' => 'Badrasheen', 'name_ar' => 'البدرشين', 'code' => 'BDS'],
                ['name_en' => 'Mansoureya', 'name_ar' => 'المنصورية', 'code' => 'MNS'],
                
                // Imbaba & Bulaq Area
                ['name_en' => 'Imbaba', 'name_ar' => 'إمبابة', 'code' => 'IMB'],
                ['name_en' => 'Bulaq Al Dakrour', 'name_ar' => 'بولاق الدكرور', 'code' => 'BLD'],
                ['name_en' => 'Kit Kat', 'name_ar' => 'كيت كات', 'code' => 'KTK'],
                ['name_en' => 'Warraq', 'name_ar' => 'الوراق', 'code' => 'WRQ'],
                ['name_en' => 'Moneeb', 'name_ar' => 'المنيب', 'code' => 'MNB2'],
                ['name_en' => 'Ard El Lewa', 'name_ar' => 'أرض اللواء', 'code' => 'ADL'],
                ['name_en' => 'Boulaq', 'name_ar' => 'بولاق', 'code' => 'BLQ'],
                
                // North Giza
                ['name_en' => 'Ausim', 'name_ar' => 'أوسيم', 'code' => 'AUS'],
                ['name_en' => 'Kerdasa', 'name_ar' => 'كرداسة', 'code' => 'KRD'],
                ['name_en' => 'Abu Rawash', 'name_ar' => 'أبو رواش', 'code' => 'ABR'],
                ['name_en' => 'Bashtil', 'name_ar' => 'البشتيل', 'code' => 'BSH'],
                ['name_en' => 'Sakiat Mekki', 'name_ar' => 'ساقية مكي', 'code' => 'SKM'],
                ['name_en' => 'Imbaba Airport', 'name_ar' => 'مطار إمبابة', 'code' => 'IMA'],
                
                // South Giza
                ['name_en' => 'Ayat', 'name_ar' => 'العياط', 'code' => 'AYT'],
                ['name_en' => 'Atfih', 'name_ar' => 'أطفيح', 'code' => 'ATF'],
                ['name_en' => 'El Badrashein', 'name_ar' => 'البدرشين', 'code' => 'BDR2'],
                ['name_en' => 'El Saff', 'name_ar' => 'الصف', 'code' => 'SFF'],
                ['name_en' => 'Al Bahr Al Azam', 'name_ar' => 'البحر الأعظم', 'code' => 'BHA'],
            ],

            // Qalyubia - 13 cities
            'Qalyubia' => [
                ['name_en' => 'Benha', 'name_ar' => 'بنها', 'code' => 'BNH'],
                ['name_en' => 'Shubra al-Khaimah', 'name_ar' => 'شبرا الخيمة', 'code' => 'SHK'],
                ['name_en' => 'Qalyub', 'name_ar' => 'قليوب', 'code' => 'QLB'],
                ['name_en' => 'Qaha', 'name_ar' => 'قها', 'code' => 'QHA'],
                ['name_en' => 'Khanka', 'name_ar' => 'الخانكة', 'code' => 'KHN'],
                ['name_en' => 'Shibin al-Qanater', 'name_ar' => 'شبين القناطر', 'code' => 'SHQ'],
                ['name_en' => 'Tukh', 'name_ar' => 'طوخ', 'code' => 'TKH'],
                ['name_en' => 'Kafr Shukr', 'name_ar' => 'كفر شكر', 'code' => 'KFS'],
                ['name_en' => 'Obour City', 'name_ar' => 'مدينة العبور', 'code' => 'OBR'],
                ['name_en' => 'Khusus', 'name_ar' => 'الخصوص', 'code' => 'KHS'],
                ['name_en' => 'Qanater al-Khairia', 'name_ar' => 'القناطر الخيرية', 'code' => 'QNK'],
                ['name_en' => 'Mostorod', 'name_ar' => 'المسطرد', 'code' => 'MST'],
                ['name_en' => 'Kafr Hamza', 'name_ar' => 'كفر حمزة', 'code' => 'KFH'],
            ],

            // Port Said - Full list (12 cities)
            'Port Said' => [
                ['name_en' => 'Port Said', 'name_ar' => 'بورسعيد', 'code' => 'PS'],
                ['name_en' => 'Port Fouad', 'name_ar' => 'بور فؤاد', 'code' => 'PF'],
                ['name_en' => 'Al-Zohour', 'name_ar' => 'الزهور', 'code' => 'ZHR'],
                ['name_en' => 'Al-Manakh', 'name_ar' => 'المناخ', 'code' => 'MNK'],
                ['name_en' => 'Al-Arab', 'name_ar' => 'العرب', 'code' => 'ARB'],
                ['name_en' => 'Al-Sharq', 'name_ar' => 'الشرق', 'code' => 'SHQ'],
                ['name_en' => 'Al-Dawahy', 'name_ar' => 'الضواحي', 'code' => 'DWH'],
                ['name_en' => 'Port Said East', 'name_ar' => 'شرق بورسعيد', 'code' => 'PSE'],
                ['name_en' => 'Al Ganoub', 'name_ar' => 'الجنوب', 'code' => 'GNB'],
                ['name_en' => 'Al Manasra', 'name_ar' => 'المناصرة', 'code' => 'MNS'],
                ['name_en' => 'Al Qabouty', 'name_ar' => 'القابوطي', 'code' => 'QBT'],
                ['name_en' => 'Port Said Port', 'name_ar' => 'ميناء بورسعيد', 'code' => 'PSP'],
            ],

            // Suez - Full list (12 cities)
            'Suez' => [
                ['name_en' => 'Suez', 'name_ar' => 'السويس', 'code' => 'SZ'],
                ['name_en' => 'Ain Sokhna', 'name_ar' => 'العين السخنة', 'code' => 'ASK'],
                ['name_en' => 'Ataqah', 'name_ar' => 'العتقة', 'code' => 'ATQ'],
                ['name_en' => 'Faisal', 'name_ar' => 'فيصل', 'code' => 'FSL'],
                ['name_en' => 'Ganayen', 'name_ar' => 'الجناين', 'code' => 'GNN'],
                ['name_en' => 'Arbeen', 'name_ar' => 'الأربعين', 'code' => 'ARB'],
                ['name_en' => 'Al-Suez Al-Gadida', 'name_ar' => 'السويس الجديدة', 'code' => 'SGD'],
                ['name_en' => 'Port Tawfiq', 'name_ar' => 'بور توفيق', 'code' => 'PTF'],
                ['name_en' => 'Suez Port', 'name_ar' => 'ميناء السويس', 'code' => 'SZP'],
                ['name_en' => 'Al Galaa', 'name_ar' => 'الجلاء', 'code' => 'GLA'],
                ['name_en' => 'Al Zeitia', 'name_ar' => 'الزيتية', 'code' => 'ZTY'],
                ['name_en' => 'Sokhna Road', 'name_ar' => 'طريق السخنة', 'code' => 'SKR'],
            ],

            // Luxor - 9 cities
            'Luxor' => [
                ['name_en' => 'Luxor', 'name_ar' => 'الأقصر', 'code' => 'LXR'],
                ['name_en' => 'Esna', 'name_ar' => 'إسنا', 'code' => 'ESN'],
                ['name_en' => 'Armant', 'name_ar' => 'أرمنت', 'code' => 'ARM'],
                ['name_en' => 'Al-Tod', 'name_ar' => 'الطود', 'code' => 'TOD'],
                ['name_en' => 'Al-Qurna', 'name_ar' => 'القرنة', 'code' => 'QRN'],
                ['name_en' => 'Al-Bayadiya', 'name_ar' => 'البياضية', 'code' => 'BYD'],
                ['name_en' => 'Al-Zeiniya', 'name_ar' => 'الزينية', 'code' => 'ZNY'],
                ['name_en' => 'Karnak', 'name_ar' => 'الكرنك', 'code' => 'KRN'],
                ['name_en' => 'Thebes', 'name_ar' => 'طيبة', 'code' => 'THB'],
            ],

            // Aswan - 9 cities
            'Aswan' => [
                ['name_en' => 'Aswan', 'name_ar' => 'أسوان', 'code' => 'ASW'],
                ['name_en' => 'Kom Ombo', 'name_ar' => 'كوم أمبو', 'code' => 'KOM'],
                ['name_en' => 'Edfu', 'name_ar' => 'إدفو', 'code' => 'EDF'],
                ['name_en' => 'Daraw', 'name_ar' => 'دراو', 'code' => 'DRW'],
                ['name_en' => 'Abu Simbel', 'name_ar' => 'أبو سمبل', 'code' => 'ABS'],
                ['name_en' => 'Nasr Al-Nuba', 'name_ar' => 'نصر النوبة', 'code' => 'NNB'],
                ['name_en' => 'Kalabsha', 'name_ar' => 'كلابشة', 'code' => 'KLB'],
                ['name_en' => 'Al-Basilia', 'name_ar' => 'البصيلية', 'code' => 'BSL'],
                ['name_en' => 'Al-Radisiya', 'name_ar' => 'الرديسية', 'code' => 'RDS'],
            ],

            // Asyut - 11 cities
            'Asyut' => [
                ['name_en' => 'Asyut', 'name_ar' => 'أسيوط', 'code' => 'AST'],
                ['name_en' => 'New Asyut', 'name_ar' => 'أسيوط الجديدة', 'code' => 'NAS'],
                ['name_en' => 'Dayrut', 'name_ar' => 'ديروط', 'code' => 'DYR'],
                ['name_en' => 'Qusiya', 'name_ar' => 'القوصية', 'code' => 'QUS'],
                ['name_en' => 'Manfalut', 'name_ar' => 'منفلوط', 'code' => 'MNF'],
                ['name_en' => 'Abnoub', 'name_ar' => 'أبنوب', 'code' => 'ABN'],
                ['name_en' => 'Abu Tig', 'name_ar' => 'أبو تيج', 'code' => 'ABT'],
                ['name_en' => 'Al-Ghanaim', 'name_ar' => 'الغنايم', 'code' => 'GHN'],
                ['name_en' => 'Sahel Selim', 'name_ar' => 'ساحل سليم', 'code' => 'SHS'],
                ['name_en' => 'Al-Badari', 'name_ar' => 'البداري', 'code' => 'BDR'],
                ['name_en' => 'Sidfa', 'name_ar' => 'صدفا', 'code' => 'SDF'],
            ],

            // Beheira
            'Beheira' => [
                ['name_en' => 'Damanhour', 'name_ar' => 'دمنهور', 'code' => 'DMN'],
                ['name_en' => 'Kafr al-Dawwar', 'name_ar' => 'كفر الدوار', 'code' => 'KFD'],
                ['name_en' => 'Rashid', 'name_ar' => 'رشيد', 'code' => 'RSH'],
                ['name_en' => 'Idku', 'name_ar' => 'إدكو', 'code' => 'IDK'],
                ['name_en' => 'Abu al-Matamir', 'name_ar' => 'أبو المطامير', 'code' => 'ABM'],
                ['name_en' => 'Abu Homs', 'name_ar' => 'أبو حمص', 'code' => 'AHM'],
                ['name_en' => 'Delengat', 'name_ar' => 'الدلنجات', 'code' => 'DLN'],
                ['name_en' => 'Mahmudiyah', 'name_ar' => 'المحمودية', 'code' => 'MHM'],
                ['name_en' => 'Rahmaniya', 'name_ar' => 'الرحمانية', 'code' => 'RHM'],
                ['name_en' => 'Itay al-Barud', 'name_ar' => 'إيتاي البارود', 'code' => 'ITB'],
                ['name_en' => 'Hosh Issa', 'name_ar' => 'حوش عيسى', 'code' => 'HSH'],
                ['name_en' => 'Shubrakhit', 'name_ar' => 'شبراخيت', 'code' => 'SHK'],
                ['name_en' => 'Kom Hamada', 'name_ar' => 'كوم حمادة', 'code' => 'KHM'],
                ['name_en' => 'Badr', 'name_ar' => 'بدر', 'code' => 'BDR'],
                ['name_en' => 'Wadi al-Natrun', 'name_ar' => 'وادي النطرون', 'code' => 'WDN'],
            ],

            // Beni Suef - 9 cities
            'Beni Suef' => [
                ['name_en' => 'Beni Suef', 'name_ar' => 'بني سويف', 'code' => 'BNS'],
                ['name_en' => 'New Beni Suef', 'name_ar' => 'بني سويف الجديدة', 'code' => 'NBS'],
                ['name_en' => 'Al Wasta', 'name_ar' => 'الواسطى', 'code' => 'WST'],
                ['name_en' => 'Naser', 'name_ar' => 'ناصر', 'code' => 'NSR'],
                ['name_en' => 'Ehnasya', 'name_ar' => 'إهناسيا', 'code' => 'EHN'],
                ['name_en' => 'Biba', 'name_ar' => 'ببا', 'code' => 'BBA'],
                ['name_en' => 'Fashn', 'name_ar' => 'الفشن', 'code' => 'FSH'],
                ['name_en' => 'Sumusta', 'name_ar' => 'سمسطا', 'code' => 'SMS'],
                ['name_en' => 'Al Lahun', 'name_ar' => 'اللاهون', 'code' => 'LHN'],
            ],

            // Dakahlia - Full list (20+ cities including Mansoura)
            'Dakahlia' => [
                // Mansoura - Main city
                ['name_en' => 'Mansoura', 'name_ar' => 'المنصورة', 'code' => 'MNS'],
                ['name_en' => 'Mansoura University', 'name_ar' => 'جامعة المنصورة', 'code' => 'MNU'],
                ['name_en' => 'Mansoura Al Gadida', 'name_ar' => 'المنصورة الجديدة', 'code' => 'MNG'],
                ['name_en' => 'Gehan', 'name_ar' => 'جيهان', 'code' => 'GHN'],
                ['name_en' => 'Toreil', 'name_ar' => 'طوريل', 'code' => 'TRL'],
                ['name_en' => 'Sandob', 'name_ar' => 'سندوب', 'code' => 'SND'],
                
                // Other Major Cities
                ['name_en' => 'Talkha', 'name_ar' => 'طلخا', 'code' => 'TLK'],
                ['name_en' => 'Mit Ghamr', 'name_ar' => 'ميت غمر', 'code' => 'MTG'],
                ['name_en' => 'Dekernes', 'name_ar' => 'دكرنس', 'code' => 'DKR'],
                ['name_en' => 'Aga', 'name_ar' => 'أجا', 'code' => 'AGA'],
                ['name_en' => 'Manzala', 'name_ar' => 'المنزلة', 'code' => 'MNZ'],
                ['name_en' => 'Sinbillawain', 'name_ar' => 'السنبلاوين', 'code' => 'SNB'],
                ['name_en' => 'Bilqas', 'name_ar' => 'بلقاس', 'code' => 'BLQ'],
                ['name_en' => 'Mit Salsil', 'name_ar' => 'ميت سلسيل', 'code' => 'MTS'],
                ['name_en' => 'Gamasa', 'name_ar' => 'الجماسة', 'code' => 'GMS'],
                ['name_en' => 'Sherbin', 'name_ar' => 'شربين', 'code' => 'SHR'],
                ['name_en' => 'Matariya', 'name_ar' => 'المطرية', 'code' => 'MTR'],
                ['name_en' => 'Tami al-Amdid', 'name_ar' => 'تمي الأمديد', 'code' => 'TMA'],
                ['name_en' => 'Nabaruh', 'name_ar' => 'نبروه', 'code' => 'NBR'],
                ['name_en' => 'Bani Ubaid', 'name_ar' => 'بني عبيد', 'code' => 'BNU'],
                ['name_en' => 'Al-Kordi', 'name_ar' => 'الكردي', 'code' => 'KRD'],
                ['name_en' => 'Minyat Al Nasr', 'name_ar' => 'منية النصر', 'code' => 'MNN'],
                ['name_en' => 'Al-Mansoura Bridge', 'name_ar' => 'كوبري المنصورة', 'code' => 'MNB'],
            ],

            // Damietta
            'Damietta' => [
                ['name_en' => 'Damietta', 'name_ar' => 'دمياط', 'code' => 'DMT'],
                ['name_en' => 'New Damietta', 'name_ar' => 'دمياط الجديدة', 'code' => 'NDM'],
                ['name_en' => 'Ras El Bar', 'name_ar' => 'رأس البر', 'code' => 'REB'],
                ['name_en' => 'Faraskur', 'name_ar' => 'فارسكور', 'code' => 'FRS'],
                ['name_en' => 'Zarqa', 'name_ar' => 'الزرقا', 'code' => 'ZRQ'],
                ['name_en' => 'Kafr Saad', 'name_ar' => 'كفر سعد', 'code' => 'KFS'],
                ['name_en' => 'Kafr al-Battikh', 'name_ar' => 'كفر البطيخ', 'code' => 'KFB'],
                ['name_en' => 'Ezbet El Borg', 'name_ar' => 'عزبة البرج', 'code' => 'EZB'],
            ],

            // Fayyum - 9 cities
            'Fayyum' => [
                ['name_en' => 'Fayyum', 'name_ar' => 'الفيوم', 'code' => 'FYM'],
                ['name_en' => 'New Fayyum', 'name_ar' => 'الفيوم الجديدة', 'code' => 'NFY'],
                ['name_en' => 'Tamiya', 'name_ar' => 'طامية', 'code' => 'TMY'],
                ['name_en' => 'Snores', 'name_ar' => 'سنورس', 'code' => 'SNR'],
                ['name_en' => 'Itsa', 'name_ar' => 'إطسا', 'code' => 'ITS'],
                ['name_en' => 'Ibshaway', 'name_ar' => 'إبشواي', 'code' => 'IBS'],
                ['name_en' => 'Yusuf al-Siddiq', 'name_ar' => 'يوسف الصديق', 'code' => 'YSF'],
                ['name_en' => 'Tunis Village', 'name_ar' => 'قرية تونس', 'code' => 'TNS'],
                ['name_en' => 'Qarun Lake', 'name_ar' => 'بحيرة قارون', 'code' => 'QRN'],
            ],

            // Gharbia
            'Gharbia' => [
                ['name_en' => 'Tanta', 'name_ar' => 'طنطا', 'code' => 'TNT'],
                ['name_en' => 'Al-Mahalla Al-Kubra', 'name_ar' => 'المحلة الكبرى', 'code' => 'MHL'],
                ['name_en' => 'Kafr El Zayat', 'name_ar' => 'كفر الزيات', 'code' => 'KFZ'],
                ['name_en' => 'Zefta', 'name_ar' => 'زفتى', 'code' => 'ZFT'],
                ['name_en' => 'Samanoud', 'name_ar' => 'سمنود', 'code' => 'SMN'],
                ['name_en' => 'Basyoun', 'name_ar' => 'بسيون', 'code' => 'BSY'],
                ['name_en' => 'Qutour', 'name_ar' => 'قطور', 'code' => 'QTR'],
                ['name_en' => 'Al-Santa', 'name_ar' => 'السنطة', 'code' => 'SNT'],
            ],

            // Ismailia - 9 cities
            'Ismailia' => [
                ['name_en' => 'Ismailia', 'name_ar' => 'الإسماعيلية', 'code' => 'ISM'],
                ['name_en' => 'New Ismailia', 'name_ar' => 'الإسماعيلية الجديدة', 'code' => 'NIS'],
                ['name_en' => 'Fayed', 'name_ar' => 'فايد', 'code' => 'FYD'],
                ['name_en' => 'Qantara Sharq', 'name_ar' => 'القنطرة شرق', 'code' => 'QNS'],
                ['name_en' => 'Qantara Gharb', 'name_ar' => 'القنطرة غرب', 'code' => 'QNG'],
                ['name_en' => 'Abu Swir', 'name_ar' => 'أبو صوير', 'code' => 'ABS'],
                ['name_en' => 'Tal al-Kabir', 'name_ar' => 'التل الكبير', 'code' => 'TLK'],
                ['name_en' => 'Serapeum', 'name_ar' => 'السرابيوم', 'code' => 'SRP'],
                ['name_en' => 'Nefesha', 'name_ar' => 'نفيشة', 'code' => 'NFH'],
            ],

            // Kafr el-Sheikh - Full list (15 cities)
            'Kafr el-Sheikh' => [
                ['name_en' => 'Kafr el-Sheikh', 'name_ar' => 'كفر الشيخ', 'code' => 'KFS'],
                ['name_en' => 'Desouk', 'name_ar' => 'دسوق', 'code' => 'DSQ'],
                ['name_en' => 'Fuwwah', 'name_ar' => 'فوه', 'code' => 'FWH'],
                ['name_en' => 'Metoubes', 'name_ar' => 'مطوبس', 'code' => 'MTB'],
                ['name_en' => 'Baltim', 'name_ar' => 'بلطيم', 'code' => 'BLT'],
                ['name_en' => 'Hamoul', 'name_ar' => 'الحامول', 'code' => 'HML'],
                ['name_en' => 'Sidi Salem', 'name_ar' => 'سيدي سالم', 'code' => 'SDS'],
                ['name_en' => 'Qallin', 'name_ar' => 'قلين', 'code' => 'QLN'],
                ['name_en' => 'Beyala', 'name_ar' => 'بيلا', 'code' => 'BYL'],
                ['name_en' => 'Riyadh', 'name_ar' => 'الرياض', 'code' => 'RYD'],
                ['name_en' => 'Burullus', 'name_ar' => 'البرلس', 'code' => 'BRL'],
                ['name_en' => 'Motoubes Port', 'name_ar' => 'ميناء مطوبس', 'code' => 'MTP'],
                ['name_en' => 'Sakha', 'name_ar' => 'سخا', 'code' => 'SKH'],
                ['name_en' => 'Kafr El Batikh', 'name_ar' => 'كفر البطيخ', 'code' => 'KFB'],
                ['name_en' => 'Al Burj', 'name_ar' => 'البرج', 'code' => 'BRJ'],
            ],

            // Matrouh
            'Matrouh' => [
                ['name_en' => 'Marsa Matrouh', 'name_ar' => 'مرسى مطروح', 'code' => 'MTR'],
                ['name_en' => 'El Alamein', 'name_ar' => 'العلمين', 'code' => 'ALM'],
                ['name_en' => 'New Alamein', 'name_ar' => 'العلمين الجديدة', 'code' => 'NAL'],
                ['name_en' => 'Dabaa', 'name_ar' => 'الضبعة', 'code' => 'DBA'],
                ['name_en' => 'Al-Hamam', 'name_ar' => 'الحمام', 'code' => 'HMM'],
                ['name_en' => 'Sidi Barrani', 'name_ar' => 'سيدي براني', 'code' => 'SDB'],
                ['name_en' => 'Salloum', 'name_ar' => 'السلوم', 'code' => 'SLM'],
                ['name_en' => 'Siwa', 'name_ar' => 'سيوة', 'code' => 'SWA'],
                ['name_en' => 'Negaila', 'name_ar' => 'النجيلة', 'code' => 'NGL'],
            ],

            // Minya
            'Minya' => [
                ['name_en' => 'Minya', 'name_ar' => 'المنيا', 'code' => 'MNY'],
                ['name_en' => 'Mallawi', 'name_ar' => 'ملوي', 'code' => 'MLW'],
                ['name_en' => 'Samalut', 'name_ar' => 'سمالوط', 'code' => 'SML'],
                ['name_en' => 'Matay', 'name_ar' => 'مطاي', 'code' => 'MTY'],
                ['name_en' => 'Bani Mazar', 'name_ar' => 'بني مزار', 'code' => 'BNM'],
                ['name_en' => 'Maghagha', 'name_ar' => 'مغاغة', 'code' => 'MGH'],
                ['name_en' => 'Abu Qurqas', 'name_ar' => 'أبو قرقاص', 'code' => 'ABQ'],
                ['name_en' => 'Deir Mawas', 'name_ar' => 'دير مواس', 'code' => 'DRM'],
                ['name_en' => 'Al Idwa', 'name_ar' => 'العدوة', 'code' => 'IDW'],
            ],

            // Monufia - Full list (15 cities)
            'Monufia' => [
                ['name_en' => 'Shibin El Kom', 'name_ar' => 'شبين الكوم', 'code' => 'SHK'],
                ['name_en' => 'Menouf', 'name_ar' => 'منوف', 'code' => 'MNF'],
                ['name_en' => 'Ashmoun', 'name_ar' => 'أشمون', 'code' => 'ASH'],
                ['name_en' => 'Al Bagour', 'name_ar' => 'الباجور', 'code' => 'BGR'],
                ['name_en' => 'Quesna', 'name_ar' => 'قويسنا', 'code' => 'QSN'],
                ['name_en' => 'Berket El Saba', 'name_ar' => 'بركة السبع', 'code' => 'BRK'],
                ['name_en' => 'Tala', 'name_ar' => 'تلا', 'code' => 'TLA'],
                ['name_en' => 'Al Shohada', 'name_ar' => 'الشهداء', 'code' => 'SHD'],
                ['name_en' => 'Sadat City', 'name_ar' => 'مدينة السادات', 'code' => 'SDT'],
                ['name_en' => 'Sers El Layan', 'name_ar' => 'سرس الليان', 'code' => 'SRL'],
                ['name_en' => 'Kafr El Sheikh Ibrahim', 'name_ar' => 'كفر الشيخ إبراهيم', 'code' => 'KSI'],
                ['name_en' => 'Shubra Bakhom', 'name_ar' => 'شبرا بخوم', 'code' => 'SBK'],
                ['name_en' => 'Sadat Extension', 'name_ar' => 'امتداد السادات', 'code' => 'SDE'],
                ['name_en' => 'Minuf Industrial', 'name_ar' => 'منوف الصناعية', 'code' => 'MNI'],
                ['name_en' => 'Shibin University', 'name_ar' => 'جامعة شبين', 'code' => 'SHU'],
            ],

            // New Valley
            'New Valley' => [
                ['name_en' => 'Kharga', 'name_ar' => 'الخارجة', 'code' => 'KHR'],
                ['name_en' => 'Dakhla', 'name_ar' => 'الداخلة', 'code' => 'DKH'],
                ['name_en' => 'Farafra', 'name_ar' => 'الفرافرة', 'code' => 'FRF'],
                ['name_en' => 'Balat', 'name_ar' => 'بلاط', 'code' => 'BLT'],
                ['name_en' => 'Mut', 'name_ar' => 'موط', 'code' => 'MUT'],
                ['name_en' => 'Paris', 'name_ar' => 'باريس', 'code' => 'PRS'],
            ],

            // North Sinai
            'North Sinai' => [
                ['name_en' => 'Arish', 'name_ar' => 'العريش', 'code' => 'ARS'],
                ['name_en' => 'Sheikh Zuweid', 'name_ar' => 'الشيخ زويد', 'code' => 'SHZ'],
                ['name_en' => 'Rafah', 'name_ar' => 'رفح', 'code' => 'RFH'],
                ['name_en' => 'Bir al-Abd', 'name_ar' => 'بئر العبد', 'code' => 'BRA'],
                ['name_en' => 'Nakhl', 'name_ar' => 'نخل', 'code' => 'NKH'],
                ['name_en' => 'Hasana', 'name_ar' => 'الحسنة', 'code' => 'HSN'],
            ],

            // Qena
            'Qena' => [
                ['name_en' => 'Qena', 'name_ar' => 'قنا', 'code' => 'QNA'],
                ['name_en' => 'Abu Tesht', 'name_ar' => 'أبو تشت', 'code' => 'ABT'],
                ['name_en' => 'Nag Hammadi', 'name_ar' => 'نجع حمادي', 'code' => 'NGH'],
                ['name_en' => 'Deshna', 'name_ar' => 'دشنا', 'code' => 'DSH'],
                ['name_en' => 'Qift', 'name_ar' => 'قفط', 'code' => 'QFT'],
                ['name_en' => 'Qus', 'name_ar' => 'قوص', 'code' => 'QUS'],
                ['name_en' => 'Naqada', 'name_ar' => 'نقادة', 'code' => 'NQD'],
                ['name_en' => 'Farshut', 'name_ar' => 'فرشوط', 'code' => 'FRS'],
                ['name_en' => 'Qutur', 'name_ar' => 'قطور', 'code' => 'QTR'],
            ],

            // Red Sea
            'Red Sea' => [
                ['name_en' => 'Hurghada', 'name_ar' => 'الغردقة', 'code' => 'HRG'],
                ['name_en' => 'Safaga', 'name_ar' => 'سفاجا', 'code' => 'SFG'],
                ['name_en' => 'Qusayr', 'name_ar' => 'القصير', 'code' => 'QSR'],
                ['name_en' => 'Marsa Alam', 'name_ar' => 'مرسى علم', 'code' => 'RMF'],
                ['name_en' => 'Shalatin', 'name_ar' => 'شلاتين', 'code' => 'SHL'],
                ['name_en' => 'Halaib', 'name_ar' => 'حلايب', 'code' => 'HLB'],
                ['name_en' => 'Ras Ghareb', 'name_ar' => 'رأس غارب', 'code' => 'RGH'],
                ['name_en' => 'El Gouna', 'name_ar' => 'الجونة', 'code' => 'GNA'],
                ['name_en' => 'Soma Bay', 'name_ar' => 'سوما باي', 'code' => 'SMB'],
                ['name_en' => 'Makadi Bay', 'name_ar' => 'مكادي باي', 'code' => 'MKD'],
            ],

            // Sharqia - Full list (20+ cities)
            'Sharqia' => [
                ['name_en' => 'Zagazig', 'name_ar' => 'الزقازيق', 'code' => 'ZGZ'],
                ['name_en' => '10th of Ramadan', 'name_ar' => 'العاشر من رمضان', 'code' => '10R'],
                ['name_en' => 'Bilbeis', 'name_ar' => 'بلبيس', 'code' => 'BLB'],
                ['name_en' => 'Abu Hammad', 'name_ar' => 'أبو حماد', 'code' => 'ABH'],
                ['name_en' => 'Al-Husseiniya', 'name_ar' => 'الحسينية', 'code' => 'HSN'],
                ['name_en' => 'Faqous', 'name_ar' => 'فاقوس', 'code' => 'FQS'],
                ['name_en' => 'Kafr Saqr', 'name_ar' => 'كفر صقر', 'code' => 'KFS'],
                ['name_en' => 'Awlad Saqr', 'name_ar' => 'أولاد صقر', 'code' => 'AWS'],
                ['name_en' => 'Diyarb Negm', 'name_ar' => 'ديرب نجم', 'code' => 'DYN'],
                ['name_en' => 'Abu Kabir', 'name_ar' => 'أبو كبير', 'code' => 'ABK'],
                ['name_en' => 'Hihya', 'name_ar' => 'ههيا', 'code' => 'HHY'],
                ['name_en' => 'Mashtul El Souk', 'name_ar' => 'مشتول السوق', 'code' => 'MSH'],
                ['name_en' => 'Minya al-Qamh', 'name_ar' => 'منيا القمح', 'code' => 'MNQ'],
                ['name_en' => 'Al-Ibrahimiya', 'name_ar' => 'الإبراهيمية', 'code' => 'IBR'],
                ['name_en' => 'Al-Salihiya Al-Jadida', 'name_ar' => 'الصالحية الجديدة', 'code' => 'SLJ'],
                ['name_en' => 'Al-Qurayn', 'name_ar' => 'القرين', 'code' => 'QRN'],
                ['name_en' => 'San El Hagar', 'name_ar' => 'صان الحجر', 'code' => 'SNH'],
                ['name_en' => 'Al-Qanayat', 'name_ar' => 'القنايات', 'code' => 'QNY'],
                ['name_en' => 'Zagazig University', 'name_ar' => 'جامعة الزقازيق', 'code' => 'ZGU'],
                ['name_en' => 'Al-Zahra', 'name_ar' => 'الزهراء', 'code' => 'ZHR'],
            ],

            // Sohag
            'Sohag' => [
                ['name_en' => 'Sohag', 'name_ar' => 'سوهاج', 'code' => 'SOH'],
                ['name_en' => 'Akhmim', 'name_ar' => 'أخميم', 'code' => 'AKH'],
                ['name_en' => 'Girga', 'name_ar' => 'جرجا', 'code' => 'GRG'],
                ['name_en' => 'Balyana', 'name_ar' => 'البلينا', 'code' => 'BLY'],
                ['name_en' => 'El-Maragha', 'name_ar' => 'المراغة', 'code' => 'MRG'],
                ['name_en' => 'Dar el-Salam', 'name_ar' => 'دار السلام', 'code' => 'DRS'],
                ['name_en' => 'Juhayna', 'name_ar' => 'جهينة', 'code' => 'JHN'],
                ['name_en' => 'Saqultah', 'name_ar' => 'ساقلتة', 'code' => 'SQT'],
                ['name_en' => 'Tima', 'name_ar' => 'طما', 'code' => 'TMA'],
                ['name_en' => 'Tahta', 'name_ar' => 'طهطا', 'code' => 'THT'],
            ],

            // South Sinai - Full list (15+ cities including Sharm El Sheikh)
            'South Sinai' => [
                // Sharm El Sheikh & Surrounding Areas
                ['name_en' => 'Sharm El Sheikh', 'name_ar' => 'شرم الشيخ', 'code' => 'SSH'],
                ['name_en' => 'Naama Bay', 'name_ar' => 'خليج نعمة', 'code' => 'NAM'],
                ['name_en' => 'Sharks Bay', 'name_ar' => 'خليج القرش', 'code' => 'SHB'],
                ['name_en' => 'Nabq Bay', 'name_ar' => 'خليج نبق', 'code' => 'NBQ'],
                ['name_en' => 'Ras Nasrani', 'name_ar' => 'رأس نصراني', 'code' => 'RNN'],
                ['name_en' => 'Old Market Sharm', 'name_ar' => 'السوق القديم', 'code' => 'OMS'],
                ['name_en' => 'Hadaba', 'name_ar' => 'هضبة أم السيد', 'code' => 'HDB'],
                ['name_en' => 'Ras Um El Sid', 'name_ar' => 'رأس أم السيد', 'code' => 'RUS'],
                ['name_en' => 'Montazah Sharm', 'name_ar' => 'منتزه شرم', 'code' => 'MTS'],
                
                // Other Cities
                ['name_en' => 'Dahab', 'name_ar' => 'دهب', 'code' => 'DHB'],
                ['name_en' => 'Nuweiba', 'name_ar' => 'نويبع', 'code' => 'NWB'],
                ['name_en' => 'Taba', 'name_ar' => 'طابا', 'code' => 'TBA'],
                ['name_en' => 'Saint Catherine', 'name_ar' => 'سانت كاترين', 'code' => 'STC'],
                ['name_en' => 'Ras Sidr', 'name_ar' => 'رأس سدر', 'code' => 'RSD'],
                ['name_en' => 'Abu Rudeis', 'name_ar' => 'أبو رديس', 'code' => 'ABR'],
                ['name_en' => 'Abu Zenima', 'name_ar' => 'أبو زنيمة', 'code' => 'ABZ'],
                ['name_en' => 'Tor', 'name_ar' => 'الطور', 'code' => 'TOR'],
            ],

            // New Administrative Capital
            'New Administrative Capital' => [
                ['name_en' => 'Administrative Capital', 'name_ar' => 'العاصمة الإدارية', 'code' => 'NAC'],
                ['name_en' => 'R7 District', 'name_ar' => 'الحي السابع', 'code' => 'R7'],
                ['name_en' => 'R8 District', 'name_ar' => 'الحي الثامن', 'code' => 'R8'],
                ['name_en' => 'Downtown', 'name_ar' => 'داون تاون', 'code' => 'DWN'],
                ['name_en' => 'Diplomatic District', 'name_ar' => 'الحي الدبلوماسي', 'code' => 'DPL'],
                ['name_en' => 'Green River', 'name_ar' => 'النهر الأخضر', 'code' => 'GRN'],
            ],

            // UAE - Abu Dhabi - Full list (60+ cities)
            'Abu Dhabi' => [
                // Abu Dhabi City Areas - Central
                ['name_en' => 'Abu Dhabi City', 'name_ar' => 'مدينة أبوظبي', 'code' => 'AUH'],
                ['name_en' => 'Corniche', 'name_ar' => 'الكورنيش', 'code' => 'CRN'],
                ['name_en' => 'Khalidiya', 'name_ar' => 'الخالدية', 'code' => 'KHD'],
                ['name_en' => 'Al Markaziyah', 'name_ar' => 'المركزية', 'code' => 'MRK'],
                ['name_en' => 'Al Zahiyah', 'name_ar' => 'الظاهرة', 'code' => 'ZAH'],
                ['name_en' => 'Al Manaseer', 'name_ar' => 'المناصير', 'code' => 'MNS'],
                ['name_en' => 'Al Mushrif', 'name_ar' => 'المشرف', 'code' => 'MSH'],
                ['name_en' => 'Al Bateen', 'name_ar' => 'البطين', 'code' => 'BTN'],
                ['name_en' => 'Al Rowdah', 'name_ar' => 'الروضة', 'code' => 'RWD'],
                ['name_en' => 'Al Manhal', 'name_ar' => 'المنهل', 'code' => 'MNH'],
                ['name_en' => 'Al Karamah', 'name_ar' => 'الكرامة', 'code' => 'KRM'],
                ['name_en' => 'Al Danah', 'name_ar' => 'الدانة', 'code' => 'DNA'],
                ['name_en' => 'Tourist Club Area', 'name_ar' => 'منطقة النادي السياحي', 'code' => 'TCA'],
                ['name_en' => 'Al Ras Al Akhdar', 'name_ar' => 'الرأس الأخضر', 'code' => 'RAK'],
                ['name_en' => 'Al Maqtaa', 'name_ar' => 'المقطع', 'code' => 'MQT'],
                ['name_en' => 'Al Nahyan', 'name_ar' => 'النهيان', 'code' => 'NHY'],
                ['name_en' => 'Al Zaab', 'name_ar' => 'الزعاب', 'code' => 'ZAB'],
                ['name_en' => 'Al Salam Street', 'name_ar' => 'شارع السلام', 'code' => 'SLM'],
                ['name_en' => 'Electra Street', 'name_ar' => 'شارع إلكترا', 'code' => 'ELC'],
                ['name_en' => 'Hamdan Street', 'name_ar' => 'شارع حمدان', 'code' => 'HMD'],
                
                // Islands
                ['name_en' => 'Al Maryah Island', 'name_ar' => 'جزيرة الماريه', 'code' => 'MRY'],
                ['name_en' => 'Al Reem Island', 'name_ar' => 'جزيرة الريم', 'code' => 'REM'],
                ['name_en' => 'Saadiyat Island', 'name_ar' => 'جزيرة السعديات', 'code' => 'SAD'],
                ['name_en' => 'Yas Island', 'name_ar' => 'جزيرة ياس', 'code' => 'YAS'],
                ['name_en' => 'Al Hudayriat Island', 'name_ar' => 'جزيرة الحديريات', 'code' => 'HDR'],
                ['name_en' => 'Lulu Island', 'name_ar' => 'جزيرة اللؤلؤ', 'code' => 'LLU'],
                
                // New Developments
                ['name_en' => 'Al Raha Beach', 'name_ar' => 'شاطئ الراحة', 'code' => 'RHA'],
                ['name_en' => 'Al Raha Gardens', 'name_ar' => 'حدائق الراحة', 'code' => 'RHG'],
                ['name_en' => 'Al Ghadeer', 'name_ar' => 'الغدير', 'code' => 'GHD'],
                ['name_en' => 'Khalifa City', 'name_ar' => 'مدينة خليفة', 'code' => 'KHL'],
                ['name_en' => 'Khalifa City A', 'name_ar' => 'مدينة خليفة أ', 'code' => 'KHA'],
                ['name_en' => 'Khalifa City B', 'name_ar' => 'مدينة خليفة ب', 'code' => 'KHB'],
                ['name_en' => 'Mohammed Bin Zayed City', 'name_ar' => 'مدينة محمد بن زايد', 'code' => 'MBZ'],
                ['name_en' => 'Al Shamkha', 'name_ar' => 'الشامخة', 'code' => 'SHM'],
                ['name_en' => 'Al Shamkha South', 'name_ar' => 'الشامخة الجنوبية', 'code' => 'SMS'],
                ['name_en' => 'Shakhbout City', 'name_ar' => 'مدينة شخبوط', 'code' => 'SHK'],
                ['name_en' => 'Baniyas', 'name_ar' => 'بني ياس', 'code' => 'BNY'],
                ['name_en' => 'Baniyas East', 'name_ar' => 'بني ياس الشرقية', 'code' => 'BNE'],
                ['name_en' => 'Baniyas West', 'name_ar' => 'بني ياس الغربية', 'code' => 'BNW'],
                
                // Industrial & Business
                ['name_en' => 'Musaffah', 'name_ar' => 'مصفح', 'code' => 'MSF'],
                ['name_en' => 'Musaffah Industrial', 'name_ar' => 'مصفح الصناعية', 'code' => 'MSI'],
                ['name_en' => 'ICAD', 'name_ar' => 'مدينة أبوظبي الصناعية', 'code' => 'ICD'],
                ['name_en' => 'Al Bahia', 'name_ar' => 'الباهية', 'code' => 'BHY'],
                ['name_en' => 'Al Reef', 'name_ar' => 'الريف', 'code' => 'REF'],
                ['name_en' => 'Al Reef Downtown', 'name_ar' => 'الريف داون تاون', 'code' => 'RFD'],
                ['name_en' => 'Masdar City', 'name_ar' => 'مدينة مصدر', 'code' => 'MSD'],
                
                // Al Ain Region
                ['name_en' => 'Al Ain', 'name_ar' => 'العين', 'code' => 'AAN'],
                ['name_en' => 'Al Ain City Center', 'name_ar' => 'مركز مدينة العين', 'code' => 'AAC'],
                ['name_en' => 'Al Jimi', 'name_ar' => 'الجيمي', 'code' => 'JMI'],
                ['name_en' => 'Al Towayya', 'name_ar' => 'الطوية', 'code' => 'TWY'],
                ['name_en' => 'Al Mutawaa', 'name_ar' => 'المطوع', 'code' => 'MTW'],
                ['name_en' => 'Al Khabisi', 'name_ar' => 'الخبيصي', 'code' => 'KHB'],
                ['name_en' => 'Zakher', 'name_ar' => 'زاخر', 'code' => 'ZKR'],
                ['name_en' => 'Asharej', 'name_ar' => 'عشارج', 'code' => 'ASH'],
                ['name_en' => 'Falaj Hazzaa', 'name_ar' => 'فلج هزاع', 'code' => 'FLJ'],
                ['name_en' => 'Bida Zayed', 'name_ar' => 'بدع زايد', 'code' => 'BDZ'],
                ['name_en' => 'Al Wagan', 'name_ar' => 'الوقن', 'code' => 'WGN'],
                ['name_en' => 'Jebel Hafeet', 'name_ar' => 'جبل حفيت', 'code' => 'JHF'],
                
                // Al Dhafra Region
                ['name_en' => 'Al Dhafra', 'name_ar' => 'الظفرة', 'code' => 'DHF'],
                ['name_en' => 'Madinat Zayed', 'name_ar' => 'مدينة زايد', 'code' => 'MDZ'],
                ['name_en' => 'Liwa', 'name_ar' => 'ليوا', 'code' => 'LWA'],
                ['name_en' => 'Ruwais', 'name_ar' => 'الرويس', 'code' => 'RWS'],
                ['name_en' => 'Ghayathi', 'name_ar' => 'غياثي', 'code' => 'GHY'],
                ['name_en' => 'Mirfa', 'name_ar' => 'مرفأ', 'code' => 'MRF'],
                ['name_en' => 'Sila', 'name_ar' => 'السلع', 'code' => 'SLA'],
                ['name_en' => 'Delma Island', 'name_ar' => 'جزيرة دلما', 'code' => 'DLM'],
            ],

            // UAE - Dubai - Full list (80+ cities)
            'Dubai' => [
                // Downtown & Central Dubai
                ['name_en' => 'Dubai City', 'name_ar' => 'مدينة دبي', 'code' => 'DXB'],
                ['name_en' => 'Downtown Dubai', 'name_ar' => 'وسط مدينة دبي', 'code' => 'DTD'],
                ['name_en' => 'Burj Khalifa', 'name_ar' => 'برج خليفة', 'code' => 'BKH'],
                ['name_en' => 'Business Bay', 'name_ar' => 'الخليج التجاري', 'code' => 'BBY'],
                ['name_en' => 'DIFC', 'name_ar' => 'مركز دبي المالي العالمي', 'code' => 'DFC'],
                ['name_en' => 'City Walk', 'name_ar' => 'سيتي ووك', 'code' => 'CWK'],
                ['name_en' => 'Al Wasl', 'name_ar' => 'الوصل', 'code' => 'WSL'],
                ['name_en' => 'Zabeel', 'name_ar' => 'زعبيل', 'code' => 'ZBL'],
                ['name_en' => 'Trade Centre', 'name_ar' => 'المركز التجاري', 'code' => 'TRC'],
                
                // Deira & Old Dubai
                ['name_en' => 'Deira', 'name_ar' => 'ديرة', 'code' => 'DEI'],
                ['name_en' => 'Bur Dubai', 'name_ar' => 'بر دبي', 'code' => 'BUR'],
                ['name_en' => 'Al Karama', 'name_ar' => 'الكرامة', 'code' => 'KRM'],
                ['name_en' => 'Bur Juman', 'name_ar' => 'بر جمان', 'code' => 'BRJ'],
                ['name_en' => 'Al Mankhool', 'name_ar' => 'المنخول', 'code' => 'MNK'],
                ['name_en' => 'Al Raffa', 'name_ar' => 'الرفاعة', 'code' => 'RFA'],
                ['name_en' => 'Al Muteena', 'name_ar' => 'المطينة', 'code' => 'MTN'],
                ['name_en' => 'Al Rigga', 'name_ar' => 'الرقة', 'code' => 'RGG'],
                ['name_en' => 'Port Saeed', 'name_ar' => 'بور سعيد', 'code' => 'PSD'],
                ['name_en' => 'Al Ras', 'name_ar' => 'الراس', 'code' => 'ARS'],
                ['name_en' => 'Al Sabkha', 'name_ar' => 'السبخة', 'code' => 'SBK'],
                ['name_en' => 'Al Buteen', 'name_ar' => 'البطين', 'code' => 'BTN'],
                ['name_en' => 'Naif', 'name_ar' => 'نايف', 'code' => 'NAF'],
                ['name_en' => 'Al Khabisi', 'name_ar' => 'الخبيصي', 'code' => 'KHB'],
                ['name_en' => 'Al Qusais', 'name_ar' => 'القصيص', 'code' => 'QSS'],
                ['name_en' => 'Muhaisnah', 'name_ar' => 'محيصنة', 'code' => 'MHS'],
                ['name_en' => 'Al Twar', 'name_ar' => 'الطوار', 'code' => 'TWR'],
                ['name_en' => 'Hor Al Anz', 'name_ar' => 'هور العنز', 'code' => 'HRA'],
                
                // Marina & JBR
                ['name_en' => 'Dubai Marina', 'name_ar' => 'دبي مارينا', 'code' => 'MAR'],
                ['name_en' => 'JBR', 'name_ar' => 'جي بي آر', 'code' => 'JBR'],
                ['name_en' => 'Jumeirah Beach Residence', 'name_ar' => 'مساكن شاطئ جميرا', 'code' => 'JBRR'],
                ['name_en' => 'Dubai Media City', 'name_ar' => 'مدينة دبي للإعلام', 'code' => 'DMC'],
                ['name_en' => 'Dubai Internet City', 'name_ar' => 'مدينة دبي للإنترنت', 'code' => 'DIC'],
                ['name_en' => 'Dubai Knowledge Park', 'name_ar' => 'حديقة دبي للمعرفة', 'code' => 'DKP'],
                ['name_en' => 'Dubai Studio City', 'name_ar' => 'مدينة دبي للاستديوهات', 'code' => 'DSC'],
                ['name_en' => 'Palm Jumeirah', 'name_ar' => 'نخلة جميرا', 'code' => 'PLM'],
                ['name_en' => 'The Palm', 'name_ar' => 'النخلة', 'code' => 'PLM2'],
                ['name_en' => 'Bluewaters Island', 'name_ar' => 'جزيرة بلووترز', 'code' => 'BLW'],
                
                // Jumeirah Areas
                ['name_en' => 'Jumeirah', 'name_ar' => 'جميرا', 'code' => 'JUM'],
                ['name_en' => 'Jumeirah 1', 'name_ar' => 'جميرا 1', 'code' => 'JM1'],
                ['name_en' => 'Jumeirah 2', 'name_ar' => 'جميرا 2', 'code' => 'JM2'],
                ['name_en' => 'Jumeirah 3', 'name_ar' => 'جميرا 3', 'code' => 'JM3'],
                ['name_en' => 'Jumeirah Village Circle', 'name_ar' => 'دائرة قرية جميرا', 'code' => 'JVC'],
                ['name_en' => 'Jumeirah Village Triangle', 'name_ar' => 'مثلث قرية جميرا', 'code' => 'JVT'],
                ['name_en' => 'Jumeirah Park', 'name_ar' => 'حديقة جميرا', 'code' => 'JMP'],
                ['name_en' => 'Jumeirah Islands', 'name_ar' => 'جزر جميرا', 'code' => 'JIS'],
                ['name_en' => 'Umm Suqeim', 'name_ar' => 'أم سقيم', 'code' => 'UMS'],
                ['name_en' => 'Umm Suqeim 1', 'name_ar' => 'أم سقيم 1', 'code' => 'US1'],
                ['name_en' => 'Umm Suqeim 2', 'name_ar' => 'أم سقيم 2', 'code' => 'US2'],
                ['name_en' => 'Umm Suqeim 3', 'name_ar' => 'أم سقيم 3', 'code' => 'US3'],
                ['name_en' => 'Al Safa', 'name_ar' => 'الصفا', 'code' => 'SFA'],
                ['name_en' => 'Al Safa 1', 'name_ar' => 'الصفا 1', 'code' => 'SF1'],
                ['name_en' => 'Al Safa 2', 'name_ar' => 'الصفا 2', 'code' => 'SF2'],
                ['name_en' => 'Al Quoz', 'name_ar' => 'القوز', 'code' => 'QOZ'],
                ['name_en' => 'Al Quoz Industrial', 'name_ar' => 'القوز الصناعية', 'code' => 'QZI'],
                ['name_en' => 'Al Barsha', 'name_ar' => 'البرشاء', 'code' => 'BRS'],
                ['name_en' => 'Al Barsha 1', 'name_ar' => 'البرشاء 1', 'code' => 'BR1'],
                ['name_en' => 'Al Barsha 2', 'name_ar' => 'البرشاء 2', 'code' => 'BR2'],
                ['name_en' => 'Al Barsha 3', 'name_ar' => 'البرشاء 3', 'code' => 'BR3'],
                ['name_en' => 'Mall of the Emirates', 'name_ar' => 'مول الإمارات', 'code' => 'MOE'],
                ['name_en' => 'Al Sufouh', 'name_ar' => 'الصفوح', 'code' => 'SFH'],
                ['name_en' => 'Al Manara', 'name_ar' => 'المنارة', 'code' => 'MNR'],
                
                // New Dubai Communities
                ['name_en' => 'Dubai Hills Estate', 'name_ar' => 'دبي هيلز استيت', 'code' => 'DHE'],
                ['name_en' => 'Arabian Ranches', 'name_ar' => 'المرابع العربية', 'code' => 'ARA'],
                ['name_en' => 'Arabian Ranches 2', 'name_ar' => 'المرابع العربية 2', 'code' => 'AR2'],
                ['name_en' => 'Arabian Ranches 3', 'name_ar' => 'المرابع العربية 3', 'code' => 'AR3'],
                ['name_en' => 'Motor City', 'name_ar' => 'موتور سيتي', 'code' => 'MOT'],
                ['name_en' => 'Dubai Sports City', 'name_ar' => 'مدينة دبي الرياضية', 'code' => 'DSPC'],
                ['name_en' => 'Dubai Silicon Oasis', 'name_ar' => 'واحة دبي للسيليكون', 'code' => 'DSO'],
                ['name_en' => 'International City', 'name_ar' => 'المدينة العالمية', 'code' => 'INC'],
                ['name_en' => 'Discovery Gardens', 'name_ar' => 'حدائق الاكتشاف', 'code' => 'DSG'],
                ['name_en' => 'The Gardens', 'name_ar' => 'ذا جاردنز', 'code' => 'GRD'],
                ['name_en' => 'The Greens', 'name_ar' => 'ذا جرينز', 'code' => 'GRN'],
                ['name_en' => 'The Views', 'name_ar' => 'ذا فيوز', 'code' => 'VWS'],
                ['name_en' => 'Emirates Living', 'name_ar' => 'إعمار ليفينج', 'code' => 'EML'],
                ['name_en' => 'The Springs', 'name_ar' => 'ذا سبرينغز', 'code' => 'SPR'],
                ['name_en' => 'The Meadows', 'name_ar' => 'ذا ميدوز', 'code' => 'MDW'],
                ['name_en' => 'The Lakes', 'name_ar' => 'ذا ليكس', 'code' => 'LKS'],
                ['name_en' => 'Emirates Hills', 'name_ar' => 'إعمار هيلز', 'code' => 'EMH'],
                ['name_en' => 'Mirdif', 'name_ar' => 'مردف', 'code' => 'MRD'],
                ['name_en' => 'Uptown Mirdif', 'name_ar' => 'أب تاون مردف', 'code' => 'UPM'],
                ['name_en' => 'Festival City', 'name_ar' => 'فستيفال سيتي', 'code' => 'FSC'],
                ['name_en' => 'Al Furjan', 'name_ar' => 'الفرجان', 'code' => 'FRJ'],
                ['name_en' => 'Remraam', 'name_ar' => 'ريمرام', 'code' => 'RMR'],
                ['name_en' => 'Town Square', 'name_ar' => 'تاون سكوير', 'code' => 'TSQ'],
                ['name_en' => 'Damac Hills', 'name_ar' => 'داماك هيلز', 'code' => 'DMH'],
                ['name_en' => 'Tilal Al Ghaf', 'name_ar' => 'تلال الغاف', 'code' => 'TLG'],
                ['name_en' => 'Dubai South', 'name_ar' => 'دبي الجنوب', 'code' => 'DST'],
                ['name_en' => 'Al Maktoum Airport City', 'name_ar' => 'مدينة مطار آل مكتوم', 'code' => 'AMC'],
                ['name_en' => 'Dubai Creek Harbour', 'name_ar' => 'ميناء خور دبي', 'code' => 'DCH'],
                ['name_en' => 'Dubai Healthcare City', 'name_ar' => 'مدينة دبي الطبية', 'code' => 'DHC'],
                ['name_en' => 'Dubai Investment Park', 'name_ar' => 'حديقة دبي للاستثمار', 'code' => 'DIP'],
                ['name_en' => 'Jebel Ali', 'name_ar' => 'جبل علي', 'code' => 'JBA'],
                ['name_en' => 'Jebel Ali Village', 'name_ar' => 'قرية جبل علي', 'code' => 'JAV'],
            ],

            // UAE - Sharjah - Full list (35+ cities)
            'Sharjah' => [
                // Sharjah City Areas - Central
                ['name_en' => 'Sharjah City', 'name_ar' => 'مدينة الشارقة', 'code' => 'SHJ'],
                ['name_en' => 'Al Majaz', 'name_ar' => 'المجاز', 'code' => 'MJZ'],
                ['name_en' => 'Al Majaz 1', 'name_ar' => 'المجاز 1', 'code' => 'MJ1'],
                ['name_en' => 'Al Majaz 2', 'name_ar' => 'المجاز 2', 'code' => 'MJ2'],
                ['name_en' => 'Al Majaz 3', 'name_ar' => 'المجاز 3', 'code' => 'MJ3'],
                ['name_en' => 'Al Nahda', 'name_ar' => 'النهدة', 'code' => 'NHD'],
                ['name_en' => 'Al Nahda 1', 'name_ar' => 'النهدة 1', 'code' => 'NH1'],
                ['name_en' => 'Al Nahda 2', 'name_ar' => 'النهدة 2', 'code' => 'NH2'],
                ['name_en' => 'Al Qasimia', 'name_ar' => 'القاسمية', 'code' => 'QSM'],
                ['name_en' => 'Al Taawun', 'name_ar' => 'التعاون', 'code' => 'TAW'],
                ['name_en' => 'Muweilah', 'name_ar' => 'مويلح', 'code' => 'MWL'],
                ['name_en' => 'Muweilah Commercial', 'name_ar' => 'مويلح التجارية', 'code' => 'MWC'],
                ['name_en' => 'Al Khan', 'name_ar' => 'الخان', 'code' => 'KHN'],
                ['name_en' => 'Al Qulayaa', 'name_ar' => 'القليعة', 'code' => 'QLY'],
                ['name_en' => 'Al Rifa', 'name_ar' => 'الرفاع', 'code' => 'RFA'],
                ['name_en' => 'Al Khaledia', 'name_ar' => 'الخالدية', 'code' => 'KHD'],
                ['name_en' => 'Al Gharb', 'name_ar' => 'الغرب', 'code' => 'GHR'],
                ['name_en' => 'Al Sharq', 'name_ar' => 'الشرق', 'code' => 'SHQ'],
                ['name_en' => 'Al Qasba', 'name_ar' => 'القصباء', 'code' => 'QSB'],
                ['name_en' => 'Al Mamzar', 'name_ar' => 'الممزر', 'code' => 'MMZ'],
                ['name_en' => 'Al Soor', 'name_ar' => 'السور', 'code' => 'SOR'],
                ['name_en' => 'Bu Daniq', 'name_ar' => 'بو دنق', 'code' => 'BDQ'],
                ['name_en' => 'Al Jubail', 'name_ar' => 'الجبيل', 'code' => 'JBL'],
                ['name_en' => 'Al Jazzat', 'name_ar' => 'الجزات', 'code' => 'JZT'],
                ['name_en' => 'Al Ramaqiya', 'name_ar' => 'الرمقية', 'code' => 'RMQ'],
                ['name_en' => 'Al Nasserya', 'name_ar' => 'الناصرية', 'code' => 'NSR'],
                ['name_en' => 'Industrial Area', 'name_ar' => 'المنطقة الصناعية', 'code' => 'IND'],
                ['name_en' => 'Al Sajaa', 'name_ar' => 'السجع', 'code' => 'SJA'],
                ['name_en' => 'Al Rahmaniya', 'name_ar' => 'الرحمانية', 'code' => 'RHM'],
                ['name_en' => 'Al Suyoh', 'name_ar' => 'السيوح', 'code' => 'SYH'],
                
                // East Coast Sharjah
                ['name_en' => 'Kalba', 'name_ar' => 'كلباء', 'code' => 'KLB'],
                ['name_en' => 'Khorfakkan', 'name_ar' => 'خورفكان', 'code' => 'KHF'],
                ['name_en' => 'Dibba Al-Hisn', 'name_ar' => 'دبا الحصن', 'code' => 'DBH'],
                ['name_en' => 'Al Dhaid', 'name_ar' => 'الذيد', 'code' => 'DHD'],
                ['name_en' => 'Mileiha', 'name_ar' => 'مليحة', 'code' => 'MLH'],
            ],

            // UAE - Ajman - Full list (18+ cities)
            'Ajman' => [
                // Ajman City Areas
                ['name_en' => 'Ajman City', 'name_ar' => 'مدينة عجمان', 'code' => 'AJM'],
                ['name_en' => 'Al Nuaimiya', 'name_ar' => 'النعيمية', 'code' => 'NUM'],
                ['name_en' => 'Al Nuaimiya 1', 'name_ar' => 'النعيمية 1', 'code' => 'NM1'],
                ['name_en' => 'Al Nuaimiya 2', 'name_ar' => 'النعيمية 2', 'code' => 'NM2'],
                ['name_en' => 'Al Nuaimiya 3', 'name_ar' => 'النعيمية 3', 'code' => 'NM3'],
                ['name_en' => 'Al Rashidiya', 'name_ar' => 'الراشدية', 'code' => 'RSH'],
                ['name_en' => 'Al Rashidiya 1', 'name_ar' => 'الراشدية 1', 'code' => 'RS1'],
                ['name_en' => 'Al Rashidiya 2', 'name_ar' => 'الراشدية 2', 'code' => 'RS2'],
                ['name_en' => 'Al Jurf', 'name_ar' => 'الجرف', 'code' => 'JRF'],
                ['name_en' => 'Al Jurf 1', 'name_ar' => 'الجرف 1', 'code' => 'JR1'],
                ['name_en' => 'Al Jurf 2', 'name_ar' => 'الجرف 2', 'code' => 'JR2'],
                ['name_en' => 'Al Hamidiya', 'name_ar' => 'الحميدية', 'code' => 'HMD'],
                ['name_en' => 'Al Rawda', 'name_ar' => 'الروضة', 'code' => 'RWD'],
                ['name_en' => 'Al Yasmeen', 'name_ar' => 'الياسمين', 'code' => 'YSM'],
                ['name_en' => 'Al Bustan', 'name_ar' => 'البستان', 'code' => 'BST'],
                ['name_en' => 'Al Helio', 'name_ar' => 'الحليو', 'code' => 'HLO'],
                ['name_en' => 'Masfout', 'name_ar' => 'مصفوت', 'code' => 'MST'],
                ['name_en' => 'Manama', 'name_ar' => 'المنامة', 'code' => 'MNM'],
            ],

            // UAE - Umm Al Quwain - Full list (14+ cities)
            'Umm Al Quwain' => [
                // Umm Al Quwain City
                ['name_en' => 'Umm Al Quwain City', 'name_ar' => 'مدينة أم القيوين', 'code' => 'UAQ'],
                ['name_en' => 'Old Town', 'name_ar' => 'المدينة القديمة', 'code' => 'OTN'],
                ['name_en' => 'King Faisal Road', 'name_ar' => 'شارع الملك فيصل', 'code' => 'KFR'],
                ['name_en' => 'Emirates Modern Industrial', 'name_ar' => 'الإمارات الصناعية الحديثة', 'code' => 'EMI'],
                
                // Residential Areas
                ['name_en' => 'Falaj Al Mualla', 'name_ar' => 'فلج المعلا', 'code' => 'FLJ'],
                ['name_en' => 'Al Raas', 'name_ar' => 'الراس', 'code' => 'RAS'],
                ['name_en' => 'Al Salamah', 'name_ar' => 'السلامة', 'code' => 'SLM'],
                ['name_en' => 'Al Dar Al Baida', 'name_ar' => 'الدار البيضاء', 'code' => 'DRB'],
                ['name_en' => 'Al Labsa', 'name_ar' => 'اللبسة', 'code' => 'LBS'],
                ['name_en' => 'Al Ramlah', 'name_ar' => 'الرملة', 'code' => 'RML'],
                ['name_en' => 'Al Rashidiya', 'name_ar' => 'الراشدية', 'code' => 'RSH'],
                ['name_en' => 'Al Humrah', 'name_ar' => 'الحمرة', 'code' => 'HMR'],
                ['name_en' => 'Al Aahad', 'name_ar' => 'الأحد', 'code' => 'AHD'],
                ['name_en' => 'Dreamland Aqua Park', 'name_ar' => 'حديقة دريم لاند المائية', 'code' => 'DRM'],
            ],

            // UAE - Ras Al Khaimah - Full list (25+ cities)
            'Ras Al Khaimah' => [
                // Ras Al Khaimah City
                ['name_en' => 'Ras Al Khaimah City', 'name_ar' => 'مدينة رأس الخيمة', 'code' => 'RAK'],
                ['name_en' => 'Al Nakheel', 'name_ar' => 'النخيل', 'code' => 'NKH'],
                ['name_en' => 'Al Qusaidat', 'name_ar' => 'القصيدات', 'code' => 'QSD'],
                ['name_en' => 'Al Mamourah', 'name_ar' => 'المعمورة', 'code' => 'MMR'],
                ['name_en' => 'Al Uraibi', 'name_ar' => 'العريبي', 'code' => 'URB'],
                ['name_en' => 'Corniche Al Qawasim', 'name_ar' => 'كورنيش القواسم', 'code' => 'CQW'],
                
                // Coastal Areas
                ['name_en' => 'Al Hamra', 'name_ar' => 'الحمرا', 'code' => 'HMR'],
                ['name_en' => 'Al Hamra Village', 'name_ar' => 'قرية الحمرا', 'code' => 'HMV'],
                ['name_en' => 'Al Jazirah Al Hamra', 'name_ar' => 'الجزيرة الحمراء', 'code' => 'JZH'],
                ['name_en' => 'Mina Al Arab', 'name_ar' => 'ميناء العرب', 'code' => 'MNA'],
                ['name_en' => 'Al Marjan Island', 'name_ar' => 'جزيرة المرجان', 'code' => 'MRJ'],
                ['name_en' => 'Flamingo Villas', 'name_ar' => 'فلامنجو فيلاز', 'code' => 'FLM'],
                ['name_en' => 'Al Rams', 'name_ar' => 'الرمس', 'code' => 'RMS'],
                ['name_en' => 'Rams Village', 'name_ar' => 'قرية الرمس', 'code' => 'RMV'],
                
                // Interior Areas
                ['name_en' => 'Dafan Al Nakheel', 'name_ar' => 'دفن النخيل', 'code' => 'DFN'],
                ['name_en' => 'Digdaga', 'name_ar' => 'دقداقة', 'code' => 'DGD'],
                ['name_en' => 'Al Dhait', 'name_ar' => 'الذيت', 'code' => 'DHT'],
                ['name_en' => 'Al Dhait North', 'name_ar' => 'الذيت الشمالي', 'code' => 'DHN'],
                ['name_en' => 'Al Dhait South', 'name_ar' => 'الذيت الجنوبي', 'code' => 'DHS'],
                ['name_en' => 'Khatt', 'name_ar' => 'خت', 'code' => 'KHT'],
                ['name_en' => 'Shaam', 'name_ar' => 'شعم', 'code' => 'SHM'],
                ['name_en' => 'Al Hamraniyah', 'name_ar' => 'الحمرانية', 'code' => 'HMN'],
                ['name_en' => 'Al Ghubb', 'name_ar' => 'الغب', 'code' => 'GHB'],
                ['name_en' => 'Al Mairid', 'name_ar' => 'الميريد', 'code' => 'MRD'],
                ['name_en' => 'Wadi Shah', 'name_ar' => 'وادي شاه', 'code' => 'WSH'],
                ['name_en' => 'Khuzam', 'name_ar' => 'خزام', 'code' => 'KHZ'],
            ],

            // UAE - Fujairah - Full list (22+ cities)
            'Fujairah' => [
                // Fujairah City
                ['name_en' => 'Fujairah City', 'name_ar' => 'مدينة الفجيرة', 'code' => 'FUJ'],
                ['name_en' => 'Corniche Fujairah', 'name_ar' => 'كورنيش الفجيرة', 'code' => 'CFJ'],
                ['name_en' => 'Fujairah Fort', 'name_ar' => 'قلعة الفجيرة', 'code' => 'FJF'],
                ['name_en' => 'Fujairah Village', 'name_ar' => 'قرية الفجيرة', 'code' => 'FJV'],
                
                // Coastal Areas
                ['name_en' => 'Dibba Al-Fujairah', 'name_ar' => 'دبا الفجيرة', 'code' => 'DBF'],
                ['name_en' => 'Dibba Beach', 'name_ar' => 'شاطئ دبا', 'code' => 'DBB'],
                ['name_en' => 'Al Aqah', 'name_ar' => 'العقة', 'code' => 'AQH'],
                ['name_en' => 'Al Aqah Beach', 'name_ar' => 'شاطئ العقة', 'code' => 'AQB'],
                ['name_en' => 'Al Bidya', 'name_ar' => 'البدية', 'code' => 'BDY'],
                ['name_en' => 'Qidfa', 'name_ar' => 'قدفع', 'code' => 'QDF'],
                ['name_en' => 'Khor Fakkan', 'name_ar' => 'خور فكان', 'code' => 'KFK'],
                
                // Interior Areas
                ['name_en' => 'Masafi', 'name_ar' => 'مسافي', 'code' => 'MSF'],
                ['name_en' => 'Mirbah', 'name_ar' => 'مربح', 'code' => 'MRB'],
                ['name_en' => 'Sakamkam', 'name_ar' => 'سكمكم', 'code' => 'SKM'],
                ['name_en' => 'Al Gurfa', 'name_ar' => 'الغرفة', 'code' => 'GRF'],
                ['name_en' => 'Al Bithnah', 'name_ar' => 'البثنة', 'code' => 'BTH'],
                ['name_en' => 'Al Tawyeen', 'name_ar' => 'الطويين', 'code' => 'TWN'],
                ['name_en' => 'Wadi Ham', 'name_ar' => 'وادي حام', 'code' => 'WHM'],
                ['name_en' => 'Madhab', 'name_ar' => 'مذب', 'code' => 'MDH'],
                ['name_en' => 'Al Hayl', 'name_ar' => 'الحيل', 'code' => 'HYL'],
                ['name_en' => 'Dadna', 'name_ar' => 'دادنا', 'code' => 'DDN'],
                ['name_en' => 'Reef Mall Area', 'name_ar' => 'منطقة ريف مول', 'code' => 'RFM'],
            ],

            // Saudi Arabia - Riyadh - Full list (25+ cities)
            'Riyadh' => [
                // Riyadh City Areas
                ['name_en' => 'Riyadh', 'name_ar' => 'الرياض', 'code' => 'RYD'],
                ['name_en' => 'Al Olaya', 'name_ar' => 'العليا', 'code' => 'OLY'],
                ['name_en' => 'Al Malaz', 'name_ar' => 'الملز', 'code' => 'MLZ'],
                ['name_en' => 'Al Murabba', 'name_ar' => 'المربع', 'code' => 'MRB'],
                ['name_en' => 'Al Sulaymaniyah', 'name_ar' => 'السليمانية', 'code' => 'SLM'],
                ['name_en' => 'Al Andalus', 'name_ar' => 'الأندلس', 'code' => 'AND'],
                ['name_en' => 'Al Yarmouk', 'name_ar' => 'اليرموك', 'code' => 'YRM'],
                ['name_en' => 'Al Aziziyah', 'name_ar' => 'العزيزية', 'code' => 'AZZ'],
                ['name_en' => 'Al Naseem', 'name_ar' => 'النسيم', 'code' => 'NSM'],
                ['name_en' => 'Al Wurud', 'name_ar' => 'الورود', 'code' => 'WRD'],
                ['name_en' => 'Al Rawdah', 'name_ar' => 'الروضة', 'code' => 'RWD'],
                ['name_en' => 'Al Narjis', 'name_ar' => 'النرجس', 'code' => 'NRJ'],
                ['name_en' => 'Diplomatic Quarter', 'name_ar' => 'الحي الدبلوماسي', 'code' => 'DPQ'],
                ['name_en' => 'King Abdullah Financial District', 'name_ar' => 'مركز الملك عبدالله المالي', 'code' => 'KFD'],
                ['name_en' => 'King Fahd District', 'name_ar' => 'حي الملك فهد', 'code' => 'KFH'],
                ['name_en' => 'King Abdullah Park', 'name_ar' => 'حديقة الملك عبدالله', 'code' => 'KAP'],
                
                // Surrounding Cities
                ['name_en' => 'Al Diriyah', 'name_ar' => 'الدرعية', 'code' => 'DRY'],
                ['name_en' => 'Al Kharj', 'name_ar' => 'الخرج', 'code' => 'KHJ'],
                ['name_en' => 'Al Majma\'ah', 'name_ar' => 'المجمعة', 'code' => 'MJM'],
                ['name_en' => 'Al Dawadmi', 'name_ar' => 'الدوادمي', 'code' => 'DWD'],
                ['name_en' => 'Al Zulfi', 'name_ar' => 'الزلفي', 'code' => 'ZLF'],
                ['name_en' => 'Afif', 'name_ar' => 'عفيف', 'code' => 'AFF'],
                ['name_en' => 'Al Ghat', 'name_ar' => 'الغاط', 'code' => 'GHT'],
                ['name_en' => 'Shaqra', 'name_ar' => 'شقراء', 'code' => 'SHQ'],
                ['name_en' => 'Hotat Bani Tamim', 'name_ar' => 'حوطة بني تميم', 'code' => 'HBT'],
                ['name_en' => 'Al Hareeq', 'name_ar' => 'الحريق', 'code' => 'HRQ'],
                ['name_en' => 'Dhurma', 'name_ar' => 'ضرما', 'code' => 'DRM'],
                ['name_en' => 'Rumah', 'name_ar' => 'رماح', 'code' => 'RMH'],
            ],

            // Saudi Arabia - Makkah - Full list (25+ cities)
            'Makkah' => [
                // Makkah City
                ['name_en' => 'Makkah', 'name_ar' => 'مكة المكرمة', 'code' => 'MKA'],
                ['name_en' => 'Al Haram', 'name_ar' => 'الحرم', 'code' => 'HRM'],
                ['name_en' => 'Al Aziziyah', 'name_ar' => 'العزيزية', 'code' => 'AZZ'],
                ['name_en' => 'Mina', 'name_ar' => 'منى', 'code' => 'MNA'],
                ['name_en' => 'Arafat', 'name_ar' => 'عرفات', 'code' => 'ARF'],
                ['name_en' => 'Muzdalifah', 'name_ar' => 'مزدلفة', 'code' => 'MZD'],
                
                // Jeddah City
                ['name_en' => 'Jeddah', 'name_ar' => 'جدة', 'code' => 'JED'],
                ['name_en' => 'Al Balad', 'name_ar' => 'البلد', 'code' => 'BLD'],
                ['name_en' => 'Al Hamra', 'name_ar' => 'الحمراء', 'code' => 'HMR'],
                ['name_en' => 'Al Salamah', 'name_ar' => 'السلامة', 'code' => 'SLM'],
                ['name_en' => 'Al Rawdah', 'name_ar' => 'الروضة', 'code' => 'RWD'],
                ['name_en' => 'Al Zahra', 'name_ar' => 'الزهراء', 'code' => 'ZHR'],
                ['name_en' => 'Obhur', 'name_ar' => 'أبحر', 'code' => 'OBH'],
                ['name_en' => 'King Abdullah Economic City', 'name_ar' => 'مدينة الملك عبدالله الاقتصادية', 'code' => 'KEC'],
                
                // Taif City
                ['name_en' => 'Taif', 'name_ar' => 'الطائف', 'code' => 'TAF'],
                ['name_en' => 'Al Hada', 'name_ar' => 'الهدا', 'code' => 'HDA'],
                ['name_en' => 'Al Shafa', 'name_ar' => 'الشفا', 'code' => 'SHF'],
                
                // Other Cities
                ['name_en' => 'Rabigh', 'name_ar' => 'رابغ', 'code' => 'RBG'],
                ['name_en' => 'Khulais', 'name_ar' => 'خليص', 'code' => 'KHL'],
                ['name_en' => 'Al Jumum', 'name_ar' => 'الجموم', 'code' => 'JMM'],
                ['name_en' => 'Al Lith', 'name_ar' => 'الليث', 'code' => 'LTH'],
                ['name_en' => 'Al Qunfudhah', 'name_ar' => 'القنفذة', 'code' => 'QNF'],
                ['name_en' => 'Thuwal', 'name_ar' => 'ثول', 'code' => 'THW'],
                ['name_en' => 'Bahra', 'name_ar' => 'بحرة', 'code' => 'BHR'],
                ['name_en' => 'Ranyah', 'name_ar' => 'رنية', 'code' => 'RNY'],
                ['name_en' => 'Turubah', 'name_ar' => 'تربة', 'code' => 'TRB'],
                ['name_en' => 'Al Kamil', 'name_ar' => 'الكامل', 'code' => 'KML'],
                ['name_en' => 'Khurma', 'name_ar' => 'الخرمة', 'code' => 'KHM'],
                ['name_en' => 'Adham', 'name_ar' => 'أضم', 'code' => 'ADH'],
            ],

            // Saudi Arabia - Madinah - Full list (15 cities)
            'Madinah' => [
                ['name_en' => 'Madinah', 'name_ar' => 'المدينة المنورة', 'code' => 'MED'],
                ['name_en' => 'Al Masjid an Nabawi', 'name_ar' => 'المسجد النبوي', 'code' => 'MSN'],
                ['name_en' => 'Quba', 'name_ar' => 'قباء', 'code' => 'QBA'],
                ['name_en' => 'Al Awali', 'name_ar' => 'العوالي', 'code' => 'AWL'],
                ['name_en' => 'Yanbu', 'name_ar' => 'ينبع', 'code' => 'YNB'],
                ['name_en' => 'Yanbu Al Bahr', 'name_ar' => 'ينبع البحر', 'code' => 'YNB'],
                ['name_en' => 'Yanbu Al Nakhal', 'name_ar' => 'ينبع النخل', 'code' => 'YNN'],
                ['name_en' => 'Al Ula', 'name_ar' => 'العلا', 'code' => 'ULA'],
                ['name_en' => 'Badr', 'name_ar' => 'بدر', 'code' => 'BDR'],
                ['name_en' => 'Khaybar', 'name_ar' => 'خيبر', 'code' => 'KBR'],
                ['name_en' => 'Mahad Al Dahab', 'name_ar' => 'مهد الذهب', 'code' => 'MHD'],
                ['name_en' => 'Al Hanakiyah', 'name_ar' => 'الحناكية', 'code' => 'HNK'],
                ['name_en' => 'Wadi Al Fara', 'name_ar' => 'وادي الفرع', 'code' => 'WAF'],
                ['name_en' => 'Al Suwarqiyah', 'name_ar' => 'السويرقية', 'code' => 'SWR'],
                ['name_en' => 'Al Ais', 'name_ar' => 'العيص', 'code' => 'AIS'],
            ],

            // Saudi Arabia - Eastern Province - Full list (20+ cities)
            'Eastern Province' => [
                // Dammam Metropolitan
                ['name_en' => 'Dammam', 'name_ar' => 'الدمام', 'code' => 'DMM'],
                ['name_en' => 'Dhahran', 'name_ar' => 'الظهران', 'code' => 'DHR'],
                ['name_en' => 'Al Khobar', 'name_ar' => 'الخبر', 'code' => 'KHB'],
                ['name_en' => 'Corniche Al Khobar', 'name_ar' => 'كورنيش الخبر', 'code' => 'CKH'],
                ['name_en' => 'Half Moon Bay', 'name_ar' => 'خليج نصف القمر', 'code' => 'HMB'],
                
                // Jubail
                ['name_en' => 'Jubail', 'name_ar' => 'الجبيل', 'code' => 'JBL'],
                ['name_en' => 'Jubail Industrial City', 'name_ar' => 'الجبيل الصناعية', 'code' => 'JIC'],
                
                // Al Ahsa
                ['name_en' => 'Al Hofuf', 'name_ar' => 'الهفوف', 'code' => 'HFF'],
                ['name_en' => 'Al Mubarraz', 'name_ar' => 'المبرز', 'code' => 'MBR'],
                ['name_en' => 'Al Oyoun', 'name_ar' => 'العيون', 'code' => 'OYN'],
                ['name_en' => 'Al Jafr', 'name_ar' => 'الجفر', 'code' => 'JFR'],
                
                // Qatif
                ['name_en' => 'Qatif', 'name_ar' => 'القطيف', 'code' => 'QTF'],
                ['name_en' => 'Safwa', 'name_ar' => 'صفوى', 'code' => 'SFW'],
                ['name_en' => 'Saihat', 'name_ar' => 'سيهات', 'code' => 'SHT'],
                ['name_en' => 'Tarout', 'name_ar' => 'تاروت', 'code' => 'TRT'],
                ['name_en' => 'Anak', 'name_ar' => 'عنك', 'code' => 'ANK'],
                
                // Other Cities
                ['name_en' => 'Ras Tanura', 'name_ar' => 'رأس تنورة', 'code' => 'RTN'],
                ['name_en' => 'Khafji', 'name_ar' => 'الخفجي', 'code' => 'KFJ'],
                ['name_en' => 'Abqaiq', 'name_ar' => 'بقيق', 'code' => 'ABQ'],
                ['name_en' => 'Nairyah', 'name_ar' => 'النعيرية', 'code' => 'NRY'],
                ['name_en' => 'Rahima', 'name_ar' => 'رحيمة', 'code' => 'RHM'],
                ['name_en' => 'Udhailiyah', 'name_ar' => 'عذيلية', 'code' => 'UDH'],
            ],

            // Saudi Arabia - Asir - Full list (18+ cities)
            'Asir' => [
                // Abha
                ['name_en' => 'Abha', 'name_ar' => 'أبها', 'code' => 'ABH'],
                ['name_en' => 'Al Manhal', 'name_ar' => 'المنهل', 'code' => 'MNH'],
                ['name_en' => 'Al Soudah', 'name_ar' => 'السودة', 'code' => 'SDA'],
                ['name_en' => 'Hada Asir', 'name_ar' => 'حدا عسير', 'code' => 'HDA'],
                
                // Khamis Mushait
                ['name_en' => 'Khamis Mushait', 'name_ar' => 'خميس مشيط', 'code' => 'KMS'],
                ['name_en' => 'King Khalid Air Base', 'name_ar' => 'قاعدة الملك خالد الجوية', 'code' => 'KKB'],
                
                // Bisha
                ['name_en' => 'Bisha', 'name_ar' => 'بيشة', 'code' => 'BIS'],
                ['name_en' => 'Ballasmar', 'name_ar' => 'بللسمر', 'code' => 'BLS'],
                ['name_en' => 'Ballahmar', 'name_ar' => 'بللحمر', 'code' => 'BLH'],
                
                // Mahayil
                ['name_en' => 'Muhayil', 'name_ar' => 'محايل', 'code' => 'MHL'],
                ['name_en' => 'Rijal Almaa', 'name_ar' => 'رجال ألمع', 'code' => 'RJL'],
                ['name_en' => 'Bariq', 'name_ar' => 'بارق', 'code' => 'BRQ'],
                
                // Other Cities
                ['name_en' => 'Al Namas', 'name_ar' => 'النماص', 'code' => 'NMS'],
                ['name_en' => 'Sarat Ubaida', 'name_ar' => 'سراة عبيدة', 'code' => 'SRU'],
                ['name_en' => 'Tanomah', 'name_ar' => 'تنومة', 'code' => 'TNM'],
                ['name_en' => 'Ahad Rafidah', 'name_ar' => 'أحد رفيدة', 'code' => 'ARF'],
                ['name_en' => 'Tathlith', 'name_ar' => 'تثليث', 'code' => 'TTH'],
                ['name_en' => 'Al Majardah', 'name_ar' => 'المجاردة', 'code' => 'MJR'],
            ],

            // Saudi Arabia - Tabuk - Full list (13+ cities)
            'Tabuk' => [
                // Tabuk City
                ['name_en' => 'Tabuk', 'name_ar' => 'تبوك', 'code' => 'TUU'],
                ['name_en' => 'King Faisal Air Base', 'name_ar' => 'قاعدة الملك فيصل الجوية', 'code' => 'KFB'],
                
                // Coastal Cities
                ['name_en' => 'Duba', 'name_ar' => 'ضباء', 'code' => 'DBA'],
                ['name_en' => 'Al Wajh', 'name_ar' => 'الوجه', 'code' => 'WJH'],
                ['name_en' => 'Haql', 'name_ar' => 'حقل', 'code' => 'HQL'],
                ['name_en' => 'Umluj', 'name_ar' => 'أملج', 'code' => 'UML'],
                
                // NEOM Project
                ['name_en' => 'Neom', 'name_ar' => 'نيوم', 'code' => 'NOM'],
                ['name_en' => 'Sharma', 'name_ar' => 'شرما', 'code' => 'SHM'],
                
                // Interior Cities
                ['name_en' => 'Tayma', 'name_ar' => 'تيماء', 'code' => 'TYM'],
                ['name_en' => 'Al Bidaa', 'name_ar' => 'البدع', 'code' => 'BDA'],
                ['name_en' => 'Dhuba', 'name_ar' => 'ضبا', 'code' => 'DBH'],
                ['name_en' => 'Al Khuraybah', 'name_ar' => 'الخريبة', 'code' => 'KHR'],
                ['name_en' => 'Maqna', 'name_ar' => 'مقنا', 'code' => 'MQN'],
            ],

            // Saudi Arabia - Qassim - Full list (14+ cities)
            'Qassim' => [
                // Buraidah
                ['name_en' => 'Buraidah', 'name_ar' => 'بريدة', 'code' => 'BRD'],
                ['name_en' => 'Al Nakheel', 'name_ar' => 'النخيل', 'code' => 'NKH'],
                ['name_en' => 'Al Safra', 'name_ar' => 'الصفراء', 'code' => 'SFR'],
                
                // Unaizah
                ['name_en' => 'Unaizah', 'name_ar' => 'عنيزة', 'code' => 'UNZ'],
                ['name_en' => 'Al Bassam', 'name_ar' => 'البسام', 'code' => 'BSM'],
                
                // Other Cities
                ['name_en' => 'Al Rass', 'name_ar' => 'الرس', 'code' => 'RAS'],
                ['name_en' => 'Al Bukairiyah', 'name_ar' => 'البكيرية', 'code' => 'BKR'],
                ['name_en' => 'Al Mithnab', 'name_ar' => 'المذنب', 'code' => 'MTH'],
                ['name_en' => 'Al Badaya', 'name_ar' => 'البدائع', 'code' => 'BDY'],
                ['name_en' => 'Riyadh Al Khabra', 'name_ar' => 'رياض الخبراء', 'code' => 'RKH'],
                ['name_en' => 'Al Asyah', 'name_ar' => 'عيون الجواء', 'code' => 'ASY'],
                ['name_en' => 'Al Nabhaniya', 'name_ar' => 'النبهانية', 'code' => 'NBH'],
                ['name_en' => 'Dhuriyah', 'name_ar' => 'ضرية', 'code' => 'DHR'],
                ['name_en' => 'Al Shimasiya', 'name_ar' => 'الشماسية', 'code' => 'SHM'],
            ],

            // Saudi Arabia - Hail - Full list (12+ cities)
            'Hail' => [
                // Hail City
                ['name_en' => 'Hail', 'name_ar' => 'حائل', 'code' => 'HAS'],
                ['name_en' => 'Al Suwayfilah', 'name_ar' => 'السويفلة', 'code' => 'SWF'],
                ['name_en' => 'Sadir', 'name_ar' => 'سدير', 'code' => 'SDR'],
                
                // Other Cities
                ['name_en' => 'Baqaa', 'name_ar' => 'بقعاء', 'code' => 'BQA'],
                ['name_en' => 'Al Ghazalah', 'name_ar' => 'الغزالة', 'code' => 'GHZ'],
                ['name_en' => 'Ash Shinan', 'name_ar' => 'الشنان', 'code' => 'SHN'],
                ['name_en' => 'Al Sulaimi', 'name_ar' => 'السليمي', 'code' => 'SLM'],
                ['name_en' => 'Samira', 'name_ar' => 'سميراء', 'code' => 'SMR'],
                ['name_en' => 'Mawqaq', 'name_ar' => 'موقق', 'code' => 'MWQ'],
                ['name_en' => 'Al Kahfah', 'name_ar' => 'الكهفة', 'code' => 'KHF'],
                ['name_en' => 'Al Shamli', 'name_ar' => 'الشملي', 'code' => 'SML'],
                ['name_en' => 'Jubbah', 'name_ar' => 'جبة', 'code' => 'JBH'],
            ],

            // Saudi Arabia - Northern Borders - Full list (10+ cities)
            'Northern Borders' => [
                // Arar
                ['name_en' => 'Arar', 'name_ar' => 'عرعر', 'code' => 'RAE'],
                ['name_en' => 'Al Muthallath', 'name_ar' => 'المثلث', 'code' => 'MTL'],
                ['name_en' => 'Al Nakhib', 'name_ar' => 'النخيب', 'code' => 'NKB'],
                
                // Other Cities
                ['name_en' => 'Rafha', 'name_ar' => 'رفحاء', 'code' => 'RAH'],
                ['name_en' => 'Turaif', 'name_ar' => 'طريف', 'code' => 'TUI'],
                ['name_en' => 'Al Uwayqilah', 'name_ar' => 'العويقيلة', 'code' => 'UWQ'],
                ['name_en' => 'Hazm Al Jalamid', 'name_ar' => 'حزم الجلاميد', 'code' => 'HZM'],
                ['name_en' => 'Linah', 'name_ar' => 'لينة', 'code' => 'LNH'],
                ['name_en' => 'Shuwayqiyah', 'name_ar' => 'الشويقية', 'code' => 'SWQ'],
                ['name_en' => 'Al Isawiyah', 'name_ar' => 'العيساوية', 'code' => 'ISW'],
            ],

            // Saudi Arabia - Jazan - Full list (15+ cities)
            'Jazan' => [
                // Jazan City
                ['name_en' => 'Jazan', 'name_ar' => 'جازان', 'code' => 'GIZ'],
                ['name_en' => 'Al Shati', 'name_ar' => 'الشاطئ', 'code' => 'SHT'],
                ['name_en' => 'Al Corniche', 'name_ar' => 'الكورنيش', 'code' => 'CRN'],
                
                // Major Cities
                ['name_en' => 'Sabya', 'name_ar' => 'صبيا', 'code' => 'SBY'],
                ['name_en' => 'Abu Arish', 'name_ar' => 'أبو عريش', 'code' => 'ABA'],
                ['name_en' => 'Samtah', 'name_ar' => 'صامطة', 'code' => 'SMT'],
                ['name_en' => 'Al Ardah', 'name_ar' => 'العارضة', 'code' => 'ARD'],
                ['name_en' => 'Dhamad', 'name_ar' => 'الضمد', 'code' => 'DHM'],
                
                // Coastal & Islands
                ['name_en' => 'Farasan', 'name_ar' => 'فرسان', 'code' => 'FRS'],
                ['name_en' => 'Al Harth', 'name_ar' => 'الحرث', 'code' => 'HRT'],
                ['name_en' => 'Al Tuwal', 'name_ar' => 'الطوال', 'code' => 'TWL'],
                ['name_en' => 'Ahad Al Masarihah', 'name_ar' => 'أحد المسارحة', 'code' => 'AMS'],
                ['name_en' => 'Baish', 'name_ar' => 'بيش', 'code' => 'BSH'],
                ['name_en' => 'Al Darb', 'name_ar' => 'الدرب', 'code' => 'DRB'],
                ['name_en' => 'Fayfa', 'name_ar' => 'فيفا', 'code' => 'FYF'],
            ],

            // Saudi Arabia - Najran - Full list (12+ cities)
            'Najran' => [
                // Najran City
                ['name_en' => 'Najran', 'name_ar' => 'نجران', 'code' => 'EAM'],
                ['name_en' => 'Al Faisaliah', 'name_ar' => 'الفيصلية', 'code' => 'FSL'],
                ['name_en' => 'Ash Sharfah', 'name_ar' => 'الشرفة', 'code' => 'SRF'],
                
                // Major Cities
                ['name_en' => 'Sharourah', 'name_ar' => 'شرورة', 'code' => 'SHR'],
                ['name_en' => 'Habuna', 'name_ar' => 'حبونا', 'code' => 'HBN'],
                ['name_en' => 'Badr Al Janoub', 'name_ar' => 'بدر الجنوب', 'code' => 'BDJ'],
                ['name_en' => 'Yadamah', 'name_ar' => 'يدمة', 'code' => 'YDM'],
                ['name_en' => 'Thar', 'name_ar' => 'ثار', 'code' => 'THR'],
                ['name_en' => 'Khubash', 'name_ar' => 'خباش', 'code' => 'KHB'],
                ['name_en' => 'Al Kharkhir', 'name_ar' => 'الخرخير', 'code' => 'KRK'],
                ['name_en' => 'Hubuna', 'name_ar' => 'حبونا', 'code' => 'HBU'],
                ['name_en' => 'Al Ukhdood', 'name_ar' => 'الأخدود', 'code' => 'UKD'],
            ],

            // Saudi Arabia - Al Bahah - Full list (12+ cities)
            'Al Bahah' => [
                // Al Bahah City
                ['name_en' => 'Al Bahah', 'name_ar' => 'الباحة', 'code' => 'ABT'],
                ['name_en' => 'Raghadan Forest', 'name_ar' => 'غابة رغدان', 'code' => 'RGD'],
                ['name_en' => 'Al Shuqaiq', 'name_ar' => 'الشقيق', 'code' => 'SQQ'],
                
                // Other Cities
                ['name_en' => 'Baljurashi', 'name_ar' => 'بلجرشي', 'code' => 'BJR'],
                ['name_en' => 'Al Mandaq', 'name_ar' => 'المندق', 'code' => 'MND'],
                ['name_en' => 'Al Mikhwah', 'name_ar' => 'المخواة', 'code' => 'MKH'],
                ['name_en' => 'Al Qara', 'name_ar' => 'القرى', 'code' => 'QRA'],
                ['name_en' => 'Al Aqiq', 'name_ar' => 'العقيق', 'code' => 'AQQ'],
                ['name_en' => 'Qilwah', 'name_ar' => 'قلوة', 'code' => 'QLW'],
                ['name_en' => 'Al Hajrah', 'name_ar' => 'الحجرة', 'code' => 'HJR'],
                ['name_en' => 'Ghamed Al Zinad', 'name_ar' => 'غامد الزناد', 'code' => 'GMD'],
                ['name_en' => 'Bani Hassan', 'name_ar' => 'بني حسن', 'code' => 'BHS'],
            ],

            // Saudi Arabia - Al Jawf - Full list (11+ cities)
            'Al Jawf' => [
                // Sakaka
                ['name_en' => 'Sakaka', 'name_ar' => 'سكاكا', 'code' => 'AJF'],
                ['name_en' => 'Al Iskan', 'name_ar' => 'الإسكان', 'code' => 'ISK'],
                ['name_en' => 'Al Zaytoonah', 'name_ar' => 'الزيتونة', 'code' => 'ZYT'],
                
                // Historic Cities
                ['name_en' => 'Dumat Al Jandal', 'name_ar' => 'دومة الجندل', 'code' => 'DJD'],
                ['name_en' => 'Qurayyat', 'name_ar' => 'القريات', 'code' => 'URY'],
                ['name_en' => 'Tabarjal', 'name_ar' => 'طبرجل', 'code' => 'TBJ'],
                
                // Other Cities
                ['name_en' => 'Al Hazm', 'name_ar' => 'الحزم', 'code' => 'HZM'],
                ['name_en' => 'Ithra', 'name_ar' => 'إثرة', 'code' => 'ITH'],
                ['name_en' => 'Zallum', 'name_ar' => 'زلوم', 'code' => 'ZLM'],
                ['name_en' => 'Al Shwihayah', 'name_ar' => 'الشويحية', 'code' => 'SWH'],
                ['name_en' => 'Kaf', 'name_ar' => 'كاف', 'code' => 'KAF'],
            ],
        ];

        foreach ($cities as $governorateName => $governorateCities) {
            if (isset($governorates[$governorateName])) {
                $governorateId = $governorates[$governorateName];
                
                foreach ($governorateCities as $city) {
                    DB::table('cities')->insert([
                        'governorate_id' => $governorateId,
                        'name_en' => $city['name_en'],
                        'name_ar' => $city['name_ar'],
                        'code' => $city['code'],
                        'is_active' => true,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }
        }
    }
}

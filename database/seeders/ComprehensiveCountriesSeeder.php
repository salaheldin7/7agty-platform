<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ComprehensiveCountriesSeeder extends Seeder
{
    /**
     * Helper method to generate a code from name
     */
    private function generateCode($name)
    {
        // Remove spaces and special characters, take first 3-5 letters
        $code = preg_replace('/[^A-Za-z0-9]/', '', $name);
        return strtoupper(substr($code, 0, 5));
    }

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Disable foreign key checks temporarily
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        
        // Clear existing data
        DB::table('cities')->truncate();
        DB::table('governorates')->truncate();
        DB::table('countries')->truncate();
        
        // Re-enable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $this->seedMiddleEastCountries();
        $this->seedUSA();
        $this->seedOtherCountries();
    }

    private function seedMiddleEastCountries()
    {
        // UAE - United Arab Emirates
        $uaeId = DB::table('countries')->insertGetId([
            'name_en' => 'United Arab Emirates',
            'name_ar' => 'الإمارات العربية المتحدة',
            'code' => 'AE',
            'phone_code' => '+971',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->seedUAE($uaeId);

        // Saudi Arabia
        $saudiId = DB::table('countries')->insertGetId([
            'name_en' => 'Saudi Arabia',
            'name_ar' => 'المملكة العربية السعودية',
            'code' => 'SA',
            'phone_code' => '+966',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->seedSaudiArabia($saudiId);

        // Egypt
        $egyptId = DB::table('countries')->insertGetId([
            'name_en' => 'Egypt',
            'name_ar' => 'مصر',
            'code' => 'EG',
            'phone_code' => '+20',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->seedEgypt($egyptId);

        // Kuwait
        $kuwaitId = DB::table('countries')->insertGetId([
            'name_en' => 'Kuwait',
            'name_ar' => 'الكويت',
            'code' => 'KW',
            'phone_code' => '+965',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->seedKuwait($kuwaitId);

        // Bahrain
        $bahrainId = DB::table('countries')->insertGetId([
            'name_en' => 'Bahrain',
            'name_ar' => 'البحرين',
            'code' => 'BH',
            'phone_code' => '+973',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->seedBahrain($bahrainId);

        // Qatar
        $qatarId = DB::table('countries')->insertGetId([
            'name_en' => 'Qatar',
            'name_ar' => 'قطر',
            'code' => 'QA',
            'phone_code' => '+974',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->seedQatar($qatarId);

        // Oman
        $omanId = DB::table('countries')->insertGetId([
            'name_en' => 'Oman',
            'name_ar' => 'عمان',
            'code' => 'OM',
            'phone_code' => '+968',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->seedOman($omanId);

        // Jordan
        $jordanId = DB::table('countries')->insertGetId([
            'name_en' => 'Jordan',
            'name_ar' => 'الأردن',
            'code' => 'JO',
            'phone_code' => '+962',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->seedJordan($jordanId);

        // Lebanon
        $lebanonId = DB::table('countries')->insertGetId([
            'name_en' => 'Lebanon',
            'name_ar' => 'لبنان',
            'code' => 'LB',
            'phone_code' => '+961',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->seedLebanon($lebanonId);

        // Iraq
        $iraqId = DB::table('countries')->insertGetId([
            'name_en' => 'Iraq',
            'name_ar' => 'العراق',
            'code' => 'IQ',
            'phone_code' => '+964',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->seedIraq($iraqId);

        // Syria
        $syriaId = DB::table('countries')->insertGetId([
            'name_en' => 'Syria',
            'name_ar' => 'سوريا',
            'code' => 'SY',
            'phone_code' => '+963',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->seedSyria($syriaId);

        // Palestine
        $palestineId = DB::table('countries')->insertGetId([
            'name_en' => 'Palestine',
            'name_ar' => 'فلسطين',
            'code' => 'PS',
            'phone_code' => '+970',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->seedPalestine($palestineId);

        // Yemen
        $yemenId = DB::table('countries')->insertGetId([
            'name_en' => 'Yemen',
            'name_ar' => 'اليمن',
            'code' => 'YE',
            'phone_code' => '+967',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->seedYemen($yemenId);
    }

    private function seedUAE($countryId)
    {
        $emirates = [
            [
                'name_en' => 'Abu Dhabi',
                'name_ar' => 'أبو ظبي',
                'cities' => [
                    ['name_en' => 'Abu Dhabi City', 'name_ar' => 'مدينة أبو ظبي'],
                    ['name_en' => 'Al Ain', 'name_ar' => 'العين'],
                    ['name_en' => 'Zayed City', 'name_ar' => 'مدينة زايد'],
                    ['name_en' => 'Ruwais', 'name_ar' => 'الرويس'],
                    ['name_en' => 'Liwa Oasis', 'name_ar' => 'واحة ليوا'],
                    ['name_en' => 'Madinat Zayed', 'name_ar' => 'مدينة زايد'],
                    ['name_en' => 'Ghayathi', 'name_ar' => 'غياثي'],
                    ['name_en' => 'Bani Yas', 'name_ar' => 'بني ياس'],
                    ['name_en' => 'Al Shamkhah', 'name_ar' => 'الشامخة'],
                    ['name_en' => 'Khalifa City', 'name_ar' => 'مدينة خليفة'],
                    ['name_en' => 'Mohamed Bin Zayed City', 'name_ar' => 'مدينة محمد بن زايد'],
                    ['name_en' => 'Yas Island', 'name_ar' => 'جزيرة ياس'],
                    ['name_en' => 'Saadiyat Island', 'name_ar' => 'جزيرة السعديات'],
                    ['name_en' => 'Al Raha Beach', 'name_ar' => 'شاطئ الراحة'],
                    ['name_en' => 'Al Reef', 'name_ar' => 'الريف'],
                    ['name_en' => 'Al Bahia', 'name_ar' => 'الباهية'],
                    ['name_en' => 'Al Falah', 'name_ar' => 'الفلاح'],
                    ['name_en' => 'Al Mushrif', 'name_ar' => 'المشرف'],
                    ['name_en' => 'Al Nahyan', 'name_ar' => 'النهيان'],
                    ['name_en' => 'Al Bateen', 'name_ar' => 'الباطن'],
                ]
            ],
            [
                'name_en' => 'Dubai',
                'name_ar' => 'دبي',
                'cities' => [
                    ['name_en' => 'Dubai City', 'name_ar' => 'مدينة دبي'],
                    ['name_en' => 'Deira', 'name_ar' => 'ديرة'],
                    ['name_en' => 'Bur Dubai', 'name_ar' => 'بر دبي'],
                    ['name_en' => 'Jumeirah', 'name_ar' => 'جميرا'],
                    ['name_en' => 'Al Barsha', 'name_ar' => 'البرشاء'],
                    ['name_en' => 'Dubai Marina', 'name_ar' => 'مرسى دبي'],
                    ['name_en' => 'Downtown Dubai', 'name_ar' => 'وسط مدينة دبي'],
                    ['name_en' => 'Business Bay', 'name_ar' => 'الخليج التجاري'],
                    ['name_en' => 'Dubai Hills', 'name_ar' => 'دبي هيلز'],
                    ['name_en' => 'Arabian Ranches', 'name_ar' => 'المرابع العربية'],
                    ['name_en' => 'Dubai Silicon Oasis', 'name_ar' => 'واحة دبي للسيليكون'],
                    ['name_en' => 'International City', 'name_ar' => 'المدينة العالمية'],
                    ['name_en' => 'Dubai Sports City', 'name_ar' => 'مدينة دبي الرياضية'],
                    ['name_en' => 'Motor City', 'name_ar' => 'مدينة دبي للسيارات'],
                    ['name_en' => 'Jebel Ali', 'name_ar' => 'جبل علي'],
                    ['name_en' => 'Discovery Gardens', 'name_ar' => 'حدائق الاكتشاف'],
                    ['name_en' => 'Dubai Investment Park', 'name_ar' => 'دبي للاستثمار'],
                    ['name_en' => 'Mirdif', 'name_ar' => 'مردف'],
                    ['name_en' => 'Al Nahda', 'name_ar' => 'النهدة'],
                    ['name_en' => 'Al Karama', 'name_ar' => 'الكرامة'],
                    ['name_en' => 'Al Qusais', 'name_ar' => 'القصيص'],
                    ['name_en' => 'Al Warqa', 'name_ar' => 'الورقاء'],
                    ['name_en' => 'Al Rashidiya', 'name_ar' => 'الرشيدية'],
                    ['name_en' => 'Al Mizhar', 'name_ar' => 'المزهر'],
                    ['name_en' => 'Al Khawaneej', 'name_ar' => 'الخوانيج'],
                    ['name_en' => 'Palm Jumeirah', 'name_ar' => 'نخلة جميرا'],
                    ['name_en' => 'JBR', 'name_ar' => 'جميرا بيتش ريزيدنس'],
                    ['name_en' => 'JLT', 'name_ar' => 'أبراج بحيرات جميرا'],
                    ['name_en' => 'DIFC', 'name_ar' => 'مركز دبي المالي العالمي'],
                    ['name_en' => 'Dubai Creek Harbour', 'name_ar' => 'ميناء خور دبي'],
                ]
            ],
            [
                'name_en' => 'Sharjah',
                'name_ar' => 'الشارقة',
                'cities' => [
                    ['name_en' => 'Sharjah City', 'name_ar' => 'مدينة الشارقة'],
                    ['name_en' => 'Kalba', 'name_ar' => 'كلباء'],
                    ['name_en' => 'Khorfakkan', 'name_ar' => 'خورفكان'],
                    ['name_en' => 'Dibba Al-Hisn', 'name_ar' => 'دبا الحصن'],
                    ['name_en' => 'Al Dhaid', 'name_ar' => 'الذيد'],
                    ['name_en' => 'Mleiha', 'name_ar' => 'مليحة'],
                    ['name_en' => 'Al Hamriyah', 'name_ar' => 'الحمرية'],
                    ['name_en' => 'Al Madam', 'name_ar' => 'المدام'],
                    ['name_en' => 'Al Qasimia', 'name_ar' => 'القاسمية'],
                    ['name_en' => 'Al Majaz', 'name_ar' => 'المجاز'],
                    ['name_en' => 'Al Nahda', 'name_ar' => 'النهدة'],
                    ['name_en' => 'Al Khan', 'name_ar' => 'الخان'],
                    ['name_en' => 'Al Ghubaiba', 'name_ar' => 'الغبيبة'],
                    ['name_en' => 'Al Taawun', 'name_ar' => 'التعاون'],
                    ['name_en' => 'University City', 'name_ar' => 'المدينة الجامعية'],
                ]
            ],
            [
                'name_en' => 'Ajman',
                'name_ar' => 'عجمان',
                'cities' => [
                    ['name_en' => 'Ajman City', 'name_ar' => 'مدينة عجمان'],
                    ['name_en' => 'Masfout', 'name_ar' => 'مصفوت'],
                    ['name_en' => 'Manama', 'name_ar' => 'المنامة'],
                    ['name_en' => 'Al Nuaimiya', 'name_ar' => 'النعيمية'],
                    ['name_en' => 'Al Rashidiya', 'name_ar' => 'الراشدية'],
                    ['name_en' => 'Al Jurf', 'name_ar' => 'الجرف'],
                    ['name_en' => 'Al Hamidiyah', 'name_ar' => 'الحميدية'],
                    ['name_en' => 'Al Rawda', 'name_ar' => 'الروضة'],
                    ['name_en' => 'Al Rumaila', 'name_ar' => 'الرميلة'],
                    ['name_en' => 'Al Mowaihat', 'name_ar' => 'المويهات'],
                ]
            ],
            [
                'name_en' => 'Umm Al Quwain',
                'name_ar' => 'أم القيوين',
                'cities' => [
                    ['name_en' => 'Umm Al Quwain City', 'name_ar' => 'مدينة أم القيوين'],
                    ['name_en' => 'Falaj Al Mualla', 'name_ar' => 'فلج المعلا'],
                    ['name_en' => 'Al Salamah', 'name_ar' => 'السلامة'],
                    ['name_en' => 'Al Raas', 'name_ar' => 'الراس'],
                    ['name_en' => 'Al Dar Al Baida', 'name_ar' => 'الدار البيضاء'],
                    ['name_en' => 'Al Raudah', 'name_ar' => 'الروضة'],
                ]
            ],
            [
                'name_en' => 'Ras Al Khaimah',
                'name_ar' => 'رأس الخيمة',
                'cities' => [
                    ['name_en' => 'Ras Al Khaimah City', 'name_ar' => 'مدينة رأس الخيمة'],
                    ['name_en' => 'Digdaga', 'name_ar' => 'دقداقة'],
                    ['name_en' => 'Al Jazirah Al Hamra', 'name_ar' => 'الجزيرة الحمراء'],
                    ['name_en' => 'Al Rams', 'name_ar' => 'الرمس'],
                    ['name_en' => 'Al Hamra Village', 'name_ar' => 'قرية الحمراء'],
                    ['name_en' => 'Khuzam', 'name_ar' => 'خزام'],
                    ['name_en' => 'Khatt', 'name_ar' => 'الخط'],
                    ['name_en' => 'Shaam', 'name_ar' => 'شعم'],
                    ['name_en' => 'Al Qurm', 'name_ar' => 'القرم'],
                    ['name_en' => 'Al Dhait', 'name_ar' => 'الذيت'],
                    ['name_en' => 'Al Jeer', 'name_ar' => 'الجير'],
                    ['name_en' => 'Al Mairid', 'name_ar' => 'المعيرض'],
                ]
            ],
            [
                'name_en' => 'Fujairah',
                'name_ar' => 'الفجيرة',
                'cities' => [
                    ['name_en' => 'Fujairah City', 'name_ar' => 'مدينة الفجيرة'],
                    ['name_en' => 'Dibba', 'name_ar' => 'دبا'],
                    ['name_en' => 'Masafi', 'name_ar' => 'مسافي'],
                    ['name_en' => 'Bidiyah', 'name_ar' => 'البدية'],
                    ['name_en' => 'Qidfa', 'name_ar' => 'القدفع'],
                    ['name_en' => 'Sakamkam', 'name_ar' => 'سكمكم'],
                    ['name_en' => 'Al Aqah', 'name_ar' => 'العقة'],
                    ['name_en' => 'Al Bithnah', 'name_ar' => 'البثنة'],
                    ['name_en' => 'Dadna', 'name_ar' => 'دادنا'],
                    ['name_en' => 'Wadi Al Helo', 'name_ar' => 'وادي الحلو'],
                ]
            ],
        ];

        foreach ($emirates as $emirate) {
            $govId = DB::table('governorates')->insertGetId([
                'country_id' => $countryId,
                'name_en' => $emirate['name_en'],
                'name_ar' => $emirate['name_ar'],
                'code' => $this->generateCode($emirate['name_en']),
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            foreach ($emirate['cities'] as $city) {
                DB::table('cities')->insert([
                    'governorate_id' => $govId,
                    'name_en' => $city['name_en'],
                    'name_ar' => $city['name_ar'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }

    private function seedSaudiArabia($countryId)
    {
        $regions = [
            [
                'name_en' => 'Riyadh',
                'name_ar' => 'الرياض',
                'cities' => [
                    ['name_en' => 'Riyadh', 'name_ar' => 'الرياض'],
                    ['name_en' => 'Diriyah', 'name_ar' => 'الدرعية'],
                    ['name_en' => 'Al Kharj', 'name_ar' => 'الخرج'],
                    ['name_en' => 'Dawadmi', 'name_ar' => 'الدوادمي'],
                    ['name_en' => 'Al Majmaah', 'name_ar' => 'المجمعة'],
                    ['name_en' => 'Al Quwayiyah', 'name_ar' => 'القويعية'],
                    ['name_en' => 'Afif', 'name_ar' => 'عفيف'],
                    ['name_en' => 'Al Sulayyil', 'name_ar' => 'السليل'],
                    ['name_en' => 'Layla', 'name_ar' => 'ليلى'],
                    ['name_en' => 'Al Ghat', 'name_ar' => 'الغاط'],
                    ['name_en' => 'Shaqra', 'name_ar' => 'شقراء'],
                    ['name_en' => 'Hotat Bani Tamim', 'name_ar' => 'حوطة بني تميم'],
                    ['name_en' => 'Huraymila', 'name_ar' => 'حريملاء'],
                    ['name_en' => 'Al Hariq', 'name_ar' => 'الحريق'],
                    ['name_en' => 'Al Dilam', 'name_ar' => 'الدلم'],
                    ['name_en' => 'Al Muzahimiyah', 'name_ar' => 'المزاحمية'],
                    ['name_en' => 'Rumah', 'name_ar' => 'رماح'],
                    ['name_en' => 'Thadiq', 'name_ar' => 'ثادق'],
                    ['name_en' => 'Al Zulfi', 'name_ar' => 'الزلفي'],
                    ['name_en' => 'Wadi Al-Dawasir', 'name_ar' => 'وادي الدواسر'],
                ]
            ],
            [
                'name_en' => 'Makkah',
                'name_ar' => 'مكة المكرمة',
                'cities' => [
                    ['name_en' => 'Makkah', 'name_ar' => 'مكة المكرمة'],
                    ['name_en' => 'Jeddah', 'name_ar' => 'جدة'],
                    ['name_en' => 'Taif', 'name_ar' => 'الطائف'],
                    ['name_en' => 'Rabigh', 'name_ar' => 'رابغ'],
                    ['name_en' => 'Khulais', 'name_ar' => 'خليص'],
                    ['name_en' => 'Rania', 'name_ar' => 'رنية'],
                    ['name_en' => 'Turbah', 'name_ar' => 'تربة'],
                    ['name_en' => 'Jumum', 'name_ar' => 'الجموم'],
                    ['name_en' => 'Al Kamil', 'name_ar' => 'الكامل'],
                    ['name_en' => 'Khurma', 'name_ar' => 'الخرمة'],
                    ['name_en' => 'Al Lith', 'name_ar' => 'الليث'],
                    ['name_en' => 'Adham', 'name_ar' => 'أضم'],
                    ['name_en' => 'Al Moya', 'name_ar' => 'الموية'],
                    ['name_en' => 'Maysan', 'name_ar' => 'ميسان'],
                    ['name_en' => 'Bahra', 'name_ar' => 'بحرة'],
                    ['name_en' => 'Thuwal', 'name_ar' => 'ثول'],
                    ['name_en' => 'Al Qunfudhah', 'name_ar' => 'القنفذة'],
                ]
            ],
            [
                'name_en' => 'Madinah',
                'name_ar' => 'المدينة المنورة',
                'cities' => [
                    ['name_en' => 'Madinah', 'name_ar' => 'المدينة المنورة'],
                    ['name_en' => 'Yanbu', 'name_ar' => 'ينبع'],
                    ['name_en' => 'Al Ula', 'name_ar' => 'العلا'],
                    ['name_en' => 'Badr', 'name_ar' => 'بدر'],
                    ['name_en' => 'Khaybar', 'name_ar' => 'خيبر'],
                    ['name_en' => 'Mahd adh Dhahab', 'name_ar' => 'مهد الذهب'],
                    ['name_en' => 'Al Hanakiyah', 'name_ar' => 'الحناكية'],
                    ['name_en' => 'Wadi Al-Fara', 'name_ar' => 'وادي الفرع'],
                ]
            ],
            [
                'name_en' => 'Eastern Province',
                'name_ar' => 'المنطقة الشرقية',
                'cities' => [
                    ['name_en' => 'Dammam', 'name_ar' => 'الدمام'],
                    ['name_en' => 'Khobar', 'name_ar' => 'الخبر'],
                    ['name_en' => 'Dhahran', 'name_ar' => 'الظهران'],
                    ['name_en' => 'Jubail', 'name_ar' => 'الجبيل'],
                    ['name_en' => 'Al Ahsa', 'name_ar' => 'الأحساء'],
                    ['name_en' => 'Qatif', 'name_ar' => 'القطيف'],
                    ['name_en' => 'Hafar Al-Batin', 'name_ar' => 'حفر الباطن'],
                    ['name_en' => 'Ras Tanura', 'name_ar' => 'رأس تنورة'],
                    ['name_en' => 'Abqaiq', 'name_ar' => 'بقيق'],
                    ['name_en' => 'Khafji', 'name_ar' => 'الخفجي'],
                    ['name_en' => 'Nairiyah', 'name_ar' => 'النعيرية'],
                    ['name_en' => 'Qurayyat', 'name_ar' => 'القريات'],
                ]
            ],
            [
                'name_en' => 'Asir',
                'name_ar' => 'عسير',
                'cities' => [
                    ['name_en' => 'Abha', 'name_ar' => 'أبها'],
                    ['name_en' => 'Khamis Mushait', 'name_ar' => 'خميس مشيط'],
                    ['name_en' => 'Bisha', 'name_ar' => 'بيشة'],
                    ['name_en' => 'Sarat Abidah', 'name_ar' => 'سراة عبيدة'],
                    ['name_en' => 'Ahad Rafidah', 'name_ar' => 'أحد رفيدة'],
                    ['name_en' => 'Al Namas', 'name_ar' => 'النماص'],
                    ['name_en' => 'Mahayel', 'name_ar' => 'محايل'],
                    ['name_en' => 'Rijal Almaa', 'name_ar' => 'رجال ألمع'],
                    ['name_en' => 'Tanomah', 'name_ar' => 'تنومة'],
                    ['name_en' => 'Balqarn', 'name_ar' => 'بلقرن'],
                ]
            ],
            [
                'name_en' => 'Tabuk',
                'name_ar' => 'تبوك',
                'cities' => [
                    ['name_en' => 'Tabuk', 'name_ar' => 'تبوك'],
                    ['name_en' => 'Duba', 'name_ar' => 'ضباء'],
                    ['name_en' => 'Tayma', 'name_ar' => 'تيماء'],
                    ['name_en' => 'Al Wajh', 'name_ar' => 'الوجه'],
                    ['name_en' => 'Haql', 'name_ar' => 'حقل'],
                    ['name_en' => 'Umluj', 'name_ar' => 'أملج'],
                ]
            ],
            [
                'name_en' => 'Hail',
                'name_ar' => 'حائل',
                'cities' => [
                    ['name_en' => 'Hail', 'name_ar' => 'حائل'],
                    ['name_en' => 'Baqaa', 'name_ar' => 'بقعاء'],
                    ['name_en' => 'Al Ghazalah', 'name_ar' => 'الغزالة'],
                    ['name_en' => 'Samira', 'name_ar' => 'السمير'],
                    ['name_en' => 'Al Shamli', 'name_ar' => 'الشملي'],
                ]
            ],
            [
                'name_en' => 'Northern Borders',
                'name_ar' => 'الحدود الشمالية',
                'cities' => [
                    ['name_en' => 'Arar', 'name_ar' => 'عرعر'],
                    ['name_en' => 'Rafha', 'name_ar' => 'رفحاء'],
                    ['name_en' => 'Turaif', 'name_ar' => 'طريف'],
                ]
            ],
            [
                'name_en' => 'Jazan',
                'name_ar' => 'جازان',
                'cities' => [
                    ['name_en' => 'Jazan', 'name_ar' => 'جازان'],
                    ['name_en' => 'Sabya', 'name_ar' => 'صبيا'],
                    ['name_en' => 'Abu Arish', 'name_ar' => 'أبو عريش'],
                    ['name_en' => 'Farasan', 'name_ar' => 'فرسان'],
                    ['name_en' => 'Al Darb', 'name_ar' => 'الدرب'],
                    ['name_en' => 'Samtah', 'name_ar' => 'صامطة'],
                ]
            ],
            [
                'name_en' => 'Najran',
                'name_ar' => 'نجران',
                'cities' => [
                    ['name_en' => 'Najran', 'name_ar' => 'نجران'],
                    ['name_en' => 'Sharurah', 'name_ar' => 'شرورة'],
                    ['name_en' => 'Hubuna', 'name_ar' => 'حبونا'],
                    ['name_en' => 'Badr Al Janoub', 'name_ar' => 'بدر الجنوب'],
                ]
            ],
            [
                'name_en' => 'Al Bahah',
                'name_ar' => 'الباحة',
                'cities' => [
                    ['name_en' => 'Al Bahah', 'name_ar' => 'الباحة'],
                    ['name_en' => 'Baljurashi', 'name_ar' => 'بلجرشي'],
                    ['name_en' => 'Al Mandaq', 'name_ar' => 'المندق'],
                    ['name_en' => 'Al Mikhwah', 'name_ar' => 'المخواة'],
                    ['name_en' => 'Al Qura', 'name_ar' => 'القرى'],
                ]
            ],
            [
                'name_en' => 'Al Jawf',
                'name_ar' => 'الجوف',
                'cities' => [
                    ['name_en' => 'Sakakah', 'name_ar' => 'سكاكا'],
                    ['name_en' => 'Dumat Al-Jandal', 'name_ar' => 'دومة الجندل'],
                    ['name_en' => 'Qurayyat', 'name_ar' => 'القريات'],
                    ['name_en' => 'Tabarjal', 'name_ar' => 'طبرجل'],
                ]
            ],
            [
                'name_en' => 'Qassim',
                'name_ar' => 'القصيم',
                'cities' => [
                    ['name_en' => 'Buraidah', 'name_ar' => 'بريدة'],
                    ['name_en' => 'Unaizah', 'name_ar' => 'عنيزة'],
                    ['name_en' => 'Ar Rass', 'name_ar' => 'الرس'],
                    ['name_en' => 'Al Mithnab', 'name_ar' => 'المذنب'],
                    ['name_en' => 'Al Bukayriyah', 'name_ar' => 'البكيرية'],
                    ['name_en' => 'Al Badaya', 'name_ar' => 'البدائع'],
                    ['name_en' => 'Riyadh Al Khabra', 'name_ar' => 'رياض الخبراء'],
                ]
            ],
        ];

        foreach ($regions as $region) {
            $govId = DB::table('governorates')->insertGetId([
                'country_id' => $countryId,
                'name_en' => $region['name_en'],
                'name_ar' => $region['name_ar'],
                'code' => $this->generateCode($region['name_en']),
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            foreach ($region['cities'] as $city) {
                DB::table('cities')->insert([
                    'governorate_id' => $govId,
                    'name_en' => $city['name_en'],
                    'name_ar' => $city['name_ar'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }

    private function seedEgypt($countryId)
    {
        $governorates = [
            // 1. Cairo Governorate
            [
                'name_en' => 'Cairo',
                'name_ar' => 'القاهرة',
                'cities' => [
                    ['name_en' => 'Nasr City', 'name_ar' => 'مدينة نصر'],
                    ['name_en' => 'Heliopolis', 'name_ar' => 'مصر الجديدة'],
                    ['name_en' => 'Maadi', 'name_ar' => 'المعادي'],
                    ['name_en' => 'Zamalek', 'name_ar' => 'الزمالك'],
                    ['name_en' => 'New Cairo', 'name_ar' => 'القاهرة الجديدة'],
                    ['name_en' => 'Shorouk', 'name_ar' => 'الشروق'],
                    ['name_en' => 'Obour', 'name_ar' => 'العبور'],
                    ['name_en' => 'Badr City', 'name_ar' => 'مدينة بدر'],
                    ['name_en' => 'Mokattam', 'name_ar' => 'المقطم'],
                    ['name_en' => 'Ain Shams', 'name_ar' => 'عين شمس'],
                    ['name_en' => 'Shubra', 'name_ar' => 'شبرا'],
                    ['name_en' => 'Downtown Cairo', 'name_ar' => 'وسط البلد'],
                    ['name_en' => 'Garden City', 'name_ar' => 'جاردن سيتي'],
                    ['name_en' => 'Dokki', 'name_ar' => 'الدقي'],
                    ['name_en' => 'Mohandessin', 'name_ar' => 'المهندسين'],
                    ['name_en' => 'Agouza', 'name_ar' => 'العجوزة'],
                    ['name_en' => 'Imbaba', 'name_ar' => 'إمبابة'],
                    ['name_en' => 'Bulaq', 'name_ar' => 'بولاق'],
                    ['name_en' => 'Hadayek El Kobba', 'name_ar' => 'حدائق القبة'],
                    ['name_en' => 'Matariya', 'name_ar' => 'المطرية'],
                    ['name_en' => 'Abbasiya', 'name_ar' => 'العباسية'],
                    ['name_en' => 'Helwan', 'name_ar' => 'حلوان'],
                    ['name_en' => 'Masr El Qadima', 'name_ar' => 'مصر القديمة'],
                    ['name_en' => 'Rod El Farag', 'name_ar' => 'روض الفرج'],
                    ['name_en' => 'Sayeda Zeinab', 'name_ar' => 'السيدة زينب'],
                    ['name_en' => 'Rehab', 'name_ar' => 'الرحاب'],
                    ['name_en' => 'Madinaty', 'name_ar' => 'مدينتي'],
                    ['name_en' => '5th Settlement', 'name_ar' => 'التجمع الخامس'],
                    ['name_en' => '1st Settlement', 'name_ar' => 'التجمع الأول'],
                    ['name_en' => '3rd Settlement', 'name_ar' => 'التجمع الثالث'],
                    ['name_en' => 'Katameya', 'name_ar' => 'القطامية'],
                    ['name_en' => 'New Heliopolis', 'name_ar' => 'هليوبوليس الجديدة'],
                    ['name_en' => 'Sheraton', 'name_ar' => 'شيراتون'],
                    ['name_en' => 'Nozha', 'name_ar' => 'النزهة'],
                    ['name_en' => 'Manial', 'name_ar' => 'المنيل'],
                    ['name_en' => 'Qasr El Nil', 'name_ar' => 'قصر النيل'],
                    ['name_en' => 'Abdeen', 'name_ar' => 'عابدين'],
                    ['name_en' => 'Azbakeya', 'name_ar' => 'الأزبكية'],
                    ['name_en' => 'Bab El Shaariya', 'name_ar' => 'باب الشعرية'],
                    ['name_en' => 'Ramses', 'name_ar' => 'رمسيس'],
                    ['name_en' => 'Waily', 'name_ar' => 'الوايلي'],
                    ['name_en' => 'Zeitoun', 'name_ar' => 'الزيتون'],
                    ['name_en' => 'Helmeya', 'name_ar' => 'الحلمية'],
                    ['name_en' => 'Darb El Ahmar', 'name_ar' => 'درب الأحمر'],
                    ['name_en' => 'El Salam City', 'name_ar' => 'مدينة السلام'],
                    ['name_en' => '15th May City', 'name_ar' => 'مدينة 15 مايو'],
                    ['name_en' => 'Fustat', 'name_ar' => 'الفسطاط'],
                    ['name_en' => 'Basateen', 'name_ar' => 'البساتين'],
                    ['name_en' => 'Dar El Salam', 'name_ar' => 'دار السلام'],
                    ['name_en' => 'Maasara', 'name_ar' => 'المعصرة'],
                    ['name_en' => 'Hadayek El Maadi', 'name_ar' => 'حدائق المعادي'],
                    ['name_en' => 'Sakanat El Maadi', 'name_ar' => 'ساكنات المعادي'],
                    ['name_en' => 'Degla', 'name_ar' => 'دجلة'],
                    ['name_en' => 'Zahraa El Maadi', 'name_ar' => 'زهراء المعادي'],
                    ['name_en' => 'Arab El Maadi', 'name_ar' => 'عرب المعادي'],
                ]
            ],
            // 2. Giza Governorate
            [
                'name_en' => 'Giza',
                'name_ar' => 'الجيزة',
                'cities' => [
                    ['name_en' => 'Giza', 'name_ar' => 'الجيزة'],
                    ['name_en' => '6th of October', 'name_ar' => '6 أكتوبر'],
                    ['name_en' => 'Sheikh Zayed', 'name_ar' => 'الشيخ زايد'],
                    ['name_en' => 'Haram', 'name_ar' => 'الهرم'],
                    ['name_en' => 'Faisal', 'name_ar' => 'فيصل'],
                    ['name_en' => 'Dokki', 'name_ar' => 'الدقي'],
                    ['name_en' => 'Mohandessin', 'name_ar' => 'المهندسين'],
                    ['name_en' => 'Agouza', 'name_ar' => 'العجوزة'],
                    ['name_en' => 'Imbaba', 'name_ar' => 'إمبابة'],
                    ['name_en' => 'Bulaq Al Dakrour', 'name_ar' => 'بولاق الدكرور'],
                    ['name_en' => 'Kit Kat', 'name_ar' => 'كيت كات'],
                    ['name_en' => 'Warraq', 'name_ar' => 'الوراق'],
                    ['name_en' => 'Ausim', 'name_ar' => 'أوسيم'],
                    ['name_en' => 'Kerdasa', 'name_ar' => 'كرداسة'],
                    ['name_en' => 'Abu Rawash', 'name_ar' => 'أبو رواش'],
                    ['name_en' => 'Hadayek October', 'name_ar' => 'حدائق أكتوبر'],
                    ['name_en' => 'Smart Village', 'name_ar' => 'القرية الذكية'],
                    ['name_en' => 'Zayed 2000', 'name_ar' => 'زايد 2000'],
                    ['name_en' => 'Beverly Hills', 'name_ar' => 'بيفرلي هيلز'],
                    ['name_en' => 'Allegria', 'name_ar' => 'أليجريا'],
                    ['name_en' => 'Palm Hills', 'name_ar' => 'بالم هيلز'],
                    ['name_en' => 'Dreamland', 'name_ar' => 'دريم لاند'],
                    ['name_en' => 'Al Wahat', 'name_ar' => 'الواحات'],
                    ['name_en' => 'Al Motamayez', 'name_ar' => 'المتميز'],
                    ['name_en' => 'West Somid', 'name_ar' => 'غرب سوميد'],
                    ['name_en' => 'Bashtil', 'name_ar' => 'البشتيل'],
                    ['name_en' => 'Sakiat Mekki', 'name_ar' => 'ساقية مكي'],
                    ['name_en' => 'Moneeb', 'name_ar' => 'المنيب'],
                    ['name_en' => 'Tahreer', 'name_ar' => 'التحرير'],
                    ['name_en' => 'Pyramids Gardens', 'name_ar' => 'حدائق الأهرام'],
                    ['name_en' => 'Saft El Laban', 'name_ar' => 'صفط اللبن'],
                    ['name_en' => 'Dahshour', 'name_ar' => 'دهشور'],
                    ['name_en' => 'Saqqara', 'name_ar' => 'سقارة'],
                    ['name_en' => 'Badrasheen', 'name_ar' => 'البدرشين'],
                    ['name_en' => 'Ayat', 'name_ar' => 'العياط'],
                ]
            ],
            // 3. Alexandria Governorate
            [
                'name_en' => 'Alexandria',
                'name_ar' => 'الإسكندرية',
                'cities' => [
                    ['name_en' => 'Alexandria', 'name_ar' => 'الإسكندرية'],
                    ['name_en' => 'Montazah', 'name_ar' => 'المنتزه'],
                    ['name_en' => 'Smouha', 'name_ar' => 'سموحة'],
                    ['name_en' => 'Sidi Gaber', 'name_ar' => 'سيدي جابر'],
                    ['name_en' => 'Stanley', 'name_ar' => 'ستانلي'],
                    ['name_en' => 'Gleem', 'name_ar' => 'جليم'],
                    ['name_en' => 'Camp Shezar', 'name_ar' => 'كامب شيزار'],
                    ['name_en' => 'Miami', 'name_ar' => 'ميامي'],
                    ['name_en' => 'Sidi Bishr', 'name_ar' => 'سيدي بشر'],
                    ['name_en' => 'Borg El Arab', 'name_ar' => 'برج العرب'],
                    ['name_en' => 'Agami', 'name_ar' => 'العجمي'],
                    ['name_en' => 'Amreya', 'name_ar' => 'العامرية'],
                    ['name_en' => 'Dekheila', 'name_ar' => 'الدخيلة'],
                    ['name_en' => 'Maamoura', 'name_ar' => 'المعمورة'],
                    ['name_en' => 'Mandara', 'name_ar' => 'المندرة'],
                    ['name_en' => 'Asafra', 'name_ar' => 'العصافرة'],
                    ['name_en' => 'Abu Qir', 'name_ar' => 'أبو قير'],
                    ['name_en' => 'Sporting', 'name_ar' => 'سبورتنج'],
                    ['name_en' => 'Roshdy', 'name_ar' => 'رشدي'],
                    ['name_en' => 'Cleopatra', 'name_ar' => 'كليوباترا'],
                    ['name_en' => 'San Stefano', 'name_ar' => 'سان ستيفانو'],
                    ['name_en' => 'Shatby', 'name_ar' => 'شاطبي'],
                    ['name_en' => 'Bab Sharq', 'name_ar' => 'باب شرق'],
                    ['name_en' => 'Moharam Bek', 'name_ar' => 'محرم بك'],
                    ['name_en' => 'Karmouz', 'name_ar' => 'كرموز'],
                    ['name_en' => 'Attarin', 'name_ar' => 'العطارين'],
                    ['name_en' => 'Manshia', 'name_ar' => 'المنشية'],
                    ['name_en' => 'Labban', 'name_ar' => 'اللبان'],
                    ['name_en' => 'Raml Station', 'name_ar' => 'محطة الرمل'],
                    ['name_en' => 'Bakos', 'name_ar' => 'باكوس'],
                    ['name_en' => 'Fleming', 'name_ar' => 'فليمنج'],
                    ['name_en' => 'Victoria', 'name_ar' => 'فيكتوريا'],
                    ['name_en' => 'Zezenia', 'name_ar' => 'زيزينيا'],
                    ['name_en' => 'Kafr Abdo', 'name_ar' => 'كفر عبده'],
                    ['name_en' => 'Louran', 'name_ar' => 'لوران'],
                    ['name_en' => 'Gianaclis', 'name_ar' => 'جناكليس'],
                    ['name_en' => 'Siouf', 'name_ar' => 'سيوف'],
                    ['name_en' => 'Azarita', 'name_ar' => 'الأزاريطة'],
                    ['name_en' => 'Max', 'name_ar' => 'المكس'],
                    ['name_en' => 'Hannoville', 'name_ar' => 'هانوفيل'],
                ]
            ],
            // 4. Dakahlia Governorate
            [
                'name_en' => 'Dakahlia',
                'name_ar' => 'الدقهلية',
                'cities' => [
                    ['name_en' => 'Mansoura', 'name_ar' => 'المنصورة'],
                    ['name_en' => 'Talkha', 'name_ar' => 'طلخا'],
                    ['name_en' => 'Mit Ghamr', 'name_ar' => 'ميت غمر'],
                    ['name_en' => 'Dekernes', 'name_ar' => 'دكرنس'],
                    ['name_en' => 'Aga', 'name_ar' => 'أجا'],
                    ['name_en' => 'Manzala', 'name_ar' => 'المنزلة'],
                    ['name_en' => 'Mit Salsil', 'name_ar' => 'ميت سلسيل'],
                    ['name_en' => 'Belqas', 'name_ar' => 'بلقاس'],
                    ['name_en' => 'Sherbin', 'name_ar' => 'شربين'],
                    ['name_en' => 'Minyat El Nasr', 'name_ar' => 'منية النصر'],
                    ['name_en' => 'Gamasa', 'name_ar' => 'جمصة'],
                    ['name_en' => 'Mahalla Damana', 'name_ar' => 'محلة دمنة'],
                    ['name_en' => 'Nabaroh', 'name_ar' => 'نبروه'],
                    ['name_en' => 'Tami El Amdid', 'name_ar' => 'تمي الأمديد'],
                    ['name_en' => 'Sinbillawein', 'name_ar' => 'السنبلاوين'],
                    ['name_en' => 'Matariya', 'name_ar' => 'المطرية'],
                ]
            ],
            // 5. Red Sea Governorate
            [
                'name_en' => 'Red Sea',
                'name_ar' => 'البحر الأحمر',
                'cities' => [
                    ['name_en' => 'Hurghada', 'name_ar' => 'الغردقة'],
                    ['name_en' => 'Safaga', 'name_ar' => 'سفاجا'],
                    ['name_en' => 'Marsa Alam', 'name_ar' => 'مرسى علم'],
                    ['name_en' => 'Quseir', 'name_ar' => 'القصير'],
                    ['name_en' => 'El Gouna', 'name_ar' => 'الجونة'],
                    ['name_en' => 'Ras Ghareb', 'name_ar' => 'رأس غارب'],
                    ['name_en' => 'Shalatin', 'name_ar' => 'شلاتين'],
                    ['name_en' => 'Halayeb', 'name_ar' => 'حلايب'],
                ]
            ],
            // 6. Beheira Governorate
            [
                'name_en' => 'Beheira',
                'name_ar' => 'البحيرة',
                'cities' => [
                    ['name_en' => 'Damanhour', 'name_ar' => 'دمنهور'],
                    ['name_en' => 'Kafr El Dawar', 'name_ar' => 'كفر الدوار'],
                    ['name_en' => 'Rashid', 'name_ar' => 'رشيد'],
                    ['name_en' => 'Edko', 'name_ar' => 'إدكو'],
                    ['name_en' => 'Abu Hommos', 'name_ar' => 'أبو حمص'],
                    ['name_en' => 'Kom Hamada', 'name_ar' => 'كوم حمادة'],
                    ['name_en' => 'Mahmoudiyah', 'name_ar' => 'المحمودية'],
                    ['name_en' => 'Rahmaniya', 'name_ar' => 'الرحمانية'],
                    ['name_en' => 'Itay El Barud', 'name_ar' => 'إيتاي البارود'],
                    ['name_en' => 'Housh Eissa', 'name_ar' => 'حوش عيسى'],
                ]
            ],
            // 7. Faiyum Governorate
            [
                'name_en' => 'Faiyum',
                'name_ar' => 'الفيوم',
                'cities' => [
                    ['name_en' => 'Faiyum', 'name_ar' => 'الفيوم'],
                    ['name_en' => 'Tamiya', 'name_ar' => 'طامية'],
                    ['name_en' => 'Snores', 'name_ar' => 'سنورس'],
                    ['name_en' => 'Ibsheway', 'name_ar' => 'إبشواي'],
                    ['name_en' => 'Youssef El Seddik', 'name_ar' => 'يوسف الصديق'],
                    ['name_en' => 'Atsa', 'name_ar' => 'أطسا'],
                ]
            ],
            // 8. Gharbia Governorate
            [
                'name_en' => 'Gharbia',
                'name_ar' => 'الغربية',
                'cities' => [
                    ['name_en' => 'Tanta', 'name_ar' => 'طنطا'],
                    ['name_en' => 'El Mahalla El Kubra', 'name_ar' => 'المحلة الكبرى'],
                    ['name_en' => 'Kafr El Zayat', 'name_ar' => 'كفر الزيات'],
                    ['name_en' => 'Zifta', 'name_ar' => 'زفتى'],
                    ['name_en' => 'Samannoud', 'name_ar' => 'سمنود'],
                    ['name_en' => 'Qutour', 'name_ar' => 'قطور'],
                    ['name_en' => 'Basyoun', 'name_ar' => 'بسيون'],
                    ['name_en' => 'Santa', 'name_ar' => 'السنطة'],
                ]
            ],
            // 9. Ismailia Governorate
            [
                'name_en' => 'Ismailia',
                'name_ar' => 'الإسماعيلية',
                'cities' => [
                    ['name_en' => 'Ismailia', 'name_ar' => 'الإسماعيلية'],
                    ['name_en' => 'Fayed', 'name_ar' => 'فايد'],
                    ['name_en' => 'Qantara', 'name_ar' => 'القنطرة'],
                    ['name_en' => 'Abu Suwir', 'name_ar' => 'أبو صوير'],
                    ['name_en' => 'Qantara Sharq', 'name_ar' => 'القنطرة شرق'],
                    ['name_en' => 'Tel El Kebir', 'name_ar' => 'التل الكبير'],
                ]
            ],
            // 10. Menofia Governorate
            [
                'name_en' => 'Menofia',
                'name_ar' => 'المنوفية',
                'cities' => [
                    ['name_en' => 'Shibin El Kom', 'name_ar' => 'شبين الكوم'],
                    ['name_en' => 'Menouf', 'name_ar' => 'منوف'],
                    ['name_en' => 'Ashmoun', 'name_ar' => 'أشمون'],
                    ['name_en' => 'Tala', 'name_ar' => 'تلا'],
                    ['name_en' => 'Quesna', 'name_ar' => 'قويسنا'],
                    ['name_en' => 'Berket El Saba', 'name_ar' => 'بركة السبع'],
                    ['name_en' => 'Sadat City', 'name_ar' => 'مدينة السادات'],
                ]
            ],
            // 11. Minya Governorate
            [
                'name_en' => 'Minya',
                'name_ar' => 'المنيا',
                'cities' => [
                    ['name_en' => 'Minya', 'name_ar' => 'المنيا'],
                    ['name_en' => 'Mallawi', 'name_ar' => 'ملوي'],
                    ['name_en' => 'Samalut', 'name_ar' => 'سمالوط'],
                    ['name_en' => 'Matay', 'name_ar' => 'مطاي'],
                    ['name_en' => 'Beni Mazar', 'name_ar' => 'بني مزار'],
                    ['name_en' => 'Abu Qirqas', 'name_ar' => 'أبو قرقاص'],
                    ['name_en' => 'Maghagha', 'name_ar' => 'مغاغة'],
                    ['name_en' => 'Deir Mawas', 'name_ar' => 'دير مواس'],
                    ['name_en' => 'Adwa', 'name_ar' => 'العدوة'],
                ]
            ],
            // 12. Qalyubia Governorate
            [
                'name_en' => 'Qalyubia',
                'name_ar' => 'القليوبية',
                'cities' => [
                    ['name_en' => 'Banha', 'name_ar' => 'بنها'],
                    ['name_en' => 'Qalyub', 'name_ar' => 'قليوب'],
                    ['name_en' => 'Shubra El Kheima', 'name_ar' => 'شبرا الخيمة'],
                    ['name_en' => 'Obour', 'name_ar' => 'العبور'],
                    ['name_en' => 'Khanka', 'name_ar' => 'الخانكة'],
                    ['name_en' => 'Kafr Shukr', 'name_ar' => 'كفر شكر'],
                    ['name_en' => 'Qaha', 'name_ar' => 'قها'],
                    ['name_en' => 'Toukh', 'name_ar' => 'طوخ'],
                    ['name_en' => 'Shibin El Qanater', 'name_ar' => 'شبين القناطر'],
                ]
            ],
            // 13. New Valley Governorate
            [
                'name_en' => 'New Valley',
                'name_ar' => 'الوادي الجديد',
                'cities' => [
                    ['name_en' => 'Kharga', 'name_ar' => 'الخارجة'],
                    ['name_en' => 'Dakhla', 'name_ar' => 'الداخلة'],
                    ['name_en' => 'Farafra', 'name_ar' => 'الفرافرة'],
                    ['name_en' => 'Baris', 'name_ar' => 'باريس'],
                    ['name_en' => 'Balat', 'name_ar' => 'بلاط'],
                ]
            ],
            // 14. Suez Governorate
            [
                'name_en' => 'Suez',
                'name_ar' => 'السويس',
                'cities' => [
                    ['name_en' => 'Suez', 'name_ar' => 'السويس'],
                    ['name_en' => 'Ain Sokhna', 'name_ar' => 'العين السخنة'],
                    ['name_en' => 'Attaka', 'name_ar' => 'عتاقة'],
                    ['name_en' => 'Faisal', 'name_ar' => 'فيصل'],
                    ['name_en' => 'Ganayen', 'name_ar' => 'الجناين'],
                ]
            ],
            // 15. Sharqia Governorate
            [
                'name_en' => 'Sharqia',
                'name_ar' => 'الشرقية',
                'cities' => [
                    ['name_en' => 'Zagazig', 'name_ar' => 'الزقازيق'],
                    ['name_en' => '10th of Ramadan', 'name_ar' => '10 رمضان'],
                    ['name_en' => 'Bilbeis', 'name_ar' => 'بلبيس'],
                    ['name_en' => 'Faqous', 'name_ar' => 'فاقوس'],
                    ['name_en' => 'Abu Hammad', 'name_ar' => 'أبو حماد'],
                    ['name_en' => 'Abu Kabir', 'name_ar' => 'أبو كبير'],
                    ['name_en' => 'Hehya', 'name_ar' => 'ههيا'],
                    ['name_en' => 'Diyarb Negm', 'name_ar' => 'ديرب نجم'],
                    ['name_en' => 'Kafr Saqr', 'name_ar' => 'كفر صقر'],
                    ['name_en' => 'Awlad Saqr', 'name_ar' => 'أولاد صقر'],
                ]
            ],
            // 16. Aswan Governorate
            [
                'name_en' => 'Aswan',
                'name_ar' => 'أسوان',
                'cities' => [
                    ['name_en' => 'Aswan', 'name_ar' => 'أسوان'],
                    ['name_en' => 'Kom Ombo', 'name_ar' => 'كوم أمبو'],
                    ['name_en' => 'Edfu', 'name_ar' => 'إدفو'],
                    ['name_en' => 'Abu Simbel', 'name_ar' => 'أبو سمبل'],
                    ['name_en' => 'Daraw', 'name_ar' => 'دراو'],
                    ['name_en' => 'Nasr El Nuba', 'name_ar' => 'نصر النوبة'],
                ]
            ],
            // 17. Assiut Governorate
            [
                'name_en' => 'Assiut',
                'name_ar' => 'أسيوط',
                'cities' => [
                    ['name_en' => 'Assiut', 'name_ar' => 'أسيوط'],
                    ['name_en' => 'New Assiut', 'name_ar' => 'أسيوط الجديدة'],
                    ['name_en' => 'Dayrout', 'name_ar' => 'ديروط'],
                    ['name_en' => 'Qusiya', 'name_ar' => 'القوصية'],
                    ['name_en' => 'Manfalut', 'name_ar' => 'منفلوط'],
                    ['name_en' => 'Abnub', 'name_ar' => 'أبنوب'],
                    ['name_en' => 'Abu Tig', 'name_ar' => 'أبو تيج'],
                    ['name_en' => 'Sahel Selim', 'name_ar' => 'ساحل سليم'],
                ]
            ],
            // 18. Beni Suef Governorate
            [
                'name_en' => 'Beni Suef',
                'name_ar' => 'بني سويف',
                'cities' => [
                    ['name_en' => 'Beni Suef', 'name_ar' => 'بني سويف'],
                    ['name_en' => 'New Beni Suef', 'name_ar' => 'بني سويف الجديدة'],
                    ['name_en' => 'Nasser', 'name_ar' => 'ناصر'],
                    ['name_en' => 'Sumusta', 'name_ar' => 'سمسطا'],
                    ['name_en' => 'Fashn', 'name_ar' => 'الفشن'],
                    ['name_en' => 'Biba', 'name_ar' => 'ببا'],
                    ['name_en' => 'Ehnasia', 'name_ar' => 'إهناسيا'],
                ]
            ],
            // 19. Port Said Governorate
            [
                'name_en' => 'Port Said',
                'name_ar' => 'بورسعيد',
                'cities' => [
                    ['name_en' => 'Port Said', 'name_ar' => 'بورسعيد'],
                    ['name_en' => 'Port Fouad', 'name_ar' => 'بور فؤاد'],
                    ['name_en' => 'Arab District', 'name_ar' => 'الحي العربي'],
                    ['name_en' => 'Zohour District', 'name_ar' => 'حي الزهور'],
                    ['name_en' => 'Manakh District', 'name_ar' => 'حي المناخ'],
                ]
            ],
            // 20. Damietta Governorate
            [
                'name_en' => 'Damietta',
                'name_ar' => 'دمياط',
                'cities' => [
                    ['name_en' => 'Damietta', 'name_ar' => 'دمياط'],
                    ['name_en' => 'New Damietta', 'name_ar' => 'دمياط الجديدة'],
                    ['name_en' => 'Ras El Bar', 'name_ar' => 'رأس البر'],
                    ['name_en' => 'Faraskur', 'name_ar' => 'فارسكور'],
                    ['name_en' => 'Zarqa', 'name_ar' => 'الزرقا'],
                    ['name_en' => 'Kafr Saad', 'name_ar' => 'كفر سعد'],
                ]
            ],
            // 21. Sohag Governorate
            [
                'name_en' => 'Sohag',
                'name_ar' => 'سوهاج',
                'cities' => [
                    ['name_en' => 'Sohag', 'name_ar' => 'سوهاج'],
                    ['name_en' => 'Akhmim', 'name_ar' => 'أخميم'],
                    ['name_en' => 'Girga', 'name_ar' => 'جرجا'],
                    ['name_en' => 'Balyana', 'name_ar' => 'البلينا'],
                    ['name_en' => 'Dar El Salam', 'name_ar' => 'دار السلام'],
                    ['name_en' => 'Tima', 'name_ar' => 'طما'],
                    ['name_en' => 'Tahta', 'name_ar' => 'طهطا'],
                    ['name_en' => 'Maragha', 'name_ar' => 'المراغة'],
                ]
            ],
            // 22. North Sinai Governorate
            [
                'name_en' => 'North Sinai',
                'name_ar' => 'شمال سيناء',
                'cities' => [
                    ['name_en' => 'Arish', 'name_ar' => 'العريش'],
                    ['name_en' => 'Sheikh Zuweid', 'name_ar' => 'الشيخ زويد'],
                    ['name_en' => 'Rafah', 'name_ar' => 'رفح'],
                    ['name_en' => 'Bir al-Abed', 'name_ar' => 'بئر العبد'],
                    ['name_en' => 'Nakhl', 'name_ar' => 'نخل'],
                    ['name_en' => 'Hasana', 'name_ar' => 'الحسنة'],
                ]
            ],
            // 23. South Sinai Governorate
            [
                'name_en' => 'South Sinai',
                'name_ar' => 'جنوب سيناء',
                'cities' => [
                    ['name_en' => 'Sharm El Sheikh', 'name_ar' => 'شرم الشيخ'],
                    ['name_en' => 'Dahab', 'name_ar' => 'دهب'],
                    ['name_en' => 'Nuweiba', 'name_ar' => 'نويبع'],
                    ['name_en' => 'Taba', 'name_ar' => 'طابا'],
                    ['name_en' => 'Saint Catherine', 'name_ar' => 'سانت كاترين'],
                    ['name_en' => 'Ras Sudr', 'name_ar' => 'رأس سدر'],
                    ['name_en' => 'Abu Rudeis', 'name_ar' => 'أبو رديس'],
                    ['name_en' => 'Abu Zenima', 'name_ar' => 'أبو زنيمة'],
                ]
            ],
            // 24. Kafr El Sheikh Governorate
            [
                'name_en' => 'Kafr El Sheikh',
                'name_ar' => 'كفر الشيخ',
                'cities' => [
                    ['name_en' => 'Kafr El Sheikh', 'name_ar' => 'كفر الشيخ'],
                    ['name_en' => 'Desouk', 'name_ar' => 'دسوق'],
                    ['name_en' => 'Fuwwah', 'name_ar' => 'فوه'],
                    ['name_en' => 'Motobas', 'name_ar' => 'مطوبس'],
                    ['name_en' => 'Baltim', 'name_ar' => 'بلطيم'],
                    ['name_en' => 'Sidi Salem', 'name_ar' => 'سيدي سالم'],
                    ['name_en' => 'Biela', 'name_ar' => 'بيلا'],
                    ['name_en' => 'Qallin', 'name_ar' => 'قلين'],
                ]
            ],
            // 25. Matrouh Governorate
            [
                'name_en' => 'Matrouh',
                'name_ar' => 'مطروح',
                'cities' => [
                    ['name_en' => 'Marsa Matrouh', 'name_ar' => 'مرسى مطروح'],
                    ['name_en' => 'El Alamein', 'name_ar' => 'العلمين'],
                    ['name_en' => 'Sidi Barrani', 'name_ar' => 'سيدي براني'],
                    ['name_en' => 'Salloum', 'name_ar' => 'السلوم'],
                    ['name_en' => 'Dabaa', 'name_ar' => 'الضبعة'],
                    ['name_en' => 'Siwa', 'name_ar' => 'سيوة'],
                ]
            ],
            // 26. Luxor Governorate
            [
                'name_en' => 'Luxor',
                'name_ar' => 'الأقصر',
                'cities' => [
                    ['name_en' => 'Luxor', 'name_ar' => 'الأقصر'],
                    ['name_en' => 'Esna', 'name_ar' => 'إسنا'],
                    ['name_en' => 'Armant', 'name_ar' => 'أرمنت'],
                    ['name_en' => 'Thebes', 'name_ar' => 'طيبة'],
                    ['name_en' => 'Karnak', 'name_ar' => 'الكرنك'],
                    ['name_en' => 'Qurna', 'name_ar' => 'القرنة'],
                ]
            ],
            // 27. Qena Governorate
            [
                'name_en' => 'Qena',
                'name_ar' => 'قنا',
                'cities' => [
                    ['name_en' => 'Qena', 'name_ar' => 'قنا'],
                    ['name_en' => 'Nag Hammadi', 'name_ar' => 'نجع حمادي'],
                    ['name_en' => 'Qus', 'name_ar' => 'قوص'],
                    ['name_en' => 'Naqada', 'name_ar' => 'نقادة'],
                    ['name_en' => 'Dishna', 'name_ar' => 'دشنا'],
                    ['name_en' => 'Abu Tesht', 'name_ar' => 'أبو تشت'],
                    ['name_en' => 'Farshout', 'name_ar' => 'فرشوط'],
                ]
            ],
            // 28. New Administrative Capital
            [
                'name_en' => 'New Administrative Capital',
                'name_ar' => 'العاصمة الإدارية الجديدة',
                'cities' => [
                    ['name_en' => 'Government District', 'name_ar' => 'الحي الحكومي'],
                    ['name_en' => 'Diplomatic District', 'name_ar' => 'الحي الدبلوماسي'],
                    ['name_en' => 'Financial District', 'name_ar' => 'الحي المالي'],
                    ['name_en' => 'R7', 'name_ar' => 'R7'],
                    ['name_en' => 'R8', 'name_ar' => 'R8'],
                    ['name_en' => 'R5', 'name_ar' => 'R5'],
                    ['name_en' => 'R3', 'name_ar' => 'R3'],
                    ['name_en' => 'Downtown', 'name_ar' => 'الداون تاون'],
                    ['name_en' => 'Medical City', 'name_ar' => 'المدينة الطبية'],
                    ['name_en' => 'Sports City', 'name_ar' => 'المدينة الرياضية'],
                    ['name_en' => 'Knowledge City', 'name_ar' => 'مدينة المعرفة'],
                    ['name_en' => 'Expo City', 'name_ar' => 'مدينة المعارض'],
                ]
            ],
        ];

        foreach ($governorates as $gov) {
            $govId = DB::table('governorates')->insertGetId([
                'country_id' => $countryId,
                'name_en' => $gov['name_en'],
                'name_ar' => $gov['name_ar'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            foreach ($gov['cities'] as $city) {
                DB::table('cities')->insert([
                    'governorate_id' => $govId,
                    'name_en' => $city['name_en'],
                    'name_ar' => $city['name_ar'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }

    // Continue with other Middle East countries...
    private function seedKuwait($countryId)
    {
        $governorates = [
            [
                'name_en' => 'Capital',
                'name_ar' => 'العاصمة',
                'cities' => [
                    ['name_en' => 'Kuwait City', 'name_ar' => 'مدينة الكويت'],
                    ['name_en' => 'Shuwaikh', 'name_ar' => 'الشويخ'],
                    ['name_en' => 'Sharq', 'name_ar' => 'الشرق'],
                    ['name_en' => 'Dasma', 'name_ar' => 'الدسمة'],
                    ['name_en' => 'Daiya', 'name_ar' => 'الدعية'],
                    ['name_en' => 'Adailiya', 'name_ar' => 'العديلية'],
                    ['name_en' => 'Khaldiya', 'name_ar' => 'الخالدية'],
                    ['name_en' => 'Kaifan', 'name_ar' => 'كيفان'],
                    ['name_en' => 'Mansouriya', 'name_ar' => 'المنصورية'],
                    ['name_en' => 'Faiha', 'name_ar' => 'الفيحاء'],
                    ['name_en' => 'Nahda', 'name_ar' => 'النهضة'],
                    ['name_en' => 'Shuwaikh Industrial', 'name_ar' => 'الشويخ الصناعية'],
                    ['name_en' => 'Qortuba', 'name_ar' => 'قرطبة'],
                    ['name_en' => 'Yarmouk', 'name_ar' => 'اليرموك'],
                    ['name_en' => 'Sulaibikhat', 'name_ar' => 'الصليبيخات'],
                    ['name_en' => 'Doha', 'name_ar' => 'الدوحة'],
                    ['name_en' => 'Rawda', 'name_ar' => 'الروضة'],
                    ['name_en' => 'Qadsiya', 'name_ar' => 'القادسية'],
                    ['name_en' => 'Bneid Al Qar', 'name_ar' => 'بنيد القار'],
                    ['name_en' => 'Dasman', 'name_ar' => 'دسمان'],
                ]
            ],
            [
                'name_en' => 'Hawalli',
                'name_ar' => 'حولي',
                'cities' => [
                    ['name_en' => 'Hawalli', 'name_ar' => 'حولي'],
                    ['name_en' => 'Salmiya', 'name_ar' => 'السالمية'],
                    ['name_en' => 'Rumaithiya', 'name_ar' => 'الرميثية'],
                    ['name_en' => 'Bayan', 'name_ar' => 'بيان'],
                    ['name_en' => 'Mishref', 'name_ar' => 'مشرف'],
                    ['name_en' => 'Salwa', 'name_ar' => 'السلوى'],
                    ['name_en' => 'Jabriya', 'name_ar' => 'الجابرية'],
                    ['name_en' => 'Surra', 'name_ar' => 'السرة'],
                    ['name_en' => 'Zahra', 'name_ar' => 'الزهراء'],
                    ['name_en' => 'Shaab', 'name_ar' => 'الشعب'],
                    ['name_en' => 'Hitteen', 'name_ar' => 'حطين'],
                    ['name_en' => 'Siddeeq', 'name_ar' => 'الصديق'],
                    ['name_en' => 'Maidan Hawalli', 'name_ar' => 'ميدان حولي'],
                ]
            ],
            [
                'name_en' => 'Farwaniya',
                'name_ar' => 'الفروانية',
                'cities' => [
                    ['name_en' => 'Farwaniya', 'name_ar' => 'الفروانية'],
                    ['name_en' => 'Jleeb Al-Shuyoukh', 'name_ar' => 'جليب الشيوخ'],
                    ['name_en' => 'Khaitan', 'name_ar' => 'خيطان'],
                    ['name_en' => 'Abraq Khaitan', 'name_ar' => 'أبرق خيطان'],
                    ['name_en' => 'Andalous', 'name_ar' => 'الأندلس'],
                    ['name_en' => 'Ferdous', 'name_ar' => 'الفردوس'],
                    ['name_en' => 'Ashbeliah', 'name_ar' => 'إشبيلية'],
                    ['name_en' => 'Rehab', 'name_ar' => 'الرحاب'],
                    ['name_en' => 'Rabiya', 'name_ar' => 'الرابية'],
                    ['name_en' => 'Ardiya', 'name_ar' => 'العارضية'],
                    ['name_en' => 'Ardiya Industrial', 'name_ar' => 'العارضية الصناعية'],
                    ['name_en' => 'Omariya', 'name_ar' => 'العمرية'],
                    ['name_en' => 'Rai', 'name_ar' => 'الري'],
                    ['name_en' => 'Reggai', 'name_ar' => 'الرقعي'],
                ]
            ],
            [
                'name_en' => 'Ahmadi',
                'name_ar' => 'الأحمدي',
                'cities' => [
                    ['name_en' => 'Ahmadi', 'name_ar' => 'الأحمدي'],
                    ['name_en' => 'Fahaheel', 'name_ar' => 'الفحيحيل'],
                    ['name_en' => 'Mangaf', 'name_ar' => 'المنقف'],
                    ['name_en' => 'Abu Halifa', 'name_ar' => 'أبو حليفة'],
                    ['name_en' => 'Fintas', 'name_ar' => 'الفنطاس'],
                    ['name_en' => 'Mahboula', 'name_ar' => 'المهبولة'],
                    ['name_en' => 'Riqqa', 'name_ar' => 'الرقة'],
                    ['name_en' => 'Hadiya', 'name_ar' => 'هدية'],
                    ['name_en' => 'Sabahiya', 'name_ar' => 'الصباحية'],
                    ['name_en' => 'Mina Abdullah', 'name_ar' => 'ميناء عبد الله'],
                    ['name_en' => 'Shuaiba', 'name_ar' => 'الشعيبة'],
                    ['name_en' => 'Jaber Al-Ali', 'name_ar' => 'جابر العلي'],
                    ['name_en' => 'Wafra', 'name_ar' => 'الوفرة'],
                    ['name_en' => 'Zoor', 'name_ar' => 'الزور'],
                ]
            ],
            [
                'name_en' => 'Jahra',
                'name_ar' => 'الجهراء',
                'cities' => [
                    ['name_en' => 'Jahra', 'name_ar' => 'الجهراء'],
                    ['name_en' => 'Qasr', 'name_ar' => 'القصر'],
                    ['name_en' => 'Naeem', 'name_ar' => 'النعيم'],
                    ['name_en' => 'Oyoun', 'name_ar' => 'العيون'],
                    ['name_en' => 'Saad Al Abdullah', 'name_ar' => 'سعد العبد الله'],
                    ['name_en' => 'Taima', 'name_ar' => 'تيماء'],
                    ['name_en' => 'Waha', 'name_ar' => 'الواحة'],
                    ['name_en' => 'Abdali', 'name_ar' => 'العبدلي'],
                    ['name_en' => 'Sulaibiya', 'name_ar' => 'الصليبية'],
                    ['name_en' => 'Nahdha', 'name_ar' => 'النهضة'],
                    ['name_en' => 'Qairawan', 'name_ar' => 'القيروان'],
                ]
            ],
            [
                'name_en' => 'Mubarak Al-Kabeer',
                'name_ar' => 'مبارك الكبير',
                'cities' => [
                    ['name_en' => 'Mubarak Al-Kabeer', 'name_ar' => 'مبارك الكبير'],
                    ['name_en' => 'Qurain', 'name_ar' => 'القرين'],
                    ['name_en' => 'Fnaitees', 'name_ar' => 'الفنيطيس'],
                    ['name_en' => 'Abu Ftaira', 'name_ar' => 'أبو فطيرة'],
                    ['name_en' => 'Sabah Al-Salem', 'name_ar' => 'صباح السالم'],
                    ['name_en' => 'Adan', 'name_ar' => 'العدان'],
                    ['name_en' => 'Messila', 'name_ar' => 'المسيلة'],
                    ['name_en' => 'Sabhan Industrial', 'name_ar' => 'صبحان الصناعية'],
                ]
            ],
        ];

        foreach ($governorates as $gov) {
            $govId = DB::table('governorates')->insertGetId([
                'country_id' => $countryId,
                'name_en' => $gov['name_en'],
                'name_ar' => $gov['name_ar'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            foreach ($gov['cities'] as $city) {
                DB::table('cities')->insert([
                    'governorate_id' => $govId,
                    'name_en' => $city['name_en'],
                    'name_ar' => $city['name_ar'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }

    // Add stubs for other Middle East countries
    private function seedBahrain($countryId)
    {
        $governorates = [
            [
                'name_en' => 'Capital',
                'name_ar' => 'العاصمة',
                'cities' => [
                    ['name_en' => 'Manama', 'name_ar' => 'المنامة'],
                    ['name_en' => 'Hoora', 'name_ar' => 'الحورة'],
                    ['name_en' => 'Gudaibiya', 'name_ar' => 'القضيبية'],
                    ['name_en' => 'Juffair', 'name_ar' => 'الجفير'],
                    ['name_en' => 'Adliya', 'name_ar' => 'العدلية'],
                    ['name_en' => 'Zinj', 'name_ar' => 'الزنج'],
                    ['name_en' => 'Seef', 'name_ar' => 'السيف'],
                    ['name_en' => 'Sanabis', 'name_ar' => 'سنابس'],
                    ['name_en' => 'Ras Rumman', 'name_ar' => 'راس رمان'],
                    ['name_en' => 'Mahooz', 'name_ar' => 'الماحوز'],
                ]
            ],
            [
                'name_en' => 'Muharraq',
                'name_ar' => 'المحرق',
                'cities' => [
                    ['name_en' => 'Muharraq City', 'name_ar' => 'مدينة المحرق'],
                    ['name_en' => 'Arad', 'name_ar' => 'عراد'],
                    ['name_en' => 'Hidd', 'name_ar' => 'الحد'],
                    ['name_en' => 'Busaiteen', 'name_ar' => 'البسيتين'],
                    ['name_en' => 'Dair', 'name_ar' => 'الدير'],
                    ['name_en' => 'Galali', 'name_ar' => 'قلالي'],
                    ['name_en' => 'Samaheej', 'name_ar' => 'سماهيج'],
                ]
            ],
            [
                'name_en' => 'Northern',
                'name_ar' => 'الشمالية',
                'cities' => [
                    ['name_en' => 'Hamad Town', 'name_ar' => 'مدينة حمد'],
                    ['name_en' => 'Budaiya', 'name_ar' => 'البديع'],
                    ['name_en' => 'Sar', 'name_ar' => 'سار'],
                    ['name_en' => 'Barbar', 'name_ar' => 'باربار'],
                    ['name_en' => 'Diraz', 'name_ar' => 'الديرة'],
                    ['name_en' => 'Bani Jamra', 'name_ar' => 'بني جمرة'],
                    ['name_en' => 'Janabiya', 'name_ar' => 'الجنبية'],
                ]
            ],
            [
                'name_en' => 'Southern',
                'name_ar' => 'الجنوبية',
                'cities' => [
                    ['name_en' => 'Riffa', 'name_ar' => 'الرفاع'],
                    ['name_en' => 'Isa Town', 'name_ar' => 'مدينة عيسى'],
                    ['name_en' => 'Sitra', 'name_ar' => 'سترة'],
                    ['name_en' => 'Zallaq', 'name_ar' => 'الزلاق'],
                    ['name_en' => 'Askar', 'name_ar' => 'عسكر'],
                    ['name_en' => 'Tubli', 'name_ar' => 'توبلي'],
                    ['name_en' => 'Eker', 'name_ar' => 'عكر'],
                    ['name_en' => 'Jidd Hafs', 'name_ar' => 'جد حفص'],
                ]
            ],
        ];

        foreach ($governorates as $gov) {
            $govId = DB::table('governorates')->insertGetId([
                'country_id' => $countryId,
                'name_en' => $gov['name_en'],
                'name_ar' => $gov['name_ar'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            foreach ($gov['cities'] as $city) {
                DB::table('cities')->insert([
                    'governorate_id' => $govId,
                    'name_en' => $city['name_en'],
                    'name_ar' => $city['name_ar'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }

    private function seedQatar($countryId)
    {
        $municipalities = [
            [
                'name_en' => 'Doha',
                'name_ar' => 'الدوحة',
                'cities' => [
                    ['name_en' => 'Doha City', 'name_ar' => 'مدينة الدوحة'],
                    ['name_en' => 'West Bay', 'name_ar' => 'الخليج الغربي'],
                    ['name_en' => 'Al Sadd', 'name_ar' => 'السد'],
                    ['name_en' => 'Al Nasr', 'name_ar' => 'النصر'],
                    ['name_en' => 'Bin Mahmoud', 'name_ar' => 'بن محمود'],
                    ['name_en' => 'Al Mansoura', 'name_ar' => 'المنصورة'],
                    ['name_en' => 'Fereej Abdel Aziz', 'name_ar' => 'فريج عبد العزيز'],
                    ['name_en' => 'Old Airport', 'name_ar' => 'المطار القديم'],
                    ['name_en' => 'Najma', 'name_ar' => 'النجمة'],
                    ['name_en' => 'Mushaireb', 'name_ar' => 'مشيرب'],
                    ['name_en' => 'Al Souq', 'name_ar' => 'السوق'],
                    ['name_en' => 'Al Bidda', 'name_ar' => 'البدع'],
                    ['name_en' => 'Rumeilah', 'name_ar' => 'الرميلة'],
                    ['name_en' => 'Al Jasra', 'name_ar' => 'الجسرة'],
                    ['name_en' => 'Wadi Al Sail', 'name_ar' => 'وادي السيل'],
                    ['name_en' => 'Umm Ghuwailina', 'name_ar' => 'أم غويلينة'],
                    ['name_en' => 'Al Muntazah', 'name_ar' => 'المنتزه'],
                    ['name_en' => 'Al Markhiya', 'name_ar' => 'المرخية'],
                    ['name_en' => 'Fereej Al Amir', 'name_ar' => 'فريج الأمير'],
                    ['name_en' => 'Al Hilal', 'name_ar' => 'الهلال'],
                ]
            ],
            [
                'name_en' => 'Al Rayyan',
                'name_ar' => 'الريان',
                'cities' => [
                    ['name_en' => 'Al Rayyan City', 'name_ar' => 'مدينة الريان'],
                    ['name_en' => 'Education City', 'name_ar' => 'المدينة التعليمية'],
                    ['name_en' => 'Al Wajba', 'name_ar' => 'الوجبة'],
                    ['name_en' => 'Al Gharrafa', 'name_ar' => 'الغرافة'],
                    ['name_en' => 'Al Aziziya', 'name_ar' => 'العزيزية'],
                    ['name_en' => 'Ain Khaled', 'name_ar' => 'عين خالد'],
                    ['name_en' => 'Al Waab', 'name_ar' => 'الوعب'],
                    ['name_en' => 'Muaither', 'name_ar' => 'معيذر'],
                    ['name_en' => 'Al Sailiya', 'name_ar' => 'السيلية'],
                    ['name_en' => 'Umm Al Seneem', 'name_ar' => 'أم السنيم'],
                    ['name_en' => 'Al Themaid', 'name_ar' => 'الذميد'],
                ]
            ],
            [
                'name_en' => 'Al Wakrah',
                'name_ar' => 'الوكرة',
                'cities' => [
                    ['name_en' => 'Al Wakrah City', 'name_ar' => 'مدينة الوكرة'],
                    ['name_en' => 'Al Wukair', 'name_ar' => 'الوكير'],
                    ['name_en' => 'Mesaieed', 'name_ar' => 'مسيعيد'],
                    ['name_en' => 'Al Khor', 'name_ar' => 'الخور'],
                    ['name_en' => 'Ezdan', 'name_ar' => 'إزدان'],
                    ['name_en' => 'Al Thumama', 'name_ar' => 'الثمامة'],
                ]
            ],
            [
                'name_en' => 'Al Khor',
                'name_ar' => 'الخور',
                'cities' => [
                    ['name_en' => 'Al Khor City', 'name_ar' => 'مدينة الخور'],
                    ['name_en' => 'Al Thakhira', 'name_ar' => 'الذخيرة'],
                    ['name_en' => 'Al Kharrara', 'name_ar' => 'الخرارة'],
                    ['name_en' => 'Ras Laffan', 'name_ar' => 'رأس لفان'],
                ]
            ],
            [
                'name_en' => 'Al Daayen',
                'name_ar' => 'الضعاين',
                'cities' => [
                    ['name_en' => 'Umm Salal', 'name_ar' => 'أم صلال'],
                    ['name_en' => 'Umm Salal Mohammed', 'name_ar' => 'أم صلال محمد'],
                    ['name_en' => 'Umm Salal Ali', 'name_ar' => 'أم صلال علي'],
                    ['name_en' => 'Lusail', 'name_ar' => 'لوسيل'],
                ]
            ],
            [
                'name_en' => 'Al Shamal',
                'name_ar' => 'الشمال',
                'cities' => [
                    ['name_en' => 'Madinat Al Shamal', 'name_ar' => 'مدينة الشمال'],
                    ['name_en' => 'Al Ruwais', 'name_ar' => 'الرويس'],
                    ['name_en' => 'Fuwayrit', 'name_ar' => 'فويرط'],
                ]
            ],
            [
                'name_en' => 'Al Shahaniya',
                'name_ar' => 'الشحانية',
                'cities' => [
                    ['name_en' => 'Al Shahaniya City', 'name_ar' => 'مدينة الشحانية'],
                    ['name_en' => 'Dukhan', 'name_ar' => 'دخان'],
                    ['name_en' => 'Al Jumayliyah', 'name_ar' => 'الجميلية'],
                ]
            ],
            [
                'name_en' => 'Umm Salal',
                'name_ar' => 'أم صلال',
                'cities' => [
                    ['name_en' => 'Umm Salal Mohammed', 'name_ar' => 'أم صلال محمد'],
                    ['name_en' => 'Al Kheesa', 'name_ar' => 'الخيسة'],
                ]
            ],
        ];

        foreach ($municipalities as $mun) {
            $govId = DB::table('governorates')->insertGetId([
                'country_id' => $countryId,
                'name_en' => $mun['name_en'],
                'name_ar' => $mun['name_ar'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            foreach ($mun['cities'] as $city) {
                DB::table('cities')->insert([
                    'governorate_id' => $govId,
                    'name_en' => $city['name_en'],
                    'name_ar' => $city['name_ar'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }

    private function seedOman($countryId)
    {
        $governorates = [
            [
                'name_en' => 'Muscat',
                'name_ar' => 'مسقط',
                'cities' => [
                    ['name_en' => 'Muscat City', 'name_ar' => 'مدينة مسقط'],
                    ['name_en' => 'Mutrah', 'name_ar' => 'مطرح'],
                    ['name_en' => 'Ruwi', 'name_ar' => 'روي'],
                    ['name_en' => 'Bawshar', 'name_ar' => 'بوشر'],
                    ['name_en' => 'Seeb', 'name_ar' => 'السيب'],
                    ['name_en' => 'Al Amerat', 'name_ar' => 'العامرات'],
                    ['name_en' => 'Qurm', 'name_ar' => 'القرم'],
                    ['name_en' => 'Al Khuwair', 'name_ar' => 'الخوير'],
                    ['name_en' => 'Al Ghubrah', 'name_ar' => 'الغبرة'],
                    ['name_en' => 'Azaiba', 'name_ar' => 'العذيبة'],
                    ['name_en' => 'Madinat Qaboos', 'name_ar' => 'مدينة قابوس'],
                    ['name_en' => 'Al Hail', 'name_ar' => 'الحيل'],
                ]
            ],
            [
                'name_en' => 'Dhofar',
                'name_ar' => 'ظفار',
                'cities' => [
                    ['name_en' => 'Salalah', 'name_ar' => 'صلالة'],
                    ['name_en' => 'Taqah', 'name_ar' => 'طاقة'],
                    ['name_en' => 'Mirbat', 'name_ar' => 'مرباط'],
                    ['name_en' => 'Rakhyut', 'name_ar' => 'رخيوت'],
                    ['name_en' => 'Thumrait', 'name_ar' => 'ثمريت'],
                    ['name_en' => 'Shalim', 'name_ar' => 'شليم'],
                ]
            ],
            [
                'name_en' => 'Musandam',
                'name_ar' => 'مسندم',
                'cities' => [
                    ['name_en' => 'Khasab', 'name_ar' => 'خصب'],
                    ['name_en' => 'Bukha', 'name_ar' => 'بخا'],
                    ['name_en' => 'Daba', 'name_ar' => 'دبا'],
                    ['name_en' => 'Madha', 'name_ar' => 'مدحاء'],
                ]
            ],
            [
                'name_en' => 'Al Buraimi',
                'name_ar' => 'البريمي',
                'cities' => [
                    ['name_en' => 'Al Buraimi City', 'name_ar' => 'مدينة البريمي'],
                    ['name_en' => 'Mahadah', 'name_ar' => 'محضة'],
                    ['name_en' => 'As Sunaynah', 'name_ar' => 'السنينة'],
                ]
            ],
            [
                'name_en' => 'Ad Dakhiliyah',
                'name_ar' => 'الداخلية',
                'cities' => [
                    ['name_en' => 'Nizwa', 'name_ar' => 'نزوى'],
                    ['name_en' => 'Bahla', 'name_ar' => 'بهلاء'],
                    ['name_en' => 'Manah', 'name_ar' => 'منح'],
                    ['name_en' => 'Adam', 'name_ar' => 'آدم'],
                    ['name_en' => 'Al Hamra', 'name_ar' => 'الحمراء'],
                    ['name_en' => 'Izki', 'name_ar' => 'إزكي'],
                    ['name_en' => 'Samail', 'name_ar' => 'سمائل'],
                    ['name_en' => 'Bidbid', 'name_ar' => 'بدبد'],
                ]
            ],
            [
                'name_en' => 'Ad Dhahirah',
                'name_ar' => 'الظاهرة',
                'cities' => [
                    ['name_en' => 'Ibri', 'name_ar' => 'عبري'],
                    ['name_en' => 'Yanqul', 'name_ar' => 'ينقل'],
                    ['name_en' => 'Dhank', 'name_ar' => 'ضنك'],
                ]
            ],
            [
                'name_en' => 'Ash Sharqiyah North',
                'name_ar' => 'الشرقية الشمالية',
                'cities' => [
                    ['name_en' => 'Ibra', 'name_ar' => 'إبراء'],
                    ['name_en' => 'Al Mudhaybi', 'name_ar' => 'المضيبي'],
                    ['name_en' => 'Al Qabil', 'name_ar' => 'القابل'],
                    ['name_en' => 'Wadi Bani Khalid', 'name_ar' => 'وادي بني خالد'],
                    ['name_en' => 'Dima Wa Tahieen', 'name_ar' => 'دماء والطائيين'],
                ]
            ],
            [
                'name_en' => 'Ash Sharqiyah South',
                'name_ar' => 'الشرقية الجنوبية',
                'cities' => [
                    ['name_en' => 'Sur', 'name_ar' => 'صور'],
                    ['name_en' => 'Al Kamil Wal Wafi', 'name_ar' => 'الكامل والوافي'],
                    ['name_en' => 'Jalan Bani Bu Hassan', 'name_ar' => 'جعلان بني بو حسن'],
                    ['name_en' => 'Jalan Bani Bu Ali', 'name_ar' => 'جعلان بني بو علي'],
                    ['name_en' => 'Masirah', 'name_ar' => 'مصيرة'],
                ]
            ],
            [
                'name_en' => 'Al Batinah North',
                'name_ar' => 'الباطنة الشمالية',
                'cities' => [
                    ['name_en' => 'Sohar', 'name_ar' => 'صحار'],
                    ['name_en' => 'Shinas', 'name_ar' => 'شناص'],
                    ['name_en' => 'Liwa', 'name_ar' => 'لوى'],
                    ['name_en' => 'Saham', 'name_ar' => 'صحم'],
                    ['name_en' => 'Al Khaburah', 'name_ar' => 'الخابورة'],
                    ['name_en' => 'As Suwayq', 'name_ar' => 'السويق'],
                ]
            ],
            [
                'name_en' => 'Al Batinah South',
                'name_ar' => 'الباطنة الجنوبية',
                'cities' => [
                    ['name_en' => 'Rustaq', 'name_ar' => 'الرستاق'],
                    ['name_en' => 'Al Awabi', 'name_ar' => 'العوابي'],
                    ['name_en' => 'Nakhal', 'name_ar' => 'نخل'],
                    ['name_en' => 'Wadi Al Maawil', 'name_ar' => 'وادي المعاول'],
                    ['name_en' => 'Barka', 'name_ar' => 'بركاء'],
                    ['name_en' => 'Al Musannah', 'name_ar' => 'المصنعة'],
                ]
            ],
            [
                'name_en' => 'Al Wusta',
                'name_ar' => 'الوسطى',
                'cities' => [
                    ['name_en' => 'Haima', 'name_ar' => 'هيماء'],
                    ['name_en' => 'Mahout', 'name_ar' => 'محوت'],
                    ['name_en' => 'Al Duqm', 'name_ar' => 'الدقم'],
                    ['name_en' => 'Al Jazir', 'name_ar' => 'الجازر'],
                ]
            ],
        ];

        foreach ($governorates as $gov) {
            $govId = DB::table('governorates')->insertGetId([
                'country_id' => $countryId,
                'name_en' => $gov['name_en'],
                'name_ar' => $gov['name_ar'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            foreach ($gov['cities'] as $city) {
                DB::table('cities')->insert([
                    'governorate_id' => $govId,
                    'name_en' => $city['name_en'],
                    'name_ar' => $city['name_ar'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }

    private function seedJordan($countryId)
    {
        $governorates = [
            [
                'name_en' => 'Amman',
                'name_ar' => 'عمّان',
                'cities' => [
                    ['name_en' => 'Amman City', 'name_ar' => 'مدينة عمان'],
                    ['name_en' => 'Wadi Al-Seer', 'name_ar' => 'وادي السير'],
                    ['name_en' => 'Al-Jizah', 'name_ar' => 'الجيزة'],
                    ['name_en' => 'Sahab', 'name_ar' => 'سحاب'],
                    ['name_en' => 'Al-Qweismeh', 'name_ar' => 'القويسمة'],
                    ['name_en' => 'Marka', 'name_ar' => 'ماركا'],
                    ['name_en' => 'Naour', 'name_ar' => 'ناعور'],
                    ['name_en' => 'Al-Muwaqqar', 'name_ar' => 'الموقر'],
                    ['name_en' => 'Shafa Badran', 'name_ar' => 'شفا بدران'],
                ]
            ],
            [
                'name_en' => 'Irbid',
                'name_ar' => 'إربد',
                'cities' => [
                    ['name_en' => 'Irbid City', 'name_ar' => 'مدينة إربد'],
                    ['name_en' => 'Ramtha', 'name_ar' => 'الرمثا'],
                    ['name_en' => 'Mafraq', 'name_ar' => 'المفرق'],
                    ['name_en' => 'Umm Qais', 'name_ar' => 'أم قيس'],
                    ['name_en' => 'Bani Kinanah', 'name_ar' => 'بني كنانة'],
                    ['name_en' => 'Koura', 'name_ar' => 'الكورة'],
                    ['name_en' => 'Taybeh', 'name_ar' => 'الطيبة'],
                    ['name_en' => 'Al-Wasatiyyah', 'name_ar' => 'الوسطية'],
                ]
            ],
            [
                'name_en' => 'Zarqa',
                'name_ar' => 'الزرقاء',
                'cities' => [
                    ['name_en' => 'Zarqa City', 'name_ar' => 'مدينة الزرقاء'],
                    ['name_en' => 'Russeifa', 'name_ar' => 'الرصيفة'],
                    ['name_en' => 'Hashimiya', 'name_ar' => 'الهاشمية'],
                    ['name_en' => 'Azraq', 'name_ar' => 'الأزرق'],
                ]
            ],
            [
                'name_en' => 'Balqa',
                'name_ar' => 'البلقاء',
                'cities' => [
                    ['name_en' => 'Salt', 'name_ar' => 'السلط'],
                    ['name_en' => 'Ain Al-Basha', 'name_ar' => 'عين الباشا'],
                    ['name_en' => 'Deir Alla', 'name_ar' => 'دير علا'],
                    ['name_en' => 'Mahis', 'name_ar' => 'ماحص'],
                    ['name_en' => 'Shuneh', 'name_ar' => 'الشونة'],
                ]
            ],
            [
                'name_en' => 'Madaba',
                'name_ar' => 'مادبا',
                'cities' => [
                    ['name_en' => 'Madaba City', 'name_ar' => 'مدينة مادبا'],
                    ['name_en' => 'Dhiban', 'name_ar' => 'ذيبان'],
                    ['name_en' => 'Libb', 'name_ar' => 'لب'],
                ]
            ],
            [
                'name_en' => 'Karak',
                'name_ar' => 'الكرك',
                'cities' => [
                    ['name_en' => 'Karak City', 'name_ar' => 'مدينة الكرك'],
                    ['name_en' => 'Al-Qatraneh', 'name_ar' => 'القطرانة'],
                    ['name_en' => 'Ayi', 'name_ar' => 'عي'],
                    ['name_en' => 'Al-Mazar', 'name_ar' => 'المزار'],
                ]
            ],
            [
                'name_en' => 'Tafilah',
                'name_ar' => 'الطفيلة',
                'cities' => [
                    ['name_en' => 'Tafilah City', 'name_ar' => 'مدينة الطفيلة'],
                    ['name_en' => 'Busayra', 'name_ar' => 'بصيرا'],
                    ['name_en' => 'Hasa', 'name_ar' => 'الحسا'],
                ]
            ],
            [
                'name_en' => 'Maan',
                'name_ar' => 'معان',
                'cities' => [
                    ['name_en' => 'Maan City', 'name_ar' => 'مدينة معان'],
                    ['name_en' => 'Petra', 'name_ar' => 'البتراء'],
                    ['name_en' => 'Shoubak', 'name_ar' => 'الشوبك'],
                    ['name_en' => 'Wadi Musa', 'name_ar' => 'وادي موسى'],
                ]
            ],
            [
                'name_en' => 'Aqaba',
                'name_ar' => 'العقبة',
                'cities' => [
                    ['name_en' => 'Aqaba City', 'name_ar' => 'مدينة العقبة'],
                    ['name_en' => 'Wadi Araba', 'name_ar' => 'وادي عربة'],
                    ['name_en' => 'Quweira', 'name_ar' => 'القويرة'],
                ]
            ],
            [
                'name_en' => 'Mafraq',
                'name_ar' => 'المفرق',
                'cities' => [
                    ['name_en' => 'Mafraq City', 'name_ar' => 'مدينة المفرق'],
                    ['name_en' => 'Badia North East', 'name_ar' => 'البادية الشمالية الشرقية'],
                    ['name_en' => 'Ruwaished', 'name_ar' => 'الرويشد'],
                    ['name_en' => 'Manshiyat Bani Hassan', 'name_ar' => 'منشية بني حسن'],
                ]
            ],
            [
                'name_en' => 'Jerash',
                'name_ar' => 'جرش',
                'cities' => [
                    ['name_en' => 'Jerash City', 'name_ar' => 'مدينة جرش'],
                    ['name_en' => 'Sakib', 'name_ar' => 'صخيب'],
                    ['name_en' => 'Qafqafa', 'name_ar' => 'قفقفا'],
                ]
            ],
            [
                'name_en' => 'Ajloun',
                'name_ar' => 'عجلون',
                'cities' => [
                    ['name_en' => 'Ajloun City', 'name_ar' => 'مدينة عجلون'],
                    ['name_en' => 'Kufranjah', 'name_ar' => 'كفرنجة'],
                    ['name_en' => 'Anjara', 'name_ar' => 'عنجرة'],
                ]
            ],
        ];

        foreach ($governorates as $gov) {
            $govId = DB::table('governorates')->insertGetId([
                'country_id' => $countryId,
                'name_en' => $gov['name_en'],
                'name_ar' => $gov['name_ar'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            foreach ($gov['cities'] as $city) {
                DB::table('cities')->insert([
                    'governorate_id' => $govId,
                    'name_en' => $city['name_en'],
                    'name_ar' => $city['name_ar'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }

    private function seedLebanon($countryId)
    {
        $governorates = [
            [
                'name_en' => 'Beirut',
                'name_ar' => 'بيروت',
                'cities' => [
                    ['name_en' => 'Achrafieh', 'name_ar' => 'الأشرفية'],
                    ['name_en' => 'Bachoura', 'name_ar' => 'الباشورة'],
                    ['name_en' => 'Hamra', 'name_ar' => 'الحمرا'],
                    ['name_en' => 'Ras Beirut', 'name_ar' => 'رأس بيروت'],
                    ['name_en' => 'Verdun', 'name_ar' => 'فردان'],
                    ['name_en' => 'Mazraa', 'name_ar' => 'المزرعة'],
                    ['name_en' => 'Ain el Mraiseh', 'name_ar' => 'عين المريسة'],
                    ['name_en' => 'Mina El Hosn', 'name_ar' => 'مينا الحصن'],
                    ['name_en' => 'Moussaitbeh', 'name_ar' => 'المصيطبة'],
                    ['name_en' => 'Rmeil', 'name_ar' => 'الرميل'],
                    ['name_en' => 'Saifi', 'name_ar' => 'الصيفي'],
                    ['name_en' => 'Zuqaq al-Blat', 'name_ar' => 'زقاق البلاط'],
                ]
            ],
            [
                'name_en' => 'Mount Lebanon',
                'name_ar' => 'جبل لبنان',
                'cities' => [
                    ['name_en' => 'Baabda', 'name_ar' => 'بعبدا'],
                    ['name_en' => 'Aley', 'name_ar' => 'عاليه'],
                    ['name_en' => 'Jbeil', 'name_ar' => 'جبيل'],
                    ['name_en' => 'Keserwan', 'name_ar' => 'كسروان'],
                    ['name_en' => 'Metn', 'name_ar' => 'المتن'],
                    ['name_en' => 'Chouf', 'name_ar' => 'الشوف'],
                    ['name_en' => 'Jounieh', 'name_ar' => 'جونيه'],
                    ['name_en' => 'Beit Mery', 'name_ar' => 'بيت مري'],
                    ['name_en' => 'Broummana', 'name_ar' => 'برمانا'],
                    ['name_en' => 'Antelias', 'name_ar' => 'انطلياس'],
                    ['name_en' => 'Jal el Dib', 'name_ar' => 'جل الديب'],
                    ['name_en' => 'Dbayeh', 'name_ar' => 'الدبية'],
                    ['name_en' => 'Amchit', 'name_ar' => 'عمشيت'],
                    ['name_en' => 'Sarba', 'name_ar' => 'صربا'],
                    ['name_en' => 'Jounieh', 'name_ar' => 'جونية'],
                ]
            ],
            [
                'name_en' => 'North',
                'name_ar' => 'الشمال',
                'cities' => [
                    ['name_en' => 'Tripoli', 'name_ar' => 'طرابلس'],
                    ['name_en' => 'Zgharta', 'name_ar' => 'زغرتا'],
                    ['name_en' => 'Bcharreh', 'name_ar' => 'بشري'],
                    ['name_en' => 'Koura', 'name_ar' => 'الكورة'],
                    ['name_en' => 'Batroun', 'name_ar' => 'البترون'],
                    ['name_en' => 'Miniyeh-Danniyeh', 'name_ar' => 'المنية-الضنية'],
                    ['name_en' => 'Akkar', 'name_ar' => 'عكار'],
                    ['name_en' => 'Mina', 'name_ar' => 'الميناء'],
                ]
            ],
            [
                'name_en' => 'South',
                'name_ar' => 'الجنوب',
                'cities' => [
                    ['name_en' => 'Sidon', 'name_ar' => 'صيدا'],
                    ['name_en' => 'Tyre', 'name_ar' => 'صور'],
                    ['name_en' => 'Jezzine', 'name_ar' => 'جزين'],
                    ['name_en' => 'Nabatieh', 'name_ar' => 'النبطية'],
                    ['name_en' => 'Hasbaya', 'name_ar' => 'حاصبيا'],
                    ['name_en' => 'Marjeyoun', 'name_ar' => 'مرجعيون'],
                    ['name_en' => 'Bent Jbeil', 'name_ar' => 'بنت جبيل'],
                ]
            ],
            [
                'name_en' => 'Beqaa',
                'name_ar' => 'البقاع',
                'cities' => [
                    ['name_en' => 'Zahleh', 'name_ar' => 'زحلة'],
                    ['name_en' => 'Baalbek', 'name_ar' => 'بعلبك'],
                    ['name_en' => 'Hermel', 'name_ar' => 'الهرمل'],
                    ['name_en' => 'Rashaya', 'name_ar' => 'راشيا'],
                    ['name_en' => 'West Beqaa', 'name_ar' => 'البقاع الغربي'],
                    ['name_en' => 'Chtaura', 'name_ar' => 'شتورا'],
                    ['name_en' => 'Anjar', 'name_ar' => 'عنجر'],
                ]
            ],
            [
                'name_en' => 'Nabatieh',
                'name_ar' => 'النبطية',
                'cities' => [
                    ['name_en' => 'Nabatieh City', 'name_ar' => 'مدينة النبطية'],
                    ['name_en' => 'Hasbaya', 'name_ar' => 'حاصبيا'],
                    ['name_en' => 'Marjeyoun', 'name_ar' => 'مرجعيون'],
                    ['name_en' => 'Bent Jbeil', 'name_ar' => 'بنت جبيل'],
                ]
            ],
        ];

        foreach ($governorates as $gov) {
            $govId = DB::table('governorates')->insertGetId([
                'country_id' => $countryId,
                'name_en' => $gov['name_en'],
                'name_ar' => $gov['name_ar'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            foreach ($gov['cities'] as $city) {
                DB::table('cities')->insert([
                    'governorate_id' => $govId,
                    'name_en' => $city['name_en'],
                    'name_ar' => $city['name_ar'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }

    private function seedIraq($countryId)
    {
        // Iraq implementation with all governorates and cities
        // This would be implemented similarly to other countries
    }

    private function seedSyria($countryId)
    {
        // Syria implementation with all governorates and cities
        // This would be implemented similarly to other countries
    }

    private function seedPalestine($countryId)
    {
        // Palestine implementation with all governorates and cities
        // This would be implemented similarly to other countries
    }

    private function seedYemen($countryId)
    {
        // Yemen implementation with all governorates and cities
        // This would be implemented similarly to other countries
    }

    private function seedUSA()
    {
        $usaId = DB::table('countries')->insertGetId([
            'name_en' => 'United States',
            'name_ar' => 'الولايات المتحدة الأمريكية',
            'code' => 'US',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Add all 50 US states with major cities
        // This would be implemented with all cities
    }

    private function seedOtherCountries()
    {
        // Add remaining ~185 countries with major cities only
        $countries = [
            ['name_en' => 'Afghanistan', 'name_ar' => 'أفغانستان', 'code' => 'AF'],
            ['name_en' => 'Albania', 'name_ar' => 'ألبانيا', 'code' => 'AL'],
            ['name_en' => 'Algeria', 'name_ar' => 'الجزائر', 'code' => 'DZ'],
            // ... continue with all countries
        ];

        foreach ($countries as $country) {
            $countryId = DB::table('countries')->insertGetId([
                'name_en' => $country['name_en'],
                'name_ar' => $country['name_ar'],
                'code' => $country['code'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // Add major governorates/states and cities for each
        }
    }
}

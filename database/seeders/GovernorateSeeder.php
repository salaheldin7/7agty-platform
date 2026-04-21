<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class GovernorateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Use framework-level FK toggling so truncation works on MySQL and PostgreSQL.
        Schema::disableForeignKeyConstraints();

        // Clear existing governorates to prevent duplicates
        DB::table('governorates')->truncate();

        // Re-enable foreign key checks
        Schema::enableForeignKeyConstraints();
        
        // Get country IDs
        $egyptId = DB::table('countries')->where('code', 'EG')->value('id');
        $uaeId = DB::table('countries')->where('code', 'AE')->value('id');
        $saudiId = DB::table('countries')->where('code', 'SA')->value('id');
        
        if (!$egyptId) {
            echo "Error: Egypt country not found. Please run CountriesSeeder first.\n";
            return;
        }

        $governorates = [
            // Egypt - 28 Governorates
            ['country_id' => $egyptId, 'name_en' => 'Cairo', 'name_ar' => 'القاهرة', 'code' => 'CAI'],
            ['country_id' => $egyptId, 'name_en' => 'Alexandria', 'name_ar' => 'الإسكندرية', 'code' => 'ALX'],
            ['country_id' => $egyptId, 'name_en' => 'Giza', 'name_ar' => 'الجيزة', 'code' => 'GIZ'],
            ['country_id' => $egyptId, 'name_en' => 'Qalyubia', 'name_ar' => 'القليوبية', 'code' => 'QLY'],
            ['country_id' => $egyptId, 'name_en' => 'Port Said', 'name_ar' => 'بورسعيد', 'code' => 'PTS'],
            ['country_id' => $egyptId, 'name_en' => 'Suez', 'name_ar' => 'السويس', 'code' => 'SUZ'],
            ['country_id' => $egyptId, 'name_en' => 'Luxor', 'name_ar' => 'الأقصر', 'code' => 'LXR'],
            ['country_id' => $egyptId, 'name_en' => 'Aswan', 'name_ar' => 'أسوان', 'code' => 'ASN'],
            ['country_id' => $egyptId, 'name_en' => 'Asyut', 'name_ar' => 'أسيوط', 'code' => 'AST'],
            ['country_id' => $egyptId, 'name_en' => 'Beheira', 'name_ar' => 'البحيرة', 'code' => 'BHR'],
            ['country_id' => $egyptId, 'name_en' => 'Beni Suef', 'name_ar' => 'بني سويف', 'code' => 'BNS'],
            ['country_id' => $egyptId, 'name_en' => 'Dakahlia', 'name_ar' => 'الدقهلية', 'code' => 'DKH'],
            ['country_id' => $egyptId, 'name_en' => 'Damietta', 'name_ar' => 'دمياط', 'code' => 'DMT'],
            ['country_id' => $egyptId, 'name_en' => 'Fayyum', 'name_ar' => 'الفيوم', 'code' => 'FYM'],
            ['country_id' => $egyptId, 'name_en' => 'Gharbia', 'name_ar' => 'الغربية', 'code' => 'GHR'],
            ['country_id' => $egyptId, 'name_en' => 'Ismailia', 'name_ar' => 'الإسماعيلية', 'code' => 'ISM'],
            ['country_id' => $egyptId, 'name_en' => 'Kafr el-Sheikh', 'name_ar' => 'كفر الشيخ', 'code' => 'KFS'],
            ['country_id' => $egyptId, 'name_en' => 'Matrouh', 'name_ar' => 'مطروح', 'code' => 'MTR'],
            ['country_id' => $egyptId, 'name_en' => 'Minya', 'name_ar' => 'المنيا', 'code' => 'MNY'],
            ['country_id' => $egyptId, 'name_en' => 'Monufia', 'name_ar' => 'المنوفية', 'code' => 'MNF'],
            ['country_id' => $egyptId, 'name_en' => 'New Valley', 'name_ar' => 'الوادي الجديد', 'code' => 'WAD'],
            ['country_id' => $egyptId, 'name_en' => 'North Sinai', 'name_ar' => 'شمال سيناء', 'code' => 'NSI'],
            ['country_id' => $egyptId, 'name_en' => 'Qena', 'name_ar' => 'قنا', 'code' => 'QNA'],
            ['country_id' => $egyptId, 'name_en' => 'Red Sea', 'name_ar' => 'البحر الأحمر', 'code' => 'SEA'],
            ['country_id' => $egyptId, 'name_en' => 'Sharqia', 'name_ar' => 'الشرقية', 'code' => 'SHR'],
            ['country_id' => $egyptId, 'name_en' => 'Sohag', 'name_ar' => 'سوهاج', 'code' => 'SOH'],
            ['country_id' => $egyptId, 'name_en' => 'South Sinai', 'name_ar' => 'جنوب سيناء', 'code' => 'SSI'],
            ['country_id' => $egyptId, 'name_en' => 'New Administrative Capital', 'name_ar' => 'العاصمة الإدارية الجديدة', 'code' => 'NAC'],
        ];

        // Add UAE Emirates if UAE exists
        if ($uaeId) {
            $governorates = array_merge($governorates, [
                ['country_id' => $uaeId, 'name_en' => 'Abu Dhabi', 'name_ar' => 'أبوظبي', 'code' => 'AZ'],
                ['country_id' => $uaeId, 'name_en' => 'Dubai', 'name_ar' => 'دبي', 'code' => 'DU'],
                ['country_id' => $uaeId, 'name_en' => 'Sharjah', 'name_ar' => 'الشارقة', 'code' => 'SH'],
                ['country_id' => $uaeId, 'name_en' => 'Ajman', 'name_ar' => 'عجمان', 'code' => 'AJ'],
                ['country_id' => $uaeId, 'name_en' => 'Umm Al Quwain', 'name_ar' => 'أم القيوين', 'code' => 'UQ'],
                ['country_id' => $uaeId, 'name_en' => 'Ras Al Khaimah', 'name_ar' => 'رأس الخيمة', 'code' => 'RK'],
                ['country_id' => $uaeId, 'name_en' => 'Fujairah', 'name_ar' => 'الفجيرة', 'code' => 'FU'],
            ]);
        }

        // Add Saudi Arabia Regions if Saudi exists
        if ($saudiId) {
            $governorates = array_merge($governorates, [
                ['country_id' => $saudiId, 'name_en' => 'Riyadh', 'name_ar' => 'الرياض', 'code' => 'RD'],
                ['country_id' => $saudiId, 'name_en' => 'Makkah', 'name_ar' => 'مكة المكرمة', 'code' => 'MK'],
                ['country_id' => $saudiId, 'name_en' => 'Madinah', 'name_ar' => 'المدينة المنورة', 'code' => 'MD'],
                ['country_id' => $saudiId, 'name_en' => 'Eastern Province', 'name_ar' => 'المنطقة الشرقية', 'code' => 'EP'],
                ['country_id' => $saudiId, 'name_en' => 'Asir', 'name_ar' => 'عسير', 'code' => 'AS'],
                ['country_id' => $saudiId, 'name_en' => 'Tabuk', 'name_ar' => 'تبوك', 'code' => 'TB'],
                ['country_id' => $saudiId, 'name_en' => 'Qassim', 'name_ar' => 'القصيم', 'code' => 'QS'],
                ['country_id' => $saudiId, 'name_en' => 'Hail', 'name_ar' => 'حائل', 'code' => 'HL'],
                ['country_id' => $saudiId, 'name_en' => 'Northern Borders', 'name_ar' => 'الحدود الشمالية', 'code' => 'NB'],
                ['country_id' => $saudiId, 'name_en' => 'Jazan', 'name_ar' => 'جازان', 'code' => 'JZ'],
                ['country_id' => $saudiId, 'name_en' => 'Najran', 'name_ar' => 'نجران', 'code' => 'NJ'],
                ['country_id' => $saudiId, 'name_en' => 'Al Bahah', 'name_ar' => 'الباحة', 'code' => 'BH'],
                ['country_id' => $saudiId, 'name_en' => 'Al Jawf', 'name_ar' => 'الجوف', 'code' => 'JF'],
            ]);
        }

        foreach ($governorates as $governorate) {
            DB::table('governorates')->insert([
                'country_id' => $governorate['country_id'],
                'name_en' => $governorate['name_en'],
                'name_ar' => $governorate['name_ar'],
                'code' => $governorate['code'],
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}

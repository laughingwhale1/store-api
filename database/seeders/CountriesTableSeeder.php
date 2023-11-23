<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CountriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('countries')->updateOrInsert([
            ['code' => 'US', 'name' => 'United States', 'states' => json_encode(['CA' => 'California', 'TX' => 'Texas'])],
            ['code' => 'GB', 'name' => 'United Kingdom', 'states' => null],
        ]);
    }
}

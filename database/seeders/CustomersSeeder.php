<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CustomersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('customers')->insert([
            [
                'first_name' => 'John',
                'last_name' => 'Doe',
                'phone' => '123-456-7890',
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // ... Add more customer records as needed
        ]);
    }
}

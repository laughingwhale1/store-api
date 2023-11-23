<?php

namespace Database\Seeders;

use App\Models\CustomerAddress;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CustomerAddressSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('customer_addresses')->insert([
            'type' => 'Example Type',
            'address1' => '123 Main St',
            'address2' => 'Apt 4',
            'city' => 'Anytown',
            'state' => 'State',
            'zipcode' => '12345',
            'country_code' => 'US',
            'customer_id' => 1,
            'user_id' => 1,
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}

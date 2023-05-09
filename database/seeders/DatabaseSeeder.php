<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        collect([
            [
                'name' => 'anjas',
                'username' => 'anjas012',
                'email' => 'anjas@gmail.com',
                'password' => bcrypt('password'),
            ],
            [
                'name' => 'cita',
                'username' => 'cita00',
                'email' => 'cita@gmail.com',
                'password' => bcrypt('password'),
            ],
        ])->each(fn ($user) => User::create($user));

        User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}

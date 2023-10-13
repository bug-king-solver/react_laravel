<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Book;
use Faker\Generator as Faker;

$factory->define(Book::class, function (Faker $faker) {
    return [
        'title' => $faker->word,
        'author' => $faker->name,
        'body' => $faker->sentence,
        'status' => $faker->boolean,
    ];
});
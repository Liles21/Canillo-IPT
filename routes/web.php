<?php

use Illuminate\Support\Facades\Route;

Route::get('/{any}', function () {
    return view('welcome'); // Pwede nimo ilisan ang 'welcome' ug uban pa nga Blade file
})->where('any', '.*');

<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::group(['middleware' => ['auth', 'verified']], function () {

    Route::delete('/user', \App\Http\Controllers\Auth\DeleteAccountsController::class)->name('current-user.destroy');
    
    Route::delete('/user/logout-sessions', \App\Http\Controllers\Auth\LogoutSessionsController::class)->name('logout-sessions.destroy');
    
    Route::get('/user/account', \App\Http\Controllers\Auth\User\AccountController::class)->name('user.account');
    
    Route::get('/dashboard', \App\Http\Controllers\DashboardController::class)->name('dashboard');
    
});

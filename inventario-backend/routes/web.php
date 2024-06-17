<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AuthController;

Route::post('/products', [AuthController::class, 'store'])->middleware('web');
Route::get('/products', [ProductController::class, 'index']);
Route::put('/products/{id}', [ProductController::class, 'update']); 
Route::delete('/products/{id}', [ProductController::class, 'destroy']);


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/product-count', [ProductController::class, 'getProductCount']);
Route::get('/product-count2', [ProductController::class, 'getProductCount2']);
Route::get('/product-statistics', [ProductController::class, 'getProductStatistics']);






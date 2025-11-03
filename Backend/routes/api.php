<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MessagesController;

Route::middleware(['auth:sanctum'])->group(function (){
    
});
Route::middleware('throttle:10,1')->post('/sendMessage', [MessagesController::class, 'store']);

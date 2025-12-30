<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MessagesController;
use App\Http\Controllers\ProfileController;


Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function() {
    Route::get('/messages', [MessagesController::class, 'index']);
    Route::patch('/messages/{id}/read', [MessagesController::class, 'markAsRead']);
    Route::delete('/messages/{message}', [MessagesController::class, 'destroy']);
    Route::put('/profile', [ProfileController::class, 'update']);
});

Route::middleware('throttle:10,1')->post('/sendMessage', [MessagesController::class, 'store']);

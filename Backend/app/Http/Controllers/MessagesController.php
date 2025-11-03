<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Message;
use Illuminate\Http\Response;

class MessagesController extends Controller
{
    public function store(Request $request): Response
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255'],
            'message' => ['required', 'string', 'max:1000'],
        ]);

        $message = message::create([
            'name' => $request->name,
            'email' => $request->email,
            'message' => $request->message,
            'read' => 0,
        ]);

        return response()->noContent();
    }
}

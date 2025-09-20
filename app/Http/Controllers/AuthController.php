<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Signup;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Handle a login request.
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = Signup::where('email', $request->input('email'))->first();

        if (! $user || ! Hash::check($request->input('password'), $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        // Hide password before returning
        $user->makeHidden(['password']);

        return response()->json([
            'message' => 'Login successful',
            'data' => $user,
        ], 200);
    }
}

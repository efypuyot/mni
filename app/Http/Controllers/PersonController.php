<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Person;

class PersonController extends Controller
{
    public function index()
    {
        return Person::latest()->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'first_name'=>'required',
            'last_name'=>'required'
        ]);

        Person::create([
            'first_name'=>$request->first_name,
            'last_name'=>$request->last_name
        ]);

        return response()->json([
            'message'=>'saved'
        ]);
    }
}

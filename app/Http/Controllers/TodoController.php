<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Todo;

class TodoController extends Controller
{
    public function index()
    {
        return response()->json(Todo::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'task' => 'required|string',
            'completed' => 'required|boolean',
        ]);

        $todo = Todo::create($request->all());

        return response()->json($todo, 201);
    }

    public function update(Request $request, $id)
    {
        $todo = Todo::findOrFail($id)->update($request->all());

        return response()->json($todo);
    }

    public function destroy($id)
    {
        Todo::findOrFail($id)->delete();
        
        return response()->json(null, 204);
    }
}

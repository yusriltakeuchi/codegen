<?php

namespace App\Http\Controllers;

use App\Models\${NAME_PASCAL_CASE};
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ${NAME_PASCAL_CASE}Controller extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $${NAME_PLURAL_CAMEL_CASE} = ${NAME_PASCAL_CASE}::latest()->paginate();

        return response()->json($${NAME_PLURAL_CAMEL_CASE});
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        $${NAME_CAMEL_CASE} = ${NAME_PASCAL_CASE}::create($validated);

        return response()->json($${NAME_CAMEL_CASE}, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(${NAME_PASCAL_CASE} $${NAME_CAMEL_CASE}): JsonResponse
    {
        return response()->json($${NAME_CAMEL_CASE});
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ${NAME_PASCAL_CASE} $${NAME_CAMEL_CASE}): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['sometimes', 'string', 'max:255'],
        ]);

        $${NAME_CAMEL_CASE}->update($validated);

        return response()->json($${NAME_CAMEL_CASE});
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(${NAME_PASCAL_CASE} $${NAME_CAMEL_CASE}): JsonResponse
    {
        $${NAME_CAMEL_CASE}->delete();

        return response()->json(null, 204);
    }
}

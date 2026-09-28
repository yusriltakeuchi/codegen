<?php

namespace App\Services;

use App\Models\${NAME_PASCAL_CASE};
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ${NAME_PASCAL_CASE}Service
{
    /**
     * Get paginated list of ${NAME_PLURAL_SNAKE_CASE}.
     */
    public function paginate(int $perPage = 15): LengthAwarePaginator
    {
        return ${NAME_PASCAL_CASE}::latest()->paginate($perPage);
    }

    /**
     * Create a new ${NAME_PASCAL_CASE} record.
     */
    public function create(array $data): ${NAME_PASCAL_CASE}
    {
        return DB::transaction(function () use ($data) {
            $${NAME_CAMEL_CASE} = ${NAME_PASCAL_CASE}::create($data);

            Log::info('${NAME_PASCAL_CASE} created', ['id' => $${NAME_CAMEL_CASE}->id]);

            return $${NAME_CAMEL_CASE};
        });
    }

    /**
     * Update an existing ${NAME_PASCAL_CASE} record.
     */
    public function update(${NAME_PASCAL_CASE} $${NAME_CAMEL_CASE}, array $data): ${NAME_PASCAL_CASE}
    {
        return DB::transaction(function () use ($${NAME_CAMEL_CASE}, $data) {
            $${NAME_CAMEL_CASE}->update($data);

            Log::info('${NAME_PASCAL_CASE} updated', ['id' => $${NAME_CAMEL_CASE}->id]);

            return $${NAME_CAMEL_CASE}->fresh();
        });
    }

    /**
     * Delete a ${NAME_PASCAL_CASE} record.
     */
    public function delete(${NAME_PASCAL_CASE} $${NAME_CAMEL_CASE}): bool
    {
        return DB::transaction(function () use ($${NAME_CAMEL_CASE}) {
            $deleted = (bool) $${NAME_CAMEL_CASE}->delete();

            Log::info('${NAME_PASCAL_CASE} deleted', ['id' => $${NAME_CAMEL_CASE}->id]);

            return $deleted;
        });
    }
}

<?php

namespace App\Repositories\Contracts;

use App\Models\${NAME_PASCAL_CASE};
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

interface ${NAME_PASCAL_CASE}RepositoryInterface
{
    /**
     * Get all ${NAME_PLURAL_SNAKE_CASE}.
     */
    public function all(): Collection;

    /**
     * Get paginated ${NAME_PLURAL_SNAKE_CASE}.
     */
    public function paginate(int $perPage = 15): LengthAwarePaginator;

    /**
     * Find a ${NAME_PASCAL_CASE} by its primary key.
     */
    public function findById(int|string $id): ?${NAME_PASCAL_CASE};

    /**
     * Create a new ${NAME_PASCAL_CASE}.
     */
    public function create(array $data): ${NAME_PASCAL_CASE};

    /**
     * Update an existing ${NAME_PASCAL_CASE}.
     */
    public function update(int|string $id, array $data): bool;

    /**
     * Delete a ${NAME_PASCAL_CASE}.
     */
    public function delete(int|string $id): bool;
}

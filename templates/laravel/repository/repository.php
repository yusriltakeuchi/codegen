<?php

namespace App\Repositories;

use App\Models\${NAME_PASCAL_CASE};
use App\Repositories\Contracts\${NAME_PASCAL_CASE}RepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class ${NAME_PASCAL_CASE}Repository implements ${NAME_PASCAL_CASE}RepositoryInterface
{
    public function __construct(
        protected ${NAME_PASCAL_CASE} $model
    ) {}

    public function all(): Collection
    {
        return $this->model->all();
    }

    public function paginate(int $perPage = 15): LengthAwarePaginator
    {
        return $this->model->latest()->paginate($perPage);
    }

    public function findById(int|string $id): ?${NAME_PASCAL_CASE}
    {
        return $this->model->find($id);
    }

    public function create(array $data): ${NAME_PASCAL_CASE}
    {
        return $this->model->create($data);
    }

    public function update(int|string $id, array $data): bool
    {
        $record = $this->findById($id);

        return $record ? $record->update($data) : false;
    }

    public function delete(int|string $id): bool
    {
        $record = $this->findById($id);

        return $record ? (bool) $record->delete() : false;
    }
}

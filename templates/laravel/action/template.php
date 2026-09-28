<?php

namespace App\Actions;

use App\Models\${NAME_PASCAL_CASE};
use Illuminate\Support\Facades\DB;

class ${NAME_PASCAL_CASE}Action
{
    /**
     * Execute the action.
     */
    public function execute(array $data): ${NAME_PASCAL_CASE}
    {
        return DB::transaction(function () use ($data) {
            return ${NAME_PASCAL_CASE}::create($data);
        });
    }

    /**
     * Shorthand invocation support.
     */
    public function __invoke(array $data): ${NAME_PASCAL_CASE}
    {
        return $this->execute($data);
    }
}

<?php

namespace App\Features;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Str;

trait HasProfilePhoto
{
    public function avatar(): Attribute
    {
        return new Attribute(fn () => $this->defaultAvatar());
    }

    protected function defaultAvatar()
    {
        $name = $this->email ?? ($this->name ?? Str::uuid());

        return "https://unavatar.io/{$name}?fallback=https://ui-avatars.com/api?name={$this->name}&color=7F9CF4&background=EBF4FF&format=svg";
    }
}

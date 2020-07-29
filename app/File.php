<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    //
    public $timestamps = false;
    public static function store($school_id, $path) {
        $self = new self();
        $self->school_id = $school_id;
        $self->path = $path;
        $self->save();
    }
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Laravel\Cashier\Billable;

class School extends Model
{
    //
    use Billable;

    public function users()
    {
        return $this->hasMany('App\User');
    }

    public function files()
    {
        return $this->hasMany('App\Files');
    }

    public static function checkExist($name, $email) {
        $count = self::query()->where('name', trim($name))->orWhere('email', trim($email))->count();
        return $count > 0;
    }

    public static function saveInfo($name, $email, $logo_path = '', $card_last_four = '') {

        $self = new self();
        $self->name = $name;
        $self->email = $email;
        $self->logo_path = $logo_path;
//        $self->stripe_id = ''; // should store token or something like this when using other gateway
//        $self->card_brand = '';
        $self->card_last_four = $card_last_four;
//        $self->trial_ends_at = ''; // not too sure how to use it
        $self->save();

        return $self;
    }
}

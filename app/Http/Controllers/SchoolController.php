<?php

namespace App\Http\Controllers;

use App\File;
use App\School;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManagerStatic as Image;
use Illuminate\Support\Facades\Validator;

class SchoolController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('school.register');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
        dd('hey, here am I');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // todo: validator
//        $validator = Validator::make($request->all(), [
//            'name' => 'required|max:100',
//            'email' => 'required|email:rfc,dns',
//        ]);
//
//        if ($validator->fails()) {
//            return response()->json(['errors'=>$validator->errors()]);
//        }

        $card_last_four = '';

        if ($request->has('card')) {
            $card_number = $request->get('card')['number'];
            $card_last_four = $card_number ? substr($card_number, -4) : '';
        }

        $school = false;
        // store school info
        if ($request->has('school')) {
            $_school = $request->get('school');

            // store school logo
            $logo_name = '';
            if($_school['logo'])
            {
                $image = $_school['logo'];
                $logo_name = time().'.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
                Image::make($image)->save(storage_path('temp/').$logo_name);
            }
            $school = School::saveInfo($_school['name'], $_school['email'], $logo_name, $card_last_four);
        }

        // store user info
        if ($request->has('user')) {
            $user = $request->get('user');
            User::create($user['username'], $user['password'], $school->id);
        }

        // store files
        if ($request->has('files')) {
            $files = $request->get('files');
            foreach ($files as $name => $file) {

                Storage::put('temp/'.$name, $file);

                File::store($school->id, $name);
            }
        }

        return response()->json([
            'message' => 'You school account has been registered successfully'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}

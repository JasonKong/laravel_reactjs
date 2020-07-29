<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Checkout\Session;
use Stripe\Stripe;

class StripePaymentController extends Controller
{
    /**
     * success response method.
     *
     * @return \Illuminate\Http\Response
     */
    public function stripe()
    {
        return view('stripe');
    }

    public function createCheckoutSession() {

        Stripe::setApiKey(env('STRIPE_SECRET'));

        $session = Session::create([
            'payment_method_types' => ['card'],
            'mode' => 'setup',
        //    'customer' => 'cus_FOsk5sbh3ZQpAU',
            'success_url' => route('stripe-success'),
            'cancel_url' => route('stripe-cancel'),
        ]);
        dd($session);
    }

    /**
     * success response method.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function stripePost(Request $request)
    {
        Stripe::setApiKey(env('STRIPE_SECRET'));

    //        Stripe\Charge::create ([
    //            "amount" => 100 * 100,
    //            "currency" => "nzd",
    //            "source" => $request->stripeToken,
    //            "description" => "Test payment from itsolutionstuff.com."
    //        ]);
    //
    //        Session::flash('success', 'Payment successful!');

        return back();
    }
}

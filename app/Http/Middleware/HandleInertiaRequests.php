<?php

namespace App\Http\Middleware;

use Inertia\Middleware;
use Illuminate\Http\Request;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function version(Request $request)
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function share(Request $request)
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => function () use ($request) {

                    if (!$user = $request->user()) {
                        return;
                    }

                    if (!\is_null($user->two_factor_secret) && \is_null($user->two_factor_confirmed_at)) {
                        $user->update(['two_factor_secret' => '', 'two_factor_recovery_codes']);
                    }

                    return $user->only('id', 'name', 'email', 'email_verified_at', 'avatar', 'two_factor_enabled');
                },
            ]
        ]);
    }
}

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="h-full bg-gray-100">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    {{-- Fonts --}}
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap">

    {{-- Styles --}}
    <link rel="stylesheet" href="{{ asset(mix('css/app.css')) }}">

    {{-- Scripts --}}
    <script type="text/javascript">
        window.ABSOLUTE_URL = {{ env('ABSOLUTE_URL', 'false') }};
    </script>

    <script src="{{ asset(mix('js/app.js')) }}" defer></script>

    @inertiaHead
</head>

<body class="font-sans antialiased h-full">
    @inertia

    @if (env('APP_DEBUG') == true)
        <script src="{{ asset(mix('/js/debug.js')) }}"></script>
    @endif
</body>

</html>

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Laravel React App</title>

    @viteReactRefresh
    
    @vite(['resources/js/index.jsx'])
</head>
<body style="margin: 0; font-family: sans-serif; background-color: #fcfcfc;">

    <div id="app"></div>

</body>
</html>
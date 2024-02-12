<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Laravel - Hello, World!</title>
        <!-- Styles -->
        <style>
            body {
                font-family: 'Nunito', sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
            }
            .hello {
                font-size: 15rem;
                font-weight: bold;
                color: teal;
            }
        </style>
    </head>
    <body class="antialiased">
        <div class="hello">
            Hello, world!
        </div>
    </body>
</html>

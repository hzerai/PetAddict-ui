# PetAddict

## Project is not yet responsive, its built on a 1920/1080 resolution screen. you might see the interface different for now.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

# Setup RabbitMQ server for real time interactions

docker run -d -p 15672:15672 -p 5672:5672 -p 15674:15674 --name rabbitmq --rm crochik/rabbitmq:3.7-stomp

## Host on a virtual server

eanble cors in symfony by uncommenting the cros line in index.php file

then

Run `.\remote.bat` 

## Host on github pages
install angular-cli-ghpages
use your username instead of hzerai and you repository insteadof PetAddict-ui
ng build --prod --base-href "https://hzerai.github.io/PetAddict-ui/"
npx angular-cli-ghpages --dir  dist/front --repo  "https://github.com/hzerai/PetAddict-ui"



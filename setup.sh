#! /bin/bash
mkdir -p app/
mkdir -p app/components/
mkdir -p app/controllers/
mkdir -p app/helpers/
mkdir -p app/models/
mkdir -p app/routes/
mkdir -p app/templates/
mkdir -p app/views/
mkdir -p vendor/

touch app/app.js
touch app/router.js
touch app/store.js

wget http://code.jquery.com/jquery-2.0.3.min.js
wget http://builds.emberjs.com/handlebars-1.0.0.js
wget http://cdnjs.cloudflare.com/ajax/libs/ember.js/1.2.1/ember.js
wget http://builds.emberjs.com/tags/v1.0.0-beta.3/ember-data.js
wget http://momentjs.com/downloads/moment.min.js
wget https://raw2.github.com/rpflorence/ember-localstorage-adapter/master/localstorage_adapter.js

mv *.js vendor/
touch index.html
subl .
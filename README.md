# generator-susy-flask

> [Yeoman](http://yeoman.io) generator for [Flask](http://flask.pocoo.org/) & [Susy](http://susy.oddbird.net/) project


## Getting Started

### What is Yeoman?

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```bash
npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-susy-flask from npm, run:

```bash
npm install -g generator-susy-flask
```

Now that the generator is installed, create a directory for your new project

```bash
mkdir my-yo-project
$ cd my-yo-project
```

and then run:

```bash
yo susy-flask
```

### Run your project

After the project initialized, we need:

Run gulp tasks:

```bash
$ cd {your-app-name}
$ gulp
```

And remember to install python packages (install in virtualenv):

```bash
$ cd my-yo-project
$ virtualenv env
$ . env/bin/activate
$ pip install -r {your-app-name}/pip-requires.txt
$ python run.py
```

Finally your website will run at [http://localhost:8888/](http://localhost:8888/).

## Packages Used

* [Flask](http://flask.pocoo.org/)
* [Susy 2](http://susy.oddbird.net/)
* [Gulp.js](http://gulpjs.com/)
* [webpack](http://webpack.github.io/)
* [node-sass](https://github.com/sass/node-sass)

## License

MIT

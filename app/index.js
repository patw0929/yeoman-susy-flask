'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var SusyFlaskGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the awe-inspiring SusyFlask generator!'
    ));

    var prompts = [
      {
        name: 'appName',
        message: 'Name of this flask app',
        default: path.basename(process.cwd())
      }
    ];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;

      done();
    }.bind(this));
  },

  writing: {
    packages: function () {
      this.src.copy('_package.json', this.appName + '/package.json');
      this.src.copy('bowerrc', this.appName + '/.bowerrc');
      this.src.copy('_bower.json', this.appName + '/bower.json');
    },

    flask: function () {
      this.template('__init__.py', this.appName + '/__init__.py');
      this.template('pip-requires.txt', this.appName + '/pip-requires.txt');
      this.template('run.py', 'run.py');
      this.template('views.py', this.appName + '/views.py');
      this.template('default_settings.py', this.appName + '/default_settings.py');
      this.template('config/dev.cfg', this.appName + '/config/dev.cfg');
    },

    templates: function () {
      this.directory('templates', this.appName + '/templates');
    },

    assets: function () {
      this.directory('assets', this.appName + '/assets');
    },

    gulp: function () {
      this.src.copy('gulpfile.js', this.appName + '/gulpfile.js');
    },

    projectfiles: function () {
      this.src.copy('gitignore', '.gitignore');
      this.src.copy('editorconfig', '.editorconfig');
      this.src.copy('jshintrc', '.jshintrc');
      this.src.copy('scss-lint.yml', '.scss-lint.yml');
    }
  },

  end: function () {
    var projectdir = process.cwd() + '/' + this.appName;
    process.chdir(projectdir);

    this.installDependencies();
  }
});

module.exports = SusyFlaskGenerator;

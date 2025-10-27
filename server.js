const path = require('path');
const express = require('express');
const { engine } = require('express-handlebars');

const app = express();
const port = process.env.PORT || 3000;

app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
    helpers: {
      year: () => new Date().getFullYear()
    }
  })
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (_req, res) => {
  res.render('home', {
    companyName: 'Home Melbourne Pty Ltd',
    heroProducts: [
      {
        name: 'Coolroom Pannel',
        headline: 'Temperature confidence in bright white',
        description: 'Food-grade insulated panels with crisp white finishes and fast-locking seams for cold storage builds.',
        image: '/images/coolroom.jpg'
      },
      {
        name: 'Steel Beam',
        headline: 'Steel backbone with warm oxide tones',
        description: 'Structural beams fabricated to specification with protective brown oxide primers ready for site.',
        image: '/images/steel-beam.jpg'
      },
      {
        name: 'Fencing',
        headline: 'Perimeter solutions with signature orange',
        description: 'Modular fencing runs that balance privacy, airflow, and the signature Home Melbourne orange line.',
        image: '/images/fencing.jpg'
      },
      {
        name: 'Gate',
        headline: 'Gate assemblies finished to match',
        description: 'Swing and sliding gate systems supplied automation-ready with matching finishes to your fencing.',
        image: '/images/gate.jpg'
      }
    ],
    valuePillars: [
      {
        title: 'Cohesive Colour Systems',
        copy: 'Every product ships in harmonised white, orange, and brown finishes for instantly branded sites.'
      },
      {
        title: 'Precision Steelwork',
        copy: 'We cut, weld, and coat steel components in-house to guarantee alignment across your project milestones.'
      },
      {
        title: 'Wholesale Reliability',
        copy: 'Dedicated account specialists coordinate staging, dispatch, and documentation for commercial partners.'
      }
    ],
    marqueeMessages: [
      'Coolroom pannel kits ready to ship',
      'Structural steel beam fabrication',
      'Custom fencing powder coats',
      'Industrial gate automation options'
    ]
  });
});

app.listen(port, () => {
  const url = `http://localhost:${port}`;
  console.log(`Server listening at ${url}`);
});

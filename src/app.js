require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const INGREDIENTS = require('./ingredients')
const { NODE_ENV } = require('./config')

const app = express()

const morganOption = (NODE_ENV === 'production')
? 'tiny'
: 'common';

const USERS = [
  {email: 'test@email.com',
  password: 'password123'}
]

const RECIPES = [
  {title: 'Tomato Bisque Soup',
  ingredients: ['large onion', '4 cloves of garlic', '2 medium shallots', '4 tbsp each of olive oil and butter', '36 oz can of peeled tomatos', '36 oz can of tomato sauce', '2 cups heavy cream', '4 cups chicken broth'],
  instructions: ['Saute veggies until fragrant, around 5 minutes.', 'Add peeled tomatoes, chicken broth, and basil.', 'Bring everything to a boil, then let it all simmer for 15 minutes.', 'Use an immersion blender to smooth the soup.', 'Add the cream and tomato sauce, stirring to combine.', 'Eat some soup!']
},
{title: 'Egg in a Basket',
  ingredients: ['2 eggs', '2 thick slices of bread', '2 tbsp butter', 'seasonings to taste'],
  instructions: ['Melt butter in a large skillet.', 'Meanwhile, cut a circular hole in each slice of bread.', 'Add holed bread to the skillet, making sure to get butter on both sides.', 'Carefully crack an egg into each hole and let fry for 2-3 minutes.', 'CAREFULLY flip the bread slices, and allow the egg to cook for about 30 seconds more.', 'Eat!']
},
{title: 'Dummy Recipe',
  ingredients: ['bananas', 'chocolate', 'ice cream'],
  instructions: ['Eat the bananas.', 'Eat the chocolate.', 'Eat the ice cream.', 'Go to the gym!']
}
]

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())
app.use(function errorHandler(error, req, res, next) {
       let response
       if (NODE_ENV === 'production') {
         response = { error: { message: 'server error' } }
       } else {
         console.error(error)
         response = { message: error.message, error }
       }
       res.status(500).json(response)
     })

     app.get('/ingredients', (req, res) => {
      const ingredient = req.query.ingredient
  
      if(!ingredient) {
        return res.status(400).send('Please provide an ingredient')
      }
  
      const ingredientMessage = `The ingredient you chose was ${ingredient}.`
  
      res.send(INGREDIENTS)
       })


app.get('/', (req, res) => {
      res.send(RECIPES)
      
       })

app.get('/users', (req, res) => {
      res.send(USERS)
      
       })

     



module.exports = app
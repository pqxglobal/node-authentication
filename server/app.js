const { loadNuxt, build } = require('nuxt')

const app = require('express')()
const bodyParser = require('body-parser')
const isDev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000

async function start() {
    // We get Nuxt instance
    const nuxt = await loadNuxt(isDev ? 'dev' : 'start')

    // Render every route with Nuxt
    app.use(nuxt.render)

    // Build only in dev mode with hot-reloading
    if (isDev) {
        build(nuxt)
    }

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))
    
    app.post('/api/users', (req, res) => {
        console.log(req.body)
    })

    // Listen the server
    app.listen(port, '0.0.0.0')
    console.log('Server listening on `localhost:' + port + '`.')

    console.log('please work')
}

start()
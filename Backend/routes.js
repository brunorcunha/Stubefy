import { Router } from 'express'

import MusicController from './app/controllers/Music'

const routes = new Router()

routes.get('/music', MusicController.index)
routes.get('/stream', MusicController.stream)

export default routes

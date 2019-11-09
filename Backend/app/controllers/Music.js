import ytdl from 'ytdl-core'
import { YTSearcher } from 'ytsearcher'
import tokens from '../config/tokens'

class MusicController {
  async index (req, res) {
    const { q, t } = req.query

    const searcher = new YTSearcher(tokens.yt)

    const params = {
      type: 'video',
      maxResults: 10,
      regionCode: 'BR',
      pageToken: t || undefined
    }

    const result = await searcher.search(q, params)
    if (!res) return res.json([])
    delete result.first

    res.json(result)
  }

  async stream (req, res) {
    const { v } = req.query

    if (!v && ytdl.validateID(v) && ytdl.validateURL(v)) {
      return res.json({ type: 'ERROR', message: 'Invalid video ID.' })
    }

    const video = ytdl(`https://www.youtube.com/watch?v=${v}`, {
      quality: 'highestaudio',
      filter: 'audioonly'
    })

    res.writeHead(200, { 'Content-Type': 'audio/mpeg' })
    video.pipe(res)
  }
}

export default new MusicController()

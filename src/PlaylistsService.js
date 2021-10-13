const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylists(playlistId) {
    const query = {
      // text: `SELECT playlists.* FROM playlists
      // LEFT JOIN collaborations ON collaborations.playlist_id = playlists.id
      // WHERE (playlists.owner = $1 OR collaborations.user_id = $1)
	    // AND playlists.id = $2
      // GROUP BY playlists.id`,
      // values: [userId, playlistId],

      text: `SELECT songs.id, songs.title, songs.performer FROM playlistsongs 
      LEFT JOIN songs ON songs.id = playlistsongs.song_id 
      WHERE playlistsongs.playlist_id = $1`,
      values: [playlistId],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = PlaylistsService;

module.exports = {
    secret: process.env.NODE_ENV === 'production' ? process.env.SECRET : 'secret',
    line:{
      lineChannelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
      lineChannelSecret: process.env.LINE_CHANNEL_SECRET,
    },
    facepp: {
      faceppKey: process.env.FACEPP_KEY,
      faceppKey: process.env.FACEPP_SECRET,
    },
    imgur: {
      clientId: process.env.IMGUR_CLIENT_ID,
      clientSercret: process.env.IMGUR_CLIENT_SECRET,
      clientAccessToken: process.env.IMGUR_CLIENT_ACCESS_TOKEN,
      clientRefreshToken: process.env.IMGUR_CLIENT_REFRESH_TOKEN,
    }
  };
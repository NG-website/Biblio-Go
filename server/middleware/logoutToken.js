import {BlackListedRedisClient } from '../index.js'
import jwt from 'jsonwebtoken'

export const logoutToken = async (req, res) => {
// extract the tokens from the req (depends on the implementation on frontend)
  const accessToken = req.headers.authorization.split(' ').pop()
  const refreshToken = req.headers['x-refresh-token']
  const userId = req.userId

  const accessTokenPayload = jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_KEY
  )
  const refreshTokenPayload = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_KEY
  )

  // Get the current time as a Unix timestamp (seconds since the epoch)
  const currentTime = Math.floor(Date.now() / 1000)

  // in seconds
  const accessTokenLife = accessTokenPayload.exp - currentTime
  const refreshTokenLife = refreshTokenPayload.exp - currentTime
  
 // store the tokens in redis
  await BlackListedRedisClient.setEx(accessToken, accessTokenLife, 'true')
  await BlackListedRedisClient.setEx(refreshToken, refreshTokenLife, 'true')


  res.status(200).json({
    message: 'SUCCESS',
  })
}
export default logoutToken
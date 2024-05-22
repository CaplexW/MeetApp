export default function transformRefreshToken(data) {
  return {
    refreshToken: data.refresh_token,
    idToken: data.id_token,
    expiresIn: data.expires_in,
    localId: data.user_id,
  };
}

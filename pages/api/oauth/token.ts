import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import qs from 'qs';
const TokenHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client_id = 'authorize-test';
  const client_secret = 'ezGniz75bvHvBdUIpdpkzoCDtdNHiEqQjazeij6jAU1uRpO9';
  const redirect_url = 'http://localhost:3000/oauth/callback';
  const token_endPoint = 'https://auth.glob-dev.kong.yk8s.me/oauth/token';

  const { code, grantType, refreshToken } = req.body;
  const basicHeader = Buffer.from(`${client_id}:${client_secret}`).toString(
    'base64'
  );
  const headers = {
    authorization: `Basic ${basicHeader}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  let params;
  if (grantType === 'authorization_code') {
    params = qs.stringify({
      grant_type: grantType,
      code, //authorization_code
      redirect_uri: redirect_url,
    });
  } else {
    params = qs.stringify({
      grant_type: grantType,
      refresh_token: refreshToken,
    });
  }

  const getToken = await axios.post(token_endPoint, params, {
    headers,
  });
  res.status(getToken.status).json(getToken.data);
};

export default TokenHandler;

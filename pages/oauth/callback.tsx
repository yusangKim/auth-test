import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';

interface Code {
  username: string;
  password: string;
  prevState: null;
}

const Callback: NextPage = () => {
  const router = useRouter();
  //route가 처음 세팅될때도 바귀고 query값이 들어왔을 때도 바귀기 때문에
  //code가 있을 때만 useEffect를 실행시켜줘야 api 요청을 한 번만 할 수 있다
  const code = router?.query?.code;

  useEffect(() => {
    if (code) {
      changeCodeTotoken(router.query.code);
    }
    console.log(router.query.code);
  }, [code]);

  const changeCodeTotoken = useCallback(async (code: string | any) => {
    return axios
      .post('/api/oauth/token', {
        grantType: 'authorization_code',
        code: code,
      })
      .then(async (res) => {
        if (res.data) {
          localStorage.setItem('access_token', res.data.access_token);
          localStorage.setItem('refresh_token', res.data.refresh_token);
          await router.push('/');
        }
      })
      .catch(async (e) => {
        console.log(e);
      });
  }, []);

  return <div>callback page</div>;
};

export default Callback;

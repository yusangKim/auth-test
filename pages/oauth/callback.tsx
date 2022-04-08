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

  useEffect(() => {
    console.log(router.query.code);
    changeCodeTotoken(router.query.code);
  }, [router]);

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
        // await router.push('/');
      });

    // console.log(data);
  }, []);

  return <div>callback page</div>;
};

export default Callback;

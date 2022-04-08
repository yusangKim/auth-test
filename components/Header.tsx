import React, { useState } from 'react';
import qs from 'qs';
import { useRouter } from 'next/router';
import QueryString from 'qs';

//1. 로그인 버튼 누르면 로그인 url로 가기
//2. callback 페이지 만들어서 돌아오면 autorization_code 뽑아서 토큰 요청하기

export const Header = () => {
  const router = useRouter();
  const signInEndPoint = 'https://auth.glob-dev.kong.yk8s.me/oauth/authorize';
  const [isLogin, setIsLogin] = useState(false);

  const params = qs.stringify({
    response_type: 'code',
    client_id: 'authorize-test',
    redirect_uri: 'http://localhost:3000/oauth/callback',
    scope: 'openid profile',
  });
  const signInUrl = `${signInEndPoint}?${params}`;
  const state = QueryString.stringify(router.pathname);

  const handleSignIn = () => {
    console.log(state);
    router.push(`${signInUrl}&${state}`);
  };

  return (
    <div>
      <button
        onClick={handleSignIn}
        className={'bg-orange-300 border w-20 h-10 rounded-lg'}
      >
        Login
      </button>
    </div>
  );
};

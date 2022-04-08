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
  //state를 서버에 보내는 이유: 사용자가 가고싶어하는 path를 서버에 저장한다음 로그인에 성공해서 서버에서 다시 query에 state값을 돌려주면
  //그 값으로 로그인된 유저를 router.push해서 사용성을 높여준다
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

import React, { useState } from 'react';
import styled from 'styled-components';
import FadeIn from 'react-fade-in';
import Modal from '../../components/Modal/Modal';
import LoginModal from './LoginSigninModal/LoginModal';
import SignInModal from './LoginSigninModal/SignInModal';

const Rending = () => {
  const [isLogInModalOn, setIsLogInModalOn] = useState(false);
  const [isSignModalOn, setIsSignModalOn] = useState(false);

  const changeModalValue = () => {
    setIsSignModalOn(!isSignModalOn);
    setIsLogInModalOn(!isLogInModalOn);
  };

  return (
    <Container>
      {isLogInModalOn && (
        <Modal setOff={setIsLogInModalOn} height="300px">
          <LoginModal changeModalValue={changeModalValue} />
        </Modal>
      )}
      {isSignModalOn && (
        <Modal setOff={setIsSignModalOn} height="800px">
          <SignInModal />
        </Modal>
      )}
      <MainLogo alt="logo" src="/images/logo.png"></MainLogo>
      <FadeIn delay={600} transitionDuration={1000}>
        <SubLogo alt="sublogo" src="/images/우리는.png" />
        <SubLogo alt="sublogo" src="/images/기록합니다.png" />
      </FadeIn>
      <LoginImg
        onClick={() => setIsLogInModalOn(!isLogInModalOn)}
        alt="loginimg"
        src="/images/login.png"
      ></LoginImg>
    </Container>
  );
};

export default Rending;

const Container = styled.section`
  ${({ theme }) => theme.flexbox()}
  position: relative;
  width: 100%;
  height: 100vh;
  background-image: url('/images/mainbackground.jpeg');
  background-repeat: no-repeat;
  background-size: cover;
`;

const MainLogo = styled.img`
  position: relative;
  padding-right: 50px;
  right: 10px;
  width: 330px;
`;

const SubLogo = styled.img``;

const LoginImg = styled.img`
  position: absolute;
  width: 70px;
  top: 10px;
  right: 30px;
  cursor: pointer;
`;
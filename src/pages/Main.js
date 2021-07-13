import React, { useState, useEffect, useMemo, useCallback } from 'react';
import dayjs from 'dayjs';
import FadeIn from 'react-fade-in';
import styled from 'styled-components';
import Modal from '../components/Modal/Modal';
import SendTimeModal from '../pages/Main/SendTimeModal/SendTimeModal';
import CommentModal from '../components/CommentModal/CommentModal';
import checkObjData from './Util/checkObjData';
import API_URLS from '../config';

export default function Main({ history }) {
  const [time, setTime] = useState({
    hour: dayjs().hour(),
    minutes: dayjs().minute(),
  });
  const [userInfo, setUserInfo] = useState({
    name: '위코드',
    isOn: false,
    startTime: '00:00',
    normalAttendance: false,
    isStart: false,
    isStop: false,
  });
  const [isCommentModal, setIsCommentModal] = useState({});
  const [stopModalOn, setStopModalOn] = useState(false);

  const [checkOffWorkDate, setCheckOffWorkDate] = useState('2021-04-12');
  // eslint-disable-next-line no-unused-vars
  const [sendModalOff, setSendModalOff] = useState(false);
  const memoDate = useMemo(() => getTodayDate(), []);

  const useCallbackStartTime = useCallback(
    () => checkStart(setIsCommentModal, setUserInfo, history),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const useCallbackStopTime = useCallback(
    () => checkStop(setIsCommentModal, setStopModalOn, history),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const useCallbackPauseTime = useCallback(
    () => checkPause(setIsCommentModal, setUserInfo, history),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const useCallbackRestartTime = useCallback(
    () => checkRestart(setUserInfo, history),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    getTimePasses(setTime);
    fetchUserData(setUserInfo, setCheckOffWorkDate, history);
    return () => clearInterval(getTimePasses(setTime));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  return (
    <FadeIn transitionDuration={1000}>
      <Container>
        <TimeSection>
          <TimeDescription>{memoDate}</TimeDescription>
          <TimeDescription>{showNowTime(time)}</TimeDescription>
        </TimeSection>
        <StartSection>
          <StudentName>{`${userInfo.name}님`}</StudentName>
          <StartTime>{greetings(userInfo)}</StartTime>
        </StartSection>
        <ButtonAnimationSection>
          <ButtonSection>
            {!userInfo.isOn && userInfo.isStart && !userInfo.isStop ? (
              <Button onClick={useCallbackRestartTime}>RESTART</Button>
            ) : (
              <Button
                onClick={useCallbackStartTime}
                disabled={userInfo.isOn && userInfo.isStart}
              >
                START
              </Button>
            )}
            {userInfo.isOn && (
              <Button onClick={useCallbackPauseTime}>PAUSE</Button>
            )}
            <Button onClick={useCallbackStopTime} disabled={userInfo.isStop}>
              STOP
            </Button>
          </ButtonSection>
          <FireAnimationSection>
            <FirewoodImg alt="firewoodimg" src="/images/firewood.png" />
            {userInfo.isOn && <FireGif alt="firegif" src="/images/fire.gif" />}
          </FireAnimationSection>
        </ButtonAnimationSection>

        {checkObjData(isCommentModal) && (
          <Modal setOff={setIsCommentModal} isCommentModal={stopModalOn}>
            {stopModalOn && (
              <StopCommentTitle>오늘도 수고하셨습니다.</StopCommentTitle>
            )}
            <CommentModal comment={isCommentModal} />
          </Modal>
        )}

        {userInfo.normalAttendance && (
          <Modal>
            <SendTimeModal
              setOff={setSendModalOff}
              attendanceStatus={setUserInfo}
              checkOffWorkDate={checkOffWorkDate}
            />
          </Modal>
        )}
      </Container>
    </FadeIn>
  );
}

const WEEK = ['일', '월', '화', '수', '목', '금', '토'];

const Container = styled.section`
  ${({ theme }) => theme.flexbox('column', 'center', 'stretch')};
  max-width: 1440px;
  height: 100vh;
  margin: 0 auto;
  padding: 0 142px;
  background-color: ${({ theme }) => theme.colors.backgroundColor};

  ${({ theme }) => theme.tablet`
    padding: 0;
  `}
`;

const TimeSection = styled.section`
  ${({ theme }) => theme.flexbox('column', 'center', 'stretch')};

  ${({ theme }) => theme.tablet`
    display: none;
  `}
`;

const TimeDescription = styled.h1`
  margin-bottom: 10px;
  font-size: ${({ theme }) => theme.pixelToRem(80)};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.fontColor};

  ${({ theme }) => theme.middle_desktop`
    font-size: 50px;
  `}
`;

const StartSection = styled.section`
  ${({ theme }) => theme.flexbox('row', 'start', 'center')};
  margin-top: 30px;
  font-size: ${({ theme }) => theme.pixelToRem(35)};
  font-weight: 500;

  ${({ theme }) => theme.middle_desktop`
    font-size: 20px;
  `}

  ${({ theme }) => theme.tablet`
    margin: 0 auto;
    margin-bottom: 200px;
    font-size: 35px;
  `}

  ${({ theme }) => theme.mobile`
    margin-bottom: 100px;
    font-size: 20px;
  `}
`;

const StudentName = styled.h2`
  padding: 8px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.fontColor};
  background-color: ${({ theme }) => theme.colors.blue};

  ${({ theme }) => theme.tablet`
    display: none;
  `}
`;

const StartTime = styled.h2`
  color: ${({ theme }) => theme.colors.fontColor};
`;

const ButtonAnimationSection = styled.section`
  ${({ theme }) => theme.flexbox('row', 'space-between', 'center')};
  margin-top: 100px;

  ${({ theme }) => theme.tablet`
    ${theme.flexbox('column', 'center', 'center')};
  `}
`;

const ButtonSection = styled.section`
  ${({ theme }) => theme.flexbox('row', 'space-between', 'center')};
  width: 550px;
  margin-top: 50px;
  font-size: 40px;

  ${({ theme }) => theme.middle_desktop`
    width: 380px;
    font-size: 30px;
  `}

  ${({ theme }) => theme.tablet`
    order: 2;
    width: 80vw;
    margin-top: 120px;
  `}

  ${({ theme }) => theme.mobile`
    font-size: 20px;
  `}
`;

const Button = styled.button`
  font-weight: 700;
  color: ${({ theme, disabled }) =>
    !disabled ? theme.colors.fontColor : 'gray'};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
    transform: scale(1.05);
  }

  &:active {
    opacity: 0.3;
  }
`;

const FireAnimationSection = styled.div`
  ${({ theme }) => theme.flexbox()};
  position: relative;
  margin-left: 100px;
  margin-right: 150px;

  ${({ theme }) => theme.tablet`
    margin: 0;
  `}
`;

const FirewoodImg = styled.img`
  position: absolute;
  width: 200px;

  ${({ theme }) => theme.middle_desktop`
    width: 130px;
  `}

  ${({ theme }) => theme.mobile`
    width: 130px;
  `}
`;

const FireGif = styled.img`
  position: absolute;
  width: 300px;
  bottom: -10px;

  ${({ theme }) => theme.middle_desktop`
    width: 170px;
  `}

  ${({ theme }) => theme.mobile`
    width: 150px;
  `}
`;

const StopCommentTitle = styled.div`
  margin-top: 20px;
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};
`;

const fetchUserData = (setUserInfo, setCheckOffWorkDate, history) => {
  fetch(`${API_URLS.MAIN}`, {
    headers: {
      Authorization: sessionStorage.getItem('wrtoken'),
    },
  })
    .then(res => res.json())
    .then(({ message, result }) => {
      if (message === 'REFRESH_TOKEN_EXPIRED') {
        sessionStorage.clear();
        history.push('/');
      }

      if (message === 'NEED_TO_RECORD_ENDTIME_ERROR') {
        setUserInfo(prev => ({ ...prev, normalAttendance: true }));
        setCheckOffWorkDate(result);
      }

      if (result) {
        const {
          user_name,
          user_status,
          user_start_time,
          start_status,
          stop_status,
        } = result;
        setUserInfo(prev => ({
          ...prev,
          name: user_name,
          isOn: user_status,
          startTime: user_start_time,
          isStart: start_status,
          isStop: stop_status,
        }));
      }
    });
};

const checkStart = (setIsCommentModal, setUserInfo, history) => {
  fetch(`${API_URLS.MAIN}/start`, {
    method: 'POST',
    headers: {
      Authorization: sessionStorage.getItem('wrtoken'),
    },
  })
    .then(res => res.json())
    .then(({ message, result }) => {
      if (message === 'REFRESH_TOKEN_EXPIRED') {
        sessionStorage.clear();
        history.push('/');
      }
      if (message === 'ALREADY_RECORD_ERROR') {
        setIsCommentModal(prev => ({
          ...prev,
          isOn: true,
          comment: '이미 출근하셨습니다.',
        }));
      }
      if (message === 'LOCATION_ERROR') {
        setIsCommentModal(prev => ({
          ...prev,
          isOn: true,
          comment: '위코드에 계시나요?',
        }));
      }
      if (result) {
        setUserInfo(prev => ({
          ...prev,
          isOn: true,
          isStart: true,
        }));
      }
    });
};

const checkStop = (setIsCommentModal, setStopModalOn, history) => {
  fetch(`${API_URLS.MAIN}/stop`, {
    method: 'POST',
    headers: {
      Authorization: sessionStorage.getItem('wrtoken'),
    },
  })
    .then(res => res.json())
    .then(({ message, result }) => {
      if (message === 'REFRESH_TOKEN_EXPIRED') {
        sessionStorage.clear();
        history.push('/');
      }
      if (message === 'NEED_TO_RECORD_STARTTIME_ERROR') {
        setIsCommentModal(prev => ({
          ...prev,
          isOn: true,
          comment: '출근이 아직 되지 않았습니다.',
        }));
      }
      if (message === 'ALREADY_RECORD_ERROR') {
        setIsCommentModal(prev => ({
          ...prev,
          isOn: true,
          comment: '이미 퇴근하셨습니다.',
        }));
      }
      if (message === 'LOCATION_ERROR') {
        setIsCommentModal(prev => ({
          ...prev,
          isOn: true,
          comment: '위코드에 계시나요?',
        }));
      }
      if (message === 'CLOSE_TIME_ERROR') {
        setIsCommentModal(prev => ({
          ...prev,
          isOn: true,
          comment: '출근하신지 1분이 지나지 않았습니다.',
        }));
      }
      if (result) {
        setIsCommentModal(prev => ({
          ...prev,
          isOn: true,
          comment: result.comment,
        }));
        setStopModalOn(true);
      }
    });
};

const checkPause = (setIsCommentModal, setUserInfo, history) => {
  fetch(`${API_URLS.MAIN}/pause`, {
    method: 'POST',
    headers: {
      Authorization: sessionStorage.getItem('wrtoken'),
    },
  })
    .then(res => res.json())
    .then(({ message }) => {
      if (message === 'REFRESH_TOKEN_EXPIRED') {
        sessionStorage.clear();
        history.push('/');
      }
      if (message === 'NEED_TO_RECORD_STARTTIME_ERROR') {
        setIsCommentModal(prev => ({
          ...prev,
          isOn: true,
          comment: 'START를 먼저 누르세요.',
        }));
      }
      if (message === 'SUCCESS') {
        setUserInfo(prev => ({
          ...prev,
          isStart: false,
        }));
      }
    });
};

const checkRestart = (setUserInfo, history) => {
  fetch(`${API_URLS.MAIN}/restart`, {
    method: 'POST',
    headers: {
      Authorization: sessionStorage.getItem('wrtoken'),
    },
  })
    .then(res => res.json())
    .then(({ message }) => {
      if (message === 'REFRESH_TOKEN_EXPIRED') {
        sessionStorage.clear();
        history.push('/');
      }
      if (message === 'SUCCESS') {
        setUserInfo(prev => ({
          ...prev,
          isOn: true,
        }));
      }
    });
};

const getTimePasses = setTime => {
  setInterval(() => {
    setTime(prev => ({
      ...prev,
      hour: dayjs().hour(),
      minutes: dayjs().minute(),
    }));
  }, 1000);
};

const getTodayDate = () => {
  return `지금은 ${dayjs().month() + 1}월 ${dayjs().date()}일 ${
    WEEK[dayjs().day()]
  }요일`;
};

const getTime = timeHour => {
  const hour = timeHour;
  return hour > 12 ? `오후 ${hour - 12}` : `오전 ${hour}`;
};

const showNowTime = time => {
  return `${getTime(time.hour)}시 ${time.minutes}분입니다.`;
};

const showStartTime = userInfo => {
  if (userInfo.startTime) {
    return `${getTime(userInfo.startTime.split(':')[0])}시 ${
      userInfo.startTime.split(':')[1]
    }분에 시작하셨습니다.`;
  }
};

const greetings = userInfo => {
  if (!userInfo.isOn && !userInfo.isStart) {
    return '오늘도 상쾌하게 시작해볼까요?';
  }

  if (!userInfo.isOn && userInfo.isStart && !userInfo.isStop) {
    return '은 일시 정지 중 입니다.';
  }

  if (userInfo.isStart && userInfo.isStop) {
    return '오늘 하루도 힘찬 코딩하셨나요?';
  }

  if (userInfo.isOn && userInfo.isStart) {
    return showStartTime(userInfo);
  }
};

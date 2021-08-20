# 🍦Team WE-RECORD

## ✅ 프로젝트 소개

- 프로젝트 개요: WE-RECORD 팀의 WERECORD 사이트 제작

- 프로젝트 기간: 2021.06.08~ 2021.07.01

<br>

## 🎯 기획 포인트

- 위코드의 수강생으로 생활하면서, 출석 관련 시스템의 부재로 생기는 불편함 개선을 목표로 함
- 멘토 및 학생이 실제로 사용할 수 있는, 출결 시스템을 목표로 하게 됨
- 수강생

  - 위코드 도착 후 시작 및 종료 시간 체크
  - 개인별 주간 시간 기록 및 누적 시간 기록 확인
  - 기수별 기록 및 속한 기수의 출결 상황 확인 가능

- 멘토(admin)
  - 기수별 정보 관리
  - 기수별 기록 및 출결 상황 확인 가능

<br>

## 🎯 프로젝트 목표

### Frontend

- **React function component, React Hooks** 사용을 통한 컴포넌트 관리

- **styled-component** 사용을 통한 스타일링

- **관련 라이브러리 사용 경험** 쌓기

- **AWS** 사용을 통한 사이트 배포

- 백엔드-프론트엔드 커뮤니케이션 및 통신으로 **협업 경험 쌓기**

- 배포 이후 bug fix 및 지속적인 유지 및 보수

<br>

## 👥 팀원 구성

- **Frontend**

  - 김수연 [Github](https://github.com/ksy4568) / [블로그](https://velog.io/@syeon02)
  - 이다슬 [Github](https://github.com/daseuls) / [블로그](https://velog.io/@_seeul)
  - 전용민 [Github](https://github.com/J-Ymini) / [블로그](https://velog.io/@dydalsdl1414)

- **Backend**

  - 양미화 [Github](https://github.com/hwaya2828) / [블로그](https://velog.io/@hwaya2828)
  - 최대환 [Github](https://github.com/Dae-Hwan) / [블로그](https://velog.io/@gigymi2005)

  <br>

## 🎥 시연 영상

업로드 예정입니다.

<br>

## 👨‍💻 적용 기술

- Frontend: JavaScript, React, React-Router, React-hooks, styled-component, CRA
- Backend: Python, Django, MYSQL
- 공통 tool: Trello, Git & Github, Slack, AWS

<br>

## 🖊 주 구현 기능

- 랜딩 페이지, 소셜 로그인
- 메인 페이지
- 마이 페이지(수강생)
- 기수별 페이지
- 멘토(Admin) 페이지

<br>


**전용민**

- 프로젝트 CRA 초기세팅

- 공통: styled-component 사용하여 페이지, 컴포넌트 및 담당 페이지별 레이아웃 구현

- Nav

  - 회원(학생, 멘토)별 버튼 조건부 렌더링 (학생: 마이페이지, 기수페이지, 메인페이지, 멘토: 멘토 페이지, 기수 페이지)
  - 반응형 레이아웃 구현

- 마이 페이지

  - fetch(GET)를 사용하여 수강생 개인별 시간 정보 표시
  - highchart.js 라이브러리 사용으로 해당 기수의 수강생별 주간 시간 기록 BarChart 구현, 전체 누적 시간 LineChart 구현
  - 반응형 레이아웃 구현

- 멘토(Admin) 페이지

  - path parameter를 사용하여 기수 페이지와의 동적 라우팅 기능 구현
  - 기수별 정보 목록 carousel 슬라이더 구현 (라이브러리 X)
  - fetch(PATCH, DELETE)를 사용하여 멘토 개인정보 수정 및 탈퇴 기능 구현
  - fetch(POST, PATCH, DELETE)를 사용하여 기수 정보 CRUD 기능 구현
  - 반응형 레이아웃 구현

- 공용 Button 컴포넌트

  - 공용으로 사용할 Button 컴포넌트 구현

    <br>



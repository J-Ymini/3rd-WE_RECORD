import React from 'react';
import Styled from 'styled-components';

export default function ProfileModal({ peersInfo }) {
  const {
    peer_name,
    peer_birthday,
    peer_position,
    peer_profile_image_url,
    peer_github,
    peer_blog,
  } = peersInfo;

  return (
    <Container>
      <ModalTitle>Profile </ModalTitle>
      <UserCard>
        <img alt="user1" src={peer_profile_image_url} />
        <div className="userInfo">
          <UserPosition>
            <UserName>{peer_name}님</UserName>
            <Content>{peer_position}</Content>
          </UserPosition>
          <UserBirth>
            🎂
            {peer_birthday === null
              ? '생일이 입력되지 않았어요!'
              : `${peer_birthday.split('-')[1]}월 ${
                  peer_birthday.split('-')[2]
                }일`}
          </UserBirth>
          <div>
            {peer_github && (
              <GitAddress href={peer_github} target="_blank">
                <i class="fab fa-github-square"></i>
              </GitAddress>
            )}
            {peer_blog && (
              <BlogAddress href={peer_blog} target="_blank">
                <i class="fab fa-vimeo"></i>
              </BlogAddress>
            )}
          </div>
          <div></div>
        </div>
      </UserCard>
      <UserInfo></UserInfo>
    </Container>
  );
}

const Container = Styled.section`
  color: ${({ theme }) => theme.colors.backgroundColor};
`;

const ModalTitle = Styled.h1`
  padding: 25px 0 25px 20px;
  border-bottom: 1px solid gray;
  text-align:left;
  font-weight:700;
  font-size: ${({ theme }) => theme.pixelToRem(20)};
  color: ${({ theme }) => theme.colors.backgroundColor};
`;

const UserCard = Styled.div`
  ${({ theme }) => theme.flexbox('row')}
  margin-top: 40px;

  img {
    width: 150px;
    height: 150px;
    margin-right:10px;
    border-radius: 50%;
    object-fit: cover;

    ${({ theme }) => theme.mobile`
      width: 100px;
      height: 100px;
    `}
  }

  .userInfo {
  ${({ theme }) => theme.flexbox('column', 'center', 'flex-start')}
    margin-left: 20px;
  }
`;

const UserPosition = Styled.div`
  ${({ theme }) => theme.flexbox('row', 'start', 'flex-end')}
  margin-bottom:5px;
`;
const UserName = Styled.div`
  font-size: 25px;
  font-weight:700;

  ${({ theme }) => theme.mobile`
    font-size: 17px;
  `}
`;

const UserBirth = Styled.div`
  margin: 10px 0 15px 0;
  font-size: 15px;

  ${({ theme }) => theme.mobile`
    font-size: 11px;
  `}
`;

const UserInfo = Styled.div`
  ${({ theme }) => theme.flexbox('column', 'flex-start', 'flex-start')};
  margin-top: 10px;
  padding: 30px;
  font-size: 25px;
  div {
    margin-botton:20px;
  }

`;

const Content = Styled.span`
margin-left: 10px;
font-size: 15px;

${({ theme }) => theme.mobile`
  font-size: 11px;
`}
`;

const GitAddress = Styled.a`
i {
  font-size: 23px;
  margin-right:10px ;
  color: ${({ theme }) => theme.colors.backgroundColor};
  transition: all 0.1s ease;

  ${({ theme }) => theme.mobile`
    font-size: 17px;
  `}

  &:hover {
    color: #7C007C;
    transform: scale(1.05);
  }
}
`;

const BlogAddress = Styled.a`
i{
  font-size: 23px;
  color: ${({ theme }) => theme.colors.backgroundColor};
  transition: all 0.3s ease;

  ${({ theme }) => theme.mobile`
    font-size: 17px;
  `}

  &:hover {
    color: #20C997;
    transform: scale(1.1);
  }
}
`;

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from '../../components/Modal/Modal';
import styled from 'styled-components';

export default function EditContents() {
  const [userForm, setUserForm] = useState({
    name: '',
    user_type: '',
    batch: '',
    position: '',
    blog: '',
    github: '',
    birthday: '',
    profile_image_url: [],
  });
  const [userId, setUserId] = useState('');
  const [imgFile, setImgFile] = useState('');
  const { name, position, blog, github, birthday } = userForm;
  const [isModalOn, setIsModalOn] = useState(false);
  const history = useHistory();

  useEffect(() => {
    fetch('http://10.58.2.86:8000/users/info', {
      headers: {
        Authorization:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE2MjQyNTkzMTAsImV4cCI6MTAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAxNjI0MjU5MzEwfQ.tzSQnsH2-ojHz5i51_Pugr8Dr4i8vmbkwtruuUrpqds',
      },
    })
      .then(res => res.json())
      .then(userData => {
        const {
          name,
          batch,
          position,
          blog,
          github,
          birthday,
          user_type,
          user_id,
          profile_image_url,
        } = userData.data;

        setUserForm(prev => ({
          ...prev,
          name,
          batch,
          position,
          blog,
          github,
          birthday,
          user_type,
          profile_image_url,
        }));
        setUserId(user_id);
      });
  }, []);

  const modifyUserData = e => {
    e.preventDefault();
    const userInfo = JSON.stringify(userForm);
    const userData = new FormData();
    userData.append('info', userInfo);
    userData.append('image', imgFile);

    fetch(`http://10.58.2.86:8000/users/info/${userId}`, {
      method: 'POST',
      header: {
        Authorization:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE2MjQyNTkzMTAsImV4cCI6MTAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAxNjI0MjU5MzEwfQ.tzSQnsH2-ojHz5i51_Pugr8Dr4i8vmbkwtruuUrpqds',
      },
      body: userData,
    });

    history.push('/mypage');
  };

  const handleInput = e => {
    const { name, value } = e.target;
    const nextUserForm = { ...userForm, [name]: value };
    setUserForm(nextUserForm);
  };

  const onFileInput = e => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.readAsDataURL(file);

    reader.onload = () => {
      setImgFile(file);
    };
  };

  const RecheckLeave = e => {
    e.preventDefault();

    fetch('', {
      method: 'DELETE',
      header: {},
      body: JSON.stringify({
        user_id: { userId },
      }),
    });

    history.push('/');
  };

  return (
    <>
      <Container>
        <Content>
          <Title>마이 페이지 정보수정 📝</Title>
          <Label>이름</Label>
          <Input
            name="name"
            placeholder="이름을 입력해주세요"
            value={name || ''}
            onChange={handleInput}
            required
          />
        </Content>
        <Content>
          <Label>사진</Label>
          <Input
            name="image"
            type="file"
            accept="image/*"
            placeholder="이미지 주소로 입력해주세요!"
            onChange={onFileInput}
            required
          />
        </Content>
        <Content>
          <Label>포지션</Label>
          <SelectBox
            name="position"
            value={position || ''}
            onChange={handleInput}
          >
            <option value="Undefined">Position</option>
            <option value="Front-end">Front-end</option>
            <option value="Back-end">Back-end</option>
            <option value="FullStack">Full Stack</option>
          </SelectBox>
        </Content>
        <Content>
          <Label>blog 주소</Label>
          <Input
            name="blog"
            value={blog || ''}
            placeholder="개인 블로그 주소"
            onChange={handleInput}
            required
          />
        </Content>
        <Content>
          <Label>github 주소</Label>
          <Input
            name="github"
            value={github || ''}
            placeholder="Github 주소"
            onChange={handleInput}
            required
          />
        </Content>
        <Content>
          <Label>생일</Label>
          <SelectBirthDay>
            <input
              type="date"
              name="birthday"
              value={birthday || ''}
              onChange={handleInput}
              max="2100-01-01"
            />
          </SelectBirthDay>
        </Content>
        <SubmitBtn onClick={modifyUserData}>수정</SubmitBtn>
      </Container>
      <LeaveBtn onClick={() => setIsModalOn(true)}>탈퇴</LeaveBtn>

      {isModalOn && (
        <Modal height="400px">
          <h1>리얼 탈퇴????</h1>
          <button type="button" onClick={RecheckLeave}>
            진짜 탈퇴??
          </button>
        </Modal>
      )}
    </>
  );
}

const Title = styled.div`
  margin-bottom: 35px;
  font-size: ${({ theme }) => theme.pixelToRem(25)};
  font-weight: 700;
`;

const Container = styled.form`
  ${({ theme }) => theme.flexbox('column', 'start', 'start')}
  width: 80%;
  position: relative;
  padding: 40px;
  color: #212121;
`;
const Label = styled.label`
  margin-right: 15px;
  margin-bottom: 5px;
  font-weight: 700;
`;

const Input = styled.input`
  width: 300px;
  padding-bottom: 5px;
  border-bottom: 1px solid black;
`;

const SelectBox = styled.select`
  width: 300px;
  padding: 3px 10px;
  font-size: 16px;
`;

const Content = styled.div`
  ${({ theme }) => theme.flexbox('column', 'start', 'start')}
  margin-bottom: 25px;
`;

const SelectBirthDay = styled.div`
  ${({ theme }) => theme.flexbox('row', 'flex-start', 'center')}
  width: 300px;
  padding: 5px;
  border-bottom: 1px solid black;
`;

const SubmitBtn = styled.button`
  position: absolute;
  right: -30px;
  bottom: 50px;
  font-size: ${({ theme }) => theme.pixelToRem(20)};
  font-weight: 700;
  cursor: pointer;
`;

const LeaveBtn = styled.button`
  padding: 3px 3px;
  color: red;
  cursor: pointer;

  &:active {
    opacity: 0.3;
  }
`;

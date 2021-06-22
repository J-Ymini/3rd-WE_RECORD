import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

export default function EditContents({ handleModal }) {
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
  const history = useHistory();

  useEffect(() => {
    fetch('', {
      headers: {
        Authorization: '',
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

    fetch(`/${userId}`, {
      method: 'POST',
      header: {
        Authorization: '',
      },
      body: userData,
    });

    history.push('/mypage');
    handleModal(false);
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

  return (
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
        <Input
          name="birthday"
          value={birthday || ''}
          placeholder="04.12"
          onChange={handleInput}
          required
        />
      </Content>
      <SubmitBtn onClick={modifyUserData}>수정</SubmitBtn>
    </Container>
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

const SubmitBtn = styled.button`
  position: absolute;
  right: -30px;
  bottom: 50px;
  font-size: ${({ theme }) => theme.pixelToRem(20)};
  font-weight: 700;
  cursor: pointer;
`;

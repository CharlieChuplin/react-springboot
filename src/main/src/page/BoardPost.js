import {Button, Container, Form, Stack} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

export default function BoardPost() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    writer: "",
  });

  /* input 안의 값을 변경해서 state 로 넘김*/
  const handleChange = e => {
    const {name, value} = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  }

  /* submit */
  const handleSubmit = e => {
    e.preventDefault();
    axios.post("http://localhost:8080/boards", formData)
      .then(res => {
        navigate('/')
      })
      .catch(error => {
        console.log("error")
      });
  };

  return (
    <>
      <Container style={{marginTop: 50}}>
        <div style={{display: "flex", justifyContent: "center"}}>
          <h2>
            게시글 작성 페이지
          </h2>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>제목</Form.Label>
            <Form.Control type="text" onChange={handleChange} name="title"/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>작성자</Form.Label>
            <Form.Control type="text" onChange={handleChange} name="writer"/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>내용</Form.Label>
            <Form.Control onChange={handleChange} name="content"
                          as="textarea" rows={3} style={{height: "300px"}}/>
          </Form.Group>
          <Stack direction="horizontal" gap={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Button type="submit">게시글 작성</Button>
            <Button onClick={() => navigate('/')}> 뒤로가기</Button>
          </Stack>
        </Form>
      </Container>
    </>
  )
}
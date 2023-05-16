import {Button, Container, Form, Stack} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export default function BoardEdit() {

  const {id} = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  /* 데이터 가져오기 */
  useEffect(() => {
    axios.get(`http://localhost:8080/boards/${id}`)
      .then(res => setBoard(res.data))
      .catch(error => console.log(error));
  }, [id]);

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
    axios.post(`http://localhost:8080/boards/${id}`, formData)
      .then(res => {
        navigate(`/board/${id}`)
      })
      .catch(error => {
        console.log(board)
        console.log("error")
      });
  };

  return (
    <>
      <Container style={{marginTop: 50}}>
        <div style={{display: "flex", justifyContent: "center"}}>
          <h2>
            게시글 수정 페이지
          </h2>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>제목</Form.Label>
            <Form.Control type="text" onChange={handleChange} name="title"/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>작성자</Form.Label>
            <Form.Control type="text" onChange={handleChange} name="writer" value={board.writer} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>내용</Form.Label>
            <Form.Control onChange={handleChange} name="content"
                          as="textarea" rows={3} style={{height: "300px"}}/>
          </Form.Group>

          <Stack direction="horizontal" gap={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button type="submit">확인</Button>
            <Button onClick={() => navigate('/')}> 뒤로가기</Button>
          </Stack>
        </Form>
      </Container>
    </>
  )
}
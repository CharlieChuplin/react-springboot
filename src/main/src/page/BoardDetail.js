import {Button, Container, Form, Stack} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export default function BoardDetail() {

  const {id} = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState([]);
  const a = 1;

  /* 데이터 가져오기 */
  useEffect(() => {
    axios.get(`http://localhost:8080/boards/${id}`)
      .then(res => setBoard(res.data))
      .catch(error => console.log(error));
  }, [id]);

  /* 데이터 삭제 */
  const handleDelete = () => {
    axios.delete(`http://localhost:8080/boards/${id}`)
      .then(() => setBoard([]))
      .then(() => navigate('/'))
      .catch(error => console.log(error));
  };

  return (
    <>
      <Container style={{marginTop: 50}}>
        <div style={{display: "flex", justifyContent: "center"}}>
          <h2>
            게시글 상세 페이지
          </h2>
        </div>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>제목</Form.Label>
            <Form.Control type="text" name="title"
                          value={board.title} readOnly/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>작성자</Form.Label>
            <Form.Control type="text" name="writer"
                          value={board.writer} readOnly/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>내용</Form.Label>
            <Form.Control name="content" as="textarea"
                          value={board.content} rows={3} style={{height: "300px"}} readOnly/>
          </Form.Group>
        </Form>

          <Stack direction="horizontal" gap={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button onClick={() => navigate(`/board/${board.boardNo}/edit`)}>게시글 수정</Button>
            <Button onClick={() => navigate('/')}> 뒤로가기</Button>
            <Button onClick={() => handleDelete()}> 삭제</Button>
          </Stack>
      </Container>
    </>
  )
}
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import "../styles/styles.css"
import {Button, Col, Container, Pagination, Row, Stack, Table} from "react-bootstrap";

export default function MainIndex() {

  const navigate = useNavigate();
  const [boards, setBoards] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchBoards();
  }, [currentPage]);

  const fetchBoards = () => {
    axios.get(`http://localhost:8080/boards?page=${currentPage}&size=10`)
      .then(res => {
        setBoards(res.data.content);
        setTotalPages(res.data.totalPages);
      });
  }

  // 페이지 핸들러
  const handlePaginationClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <Container style={{marginTop: 50}}>
      <div style={{display: "flex", justifyContent: "center"}}>
        <h2>
          게시판 페이지
        </h2>
      </div>

      <Stack gap={2}>

        <Table striped bordered hover >
          <thead >
          <tr style={{}}>
            <th style={{ width: '5%' }}>번호</th>
            <th style={{ width: '55%' }}>제목</th>
            <th style={{ width: '10%' }}>작성자</th>
            <th style={{ width: '10%' }}>날짜</th>
          </tr>
          </thead>
          <tbody >
          {
            boards.map((board, idx) => (
              <tr key={idx}>
                <td>{board.boardNo}</td>
                <td onClick={() => navigate(`/board/${board.boardNo}`)}>{board.title}</td>
                <td>{board.writer}</td>
                <td>{board.lastModifiedDate}</td>
              </tr>
            ))
          }
          </tbody>
        </Table>
      </Stack>

      {/* 페이지네이션 */}
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Pagination style={{margin: 'auto'}}>
          {/*  < , << */}
          <Pagination.Prev onClick={() => handlePaginationClick(currentPage - 1)}/>

          {/* 페이지 번호를 동적으로 생성 */}
          {[...Array(10).keys()].map(page => (
            <Pagination.Item
              key={page}
              active={page === currentPage}
              onClick={() => handlePaginationClick(page)}
            >
              {page + 1}
            </Pagination.Item>
          ))}

          {/*   > , >>  */}
          <Pagination.Next onClick={() => handlePaginationClick(currentPage + 1)}/>
        </Pagination>

        <Button onClick={() => navigate('/board/post')}>게시글 작성하기</Button>
      </div>


    </Container>
  )
}
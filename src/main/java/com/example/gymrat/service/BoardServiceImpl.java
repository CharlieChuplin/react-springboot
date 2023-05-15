package com.example.gymrat.service;

import com.example.gymrat.domain.Board;
import com.example.gymrat.dto.BoardRequest;
import com.example.gymrat.dto.BoardResponse;
import com.example.gymrat.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class BoardServiceImpl implements BoardService{

    private final BoardRepository boardRepository;

    // 등록
    @Override
    @Transactional
    public void register(BoardRequest boardRequest) throws Exception {
        Board board = boardRequest.toEntity(boardRequest);
        boardRepository.save(board);
    }

    // 상세 조회
    @Override
    public BoardResponse read(Long boardNo) throws Exception {
        Board board = boardRepository.findById(boardNo).get();
        BoardResponse boardResponse = board.toDto();
        return boardResponse;
    }

    // 수정
    @Override
    @Transactional
    public void modify(Long boardNo, BoardRequest boardRequest) throws Exception {
        // dto -> entity
        Board board = boardRepository.findById(boardNo).get();
        board.updateBoard(boardRequest);
    }

    // 삭제
    @Override
    @Transactional
    public void remove(Long boardNo) throws Exception {
        boardRepository.deleteById(boardNo);
    }

    // 목록 조회, 페이지 처리 X
//    public List<BoardResponse> list() throws Exception {
//        List<Board> boards = boardRepository.findAll(Sort.by(Sort.Direction.DESC, "boardNo"));
//        List<BoardResponse> boardResponses = boards.stream().map(board -> board.toDto())
//                .collect(Collectors.toList());
//        return boardResponses;
//    }

    // 목록 조회, 페이지처리 O
    @Override
    public Page<BoardResponse> list(Pageable pageable) throws Exception {
        PageRequest paging = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("boardNo").descending());
        Page<Board> boardPage = boardRepository.findAll(paging);
        return boardPage.map(Board::toDto);
    }

}

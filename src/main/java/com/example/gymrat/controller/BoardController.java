package com.example.gymrat.controller;

import com.example.gymrat.domain.Board;
import com.example.gymrat.dto.BoardRequest;
import com.example.gymrat.dto.BoardResponse;
import com.example.gymrat.service.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/boards")
public class BoardController {

    private final BoardService boardService;

    // 목록 조회, 페이지 처리 X
//    @GetMapping
//    public ResponseEntity<List<BoardResponse>> list() throws Exception {
//        return new ResponseEntity<>(boardService.list(), HttpStatus.OK);
//    }

    // 목록 조회, 페이지 처리 O
    @GetMapping
    public Page<BoardResponse> list(Pageable pageable) throws Exception {
        return boardService.list(pageable);
    }

    // 등록
    @PostMapping
    public ResponseEntity<?> register(@Validated @RequestBody BoardRequest boardRequest) throws Exception {
        boardService.register(boardRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 상세 조회
    @GetMapping("/{boardNo}")
    public ResponseEntity<BoardResponse> read(@PathVariable("boardNo") Long boardNo) throws Exception {
        BoardResponse boardResponse = boardService.read(boardNo);
        return new ResponseEntity<>(boardResponse, HttpStatus.OK);
    }

    // 수정
    @PostMapping("/{boardNo}")
    public ResponseEntity<?> modify(@PathVariable("boardNo") Long boardNo, @Validated @RequestBody BoardRequest boardRequest) throws Exception {
        boardService.modify(boardNo, boardRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 삭제
    @DeleteMapping("/{boardNo}")
    public ResponseEntity<?> remove(@PathVariable("boardNo") Long boardNo) throws Exception {
        boardService.remove(boardNo);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }


}

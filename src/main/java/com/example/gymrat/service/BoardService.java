package com.example.gymrat.service;

import com.example.gymrat.domain.Board;
import com.example.gymrat.dto.BoardRequest;
import com.example.gymrat.dto.BoardResponse;
import com.example.gymrat.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

public interface BoardService {

    // 등록
    public void register(BoardRequest boardRequest) throws Exception;

    // 상세 조회
    public BoardResponse read(Long boardNo) throws Exception;

    // 수정
    public void modify(Long boardNo, BoardRequest boardRequest) throws Exception;

    // 삭제
    public void remove(Long boardNo) throws Exception;

    // 목록 조회, 페이지 처리 X
//    public List<BoardResponse> list() throws Exception;
    // 목록 조회, 페이지 처리 O
    public Page<BoardResponse> list(Pageable pageable) throws Exception;
}

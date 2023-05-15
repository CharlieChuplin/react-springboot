package com.example.gymrat.dto;

import com.example.gymrat.domain.Board;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BoardRequest {

    private String title;

    private String content;

    private String writer;

    public Board toEntity(BoardRequest dto) {
        return Board.builder()
                .title(dto.getTitle())
                .content(dto.getContent())
                .writer(dto.getWriter())
                .build();
    }

}

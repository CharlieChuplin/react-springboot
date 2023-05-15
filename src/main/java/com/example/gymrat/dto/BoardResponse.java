package com.example.gymrat.dto;

import com.example.gymrat.domain.Board;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class BoardResponse {

    private Long boardNo;

    private String title;

    private String content;

    private String writer;

    private LocalDateTime lastModifiedDate;


}

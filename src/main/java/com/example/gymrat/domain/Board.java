package com.example.gymrat.domain;

import com.example.gymrat.dto.BoardRequest;
import com.example.gymrat.dto.BoardResponse;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;

import java.time.LocalDateTime;
import java.util.Date;

import static javax.persistence.FetchType.*;
import static javax.persistence.GenerationType.*;

@Entity
@Getter
@Setter
@SequenceGenerator(
        name = "BOARD_SEQ_GENERATOR"
        , sequenceName = "BOARD_SEQ"
        , initialValue = 1
        , allocationSize = 1
)
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Board {

    @Id
    @GeneratedValue(strategy = SEQUENCE,
                    generator = "BOARD_SEQ_GENERATOR")
    private Long boardNo;

    private String title;

    private String content;

    private String writer;

    @CreationTimestamp
    private LocalDateTime regDate;

    @UpdateTimestamp
    private LocalDateTime lastModifiedDate;

    public BoardResponse toDto() {
        return BoardResponse.builder()
                .boardNo(this.getBoardNo())
                .title(this.getTitle())
                .content(this.getContent())
                .writer(this.getWriter())
                .lastModifiedDate(this.getLastModifiedDate())
                .build();
    }

    public void updateBoard(BoardRequest boardRequest) {
        this.title = boardRequest.getTitle();
        this.content = boardRequest.getContent();
        this.lastModifiedDate = LocalDateTime.now();
    }

    @ManyToOne(fetch = LAZY)
    private Member member;

}

package com.example.gymrat.repository;

import com.example.gymrat.domain.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Long> {

    // select b from board b where b.title = :title
    List<Board> findByTitle(String title);

    // select b form baord b where b.title = :title and b.writer = :writer
    List<Board> findByTitleAAndAndWriter(String title, String writer);

    // 회원의 이름으로 회원이 작성한 게시판 찾기
    // select b from board b join b.member m where m.name = :name
    List<Board> findByMemberName(String name);

    // 회원의 이름으로 회원이 작성한 게시판 제목 찾기
    // select b from board where b.member.name = : name
    List<String> findBoardsByMemberName(String name);


}

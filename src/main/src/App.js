import React from 'react';
import {Route, Routes} from "react-router-dom";
import MainIndex from "./page/MainIndex";
import BoardPost from "./page/BoardPost";
import BoardDetail from "./page/BoardDetail";
import BoardEdit from "./page/BoardEdit";

function App() {
  return (
      <>
        <Routes>
          <Route element={<MainIndex/>} path="/" />
          <Route element={<BoardPost/>} path="/board/post"/>
          <Route element={<BoardDetail/>} path="/board/:id"/>
          <Route element={<BoardEdit/>} path="/board/:id/edit"/>
        </Routes>
      </>
  );
}

export default App;

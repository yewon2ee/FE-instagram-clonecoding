// src/pages/PostDetail.jsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import "./PostDetail.css";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null); // 게시물 데이터
  const [comments, setComments] = useState([]); // 댓글 목록
  const [newComment, setNewComment] = useState(""); // 입력 중인 댓글 내용

  // 게시물 상세 불러오기
  useEffect(() => {
    axiosInstance.get("/posts").then((res) => {
      const found = res.data.find((p) => p.id === Number(id));
      console.log("찾은 게시물", found);
      setPost(found);
    });
    loadComments();
  }, [id]);
  

  // 댓글 목록 불러오기
  const loadComments = () => {
    axiosInstance.get(`/comments/${id}`).then((res) => setComments(res.data));
  };

  // 댓글 작성
  const handleSubmit = () => {
    if (newComment.trim() === "") return;
    axiosInstance
      .post(`/comments/${id}`, {
        content: newComment,
        author: "익명",
      })
      .then(() => {
        setNewComment("");
        loadComments(); // 함수 이름 변경됨
      });
  };

  // 댓글 삭제
  const handleDelete = (commentId) => {
    axiosInstance
      .delete(`/comments/${id}?comment_id=${commentId}`)
      .then(() => loadComments()); // 함수 이름 변경됨
  };

  if (!post) return <p>Loading...</p>;
  return (
    <div className="post-detail-container">
      <img className="post-image" src={post.image_url} alt="post" />
  
      <div className="post-text-wrapper">
        <h2 className="post-title">{post.title}</h2>
        <p className="post-desc">{post.content}</p>
      </div>
  
      <div className="comment-section">
        <input
          className="comment-input"
          placeholder="댓글을 입력하세요"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button className="comment-btn" onClick={handleSubmit}>
          게시
        </button>
  
        <div className="comment-list">
          {comments.map((cmt) => (
            <div key={cmt.id} className="comment-item">
              <strong>{cmt.author}</strong>: {cmt.content}
              <button onClick={() => handleDelete(cmt.id)}>삭제</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  

};

export default PostDetail;

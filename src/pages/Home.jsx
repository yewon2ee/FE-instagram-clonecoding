
import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance"; 
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get("/posts")
      .then((res) => {
        console.log("게시물 응답 데이터:", res.data);
        setPosts(res.data);
      })
      .catch((err) => {
        console.error("게시물 불러오기 실패", err);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>전체 이미지 수: {posts.length}개</h2>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "16px"
      }}>
        {posts.map((post) => (
          <div
            key={post.id}
            onClick={() => navigate(`/post/${post.id}`)}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "10px",
              cursor: "pointer"
            }}
          >
            <img
              src={post.image_url}
              alt={post.title}
              style={{ width: "100%", borderRadius: "8px" }}
            />
            <h4>{post.title}</h4>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

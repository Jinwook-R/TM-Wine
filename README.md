

# TM-wine

AI 기반 와인 추천 시스템

<br>

## Development framework 

- Front-End : react
- Back-End : django 4.0
- AI
  - label detection : Yolov5
  - recommend :

<br>

## Workflow

#### 1. 라벨 기반 추천 기능
(client)와인 라벨을 찍어 사이트에 서버 업로드<br>
→ (Server-AI) 라벨을 인식하여 와인 이름 확인<br>
→ (Server-AI) 해당 와인 정보를 바탕으로 새로운 와인 추천 (군집화)<br>
→ (Server) 확인된 값을 client에 전달<br>

<br>

#### 2. 취향 기반 추천 기능
(client) web상에서 자신의 취향 선택<br>
→ (Server) db에서 사용자의 취향에 맞게 filtering 하여 client에 전달 










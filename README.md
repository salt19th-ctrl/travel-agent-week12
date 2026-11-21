# TravelLoop Korea — 국내 여행 AI Agent (12주차 실습 확장판)

기존 TravelLoop의 **OpenAI Responses API 기반 Agent Loop**와 **NAVER Cloud Maps** 연동을 유지하면서
해외 목적지·출발 공항 입력·해외 항공료 가정을 제거한 **국내 여행 전용 수정본**입니다.

## 핵심 기능

- 여행지: **서울, 부산, 제주**만 지원 (해외 목적지는 클라이언트와 서버 양쪽에서 차단)
- 출발일, 기간 2~6일, 인원 1~8명, 예산, 취향, 추가 요청 입력
- OpenAI AI Agent가 `search_places`, `estimate_budget`, `get_driving_route` 도구를 상황에 맞게 호출
- 도시별 정적 참고 장소: 서울 10곳, 부산 10곳, 제주 8곳 (실시간 관광지 검색이 아님)
- NAVER Cloud Maps **Dynamic Map / Geocoding / Directions 5**를 이용한 실제 자동차 경로
- 일정 카드, 조건을 변경한 재계획, 도구 호출 이력, 인쇄/PDF 저장, 키 없이 보는 데모 모드

### 데이터 한계와 예산 계산

- `search_places`: 수동으로 준비한 국내 관광지 목록입니다. 운영시간·매진 여부를 실시간 조회하지 않습니다.
- `estimate_budget`: **숙박·식비·현지 교통·관광 활동을 가정 단가로 계산**합니다.
- **출발지에서 목적지까지의 왕복 교통비(항공·기차·버스·자가용 등)는 포함하지 않습니다.** 제주 항공권 실시간 가격도 조회하지 않습니다.
- `get_driving_route`: NAVER Maps에서 받은 실제 **자동차** 경로만 표시합니다. 도보·대중교통 소요시간은 제공하지 않습니다.
- 장소·주소 데이터는 샘플이며 실제 영업 여부와 주소 변경 가능성을 사용자가 확인해야 합니다.
- 데모 모드에서는 OpenAI를 호출하지 않습니다. 여행지 데이터보다 일정 슬롯이 많으면 나머지를 '자유 일정'으로 보여줍니다.

## 1. 기존 프로젝트에 반영하는 방법 (Mac / VS Code)

1. 수정본 ZIP을 압축 해제합니다.
2. **GitHub와 이미 연결된 기존 TravelLoop 프로젝트 폴더**를 VS Code에서 엽니다.
3. 수정본 폴더 `travel-agent-week12`의 **내용물**을 기존 프로젝트에 복사해 덮어씁니다. **`.git` 폴더와 `.env.local`은 유지합니다.**
4. 로컬 프로젝트 폴더에서 다음 명령을 실행합니다.

```bash
npm install
npm test
npm run build
npm run dev
```

5. `http://localhost:3000`에서 국내 도시 선택·AI/데모 모드·자동차 경로 표시를 확인합니다.
6. 변경 파일을 GitHub에 반영합니다.

```bash
git status
git add -A
git status
git commit -m "Make TravelLoop Korea-only"
git push
```

`git status`에 `.env.local`이나 API 키 파일이 포함되지 않아야 합니다.

## 2. Vercel 환경변수 (Production)

기존에 등록한 아래 **신규 NAVER Maps** 변수와 OpenAI 키를 **그대로 사용**합니다. 다시 발급할 필요가 없습니다.

```dotenv
OPENAI_API_KEY=기존_실제_키
NEXT_PUBLIC_NAVER_MAPS_CLIENT_ID=신규_Maps_Client_ID
NAVER_MAPS_CLIENT_ID=신규_Maps_Client_ID
NAVER_MAPS_CLIENT_SECRET=신규_Maps_Client_Secret
```

- Client Secret은 서버 전용이며 GitHub에 업로드하면 안 됩니다.
- **기존 배포 도메인:** https://travel-agent-week12-4v9u.vercel.app/
- 위 주소는 **이 수정본의 신규 배포 성공이 검증되기 전에는 기존 앱의 주소**입니다. GitHub Push 뒤 Vercel **Deployments**가 `Ready`이고 실제 URL에서 국내 도시만 나오는지 확인하세요.
- Vercel의 도메인을 바꿀 경우 NAVER Cloud Maps 콘솔 `Web 서비스 URL`에도 등록해야 지도가 보입니다.
- 구형 `NAVER_LEGACY` 변수는 현 코드에서 사용하지 않습니다. 신규 지도 정상 작동을 확인한 뒤 삭제해도 됩니다.

## 3. 최종 점검

- [ ] 도시 선택에 서울·부산·제주만 보이는지
- [ ] 시작 화면의 `KOREA TRIP` 표시와 `출발 공항` 필드 제거 여부
- [ ] 데모 모드에서 국내 일정을 생성하고 외국 도시·'귀국편' 문구가 안 나오는지
- [ ] AI 모드에서 실제 `search_places`·`estimate_budget` 호출 로그가 있는지
- [ ] `get_driving_route`가 실제 실행된 경우에만 자동차 이동 시간 표시하는지
- [ ] '네이버지도 실제 경로 조회' 후 지도와 경로가 보이는지
- [ ] 예상 예산에 여행지까지 왕복 교통비가 포함되지 않았다는 안내가 있는지
- [ ] `npm test`와 `npm run build`가 통과했는지
- [ ] Vercel에서 새 배포가 `Ready`이며 수정된 페이지가 보이는지

## 기술 개요

Next.js / React / Node.js, OpenAI Responses API Function Calling, NAVER Cloud Maps Dynamic Map·Geocoding·Directions 5.
일반 LLM 요약과 구별해 실제 도구 실행·결과 평가를 표시합니다. 단 실제 관광지 검색 API나 예약 API를 갖춘 상용 여행 에이전트는 아닙니다.

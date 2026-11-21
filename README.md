# TravelLoop — 12주차 AI 여행 Agent 실습

수업자료 「일반 여행 앱 vs. AI Agent 기반 여행 앱」에 제시된 **목표 → 도구 선택 → 실행 → 관찰 → 재판단** 구조를 구현하는 Next.js 웹앱입니다.

## 제출 가능한 결과물

- 도시(도쿄·오사카·후쿠오카), 일수, 인원, 예산, 취향 입력
- OpenAI Responses API Function Calling으로 `search_places`와 `estimate_budget` 호출
- 모델 요청 → 서버 도구 실제 실행 → 결과 반환 → 최종 일정 생성의 Agent Loop
- `비가 온다` 등 조건 변경 시 장소 재검색을 할 수 있도록 설계
- 일정별 카드와 예산 추정, 실제 도구 호출 로그 표시, 브라우저에서 인쇄/PDF 저장
- **데모 모드:** AI 키 없이 화면과 기능을 시연할 수 있으나, 실제 Agent 기능 검증은 아님

### 중요한 한계

관광지 데이터는 학습용으로 수동 작성한 목록입니다. 항공권·호텔 실제 가격, 운영시간, 예약 가능 여부, 실시간 날씨, 이동거리, 지도 경로는 조회하지 않습니다. 예산은 명시적인 **가상 단가**입니다. 예약/결제 기능도 없습니다.

## 1. Mac + VS Code에서 실행

1. 압축을 해제하고 `travel-agent-week12` 폴더를 VS Code로 엽니다.
2. VS Code 터미널에서 실행:

```bash
npm install
cp .env.example .env.local
npm run dev
```

3. 브라우저에서 `http://localhost:3000` 접속합니다.
4. 처음에는 **무료 데모 모드**로 화면·흐름을 확인합니다.
5. **실제 AI Agent 기능**을 테스트하려면 `.env.local`의 `OPENAI_API_KEY=` 뒤에 본인의 API 키를 입력하고 개발 서버를 재시작합니다. API 사용 요금이 발생할 수 있습니다.
6. 실제 AI 모드에서 도구 호출 로그가 `실제 함수 실행`으로 나타나는지 확인합니다.

**주의:** `.env.local`에 실제 키를 넣어도 GitHub에는 업로드하지 마세요. `.gitignore`에 제외해 두었습니다.

## 2. GitHub에 올리기

GitHub에서 비어 있는 새 저장소 `travel-agent-week12`를 생성합니다. VS Code 터미널에서 이 폴더를 기준으로:

```bash
git init
git add .
git commit -m "Add week12 travel agent app"
git branch -M main
git remote add origin https://github.com/내-아이디/travel-agent-week12.git
git push -u origin main
```

`내-아이디`는 실제 GitHub 사용자 ID로 변경합니다. Git 인증이나 중복 저장소 오류가 나오면 기존 저장소 설정을 확인하세요.

## 3. Vercel에 배포

1. https://vercel.com/new 접속 후 GitHub 연동, `travel-agent-week12` 저장소 Import.
2. Framework Preset은 **Next.js**, Root Directory는 프로젝트 루트를 선택합니다.
3. Environment Variables에 `OPENAI_API_KEY`와 필요시 `OPENAI_MODEL`을 추가합니다. 실제 값은 README나 GitHub 파일에 적지 않습니다.
4. Deploy 클릭 후 배포가 `Ready`가 될 때까지 확인합니다.
5. Vercel이 표시한 `https://...vercel.app` URL에서 직접 AI 모드로 장소 조회·일정 생성 테스트를 수행합니다.
6. `https://배포주소/api/health`에서 `aiReady:true`가 확인되면 API 키 설정은 되어 있는 상태입니다. **실제 호출 성공 여부는 AI 모드에서 별도 확인**해야 합니다.
7. 문제 없으면 배포 URL을 수업 제출란에 붙여넣습니다.

> Vercel에서 환경변수를 나중에 추가/수정했다면 변경을 반영한 새 배포가 필요할 수 있습니다.

## 4. 교수님에게 설명할 핵심 내용

- **Goal:** 여행지·기간·예산·취향에 맞는 초안 제작
- **Decision:** LLM이 필요한 장소 검색, 예산 도구를 선택
- **Action:** Node.js 서버가 실제 함수 실행
- **Observation:** 모델이 도구 반환값을 받은 뒤 일정 작성
- **Iteration:** 비 또는 관심사 변경 시 재검색 요청 가능
- **Human Control:** 실제 예약·결제는 수행하지 않음

## 5. 점검 목록

- [ ] 데모 모드에서 도시 선택·날짜·인원·예산·일정 카드 정상 표시
- [ ] AI 모드에서 OpenAI API 연결 성공
- [ ] `search_places`와 `estimate_budget` 함수 호출 기록 확인
- [ ] `비가 온다면 실내 중심으로 바꿔줘` 등 후속 요청 테스트
- [ ] `npm run test` 통과
- [ ] 배포 URL에서 테스트 (로컬 화면으로 대신하지 않기)
- [ ] API 키·개인정보 저장소 업로드되지 않았는지 확인
- [ ] 실제 숙박·항공권 요금 조회 아님을 화면에서 알 수 있음

## 6. 강의 내용과의 관계

실습 근거: `참고. 일반 여행앱 vs. AI agent 기반 여행 앱.html` 및 `Week12. AI Agent 강의내용.html`. 자료의 여행 사례는 **개념 비교**이며 코드·정확한 과제 규격이 제시된 완성 프로젝트가 아니므로, 이 프로젝트는 개념에 맞게 자체 구성한 구현 예시입니다.


## 7. 12주차 추가 실습: 신규 NAVER Cloud Maps 지도 연동

- 기존 일본 여행지는 유지하면서 서울·부산·제주 여행지를 추가했습니다.
- 국내 관광지 검색은 실습용 장소 데이터, 경로는 네이버 서버의 실제 Directions 5 결과를 사용합니다.
- 지도 표시: `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=...`
- 주소→좌표: `https://maps.apigw.ntruss.com/map-geocode/v2/geocode`
- 자동차 경로: `https://maps.apigw.ntruss.com/map-direction/v1/driving`
- 인증 헤더: `x-ncp-apigw-api-key-id` (Client ID), `x-ncp-apigw-api-key` (Client Secret)
- 네이버 콘솔에서 **Application Services → Maps**의 `Dynamic Map`, `Geocoding`, `Directions 5`를 신청해야 합니다.
- 서비스 URL은 `https://travel-agent-week12.vercel.app`를 등록합니다. 다른 도메인에서 열 경우 해당 도메인도 등록해야 합니다.

### Vercel 환경변수 (Production)

```dotenv
NEXT_PUBLIC_NAVER_MAPS_CLIENT_ID=신규_Client_ID
NAVER_MAPS_CLIENT_ID=신규_Client_ID
NAVER_MAPS_CLIENT_SECRET=신규_Client_Secret
OPENAI_API_KEY=OpenAI_키
```

- 새 코드에는 구형 `NAVER_LEGACY_...` 환경변수를 사용하지 않습니다. 신규 지도 성공을 확인한 뒤 구형 키를 삭제하세요.
- 새 환경변수 등록 후 GitHub 코드 업데이트와 Vercel 새 배포가 필요합니다.
- 지도 API 호출은 사용자 브라우저가 아닌 Next.js 서버에서 수행하며, Secret은 공개되면 안 됩니다.
- **지도 조회 검증:** 국내 도시 선택 → AI 여행 계획 생성 → `네이버지도 실제 경로 조회` 버튼 → 경로 시간/거리와 지도 표시.
- **Agent 검증:** 국내 여행 계획을 AI 모드로 만들고 `get_driving_route`가 `실제 함수 실행`인지 로그에서 확인.
- API 호출 실패 때는 이전/추정 시간으로 대체하지 않습니다.
- 가격·영업시간·숙소·항공권·관광지 정보는 여전히 실시간 API가 아니라 실습용 값이거나 미조회입니다.
- Directions 5는 자동차 기준이며 대중교통/도보 경로가 아닙니다.

### 배포 전 점검

```bash
npm install
npm test
npm run build
git status
git add .
git commit -m "Switch TravelLoop to new NAVER Maps API"
git push
```

기존 저장소 폴더를 열고 수정본 파일을 **그 폴더 안으로 복사**합니다. `.git`과 `.env.local`을 보존하고, `git status`에서 키 파일이 추적되지 않는지 확인하세요.
Vercel에서 Production 환경변수 등록 후 최신 배포가 새 커밋을 사용하도록 배포하세요.

공식 문서:
- https://api.ncloud-docs.com/docs/application-maps-overview
- https://api.ncloud-docs.com/docs/application-maps-directions5
- https://api.ncloud-docs.com/docs/application-maps-geocoding
- https://guide.ncloud-docs.com/docs/application-maps-troubleshoot

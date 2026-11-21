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


## 7. 12주차 추가 실습: 기존 AI·NAVER API 지도 연동 (구형)

**중요:** 네이버 공식 공지에 따라 이 서비스는 **2026-11-24(화) 18:00 KST 종료 예정**입니다.
배포와 API 키 등록 및 실제 작동 테스트를 그 이전에 완료하세요. 이후에는 신규 Maps로 전환해야 합니다.

### 네이버 클라우드 설정

1. 네이버 클라우드 콘솔에서 `AI·NAVER API > Application`으로 이동합니다.
2. 기존 애플리케이션을 사용하거나, 신규 등록이 가능하다면 `TravelLoop`를 등록합니다.
3. `Web Dynamic Map`, `Directions 5`, `Geocoding`을 선택합니다.
4. Web 서비스 URL에 `https://travel-agent-week12.vercel.app`, 로컬용 `http://localhost`를 등록합니다(경로/포트 제외).
5. 발급된 Client ID/Secret을 `.env.local`에 저장합니다. 지도 표시용 공개 ID와 서버 ID는 같은 값입니다.

```dotenv
OPENAI_API_KEY=본인의_키
NEXT_PUBLIC_NAVER_LEGACY_CLIENT_ID=기존_클라이언트_ID
NAVER_LEGACY_CLIENT_ID=기존_클라이언트_ID
NAVER_LEGACY_CLIENT_SECRET=기존_클라이언트_Secret
```

**중요:** Secret을 `NEXT_PUBLIC_` 변수에 넣지 마세요. 키를 GitHub나 제출 문서에 기재하지 마세요.

### 적용한 기술

- 웹 지도 SDK: `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=...`
- 주소→좌표: `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode`
- 자동차 경로: `https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving`
- REST API 요청은 Next.js 서버에서만 수행합니다.
- Agent `get_driving_route` 도구는 검증된 국내 관광지 ID 2개만 받아 API를 호출합니다.
- 화면의 `네이버지도 실제 경로 조회` 버튼은 **첫날 오전·오후** 장소를 실제 조회해 지도/거리/시간으로 표시합니다.
- 네이버 API 미설정/실패/서비스 종료 후에도 국내 관광지 데이터와 데모 일정은 이용할 수 있지만 지도 경로 기능은 실패로 표시됩니다.
- 해외 관광지 지도는 제공하지 않습니다.
- 네이버 지도 Directions 5는 **자동차 이동 기준**이며, 대중교통/도보 이동시간은 제공하지 않습니다.

### Vercel 배포

1. 위 3개 `NAVER...` 환경변수에 실제 값을 입력합니다(Production).
2. GitHub에 수정 파일을 푸시합니다. 환경변수 신규 등록은 재배포해야 적용됩니다.
3. 국내 도시를 선택해 AI 모드로 계획을 생성합니다. OpenAI API 키가 없으면 데모 모드로 화면부터 테스트합니다.
4. 국내 여행 일정을 생성한 뒤 `네이버지도 실제 경로 조회`를 누릅니다. 지도와 실제 거리·시간이 나오는지 확인합니다.
5. AI 모드 도구 실행 로그의 `get_driving_route`가 성공한 경우에만 Agent의 외부 API 사용 성공을 입증할 수 있습니다. 버튼으로 호출한 경로는 별도 수동 검증 기능입니다.

공식 참고: https://www.ncloud.com/support/notice/all/2200

### 주의

- 이번 실습에 들어간 관광지의 주소는 테스트 입력값이며, Geocoding 응답이 없으면 실제 지도를 표시하지 않습니다.
- 실제 이동거리는 Directions 5 성공 응답에서만 표시합니다.
- 지도 API 조회 비용이 발생할 수 있으니 사용량 한도를 설정하세요.

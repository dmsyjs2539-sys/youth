# 미래청년교육연구소 현재 상태

마지막 업데이트: 2026-08-07

## 구현 완료

- 메인페이지 (Figma node 34:517 기준)
- 브랜드(연구소) 소개 페이지 `brand/index.html` (Figma node 34:679 기준)
  - 히어로: 배경 이미지 + eyebrow / 그라데이션 기관명 / 소개 문구
  - 철학: "Beyond Meta-Cognition, Towards Youth Future" + Vision(좌) / Mission(우)
  - Our Core Values: 카드 4종 (Self Awareness / Metacognition / Growth / Connection)
  - Our History: 중앙 라인 좌우 교차 타임라인 5개 (2019.05 ~ 2024.02)
  - 메인페이지의 헤더·GNB·푸터·맨 위로 버튼과 스크롤/스플릿 모션을 그대로 재사용
- 전체 반응형 (Mobile ~767px / Tablet 768~1023px / Desktop 1024px~)
  - 공통·메인페이지 반응형: `css/responsive.css`
  - 브랜드 페이지 반응형: `css/brand.css` 하단
  - 데스크톱에서 `--content_max: 1200px`로 최대 폭 제한 + 중앙 정렬
- 로그인 / 회원가입 페이지 `login.html` (+ `css/login.css`, `js/login.js`)
  - 로그인 카드 + 회원가입 카드 2단 (모바일 1단)
  - 인증 서버 미연결 상태이므로 제출은 막고 상태 메시지만 노출
- GNB 3분할 개편 + hover 인터랙션 (2026-08-07)
- 헤더: 고정 헤더, 스크롤 시 배경 강화, 햄버거 메뉴 토글
- 히어로: 배경 이미지 + 하단 그라데이션 오버레이, 메인 카피
- 인트로: eyebrow 텍스트 + 그라데이션 기관명
- 메뉴 카드: 2x2 그리드 4종 (연구소 소개 / 연구 자료 / 교류 기관 / 강의 및 컨설팅 신청)
- 기관 소개: 배경 이미지 위 소개 문구
- 연구 분야: 카드 4종 (교육 연구 / 프로그램 개발 / 실험 및 검증 / 네트워킹)
- 관련 시스템 링크 2종, 푸터
- JS 애니메이션/인터랙션 (Vanilla JS + CSS Transition + IntersectionObserver)
  - 햄버거 아이콘 ↔ X 모핑 (열림/닫힘 역순)
  - 메뉴 항목 Stagger 페이드인 (65ms 간격)
  - 히어로 타이틀 글자 단위 스플릿 등장 (페이지 로드 시)
  - 섹션 타이틀 글자 단위 스플릿 등장 (스크롤 진입 시)
  - 카드·콘텐츠 Slide-Up & Fade-In (형제 요소 간 90ms Stagger)
- 진입 인트로(스플래시) 오버레이
  - 심볼(마름모 / 바디)이 각자 회전 + Glow하며 정위치 안착 → 반짝임 스윕
  - 로고타입 + 영문 태그라인 아래에서 위로 페이드인
  - 딥 네이비 오버레이가 중앙으로 수축(clip-path circle)하며 메인으로 전환
  - 종료 후 DOM에서 완전 제거, 스크롤 잠금 해제
- 맨 위로 이동 버튼 (우측 하단 고정, 스크롤 520px 초과 시 등장, smooth scroll)

## 구현 중

- 없음

## 확정된 UX 정책

- 전체 메뉴는 닫힌 상태로 시작하며, 메뉴 항목 클릭 또는 Escape 키로 닫힘
- 메뉴 버튼은 aria-expanded / aria-label을 상태에 맞게 갱신
- GNB 전환 기준은 **768px** (JS `INLINE_NAV_MIN_WIDTH`와 CSS 미디어쿼리가 같은 값)
  - ~767px: 로고 / [계정 아이콘 + 햄버거]. 전체 메뉴는 헤더 아래 드롭다운
  - 768px~: [좌] 로고 / [중앙] 전체 메뉴 / [우] 로그인·회원가입.
    햄버거와 계정 아이콘은 숨기고 메뉴는 항상 펼쳐 둔다
  - JS `syncNavMode()`가 hidden 속성과 열림 상태를 breakpoint에 맞춰 초기화하며,
    `setNavOpen()`은 768px 이상에서 아무 것도 하지 않는다
- 768~1023px는 가로 폭이 빠듯해 로고 **글자를 숨기고 심볼만** 노출한다.
  접근 가능한 이름은 `.header_logo`의 aria-label이 유지한다. 1024px부터 글자 복귀
- 로그인·회원가입 진입점은 모바일 계정 아이콘 / 768px 이상 텍스트 링크 두 가지
- 브랜드 소개 페이지에는 진입 인트로(스플래시)를 넣지 않는다.
  인트로는 메인페이지 진입 시에만 재생한다. (main.js는 splash 요소가 없으면 건너뜀)
- 브랜드 소개 페이지의 GNB '연구소 소개' 항목은 aria-current="page"로 현재 위치 표시
- 등장 애니메이션은 1회만 재생 (등장 후 observer unobserve)
- prefers-reduced-motion 설정 시 모든 모션을 끄고 콘텐츠를 즉시 노출
- 인트로는 메인페이지 로드 시마다 재생 (약 3.3초). 세션당 1회로 바꾸려면
  runSplash()에 sessionStorage 가드를 추가하면 된다.
- 인트로가 떠 있는 동안 body 스크롤을 잠그고, 히어로 타이틀 모션은
  인트로가 걷힌 뒤에 시작한다 (인트로 뒤에서 재생돼 버리는 것을 방지)

## 헤더 구현 규칙 (2026-08-07)

- `.global_nav`는 **`<header>` 안 `.header_inner`의 자식**이다.
  768px 이상에서 로고·메뉴·로그인을 겹침 없이 3분할하려면 같은 그리드에 있어야 한다.
  `.header_inner`는 `grid-template-columns: 1fr auto 1fr`이라 가운데 메뉴가 화면 정중앙에 온다.
- 모바일 드롭다운은 **`position: absolute` (fixed 아님)** 로 헤더 패딩 박스에 붙인다.
  `.header.is_scrolled`의 `backdrop-filter`가 `position: fixed`의 컨테이닝 블록이 되어
  스크롤 전후로 기준이 바뀌기 때문이다. absolute면 영향을 받지 않는다
  (2026-08-07 스크롤 전/후 top·left·width 동일 확인).
- hover 효과는 `@media (min-width: 768px) and (hover: hover)`로 분리한다.
  터치 기기에서 hover가 눌린 채 남는 것을 막고, 키보드는 `:focus-visible`이 담당한다.
- 밝은 배경 페이지(login.html)는 `.header_solid`를 함께 붙여 헤더를 불투명하게 만든다.
  기본 헤더 배경은 어두운 히어로 위를 전제로 한 반투명 스크림이라 흰 글자가 묻힌다.
- **클래스 이름 충돌 주의**: `.field`는 이미 메인페이지 '연구 분야' 섹션이 쓰고 있다
  (`layout.css`, `padding: 56px 23px 0`). 로그인 폼은 `.auth_field*`로 접두사를 붙였다.
  새 컴포넌트를 만들 때 기존 클래스명을 먼저 grep할 것.

## 애니메이션 구현 규칙

- 상태 class는 is_open, is_visible 사용 (프로젝트 snake_case 규칙 준수)
- 애니메이션 스타일은 css/animations.css, 인트로는 css/splash.css로 분리
- 인트로 심볼은 파트별 회전이 필요해 index.html에 인라인 SVG로 삽입
  (외부 img로는 내부 path를 CSS로 제어할 수 없음)
- 반짝임(shine)은 SVG 내부 rect에 clipPath(#splash_symbol_clip)를 적용해
  심볼 실루엣 안에서만 보이게 한다. 사각형 div로 덮으면 네모가 빛나 보인다.
- 광원(glow)에 **SVG <g> + filter: drop-shadow()를 쓰면 안 된다.**
  SVG 필터 영역(기본 bbox의 120%)에 블러가 잘려 회전 중 사각형 경계가 드러난다.
  (2026-08-06 브라우저에서 재현·확인) 대신 .splash_glow 원형 radial-gradient
  레이어를 심볼 뒤에 깔아 사용한다. .splash_stage에 overflow:hidden을 주면
  이 광원이 잘리므로 주의.

## 브랜드명 표기

- 정식 명칭은 **미래청년교육연구소** (2026-08-07 사용자 확정)
  - 2026-08-06에 '연구회'로 확정했다가 2026-08-07에 '연구소'로 되돌림.
    표기를 바꿀 때는 index.html / brand/index.html 전체를 함께 치환해야 한다.
- 로고는 심볼만 assets/icons/logo_symbol.svg로 분리해 쓰고,
  글자는 Pretendard 텍스트로 렌더링한다 (헤더 17px / 푸터 19px / 인트로 26px, 700).
  반응형 폭에 따라 글자 크기를 조절해야 해서 SVG 통짜 로고를 쓰지 않는다.
- logo_header.svg, logo_footer.svg(Figma 원본, '연구소' 벡터 텍스트 포함)는
  현재 사용하지 않는다 — 참고용으로만 남겨둠
- 본문 카피의 '미래청년교육원'은 Figma 원문 그대로 유지 중 — 확인 필요
- 스플릿 텍스트 대상은 HTML에 .split_text 클래스로 표시,
  페이지 로드 시 재생할 대상은 data-split-load 속성 추가
- 스크롤 등장 대상은 HTML에 data-reveal 속성으로 표시,
  Stagger 순번은 JS가 같은 부모 내 순서로 --reveal_index에 자동 주입
- 스플릿 시 원문은 부모 요소 aria-label로 보존하고 분해된 글자는 aria-hidden 처리

## 디자인과 다르게 구현한 부분

- Figma 원본의 "연구 분야"는 회색 박스 3개이며 2·3번째 문구가 중복 상태였음.
  사용자 요청에 따라 4개 카드로 확장하고 문구를 사용자 제공안으로 교체함.
- 회색 단색 배경이 더미처럼 보이는 문제를 보완하기 위해 카드에 그라데이션 배경,
  상단 브랜드 액센트 라인, 번호 인덱스(01~04), 카테고리 아이콘을 추가함.

## Our Core Values 이미지 매핑

2026-08-07 사용자가 Figma 원본 사진 4종을 assets/images에 추가해 교체 완료.

| 카드 | 파일 |
|---|---|
| Self Awareness / 자기이해 | `unsplash_zdSoe8za6Hs.png` (청년 실루엣) |
| Metacognition / 메타인지 | `unsplash_6jYoil2GhVk.png` (노트북 작업) |
| Growth / 성장 | `unsplash_qQT7l54ERZM.png` (도시 야경) |
| Connection / 연결 | `unsplash_nzuSrCfX7Eo.png` (회의·협업) |

- 4장 모두 세로 비율 PNG (735~1200px 폭). 카드는 object-fit: cover라 비율 영향 없음.
- 파일당 약 1MB, 합계 4.4MB. 필요 시 JPEG/WebP 변환 및 loading="lazy" 검토.

## 사용 중인 라이브러리

- Pretendard (CDN, jsdelivr): 본문 및 제목 폰트

## 저장 데이터

- 없음 (localStorage 미사용)

## 알려진 문제

- Core Values 이미지 4장 합계 4.4MB (PNG). 최적화 미적용
- login.html은 화면 틀만 있고 인증 서버가 없다. 제출 시 안내 메시지만 노출
- 비밀번호 찾기(`#find_password`)는 앵커 placeholder

## 다음 작업

1. 인증 API 연동 (login.html 제출 처리, 로그인 상태에 따른 헤더 전환)
2. 남은 메뉴 카드·링크의 실제 이동 경로 연결
   (연구소 소개 → brand/index.html 연결 완료, 나머지는 앵커 placeholder)
3. 하위 페이지(연구 자료, 교류 기관, 강의 및 컨설팅 신청) 구현
4. Core Values 이미지 경량화 (JPEG/WebP 변환, loading="lazy")

## 마지막 검증 결과 (2026-08-07, GNB 개편 + 로그인 페이지)

- 실행 명령: node 정적 서버 (http://localhost:4173)
- 확인 화면: 360 / 375 / 768 / 1024 / 1280 / 1440px × 메인·브랜드·로그인 3개 페이지
- 통과한 항목
  - 전 조합에서 가로 스크롤 없음(docW=clientW), 넘치는 요소 0개, 깨진 이미지 0건,
    콘솔 오류 0건
  - 모바일 헤더: 로고(23~178) / 계정 아이콘(284~313) / 햄버거(325~354) 겹침 없음
  - 모바일 드롭다운: 스크롤 전후 모두 top=58 / left=0 / width=375로 동일
    (backdrop-filter 컨테이닝 블록 전환에도 위치 고정 확인)
  - 768px: 로고 심볼만(40~61), GNB 172~556(화면 중앙 대비 -12px),
    로그인·회원가입 572~713, 햄버거·계정 아이콘 display:none
  - 1024 / 1280 / 1440px: 로고 글자 복귀, GNB 화면 정중앙(offset 0),
    로고↔메뉴 / 메뉴↔로그인 간격 156~202px, 히트 테스트 3영역 모두 정상
  - hover(실제 마우스 이동으로 확인)
    - 메뉴 항목: 색 rgba(255,255,255,0.82) → #fff, 밑줄 scaleX 0 → 1
    - 로그인: 배경 rgba(255,255,255,0.16) 차오름
    - 회원가입: 브랜드 그라데이션 채움 + 그림자 + translateY(-1px)
    - 현재 페이지(aria-current) 항목은 hover 없이도 밑줄 유지
  - 로그인 폼: 빈 값·잘못된 이메일 → has_error 메시지 + 해당 입력 포커스,
    정상 입력 → 안내 메시지, 어느 경우에도 페이지 이동 없음
  - 모든 input이 label 또는 aria-label과 연결됨 (미연결 0건)
- 확인하지 못한 부분
  - 창 크기를 실시간으로 바꿀 때의 GNB 모드 전환(matchMedia change)은
    이 환경에서 change 이벤트가 발생하지 않아 미검증. 각 폭에서 새로고침 시에는 정상
  - 실기기 테스트, 터치 기기에서의 hover 잔상 (CSS로만 방어)

## 이전 검증 결과 (2026-08-07, 반응형 + 브랜드 페이지)

- 실행 명령: node 정적 서버 (http://localhost:4173)
- 확인 화면: 360px, 375px, 768px, 820px, 1280px (메인 / 브랜드 소개 두 페이지)
- 통과한 항목
  - 두 페이지·전 브레이크포인트에서 가로 스크롤 없음(docW=clientW), 넘치는 요소 0개
  - 콘솔 오류 0건, 리소스 전체 200 OK, 깨진 이미지 0건
  - 토큰 전환: --page_padding 23 → 40 → 48px, --header_height 58 → 68 → 76px
  - 메인 menu_grid 2열(360·820px) → 4열(1280px), field_list 1열 → 2열 → 4열,
    link_list·footer_inner 1열 → 2열
  - 브랜드 value_list 1열 → 2열(327px) → 4열(277px),
    history_track 데스크톱에서 900px 폭 중앙 정렬
  - 데스크톱 GNB: 햄버거 display:none, 전체 메뉴가 헤더에 가로 배치(우측 정렬),
    로고·nav 링크 모두 elementFromPoint 히트 테스트 통과(pointer-events 충돌 없음)
  - 링크: 메인 GNB '연구소 소개'·소개 카드 → brand/index.html,
    브랜드 로고 → index.html, 브랜드 GNB 나머지 → ../index.html#앵커
  - 375px·768px 스크린샷으로 히어로 / Vision·Mission / Core Values / History 시각 확인
- 확인하지 못한 부분
  - 데스크톱(1280px) 스크린샷은 히어로·GNB만 확보. 이후 미리보기 창이 hidden 상태가 되어
    나머지 섹션은 DOM 측정값(위치·크기·컬럼 수)으로만 검증함
  - 미리보기 창이 hidden이면 IntersectionObserver·requestAnimationFrame이 멈추므로
    해당 상태에서의 스크롤 등장 모션·메뉴 토글 실동작은 재현 불가.
    375px·768px 가시 상태에서는 정상 동작 확인함
  - 창 크기를 실시간으로 바꿀 때의 GNB 모드 전환(matchMedia change)은
    이 환경에서 change 이벤트가 발생하지 않아 미검증. 각 폭에서 새로고침 시에는 정상
  - 실기기 테스트

## 이전 검증 결과 (2026-08-06, 모바일 메인페이지)

- 실행 명령: node 정적 서버 (http://localhost:4173)
- 결과: 통과
- 확인 화면: 360px, 402px
- 확인 내용:
  - 가로 스크롤 없음(docW=winW), 넘치는 요소 0개, 콘솔 오류 없음, 리소스 전체 200 OK
  - 메뉴 토글 동작 및 aria-expanded / aria-label 갱신, Tab 순서 시각적 흐름과 일치
  - 히어로 스플릿: 22자 3줄 분해, 450ms 시점 opacity 0.77→0.43 순차 그라데이션 확인
  - 햄버거 모핑: 바 1·3 ±45° 회전 + 6.8px 이동, 바 2 scaleX(0.2) 페이드, 닫을 때 완전 복원
  - 메뉴 항목 Stagger: transition-delay 0.09s → 0.35s 순차 적용
  - 스크롤 등장: 최상단에서 뷰포트 내 요소만 발동, 스크롤에 따라 카드 1→2→4개 순차 발동
  - 모션 최소화 규칙 적용 시 숨겨지는 요소 0개
  - 인트로 시퀀스: 0.15s 바디 등장 → 0.35s 마름모 합류(회전+Glow) → 1.35s 정위치 →
    1.4s 심볼 내부 반짝임 스윕 → 1.72s 로고타입 → 2.62s 오버레이 수축 → 3.4s DOM 제거
  - 인트로 심볼·로고타입 모두 뷰포트 중앙(201px)에 정확히 정렬, 영문 태그라인 제거
  - 반짝임이 심볼 실루엣 안에서만 스침 (clipPath 적용 확인)
  - 헤더·푸터·인트로 브랜드명 표기 통일 (당시 확정 명칭 '미래청년교육연구회' 기준.
    2026-08-07에 '미래청년교육연구소'로 되돌림)
  - 360px에서 헤더 로고(우측 178px)와 메뉴 버튼(좌측 310px) 겹침 없음
  - 인트로 사각형 잔상 제거: g의 drop-shadow 제거 전/후 스크린샷 비교로 원인 확정,
    원형 광원 교체 후 사각 경계 사라진 것 확인
  - 인트로 심볼-로고타입 간격 66px → 12px, 로고타입 21px → 26px
  - 맨 위로 버튼: 400px에서 숨김 / 700px에서 표시(pointer-events auto),
    클릭 시 2000px → 0 이동 후 자동 숨김, 360px에서 46x46 뷰포트 내 정상 배치
  - 인트로 종료 후 화면 중앙 elementFromPoint가 hero로 잡혀 클릭 방해 없음 확인
  - .field_card_lead 18px / line-height 27px 적용, 카드 높이 335px → 266px
- 확인하지 못한 부분: 768px·1280px (이번 작업 범위 제외), 실기기 테스트

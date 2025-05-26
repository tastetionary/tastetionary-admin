# Tastetionary Admin

pnpm + TanStack Router + Vite + TypeScript + shadcn/ui + TailwindCSS 기반의 어드민 대시보드 프로젝트입니다.

## 기술 스택

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Language**: TypeScript
- **Routing**: TanStack Router
- **Styling**: TailwindCSS
- **UI Components**: shadcn/ui
- **Package Manager**: pnpm
- **Icons**: Lucide React

## 설치 및 실행

### 1. 의존성 설치
```bash
pnpm install
```

### 2. 개발 서버 실행
```bash
pnpm run dev
```

### 3. 빌드
```bash
pnpm run build
```

### 4. 라우트 생성 (새 라우트 추가 시)
```bash
pnpm run routes:generate
```

## 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── ui/             # shadcn/ui 컴포넌트
│   └── AdminDashboard.tsx
├── lib/                # 유틸리티 함수
│   └── utils.ts
├── routes/             # TanStack Router 라우트
│   ├── __root.tsx      # 루트 라우트
│   ├── index.tsx       # 홈 페이지
│   └── admin.tsx       # 어드민 페이지
├── App.tsx
├── main.tsx
└── index.css
```

## 주요 기능

### 어드민 대시보드 (`/admin`)
- 📊 실시간 통계 카드 (사용자, 주문, 매출, 성장률)
- 📋 최근 주문 목록
- ⚡ 빠른 작업 패널
- 🔍 사용자 검색 기능
- 📱 반응형 디자인

### 컴포넌트
- **Button**: 다양한 variant 지원
- **Card**: 정보 표시용 카드 컴포넌트
- **Input**: 폼 입력 필드
- **Label**: 폼 라벨

## 개발 가이드

### 새 라우트 추가
1. `src/routes/` 디렉토리에 새 파일 생성
2. `pnpm run routes:generate` 실행하여 라우트 트리 업데이트

### 새 컴포넌트 추가
```bash
pnpm dlx shadcn@latest add [component-name]
```

### 스타일링
- TailwindCSS 클래스 사용
- shadcn/ui 컴포넌트의 variant 시스템 활용
- CSS 변수를 통한 테마 커스터마이징

## 라이센스

MIT

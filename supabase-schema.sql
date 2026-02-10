-- Supabase 데이터베이스 스키마
-- 아래 SQL을 Supabase Dashboard > SQL Editor에서 실행하세요

-- 사이트 콘텐츠 테이블 (히어로, About 등)
CREATE TABLE IF NOT EXISTS site_content (
  id TEXT PRIMARY KEY,
  section TEXT NOT NULL,
  content JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 서비스 목록 테이블
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 포트폴리오 테이블
CREATE TABLE IF NOT EXISTS portfolio (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  category TEXT,
  client_name TEXT,
  project_date DATE,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 문의 테이블
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service_type TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS (Row Level Security) 설정
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- 공개 읽기 정책 (site_content, services, portfolio)
CREATE POLICY "Public read access for site_content"
  ON site_content FOR SELECT
  USING (true);

CREATE POLICY "Public read access for services"
  ON services FOR SELECT
  USING (true);

CREATE POLICY "Public read access for portfolio"
  ON portfolio FOR SELECT
  USING (true);

-- 공개 쓰기 정책 (문의 폼)
CREATE POLICY "Public insert access for inquiries"
  ON inquiries FOR INSERT
  WITH CHECK (true);

-- 관리자 정책 (인증된 사용자만)
CREATE POLICY "Authenticated users can manage site_content"
  ON site_content FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage services"
  ON services FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage portfolio"
  ON portfolio FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage inquiries"
  ON inquiries FOR ALL
  USING (auth.role() = 'authenticated');

-- 기본 콘텐츠 데이터 삽입
INSERT INTO site_content (id, section, content) VALUES
('hero', 'hero', '{
  "title": "마케팅 전문가",
  "subtitle": "당신의 비즈니스를 성장시키는",
  "description": "데이터 기반의 전략적 마케팅으로 브랜드 가치를 높이고, 매출 성장을 이끌어냅니다.",
  "ctaText": "무료 상담 받기",
  "imageUrl": ""
}'::jsonb),
('about', 'about', '{
  "title": "About Us",
  "description": "우리는 데이터와 창의성을 결합하여 비즈니스 성장을 이끄는 마케팅 전문가 팀입니다.",
  "projects": 120,
  "satisfaction": 95,
  "experience": 10
}'::jsonb),
('contact', 'contact', '{
  "phone": "02-1234-5678",
  "email": "contact@agency.com",
  "address": "서울시 강남구 테헤란로 123"
}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- 기본 서비스 데이터 삽입
INSERT INTO services (title, description, icon, order_index) VALUES
('SEO 최적화', '검색엔진 최적화를 통해 자연 유입을 극대화하고 브랜드 가시성을 높입니다.', 'search', 1),
('퍼포먼스 마케팅', '데이터 기반의 광고 운영으로 ROAS를 최적화하고 효율적인 예산 집행을 돕습니다.', 'chart', 2),
('바이럴 마케팅', '인플루언서, 커뮤니티를 활용한 입소문 마케팅으로 브랜드 인지도를 높입니다.', 'megaphone', 3),
('CRM 마케팅', '고객 데이터를 분석하여 맞춤형 마케팅 전략을 수립하고 재구매율을 높입니다.', 'users', 4),
('소셜 미디어 관리', '인스타그램, 페이스북 등 SNS 채널 운영으로 브랜드 팬덤을 구축합니다.', 'globe', 5),
('콘텐츠 제작', '블로그, 영상 등 다양한 형태의 콘텐츠로 고객과의 접점을 만듭니다.', 'pen', 6)
ON CONFLICT DO NOTHING;

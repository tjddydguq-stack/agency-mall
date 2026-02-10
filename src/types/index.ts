// 사이트 콘텐츠 타입
export interface SiteContent {
  id: string;
  section: string;
  content: Record<string, unknown>;
  updated_at: string;
}

// 히어로 섹션 콘텐츠
export interface HeroContent {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  imageUrl: string;
}

// About 섹션 콘텐츠
export interface AboutContent {
  title: string;
  description: string;
  stats: {
    projects: number;
    satisfaction: number;
    experience: number;
  };
}

// 서비스 타입
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  order_index: number;
  created_at: string;
}

// 포트폴리오 타입
export interface Portfolio {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
  client_name: string;
  project_date: string;
  is_featured: boolean;
  created_at: string;
}

// 문의 타입
export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  service_type: string;
  message: string;
  status: 'pending' | 'in_progress' | 'completed';
  created_at: string;
}

// 문의 폼 입력 타입
export interface InquiryFormData {
  name: string;
  email: string;
  phone: string;
  service_type: string;
  message: string;
}

// 데이터베이스 타입
export interface Database {
  public: {
    Tables: {
      site_content: {
        Row: SiteContent;
        Insert: Omit<SiteContent, 'updated_at'>;
        Update: Partial<Omit<SiteContent, 'id'>>;
      };
      services: {
        Row: Service;
        Insert: Omit<Service, 'id' | 'created_at'>;
        Update: Partial<Omit<Service, 'id' | 'created_at'>>;
      };
      portfolio: {
        Row: Portfolio;
        Insert: Omit<Portfolio, 'id' | 'created_at'>;
        Update: Partial<Omit<Portfolio, 'id' | 'created_at'>>;
      };
      inquiries: {
        Row: Inquiry;
        Insert: Omit<Inquiry, 'id' | 'created_at' | 'status'>;
        Update: Partial<Omit<Inquiry, 'id' | 'created_at'>>;
      };
    };
  };
}

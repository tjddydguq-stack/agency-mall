'use client';

import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Portfolio } from '@/types';

interface PortfolioProps {
  portfolios?: Portfolio[];
}

const defaultPortfolios: Portfolio[] = [
  {
    id: '1',
    title: '패션 브랜드 런칭 캠페인',
    description: '신규 패션 브랜드의 시장 진입을 위한 통합 마케팅 캠페인',
    image_url: '',
    category: '브랜드 마케팅',
    client_name: 'Fashion Brand A',
    project_date: '2024-01',
    is_featured: true,
    created_at: '',
  },
  {
    id: '2',
    title: 'IT 스타트업 퍼포먼스 마케팅',
    description: 'B2B SaaS 기업의 리드 생성을 위한 퍼포먼스 마케팅',
    image_url: '',
    category: '퍼포먼스 마케팅',
    client_name: 'Tech Startup B',
    project_date: '2024-02',
    is_featured: true,
    created_at: '',
  },
  {
    id: '3',
    title: 'F&B 브랜드 SNS 운영',
    description: '레스토랑 체인의 인스타그램 마케팅 및 인플루언서 협업',
    image_url: '',
    category: '소셜 미디어',
    client_name: 'Restaurant C',
    project_date: '2024-03',
    is_featured: false,
    created_at: '',
  },
  {
    id: '4',
    title: '뷰티 브랜드 SEO 최적화',
    description: '화장품 브랜드의 검색엔진 최적화 및 콘텐츠 마케팅',
    image_url: '',
    category: 'SEO',
    client_name: 'Beauty Brand D',
    project_date: '2024-04',
    is_featured: true,
    created_at: '',
  },
  {
    id: '5',
    title: '헬스케어 앱 사용자 확보',
    description: '건강관리 앱의 앱스토어 최적화 및 유저 획득 캠페인',
    image_url: '',
    category: '퍼포먼스 마케팅',
    client_name: 'Healthcare E',
    project_date: '2024-05',
    is_featured: false,
    created_at: '',
  },
  {
    id: '6',
    title: '교육 플랫폼 CRM 구축',
    description: '온라인 교육 플랫폼의 이메일 마케팅 자동화 시스템 구축',
    image_url: '',
    category: 'CRM',
    client_name: 'Education F',
    project_date: '2024-06',
    is_featured: true,
    created_at: '',
  },
];

const categories = ['전체', '브랜드 마케팅', '퍼포먼스 마케팅', '소셜 미디어', 'SEO', 'CRM'];

export default function Portfolio({ portfolios = defaultPortfolios }: PortfolioProps) {
  const [activeCategory, setActiveCategory] = useState('전체');

  const filteredPortfolios = activeCategory === '전체'
    ? portfolios
    : portfolios.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-20 bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-primary font-medium mb-2">Our Work</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            포트폴리오
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            다양한 업종의 클라이언트와 함께 성공적인 마케팅 캠페인을 진행했습니다.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                'px-4 py-2 rounded-full text-sm transition-all duration-200',
                activeCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-card text-muted hover:text-foreground'
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPortfolios.map((portfolio) => (
            <div
              key={portfolio.id}
              className="group relative bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300"
            >
              {/* Image */}
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 relative">
                {portfolio.image_url ? (
                  <img
                    src={portfolio.image_url}
                    alt={portfolio.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-bold text-primary/30">
                      {portfolio.client_name.charAt(0)}
                    </span>
                  </div>
                )}
                {/* Overlay */}
                <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="p-3 bg-primary rounded-full text-white">
                    <ExternalLink className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <span className="text-xs text-primary font-medium">
                  {portfolio.category}
                </span>
                <h3 className="text-lg font-semibold mt-1 mb-2">
                  {portfolio.title}
                </h3>
                <p className="text-sm text-muted line-clamp-2">
                  {portfolio.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

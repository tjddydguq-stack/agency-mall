'use client';

import {
  Search,
  BarChart3,
  Megaphone,
  Users,
  Globe,
  PenTool
} from 'lucide-react';
import type { Service } from '@/types';

interface ServicesProps {
  services?: Service[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  search: Search,
  chart: BarChart3,
  megaphone: Megaphone,
  users: Users,
  globe: Globe,
  pen: PenTool,
};

const defaultServices: Service[] = [
  {
    id: '1',
    title: 'SEO 최적화',
    description: '검색엔진 최적화를 통해 자연 유입을 극대화하고 브랜드 가시성을 높입니다.',
    icon: 'search',
    order_index: 1,
    created_at: '',
  },
  {
    id: '2',
    title: '퍼포먼스 마케팅',
    description: '데이터 기반의 광고 운영으로 ROAS를 최적화하고 효율적인 예산 집행을 돕습니다.',
    icon: 'chart',
    order_index: 2,
    created_at: '',
  },
  {
    id: '3',
    title: '바이럴 마케팅',
    description: '인플루언서, 커뮤니티를 활용한 입소문 마케팅으로 브랜드 인지도를 높입니다.',
    icon: 'megaphone',
    order_index: 3,
    created_at: '',
  },
  {
    id: '4',
    title: 'CRM 마케팅',
    description: '고객 데이터를 분석하여 맞춤형 마케팅 전략을 수립하고 재구매율을 높입니다.',
    icon: 'users',
    order_index: 4,
    created_at: '',
  },
  {
    id: '5',
    title: '소셜 미디어 관리',
    description: '인스타그램, 페이스북 등 SNS 채널 운영으로 브랜드 팬덤을 구축합니다.',
    icon: 'globe',
    order_index: 5,
    created_at: '',
  },
  {
    id: '6',
    title: '콘텐츠 제작',
    description: '블로그, 영상 등 다양한 형태의 콘텐츠로 고객과의 접점을 만듭니다.',
    icon: 'pen',
    order_index: 6,
    created_at: '',
  },
];

export default function Services({ services = defaultServices }: ServicesProps) {
  return (
    <section id="services" className="py-20 bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-medium mb-2">Our Services</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            전문 마케팅 서비스
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            다양한 마케팅 채널과 전략을 통해 비즈니스 성장을 지원합니다.
            맞춤형 솔루션으로 최적의 결과를 만들어드립니다.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const IconComponent = iconMap[service.icon] || Search;
            return (
              <div
                key={service.id}
                className="group p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <IconComponent className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-muted">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

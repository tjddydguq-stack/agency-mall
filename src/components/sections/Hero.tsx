'use client';

import { ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import type { HeroContent } from '@/types';

interface HeroProps {
  content?: HeroContent;
}

const defaultContent: HeroContent = {
  title: '마케팅 전문가',
  subtitle: '당신의 비즈니스를 성장시키는',
  description: '데이터 기반의 전략적 마케팅으로 브랜드 가치를 높이고, 매출 성장을 이끌어냅니다. 10년 이상의 경험과 120+ 성공 프로젝트가 증명합니다.',
  ctaText: '무료 상담 받기',
  ctaLink: '#contact',
  imageUrl: '',
};

export default function Hero({ content = defaultContent }: HeroProps) {
  const handleCTAClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector(content.ctaLink || '#contact');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-primary font-medium">Hello, We are</p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                {content.subtitle}
                <br />
                <span className="text-primary">{content.title}</span>
              </h1>
              <p className="text-lg text-muted max-w-lg">
                {content.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <a href={content.ctaLink} onClick={handleCTAClick}>
                <Button size="lg" className="group">
                  {content.ctaText}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <a href="#portfolio">
                <Button variant="outline" size="lg">
                  포트폴리오 보기
                </Button>
              </a>
            </div>

            {/* Tech Stack / Skills */}
            <div className="pt-8 border-t border-border">
              <p className="text-sm text-muted mb-4">전문 서비스</p>
              <div className="flex flex-wrap gap-3">
                {['SEO 최적화', '광고 운영', '콘텐츠 마케팅', '소셜 미디어', 'CRM'].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-card rounded-full text-sm text-muted"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Image / Visual */}
          <div className="relative">
            <div className="relative z-10">
              {content.imageUrl ? (
                <img
                  src={content.imageUrl}
                  alt="Marketing Expert"
                  className="w-full h-auto rounded-2xl"
                />
              ) : (
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-32 h-32 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-6xl font-bold text-primary">A</span>
                    </div>
                    <p className="text-muted">Your Marketing Partner</p>
                  </div>
                </div>
              )}
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-4 -left-4 w-48 h-48 bg-primary/5 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

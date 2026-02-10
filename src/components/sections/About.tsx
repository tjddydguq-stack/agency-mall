'use client';

import { CheckCircle } from 'lucide-react';
import type { AboutContent } from '@/types';

interface AboutProps {
  content?: AboutContent;
}

const defaultContent: AboutContent = {
  title: 'About Us',
  description: '우리는 데이터와 창의성을 결합하여 비즈니스 성장을 이끄는 마케팅 전문가 팀입니다. 각 브랜드의 고유한 가치를 발굴하고, 타겟 고객에게 효과적으로 전달하는 것이 우리의 미션입니다.',
  stats: {
    projects: 120,
    satisfaction: 95,
    experience: 10,
  },
};

const features = [
  '데이터 기반 전략 수립',
  '맞춤형 마케팅 솔루션',
  '투명한 성과 리포팅',
  '전담 매니저 배정',
];

export default function About({ content = defaultContent }: AboutProps) {
  return (
    <section id="about" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image/Visual */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-card to-card-hover rounded-2xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 p-8">
                  {/* Stats Cards */}
                  <div className="bg-background/80 backdrop-blur p-6 rounded-xl">
                    <p className="text-4xl font-bold text-primary">{content.stats.projects}+</p>
                    <p className="text-muted mt-1">완료 프로젝트</p>
                  </div>
                  <div className="bg-background/80 backdrop-blur p-6 rounded-xl">
                    <p className="text-4xl font-bold text-primary">{content.stats.satisfaction}%</p>
                    <p className="text-muted mt-1">고객 만족도</p>
                  </div>
                  <div className="col-span-2 bg-background/80 backdrop-blur p-6 rounded-xl">
                    <p className="text-4xl font-bold text-primary">{content.stats.experience}+</p>
                    <p className="text-muted mt-1">Years of Experience</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-full blur-3xl -z-10" />
          </div>

          {/* Right - Content */}
          <div className="space-y-8">
            <div>
              <p className="text-primary font-medium mb-2">About Us</p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                성과로 증명하는
                <br />
                <span className="text-primary">마케팅 파트너</span>
              </h2>
              <p className="text-muted text-lg">
                {content.description}
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-4 pt-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                자세히 알아보기 →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

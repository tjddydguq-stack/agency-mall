'use client';

import { useState, useEffect } from 'react';
import { Save, Upload } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';

interface HeroContent {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  imageUrl: string;
}

interface AboutContent {
  title: string;
  description: string;
  projects: number;
  satisfaction: number;
  experience: number;
}

interface ContactContent {
  phone: string;
  email: string;
  address: string;
}

export default function ContentManagement() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [heroContent, setHeroContent] = useState<HeroContent>({
    title: '마케팅 전문가',
    subtitle: '당신의 비즈니스를 성장시키는',
    description: '데이터 기반의 전략적 마케팅으로 브랜드 가치를 높이고, 매출 성장을 이끌어냅니다.',
    ctaText: '무료 상담 받기',
    imageUrl: '',
  });

  const [aboutContent, setAboutContent] = useState<AboutContent>({
    title: 'About Us',
    description: '우리는 데이터와 창의성을 결합하여 비즈니스 성장을 이끄는 마케팅 전문가 팀입니다.',
    projects: 120,
    satisfaction: 95,
    experience: 10,
  });

  const [contactContent, setContactContent] = useState<ContactContent>({
    phone: '02-1234-5678',
    email: 'contact@agency.com',
    address: '서울시 강남구 테헤란로 123',
  });

  useEffect(() => {
    const fetchContent = async () => {
      const supabase = createClient();

      const { data } = await supabase
        .from('site_content')
        .select('*');

      if (data) {
        data.forEach((item) => {
          if (item.section === 'hero') {
            setHeroContent(item.content as unknown as HeroContent);
          } else if (item.section === 'about') {
            setAboutContent(item.content as unknown as AboutContent);
          } else if (item.section === 'contact') {
            setContactContent(item.content as unknown as ContactContent);
          }
        });
      }
      setIsLoading(false);
    };

    fetchContent();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setMessage({ type: '', text: '' });

    const supabase = createClient();

    const updates = [
      { id: 'hero', section: 'hero', content: heroContent },
      { id: 'about', section: 'about', content: aboutContent },
      { id: 'contact', section: 'contact', content: contactContent },
    ];

    try {
      for (const update of updates) {
        const { error } = await supabase
          .from('site_content')
          .upsert(update, { onConflict: 'id' });

        if (error) throw error;
      }

      setMessage({ type: 'success', text: '콘텐츠가 저장되었습니다.' });
    } catch {
      setMessage({ type: 'error', text: '저장 중 오류가 발생했습니다.' });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">콘텐츠 관리</h1>
          <p className="text-muted mt-1">사이트의 텍스트와 이미지를 수정합니다.</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? '저장 중...' : '저장하기'}
        </Button>
      </div>

      {message.text && (
        <div
          className={`p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-500/10 border border-green-500/30 text-green-400'
              : 'bg-red-500/10 border border-red-500/30 text-red-400'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Hero Section */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="text-lg font-semibold mb-6">히어로 섹션</h2>
        <div className="grid gap-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="서브타이틀"
              value={heroContent.subtitle}
              onChange={(e) => setHeroContent({ ...heroContent, subtitle: e.target.value })}
              placeholder="당신의 비즈니스를 성장시키는"
            />
            <Input
              label="타이틀"
              value={heroContent.title}
              onChange={(e) => setHeroContent({ ...heroContent, title: e.target.value })}
              placeholder="마케팅 전문가"
            />
          </div>
          <Textarea
            label="설명"
            value={heroContent.description}
            onChange={(e) => setHeroContent({ ...heroContent, description: e.target.value })}
            placeholder="회사 소개 문구"
            rows={3}
          />
          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="CTA 버튼 텍스트"
              value={heroContent.ctaText}
              onChange={(e) => setHeroContent({ ...heroContent, ctaText: e.target.value })}
              placeholder="무료 상담 받기"
            />
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                히어로 이미지
              </label>
              <div className="flex gap-2">
                <Input
                  value={heroContent.imageUrl}
                  onChange={(e) => setHeroContent({ ...heroContent, imageUrl: e.target.value })}
                  placeholder="이미지 URL 또는 업로드"
                />
                <Button variant="secondary" className="shrink-0">
                  <Upload className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="text-lg font-semibold mb-6">회사 소개 섹션</h2>
        <div className="grid gap-4">
          <Input
            label="타이틀"
            value={aboutContent.title}
            onChange={(e) => setAboutContent({ ...aboutContent, title: e.target.value })}
            placeholder="About Us"
          />
          <Textarea
            label="설명"
            value={aboutContent.description}
            onChange={(e) => setAboutContent({ ...aboutContent, description: e.target.value })}
            placeholder="회사 소개 문구"
            rows={4}
          />
          <div className="grid sm:grid-cols-3 gap-4">
            <Input
              label="완료 프로젝트 수"
              type="number"
              value={aboutContent.projects}
              onChange={(e) => setAboutContent({ ...aboutContent, projects: parseInt(e.target.value) || 0 })}
            />
            <Input
              label="고객 만족도 (%)"
              type="number"
              value={aboutContent.satisfaction}
              onChange={(e) => setAboutContent({ ...aboutContent, satisfaction: parseInt(e.target.value) || 0 })}
            />
            <Input
              label="경력 (년)"
              type="number"
              value={aboutContent.experience}
              onChange={(e) => setAboutContent({ ...aboutContent, experience: parseInt(e.target.value) || 0 })}
            />
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="text-lg font-semibold mb-6">연락처 정보</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <Input
            label="전화번호"
            value={contactContent.phone}
            onChange={(e) => setContactContent({ ...contactContent, phone: e.target.value })}
            placeholder="02-1234-5678"
          />
          <Input
            label="이메일"
            value={contactContent.email}
            onChange={(e) => setContactContent({ ...contactContent, email: e.target.value })}
            placeholder="contact@agency.com"
          />
          <Input
            label="주소"
            value={contactContent.address}
            onChange={(e) => setContactContent({ ...contactContent, address: e.target.value })}
            placeholder="서울시 강남구 테헤란로 123"
          />
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Send, Phone, Mail, MapPin } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import type { InquiryFormData } from '@/types';

const serviceOptions = [
  'SEO 최적화',
  '퍼포먼스 마케팅',
  '바이럴 마케팅',
  'CRM 마케팅',
  '소셜 미디어 관리',
  '콘텐츠 제작',
  '기타',
];

export default function Contact() {
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    email: '',
    phone: '',
    service_type: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          service_type: '',
          message: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left - Contact Info */}
          <div className="space-y-8">
            <div>
              <p className="text-primary font-medium mb-2">Contact Us</p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                프로젝트 문의
              </h2>
              <p className="text-muted text-lg">
                마케팅 관련 문의사항이 있으시면 언제든 연락 주세요.
                24시간 내에 담당자가 연락드리겠습니다.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted">전화 문의</p>
                  <p className="font-medium">02-1234-5678</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted">이메일</p>
                  <p className="font-medium">contact@agency.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted">오시는 길</p>
                  <p className="font-medium">서울시 강남구 테헤란로 123</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className="bg-card rounded-2xl p-6 sm:p-8 border border-border">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  label="이름"
                  id="name"
                  name="name"
                  placeholder="홍길동"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="이메일"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  label="연락처"
                  id="phone"
                  name="phone"
                  placeholder="010-1234-5678"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <div>
                  <label
                    htmlFor="service_type"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    서비스 종류
                  </label>
                  <select
                    id="service_type"
                    name="service_type"
                    value={formData.service_type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  >
                    <option value="">선택해주세요</option>
                    {serviceOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <Textarea
                label="문의 내용"
                id="message"
                name="message"
                placeholder="프로젝트에 대해 자세히 알려주세요..."
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
              />

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400">
                  문의가 성공적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
                  문의 접수 중 오류가 발생했습니다. 다시 시도해주세요.
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  '전송 중...'
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    문의 보내기
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

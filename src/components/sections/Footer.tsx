'use client';

import Link from 'next/link';
import { Instagram, Youtube, MessageCircle } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold">
                <span className="text-primary">A</span>gency
              </span>
            </Link>
            <p className="text-muted text-sm">
              데이터 기반의 전략적 마케팅으로
              <br />
              비즈니스 성장을 이끕니다.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-background rounded-lg flex items-center justify-center text-muted hover:text-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-background rounded-lg flex items-center justify-center text-muted hover:text-primary transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-background rounded-lg flex items-center justify-center text-muted hover:text-primary transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <a href="#services" className="hover:text-foreground transition-colors">
                  SEO 최적화
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-foreground transition-colors">
                  퍼포먼스 마케팅
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-foreground transition-colors">
                  소셜 미디어 관리
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-foreground transition-colors">
                  콘텐츠 제작
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <a href="#about" className="hover:text-foreground transition-colors">
                  회사 소개
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-foreground transition-colors">
                  포트폴리오
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-foreground transition-colors">
                  문의하기
                </a>
              </li>
              <li>
                <Link href="/admin" className="hover:text-foreground transition-colors">
                  관리자
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>서울시 강남구 테헤란로 123</li>
              <li>02-1234-5678</li>
              <li>contact@agency.com</li>
              <li>평일 09:00 - 18:00</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted">
          <p>&copy; {currentYear} Agency. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground transition-colors">
              개인정보처리방침
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              이용약관
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

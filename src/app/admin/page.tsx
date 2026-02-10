'use client';

import { useEffect, useState } from 'react';
import { MessageSquare, Briefcase, Eye, TrendingUp } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { formatDate } from '@/lib/utils';
import type { Inquiry } from '@/types';

interface Stats {
  totalInquiries: number;
  pendingInquiries: number;
  totalPortfolios: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalInquiries: 0,
    pendingInquiries: 0,
    totalPortfolios: 0,
  });
  const [recentInquiries, setRecentInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();

      // Fetch stats
      const [inquiriesResult, pendingResult, portfoliosResult] = await Promise.all([
        supabase.from('inquiries').select('*', { count: 'exact', head: true }),
        supabase.from('inquiries').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('portfolio').select('*', { count: 'exact', head: true }),
      ]);

      setStats({
        totalInquiries: inquiriesResult.count || 0,
        pendingInquiries: pendingResult.count || 0,
        totalPortfolios: portfoliosResult.count || 0,
      });

      // Fetch recent inquiries
      const { data: inquiries } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      setRecentInquiries(inquiries || []);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const statCards = [
    {
      label: '전체 문의',
      value: stats.totalInquiries,
      icon: MessageSquare,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      label: '대기중 문의',
      value: stats.pendingInquiries,
      icon: TrendingUp,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      label: '포트폴리오',
      value: stats.totalPortfolios,
      icon: Briefcase,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      label: '방문자 (예시)',
      value: '1,234',
      icon: Eye,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-500/10 text-yellow-500',
      in_progress: 'bg-blue-500/10 text-blue-500',
      completed: 'bg-green-500/10 text-green-500',
    };
    const labels = {
      pending: '대기',
      in_progress: '진행중',
      completed: '완료',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs ${styles[status as keyof typeof styles] || styles.pending}`}>
        {labels[status as keyof typeof labels] || '대기'}
      </span>
    );
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
      <div>
        <h1 className="text-2xl font-bold">대시보드</h1>
        <p className="text-muted mt-1">사이트 현황을 한눈에 확인하세요.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-card rounded-xl p-6 border border-border"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-muted">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Inquiries */}
      <div className="bg-card rounded-xl border border-border">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-semibold">최근 문의</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-sm font-medium text-muted">이름</th>
                <th className="text-left p-4 text-sm font-medium text-muted">서비스</th>
                <th className="text-left p-4 text-sm font-medium text-muted">상태</th>
                <th className="text-left p-4 text-sm font-medium text-muted">날짜</th>
              </tr>
            </thead>
            <tbody>
              {recentInquiries.length > 0 ? (
                recentInquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="border-b border-border hover:bg-card-hover">
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{inquiry.name}</p>
                        <p className="text-sm text-muted">{inquiry.email}</p>
                      </div>
                    </td>
                    <td className="p-4 text-muted">{inquiry.service_type}</td>
                    <td className="p-4">{getStatusBadge(inquiry.status)}</td>
                    <td className="p-4 text-sm text-muted">
                      {formatDate(inquiry.created_at)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-muted">
                    아직 문의가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

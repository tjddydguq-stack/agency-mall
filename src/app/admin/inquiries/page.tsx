'use client';

import { useState, useEffect } from 'react';
import { Eye, X, Phone, Mail } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { formatDate } from '@/lib/utils';
import Button from '@/components/ui/Button';
import type { Inquiry } from '@/types';

const statusOptions = [
  { value: 'pending', label: '대기', color: 'bg-yellow-500/10 text-yellow-500' },
  { value: 'in_progress', label: '진행중', color: 'bg-blue-500/10 text-blue-500' },
  { value: 'completed', label: '완료', color: 'bg-green-500/10 text-green-500' },
];

export default function InquiriesManagement() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [filter, setFilter] = useState('all');

  const fetchInquiries = async () => {
    const supabase = createClient();
    let query = supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (filter !== 'all') {
      query = query.eq('status', filter);
    }

    const { data } = await query;
    setInquiries(data || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchInquiries();
  }, [filter]);

  const handleStatusChange = async (id: string, status: string) => {
    const supabase = createClient();
    await supabase
      .from('inquiries')
      .update({ status })
      .eq('id', id);

    fetchInquiries();
    if (selectedInquiry?.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status: status as Inquiry['status'] });
    }
  };

  const getStatusBadge = (status: string) => {
    const option = statusOptions.find((opt) => opt.value === status) || statusOptions[0];
    return (
      <span className={`px-2 py-1 rounded-full text-xs ${option.color}`}>
        {option.label}
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
        <h1 className="text-2xl font-bold">문의 관리</h1>
        <p className="text-muted mt-1">고객 문의를 확인하고 관리합니다.</p>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm transition-colors ${
            filter === 'all' ? 'bg-primary text-white' : 'bg-card text-muted hover:text-foreground'
          }`}
        >
          전체
        </button>
        {statusOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setFilter(opt.value)}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              filter === opt.value ? 'bg-primary text-white' : 'bg-card text-muted hover:text-foreground'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Inquiries Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-card-hover">
                <th className="text-left p-4 text-sm font-medium text-muted">이름</th>
                <th className="text-left p-4 text-sm font-medium text-muted">연락처</th>
                <th className="text-left p-4 text-sm font-medium text-muted">서비스</th>
                <th className="text-left p-4 text-sm font-medium text-muted">상태</th>
                <th className="text-left p-4 text-sm font-medium text-muted">날짜</th>
                <th className="text-left p-4 text-sm font-medium text-muted">액션</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inquiry) => (
                <tr key={inquiry.id} className="border-b border-border hover:bg-card-hover">
                  <td className="p-4">
                    <p className="font-medium">{inquiry.name}</p>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted">{inquiry.email}</p>
                      {inquiry.phone && (
                        <p className="text-sm text-muted">{inquiry.phone}</p>
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-muted">{inquiry.service_type}</td>
                  <td className="p-4">{getStatusBadge(inquiry.status)}</td>
                  <td className="p-4 text-sm text-muted">
                    {formatDate(inquiry.created_at)}
                  </td>
                  <td className="p-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedInquiry(inquiry)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
              {inquiries.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-muted">
                    문의가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl border border-border w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-lg font-semibold">문의 상세</h2>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="text-muted hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{selectedInquiry.name}</h3>
                  <p className="text-sm text-muted">{formatDate(selectedInquiry.created_at)}</p>
                </div>
                {getStatusBadge(selectedInquiry.status)}
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-muted">
                  <Mail className="w-4 h-4" />
                  <a href={`mailto:${selectedInquiry.email}`} className="hover:text-primary">
                    {selectedInquiry.email}
                  </a>
                </div>
                {selectedInquiry.phone && (
                  <div className="flex items-center gap-3 text-muted">
                    <Phone className="w-4 h-4" />
                    <a href={`tel:${selectedInquiry.phone}`} className="hover:text-primary">
                      {selectedInquiry.phone}
                    </a>
                  </div>
                )}
              </div>

              <div>
                <p className="text-sm text-muted mb-1">서비스 종류</p>
                <p className="font-medium">{selectedInquiry.service_type}</p>
              </div>

              <div>
                <p className="text-sm text-muted mb-1">문의 내용</p>
                <div className="p-4 bg-background rounded-lg">
                  <p className="whitespace-pre-wrap">{selectedInquiry.message}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted mb-2">상태 변경</p>
                <div className="flex gap-2">
                  {statusOptions.map((opt) => (
                    <Button
                      key={opt.value}
                      variant={selectedInquiry.status === opt.value ? 'primary' : 'secondary'}
                      size="sm"
                      onClick={() => handleStatusChange(selectedInquiry.id, opt.value)}
                    >
                      {opt.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-border">
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => setSelectedInquiry(null)}
              >
                닫기
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

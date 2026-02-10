'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import type { Portfolio } from '@/types';

const categories = ['브랜드 마케팅', '퍼포먼스 마케팅', '소셜 미디어', 'SEO', 'CRM', '기타'];

export default function PortfolioManagement() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPortfolio, setEditingPortfolio] = useState<Portfolio | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    category: '',
    client_name: '',
    is_featured: false,
  });

  const fetchPortfolios = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from('portfolio')
      .select('*')
      .order('created_at', { ascending: false });

    setPortfolios(data || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const handleOpenModal = (portfolio?: Portfolio) => {
    if (portfolio) {
      setEditingPortfolio(portfolio);
      setFormData({
        title: portfolio.title,
        description: portfolio.description,
        image_url: portfolio.image_url,
        category: portfolio.category,
        client_name: portfolio.client_name,
        is_featured: portfolio.is_featured,
      });
    } else {
      setEditingPortfolio(null);
      setFormData({
        title: '',
        description: '',
        image_url: '',
        category: '',
        client_name: '',
        is_featured: false,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPortfolio(null);
  };

  const handleSave = async () => {
    const supabase = createClient();

    if (editingPortfolio) {
      await supabase
        .from('portfolio')
        .update(formData)
        .eq('id', editingPortfolio.id);
    } else {
      await supabase
        .from('portfolio')
        .insert(formData);
    }

    handleCloseModal();
    fetchPortfolios();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    const supabase = createClient();
    await supabase
      .from('portfolio')
      .delete()
      .eq('id', id);

    fetchPortfolios();
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
          <h1 className="text-2xl font-bold">포트폴리오 관리</h1>
          <p className="text-muted mt-1">프로젝트 사례를 추가하고 관리합니다.</p>
        </div>
        <Button onClick={() => handleOpenModal()}>
          <Plus className="w-4 h-4 mr-2" />
          새 포트폴리오
        </Button>
      </div>

      {/* Portfolio Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolios.map((portfolio) => (
          <div
            key={portfolio.id}
            className="bg-card rounded-xl border border-border overflow-hidden"
          >
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
                    {portfolio.client_name?.charAt(0) || 'P'}
                  </span>
                </div>
              )}
              {portfolio.is_featured && (
                <span className="absolute top-2 right-2 px-2 py-1 bg-primary text-white text-xs rounded">
                  Featured
                </span>
              )}
            </div>
            <div className="p-4">
              <span className="text-xs text-primary font-medium">
                {portfolio.category}
              </span>
              <h3 className="font-semibold mt-1">{portfolio.title}</h3>
              <p className="text-sm text-muted mt-1 line-clamp-2">
                {portfolio.description}
              </p>
              <div className="flex gap-2 mt-4">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleOpenModal(portfolio)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(portfolio.id)}
                  className="text-red-500 hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        {portfolios.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted">
            아직 포트폴리오가 없습니다. 새로운 프로젝트를 추가해보세요.
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl border border-border w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                {editingPortfolio ? '포트폴리오 수정' : '새 포트폴리오'}
              </h2>
              <button onClick={handleCloseModal} className="text-muted hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <Input
                label="제목"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="프로젝트 제목"
              />
              <Input
                label="클라이언트"
                value={formData.client_name}
                onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                placeholder="클라이언트 이름"
              />
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  카테고리
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground"
                >
                  <option value="">선택해주세요</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <Textarea
                label="설명"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="프로젝트 설명"
                rows={4}
              />
              <Input
                label="이미지 URL"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="https://..."
              />
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm">Featured로 표시</span>
              </label>
            </div>
            <div className="p-6 border-t border-border flex gap-2 justify-end">
              <Button variant="secondary" onClick={handleCloseModal}>
                취소
              </Button>
              <Button onClick={handleSave}>
                {editingPortfolio ? '수정하기' : '추가하기'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

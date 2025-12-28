'use client'
import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../api';

export function useUsers() {
  // useQuery が「通信の全状態」を管理してくれる
  return useQuery({
    queryKey: ['users'], // この文字列でキャッシュを識別する（重要！）
    queryFn: fetchUsers, // 実行する関数
  });
}


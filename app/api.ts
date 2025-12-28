export type User = {
  id: number;
  name: string;
  role: string;
};

// サーバーからユーザーリストを取ってくる想定の関数
export const fetchUsers = async (): Promise<User[]> => {
  // 1秒待機（ネットワーク遅延のシミュレート）
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // 疑似データを返す
  return [
    { id: 1, name: "管理者 太郎", role: "Admin" },
    { id: 2, name: "開発者 次郎", role: "Editor" },
    { id: 3, name: "閲覧者 三郎", role: "Viewer" },
  ];
};


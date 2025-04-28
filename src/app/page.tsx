export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          卡片系統
        </h1>
        
        {/* 卡片列表區域 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 示例卡片 */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-4">示例卡片</h2>
            <p className="text-gray-600 mb-4">
              這是一個示例卡片，您可以點擊編輯按鈕來修改內容。
            </p>
            <div className="flex justify-end space-x-2">
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                編輯
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
                刪除
              </button>
            </div>
          </div>
        </div>

        {/* 添加新卡片按鈕 */}
        <div className="mt-8 text-center">
          <button className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
            添加新卡片
          </button>
        </div>
      </div>
    </main>
  );
}

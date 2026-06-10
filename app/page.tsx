'use client'

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { useState } from 'react'

interface GeneratedScript {
  hook: string
  scenes: {
    scene: number
    duration: string
    content: string
    voiceover: string
  }[]
  cta: string
  hashtags: string[]
}

export default function Home() {
  const [productDescription, setProductDescription] = useState('')
  const [targetAudience, setTargetAudience] = useState('')
  const [result, setResult] = useState<GeneratedScript | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGenerate = async () => {
    if (!productDescription.trim()) {
      setError('请输入产品描述')
      return
    }

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productDescription,
          targetAudience,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || '生成失败')
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : '生成失败，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    if (!result) return

    const scriptText = `
🎬 TikTok电商广告脚本

🪝 Hook（前3秒）：
${result.hook}

📝 分镜脚本：
${result.scenes.map(scene => `
【场景 ${scene.scene}】${scene.duration}
画面：${scene.content}
旁白：${scene.voiceover}
`).join('\n')}

📢 行动号召（CTA）：
${result.cta}

🏷️ Hashtags：
${result.hashtags.join(' ')}
    `.trim()

    navigator.clipboard.writeText(scriptText)
    alert('✅ 已复制到剪贴板')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            TikTok电商脚本生成器
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            AI驱动的爆款广告脚本，10秒生成专业TikTok电商广告
          </p>
        </div>

        {/* Main Form */}
        <Card className="p-6 shadow-2xl">
          <div className="space-y-6">
            {/* Product Description Input */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                产品/品牌描述
              </label>
              <Textarea
                placeholder="例如：一个可持续发展的咖啡品牌，每杯咖啡为非洲种植者提供10美分，主打有机和公平贸易..."
                className="min-h-[150px] text-base"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-2">
                描述你的产品、品牌特点、目标受众和核心卖点
              </p>
            </div>

            {/* Target Audience Input */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                目标受众（可选）
              </label>
              <Textarea
                placeholder="例如：25-35岁城市白领女性，关注健康和环保，愿意为品质付费..."
                className="min-h-[80px] text-base"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Generate Button */}
            <Button
              className="w-full text-lg py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? '⏳ 生成中...' : '✨ 生成TikTok脚本'}
            </Button>
          </div>
        </Card>

        {/* Output Section */}
        {result && (
          <Card className="mt-8 p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                生成的脚本
              </h2>
              <Button
                variant="outline"
                onClick={handleCopy}
              >
                📋 复制脚本
              </Button>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-4">
              {/* Hook */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4">
                <p className="font-bold text-sm text-yellow-700 dark:text-yellow-300 mb-2">🪝 Hook（前3秒）</p>
                <p className="text-gray-800 dark:text-gray-200">{result.hook}</p>
              </div>

              {/* Scenes */}
              <div>
                <p className="font-bold text-sm text-gray-700 dark:text-gray-300 mb-3">📝 分镜脚本</p>
                {result.scenes.map((scene) => (
                  <div key={scene.scene} className="bg-white dark:bg-gray-700 rounded-lg p-4 mb-3 shadow">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-bold">
                        场景 {scene.scene}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{scene.duration}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      <span className="font-bold">画面：</span>{scene.content}
                    </p>
                    <p className="text-sm text-gray-800 dark:text-gray-200">
                      <span className="font-bold">旁白：</span>{scene.voiceover}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4">
                <p className="font-bold text-sm text-green-700 dark:text-green-300 mb-2">📢 行动号召（CTA）</p>
                <p className="text-gray-800 dark:text-gray-200">{result.cta}</p>
              </div>

              {/* Hashtags */}
              <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {result.hashtags.join(' ')}
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Features Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-bold mb-2">10秒生成</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              基于AI模型，快速生成专业脚本
            </p>
          </div>
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="font-bold mb-2">爆款结构</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              基于真实TikTok爆款案例优化
            </p>
          </div>
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <div className="text-4xl mb-3">💰</div>
            <h3 className="font-bold mb-2">高转化率</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              针对电商场景优化，提升ROI
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
import { NextRequest, NextResponse } from 'next/server'

// 基于规则的 TikTok 广告脚本生成器
function generateScriptByRules(productDescription: string, targetAudience?: string) {
  // 生成 Hook（前3秒吸睛文案）
  const hooks = [
    `🔥 谁能想到，${productDescription} 竟然这么好用！`,
    `😱 我终于找到${productDescription}的终极秘密！`,
    `💡 停！买${productDescription}前先看这个！`,
    `⚡ 90%的人都不知道的${productDescription}真相！`,
    `🚀 ${productDescription}改变了我的生活，你也可以！`,
  ]
  const hook = hooks[Math.floor(Math.random() * hooks.length)]

  // 生成场景
  const scenes = [
    {
      scene: 1,
      duration: '0-3秒',
      content: '镜头快速切换，产品特写，配合快节奏音乐',
      voiceover: hook,
    },
    {
      scene: 2,
      duration: '3-8秒',
      content: '展示产品使用过程，突出核心卖点',
      voiceover: `这是${productDescription}，${targetAudience || '所有人'}都能轻松上手。`,
    },
    {
      scene: 3,
      duration: '8-12秒',
      content: '用户使用反馈/对比画面',
      voiceover: `之前我还怀疑，现在每天都要用！`,
    },
    {
      scene: 4,
      duration: '12-18秒',
      content: '产品细节特写+价格优势展示',
      voiceover: `价格实惠，品质有保障，现在下单还能享受优惠！`,
    },
  ]

  // 生成 CTA（行动号召）
  const ctas = [
    `点击下方链接，立即购买${productDescription}！`,
    `现在点击，限时优惠等你来！`,
    `别犹豫了，点击下方链接${productDescription}带回家！`,
  ]
  const cta = ctas[Math.floor(Math.random() * ctas.length)]

  // 生成 Hashtags
  const baseHashtags = ['#TikTokShop', '#好物推荐', '#必买']
  const specificHashtags = [`${productDescription.split(' ')[0]}`, '#爆品', '#种草']
  const hashtags = [...baseHashtags, ...specificHashtags.slice(0, 3)]

  return {
    hook,
    scenes,
    cta,
    hashtags,
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { productDescription, targetAudience } = body

    if (!productDescription) {
      return NextResponse.json(
        { error: '产品描述不能为空' },
        { status: 400 }
      )
    }

    // 使用规则生成脚本
    const result = generateScriptByRules(productDescription, targetAudience)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Generate API Error:', error)
    return NextResponse.json(
      { error: '生成失败，请稍后重试' },
      { status: 500 }
    )
  }
}
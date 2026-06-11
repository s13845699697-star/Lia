import { NextRequest, NextResponse } from 'next/server'

// 从产品描述中提取关键词
function extractKeywords(productDescription: string): {
  productName: string
  features: string[]
  targetAudience: string
} {
  // 简单关键词提取（实际可以用更智能的方式）
  const keywords = productDescription.split(/[，,、。.\s]+/).filter(w => w.length > 1)
  const productName = keywords[0] || '这款产品'
  const features = keywords.slice(1, 4) // 提取前3个特点
  return {
    productName,
    features,
    targetAudience: keywords.slice(-1)[0] || '大家',
  }
}

// TikTok 风格的脚本生成器（改进版）
function generateTikTokScript(
  productDescription: string,
  targetAudience?: string
) {
  const { productName, features } = extractKeywords(productDescription)

  // === Hook 库（10-12字，制造好奇心/冲突/情感） ===
  const hookTemplates = [
    `😤 被骗了好久才发现的真相！`,
    `😱 别再买${productName}了！`,
    `⚠️ 90%的人都做错了！`,
    `🤫 这个秘密我不该告诉你们`,
    `😭 后悔没早点遇到这个`,
    `🔥 ${productName}居然能这样用？`,
    `💰 省钱小妙招，一般人我不告诉他`,
    `🚫 停！看完再决定买不买`,
    `😂 试了10款，这款赢了`,
    `🎯 ${productName}的内幕，慎点！`,
  ]
  const hook = hookTemplates[Math.floor(Math.random() * hookTemplates.length)]

  // === 场景脚本（更口语化、有节奏感） ===
  const scenes = [
    {
      scene: 1,
      duration: '0-3秒',
      content: '特写产品，配合惊讶表情+音效',
      voiceover: hook,
    },
    {
      scene: 2,
      duration: '3-8秒',
      content: '快速展示产品使用+对比画面',
      voiceover: `之前我也踩过坑，直到遇到${productName}，${features[0] || '真的好用'}！`,
    },
    {
      scene: 3,
      duration: '8-12秒',
      content: '用户真实反馈/使用场景',
      voiceover: targetAudience
        ? `${targetAudience}都在问我要链接，现在天天用！`
        : '现在天天都在用，离不开它了！',
    },
    {
      scene: 4,
      duration: '12-18秒',
      content: '价格对比/优惠信息+产品特写',
      voiceover: `价格才一杯奶茶钱，${features[1] || '性价比超高'}，还有优惠！`,
    },
  ]

  // === CTA（简洁有力，制造紧迫感） ===
  const ctaTemplates = [
    `👇 戳这里，立省50%！`,
    `⏰ 限时优惠，手慢无！`,
    `🔥 现在点击，最后100个名额！`,
    `💥 别犹豫，点击下方链接抢！`,
    `🎁 今天下单，还送价值99元的赠品！`,
  ]
  const cta = ctaTemplates[Math.floor(Math.random() * ctaTemplates.length)]

  // === Hashtags（简短标签） ===
  const baseHashtags = ['#TikTokShop', '#好物推荐', '#必买']
  const categoryHashtags = [
    '#省钱攻略',
    '#生活小妙招',
    '#种草',
    '#爆品',
    '#购物分享',
  ]
  const hashtags = [
    ...baseHashtags,
    ...categoryHashtags.slice(0, 3),
  ]

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

    // 使用改进的规则生成脚本
    const result = generateTikTokScript(productDescription, targetAudience)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Generate API Error:', error)
    return NextResponse.json(
      { error: '生成失败，请稍后重试' },
      { status: 500 }
    )
  }
}
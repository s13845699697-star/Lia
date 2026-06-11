import { NextRequest, NextResponse } from 'next/server'

// 从产品描述中提取关键信息
function extractProductInfo(productDescription: string) {
  const keywords = productDescription.split(/[，,、。.\s]+/).filter(w => w.length > 1)
  const productName = keywords[0] || '这款产品'
  const features = keywords.slice(1, 4)
  return {
    productName,
    features,
    description: productDescription,
  }
}

// 生成完整的TikTok脚本（45-60秒）
function generateCompleteScript(
  productDescription: string,
  targetAudience?: string
) {
  const { productName, features, description } = extractProductInfo(productDescription)

  // 完整的脚本结构：开头→痛点→发现→演示→效果→CTA
  const script = {
    style: '完整叙事',
    duration: '50秒',
    scenes: [
      // 场景1：开头（0-5秒）- 从具体问题开始
      {
        scene: 1,
        duration: '0-5秒',
        content: `特写：展示使用${productName}之前的问题场景，比如${features[0] || '使用不便'}的画面`,
        voiceover: `作为${targetAudience || '普通人'}，每天都要面对${features[0] || '这个问题'}，真的很困扰`,
      },
      // 场景2：痛点展示（5-15秒）- 具体的痛点
      {
        scene: 2,
        duration: '5-15秒',
        content: `镜头切换：展示痛点场景，特写问题部位，比如${features[1] || '具体问题'}的细节`,
        voiceover: `每次${features[0] || '使用'}的时候，${features[1] || '都会遇到这个问题'}，真的很烦`,
      },
      // 场景3：发现产品（15-25秒）- 有来源的发现
      {
        scene: 3,
        duration: '15-25秒',
        content: `画面切换：拆开${productName}的包装，展示产品细节`,
        voiceover: `后来朋友推荐了${productName}，我就买来试试看`,
      },
      // 场景4：使用演示（25-35秒）- 具体的使用过程
      {
        scene: 4,
        duration: '25-35秒',
        content: `特写：展示${productName}的使用过程，比如${features[2] || '具体操作'}的动作`,
        voiceover: `用起来真的很方便，${features[2] || '操作简单'}，节省了很多时间`,
      },
      // 场景5：效果展示（35-45秒）- 前后对比
      {
        scene: 5,
        duration: '35-45秒',
        content: `对比画面：左边是使用前，右边是使用后，特写效果的差异`,
        voiceover: `你们看，用了之后${features[1] || '问题'}解决了，效果真的很明显`,
      },
      // 场景6：使用感受（45-50秒）- 时间证明
      {
        scene: 6,
        duration: '45-50秒',
        content: `日常场景：展示在日常生活中使用${productName}的画面`,
        voiceover: `我现在每天都要用它，真的离不开它了`,
      },
      // 场景7：CTA（50-55秒）- 自然引导
      {
        scene: 7,
        duration: '50-55秒',
        content: `展示${productName}的包装，手指指向下方链接`,
        voiceover: `链接在下面，有需要的可以看看，性价比真的不错`,
      },
    ],
    cta: '链接在下面，有需要的可以看看',
    hashtags: ['#TikTokShop', '#好物推荐', '#日常好物', '#性价比'],
  }

  return script
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

    // 生成完整的脚本
    const result = generateCompleteScript(productDescription, targetAudience)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Generate API Error:', error)
    return NextResponse.json(
      { error: '生成失败，请稍后重试' },
      { status: 500 }
    )
  }
}
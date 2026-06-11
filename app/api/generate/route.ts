import { NextRequest, NextResponse } from 'next/server'

// 从产品描述中提取关键信息
function extractProductInfo(productDescription: string, targetAudience?: string) {
  const keywords = productDescription.split(/[，,、。.\s]+/).filter(w => w.length > 1)

  if (keywords.length === 0) {
    return {
      productName: '这款产品',
      features: [],
      audience: targetAudience || '大家',
    }
  }

  const productName = keywords[0]
  const features = keywords.slice(1, 6) // 最多提取6个特点

  return {
    productName,
    features,
    audience: targetAudience || '大家',
  }
}

// 生成完整的脚本（基于固定的、高质量的模板）
function generateCompleteScript(
  productDescription: string,
  targetAudience?: string
) {
  const { productName, features, audience } = extractProductInfo(productDescription, targetAudience)

  // 构建产品信息（用于替换）
  const feature1 = features[0] || '这个功能'
  const feature2 = features[1] || '这个特点'
  const feature3 = features[2] || '这个优势'
  const productInfo = features.length > 0 ? features.join('、') : '这款产品'

  // 生成完整的7个场景脚本
  const script = {
    style: '完整叙事',
    duration: '50秒',
    productName,
    scenes: [
      // 场景1：开头（0-5秒）- 从焦虑/痛点开始
      {
        scene: 1,
        duration: '0-5秒',
        content: `镜头特写：展示使用${productName}之前的场景，或者遇到问题的画面，特写相关的细节`,
        voiceover: `之前我每天都面临这些问题，真的很困扰`,
      },
      // 场景2：痛点展示（5-15秒）- 具体的痛点
      {
        scene: 2,
        duration: '5-15秒',
        content: `镜头切换：展示具体痛点场景，特写问题的细节，让用户有代入感`,
        voiceover: feature1 ? `每次用的时候，${feature1}真的很烦，影响体验` : `每次用的时候都很麻烦，真的很累`,
      },
      // 场景3：发现产品（15-25秒）- 有来源的发现
      {
        scene: 3,
        duration: '15-25秒',
        content: `打开包装，取出${productName}，展示产品的外观和细节，特写产品特点`,
        voiceover: `后来朋友推荐了${productName}，我就买来试试看`,
      },
      // 场景4：使用演示（25-35秒）- 具体的使用过程和感受
      {
        scene: 4,
        duration: '25-35秒',
        content: `特写：展示${productName}的使用过程，展示${feature1 || '产品功能'}的实际效果`,
        voiceover: feature1 ? `${productName}的${feature1}真的很好用，体验感很棒` : `${productName}用起来真的很方便，体验感很棒`,
      },
      // 场景5：效果对比（35-45秒）- 前后对比
      {
        scene: 5,
        duration: '35-45秒',
        content: `对比画面：左边是使用前，右边是使用后，特写效果的差异，展示${feature2 || '效果'}的改善`,
        voiceover: feature2 ? `你们看，用了之后${feature2}真的解决了，效果很明显` : `你们看，用了之后效果真的好了很多`,
      },
      // 场景6：使用感受（45-50秒）- 时间证明和日常场景
      {
        scene: 6,
        duration: '45-50秒',
        content: `日常场景：展示在日常生活中使用${productName}的画面，展示使用频率和依赖程度`,
        voiceover: `我现在每天都要用它，真的离不开它了`,
      },
      // 场景7：CTA（50-55秒）- 自然引导
      {
        scene: 7,
        duration: '50-55秒',
        content: `展示${productName}的包装，手指指向下方链接，展示产品优势和价格`,
        voiceover: feature3 ? `链接在下面，${feature3}，性价比真的不错，有需要的可以看看` : `链接在下面，性价比真的不错，有需要的可以看看`,
      },
    ],
    cta: '链接在下面，性价比真的不错，有需要的可以看看',
    hashtags: ['#好物推荐', '#开箱测评', '#真实测评', '#种草', '#必买'],
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
import { NextRequest, NextResponse } from 'next/server'

// 从产品描述中提取关键词
function extractKeywords(productDescription: string): {
  productName: string
  features: string[]
  targetAudience: string
} {
  const keywords = productDescription.split(/[，,、。.\s]+/).filter(w => w.length > 1)
  const productName = keywords[0] || '这款产品'
  const features = keywords.slice(1, 4)
  return {
    productName,
    features,
    targetAudience: keywords.slice(-1)[0] || '大家',
  }
}

// 风格1：开箱测评风（60秒）
function generateUnboxingScript(
  productName: string,
  features: string[],
  targetAudience: string
) {
  const hooks = [
    `花了${Math.floor(Math.random() * 20 + 10)}0块，我后悔了...不是因为贵，而是后悔买晚了！`,
    `这个${productName}，我抱着试试看的心态买回来的，结果...`,
    `本来不想买这个${productName}，但朋友推荐我就试试，没想到`,
  ]

  return {
    style: '开箱测评',
    duration: '60秒',
    hook: hooks[Math.floor(Math.random() * hooks.length)],
    scenes: [
      {
        scene: 1,
        duration: '0-5秒',
        content: '从拆快递开始，镜头特写包装',
        voiceover: hooks[Math.floor(Math.random() * hooks.length)],
      },
      {
        scene: 2,
        duration: '5-15秒',
        content: '展示真实痛点（如：家里脏乱、产品问题）',
        voiceover: `你看我这里，${features[0] || '每天都很麻烦'}，真的很让我头疼`,
      },
      {
        scene: 3,
        duration: '15-30秒',
        content: '打开包装，取出产品，演示使用',
        voiceover: `直到我买了这个${productName}，${features[1] || '真的改变了我的生活'}`,
      },
      {
        scene: 4,
        duration: '30-45秒',
        content: '延时摄影展示效果，或对比前后',
        voiceover: `你们看这个效果，${features[2] || '我以前从来没想过这么好用'}`,
      },
      {
        scene: 5,
        duration: '45-60秒',
        content: '展示日常使用，暗示价格/优惠',
        voiceover: `最重要的是，这价格真的不贵。链接在下面，现在下单还有优惠`,
      },
    ],
    cta: `最重要的是，这价格真的不贵。链接在下面，现在下单还有优惠`,
    hashtags: ['#好物推荐', '#开箱测评', '#真实测评', '#种草', '#必买'],
  }
}

// 风格2：痛点解决风（45秒）
function generateProblemSolutionScript(
  productName: string,
  features: string[],
  targetAudience: string
) {
  const problems = [
    `每天都被${features[0] || '这个问题'}困扰`,
    `${features[0] || '这个问题'}真的让我受不了`,
    `你们看，这就是我每天的状态`,
  ]

  return {
    style: '痛点解决',
    duration: '45秒',
    hook: `${productName}的救命神器，我天天用`,
    scenes: [
      {
        scene: 1,
        duration: '0-5秒',
        content: '展示痛点场景（如：低头、疲劳、脏乱）',
        voiceover: `${productName}的救命神器，我天天用`,
      },
      {
        scene: 2,
        duration: '5-15秒',
        content: '放大痛点，展示问题',
        voiceover: `但是！${problems[Math.floor(Math.random() * problems.length)]}`,
      },
      {
        scene: 3,
        duration: '15-30秒',
        content: '介绍产品，演示使用',
        voiceover: `直到我朋友推荐了这个${productName}，${features[1] || '真的很好用'}`,
      },
      {
        scene: 4,
        duration: '30-45秒',
        content: '展示日常使用，社交证明',
        voiceover: `我现在每天都要用它，${targetAudience}都问我哪里买的`,
      },
    ],
    cta: `链接在下面，${targetAudience}可以看看`,
    hashtags: ['#好物推荐', '#生活小妙招', '#必备好物', '#种草', '#神器'],
  }
}

// 风格3：对比测评风（60秒）
function generateComparisonScript(
  productName: string,
  features: string[],
  targetAudience: string
) {
  const competitors = ['这', '那', '另一款', '之前那款']
  const problems = ['太贵了', '不好用', '没多久就坏了', '体验很差']

  return {
    style: '对比测评',
    duration: '60秒',
    hook: `我试了3款${productName}，最后只留了这款`,
    scenes: [
      {
        scene: 1,
        duration: '0-5秒',
        content: '展示多款产品',
        voiceover: `我试了3款${productName}，最后只留了这款`,
      },
      {
        scene: 2,
        duration: '5-20秒',
        content: '逐一测试其他产品，指出问题',
        voiceover: `${competitors[0]}款${problems[Math.floor(Math.random() * problems.length)]}，${competitors[1]}款也不好`,
      },
      {
        scene: 3,
        duration: '20-40秒',
        content: '测试你的产品，突出优点',
        voiceover: `但这${productName}不一样，${features[0] || '很好用'}，${features[1] || '性价比很高'}`,
      },
      {
        scene: 4,
        duration: '40-60秒',
        content: '展示使用效果，对比结论',
        voiceover: `用了几个月，真的没出问题，最重要的是还便宜`,
      },
    ],
    cta: `链接在下面，我放在第一个了`,
    hashtags: ['#好物推荐', '#对比测评', '#避坑指南', '#种草', '#性价比'],
  }
}

// 风格4：日常使用风（45秒）
function generateDailyUsageScript(
  productName: string,
  features: string[],
  targetAudience: string
) {
  const scenarios = ['早晨', '下班回来', '周末', '日常']

  return {
    style: '日常使用',
    duration: '45秒',
    hook: `我的${scenarios[Math.floor(Math.random() * scenarios.length)]}日常，离不开这个${productName}`,
    scenes: [
      {
        scene: 1,
        duration: '0-10秒',
        content: '展示日常使用场景',
        voiceover: `我的${scenarios[Math.floor(Math.random() * scenarios.length)]}日常，离不开这个${productName}`,
      },
      {
        scene: 2,
        duration: '10-25秒',
        content: '自然展示产品使用',
        voiceover: `这${productName}${features[0] || '真的很好用'}，我用了好几个月了`,
      },
      {
        scene: 3,
        duration: '25-40秒',
        content: '展示其他使用场景，社交证明',
        voiceover: `${targetAudience}都问我在哪里买的，说是很好用`,
      },
      {
        scene: 4,
        duration: '40-45秒',
        content: '暗示价格，CTA',
        voiceover: `价格也很实惠，需要的可以看看`,
      },
    ],
    cta: `价格也很实惠，需要的可以看看`,
    hashtags: ['#好物推荐', '#日常好物', '#生活日常', '#种草', '#必备'],
  }
}

// 主生成函数
function generateScriptByStyle(
  productDescription: string,
  targetAudience: string | undefined,
  style: string
) {
  const { productName, features, targetAudience: extractedAudience } = extractKeywords(productDescription)
  const finalAudience = targetAudience || extractedAudience

  switch (style) {
    case 'unboxing':
      return generateUnboxingScript(productName, features, finalAudience)
    case 'problem':
      return generateProblemSolutionScript(productName, features, finalAudience)
    case 'comparison':
      return generateComparisonScript(productName, features, finalAudience)
    case 'daily':
      return generateDailyUsageScript(productName, features, finalAudience)
    default:
      return generateUnboxingScript(productName, features, finalAudience)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { productDescription, targetAudience, style } = body

    if (!productDescription) {
      return NextResponse.json(
        { error: '产品描述不能为空' },
        { status: 400 }
      )
    }

    // 根据选择的风格生成脚本
    const selectedStyle = style || 'unboxing' // 默认开箱测评风
    const result = generateScriptByStyle(productDescription, targetAudience, selectedStyle)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Generate API Error:', error)
    return NextResponse.json(
      { error: '生成失败，请稍后重试' },
      { status: 500 }
    )
  }
}
import { NextRequest, NextResponse } from 'next/server'

// ==================== 产品类型识别 ====================

interface ProductType {
  id: string
  name: string
  keywords: string[]
  painPoints: string[]
  benefits: string[]
}

const PRODUCT_TYPES: ProductType[] = [
  {
    id: 'electronics',
    name: '电子产品',
    keywords: ['耳机', '手机', '电脑', '平板', '充电', '续航', '屏幕', '音响', '蓝牙'],
    painPoints: ['续航短', '充电慢', '音质差', '不舒服', '连接不稳定'],
    benefits: ['续航长', '充电快', '音质好', '舒适佩戴', '连接稳定'],
  },
  {
    id: 'beauty',
    name: '美妆护肤',
    keywords: ['面膜', '化妆', '护肤', '皮肤', '美白', '保湿', '粉底', '口红'],
    painPoints: ['皮肤干燥', '痘痘多', '暗沉', '过敏', '效果差'],
    benefits: ['保湿', '美白', '祛痘', '安全', '效果好'],
  },
  {
    id: 'food',
    name: '食品饮料',
    keywords: ['零食', '饮料', '茶饮', '咖啡', '味道', '口感', '甜', '辣', '咸'],
    painPoints: ['不健康', '味道差', '太甜', '太辣', '添加剂多'],
    benefits: ['健康', '味道好', '低糖', '天然', '无添加'],
  },
  {
    id: 'home',
    name: '家居用品',
    keywords: ['扫地', '咖啡机', '电饭煲', '做饭', '清洁', '洗衣机', '洗碗机'],
    painPoints: ['费时', '费力', '不方便', '效果差', '占用空间'],
    benefits: ['省时', '省力', '方便', '效果好', '智能'],
  },
  {
    id: 'clothing',
    name: '服装鞋包',
    keywords: ['鞋子', '衣服', '包包', '面料', '尺码', '舒适', '透气'],
    painPoints: ['不舒适', '透气差', '质量差', '不合身', '易变形'],
    benefits: ['舒适', '透气', '质量好', '合身', '耐用'],
  },
]

// 识别产品类型
function identifyProductType(description: string): ProductType {
  const desc = description.toLowerCase()

  for (const type of PRODUCT_TYPES) {
    for (const keyword of type.keywords) {
      if (desc.includes(keyword)) {
        return type
      }
    }
  }

  // 默认返回电子产品
  return PRODUCT_TYPES[0]
}

// 提取产品信息
function extractProductInfo(description: string, productType: ProductType) {
  const keywords = description.split(/[，,、。.\s]+/).filter(w => w.length > 1)
  const productName = keywords[0] || '这款产品'
  const features = keywords.slice(1)

  // 分析每个关键词是痛点还是卖点
  const analyzedFeatures = features.map(feature => {
    const isPainPoint = productType.painPoints.some(point =>
      feature.includes(point.split('短')[0]) ||
      feature.includes(point.split('差')[0]) ||
      feature.includes('不舒服') ||
      feature.includes('不')
    )

    return {
      text: feature,
      type: isPainPoint ? 'painPoint' : 'benefit',
    }
  })

  return {
    productName,
    features,
    analyzedFeatures,
  }
}

// ==================== 脚本模板 ====================

function generateScriptTemplate(
  productType: ProductType,
  productName: string,
  features: string[],
  targetAudience?: string
) {
  const template = {
    style: productType.name,
    duration: '50-60秒',
    scenes: [] as any[],
  }

  // 根据产品类型生成不同的脚本
  switch (productType.id) {
    case 'electronics':
      template.scenes = generateElectronicsScript(productName, features, targetAudience)
      break
    case 'beauty':
      template.scenes = generateBeautyScript(productName, features, targetAudience)
      break
    case 'food':
      template.scenes = generateFoodScript(productName, features, targetAudience)
      break
    case 'home':
      template.scenes = generateHomeScript(productName, features, targetAudience)
      break
    case 'clothing':
      template.scenes = generateClothingScript(productName, features, targetAudience)
      break
    default:
      template.scenes = generateElectronicsScript(productName, features, targetAudience)
  }

  return template
}

// 电子产品脚本模板
function generateElectronicsScript(
  productName: string,
  features: string[],
  targetAudience?: string
) {
  const mainFeature = features[0] || '功能强大'
  const secondFeature = features[1] || '性价比高'

  return [
    {
      scene: 1,
      duration: '0-5秒',
      content: `镜头特写：展示使用${productName}之前的场景，比如旧产品的使用画面，可以是一边用一边充电，或者电量耗尽的画面`,
      voiceover: `作为${targetAudience || '普通人'}，每天都要面对电量焦虑，真的很困扰`,
    },
    {
      scene: 2,
      duration: '5-15秒',
      content: `镜头切换：展示痛点场景，比如旧产品充电很慢，或者用了一会儿就没电了，特写充电器和电量的画面`,
      voiceover: `以前用${mainFeature.split('，')[0]}，每次用不了多久就要充电，真的很烦`,
    },
    {
      scene: 3,
      duration: '15-25秒',
      content: `画面切换：拆开${productName}的包装，展示产品细节，比如充电口、电池续航标识等`,
      voiceover: `后来朋友推荐了${productName}，说是${mainFeature}，我就买来试试看`,
    },
    {
      scene: 4,
      duration: '25-35秒',
      content: `特写：展示${productName}的使用过程，比如打开开关、连接设备、调节音量等动作`,
      voiceover: `用起来真的很方便，${secondFeature}，而且连接很稳定`,
    },
    {
      scene: 5,
      duration: '35-45秒',
      content: `对比画面：左边是旧产品使用一段时间后的电量，右边是${productName}使用同样时间后的电量`,
      voiceover: `你们看，用了${mainFeature}之后，电量完全够用，不用每天充电了`,
    },
    {
      scene: 6,
      duration: '45-50秒',
      content: `日常场景：展示在日常生活中使用${productName}的画面，比如通勤、学习、运动中`,
      voiceover: `我现在每天都要用它，真的离不开它了`,
    },
    {
      scene: 7,
      duration: '50-55秒',
      content: `展示${productName}的包装，手指指向下方链接，可以展示价格标签`,
      voiceover: `链接在下面，性价比真的不错，有需要的可以看看`,
    },
  ]
}

// 美妆护肤脚本模板
function generateBeautyScript(
  productName: string,
  features: string[],
  targetAudience?: string
) {
  const mainFeature = features[0] || '效果很好'

  return [
    {
      scene: 1,
      duration: '0-5秒',
      content: `镜头特写：展示使用${productName}之前的皮肤状态，比如面部暗沉、毛孔粗大等`,
      voiceover: `作为${targetAudience || '普通人'}，皮肤问题真的很困扰`,
    },
    {
      scene: 2,
      duration: '5-15秒',
      content: `镜头切换：展示痛点场景，比如照镜子时的困扰，或者试了很多产品都没效果`,
      voiceover: `以前试了很多护肤品，${mainFeature.split('，')[0]}的问题一直没解决，真的很烦`,
    },
    {
      scene: 3,
      duration: '15-25秒',
      content: `画面切换：展示${productName}的包装，拆开包装，展示产品的质地`,
      voiceover: `后来朋友推荐了${productName}，说是${mainFeature}，我就买来试试看`,
    },
    {
      scene: 4,
      duration: '25-35秒',
      content: `特写：展示${productName}的使用过程，比如取适量产品涂抹在脸上，按摩吸收`,
      voiceover: `用起来很温和，没有刺激感，吸收也很快`,
    },
    {
      scene: 5,
      duration: '35-45秒',
      content: `对比画面：左边是使用前的皮肤状态，右边是使用后的皮肤状态`,
      voiceover: `你们看，用了${productName}之后，${mainFeature}，效果真的很明显`,
    },
    {
      scene: 6,
      duration: '45-50秒',
      content: `日常场景：展示在日常生活中使用${productName}的画面，比如早晚护肤`,
      voiceover: `我现在每天早晚都用，已经用了一个月了，真的很喜欢`,
    },
    {
      scene: 7,
      duration: '50-55秒',
      content: `展示${productName}的包装，手指指向下方链接`,
      voiceover: `链接在下面，有需要的可以看看`,
    },
  ]
}

// 食品饮料脚本模板
function generateFoodScript(
  productName: string,
  features: string[],
  targetAudience?: string
) {
  const mainFeature = features[0] || '味道很好'

  return [
    {
      scene: 1,
      duration: '0-5秒',
      content: `镜头特写：展示以往吃零食/喝饮料的场景，比如吃不健康的零食，或者味道不好的饮料`,
      voiceover: `作为${targetAudience || '普通人'}，总想吃点零食，但又担心不健康`,
    },
    {
      scene: 2,
      duration: '5-15秒',
      content: `镜头切换：展示痛点场景，比如看配料表发现有添加剂，或者吃了之后不舒服`,
      voiceover: `以前吃的零食，${mainFeature.split('，')[0]}的问题一直存在，真的不敢吃`,
    },
    {
      scene: 3,
      duration: '15-25秒',
      content: `画面切换：展示${productName}的包装，拆开包装，展示产品的外观`,
      voiceover: `后来朋友推荐了${productName}，说是${mainFeature}，我就买来试试看`,
    },
    {
      scene: 4,
      duration: '25-35秒',
      content: `特写：展示${productName}的使用过程，比如打开包装，品尝`,
      voiceover: `味道真的很不错，${features[1] || '口感很好'}，而且很健康`,
    },
    {
      scene: 5,
      duration: '35-45秒',
      content: `对比画面：左边是以前吃的零食配料表，右边是${productName}的配料表`,
      voiceover: `你们看配料表，${productName}是天然的，没有添加剂，很放心`,
    },
    {
      scene: 6,
      duration: '45-50秒',
      content: `日常场景：展示在日常生活中吃${productName}的画面，比如工作间隙、追剧时`,
      voiceover: `我现在经常备一些，想吃的时候就吃，很方便`,
    },
    {
      scene: 7,
      duration: '50-55秒',
      content: `展示${productName}的包装，手指指向下方链接`,
      voiceover: `链接在下面，有需要的可以看看`,
    },
  ]
}

// 家居用品脚本模板
function generateHomeScript(
  productName: string,
  features: string[],
  targetAudience?: string
) {
  const mainFeature = features[0] || '省时省力'

  return [
    {
      scene: 1,
      duration: '0-5秒',
      content: `镜头特写：展示做家务的场景，比如扫地、洗碗、做饭等`,
      voiceover: `作为${targetAudience || '普通人'}，每天都要做家务，真的很累`,
    },
    {
      scene: 2,
      duration: '5-15秒',
      content: `镜头切换：展示痛点场景，比如扫地要弯腰、洗碗要花很久，或者做饭很麻烦`,
      voiceover: `以前做家务，${mainFeature.split('，')[0]}的问题一直存在，真的很花时间`,
    },
    {
      scene: 3,
      duration: '15-25秒',
      content: `画面切换：展示${productName}的包装，拆开包装，展示产品`,
      voiceover: `后来朋友推荐了${productName}，说是${mainFeature}，我就买来试试看`,
    },
    {
      scene: 4,
      duration: '25-35秒',
      content: `特写：展示${productName}的使用过程，比如设置参数、开始工作`,
      voiceover: `操作很简单，${features[1] || '效果很好'}，设置好就不用管了`,
    },
    {
      scene: 5,
      duration: '35-45秒',
      content: `对比画面：左边是手工做家务的场景，右边是使用${productName}的场景`,
      voiceover: `你们看，用了${productName}之后，${mainFeature}，而且效果更好`,
    },
    {
      scene: 6,
      duration: '45-50秒',
      content: `日常场景：展示在日常生活中使用${productName}的画面`,
      voiceover: `我现在每天都用它，已经用了3个月了，真的很省心`,
    },
    {
      scene: 7,
      duration: '50-55秒',
      content: `展示${productName}的包装，手指指向下方链接`,
      voiceover: `链接在下面，有需要的可以看看`,
    },
  ]
}

// 服装鞋包脚本模板
function generateClothingScript(
  productName: string,
  features: string[],
  targetAudience?: string
) {
  const mainFeature = features[0] || '舒适透气'

  return [
    {
      scene: 1,
      duration: '0-5秒',
      content: `镜头特写：展示穿${productName}之前的场景，比如穿不舒适的鞋子或衣服`,
      voiceover: `作为${targetAudience || '普通人'}，买${productName}真的要选对，不然穿一天很难受`,
    },
    {
      scene: 2,
      duration: '5-15秒',
      content: `镜头切换：展示痛点场景，比如穿一天脚痛，或者衣服不透气、不合身`,
      voiceover: `以前买的${productName}，${mainFeature.split('，')[0]}的问题一直存在，真的很不舒服`,
    },
    {
      scene: 3,
      duration: '15-25秒',
      content: `画面切换：展示${productName}的包装，拆开包装，展示产品`,
      voiceover: `后来朋友推荐了${productName}，说是${mainFeature}，我就买来试试看`,
    },
    {
      scene: 4,
      duration: '25-35秒',
      content: `特写：展示${productName}的细节，比如面料质感、做工细节`,
      voiceover: `面料真的很舒服，${features[1] || '质量很好'}，而且很透气`,
    },
    {
      scene: 5,
      duration: '35-45秒',
      content: `对比画面：左边是以前穿的${productName}，右边是现在的${productName}`,
      voiceover: `你们看对比，这款${mainFeature}，而且版型也更好`,
    },
    {
      scene: 6,
      duration: '45-50秒',
      content: `日常场景：展示在日常生活中穿${productName}的画面，比如上班、出门`,
      voiceover: `我现在经常穿，已经穿了很久了，真的很喜欢`,
    },
    {
      scene: 7,
      duration: '50-55秒',
      content: `展示${productName}的包装，手指指向下方链接`,
      voiceover: `链接在下面，有需要的可以看看`,
    },
  ]
}

// ==================== API 路由 ====================

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

    // 1. 识别产品类型
    const productType = identifyProductType(productDescription)

    // 2. 提取产品信息
    const { productName, features } = extractProductInfo(productDescription, productType)

    // 3. 生成脚本
    const template = generateScriptTemplate(productType, productName, features, targetAudience)

    // 4. 添加 CTA 和 Hashtags
    const result = {
      ...template,
      cta: '链接在下面，有需要的可以看看',
      hashtags: ['#好物推荐', '#真实测评', '#种草', '#必买', `#${productType.name}`],
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Generate API Error:', error)
    return NextResponse.json(
      { error: '生成失败，请稍后重试' },
      { status: 500 }
    )
  }
}
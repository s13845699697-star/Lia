import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

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

    // 调用OpenAI API生成TikTok电商脚本
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `你是TikTok电商广告脚本专家。你的任务是生成高转化率的TikTok广告脚本。

必须严格返回JSON格式，不要任何解释文字，不要Markdown代码块。

返回结构：
{
  "hook": "前3秒的吸睛文案（1句话）",
  "scenes": [
    {
      "scene": 场景序号（1, 2, 3...）,
      "duration": "时间范围（如'0-3秒'）",
      "content": "画面描述（简短清晰）",
      "voiceover": "旁白文案"
    }
  ],
  "cta": "行动号召（1-2句话）",
  "hashtags": ["#标签1", "#标签2", "#标签3"]
}

脚本要求：
1. Hook必须在前3秒抓住注意力
2. 每个场景时长控制在3-8秒
3. 画面描述要具体、可拍摄
4. 旁白要口语化、有节奏感
5. CTA要直接、有紧迫感
6. Hashtags要相关性强、热门`
        },
        {
          role: "user",
          content: `产品描述：${productDescription}

${targetAudience ? `目标受众：${targetAudience}` : ''}

请生成一个高转化率的TikTok电商广告脚本。`
        }
      ],
      temperature: 0.7,
      max_tokens: 1500,
    })

    const result = completion.choices[0]?.message?.content

    if (!result) {
      return NextResponse.json(
        { error: '生成失败，请稍后重试' },
        { status: 500 }
      )
    }

    // 解析JSON
    let parsedResult
    try {
      // 去除可能的Markdown代码块标记
      const cleanResult = result.replace(/```json\n?|\n?```/g, '').trim()
      parsedResult = JSON.parse(cleanResult)
    } catch (e) {
      console.error('JSON解析失败:', result)
      return NextResponse.json(
        { error: '生成格式错误，请重试' },
        { status: 500 }
      )
    }

    return NextResponse.json(parsedResult)
  } catch (error) {
    console.error('Generate API Error:', error)
    return NextResponse.json(
      { error: '生成失败，请稍后重试' },
      { status: 500 }
    )
  }
}
// ========== 报告数据配置 ==========
// 使用立即执行函数防止变量污染全局作用域
(function() {
    if (window.reportGeneratorLoaded) {
        console.warn('⚠️ report-generator.js 已加载过');
        return;
    }
    window.reportGeneratorLoaded = true;
    
    console.log('✅ report-generator.js 加载成功');
    
    // 人格类型数据（简化版）
   window.personalityData = {
    'INFJ': {
        role: '提倡者',
        definition: '富有想象力且意志坚定的理想主义者，总能基于自己的价值观和对他人的关怀来采取行动。',
        summary: '作为INFJ，你是最稀有的人格类型之一，仅占人口的1-2%。你拥有独特的洞察力，能够理解复杂的心理动态。你既是理想主义者，又是脚踏实地的实践者，总是在寻找方法来改善他人的生活。',
        cognitiveStack: {
            dominant: 'Ni - 内倾直觉',
            auxiliary: 'Fe - 外倾情感',
            tertiary: 'Ti - 内倾思考',
            inferior: 'Se - 外倾实感'
        },
        strengths: [
            '深邃的洞察力与共情能力',
            '强大的理想主义与使命感',
            '创造性的问题解决思维',
            '坚定不移的个人价值观',
            '善于理解复杂的人际关系',
            '强烈的道德责任感'
        ],
        shadows: [
            '过度理想化导致现实落差',
            '忽视自身需求过度付出',
            '完美主义导致的拖延',
            '对批评过于敏感',
            '容易陷入过度思考',
            '在冲突中可能过度退让'
        ],
        soulmates: ['ENFP', 'ENTP'],
        partners: ['ESTJ', 'ESFJ'],
        energyBoost: ['INFP', 'ISFP'],
        functionPreference: '你的认知功能排序为 <strong>Ni > Fe > Ti > Se</strong>。这意味着你主要依赖内倾直觉来感知世界，辅助以外倾情感做出决策。在压力状态下，可能过度使用第三功能内倾思考，而忽视外倾实感的现实信息。',
        actionTips: [
            '每天设定15分钟的"自我关怀时间"',
            '尝试对非重要请求说"不"，练习设立边界',
            '每周完成一项小目标，避免完美主义拖延',
            '记录三次"过度付出"的情况并反思',
            '练习将大目标拆解为可执行的小步骤'
        ],
        evolution: [
            '发展外倾实感(Se)，增强现实感知与行动力',
            '平衡理想与现实，将愿景转化为可执行的计划',
            '建立可持续的能量管理机制',
            '培养健康的自我表达与坚持主张的能力',
            '学习在帮助他人前先确认自己的能量状态'
        ],
        keyInsight: '"完美不是目标，完整才是。" 接纳自己的局限性，理解成长是一个持续的过程而非终点。你的价值不在于拯救世界，而在于在每日的小选择中保持真实与善良。'
    },
    'INTJ': {
        role: '建筑师',
        definition: '富有想象力和战略性的思想家，一切皆在计划之中。',
        summary: '作为INTJ，你是天生的战略家和规划者。你拥有强大的分析能力和长远的眼光，总能从复杂的信息中找出规律和可能性。你喜欢独立思考，追求效率和完美，对自己和他人都有高标准。',
        cognitiveStack: {
            dominant: 'Ni - 内倾直觉',
            auxiliary: 'Te - 外倾思考',
            tertiary: 'Fi - 内倾情感',
            inferior: 'Se - 外倾实感'
        },
        strengths: [
            '强大的战略规划能力',
            '独立思考和逻辑分析',
            '长远的眼光和洞察力',
            '高效的问题解决能力',
            '对复杂系统的理解力',
            '坚定不移地追求目标'
        ],
        shadows: [
            '可能显得冷漠或疏远',
            '过度依赖理性忽视情感',
            '完美主义导致的拖延',
            '对低效率缺乏耐心',
            '固执己见难以妥协',
            '忽视日常生活的乐趣'
        ],
        soulmates: ['ENFP', 'ENTP'],
        partners: ['ESTP', 'ESFP'],
        energyBoost: ['INTP', 'ISTP'],
        functionPreference: '你的认知功能排序为 <strong>Ni > Te > Fi > Se</strong>。这意味着你主要通过内倾直觉感知世界，以外倾思考做出决策。需要注意发展内倾情感以实现自我和谐，并适度使用外倾实感来享受当下。',
        actionTips: [
            '每周安排一次与朋友的社交活动',
            '练习表达对他人的认可和感激',
            '为创意和灵感留出自由探索时间',
            '尝试接受"足够好"而不是完美',
            '学习表达自己的情感和感受'
        ],
        evolution: [
            '发展情感感知和表达的能力',
            '学习团队协作和沟通技巧',
            '平衡工作与生活，享受当下',
            '培养灵活性和开放性的思维',
            '接纳情感作为决策的合理因素'
        ],
        keyInsight: '"效率不是一切，连接也同样重要。" 学会在追求目标的同时，享受过程中的美好和人际关系的温暖。真正的力量来自于平衡理性与情感。'
    },
    'INFP': {
        role: '调停者',
        definition: '诗意、善良的利他主义者，总是热情地寻求帮助他人和实现自己的理想。',
        summary: '作为INFP，你是温柔而坚定的理想主义者。你内心有着丰富的价值观和道德感，总是渴望让世界变得更美好。你富有创造力，对他人充满同理心，但也需要保护自己敏感的内心世界。',
        cognitiveStack: {
            dominant: 'Fi - 内倾情感',
            auxiliary: 'Ne - 外倾直觉',
            tertiary: 'Si - 内倾实感',
            inferior: 'Te - 外倾思考'
        },
        strengths: [
            '深刻的价值观和道德信念',
            '强大的共情和理解能力',
            '丰富的想象力和创造力',
            '对多样性的开放态度',
            '真实的自我表达',
            '追求和谐与美好'
        ],
        shadows: [
            '过度理想化导致失望',
            '难以面对冲突和批评',
            '拖延重要决定和行动',
            '过度内省导致情绪波动',
            '忽视现实约束和细节',
            '容易被他人情绪影响'
        ],
        soulmates: ['ENFJ', 'ENTJ'],
        partners: ['ESTJ', 'ESFJ'],
        energyBoost: ['INFJ', 'ISFJ'],
        functionPreference: '你的认知功能排序为 <strong>Fi > Ne > Si > Te</strong>。这意味着你由内倾情感驱动，通过外倾直觉探索可能性。需要发展外倾思考来增强执行力，并平衡内倾实感带来的怀旧倾向。',
        actionTips: [
            '设立现实可行的短期目标',
            '练习在冲突中表达自己的需求',
            '将创意转化为具体的行动计划',
            '学习说"不"以保护个人界限',
            '建立稳定的日常作息'
        ],
        evolution: [
            '发展外倾思考，增强执行力和决策力',
            '平衡理想与现实，设定可达成的目标',
            '建立稳定的日常习惯和结构',
            '培养面对冲突的勇气和技巧',
            '将个人价值观转化为实际影响力'
        ],
        keyInsight: '"你的敏感不是弱点，而是你深度连接世界的超能力。" 学会用你的同理心滋养自己，而不仅仅是他人。真正的力量来自于平衡理想与行动。'
    },
    'INTP': {
        role: '逻辑学家',
        definition: '具有创造力的发明家，对知识有着不知疲倦的渴望，喜欢分析和解决复杂问题。',
        summary: '作为INTP，你是天生的思想家和哲学家。你对抽象概念着迷，喜欢探索理论和模式。你独立、理性，总是在追求知识和真理。你的头脑像一个永不停歇的思考机器，总能从独特的角度看待问题。',
        cognitiveStack: {
            dominant: 'Ti - 内倾思考',
            auxiliary: 'Ne - 外倾直觉',
            tertiary: 'Si - 内倾实感',
            inferior: 'Fe - 外倾情感'
        },
        strengths: [
            '强大的逻辑分析和推理能力',
            '对复杂理论的好奇和探索',
            '独立和客观的思考方式',
            '创新的问题解决能力',
            '对知识的深入理解',
            '灵活开放的思维模式'
        ],
        shadows: [
            '可能显得疏离和冷漠',
            '过度分析导致决策困难',
            '忽视情感和人际关系',
            '拖延实际执行和行动',
            '完美主义导致项目无法完成',
            '难以表达内心情感'
        ],
        soulmates: ['ENTJ', 'ENFJ'],
        partners: ['ESTJ', 'ESFJ'],
        energyBoost: ['INTJ', 'ISTP'],
        functionPreference: '你的认知功能排序为 <strong>Ti > Ne > Si > Fe</strong>。这意味着你以内倾思考为核心，通过外倾直觉探索可能性。需要发展外倾情感以改善人际关系，并平衡内倾实感的实用性。',
        actionTips: [
            '为项目设定明确的截止日期',
            '定期与朋友保持联系和互动',
            '将理论知识与实际应用结合',
            '练习表达赞赏和积极反馈',
            '关注实施细节和可行性'
        ],
        evolution: [
            '发展外倾情感，提升人际连接能力',
            '将创意和理论转化为实际行动',
            '建立稳定的日常作息和习惯',
            '培养情感表达和沟通技巧',
            '平衡深度思考与即时行动'
        ],
        keyInsight: '"知识的意义不仅在于理解，更在于分享和连接。" 学会用你的智慧照亮他人，而不仅仅是照亮问题。真正的智慧来自于理论与实践的结合。'
    },
    'ENFJ': {
        role: '主人公',
        definition: '富有魅力和鼓舞人心的领导者，能够帮助他人成长，致力于实现共同的理想。',
        summary: '作为ENFJ，你是天生的领导者和导师。你善于洞察他人的潜力，并激励他们成为更好的自己。你热情、有说服力，总能营造积极的氛围。对你来说，最重要的不是权力，而是帮助他人实现自我价值。',
        cognitiveStack: {
            dominant: 'Fe - 外倾情感',
            auxiliary: 'Ni - 内倾直觉',
            tertiary: 'Se - 外倾实感',
            inferior: 'Ti - 内倾思考'
        },
        strengths: [
            '卓越的人际交往和领导能力',
            '激发他人潜能的才能',
            '强大的说服力和影响力',
            '对他人需求的敏感洞察',
            '热情和积极的态度',
            '促进和谐与团队合作'
        ],
        shadows: [
            '过度关注他人而忽略自己',
            '害怕冲突和拒绝',
            '可能显得过于操控或说教',
            '难以接受批评和负面反馈',
            '过度理想化他人',
            '忽视自己的需求和界限'
        ],
        soulmates: ['INFP', 'ISFP'],
        partners: ['ISTP', 'INTP'],
        energyBoost: ['ENFP', 'ESFJ'],
        functionPreference: '你的认知功能排序为 <strong>Fe > Ni > Se > Ti</strong>。这意味着你以外倾情感为主导，通过内倾直觉预见可能性。需要发展内倾思考以增强逻辑分析，并平衡外倾实感的享乐倾向。',
        actionTips: [
            '每天留出独处和反思的时间',
            '练习接受和建设性处理批评',
            '明确个人界限并坚持维护',
            '平衡给予帮助和自我照顾',
            '学习客观分析问题'
        ],
        evolution: [
            '发展内倾思考，增强逻辑和客观分析',
            '学习接受不完美和不确定性',
            '建立健康的个人界限和自我保护',
            '平衡社交活动与自我反思时间',
            '培养独立思考和决策能力'
        ],
        keyInsight: '"真正的领导力来自于赋能他人，而非控制他人。" 记住，在帮助世界之前，先确保自己的杯子是满的。真正的力量来自于平衡付出与自我关怀。'
    },
    'ENFP': {
        role: '竞选者',
        definition: '热情、有创造力、社交能力强，总能充满活力地看到可能性并建立联系。',
        summary: '作为ENFP，你是真正的乐观主义者和灵魂鼓舞者。你充满活力和好奇心，总能从平凡中发现非凡。你热爱人际交往，能够轻松与不同类型的人建立联系。你的热情像火焰一样，能够点燃周围人的灵感。',
        cognitiveStack: {
            dominant: 'Ne - 外倾直觉',
            auxiliary: 'Fi - 内倾情感',
            tertiary: 'Te - 外倾思考',
            inferior: 'Si - 内倾实感'
        },
        strengths: [
            '丰富的创意和新想法',
            '热情积极的生活态度',
            '强大的社交和沟通能力',
            '对可能性的敏锐洞察',
            '鼓舞和激励他人的能力',
            '适应性和灵活性'
        ],
        shadows: [
            '注意力分散难以专注',
            '难以完成长期项目',
            '过度承诺导致精力分散',
            '情绪波动较大',
            '忽视细节和实际约束',
            '逃避无聊的日常任务'
        ],
        soulmates: ['INFJ', 'INTJ'],
        partners: ['ISTJ', 'ISFJ'],
        energyBoost: ['ENTP', 'ESFP'],
        functionPreference: '你的认知功能排序为 <strong>Ne > Fi > Te > Si</strong>。这意味着你通过外倾直觉探索世界，以内倾情感做出价值判断。需要发展内倾实感来增强稳定性，并平衡外倾思考的执行力。',
        actionTips: [
            '使用任务清单管理日常事务',
            '为长期项目设定阶段性目标',
            '学习拒绝非优先事项',
            '建立稳定的日常惯例',
            '练习专注和深度工作'
        ],
        evolution: [
            '发展内倾实感，增强细节关注和稳定性',
            '提高专注力和项目完成能力',
            '平衡新奇探索与深度专研',
            '建立可持续的能量管理习惯',
            '培养系统性和条理性'
        ],
        keyInsight: '"你的热情像火，既能照亮世界，也需学会聚焦。" 将你的无限可能性转化为有形的成就，而非停留在灵感阶段。真正的创造力来自于将想法落地。'
    },
    'ENTJ': {
        role: '指挥官',
        definition: '大胆、富有想象力和强大意志力的领导者，总能找到或创造解决问题的途径。',
        summary: '作为ENTJ，你是天生的组织者和决策者。你拥有卓越的领导才能和战略思维，总能高效地实现目标。你自信果断，善于在复杂情况下做出决定。对你来说，挑战不是障碍，而是展示能力的机会。',
        cognitiveStack: {
            dominant: 'Te - 外倾思考',
            auxiliary: 'Ni - 内倾直觉',
            tertiary: 'Se - 外倾实感',
            inferior: 'Fi - 内倾情感'
        },
        strengths: [
            '卓越的领导力和决策能力',
            '高效的问题解决技巧',
            '长远的战略眼光',
            '强大的执行力和推动力',
            '自信和果断的态度',
            '组织和规划复杂项目的能力'
        ],
        shadows: [
            '可能显得专横和不耐烦',
            '忽视他人的情感需求',
            '过度控制和微观管理',
            '难以接受失败和错误',
            '工作狂倾向忽视生活平衡',
            '缺乏情感表达和共情'
        ],
        soulmates: ['INTP', 'INFP'],
        partners: ['ISFP', 'ISTP'],
        energyBoost: ['ESTJ', 'ENTP'],
        functionPreference: '你的认知功能排序为 <strong>Te > Ni > Se > Fi</strong>。这意味着你以外倾思考为主导，通过内倾直觉进行战略规划。需要发展内倾情感以实现情感和谐，并平衡外倾实感的即时满足。',
        actionTips: [
            '练习积极倾听和耐心沟通',
            '认可和赞赏团队成员的贡献',
            '留出时间进行反思和自我关怀',
            '平衡工作目标与个人生活',
            '学习接受不同意见和观点'
        ],
        evolution: [
            '发展内倾情感，增强自我觉察和共情',
            '学习放权和信任他人能力',
            '培养工作与生活的平衡',
            '接受不确定性和过程中的学习',
            '培养情感智慧和人际敏感性'
        ],
        keyInsight: '"真正的力量来自于赋能团队，而非仅仅指挥团队。" 记住，最持久的成功建立在尊重和理解的基础上。真正的领导力来自于服务而非控制。'
    },
    'ENTP': {
        role: '辩论家',
        definition: '聪明好奇的思想家，喜欢智力挑战，擅长看到可能性并进行战略思考。',
        summary: '作为ENTP，你是真正的知识猎手和思维挑战者。你热爱智力刺激，善于辩论和发现新的可能性。你机智、灵活，总是能从不同的角度看待问题。对你来说，真理需要通过辩论和探索来发现。',
        cognitiveStack: {
            dominant: 'Ne - 外倾直觉',
            auxiliary: 'Ti - 内倾思考',
            tertiary: 'Fe - 外倾情感',
            inferior: 'Si - 内倾实感'
        },
        strengths: [
            '快速学习和适应能力',
            '创造性的问题解决',
            '辩论和逻辑分析能力',
            '对可能性的敏锐洞察',
            '机智幽默的沟通风格',
            '挑战传统思维的勇气'
        ],
        shadows: [
            '容易争论和挑衅',
            '难以坚持完成项目',
            '忽视实际细节和限制',
            '可能显得不敏感或挑衅',
            '逃避无聊的日常任务',
            '过度分析导致行动延迟'
        ],
        soulmates: ['INFJ', 'INTJ'],
        partners: ['ISFJ', 'ISTJ'],
        energyBoost: ['ENFP', 'ESTP'],
        functionPreference: '你的认知功能排序为 <strong>Ne > Ti > Fe > Si</strong>。这意味着你通过外倾直觉探索可能性，以内倾思考分析逻辑。需要发展内倾实感来增强实用性，并平衡外倾情感的社交和谐。',
        actionTips: [
            '为创意项目设定具体截止日期',
            '练习有建设性的辩论而非争论',
            '关注实施细节和可行性',
            '平衡智力刺激与实际执行',
            '学习欣赏稳定和常规的价值'
        ],
        evolution: [
            '发展内倾实感，增强细节关注和稳定性',
            '提高项目完成和跟进能力',
            '培养深度专注而非广度探索',
            '建立可持续的工作习惯',
            '平衡创新思维与实用性'
        ],
        keyInsight: '"你的才智就像瑞士军刀，多功能但需要专注才能发挥最大作用。" 学会在探索可能性的同时，深耕几个真正重要的领域。真正的智慧来自于深度与广度的平衡。'
    },
    'ISFJ': {
        role: '守卫者',
        definition: '非常专注和温暖的保护者，时刻准备着保护所爱之人，重视责任和传统。',
        summary: '作为ISFJ，你是可靠而温暖的守护者。你对家庭和社区有着强烈的责任感，总是默默地为他人付出。你注重细节，有良好的记忆力和组织能力。你的价值在于你稳定、可靠的存在和他人的幸福。',
        cognitiveStack: {
            dominant: 'Si - 内倾实感',
            auxiliary: 'Fe - 外倾情感',
            tertiary: 'Ti - 内倾思考',
            inferior: 'Ne - 外倾直觉'
        },
        strengths: [
            '可靠和负责的态度',
            '细致和彻底的执行力',
            '强大的关怀和支持能力',
            '对传统和稳定的重视',
            '实际和务实的问题解决',
            '良好的组织和计划能力'
        ],
        shadows: [
            '过度承担他人责任',
            '难以接受变化和不确定性',
            '可能压抑自己的需求',
            '回避冲突和艰难对话',
            '过度关注细节而忽略大局',
            '对批评过于敏感'
        ],
        soulmates: ['ESFP', 'ESTP'],
        partners: ['ENTP', 'ENFP'],
        energyBoost: ['ISTJ', 'INFJ'],
        functionPreference: '你的认知功能排序为 <strong>Si > Fe > Ti > Ne</strong>。这意味着你依赖内倾实感处理信息，以外倾情感与人互动。需要发展外倾直觉以增强灵活性，并平衡内倾思考的客观分析。',
        actionTips: [
            '练习表达自己的需求和感受',
            '尝试新的经历和思维方式',
            '设立健康的个人界限',
            '平衡照顾他人与自我关怀',
            '学习适应变化和不确定性'
        ],
        evolution: [
            '发展外倾直觉，增强适应性和开放性',
            '学习接受和拥抱变化',
            '培养自我表达和主张的能力',
            '平衡传统价值与个人成长',
            '培养创新思维和冒险精神'
        ],
        keyInsight: '"你的稳定性是他人的避风港，但别忘了自己也需要停靠。" 在照顾世界的同时，记得为自己保留一片安宁的空间。真正的关怀来自于充满能量的自己。'
    },
    'ISFP': {
        role: '探险家',
        definition: '灵活有魅力的艺术家，活在当下，寻找美好，行动优雅自如。',
        summary: '作为ISFP，你是真正的艺术家和探险家。你活在当下，欣赏生活中的美好事物，并拥有强烈的个人价值观。你敏感、温柔，但内心独立且坚韧。你通过行动而不是言语来表达自己。',
        cognitiveStack: {
            dominant: 'Fi - 内倾情感',
            auxiliary: 'Se - 外倾实感',
            tertiary: 'Ni - 内倾直觉',
            inferior: 'Te - 外倾思考'
        },
        strengths: [
            '审美敏感和艺术才能',
            '活在当下的能力',
            '灵活和适应性',
            '真实和真诚的自我表达',
            '对美和和谐的欣赏',
            '敏锐的感官体验'
        ],
        shadows: [
            '回避冲突和艰难对话',
            '难以做长期计划和承诺',
            '可能过于随性缺乏规划',
            '压抑负面情绪',
            '对批评过于敏感',
            '难以设定和坚持界限'
        ],
        soulmates: ['ESFJ', 'ESTJ'],
        partners: ['ENTJ', 'ENFJ'],
        energyBoost: ['INFP', 'ISTP'],
        functionPreference: '你的认知功能排序为 <strong>Fi > Se > Ni > Te</strong>。这意味着你以内倾情感为核心，通过外倾实感体验世界。需要发展外倾思考来增强规划能力，并平衡内倾直觉的未来导向。',
        actionTips: [
            '练习表达不同意见和立场',
            '为长期目标制定具体计划',
            '学习设定和维护个人界限',
            '平衡当下享受与未来规划',
            '练习理性分析和决策'
        ],
        evolution: [
            '发展外倾思考，增强决策和规划能力',
            '提高长期承诺和坚持能力',
            '培养面对冲突的勇气',
            '平衡感官体验与内在价值',
            '培养战略思维和远见'
        ],
        keyInsight: '"你的美感让世界更丰富，但真正的艺术也需要结构和坚持。" 学会将瞬间的灵感转化为持久的创作。真正的自由来自于自律与自发的平衡。'
    },
    'ISTJ': {
        role: '物流师',
        definition: '实际且注重事实的个人，可靠性和诚信无可指责，致力于创建秩序和结构。',
        summary: '作为ISTJ，你是可靠而尽责的现实主义者。你重视传统、规则和秩序，是社会的基石。你注重细节，有强烈的责任感，总是说到做到。你的稳定性和可靠性让周围人感到安心。',
        cognitiveStack: {
            dominant: 'Si - 内倾实感',
            auxiliary: 'Te - 外倾思考',
            tertiary: 'Fi - 内倾情感',
            inferior: 'Ne - 外倾直觉'
        },
        strengths: [
            '可靠和负责任',
            '注重细节和准确性',
            '强大的组织和执行能力',
            '尊重传统和规则',
            '务实和现实的判断',
            '坚持不懈的毅力'
        ],
        shadows: [
            '僵化和抗拒变化',
            '可能显得冷漠和不近人情',
            '过度关注细节忽略大局',
            '难以适应意外情况',
            '压抑个人情感需求',
            '对新想法持怀疑态度'
        ],
        soulmates: ['ESFP', 'ESTP'],
        partners: ['ENFP', 'ENTP'],
        energyBoost: ['ISFJ', 'INTJ'],
        functionPreference: '你的认知功能排序为 <strong>Si > Te > Fi > Ne</strong>。这意味着你依赖内倾实感处理信息，以外倾思考组织行动。需要发展外倾直觉以增强灵活性，并平衡内倾情感的自我觉察。',
        actionTips: [
            '尝试接受新的方法和观点',
            '练习表达赞赏和积极反馈',
            '为意外情况制定备用计划',
            '平衡规则遵循与创新思考',
            '学习适应变化和不确定性'
        ],
        evolution: [
            '发展外倾直觉，增强适应性和开放性',
            '学习灵活应对变化和不确定性',
            '培养情感表达和人际连接',
            '平衡传统方法与创新思维',
            '培养大局观和战略思维'
        ],
        keyInsight: '"你的可靠性是社会的基石，但生活有时需要弯曲而非折断。" 在保持稳定的同时，允许一些空间给惊喜和变化。真正的力量来自于坚定与灵活的结合。'
    },
    'ISTP': {
        role: '鉴赏家',
        definition: '大胆实际的操作者，擅长使用各种工具和方式解决问题，偏好行动而非言语。',
        summary: '作为ISTP，你是冷静而灵活的实践者。你擅长使用工具和技术解决问题，总是保持冷静和客观。你活在当下，善于应对紧急情况。对你来说，行动比言语更有说服力，实践比理论更重要。',
        cognitiveStack: {
            dominant: 'Ti - 内倾思考',
            auxiliary: 'Se - 外倾实感',
            tertiary: 'Ni - 内倾直觉',
            inferior: 'Fe - 外倾情感'
        },
        strengths: [
            '强大的逻辑分析和解决问题的能力',
            '动手能力和机械理解',
            '冷静应对危机的能力',
            '灵活和适应性',
            '享受当下和行动导向',
            '独立和自主的工作方式'
        ],
        shadows: [
            '可能显得冷漠和疏离',
            '回避情感表达和深层对话',
            '难以做长期承诺和规划',
            '对规则和权威持怀疑态度',
            '可能过于冒险冲动',
            '忽视人际关系的维护'
        ],
        soulmates: ['ESFJ', 'ESTJ'],
        partners: ['ENFJ', 'ENTJ'],
        energyBoost: ['INTP', 'ISFP'],
        functionPreference: '你的认知功能排序为 <strong>Ti > Se > Ni > Fe</strong>。这意味着你以内倾思考分析世界，通过外倾实感采取行动。需要发展外倾情感以改善人际关系，并平衡内倾直觉的长期规划。',
        actionTips: [
            '练习表达情感和关心',
            '为长期目标制定具体步骤',
            '学习欣赏和遵守有益规则',
            '平衡独立行动与团队合作',
            '培养耐心和长期规划能力'
        ],
        evolution: [
            '发展外倾情感，增强人际连接和共情',
            '提高长期规划和承诺能力',
            '培养情感表达和沟通技巧',
            '平衡即时行动与长远思考',
            '培养合作与团队精神'
        ],
        keyInsight: '"你的实用主义解决眼前问题，但人生不仅仅是紧急维修。" 学会在解决实际问题的同时，投资于人际关系和长期愿景。真正的能力来自于思考与行动的平衡。'
    },
    'ESFJ': {
        role: '执政官',
        definition: '极有责任心、善于合作的助人者，渴望和谐，乐于以切实方式帮助他人。',
        summary: '作为ESFJ，你是热情而负责的协调者。你重视人际关系和社区和谐，总是乐于助人。你善于组织活动，创造温馨的氛围。对你来说，他人的幸福和社会的认可非常重要。',
        cognitiveStack: {
            dominant: 'Fe - 外倾情感',
            auxiliary: 'Si - 内倾实感',
            tertiary: 'Ne - 外倾直觉',
            inferior: 'Ti - 内倾思考'
        },
        strengths: [
            '卓越的人际交往和组织能力',
            '强烈的责任感和可靠性',
            '创造和谐氛围的才能',
            '实际和务实的帮助方式',
            '对他人需求的敏感关注',
            '促进团队合作和凝聚力'
        ],
        shadows: [
            '过度关注社会认可',
            '难以接受批评和冲突',
            '可能过于传统和保守',
            '忽视个人需求和界限',
            '对变化持抗拒态度',
            '过度承担他人责任'
        ],
        soulmates: ['ISFP', 'ISTP'],
        partners: ['INTP', 'INFP'],
        energyBoost: ['ENFJ', 'ESTJ'],
        functionPreference: '你的认知功能排序为 <strong>Fe > Si > Ne > Ti</strong>。这意味着你以外倾情感为主导，依赖内倾实感处理信息。需要发展内倾思考以增强逻辑分析，并平衡外倾直觉的开放性。',
        actionTips: [
            '练习设立和维护个人界限',
            '尝试接受建设性批评',
            '为个人兴趣留出时间',
            '平衡传统方法与新可能性',
            '学习独立思考和分析'
        ],
        evolution: [
            '发展内倾思考，增强逻辑和客观分析',
            '学习接受和适应变化',
            '培养独立的自我认同',
            '平衡社会期望与个人需求',
            '培养创新思维和冒险精神'
        ],
        keyInsight: '"你的关怀温暖了世界，但真正的力量来自于内在的完整。" 记住，在满足他人之前，先确认自己的杯子是满的。真正的价值来自于内在自信而非外在认可。'
    },
    'ESFP': {
        role: '表演者',
        definition: '自发、精力充沛的表演者，热爱生活、人群和物质享受，活在当下。',
        summary: '作为ESFP，你是充满活力和魅力的生活享受者。你热爱人群和社交，总能带来欢乐和活力。你活在当下，善于发现生活中的美好。你的热情和幽默感让你成为聚会的灵魂人物。',
        cognitiveStack: {
            dominant: 'Se - 外倾实感',
            auxiliary: 'Fi - 内倾情感',
            tertiary: 'Te - 外倾思考',
            inferior: 'Ni - 内倾直觉'
        },
        strengths: [
            '强大的社交和娱乐能力',
            '活在当下的享受能力',
            '灵活和适应性',
            '热情积极的生活态度',
            '审美敏感和艺术表达',
            '对他人情感的敏感'
        ],
        shadows: [
            '难以做长期规划和承诺',
            '逃避冲突和艰难对话',
            '可能过于冲动和冒险',
            '忽视未来后果',
            '对批评过于敏感',
            '难以处理抽象概念'
        ],
        soulmates: ['ISFJ', 'ISTJ'],
        partners: ['INTJ', 'INFJ'],
        energyBoost: ['ESTP', 'ENFP'],
        functionPreference: '你的认知功能排序为 <strong>Se > Fi > Te > Ni</strong>。这意味着你通过外倾实感体验世界，以内倾情感做出价值判断。需要发展内倾直觉来增强远见，并平衡外倾思考的执行力。',
        actionTips: [
            '为重要目标制定具体计划',
            '练习延迟满足和长期思考',
            '学习处理冲突和批评',
            '平衡社交活动与个人反思',
            '培养深度思考的习惯'
        ],
        evolution: [
            '发展内倾直觉，增强未来规划和远见',
            '提高长期承诺和坚持能力',
            '培养深度思考和抽象理解',
            '平衡当下享受与未来投资',
            '培养战略思维和规划能力'
        ],
        keyInsight: '"你的活力点亮了每个房间，但真正的光也能在安静中闪耀。" 学会在热闹之外，也享受内心的宁静和深度。真正的快乐来自于内外的平衡。'
    },
    'ESTJ': {
        role: '总经理',
        definition: '优秀的管理者，在管理事务或人员方面无与伦比，代表传统和秩序。',
        summary: '作为ESTJ，你是高效而可靠的管理者。你注重效率、组织和传统，善于建立和维护秩序。你果断、务实，总是追求最佳实践。你的领导风格直接而有效，能够确保目标的达成。',
        cognitiveStack: {
            dominant: 'Te - 外倾思考',
            auxiliary: 'Si - 内倾实感',
            tertiary: 'Ne - 外倾直觉',
            inferior: 'Fi - 内倾情感'
        },
        strengths: [
            '卓越的组织和管理能力',
            '强大的执行力和决策力',
            '注重效率和生产力',
            '尊重传统和规则',
            '可靠和负责任',
            '务实和现实的判断'
        ],
        shadows: [
            '可能显得专横和不灵活',
            '忽视他人的情感需求',
            '抗拒变化和新方法',
            '过度关注控制和秩序',
            '难以表达个人情感',
            '对非常规想法持怀疑态度'
        ],
        soulmates: ['ISFP', 'ISTP'],
        partners: ['INFP', 'ENFP'],
        energyBoost: ['ESFJ', 'ENTJ'],
        functionPreference: '你的认知功能排序为 <strong>Te > Si > Ne > Fi</strong>。这意味着你以外倾思考为主导，依赖内倾实感处理信息。需要发展内倾情感以实现自我和谐，并平衡外倾直觉的开放性。',
        actionTips: [
            '练习积极倾听和共情',
            '尝试接受灵活的工作方法',
            '为个人情感表达留出空间',
            '平衡效率目标与人际关系',
            '学习欣赏创新和创造力'
        ],
        evolution: [
            '发展内倾情感，增强自我觉察和共情',
            '学习灵活适应变化',
            '培养创新和开放性思维',
            '平衡控制需求与自主授权',
            '培养情感智慧和人际敏感性'
        ],
        keyInsight: '"你的效率推动世界运转，但人类不仅仅是机器。" 记住，在管理事务的同时，也要滋养人际关系和内在情感。真正的效率来自于人与事的和谐。'
    },
    'ESTP': {
        role: '企业家',
        definition: '聪明、精力充沛、敏锐感知的人，享受冒险和边缘生活，偏好行动而非言语。',
        summary: '作为ESTP，你是充满能量和勇气的冒险家。你善于把握机会，享受挑战和刺激。你机智、灵活，总能快速适应变化。对你来说，生活就是一场冒险，最好的体验来自于亲身实践。',
        cognitiveStack: {
            dominant: 'Se - 外倾实感',
            auxiliary: 'Ti - 内倾思考',
            tertiary: 'Fe - 外倾情感',
            inferior: 'Ni - 内倾直觉'
        },
        strengths: [
            '强大的适应和应变能力',
            '享受当下和行动导向',
            '机智和快速思考',
            '冒险精神和勇气',
            '务实和现实的问题解决',
            '社交魅力和说服力'
        ],
        shadows: [
            '可能过于冲动和冒险',
            '难以做长期承诺和规划',
            '忽视未来后果',
            '可能显得不敏感',
            '逃避深度情感对话',
            '对规则和约束不耐烦'
        ],
        soulmates: ['ISFJ', 'ISTJ'],
        partners: ['INFJ', 'INTJ'],
        energyBoost: ['ESFP', 'ENTP'],
        functionPreference: '你的认知功能排序为 <strong>Se > Ti > Fe > Ni</strong>。这意味着你通过外倾实感体验世界，以内倾思考分析逻辑。需要发展内倾直觉来增强远见，并平衡外倾情感的社交和谐。',
        actionTips: [
            '为长期目标制定具体计划',
            '练习考虑行动的长远后果',
            '学习深度倾听和情感表达',
            '平衡冒险精神与安全考量',
            '培养耐心和长期规划'
        ],
        evolution: [
            '发展内倾直觉，增强未来规划和远见',
            '提高长期承诺和坚持能力',
            '培养深度情感连接',
            '平衡即时行动与长远思考',
            '培养战略思维和预见能力'
        ],
        keyInsight: '"你的勇气开拓新领域，但真正的冒险家也知道何时需要地图。" 学会在享受刺激的同时，也为未来绘制路线。真正的勇气来自于智慧与冒险的平衡。'
    }
};
    
    // ========== 2. 根据分数计算报告数据 ==========
    function calculateReportData(scores) {
        // 计算基础类型
        let type = '';
        type += (scores.E >= scores.I) ? 'E' : 'I';
        type += (scores.S >= scores.N) ? 'S' : 'N';
        type += (scores.T >= scores.F) ? 'T' : 'F';
        type += (scores.J >= scores.P) ? 'J' : 'P';
        
        // 获取类型数据（如果未定义，使用默认INFJ）
        const typeData = window.personalityData[type] || window.personalityData['INFJ'];
        
        // 计算百分比
        const totalE_I = scores.E + scores.I;
        const totalS_N = scores.S + scores.N;
        const totalT_F = scores.T + scores.F;
        const totalJ_P = scores.J + scores.P;
        
        // 计算八维属性（这里简化计算，实际可以根据更多维度计算）
        const attributes = {
            social: Math.round((scores.E / Math.max(totalE_I, 1)) * 100), // 社交电量
            self: Math.round((Math.abs(scores.T - scores.F) / Math.max(totalT_F, 1)) * 100), // 自洽指数
            action: Math.round((scores.J / Math.max(totalJ_P, 1)) * 100), // 行动燃料
            emotion: 75, // 情绪免疫力（简化）
            vision: Math.round((scores.N / Math.max(totalS_N, 1)) * 100), // 视野格局
            brain: 80, // 脑力在线（简化）
            boundary: Math.round((scores.J / Math.max(totalJ_P, 1)) * 70), // 边界清晰度
            soul: 85 // 心灵富足（简化）
        };
        
        // 计算心智阶段
        let mindStage = '初阶觉醒';
        let mindStagePercent = 30;
        let mindStageDesc = '你开始意识到自己的行为模式，但尚未形成系统性的自我认知';
        
        const consistency = calculateConsistency(scores);
        if (consistency > 80) {
            mindStage = '高阶觉醒';
            mindStagePercent = 85;
            mindStageDesc = '你对自己有深刻的理解，能够有意识地调整行为模式';
        } else if (consistency > 60) {
            mindStage = '中阶觉醒';
            mindStagePercent = 65;
            mindStageDesc = '你已具备一定的自我觉察能力，开始理解自己的行为模式';
        }
        
        // 计算能量循环
        let energyCycle = '动态平衡';
        let energyCycleDesc = '你能在社交与独处间找到平衡点，但偶尔会感到能量波动';
        const energyRatio = scores.E / Math.max(totalE_I, 1);
        
        if (energyRatio > 0.7) {
            energyCycle = '能量充盈';
            energyCycleDesc = '你从社交中获得大量能量，喜欢与人互动';
        } else if (energyRatio < 0.3) {
            energyCycle = '需要蓄能';
            energyCycleDesc = '你更需要独处时间来恢复能量，社交可能让你感到消耗';
        }
        
        return {
            type,
            typeData,
            attributes,
            mindStage,
            mindStagePercent,
            mindStageDesc,
            energyCycle,
            energyCycleDesc,
            energyE: Math.round(energyRatio * 100),
            energyI: Math.round((1 - energyRatio) * 100),
            date: new Date().toLocaleDateString('zh-CN', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        };
    }
    
    // 3. 计算答题一致性（用于判断心智阶段）
    function calculateConsistency(scores) {
        // 简化计算：如果某个维度得分明显高于另一个，则一致性高
        let consistency = 0;
        if (Math.abs(scores.E - scores.I) > 5) consistency += 25;
        if (Math.abs(scores.S - scores.N) > 5) consistency += 25;
        if (Math.abs(scores.T - scores.F) > 5) consistency += 25;
        if (Math.abs(scores.J - scores.P) > 5) consistency += 25;
        
        return consistency;
    }
    
    // 4. 绘制雷达图
    function drawRadarChart(attributes) {
        const ctx = document.getElementById('attribute-radar');
        if (!ctx) {
            console.error('找不到雷达图canvas元素');
            return;
        }
        
        const canvasCtx = ctx.getContext('2d');
        
        // 如果已存在图表实例，先销毁
        if (window.radarChart) {
            window.radarChart.destroy();
        }
        
        // 检查Chart.js是否可用
        if (typeof Chart === 'undefined') {
            console.error('Chart.js 未加载，无法绘制雷达图');
            return;
        }
        
        const data = {
            labels: [
                '社交电量', 
                '自洽指数', 
                '行动燃料', 
                '情绪免疫力',
                '视野格局', 
                '脑力在线', 
                '边界清晰度', 
                '心灵富足'
            ],
            datasets: [{
                label: '你的属性值',
                data: [
                    attributes.social,
                    attributes.self,
                    attributes.action,
                    attributes.emotion,
                    attributes.vision,
                    attributes.brain,
                    attributes.boundary,
                    attributes.soul
                ],
                backgroundColor: 'rgba(79, 70, 229, 0.2)',
                borderColor: 'rgb(79, 70, 229)',
                pointBackgroundColor: 'rgb(79, 70, 229)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(79, 70, 229)'
            }]
        };
        
        const config = {
            type: 'radar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    r: {
                        angleLines: {
                            display: true,
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        suggestedMin: 0,
                        suggestedMax: 100,
                        ticks: {
                            stepSize: 20,
                            backdropColor: 'transparent'
                        },
                        pointLabels: {
                            font: {
                                size: 14
                            },
                            color: '#4b5563'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.raw}%`;
                            }
                        }
                    }
                }
            }
        };
        
        try {
            window.radarChart = new Chart(canvasCtx, config);
        } catch (error) {
            console.error('绘制雷达图失败:', error);
        }
    }
    
   // 修改后的 renderReport 函数（部分）：
function renderReport(reportData) {
    const { type, typeData, attributes, mindStage, mindStagePercent, mindStageDesc, energyCycle, energyCycleDesc, energyE, energyI, date } = reportData;
    
    console.log('🔄 开始渲染报告，人格类型:', type);
    
    // 1. 更新报告头部
    const personalityTypeBadgeEl = document.getElementById('personality-type-badge');
    if (personalityTypeBadgeEl) {
        personalityTypeBadgeEl.textContent = type;
    }
    
    const reportDateEl = document.getElementById('report-date');
    const reportIdEl = document.getElementById('report-id');
    
    if (reportDateEl) reportDateEl.textContent = date;
    if (reportIdEl) reportIdEl.textContent = `MBTI${type}`;
        
    // 2. 更新核心人格画像
    const roleNameEl = document.getElementById('role-name');
    const typeDefinitionEl = document.getElementById('type-definition');
    
    if (roleNameEl) roleNameEl.textContent = typeData.role;
    if (typeDefinitionEl) typeDefinitionEl.textContent = typeData.definition;
    
        
        // 更新认知功能详细显示 - 确保元素存在
        if (typeData.cognitiveStack) {
            const dominantFuncEl = document.getElementById('dominant-function');
            const auxiliaryFuncEl = document.getElementById('auxiliary-function');
            const tertiaryFuncEl = document.getElementById('tertiary-function');
            const inferiorFuncEl = document.getElementById('inferior-function');
            
            if (dominantFuncEl) dominantFuncEl.textContent = typeData.cognitiveStack.dominant;
            if (auxiliaryFuncEl) auxiliaryFuncEl.textContent = typeData.cognitiveStack.auxiliary;
            if (tertiaryFuncEl) tertiaryFuncEl.textContent = typeData.cognitiveStack.tertiary;
            if (inferiorFuncEl) inferiorFuncEl.textContent = typeData.cognitiveStack.inferior;
        }
        
        // 更新核心特质标签
        const traitsContainer = document.getElementById('type-traits');
        if (traitsContainer && typeData.strengths) {
            // 使用前4个优势作为核心特质
            const traits = typeData.strengths.slice(0, 4);
            traitsContainer.innerHTML = traits.map(trait => 
                `<div style="background: rgba(255,255,255,0.15); padding: 10px 20px; border-radius: 50px; font-size: 14px; border: 1px solid rgba(255,255,255,0.2);">${trait}</div>`
            ).join('');
        }
        
        // 3. 更新内在状态仪表盘
        const mindStageEl = document.getElementById('mind-stage');
        const mindStageBarEl = document.getElementById('mind-stage-bar');
        const mindStageDescEl = document.getElementById('mind-stage-desc');
        
        if (mindStageEl) mindStageEl.textContent = mindStage;
        if (mindStageBarEl) mindStageBarEl.style.width = `${mindStagePercent}%`;
        if (mindStageDescEl) mindStageDescEl.textContent = mindStageDesc;
        
        const energyCycleEl = document.getElementById('energy-cycle');
        const energyEEl = document.getElementById('energy-E');
        const energyIEl = document.getElementById('energy-I');
        const energyCycleDescEl = document.getElementById('energy-cycle-desc');
        
        if (energyCycleEl) energyCycleEl.textContent = energyCycle;
        if (energyEEl) energyEEl.textContent = `${energyE}%`;
        if (energyIEl) energyIEl.textContent = `${energyI}%`;
        if (energyCycleDescEl) energyCycleDescEl.textContent = energyCycleDesc;
        
        // 4. 更新八维属性
        const attrElements = [
            { id: 'attr-social', value: attributes.social },
            { id: 'attr-self', value: attributes.self },
            { id: 'attr-action', value: attributes.action },
            { id: 'attr-emotion', value: attributes.emotion },
            { id: 'attr-vision', value: attributes.vision },
            { id: 'attr-brain', value: attributes.brain },
            { id: 'attr-boundary', value: attributes.boundary },
            { id: 'attr-soul', value: attributes.soul }
        ];
        
        attrElements.forEach(attr => {
            const element = document.getElementById(attr.id);
            if (element) {
                element.textContent = `${attr.value}%`;
            }
        });
        
        // 5. 更新天赋与盲区
        const strengthsList = document.getElementById('core-strengths');
        const shadowsList = document.getElementById('potential-shadows');
        
        if (typeData.strengths && strengthsList) {
            strengthsList.innerHTML = typeData.strengths.map(strength => `<li>${strength}</li>`).join('');
        }
        
        if (typeData.shadows && shadowsList) {
            shadowsList.innerHTML = typeData.shadows.map(shadow => `<li>${shadow}</li>`).join('');
        }
        
        // 6. 更新关系适配地图
        if (typeData.soulmates) {
            const soulmateTypeEl = document.getElementById('soulmate-type');
            if (soulmateTypeEl) {
                soulmateTypeEl.textContent = typeData.soulmates.join(' / ');
            }
        }
        
        if (typeData.partners) {
            const partnerTypeEl = document.getElementById('partner-type');
            if (partnerTypeEl) {
                partnerTypeEl.textContent = typeData.partners.join(' / ');
            }
        }
        
        if (typeData.energyBoost) {
            const energyBoostTypeEl = document.getElementById('energy-boost-type');
            if (energyBoostTypeEl) {
                energyBoostTypeEl.textContent = typeData.energyBoost.join(' / ');
            }
        }
        
        // 7. 更新专属成长路线图
        if (typeData.actionTips) {
            const actionTipsEl = document.getElementById('action-tips');
            if (actionTipsEl) {
                actionTipsEl.innerHTML = typeData.actionTips.map(tip => `<li>${tip}</li>`).join('');
            }
        }
        
        if (typeData.evolution) {
            const evolutionDirectionEl = document.getElementById('evolution-direction');
            if (evolutionDirectionEl) {
                evolutionDirectionEl.innerHTML = typeData.evolution.map(evo => `<li>${evo}</li>`).join('');
            }
        }
        
        if (typeData.keyInsight) {
            const keyInsightEl = document.getElementById('key-insight');
            if (keyInsightEl) {
                keyInsightEl.innerHTML = typeData.keyInsight;
            }
        }
        
        // 8. 绘制雷达图
        drawRadarChart(attributes);
        
        // 9. 添加分享功能
        const shareBtn = document.getElementById('share-btn');
        if (shareBtn) {
            shareBtn.addEventListener('click', function() {
                shareToXiaohongshu(type, typeData.role);
            });
        }
        
        console.log('✅ 报告渲染完成');
    }
    
    // 6. 分享到小红书功能
    function shareToXiaohongshu(type, role) {
        const text = `我的16型人格测试结果：${type} ${role}！\n快来解锁你的灵魂图谱吧～\n#MBTI #人格测试 #自我成长`;
        
        // 创建分享文本
        navigator.clipboard.writeText(text).then(() => {
            alert('✨ 分享文案已复制到剪贴板！\n\n请打开小红书App粘贴发布～\n\n' + text);
        }).catch(err => {
            // 如果剪贴板API不可用，使用传统方法
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            alert('✨ 分享文案已复制到剪贴板！\n\n请打开小红书App粘贴发布～\n\n' + text);
        });
    }
    
    // ========== 7. 导出函数到全局作用域 ==========
    window.calculateReportData = calculateReportData;
    window.renderReport = renderReport;
    window.shareToXiaohongshu = shareToXiaohongshu;
    
    console.log('✅ report-generator.js 初始化完成');
})();
// 4. 绘制雷达图
function drawRadarChart(attributes) {
    const ctx = document.getElementById('attribute-radar');
    if (!ctx) {
        console.error('找不到雷达图canvas元素');
        return;
    }
    
    const canvasCtx = ctx.getContext('2d');
    
    // 如果已存在图表实例，先销毁
    if (window.radarChart) {
        window.radarChart.destroy();
    }
    
    // 检查Chart.js是否可用
    if (typeof Chart === 'undefined') {
        console.error('Chart.js 未加载，无法绘制雷达图');
        // 显示替代内容
        ctx.style.display = 'none';
        const parent = ctx.parentElement;
        if (parent) {
            parent.innerHTML = `
                <div style="text-align: center; padding: 40px;">
                    <div style="font-size: 24px; margin-bottom: 15px;">📊 属性雷达图</div>
                    <div style="color: #6b7280; margin-bottom: 20px;">图表加载失败，请刷新页面重试</div>
                    <div style="display: inline-block; background: #f3f4f6; padding: 15px 25px; border-radius: 10px;">
                        <div>社交电量: ${attributes.social}%</div>
                        <div>自洽指数: ${attributes.self}%</div>
                        <div>行动燃料: ${attributes.action}%</div>
                        <div>情绪免疫力: ${attributes.emotion}%</div>
                        <div>视野格局: ${attributes.vision}%</div>
                        <div>脑力在线: ${attributes.brain}%</div>
                        <div>边界清晰度: ${attributes.boundary}%</div>
                        <div>心灵富足: ${attributes.soul}%</div>
                    </div>
                </div>
            `;
        }
        return;
    }
    
    const data = {
        labels: [
            '社交电量', 
            '自洽指数', 
            '行动燃料', 
            '情绪免疫力',
            '视野格局', 
            '脑力在线', 
            '边界清晰度', 
            '心灵富足'
        ],
        datasets: [{
            label: '你的属性值',
            data: [
                attributes.social,
                attributes.self,
                attributes.action,
                attributes.emotion,
                attributes.vision,
                attributes.brain,
                attributes.boundary,
                attributes.soul
            ],
            backgroundColor: 'rgba(79, 70, 229, 0.2)',
            borderColor: 'rgb(79, 70, 229)',
            pointBackgroundColor: 'rgb(79, 70, 229)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(79, 70, 229)'
        }]
    };
    
    const config = {
        type: 'radar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                r: {
                    angleLines: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    suggestedMin: 0,
                    suggestedMax: 100,
                    ticks: {
                        stepSize: 20,
                        backdropColor: 'transparent'
                    },
                    pointLabels: {
                        font: {
                            size: 14
                        },
                        color: '#4b5563'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.raw}%`;
                        }
                    }
                }
            }
        }
    };
    
    try {
        window.radarChart = new Chart(canvasCtx, config);
        console.log('✅ 雷达图绘制成功');
    } catch (error) {
        console.error('绘制雷达图失败:', error);
        // 显示替代内容
        ctx.style.display = 'none';
        const parent = ctx.parentElement;
        if (parent) {
            parent.innerHTML = `
                <div style="text-align: center; padding: 40px;">
                    <div style="font-size: 24px; margin-bottom: 15px;">📊 属性雷达图</div>
                    <div style="color: #6b7280; margin-bottom: 20px;">图表绘制失败，显示数值代替</div>
                    <div style="display: inline-block; background: #f3f4f6; padding: 15px 25px; border-radius: 10px;">
                        <div>社交电量: ${attributes.social}%</div>
                        <div>自洽指数: ${attributes.self}%</div>
                        <div>行动燃料: ${attributes.action}%</div>
                        <div>情绪免疫力: ${attributes.emotion}%</div>
                        <div>视野格局: ${attributes.vision}%</div>
                        <div>脑力在线: ${attributes.brain}%</div>
                        <div>边界清晰度: ${attributes.boundary}%</div>
                        <div>心灵富足: ${attributes.soul}%</div>
                    </div>
                </div>
            `;
        }
    }
}

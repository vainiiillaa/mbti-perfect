// ========== 16型人格测试 - 完整修复版 ==========
// 防止重复加载
if (window.scriptLoaded) {
    console.log('⚠️ 脚本已加载，跳过重复执行');
    throw new Error('脚本已加载，请勿重复加载');
}
window.scriptLoaded = true;

// ========== 前端智能兑换码系统 ==========
class RedemptionCodeSystem {
    constructor() {
        this.STORAGE_KEYS = {
            CURRENT_CODE: 'mbti_current_code',
            CODE_HISTORY: 'mbti_code_history',
            GENERATION_STATS: 'mbti_generation_stats',
            DEVICE_ID: 'mbti_device_id'
        };
        
        this.CONFIG = {
            CODE_LENGTH: 6,
            CODE_LIFETIME: 24 * 60 * 60 * 1000,
            MAX_REGENERATIONS: 3,
            ALLOW_CACHE_CLEAR_REGENERATION: true
        };
        
        // 定义字符集（排除易混淆字符：I、l、1、O、0、Z、2、S、5、B、8等）
        this.CHARACTER_SET = {
            uppercase: 'ACDEFGHJKLMNPQRTUVWXY',
            numbers: '34679'
        };
    }
    
    // 生成设备ID
    generateDeviceId() {
        let deviceId = localStorage.getItem(this.STORAGE_KEYS.DEVICE_ID);
        
        if (!deviceId) {
            const fingerprintData = [
                navigator.userAgent,
                navigator.language,
                screen.width + 'x' + screen.height,
                screen.colorDepth,
                new Date().getTimezoneOffset(),
                !!navigator.cookieEnabled,
                !!navigator.javaEnabled(),
                navigator.platform
            ].join('|');
            
            deviceId = this.hashString(fingerprintData).substring(0, 12);
            localStorage.setItem(this.STORAGE_KEYS.DEVICE_ID, deviceId);
        }
        
        return deviceId;
    }
    
    // 简单的字符串hash函数
    hashString(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash).toString(36);
    }
    
    // 生成6位兑换码
    generateRedemptionCode() {
        const deviceId = this.generateDeviceId();
        const timestamp = Date.now();
        
        // 生成6位随机码
        let code = '';
        const allChars = this.CHARACTER_SET.uppercase + this.CHARACTER_SET.numbers;
        
        for (let i = 0; i < this.CONFIG.CODE_LENGTH; i++) {
            const randomIndex = Math.floor(Math.random() * allChars.length);
            code += allChars[randomIndex];
        }
        
        // 确保至少包含一个数字
        if (!/[34679]/.test(code)) {
            const lastIndex = code.length - 1;
            const randomNumber = this.CHARACTER_SET.numbers[
                Math.floor(Math.random() * this.CHARACTER_SET.numbers.length)
            ];
            code = code.substring(0, lastIndex) + randomNumber;
        }
        
        return {
            code: code,
            deviceId: deviceId,
            createdAt: timestamp,
            expiresAt: timestamp + this.CONFIG.CODE_LIFETIME,
            usageCount: 0
        };
    }
    
    // 获取当前有效的兑换码
    getValidRedemptionCode() {
        try {
            const codeDataStr = localStorage.getItem(this.STORAGE_KEYS.CURRENT_CODE);
            if (!codeDataStr) return null;
            
            const codeData = JSON.parse(codeDataStr);
            const now = Date.now();
            
            if (now > codeData.expiresAt) {
                return null;
            }
            
            const currentDeviceId = this.generateDeviceId();
            if (codeData.deviceId !== currentDeviceId) {
                return null;
            }
            
            return codeData;
        } catch (error) {
            console.error('获取兑换码失败:', error);
            return null;
        }
    }
    
    // 生成新兑换码（带频率限制）
    createNewRedemptionCode() {
        if (!this.canGenerateNewCode()) {
            throw new Error('24小时内已达到最大生成次数限制');
        }
        
        const newCode = this.generateRedemptionCode();
        localStorage.setItem(this.STORAGE_KEYS.CURRENT_CODE, JSON.stringify(newCode));
        this.updateGenerationStats();
        this.addToHistory(newCode);
        
        return newCode;
    }
    
    // 检查是否可以生成新兑换码
    canGenerateNewCode() {
        try {
            const statsStr = localStorage.getItem(this.STORAGE_KEYS.GENERATION_STATS);
            
            if (!statsStr) {
                return true;
            }
            
            const stats = JSON.parse(statsStr);
            const now = Date.now();
            
            if (now - stats.firstGenerationTime > this.CONFIG.CODE_LIFETIME) {
                return true;
            }
            
            if (stats.generationCount >= this.CONFIG.MAX_REGENERATIONS) {
                return false;
            }
            
            return true;
        } catch (error) {
            console.error('检查生成权限失败:', error);
            return true;
        }
    }
    
    // 更新生成统计
    updateGenerationStats() {
        try {
            const now = Date.now();
            const statsStr = localStorage.getItem(this.STORAGE_KEYS.GENERATION_STATS);
            
            let stats;
            if (!statsStr) {
                stats = {
                    firstGenerationTime: now,
                    generationCount: 1,
                    lastGenerationTime: now
                };
            } else {
                stats = JSON.parse(statsStr);
                const timeSinceFirst = now - stats.firstGenerationTime;
                
                if (timeSinceFirst > this.CONFIG.CODE_LIFETIME) {
                    stats = {
                        firstGenerationTime: now,
                        generationCount: 1,
                        lastGenerationTime: now
                    };
                } else {
                    stats.generationCount = (stats.generationCount || 0) + 1;
                    stats.lastGenerationTime = now;
                }
            }
            
            localStorage.setItem(this.STORAGE_KEYS.GENERATION_STATS, JSON.stringify(stats));
        } catch (error) {
            console.error('更新生成统计失败:', error);
        }
    }
    
    // 添加到历史记录
    addToHistory(codeData) {
        try {
            const historyStr = localStorage.getItem(this.STORAGE_KEYS.CODE_HISTORY);
            let history = [];
            
            if (historyStr) {
                history = JSON.parse(historyStr);
                if (history.length >= 10) {
                    history = history.slice(-9);
                }
            }
            
            history.push({
                code: codeData.code,
                createdAt: codeData.createdAt,
                expiresAt: codeData.expiresAt
            });
            
            localStorage.setItem(this.STORAGE_KEYS.CODE_HISTORY, JSON.stringify(history));
        } catch (error) {
            console.error('添加到历史记录失败:', error);
        }
    }
    
    // 验证用户输入的兑换码
    validateUserInputCode(inputCode) {
        try {
            const cleanCode = inputCode.toUpperCase().replace(/[^A-Z0-9]/g, '');
            
            if (cleanCode.length !== this.CONFIG.CODE_LENGTH) {
                return false;
            }
            
            const allowedChars = this.CHARACTER_SET.uppercase + this.CHARACTER_SET.numbers;
            const allowedPattern = new RegExp(`^[${allowedChars}]{${this.CONFIG.CODE_LENGTH}}$`);
            if (!allowedPattern.test(cleanCode)) {
                return false;
            }
            
            const historyStr = localStorage.getItem(this.STORAGE_KEYS.CODE_HISTORY);
            if (!historyStr) return false;
            
            const history = JSON.parse(historyStr);
            const now = Date.now();
            
            for (const record of history) {
                if (record.code === cleanCode && now < record.expiresAt) {
                    const currentDeviceId = this.generateDeviceId();
                    const restoredCode = {
                        code: record.code,
                        deviceId: currentDeviceId,
                        createdAt: record.createdAt,
                        expiresAt: record.expiresAt,
                        usageCount: 0
                    };
                    
                    localStorage.setItem(this.STORAGE_KEYS.CURRENT_CODE, JSON.stringify(restoredCode));
                    return true;
                }
            }
            
            return false;
        } catch (error) {
            console.error('验证用户输入失败:', error);
            return false;
        }
    }
    
    // 获取生成统计信息
    getGenerationStats() {
        try {
            const statsStr = localStorage.getItem(this.STORAGE_KEYS.GENERATION_STATS);
            if (!statsStr) {
                return {
                    remainingGenerations: this.CONFIG.MAX_REGENERATIONS,
                    hoursUntilReset: 24
                };
            }
            
            const stats = JSON.parse(statsStr);
            const now = Date.now();
            const timeSinceFirst = now - stats.firstGenerationTime;
            const timeUntilReset = this.CONFIG.CODE_LIFETIME - timeSinceFirst;
            
            return {
                generationCount: stats.generationCount || 0,
                remainingGenerations: Math.max(0, this.CONFIG.MAX_REGENERATIONS - (stats.generationCount || 0)),
                hoursUntilReset: Math.ceil(timeUntilReset / (60 * 60 * 1000)),
                lastGenerationTime: stats.lastGenerationTime
            };
        } catch (error) {
            console.error('获取统计信息失败:', error);
            return {
                remainingGenerations: this.CONFIG.MAX_REGENERATIONS,
                hoursUntilReset: 24
            };
        }
    }
    
    // 清理过期的历史记录
    cleanupExpiredHistory() {
        try {
            const historyStr = localStorage.getItem(this.STORAGE_KEYS.CODE_HISTORY);
            if (!historyStr) return;
            
            const history = JSON.parse(historyStr);
            const now = Date.now();
            const validHistory = history.filter(record => now < record.expiresAt);
            
            localStorage.setItem(this.STORAGE_KEYS.CODE_HISTORY, JSON.stringify(validHistory));
        } catch (error) {
            console.error('清理历史记录失败:', error);
        }
    }
}

// 创建全局实例
const redemptionSystem = new RedemptionCodeSystem();

// ========== 全局变量声明 ==========
let scores, currentPage, questionsPerPage, userAnswers;
let codeBox, testBox, reportBox, codeInput, unlockBtn, codeHint, restartBtn, questionContainer;
let questions, totalPages;

// 在 handleAutoRedemption 函数中修改
function handleAutoRedemption() {
    console.log('🔄 正在处理自动兑换码...');
    
    // 显示加载状态
    if (codeHint) {
        codeHint.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <div style="margin-bottom: 15px; color: #6b7280;">
                    🔍 正在为您生成专属测试码...
                </div>
                <div style="display: inline-block; width: 40px; height: 40px; border: 3px solid #e5e7eb; border-top-color: #4f46e5; border-radius: 50%; animation: spin 1s linear infinite;"></div>
            </div>
        `;
    }
    
    const validCode = redemptionSystem.getValidRedemptionCode();
    
    if (validCode) {
        console.log('✅ 找到有效兑换码:', validCode.code);
        // 1.5秒后跳转，让用户有时间看到
        setTimeout(() => {
            showCodeInfo(validCode.code);
            setTimeout(switchToTestPage, 1500); // 额外1.5秒显示兑换码
        }, 1500);
        return;
    }
    
    try {
        console.log('🆕 正在生成新兑换码...');
        // 模拟2-3秒的生成过程
        setTimeout(() => {
            const newCode = redemptionSystem.createNewRedemptionCode();
            console.log('✅ 新兑换码生成成功:', newCode.code);
            
            showCodeInfo(newCode.code);
            
            // 2秒后跳转，让用户看清兑换码
            setTimeout(() => {
                switchToTestPage();
            }, 2000);
            
        }, 2500); // 2.5秒生成延迟
        
    } catch (error) {
        console.warn('⚠️ 无法生成新兑换码:', error.message);
        showRegenerationLimitError();
    }
}

// 在CSS中添加旋转动画
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

function showCodeInfo(code) {
    const codeInput = document.getElementById('code-input');
    if (codeInput) {
        codeInput.value = code;
        codeInput.readOnly = true;
        codeInput.style.cssText = `
            font-size: 20px;
            font-weight: bold;
            letter-spacing: 3px;
            text-align: center;
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
            color: #0369a1;
            border: 2px solid #0ea5e9;
            border-radius: 12px;
            padding: 15px;
            margin: 15px 0;
        `;
    }
    
    const codeHint = document.getElementById('code-hint');
    if (codeHint) {
        codeHint.innerHTML = `
            <div style="text-align: center; margin: 20px 0;">
                <div style="color: #059669; font-size: 16px; margin-bottom: 10px;">
                    <span style="background: #d1fae5; padding: 5px 10px; border-radius: 20px;">✅ 专属兑换码已生成</span>
                </div>
                <div style="display: flex; align-items: center; justify-content: center; gap: 10px; margin: 15px 0;">
                    <div style="font-size: 28px; font-weight: bold; color: #1e40af; 
                                background: white; padding: 10px 20px; border-radius: 10px;
                                border: 2px dashed #3b82f6; letter-spacing: 3px;">
                        ${code}
                    </div>
                </div>
                <div style="color: #6b7280; font-size: 14px; line-height: 1.5;">
                    🔄 此码24小时内有效，可重复测试<br>
                    💾 建议截图保存此兑换码<br>
                    ⏰ 有效期倒计时：<span id="code-timer">24:00:00</span>
                </div>
            </div>
        `;
        
        startCodeTimer();
    }
}

function startCodeTimer() {
    const timerElement = document.getElementById('code-timer');
    if (!timerElement) return;
    
    const codeDataStr = localStorage.getItem('mbti_current_code');
    if (!codeDataStr) return;
    
    const codeData = JSON.parse(codeDataStr);
    const expiryTime = codeData.expiresAt;
    
    function updateTimer() {
        const now = Date.now();
        const remaining = expiryTime - now;
        
        if (remaining <= 0) {
            timerElement.textContent = '已过期';
            timerElement.style.color = '#ef4444';
            return;
        }
        
        const hours = Math.floor(remaining / (1000 * 60 * 60));
        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
        
        timerElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (hours < 1) {
            timerElement.style.color = '#f59e0b';
        } else {
            timerElement.style.color = '#059669';
        }
    }
    
    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
    
    window.addEventListener('beforeunload', () => {
        clearInterval(timerInterval);
    });
}

function showRegenerationLimitError() {
    const stats = redemptionSystem.getGenerationStats();
    
    const codeHint = document.getElementById('code-hint');
    if (codeHint) {
        codeHint.innerHTML = `
            <div style="color: #dc2626; background: #fef2f2; padding: 15px; border-radius: 10px; margin: 15px 0;">
                <strong style="display: block; margin-bottom: 8px;">⚠️ 生成次数限制</strong>
                <div style="font-size: 14px; line-height: 1.4;">
                    <span style="display: inline-block; background: #fca5a5; padding: 2px 8px; border-radius: 4px; margin-bottom: 5px;">
                        已用 ${stats.generationCount}/3 次
                    </span><br>
                    请使用之前的6位兑换码<br>
                    ${stats.hoursUntilReset > 0 ? `${stats.hoursUntilReset} 小时后可再次生成` : '稍后可再次生成'}
                </div>
            </div>
            <div style="margin-top: 20px; background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0;">
                <h4 style="margin: 0 0 15px 0; color: #475569;">🔑 手动输入兑换码</h4>
                <div style="margin-bottom: 10px; font-size: 14px; color: #64748b;">
                    请输入6位数字和字母组合的兑换码
                </div>
                <input type="text" id="manual-code-input" 
                       placeholder="例如：A3D9F7" 
                       maxlength="6"
                       style="width: 100%; padding: 14px; margin-bottom: 15px; 
                              border-radius: 10px; border: 2px solid #cbd5e1;
                              font-size: 18px; text-align: center; letter-spacing: 3px;
                              text-transform: uppercase;">
                <div style="display: flex; gap: 10px;">
                    <button id="manual-verify-btn" 
                            style="flex: 1; padding: 14px; background: #3b82f6; color: white; 
                                   border: none; border-radius: 10px; font-size: 16px; font-weight: 500;">
                        验证兑换码
                    </button>
                    <button id="clear-input-btn"
                            style="padding: 14px 20px; background: #f1f5f9; color: #475569; 
                                   border: 1px solid #cbd5e1; border-radius: 10px; font-size: 16px;">
                        清空
                    </button>
                </div>
                <div style="margin-top: 15px; font-size: 13px; color: #94a3b8;">
                    💡 兑换码由 A、C、D、E、F、G、H、J、K、L、M、N、P、Q、R、T、U、V、W、X、Y 和 3、4、6、7、9 组成
                </div>
            </div>
        `;
        
        setTimeout(() => {
            const manualVerifyBtn = document.getElementById('manual-verify-btn');
            const manualCodeInput = document.getElementById('manual-code-input');
            const clearInputBtn = document.getElementById('clear-input-btn');
            
            if (manualVerifyBtn && manualCodeInput) {
                manualCodeInput.addEventListener('input', function() {
                    this.value = this.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
                });
                
                manualCodeInput.addEventListener('keydown', function(e) {
                    if (this.value.length >= 6 && e.key !== 'Backspace' && e.key !== 'Delete') {
                        e.preventDefault();
                    }
                });
                
                manualVerifyBtn.addEventListener('click', () => {
                    const inputCode = manualCodeInput.value.trim();
                    if (!inputCode || inputCode.length !== 6) {
                        showInputError('请输入6位兑换码');
                        return;
                    }
                    
                    manualVerifyBtn.disabled = true;
                    manualVerifyBtn.textContent = '验证中...';
                    
                    setTimeout(() => {
                        if (redemptionSystem.validateUserInputCode(inputCode)) {
                            showInputSuccess('✅ 验证成功！正在进入测试...');
                            setTimeout(() => switchToTestPage(), 500);
                        } else {
                            showInputError('❌ 兑换码无效或已过期');
                            manualVerifyBtn.disabled = false;
                            manualVerifyBtn.textContent = '验证兑换码';
                        }
                    }, 500);
                });
                
                manualCodeInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        manualVerifyBtn.click();
                    }
                });
            }
            
            if (clearInputBtn) {
                clearInputBtn.addEventListener('click', () => {
                    if (manualCodeInput) {
                        manualCodeInput.value = '';
                        manualCodeInput.focus();
                    }
                });
            }
        }, 100);
    }
}

function showInputError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #ef4444;
        color: white;
        padding: 12px 20px;
        border-radius: 10px;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        animation: slideIn 0.3s ease;
    `;
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => errorDiv.remove(), 300);
    }, 3000);
}

function showInputSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #10b981;
        color: white;
        padding: 12px 20px;
        border-radius: 10px;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        animation: slideIn 0.3s ease;
    `;
    successDiv.textContent = message;
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => successDiv.remove(), 300);
    }, 3000);
}

// ========== 页面初始化 ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ 页面加载完成，初始化开始...');
    
    // 初始化DOM元素
    codeBox = document.getElementById('code-box');
    testBox = document.getElementById('test-box');
    reportBox = document.getElementById('report-box');
    codeInput = document.getElementById('code-input');
    unlockBtn = document.getElementById('unlock-btn');
    codeHint = document.getElementById('code-hint');
    restartBtn = document.getElementById('restart-btn');
    questionContainer = document.getElementById('questionContainer');
    
    // 初始化变量
    scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    currentPage = 1;
    questionsPerPage = 1;
    userAnswers = {};
    
    // 60道测试题目
    questions = [
        // E-I 维度：能量来源与社交倾向 (共15题)
        { text: "当你感到精疲力尽时，恢复能量的最佳方式是？", options: ["与朋友或家人待在一起", "独自一人安静休息"], dimension: "EI" },
        { text: "在思考复杂问题时，你更倾向于？", options: ["说出来和他人讨论", "在内心自己梳理"], dimension: "EI" },
        { text: "周末你更愿意如何度过？", options: ["参加聚会或户外活动", "在家阅读或发展个人爱好"], dimension: "EI" },
        { text: "在一个全新的社交场合，你通常会？", options: ["主动介绍自己，结识很多人", "先观察，只和少数人深入交流"], dimension: "EI" },
        { text: "你如何描述自己的朋友圈？", options: ["广泛而多样", "小而深厚"], dimension: "EI" },
        { text: "当你有了出色的成绩，第一反应是？", options: ["立刻分享给身边的人", "自己享受这份成就感"], dimension: "EI" },
        { text: "你认为深度交流最好是？", options: ["一群人的头脑风暴", "一对一的谈心"], dimension: "EI" },
        { text: "长时间独处会让你感到？", options: ["无聊甚至焦虑", "平静且充实"], dimension: "EI" },
        { text: "在团队中，你更习惯的角色是？", options: ["推动进程的协调者", "默默贡献的思考者"], dimension: "EI" },
        { text: "你更容易从何处获得灵感？", options: ["与他人的互动和对话中", "自己的内心世界和思考中"], dimension: "EI" },
        { text: "处理情绪问题时，你更愿意？", options: ["找朋友倾诉", "自己消化解决"], dimension: "EI" },
        { text: "对于电话和即时消息，你的态度是？", options: ["乐于接听和回复", "更偏好邮件等非即时方式"], dimension: "EI" },
        { text: "你如何理解社交能量？", options: ["像可再生的电池，越用越多", "像有限的存款，需要节约使用"], dimension: "EI" },
        { text: "你更喜欢哪种工作环境？", options: ["开放、热闹的协作空间", "独立、安静的私人空间"], dimension: "EI" },
        { text: "做出重大决定前，你通常？", options: ["咨询很多人的意见", "主要依靠自己的判断"], dimension: "EI" },

        // S-N 维度：信息接收与处理 (共15题)
        { text: "你更相信什么？", options: ["具体的经验和事实", "直觉和未来的可能性"], dimension: "SN" },
        { text: "学习新技能时，你更关注？", options: ["明确的操作步骤和手册", "背后的原理和潜在应用"], dimension: "SN" },
        { text: "你通常如何记忆信息？", options: ["通过具体的细节和例子", "通过整体的概念和关联"], dimension: "SN" },
        { text: "描述一件事时，你更注重？", options: ["准确的时间、地点和经过", "它的意义、感受和影响"], dimension: "SN" },
        { text: "你眼中的未来更多的是？", options: ["基于当前趋势的合理延伸", "充满各种变革和奇迹"], dimension: "SN" },
        { text: "你更喜欢哪种类型的书籍或电影？", options: ["写实的、历史纪录片", "奇幻的、科幻或哲学寓言"], dimension: "SN" },
        { text: "当别人向你描述一个概念时，你希望？", options: ["有具体的案例和数据支撑", "有生动的比喻和宏观图景"], dimension: "SN" },
        { text: "你如何看待规则和惯例？", options: ["是经过验证的有效指南", "是可以被优化或突破的框架"], dimension: "SN" },
        { text: "你更容易注意到什么？", options: ["眼前物体的微小变化", "环境中氛围的微妙转变"], dimension: "SN" },
        { text: "策划旅行时，什么更吸引你？", options: ["详尽的攻略和必去清单", "未知的探险和随心所欲"], dimension: "SN" },
        { text: "你认为常识的重要性在于？", options: ["它帮助人们高效处理日常事务", "它有时会限制创新思维"], dimension: "SN" },
        { text: "你如何理解脚踏实地和仰望星空？", options: ["前者是后者的基础", "后者赋予前者以意义"], dimension: "SN" },
        { text: "面对一个复杂系统，你倾向于先了解？", options: ["它的各个组成部分和流程", "它的核心目的和整体架构"], dimension: "SN" },
        { text: "你更擅长处理哪类信息？", options: ["具体的、确凿的数据", "抽象的、隐喻的理念"], dimension: "SN" },
        { text: "对于全新的理论，你的态度是？", options: ["先看是否有实证支持", "先看其逻辑是否自洽优美"], dimension: "SN" },

        // T-F 维度：决策模式与价值观 (共15题)
        { text: "做决定时，最重要的依据是？", options: ["逻辑分析和客观效益", "人际关系和主观价值"], dimension: "TF" },
        { text: "当朋友陷入困境，你首先会？", options: ["分析问题，提供解决方案", "表达理解，给予情感支持"], dimension: "TF" },
        { text: "你更希望因什么而被认可？", options: ["我的能力和成果", "我的为人和善意"], dimension: "TF" },
        { text: "评判一件事的对错，你更看重？", options: ["是否公平、符合规则", "是否体贴、顾及人情"], dimension: "TF" },
        { text: "在团队中，你更在意？", options: ["目标的达成和效率", "氛围的和谐与默契"], dimension: "TF" },
        { text: "面对批评，你更容易？", options: ["就事论事，分析批评内容", "感受批评者背后的情绪和态度"], dimension: "TF" },
        { text: "你如何理解真理？", options: ["是客观存在、不容置疑的", "是相对的，与视角有关"], dimension: "TF" },
        { text: "当原则与人情冲突时，你通常？", options: ["坚持原则", "照顾人情"], dimension: "TF" },
        { text: "你更欣赏哪种领导？", options: ["睿智果断、目标导向", "亲和包容、关心下属"], dimension: "TF" },
        { text: "推动你行动的主要动力是？", options: ["对成就和胜利的渴望", "对意义和连接的追求"], dimension: "TF" },
        { text: "你认为正确与善良哪个更重要？", options: ["正确", "善良"], dimension: "TF" },
        { text: "在争吵中，你更可能？", options: ["据理力争，说服对方", "主动退让，修复关系"], dimension: "TF" },
        { text: "你如何分配你的信任？", options: ["基于对方的可靠记录", "基于彼此的直觉和感觉"], dimension: "TF" },
        { text: "评价艺术作品时，你更注重？", options: ["其技艺水平和创新性", "其传递的情感和共鸣"], dimension: "TF" },
        { text: "对于同情心，你认为？", options: ["需要理性节制，以免影响判断", "是人类最珍贵的品质之一"], dimension: "TF" },

        // J-P 维度：生活方式与适应性 (共15题)
        { text: "你的个人空间（如桌面）通常是？", options: ["整洁有序的", "随意但自有秩序的"], dimension: "JP" },
        { text: "你对计划的态度是？", options: ["必不可少，让我安心", "灵活参考，喜欢即兴"], dimension: "JP" },
        { text: "面对截止日期，你通常？", options: ["提前规划，稳步完成", "在压力下高效冲刺"], dimension: "JP" },
        { text: "你更享受哪种状态？", options: ["事情都已决定和落实", "选项仍保持开放和可能"], dimension: "JP" },
        { text: "如何处理多项任务？", options: ["列出清单，逐项完成", "根据感觉和灵感切换"], dimension: "JP" },
        { text: "你如何看待承诺和约定？", options: ["必须严格遵守", "可根据情况合理调整"], dimension: "JP" },
        { text: "旅行时，你更喜欢？", options: ["详细的行程和预订", "随性的探索和偶遇"], dimension: "JP" },
        { text: "购物时，你更倾向于？", options: ["目标明确，买完就走", "四处逛逛，发现惊喜"], dimension: "JP" },
        { text: "对于生活节奏，你偏好？", options: ["规律、可预测的", "多变、充满新意的"], dimension: "JP" },
        { text: "做选择时，你觉得困难在于？", options: ["害怕选错，想要最优解", "不愿放弃其他可能性"], dimension: "JP" },
        { text: "你如何应对突发变化？", options: ["感到被打扰，需重新适应", "感到兴奋，乐于应对挑战"], dimension: "JP" },
        { text: "工作项目中，你更擅长？", options: ["执行阶段，推动闭环", "策划阶段，构思创意"], dimension: "JP" },
        { text: "你更认同哪句格言？", options: ["凡事预则立，不预则废", "船到桥头自然直"], dimension: "JP" },
        { text: "时间管理上，你更像？", options: ["时钟，精确而守时", "河流，顺势而流动"], dimension: "JP" },
        { text: "你认为自己的人生更由什么驱动？", options: ["清晰的目标和决心", "好奇的探索和体验"], dimension: "JP" }
    ];
    
    totalPages = Math.ceil(questions.length / questionsPerPage);
    
    // 清理过期历史记录
    redemptionSystem.cleanupExpiredHistory();
    
    // ========== 页面初始化函数 ==========
    function initPageState() {
        console.log('🔄 初始化页面状态...');
        
        if (!codeBox || !testBox || !reportBox) {
            console.error('❌ 找不到必要的页面元素');
            return;
        }
        
        codeBox.classList.remove('hidden');
        testBox.classList.add('hidden');
        reportBox.classList.add('hidden');
        
        if (codeInput) {
            codeInput.value = '';
            codeInput.readOnly = false;
            codeInput.style.cssText = '';
        }
        
        if (codeHint) {
            codeHint.textContent = '';
            codeHint.style.color = '';
        }
        
        document.body.classList.remove('loading');
        
        if (unlockBtn) {
            unlockBtn.disabled = false;
        }
        
        setTimeout(() => {
            handleAutoRedemption();
        }, 300);
    }
    
    // ========== 解锁按钮事件 ==========
    if (unlockBtn) {
        unlockBtn.addEventListener('click', function() {
            console.log('🔓 手动解锁按钮被点击');
            
            if (!codeInput || !codeHint) return;
            
            const rawCode = codeInput.value.trim();
            const cleanCode = rawCode.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
            
            if (!cleanCode) {
                codeHint.textContent = '❌ 请输入兑换码';
                codeHint.style.color = '#ef4444';
                return;
            }
            
            codeHint.textContent = '⏳ 正在验证兑换码...';
            codeHint.style.color = '#f59e0b';
            unlockBtn.disabled = true;
            
            setTimeout(() => {
                if (redemptionSystem.validateUserInputCode(cleanCode)) {
                    codeHint.textContent = '✅ 兑换码验证成功！';
                    codeHint.style.color = '#10b981';
                    
                    setTimeout(() => {
                        switchToTestPage();
                    }, 500);
                } else {
                    codeHint.textContent = '❌ 兑换码无效或已过期';
                    codeHint.style.color = '#ef4444';
                    unlockBtn.disabled = false;
                }
            }, 800);
        });
    }
    
    // 输入框回车键支持
    if (codeInput) {
        codeInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                if (unlockBtn) unlockBtn.click();
            }
        });
    }
    
    // ========== 切换到测试页面 ==========
    window.switchToTestPage = function() {
        console.log('📝 切换到测试页面');
        
        if (!codeBox || !testBox) return;
        
        codeBox.classList.add('hidden');
        testBox.classList.remove('hidden');
        
        resetTestState();
        loadPage(1);
        
        window.scrollTo(0, 0);
        console.log('✅ 测试页面加载完成');
    };
    
    // ========== 重置测试状态 ==========
    function resetTestState() {
        currentPage = 1;
        userAnswers = {};
        
        Object.keys(scores).forEach(key => {
            scores[key] = 0;
        });
        
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const submitBtn = document.getElementById('submit-btn');
        
        if (prevBtn) prevBtn.disabled = true;
        if (nextBtn) nextBtn.disabled = false;
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.classList.add('hidden');
        }
    }
    
    // ========== 加载题目页面 ==========
    function loadPage(page) {
        console.log(`📄 加载第 ${page} 页`);
        
        if (!questionContainer) {
            console.error('❌ 找不到题目容器');
            return;
        }
        
        const questionIndex = page - 1;
        const question = questions[questionIndex];
        
        if (!question) {
            console.error('❌ 找不到题目');
            return;
        }
        
        questionContainer.innerHTML = `
            <div class="question-card">
                <p style="font-size: 18px; line-height: 1.6; margin-bottom: 20px;">
                    <strong>${page}. ${question.text}</strong>
                </p>
                <div style="display: flex; flex-direction: column; gap: 10px;">
                    <label style="display: flex; align-items: center; padding: 15px; background: #f8f9fa; border-radius: 10px; cursor: pointer; transition: all 0.2s;">
                        <input type="radio" name="q${questionIndex}" value="${question.dimension[0]}" style="margin-right: 10px;">
                        <span style="font-size: 16px;">${question.options[0]}</span>
                    </label>
                    <label style="display: flex; align-items: center; padding: 15px; background: #f8f9fa; border-radius: 10px; cursor: pointer; transition: all 0.2s;">
                        <input type="radio" name="q${questionIndex}" value="${question.dimension[1]}" style="margin-right: 10px;">
                        <span style="font-size: 16px;">${question.options[1]}</span>
                    </label>
                </div>
            </div>
        `;
        
        updateProgress(page);
        attachRadioListeners(questionIndex);
        restoreSelection(questionIndex);
        updateButtonStates();
        
        console.log(`✅ 第 ${page} 题加载完成`);
    }
    
    // ========== 更新进度显示 ==========
    function updateProgress(page) {
        const progressText = document.getElementById('progress-text');
        const progressBar = document.getElementById('progress-bar');
        const answeredCount = Object.keys(userAnswers).length;
        const totalQuestions = questions.length;
        
        if (progressText) {
            if (answeredCount === totalQuestions) {
                progressText.textContent = `🎉 已完成所有 ${totalQuestions} 题！`;
                progressText.style.color = '#10b981';
            } else {
                progressText.textContent = `第 ${page}/${totalPages} 题 (已完成 ${answeredCount}/${totalQuestions})`;
                progressText.style.color = '';
            }
        }
        
        if (progressBar) {
            progressBar.value = answeredCount;
            progressBar.max = totalQuestions;
        }
    }
    
    // ========== 绑定单选按钮事件 ==========
    function attachRadioListeners(questionIndex) {
        const radios = document.querySelectorAll(`input[name="q${questionIndex}"]`);
        
        radios.forEach(radio => {
            radio.addEventListener('change', function() {
                console.log(`📝 记录答案：第${questionIndex + 1}题 = ${this.value}`);
                
                userAnswers[questionIndex] = this.value;
                calculateScores();
                saveProgress();
                updateButtonStates();
            });
        });
    }
    
    // ========== 恢复选择 ==========
    function restoreSelection(questionIndex) {
        const savedAnswer = userAnswers[questionIndex];
        if (savedAnswer) {
            const radio = document.querySelector(`input[name="q${questionIndex}"][value="${savedAnswer}"]`);
            if (radio) {
                radio.checked = true;
            }
        }
    }
    
    // ========== 计算分数 ==========
    function calculateScores() {
        Object.keys(scores).forEach(key => {
            scores[key] = 0;
        });
        
        Object.values(userAnswers).forEach(answer => {
            if (scores.hasOwnProperty(answer)) {
                scores[answer]++;
            }
        });
        
        console.log('📊 当前分数:', scores);
    }
    
    // ========== 更新按钮状态 ==========
    function updateButtonStates() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const submitBtn = document.getElementById('submit-btn');
        const answeredCount = Object.keys(userAnswers).length;
        const totalQuestions = questions.length;
        
        if (prevBtn) {
            prevBtn.disabled = currentPage === 1;
        }
        
        if (nextBtn) {
            nextBtn.disabled = currentPage === totalPages;
            nextBtn.style.display = currentPage === totalPages ? 'none' : 'block';
        }
        
        if (submitBtn) {
            const isLastPage = currentPage === totalPages;
            const isAllAnswered = answeredCount === totalQuestions;
            
            if (isLastPage) {
                submitBtn.classList.remove('hidden');
                
                if (isAllAnswered) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = '✨ 生成我的专属报告 ✨';
                    submitBtn.style.background = 'linear-gradient(135deg, #10b981, #34d399)';
                    
                    // 恢复原始点击事件
                    submitBtn.onclick = function() {
                        generateReport();
                    };
                } else {
                    const unansweredCount = totalQuestions - answeredCount;
                    submitBtn.disabled = false;
                    submitBtn.textContent = `📝 还有 ${unansweredCount} 题未答，点击检查`;
                    submitBtn.style.background = 'linear-gradient(135deg, #f59e0b, #fbbf24)';
                    submitBtn.onclick = function() {
                        showUnansweredQuestions();
                    };
                }
            } else {
                submitBtn.classList.add('hidden');
            }
        }
    }
    
    // ========== 显示未答题列表 ==========
    function showUnansweredQuestions() {
        const answeredCount = Object.keys(userAnswers).length;
        const totalQuestions = questions.length;
        const unansweredCount = totalQuestions - answeredCount;
        
        if (unansweredCount === 0) {
            generateReport();
            return;
        }
        
        let unansweredList = [];
        for (let i = 0; i < totalQuestions; i++) {
            if (!userAnswers.hasOwnProperty(i)) {
                unansweredList.push(i + 1);
            }
        }
        
        const message = `您还有 ${unansweredCount} 道题目未回答：\n\n${unansweredList.slice(0, 10).join('、')}${unansweredList.length > 10 ? '...' : ''}\n\n请返回完成所有题目后再生成报告。`;
        
        if (confirm(`${message}\n\n是否跳转到第一道未答题？`)) {
            const firstUnanswered = unansweredList[0] - 1;
            currentPage = Math.floor(firstUnanswered / questionsPerPage) + 1;
            loadPage(currentPage);
        }
    }
    
    // ========== 进度保存功能 ==========
    function saveProgress() {
        const progress = {
            answers: userAnswers,
            scores: scores,
            currentPage: currentPage,
            timestamp: new Date().getTime()
        };
        localStorage.setItem('mbti-test-progress', JSON.stringify(progress));
    }
    
    // ========== 上一题按钮事件 ==========
    const prevBtn = document.getElementById('prev-btn');
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                loadPage(currentPage);
            }
        });
    }
    
    // ========== 下一题按钮事件 ==========
    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (currentPage < totalPages) {
                currentPage++;
                loadPage(currentPage);
            }
        });
    }
    
    // ========== 生成报告 ==========
    window.generateReport = async function() {
        console.log('📊 开始生成报告...');
        
        const answeredCount = Object.keys(userAnswers).length;
        const totalQuestions = questions.length;
        
        if (answeredCount !== totalQuestions) {
            alert(`请先完成所有题目！\n\n已完成: ${answeredCount}/${totalQuestions} 题`);
            return;
        }
        
        try {
            calculateScores();
            const personalityType = calculatePersonalityType();
            console.log(`🎭 确定人格类型: ${personalityType}`);
            
            if (!testBox || !reportBox) return;
            
            testBox.classList.add('hidden');
            reportBox.classList.remove('hidden');
            
            updateReportBasicInfo(personalityType);
            
            await loadReportGenerator();
            
            if (window.calculateReportData && window.renderReport) {
                console.log('📈 计算报告数据...');
                const reportData = window.calculateReportData(scores);
                console.log('📊 报告数据计算完成:', reportData);
                window.renderReport(reportData);
            } else {
                const personalityTypeBadgeEl = document.getElementById('personality-type-badge');
                if (personalityTypeBadgeEl) {
                    personalityTypeBadgeEl.textContent = personalityType;
                }
            }
            
            // 显示兑换码信息
            setTimeout(() => {
                displayCodeInReport();
            }, 500);
            
            window.scrollTo(0, 0);
            console.log('✅ 报告生成完成');
            
        } catch (error) {
            console.error('❌ 生成报告失败:', error);
            alert('生成报告时出错，请刷新页面重试');
        }
    };
    
    // ========== 在报告页面显示兑换码信息 ==========
    function displayCodeInReport() {
        const validCode = redemptionSystem.getValidRedemptionCode();
        if (!validCode) return;
        
        const now = Date.now();
        const remainingTime = validCode.expiresAt - now;
        const remainingHours = Math.floor(remainingTime / (60 * 60 * 1000));
        const remainingMinutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));
        
        const codeDisplay = document.createElement('div');
        codeDisplay.style.cssText = `
            margin: 30px 0;
            padding: 25px;
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
            border-radius: 16px;
            border: 2px solid #0ea5e9;
            text-align: center;
            box-shadow: 0 4px 15px rgba(14, 165, 233, 0.1);
        `;
        
        codeDisplay.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 15px;">
                <div style="background: #0ea5e9; color: white; width: 36px; height: 36px; border-radius: 50%; 
                            display: flex; align-items: center; justify-content: center; margin-right: 12px; font-size: 18px;">
                    🎫
                </div>
                <h4 style="margin: 0; color: #0369a1; font-size: 18px;">您的专属测试兑换码</h4>
            </div>
            
            <div style="margin: 20px 0; padding: 20px; background: white; border-radius: 12px; 
                        border: 2px dashed #60a5fa; display: inline-block;">
                <div style="font-size: 32px; font-weight: bold; color: #1e40af; 
                            letter-spacing: 4px; font-family: 'Courier New', monospace;">
                    ${validCode.code}
                </div>
            </div>
            
            <div style="color: #475569; font-size: 15px; line-height: 1.6; margin-bottom: 15px;">
                <div style="display: inline-block; background: #d1fae5; color: #065f46; 
                            padding: 6px 12px; border-radius: 20px; margin-bottom: 10px;">
                    ⏰ 剩余有效期：${remainingHours}小时${remainingMinutes}分钟
                </div><br>
                🔄 24小时内可重复使用此码测试<br>
                📱 建议截图保存此兑换码
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background: rgba(14, 165, 233, 0.1); 
                        border-radius: 10px; font-size: 13px; color: #64748b; text-align: left;">
                <div style="display: flex; align-items: flex-start; margin-bottom: 8px;">
                    <div style="color: #0ea5e9; margin-right: 8px;">💡</div>
                    <div>下次测试只需访问原链接，系统会自动识别</div>
                </div>
                <div style="display: flex; align-items: flex-start;">
                    <div style="color: #0ea5e9; margin-right: 8px;">⚠️</div>
                    <div>此码仅限本设备使用，更换设备需重新生成</div>
                </div>
            </div>
        `;
        
        const warningBox = document.querySelector('.warning-box');
        if (warningBox && warningBox.parentNode) {
            warningBox.parentNode.insertBefore(codeDisplay, warningBox);
        }
    }
    
    // ========== 计算人格类型 ==========
    function calculatePersonalityType() {
        let type = '';
        type += scores.E >= scores.I ? 'E' : 'I';
        type += scores.S >= scores.N ? 'S' : 'N';
        type += scores.T >= scores.F ? 'T' : 'F';
        type += scores.J >= scores.P ? 'J' : 'P';
        return type;
    }
    
    // ========== 更新报告基本信息 ==========
    function updateReportBasicInfo(type) {
        const badgeElement = document.getElementById('personality-type-badge');
        if (badgeElement) {
            badgeElement.textContent = type;
        }
        
        const now = new Date();
        const dateStr = now.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        const dateElement = document.getElementById('report-date');
        if (dateElement) {
            dateElement.textContent = dateStr;
        }
        
        const reportIdElement = document.getElementById('report-id');
        if (reportIdElement) {
            reportIdElement.textContent = `MBTI-${type}`;
        }
    }
    
    // ========== 加载报告生成器 ==========
    async function loadReportGenerator() {
        return new Promise((resolve, reject) => {
            if (window.reportGeneratorLoaded) {
                console.log('📦 report-generator.js 已加载');
                resolve();
                return;
            }
            
            console.log('📦 加载 report-generator.js...');
            
            const script = document.createElement('script');
            script.src = 'report-generator.js';
            
            script.onload = function() {
                console.log('✅ report-generator.js 加载成功');
                resolve();
            };
            
            script.onerror = function() {
                console.error('❌ 加载 report-generator.js 失败');
                reject(new Error('报告生成器加载失败'));
            };
            
            document.head.appendChild(script);
        });
    }
    
    // ========== 重新开始按钮事件 ==========
    if (restartBtn) {
        restartBtn.addEventListener('click', function() {
            console.log('🔄 重新开始测试');
            
            resetTestState();
            
            if (reportBox && testBox && codeBox) {
                reportBox.classList.add('hidden');
                testBox.classList.add('hidden');
                codeBox.classList.remove('hidden');
            }
            
            if (codeInput) {
                codeInput.value = '';
            }
            
            if (codeHint) {
                codeHint.textContent = '';
            }
            
            setTimeout(() => {
                if (codeInput) codeInput.focus();
                handleAutoRedemption();
            }, 300);
            
            console.log('✅ 已重置到初始状态');
        });
    }
    
    // 立即初始化
    initPageState();
    console.log('✅ 脚本初始化完成');
});